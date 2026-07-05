'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ShareIcon from '@mui/icons-material/Share'
import AddIcon from '@mui/icons-material/Add'
import SettingsIcon from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import SpeedIcon from '@mui/icons-material/Speed'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import BuildIcon from '@mui/icons-material/Build'
import WarningIcon from '@mui/icons-material/Warning'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoIcon from '@mui/icons-material/Info'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

const DEFAULT_INTERVALS = {
  'Oil Change': 5000,
  'Tire Rotation': 7500,
  'Cabin Air Filter': 15000,
  'Engine Air Filter': 30000,
  'Brake Fluid Flush': 30000,
  'Spark Plugs Replacement': 60000,
  'Coolant Flush': 100000,
}

// Client-side prediction engine helper shared for Demo Mode
const computeTimelineData = (events, intervals = DEFAULT_INTERVALS) => {
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

export default function Home() {
  const { data: session, status } = useSession()

  // App States
  const [demoMode, setDemoMode] = useState(false)
  const [vehicles, setVehicles] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [analytics, setAnalytics] = useState({
    dailyVelocity: 32.87,
    velocityBasedOnData: false,
    currentOdometer: 0,
    totalSpent: 0,
    logCount: 0,
  })
  
  // Custom Intervals (Client Side State)
  const [intervals, setIntervals] = useState(DEFAULT_INTERVALS)

  // Loading States
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Modal Dialog States
  const [openLogDialog, setOpenLogDialog] = useState(false)
  const [openVehicleDialog, setOpenVehicleDialog] = useState(false)
  const [openShareDialog, setOpenShareDialog] = useState(false)
  const [openIntervalsDialog, setOpenIntervalsDialog] = useState(false)

  // Form Field States
  const [newVehicleName, setNewVehicleName] = useState('')
  const [shareEmail, setShareEmail] = useState('')
  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    component: 'Oil Change',
    customComponent: '',
    currentMileage: '',
    cost: '',
    notes: '',
  })

  // Enter Demo Mode Handler
  const handleEnterDemoMode = () => {
    setDemoMode(true)
    
    // Check local storage for demo vehicle list
    const storedVehicles = localStorage.getItem('gasketcase_demo_vehicles')
    let currentVehicles = []
    if (storedVehicles) {
      currentVehicles = JSON.parse(storedVehicles)
    } else {
      currentVehicles = [{ id: 'demo-vehicle-1', name: '2022 Porsche 911 GT3 (Demo)' }]
      localStorage.setItem('gasketcase_demo_vehicles', JSON.stringify(currentVehicles))
    }

    setVehicles(currentVehicles)

    // Check for vehicle log for the active vehicle
    const activeVehicleId = currentVehicles[0]?.id
    setSelectedVehicle(currentVehicles[0])

    const storedLogs = localStorage.getItem(`gasketcase_demo_events_${activeVehicleId}`)
    let logs = []
    if (storedLogs) {
      logs = JSON.parse(storedLogs)
    } else {
      logs = [
        {
          id: 'demo-log-1',
          date: '2026-01-10',
          component: 'Oil Change',
          currentMileage: 2000,
          cost: 150.00,
          notes: 'Factory break-in oil change',
        },
        {
          id: 'demo-log-2',
          date: '2026-03-15',
          component: 'Tire Rotation',
          currentMileage: 4500,
          cost: 40.00,
          notes: 'Front-to-back rotation',
        },
        {
          id: 'demo-log-3',
          date: '2026-06-20',
          component: 'Oil Change',
          currentMileage: 7000,
          cost: 160.00,
          notes: 'Synthetic oil and filter replacement',
        },
      ]
      localStorage.setItem(`gasketcase_demo_events_${activeVehicleId}`, JSON.stringify(logs))
    }

    // Run prediction engine client side
    const result = computeTimelineData(logs, intervals)
    setTimeline(result.timeline)
    setAnalytics(result.analytics)
  }

  // Fetch list of vehicle sheets from Drive
  const fetchVehicles = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/timeline')
      const data = await res.json()
      if (data.vehicles) {
        setVehicles(data.vehicles)
        // Select first vehicle by default if not set
        if (data.vehicles.length > 0 && !selectedVehicle) {
          setSelectedVehicle(data.vehicles[0])
        }
      }
    } catch (err) {
      console.error('Error fetching vehicles:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch timeline logs from specific Sheets file
  const fetchTimeline = async (spreadsheetId) => {
    if (!spreadsheetId) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/timeline?spreadsheetId=${spreadsheetId}`)
      const data = await res.json()
      if (data.timeline) {
        setTimeline(data.timeline)
        setAnalytics(data.analytics)
      }
    } catch (err) {
      console.error('Error fetching timeline data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch initial profile list on Google Session Auth
  useEffect(() => {
    if (session && !demoMode) {
      fetchVehicles()
    }
  }, [session, demoMode])

  // Fetch active sheet details on selected sheet updates
  useEffect(() => {
    if (selectedVehicle && !demoMode) {
      fetchTimeline(selectedVehicle.id)
    }
  }, [selectedVehicle, demoMode])

  // Update computed timeline when custom intervals change in demo mode
  useEffect(() => {
    if (demoMode && selectedVehicle) {
      const storedLogs = localStorage.getItem(`gasketcase_demo_events_${selectedVehicle.id}`)
      const logs = storedLogs ? JSON.parse(storedLogs) : []
      const result = computeTimelineData(logs, intervals)
      setTimeline(result.timeline)
      setAnalytics(result.analytics)
    }
  }, [intervals, demoMode, selectedVehicle])

  // Vehicle Switch Handler
  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle)
    if (demoMode) {
      const storedLogs = localStorage.getItem(`gasketcase_demo_events_${vehicle.id}`)
      const logs = storedLogs ? JSON.parse(storedLogs) : []
      const result = computeTimelineData(logs, intervals)
      setTimeline(result.timeline)
      setAnalytics(result.analytics)
    }
  }

  // Create Vehicle Spreadsheet Handler
  const handleCreateVehicle = async () => {
    if (!newVehicleName) return
    setIsSaving(true)
    
    if (demoMode) {
      const newVeh = {
        id: `demo-veh-${Date.now()}`,
        name: newVehicleName,
      }
      const updated = [...vehicles, newVeh]
      setVehicles(updated)
      localStorage.setItem('gasketcase_demo_vehicles', JSON.stringify(updated))
      localStorage.setItem(`gasketcase_demo_events_${newVeh.id}`, JSON.stringify([]))
      setSelectedVehicle(newVeh)
      setTimeline([])
      setAnalytics({
        dailyVelocity: 32.87,
        velocityBasedOnData: false,
        currentOdometer: 0,
        totalSpent: 0,
        logCount: 0,
      })
      setNewVehicleName('')
      setOpenVehicleDialog(false)
      setIsSaving(false)
      return
    }

    try {
      const res = await fetch('/api/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_vehicle',
          name: newVehicleName,
        }),
      })
      const data = await res.json()
      if (data.id) {
        const newVeh = { id: data.id, name: data.name, owners: [] }
        setVehicles(prev => [...prev, newVeh])
        setSelectedVehicle(newVeh)
        setNewVehicleName('')
        setOpenVehicleDialog(false)
      }
    } catch (err) {
      console.error('Failed to create vehicle sheet:', err)
    } finally {
      setIsSaving(false)
    }
  }

  // Share Vehicle Handler
  const handleShareVehicle = async () => {
    if (!shareEmail || !selectedVehicle) return
    setIsSaving(true)
    
    if (demoMode) {
      alert(`Demo Mode: Simulating vehicle sharing invite to ${shareEmail}.`)
      setShareEmail('')
      setOpenShareDialog(false)
      setIsSaving(false)
      return
    }

    try {
      const res = await fetch('/api/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'share_vehicle',
          spreadsheetId: selectedVehicle.id,
          email: shareEmail,
        }),
      })
      if (res.ok) {
        setShareEmail('')
        setOpenShareDialog(false)
        alert('Vehicle log shared successfully!')
      } else {
        const errorData = await res.json()
        alert(`Failed to share vehicle profile: ${errorData.error}`)
      }
    } catch (err) {
      console.error('Failed to share:', err)
    } finally {
      setIsSaving(false)
    }
  }

  // Add Service Log Handler (supports optimistic updates)
  const handleAddLog = async () => {
    const componentName = newLog.component === 'Other' ? newLog.customComponent : newLog.component
    if (!componentName || !newLog.date || !newLog.currentMileage) return
    
    setIsSaving(true)

    // Formulate new event
    const freshLog = {
      id: `log-${Date.now()}`,
      date: newLog.date,
      component: componentName,
      currentMileage: parseFloat(newLog.currentMileage),
      cost: parseFloat(newLog.cost) || 0,
      notes: newLog.notes || '',
    }

    // Optimistic Update: Append to timeline instantly for zero-latency feeling
    const currentEvents = timeline.filter(e => !e.isPredictive)
    const optimisticEvents = [...currentEvents, freshLog]
    const optimisticResult = computeTimelineData(optimisticEvents, intervals)

    // Save previous states in case we need to roll back
    const previousTimeline = timeline
    const previousAnalytics = analytics

    setTimeline(optimisticResult.timeline)
    setAnalytics(optimisticResult.analytics)
    setOpenLogDialog(false)

    // Reset log form input
    setNewLog({
      date: new Date().toISOString().split('T')[0],
      component: 'Oil Change',
      customComponent: '',
      currentMileage: '',
      cost: '',
      notes: '',
    })

    if (demoMode) {
      localStorage.setItem(`gasketcase_demo_events_${selectedVehicle.id}`, JSON.stringify(optimisticEvents))
      setIsSaving(false)
      return
    }

    try {
      const res = await fetch('/api/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spreadsheetId: selectedVehicle.id,
          date: freshLog.date,
          component: freshLog.component,
          currentMileage: freshLog.currentMileage,
          cost: freshLog.cost,
          notes: freshLog.notes,
        }),
      })

      if (!res.ok) {
        throw new Error('Server append failed')
      }
      
      // Re-fetch timeline from sheets to synchronize with server-generated IDs
      fetchTimeline(selectedVehicle.id)
    } catch (err) {
      console.error('Failed to append log:', err)
      // Rollback optimistic state updates on network/Sheets API error
      setTimeline(previousTimeline)
      setAnalytics(previousAnalytics)
      alert('Failed to log service to Google Sheets. Rolling back timeline.')
    } finally {
      setIsSaving(false)
    }
  }

  // Pre-fill log dialog from upcoming prediction event card shortcuts
  const handlePredictiveLogClick = (predEvent) => {
    setNewLog({
      date: new Date().toISOString().split('T')[0],
      component: Object.keys(DEFAULT_INTERVALS).includes(predEvent.component) ? predEvent.component : 'Other',
      customComponent: Object.keys(DEFAULT_INTERVALS).includes(predEvent.component) ? '' : predEvent.component,
      currentMileage: Math.round(predEvent.targetOdometer),
      cost: predEvent.avgCost > 0 ? predEvent.avgCost : '',
      notes: 'Scheduled milestone maintenance',
    })
    setOpenLogDialog(true)
  }

  // Exit App Handler
  const handleExit = () => {
    if (demoMode) {
      setDemoMode(false)
      setVehicles([])
      setSelectedVehicle(null)
      setTimeline([])
    } else {
      signOut()
    }
  }

  // Format currency numbers
  const formatCost = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  // Loading spinner during NextAuth check
  if (status === 'loading') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#0B0F19',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress
          sx={{
            color: 'primary.main',
          }}
        />
      </Box>
    )
  }

  // VIEW 1: LANDING PAGE (UNAUTHORIZED & NOT IN DEMO MODE)
  if (!session && !demoMode) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0B0F19 0%, #111827 50%, #07152B 100%)',
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Simple top logo header */}
        <Box
          sx={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(11, 15, 25, 0.7)',
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            py: 2.5,
          }}
        >
          <Container
            maxWidth="lg"
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <DirectionsCarIcon
                sx={{
                  fontSize: '2rem',
                  color: 'primary.main',
                  filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))',
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #06B6D4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                GasketCase
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Hero & Pitch Panel */}
        <Container
          maxWidth="md"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            py: 8,
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              mb: 8,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.75rem' },
                lineHeight: 1.2,
                mb: 3,
                fontWeight: 900,
              }}
            >
              Take Perpetual Custody Of Your Vehicle Logs
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                maxWidth: '640px',
                mx: 'auto',
                mb: 6,
                lineHeight: 1.6,
              }}
            >
              GasketCase is a decentralized, zero-storage automotive maintenance lifecycle timeline. All data is structured, read, and saved exclusively in Google Sheets documents owned entirely by you.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                gap: 3,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={
                  <CloudQueueIcon />
                }
                onClick={() => signIn('google')}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  fontSize: '1rem',
                  py: 1.8,
                  px: 4,
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                  '&:hover': {
                    backgroundColor: '#0891B2',
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)',
                  },
                }}
              >
                Authorize with Google
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={
                  <PlayArrowIcon />
                }
                onClick={handleEnterDemoMode}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#F3F4F6',
                  fontSize: '1rem',
                  py: 1.8,
                  px: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(6, 182, 212, 0.04)',
                  },
                }}
              >
                Launch Guest Demo
              </Button>
            </Box>
          </Box>

          {/* Three-Column Architecture Highlight */}
          <Grid
            container
            spacing={4}
          >
            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(17, 24, 39, 0.4)',
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                  }}
                >
                  <CloudQueueIcon
                    sx={{
                      fontSize: '2.5rem',
                      color: 'primary.main',
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                    }}
                  >
                    Zero-Storage Backend
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.5,
                    }}
                  >
                    GasketCase keeps no relational database. It is a stateless rendering engine. Decouple at any time; your raw files remain permanently available in your Google Drive.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(17, 24, 39, 0.4)',
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                  }}
                >
                  <BuildIcon
                    sx={{
                      fontSize: '2.5rem',
                      color: 'secondary.main',
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                    }}
                  >
                    Linear Odometer Velocity
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.5,
                    }}
                  >
                    The prediction engine calculates your daily driving velocity ($\Delta V$) over time to forecast exact calendar dates for upcoming milestones.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(17, 24, 39, 0.4)',
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                  }}
                >
                  <ShareIcon
                    sx={{
                      fontSize: '2.5rem',
                      color: 'warning.main',
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                    }}
                  >
                    Federated Sharing
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.5,
                    }}
                  >
                    Share files natively with mechanics or co-owners using Google Drive Workspace security. GasketCase aggregates items "shared with me" automatically.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            backgroundColor: 'rgba(11, 15, 25, 0.9)',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
            }}
          >
            GasketCase Privacy-First Automotive Lifecycle Logging. Owned by you. Housed by Google.
          </Typography>
        </Box>
      </Box>
    )
  }

  // VIEW 2: MAIN DASHBOARD VIEW
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0B0F19',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navbar */}
      <Box
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(17, 24, 39, 0.7)',
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          py: 2,
        }}
      >
        <Container
          maxWidth="lg"
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <DirectionsCarIcon
                sx={{
                  color: 'primary.main',
                  fontSize: '1.8rem',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                }}
              >
                GasketCase
              </Typography>
              {demoMode && (
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.3,
                    borderRadius: 1,
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: 'warning.main',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Guest Demo
                </Box>
              )}
            </Box>

            {/* Profile Dropdown / Logged in details */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              {session ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    src={session.user.image}
                    alt={session.user.name}
                    sx={{
                      width: 32,
                      height: 32,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      fontWeight: 600,
                    }}
                  >
                    {session.user.name}
                  </Typography>
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                  }}
                >
                  Guest Driver
                </Typography>
              )}
              <Tooltip
                title="Sign Out / Exit"
              >
                <IconButton
                  onClick={handleExit}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'error.main',
                    },
                  }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          flexGrow: 1,
        }}
      >
        {/* Controls and Selectors Row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            mb: 4,
          }}
        >
          {/* Vehicle Dropdown Selector */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <TextField
              select
              label="Selected Vehicle"
              value={selectedVehicle?.id || ''}
              onChange={(e) => {
                const veh = vehicles.find(v => v.id === e.target.value)
                if (veh) handleSelectVehicle(veh)
              }}
              size="small"
              sx={{
                minWidth: 220,
              }}
              slotProps={{
                select: {
                  MenuProps: {
                    slotProps: {
                      paper: {
                        sx: {
                          backgroundColor: '#111827',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        },
                      },
                    },
                  },
                },
              }}
            >
              {vehicles.map((v) => (
                <MenuItem
                  key={v.id}
                  value={v.id}
                >
                  {v.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="outlined"
              size="small"
              startIcon={
                <AddIcon />
              }
              onClick={() => setOpenVehicleDialog(true)}
              sx={{
                py: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(6, 182, 212, 0.04)',
                },
              }}
            >
              Add Vehicle
            </Button>
          </Box>

          {/* Quick Action Button cluster */}
          {selectedVehicle && (
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                startIcon={
                  <SettingsIcon />
                }
                onClick={() => setOpenIntervalsDialog(true)}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(6, 182, 212, 0.04)',
                  },
                }}
              >
                Intervals
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={
                  <ShareIcon />
                }
                onClick={() => setOpenShareDialog(true)}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(6, 182, 212, 0.04)',
                  },
                }}
              >
                Share
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={
                  <AddIcon />
                }
                onClick={() => setOpenLogDialog(true)}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: '#0891B2',
                  },
                }}
              >
                Log Service
              </Button>
            </Box>
          )}
        </Box>

        {/* Analytics Statistics Row */}
        {selectedVehicle && (
          <Grid
            container
            spacing={3}
            sx={{
              mb: 4,
            }}
          >
            {/* Odometer Estimated Display */}
            <Grid
              size={{
                xs: 12,
                sm: 4,
              }}
            >
              <Card>
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: 'rgba(6, 182, 212, 0.1)',
                      color: 'primary.main',
                      width: 48,
                      height: 48,
                    }}
                  >
                    <SpeedIcon />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        display: 'block',
                      }}
                    >
                      Estimated Odometer
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        fontFamily: 'monospace',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {analytics.currentOdometer.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#9CA3AF' }}>mi</span>
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'primary.main',
                        display: 'block',
                        fontSize: '0.72rem',
                        mt: 0.5,
                      }}
                    >
                      Driving {analytics.dailyVelocity.toFixed(1)} miles/day
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Total Expense Display */}
            <Grid
              size={{
                xs: 12,
                sm: 4,
              }}
            >
              <Card>
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      color: 'secondary.main',
                      width: 48,
                      height: 48,
                    }}
                  >
                    <AttachMoneyIcon />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        display: 'block',
                      }}
                    >
                      Total Lifecycle Cost
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                      }}
                    >
                      {formatCost(analytics.totalSpent)}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        display: 'block',
                        fontSize: '0.72rem',
                        mt: 0.5,
                      }}
                    >
                      Across {analytics.logCount} service logs
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Custodian File System Status */}
            <Grid
              size={{
                xs: 12,
                sm: 4,
              }}
            >
              <Card>
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      color: 'warning.main',
                      width: 48,
                      height: 48,
                    }}
                  >
                    <CloudQueueIcon />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        display: 'block',
                      }}
                    >
                      Data Custody Status
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        lineHeight: 1.3,
                      }}
                    >
                      {demoMode ? 'Local browser sandbox' : 'Connected to Drive'}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        display: 'block',
                        fontSize: '0.72rem',
                        mt: 0.5,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 220,
                      }}
                    >
                      File: {demoMode ? 'sandbox_storage' : `GasketCase_${selectedVehicle.name}`}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Dashboard Grid Content */}
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 12,
            }}
          >
            <CircularProgress
              sx={{
                color: 'primary.main',
              }}
            />
          </Box>
        ) : selectedVehicle ? (
          <Grid
            container
            spacing={4}
          >
            {/* Left Column: Timeline */}
            <Grid
              size={{
                xs: 12,
                md: 8,
              }}
            >
              <Card
                sx={{
                  p: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                  }}
                >
                  Maintenance Chronology
                </Typography>

                {timeline.length === 0 ? (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 6,
                      border: '1px dashed rgba(255, 255, 255, 0.1)',
                      borderRadius: 2,
                    }}
                  >
                    <InfoIcon
                      sx={{
                        fontSize: '2rem',
                        color: 'text.secondary',
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      No logs written yet
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mb: 2,
                      }}
                    >
                      Log your first maintenance event to start odometer calculation and linear forecasting.
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => setOpenLogDialog(true)}
                    >
                      Log Service
                    </Button>
                  </Box>
                ) : (
                  /* Custom Timeline Element */
                  <Box
                    sx={{
                      position: 'relative',
                      pl: 4,
                    }}
                  >
                    {/* The continuous vertical axis connector line */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 7,
                        top: 10,
                        bottom: 10,
                        width: 2,
                        backgroundColor: 'rgba(6, 182, 212, 0.15)',
                        zIndex: 1,
                      }}
                    />

                    {/* Timeline items array */}
                    {timeline.map((event, idx) => {
                      // Determine if it is a prediction card
                      const isPredictive = event.isPredictive

                      // Add a special Today separator if we cross from past to future
                      const showTodaySeparator = !isPredictive && 
                        timeline[idx + 1] && 
                        timeline[idx + 1].isPredictive

                      return (
                        <React.Fragment
                          key={event.id}
                        >
                          <Box
                            sx={{
                              position: 'relative',
                              mb: 4,
                              zIndex: 2,
                            }}
                          >
                            {/* Circular bullet node marker on the timeline line */}
                            <Box
                              sx={{
                                position: 'absolute',
                                left: -32,
                                top: 12,
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                border: '3px solid',
                                borderColor: isPredictive 
                                  ? (event.isOverdue ? 'error.main' : 'primary.main')
                                  : 'secondary.main',
                                backgroundColor: isPredictive ? 'transparent' : 'secondary.main',
                                boxShadow: isPredictive 
                                  ? 'none' 
                                  : '0 0 10px rgba(16, 185, 129, 0.4)',
                              }}
                            />

                            {/* Card Item Container */}
                            <Card
                              sx={{
                                border: isPredictive ? '1px dashed' : '1px solid rgba(255, 255, 255, 0.05)',
                                borderColor: isPredictive 
                                  ? (event.isOverdue ? 'rgba(239, 68, 68, 0.4)' : 'rgba(6, 182, 212, 0.4)')
                                  : 'rgba(255, 255, 255, 0.05)',
                                backgroundColor: isPredictive 
                                  ? (event.isOverdue ? 'rgba(239, 68, 68, 0.03)' : 'rgba(6, 182, 212, 0.02)')
                                  : '#111827',
                                transition: 'transform 0.2s, border-color 0.2s',
                                '&:hover': {
                                  transform: 'translateX(4px)',
                                  borderColor: isPredictive 
                                    ? (event.isOverdue ? 'error.main' : 'primary.main')
                                    : 'secondary.main',
                                },
                              }}
                            >
                              <CardContent
                                sx={{
                                  p: 2.5,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    mb: 1.5,
                                  }}
                                >
                                  {/* Component Name and Label Type */}
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 1,
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        fontWeight: 700,
                                      }}
                                    >
                                      {event.component}
                                    </Typography>
                                    {isPredictive ? (
                                      <Box
                                        sx={{
                                          px: 1,
                                          py: 0.1,
                                          borderRadius: 0.5,
                                          fontSize: '0.65rem',
                                          fontWeight: 700,
                                          backgroundColor: event.isOverdue ? 'rgba(239, 68, 68, 0.1)' : 'rgba(6, 182, 212, 0.1)',
                                          border: '1px solid',
                                          borderColor: event.isOverdue ? 'error.main' : 'primary.main',
                                          color: event.isOverdue ? 'error.main' : 'primary.main',
                                          textTransform: 'uppercase',
                                        }}
                                      >
                                        Forecasted
                                      </Box>
                                    ) : (
                                      <Box
                                        sx={{
                                          px: 1,
                                          py: 0.1,
                                          borderRadius: 0.5,
                                          fontSize: '0.65rem',
                                          fontWeight: 700,
                                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                          border: '1px solid',
                                          borderColor: 'secondary.main',
                                          color: 'secondary.main',
                                          textTransform: 'uppercase',
                                        }}
                                      >
                                        Logged
                                      </Box>
                                    )}
                                  </Box>

                                  {/* Odometer readout */}
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 700,
                                      fontFamily: 'monospace',
                                      color: isPredictive ? 'text.secondary' : 'text.primary',
                                    }}
                                  >
                                    {isPredictive ? `Due at ~${event.targetOdometer.toLocaleString()}` : `${event.currentMileage.toLocaleString()}`} mi
                                  </Typography>
                                </Box>

                                {/* Event Details & Predictions Metadata */}
                                {isPredictive ? (
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.5,
                                        mb: 2,
                                      }}
                                    >
                                      {event.isOverdue ? (
                                        <span style={{ color: '#EF4444', fontWeight: 600 }}>
                                          Overdue by {-event.remainingMileage.toLocaleString()} miles ({-event.remainingDays} days ago)
                                        </span>
                                      ) : (
                                        <span>
                                          Estimated due in <strong>{event.remainingMileage.toLocaleString()}</strong> miles (roughly <strong>{event.remainingDays}</strong> days)
                                        </span>
                                      )}
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 1.5,
                                          color: 'text.secondary',
                                        }}
                                      >
                                        <CalendarTodayIcon
                                          sx={{
                                            fontSize: '1rem',
                                          }}
                                        />
                                        <Typography
                                          variant="caption"
                                          sx={{
                                            fontWeight: 500,
                                          }}
                                        >
                                          Est. Date: {new Date(event.date + 'T00:00:00').toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                        </Typography>
                                        {event.avgCost > 0 && (
                                          <React.Fragment>
                                            <Typography
                                              variant="caption"
                                              sx={{
                                                color: 'text.secondary',
                                              }}
                                            >
                                              •
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              sx={{
                                                fontWeight: 500,
                                              }}
                                            >
                                              Est. Cost: {formatCost(event.avgCost)}
                                            </Typography>
                                          </React.Fragment>
                                        )}
                                      </Box>
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        color={event.isOverdue ? 'error' : 'primary'}
                                        onClick={() => handlePredictiveLogClick(event)}
                                        sx={{
                                          fontSize: '0.72rem',
                                          py: 0.5,
                                          px: 1.5,
                                        }}
                                      >
                                        Log Done
                                      </Button>
                                    </Box>
                                  </Box>
                                ) : (
                                  <Box>
                                    {event.notes && (
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          color: 'text.secondary',
                                          mb: 1.5,
                                          lineHeight: 1.5,
                                        }}
                                      >
                                        {event.notes}
                                      </Typography>
                                    )}
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 1.5,
                                          color: 'text.secondary',
                                        }}
                                      >
                                        <CalendarTodayIcon
                                          sx={{
                                            fontSize: '1rem',
                                          }}
                                        />
                                        <Typography
                                          variant="caption"
                                          sx={{
                                            fontWeight: 500,
                                          }}
                                        >
                                          {new Date(event.date + 'T00:00:00').toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                        </Typography>
                                      </Box>
                                      {event.cost > 0 && (
                                        <Typography
                                          variant="subtitle2"
                                          sx={{
                                            fontWeight: 700,
                                            color: 'secondary.main',
                                          }}
                                        >
                                          {formatCost(event.cost)}
                                        </Typography>
                                      )}
                                    </Box>
                                  </Box>
                                )}
                              </CardContent>
                            </Card>
                          </Box>

                          {/* Present Day Visual Marker along vertical axis */}
                          {showTodaySeparator && (
                            <Box
                              sx={{
                                position: 'relative',
                                my: 4,
                                py: 1.5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Box
                                sx={{
                                  position: 'absolute',
                                  left: -33,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  backgroundColor: '#0B0F19',
                                  border: '2px solid #06B6D4',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
                                  zIndex: 3,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#06B6D4',
                                  }}
                                />
                              </Box>
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '1px',
                                  backgroundColor: 'rgba(6, 182, 212, 0.3)',
                                  position: 'absolute',
                                  left: 0,
                                  zIndex: 1,
                                }}
                              />
                              <Box
                                sx={{
                                  px: 2,
                                  py: 0.5,
                                  borderRadius: 10,
                                  backgroundColor: '#0B0F19',
                                  border: '1px solid rgba(6, 182, 212, 0.3)',
                                  zIndex: 2,
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                  }}
                                >
                                  Present Day Odometer: ~{analytics.currentOdometer.toLocaleString()} mi
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </Box>
                )}
              </Card>
            </Grid>

            {/* Right Column: Predictive Checklists & Gauges */}
            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Card
                sx={{
                  p: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                  }}
                >
                  Predictive Tasks
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}
                >
                  {timeline
                    .filter(e => e.isPredictive)
                    .map((item) => {
                      const maxInterval = intervals[item.component] || 5000
                      
                      // Progress Math: remaining distance percentage
                      const progress = item.isOverdue
                        ? 100
                        : Math.max(0, Math.min(100, ((maxInterval - item.remainingMileage) / maxInterval) * 100))

                      // Choose bar color
                      let barColor = 'success'
                      if (item.isOverdue) {
                        barColor = 'error'
                      } else if (item.remainingMileage < 1500) {
                        barColor = 'warning'
                      }

                      return (
                        <Box
                          key={item.id}
                          onClick={() => handlePredictiveLogClick(item)}
                          sx={{
                            cursor: 'pointer',
                            p: 2,
                            borderRadius: 1.5,
                            border: '1px solid rgba(255, 255, 255, 0.03)',
                            backgroundColor: 'rgba(255, 255, 255, 0.01)',
                            transition: 'background-color 0.2s',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                              }}
                            >
                              {item.component}
                            </Typography>
                            {item.isOverdue ? (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: 'error.main',
                                  fontWeight: 700,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5,
                                }}
                              >
                                <WarningIcon
                                  sx={{
                                    fontSize: '0.9rem',
                                  }}
                                />
                                Overdue
                              </Typography>
                            ) : (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: 'text.secondary',
                                }}
                              >
                                {item.remainingMileage.toLocaleString()} mi left
                              </Typography>
                            )}
                          </Box>
                          
                          <LinearProgress
                            variant="determinate"
                            value={progress}
                            color={barColor}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                            }}
                          />
                        </Box>
                      )
                    })}
                </Box>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
              }}
            >
              No vehicles available. Create a vehicle sheet to get started.
            </Typography>
          </Box>
        )}
      </Container>

      {/* DIALOG 1: ADD SERVICE LOG DIALOG */}
      <Dialog
        open={openLogDialog}
        onClose={() => setOpenLogDialog(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#111827',
              backgroundImage: 'none',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              minWidth: { xs: '90%', sm: 460 },
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            pb: 2,
          }}
        >
          Log Maintenance Service
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Date Picker */}
          <TextField
            label="Service Date"
            type="date"
            value={newLog.date}
            onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          {/* Component Selection */}
          <TextField
            select
            label="Component / Task"
            value={newLog.component}
            onChange={(e) => setNewLog({ ...newLog, component: e.target.value })}
            fullWidth
            slotProps={{
              select: {
                MenuProps: {
                  slotProps: {
                    paper: {
                      sx: {
                        backgroundColor: '#111827',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      },
                    },
                  },
                },
              },
            }}
          >
            {Object.keys(DEFAULT_INTERVALS).map((key) => (
              <MenuItem
                key={key}
                value={key}
              >
                {key}
              </MenuItem>
            ))}
            <MenuItem
              value="Other"
            >
              Other / Custom Task
            </MenuItem>
          </TextField>

          {/* Custom Component input if "Other" is selected */}
          {newLog.component === 'Other' && (
            <TextField
              label="Custom Task Name"
              value={newLog.customComponent}
              onChange={(e) => setNewLog({ ...newLog, customComponent: e.target.value })}
              fullWidth
            />
          )}

          {/* Odometer Input */}
          <TextField
            label="Odometer (Miles)"
            type="number"
            value={newLog.currentMileage}
            onChange={(e) => setNewLog({ ...newLog, currentMileage: e.target.value })}
            fullWidth
          />

          {/* Cost Input */}
          <TextField
            label="Service Cost (USD)"
            type="number"
            value={newLog.cost}
            onChange={(e) => setNewLog({ ...newLog, cost: e.target.value })}
            fullWidth
            slotProps={{
              htmlInput: {
                step: '0.01',
              },
            }}
          />

          {/* Notes Input */}
          <TextField
            label="Notes / Comments"
            value={newLog.notes}
            onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Button
            onClick={() => setOpenLogDialog(false)}
            sx={{
              color: 'text.secondary',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddLog}
            disabled={isSaving}
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: '#0891B2',
              },
            }}
          >
            {isSaving ? <CircularProgress size={20} /> : 'Save Log'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG 2: CREATE VEHICLE PROFILE */}
      <Dialog
        open={openVehicleDialog}
        onClose={() => setOpenVehicleDialog(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#111827',
              backgroundImage: 'none',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              minWidth: { xs: '90%', sm: 400 },
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            pb: 2,
          }}
        >
          Add New Vehicle Profile
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 3.5,
              lineHeight: 1.5,
            }}
          >
            {demoMode 
              ? 'Add a vehicle profile in your local browser sandbox.' 
              : 'GasketCase will initialize a new Google Sheet inside your Drive root directory specifically formatted for this vehicle.'}
          </Typography>
          <TextField
            label="Vehicle Name (e.g. 2021 Corolla)"
            value={newVehicleName}
            onChange={(e) => setNewVehicleName(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Button
            onClick={() => setOpenVehicleDialog(false)}
            sx={{
              color: 'text.secondary',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateVehicle}
            disabled={isSaving || !newVehicleName}
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: '#0891B2',
              },
            }}
          >
            {isSaving ? <CircularProgress size={20} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG 3: SHARE DIALOG */}
      <Dialog
        open={openShareDialog}
        onClose={() => setOpenShareDialog(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#111827',
              backgroundImage: 'none',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              minWidth: { xs: '90%', sm: 400 },
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            pb: 2,
          }}
        >
          Share Vehicle Profile
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 3.5,
              lineHeight: 1.5,
            }}
          >
            Grant read/write permissions directly on the underlying Google Sheet spreadsheet in Google Drive to a mechanic, family member, or friend.
          </Typography>
          <TextField
            label="Collaborator Email Address"
            type="email"
            value={shareEmail}
            onChange={(e) => setShareEmail(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Button
            onClick={() => setOpenShareDialog(false)}
            sx={{
              color: 'text.secondary',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleShareVehicle}
            disabled={isSaving || !shareEmail}
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: '#0891B2',
              },
            }}
          >
            {isSaving ? <CircularProgress size={20} /> : 'Send Invite'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG 4: CUSTOM INTERVALS MANAGER */}
      <Dialog
        open={openIntervalsDialog}
        onClose={() => setOpenIntervalsDialog(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: '#111827',
              backgroundImage: 'none',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              minWidth: { xs: '90%', sm: 440 },
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            pb: 2,
          }}
        >
          Configure Maintenance Intervals
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 1.5,
              lineHeight: 1.5,
            }}
          >
            Adjust the threshold mileages ($\Delta M$) GasketCase targets for calculations. These updates are client-scoped.
          </Typography>

          {Object.entries(intervals).map(([key, value]) => (
            <TextField
              key={key}
              label={`${key} Interval (Miles)`}
              type="number"
              value={value}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0
                setIntervals({ ...intervals, [key]: val })
              }}
              fullWidth
              size="small"
            />
          ))}
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Button
            onClick={() => setIntervals(DEFAULT_INTERVALS)}
            sx={{
              color: 'warning.main',
              mr: 'auto',
            }}
          >
            Reset Defaults
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenIntervalsDialog(false)}
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: '#0891B2',
              },
            }}
          >
            Save & Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
