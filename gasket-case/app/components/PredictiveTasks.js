'use client'

import React from 'react'
import { Card, Box, Typography, LinearProgress } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'

export default function PredictiveTasks({ timeline, intervals, onPredictiveLogClick }) {
  const predictiveItems = timeline.filter((e) => e.isPredictive)

  return (
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
        {predictiveItems.length === 0 ? (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            No predictive tasks available.
          </Typography>
        ) : (
          predictiveItems.map((item) => {
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
                onClick={() => onPredictiveLogClick(item)}
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
          })
        )}
      </Box>
    </Card>
  )
}
