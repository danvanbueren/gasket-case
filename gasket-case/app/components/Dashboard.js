'use client'

import React from 'react'
import {
  Box,
  Container,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SettingsIcon from '@mui/icons-material/Settings'
import ShareIcon from '@mui/icons-material/Share'

import Navbar from './Navbar'
import AnalyticsCards from './AnalyticsCards'
import MaintenanceChronology from './MaintenanceChronology'
import PredictiveTasks from './PredictiveTasks'

export default function Dashboard({
  session,
  demoMode,
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  onOpenVehicleDialog,
  onOpenIntervalsDialog,
  onOpenShareDialog,
  onOpenLogDialog,
  timeline,
  analytics,
  intervals,
  isLoading,
  onExit,
  onPredictiveLogClick,
}) {
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
      <Navbar
        session={session}
        demoMode={demoMode}
        onExit={onExit}
      />

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
                const veh = vehicles.find((v) => v.id === e.target.value)
                if (veh) onSelectVehicle(veh)
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
              onClick={onOpenVehicleDialog}
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
                onClick={onOpenIntervalsDialog}
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
                onClick={onOpenShareDialog}
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
                onClick={onOpenLogDialog}
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

        <AnalyticsCards
          analytics={analytics}
          demoMode={demoMode}
          selectedVehicle={selectedVehicle}
        />

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
              <MaintenanceChronology
                timeline={timeline}
                analytics={analytics}
                onPredictiveLogClick={onPredictiveLogClick}
                onOpenLogDialog={onOpenLogDialog}
              />
            </Grid>

            {/* Right Column: Predictive Checklists & Progress */}
            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <PredictiveTasks
                timeline={timeline}
                intervals={intervals}
                onPredictiveLogClick={onPredictiveLogClick}
              />
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
    </Box>
  )
}
