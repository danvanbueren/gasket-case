'use client'

import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ShareIcon from '@mui/icons-material/Share'
import BuildIcon from '@mui/icons-material/Build'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

export default function LandingPage({ onSignIn, onEnterDemoMode }) {
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
              onClick={onSignIn}
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
              onClick={onEnterDemoMode}
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
