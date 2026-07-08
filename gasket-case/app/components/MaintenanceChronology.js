'use client'

import React from 'react'
import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

export default function MaintenanceChronology({
  timeline,
  analytics,
  onPredictiveLogClick,
  onOpenLogDialog,
}) {
  const formatCost = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

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
            onClick={onOpenLogDialog}
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
                              onClick={() => onPredictiveLogClick(event)}
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
  )
}
