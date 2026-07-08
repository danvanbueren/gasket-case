export const DEFAULT_INTERVALS = {
  'Oil Change': 5000,
  'Tire Rotation': 7500,
  'Cabin Air Filter': 15000,
  'Engine Air Filter': 30000,
  'Brake Fluid Flush': 30000,
  'Spark Plugs Replacement': 60000,
  'Coolant Flush': 100000,
}

// Client-side prediction engine helper shared for Demo Mode
export const computeTimelineData = (events, intervals = DEFAULT_INTERVALS) => {
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))
  
  let dailyVelocity = 32.87 // default (~12k miles/year)
  let velocityBasedOnData = false

  if (sorted.length >= 2) {
    const earliest = sorted[0]
    const latest = sorted[sorted.length - 1]
    const timeDiff = new Date(latest.date) - new Date(earliest.date)
    const odoDiff = latest.currentMileage - earliest.currentMileage
    const days = timeDiff / (1000 * 60 * 60 * 24)
    if (days > 0 && odoDiff > 0) {
      dailyVelocity = odoDiff / days
      velocityBasedOnData = true
    }
  }

  let currentOdometer = 0
  if (sorted.length > 0) {
    const latestLog = sorted.reduce((max, e) => e.currentMileage > max.currentMileage ? e : max, sorted[0])
    const daysSinceLatest = (Date.now() - new Date(latestLog.date)) / (1000 * 60 * 60 * 24)
    currentOdometer = Math.max(latestLog.currentMileage, latestLog.currentMileage + dailyVelocity * Math.max(0, daysSinceLatest))
  }

  const predictiveEvents = []
  const earliestLog = sorted[0]

  for (const [compName, interval] of Object.entries(intervals)) {
    const compLogs = sorted.filter(e => 
      e.component.toLowerCase().replace(/[^a-z]/g, '') === compName.toLowerCase().replace(/[^a-z]/g, '')
    )

    let lastOdo = 0
    let lastDate

    if (compLogs.length > 0) {
      const latestCompLog = compLogs[compLogs.length - 1]
      lastOdo = latestCompLog.currentMileage
      lastDate = new Date(latestCompLog.date)
    } else {
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

  const timeline = [...sorted, ...predictiveEvents]
  timeline.sort((a, b) => new Date(a.date) - new Date(b.date))

  return {
    events: sorted,
    predictiveEvents,
    timeline,
    analytics: {
      dailyVelocity,
      velocityBasedOnData,
      currentOdometer: Math.round(currentOdometer),
      totalSpent: sorted.reduce((sum, e) => sum + e.cost, 0),
      logCount: sorted.length,
    },
  }
}
