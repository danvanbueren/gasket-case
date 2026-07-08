'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import { computeTimelineData, DEFAULT_INTERVALS } from './utils/timeline'
import LoadingScreen from './components/LoadingScreen'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'

import LogDialog from './components/LogDialog'
import VehicleDialog from './components/VehicleDialog'
import ShareDialog from './components/ShareDialog'
import IntervalsDialog from './components/IntervalsDialog'

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
  
  // DialogPrefill State
  const [initialLogData, setInitialLogData] = useState(null)

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
  const handleCreateVehicle = async (vehicleName) => {
    setIsSaving(true)
    
    if (demoMode) {
      const newVeh = {
        id: `demo-veh-${Date.now()}`,
        name: vehicleName,
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
          name: vehicleName,
        }),
      })
      const data = await res.json()
      if (data.id) {
        const newVeh = { id: data.id, name: data.name, owners: [] }
        setVehicles((prev) => [...prev, newVeh])
        setSelectedVehicle(newVeh)
        setOpenVehicleDialog(false)
      }
    } catch (err) {
      console.error('Failed to create vehicle sheet:', err)
    } finally {
      setIsSaving(false)
    }
  }

  // Share Vehicle Handler
  const handleShareVehicle = async (shareEmail) => {
    if (!selectedVehicle) return
    setIsSaving(true)
    
    if (demoMode) {
      alert(`Demo Mode: Simulating vehicle sharing invite to ${shareEmail}.`)
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
  const handleAddLog = async (logData) => {
    const componentName = logData.component === 'Other' ? logData.customComponent : logData.component
    if (!componentName || !logData.date || !logData.currentMileage) return
    
    setIsSaving(true)

    // Formulate new event
    const freshLog = {
      id: `log-${Date.now()}`,
      date: logData.date,
      component: componentName,
      currentMileage: parseFloat(logData.currentMileage),
      cost: parseFloat(logData.cost) || 0,
      notes: logData.notes || '',
    }

    // Optimistic Update: Append to timeline instantly for zero-latency feeling
    const currentEvents = timeline.filter((e) => !e.isPredictive)
    const optimisticEvents = [...currentEvents, freshLog]
    const optimisticResult = computeTimelineData(optimisticEvents, intervals)

    // Save previous states in case we need to roll back
    const previousTimeline = timeline
    const previousAnalytics = analytics

    setTimeline(optimisticResult.timeline)
    setAnalytics(optimisticResult.analytics)
    setOpenLogDialog(false)

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
    setInitialLogData({
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

  // Loading spinner during NextAuth check
  if (status === 'loading') {
    return <LoadingScreen />
  }

  // VIEW 1: LANDING PAGE (UNAUTHORIZED & NOT IN DEMO MODE)
  if (!session && !demoMode) {
    return (
      <LandingPage
        onSignIn={() => signIn('google')}
        onEnterDemoMode={handleEnterDemoMode}
      />
    )
  }

  // VIEW 2: MAIN DASHBOARD VIEW
  return (
    <React.Fragment>
      <Dashboard
        session={session}
        demoMode={demoMode}
        vehicles={vehicles}
        selectedVehicle={selectedVehicle}
        onSelectVehicle={handleSelectVehicle}
        onOpenVehicleDialog={() => setOpenVehicleDialog(true)}
        onOpenIntervalsDialog={() => setOpenIntervalsDialog(true)}
        onOpenShareDialog={() => setOpenShareDialog(true)}
        onOpenLogDialog={() => {
          setInitialLogData(null)
          setOpenLogDialog(true)
        }}
        timeline={timeline}
        analytics={analytics}
        intervals={intervals}
        isLoading={isLoading}
        onExit={handleExit}
        onPredictiveLogClick={handlePredictiveLogClick}
      />

      {/* dialog overlays */}
      <LogDialog
        open={openLogDialog}
        onClose={() => setOpenLogDialog(false)}
        isSaving={isSaving}
        onAddLog={handleAddLog}
        initialData={initialLogData}
        defaultIntervals={DEFAULT_INTERVALS}
      />

      <VehicleDialog
        open={openVehicleDialog}
        onClose={() => setOpenVehicleDialog(false)}
        isSaving={isSaving}
        onCreateVehicle={handleCreateVehicle}
        demoMode={demoMode}
      />

      <ShareDialog
        open={openShareDialog}
        onClose={() => setOpenShareDialog(false)}
        isSaving={isSaving}
        onShareVehicle={handleShareVehicle}
        demoMode={demoMode}
      />

      <IntervalsDialog
        open={openIntervalsDialog}
        onClose={() => setOpenIntervalsDialog(false)}
        intervals={intervals}
        onSaveIntervals={(nextIntervals) => {
          setIntervals(nextIntervals)
          setOpenIntervalsDialog(false)
        }}
        defaultIntervals={DEFAULT_INTERVALS}
      />
    </React.Fragment>
  )
}