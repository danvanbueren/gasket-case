import { getServerSession } from 'next-auth/next'
import { google } from 'googleapis'
import { authOptions } from '../auth/[...nextauth]/route'

const DEFAULT_INTERVALS = {
  'Oil Change': 5000,
  'Tire Rotation': 7500,
  'Cabin Air Filter': 15000,
  'Engine Air Filter': 30000,
  'Brake Fluid Flush': 30000,
  'Spark Plugs Replacement': 60000,
  'Coolant Flush': 100000,
}

// Helper to get Google API clients
function getGoogleClients(accessToken) {
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: accessToken })
  return {
    drive: google.drive({ version: 'v3', auth: oauth2Client }),
    sheets: google.sheets({ version: 'v4', auth: oauth2Client }),
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.accessToken) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const spreadsheetId = searchParams.get('spreadsheetId')

    const { drive, sheets } = getGoogleClients(session.accessToken)

    // Action 1: List all GasketCase vehicle log spreadsheets in the user's Drive
    if (!spreadsheetId) {
      const q = "mimeType='application/vnd.google-apps.spreadsheet' and name contains 'GasketCase_' and trashed = false"
      const fileList = await drive.files.list({
        q,
        fields: 'files(id, name, owners)',
      })

      const vehicles = (fileList.data.files || []).map(file => ({
        id: file.id,
        name: file.name.replace('GasketCase_', ''),
        owners: file.owners,
      }))

      return Response.json({ vehicles })
    }

    // Action 2: Get specific vehicle sheet timeline & analytics
    let response
    try {
      response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A2:F1000',
      })
    } catch (sheetError) {
      // If Sheet1 doesn't exist, we might have an unitialized sheet. Let's try to initialize headers.
      if (sheetError.status === 404 || sheetError.message.includes('not found')) {
        return Response.json({ error: 'Spreadsheet not found' }, { status: 404 })
      }
      // Return empty values if sheet reads fail
      response = { data: { values: [] } }
    }

    const rows = response.data.values || []
    
    // Ingest & normalize rows into strongly typed Events
    const events = rows
      .map((row, idx) => ({
        id: row[0] || `row-${idx}`,
        date: row[1] || '',
        component: row[2] || '',
        currentMileage: parseFloat(row[3]) || 0,
        cost: parseFloat(row[4]) || 0,
        notes: row[5] || '',
      }))
      .filter(evt => evt.date && evt.currentMileage > 0)

    // Sort chronologically by date
    events.sort((a, b) => new Date(a.date) - new Date(b.date))

    // Calculate daily mileage velocity
    let dailyVelocity = 32.87 // default (~12k miles/year)
    let velocityBasedOnData = false

    if (events.length >= 2) {
      const earliest = events[0]
      const latest = events[events.length - 1]
      const timeDiff = new Date(latest.date) - new Date(earliest.date)
      const odoDiff = latest.currentMileage - earliest.currentMileage
      const days = timeDiff / (1000 * 60 * 60 * 24)
      if (days > 0 && odoDiff > 0) {
        dailyVelocity = odoDiff / days
        velocityBasedOnData = true
      }
    }

    // Estimate current odometer
    let currentOdometer = 0
    if (events.length > 0) {
      const latestLog = events.reduce((max, e) => e.currentMileage > max.currentMileage ? e : max, events[0])
      const daysSinceLatest = (Date.now() - new Date(latestLog.date)) / (1000 * 60 * 60 * 24)
      currentOdometer = Math.max(latestLog.currentMileage, latestLog.currentMileage + dailyVelocity * Math.max(0, daysSinceLatest))
    }

    // Calculate predictions
    const predictiveEvents = []
    const earliestLog = events[0]

    for (const [compName, interval] of Object.entries(DEFAULT_INTERVALS)) {
      // Find logs matching component
      const compLogs = events.filter(e => 
        e.component.toLowerCase().replace(/[^a-z]/g, '') === compName.toLowerCase().replace(/[^a-z]/g, '')
      )

      let lastOdo = 0
      let lastDate

      if (compLogs.length > 0) {
        const latestCompLog = compLogs[compLogs.length - 1]
        lastOdo = latestCompLog.currentMileage
        lastDate = new Date(latestCompLog.date)
      } else {
        // Fallback: estimate original service at odometer 0
        lastOdo = 0
        if (earliestLog) {
          lastDate = new Date(new Date(earliestLog.date).getTime() - (earliestLog.currentMileage / dailyVelocity) * 24 * 60 * 60 * 1000)
        } else {
          lastDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
        }
      }

      const targetOdometer = lastOdo + interval
      const targetDate = new Date(lastDate.getTime() + (interval / dailyVelocity) * 24 * 60 * 60 * 1000)
      const remainingMileage = targetOdometer - currentOdometer
      const remainingDays = Math.ceil((targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      const isOverdue = remainingMileage < 0 || remainingDays < 0

      // Average historical cost
      const costedLogs = compLogs.filter(e => e.cost > 0)
      const avgCost = costedLogs.length > 0 
        ? costedLogs.reduce((sum, e) => sum + e.cost, 0) / costedLogs.length 
        : 0

      predictiveEvents.push({
        id: `predictive-${compName.replace(/\s+/g, '-').toLowerCase()}`,
        isPredictive: true,
        date: targetDate.toISOString().split('T')[0],
        component: compName,
        targetOdometer,
        remainingMileage: Math.round(remainingMileage),
        remainingDays,
        isOverdue,
        avgCost: Math.round(avgCost),
      })
    }

    // Merge and sort unified timeline
    const timeline = [...events, ...predictiveEvents]
    timeline.sort((a, b) => new Date(a.date) - new Date(b.date))

    return Response.json({
      events,
      predictiveEvents,
      timeline,
      analytics: {
        dailyVelocity,
        velocityBasedOnData,
        currentOdometer: Math.round(currentOdometer),
        totalSpent: events.reduce((sum, e) => sum + e.cost, 0),
        logCount: events.length,
      },
    })
  } catch (error) {
    console.error('Error in GasketCase timeline API GET:', error)
    return Response.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.accessToken) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, spreadsheetId } = body
    const { drive, sheets } = getGoogleClients(session.accessToken)

    // Action 1: Create a new vehicle log spreadsheet
    if (action === 'create_vehicle') {
      const { name } = body
      if (!name) {
        return Response.json({ error: 'Vehicle name is required' }, { status: 400 })
      }

      // Create spreadsheet in Drive
      const file = await drive.files.create({
        requestBody: {
          name: `GasketCase_${name}`,
          mimeType: 'application/vnd.google-apps.spreadsheet',
        },
      })

      const newId = file.data.id

      // Initialize columns
      await sheets.spreadsheets.values.update({
        spreadsheetId: newId,
        range: 'Sheet1!A1:F1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [['ID', 'Date', 'Component', 'Odometer', 'Cost', 'Notes']],
        },
      })

      return Response.json({ id: newId, name })
    }

    // Action 2: Share vehicle profile
    if (action === 'share_vehicle') {
      const { email } = body
      if (!spreadsheetId || !email) {
        return Response.json({ error: 'Spreadsheet ID and email are required' }, { status: 400 })
      }

      await drive.permissions.create({
        fileId: spreadsheetId,
        requestBody: {
          role: 'writer',
          type: 'user',
          emailAddress: email,
        },
      })

      return Response.json({ success: true })
    }

    // Action 3: Append new maintenance log entry
    const { date, component, currentMileage, cost, notes } = body
    if (!spreadsheetId || !date || !component || !currentMileage) {
      return Response.json({ error: 'Missing log values' }, { status: 400 })
    }

    const rowId = `log-${Date.now()}-${Math.round(Math.random() * 1000)}`
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[rowId, date, component, currentMileage, parseFloat(cost) || 0, notes || '']],
      },
    })

    return Response.json({ success: true, id: rowId })
  } catch (error) {
    console.error('Error in GasketCase timeline API POST:', error)
    return Response.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
