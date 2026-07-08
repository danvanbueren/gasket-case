'use client'

import React from 'react'
import { Grid, Card, CardContent, Avatar, Box, Typography } from '@mui/material'
import SpeedIcon from '@mui/icons-material/Speed'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'

export default function AnalyticsCards({ analytics, demoMode, selectedVehicle }) {
  const formatCost = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  if (!selectedVehicle) return null

  return (
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
  )
}
