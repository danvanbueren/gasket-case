'use client'

import React from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material'
import CloudIcon from '@mui/icons-material/Cloud'
import LaunchIcon from '@mui/icons-material/Launch'
import HomeIcon from '@mui/icons-material/Home'
import CheckIcon from '@mui/icons-material/Check'
import FlightIcon from '@mui/icons-material/Flight'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import ConstructionIcon from '@mui/icons-material/Construction'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        pb: 8,
      }}
    >
      {/* Centered Navbar */}
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(18, 18, 18, 0.7)',
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
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CloudIcon
              sx={{
                fontSize: '1.8rem',
                color: 'primary.main',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              vanbueren.cloud
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Links Content */}
      <Container
        maxWidth="md"
        sx={{
          mt: 8,
        }}
      >
        <Grid
          container
          spacing={4}
        >
          {/* Card 1: Internal Links */}
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <Card
              sx={{
                height: '100%',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                  }}
                >
                  Internal Links
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}
                >
                  {/* Dashboard */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        display: 'block',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Dashboard
                    </Typography>
                    <Button
                      variant="contained"
                      href="/"
                      startIcon={
                        <HomeIcon />
                      }
                      endIcon={
                        <CheckIcon />
                      }
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        width: '100%',
                        py: 1.5,
                        px: 2,
                        color: 'primary.contrastText',
                        fontWeight: 600,
                        backgroundColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                        '& .MuiButton-startIcon': {
                          color: 'inherit',
                          mr: 1.5,
                        },
                        '& .MuiButton-endIcon': {
                          color: 'inherit',
                          marginLeft: 'auto',
                        },
                      }}
                    >
                      vanbueren.cloud
                    </Button>
                  </Box>

                  {/* Airspace Sim */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        display: 'block',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      airspace-sim
                    </Typography>
                    <Button
                      variant="outlined"
                      href="https://airspace-sim.vanbueren.cloud/"
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={
                        <FlightIcon />
                      }
                      endIcon={
                        <LaunchIcon />
                      }
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        width: '100%',
                        py: 1.5,
                        px: 2,
                        borderColor: 'divider',
                        color: 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(144, 202, 249, 0.08)',
                        },
                        '& .MuiButton-startIcon': {
                          color: 'primary.main',
                          mr: 1.5,
                        },
                        '& .MuiButton-endIcon': {
                          color: 'text.secondary',
                          marginLeft: 'auto',
                        },
                      }}
                    >
                      airspace-sim.vanbueren.cloud
                    </Button>
                  </Box>

                  {/* Tracklink */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        display: 'block',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Tracklink
                    </Typography>
                    <Button
                      variant="outlined"
                      href="https://tracklink.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={
                        <MusicNoteIcon />
                      }
                      endIcon={
                        <LaunchIcon />
                      }
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        width: '100%',
                        py: 1.5,
                        px: 2,
                        borderColor: 'divider',
                        color: 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(144, 202, 249, 0.08)',
                        },
                        '& .MuiButton-startIcon': {
                          color: 'primary.main',
                          mr: 1.5,
                        },
                        '& .MuiButton-endIcon': {
                          color: 'text.secondary',
                          marginLeft: 'auto',
                        },
                      }}
                    >
                      tracklink.app
                    </Button>
                  </Box>

                  {/* Gasket Case */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        display: 'block',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Gasket Case
                    </Typography>
                    <Button
                      variant="outlined"
                      href="https://gasketcase.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={
                        <ConstructionIcon />
                      }
                      endIcon={
                        <LaunchIcon />
                      }
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        width: '100%',
                        py: 1.5,
                        px: 2,
                        borderColor: 'divider',
                        color: 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(144, 202, 249, 0.08)',
                        },
                        '& .MuiButton-startIcon': {
                          color: 'primary.main',
                          mr: 1.5,
                        },
                        '& .MuiButton-endIcon': {
                          color: 'text.secondary',
                          marginLeft: 'auto',
                        },
                      }}
                    >
                      gasketcase.app
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2: External Links */}
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <Card
              sx={{
                height: '100%',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                  }}
                >
                  External Links
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}
                >
                  {/* Planning & Development */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        display: 'block',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Planning & Development
                    </Typography>
                    <Button
                      variant="outlined"
                      href="https://github.com/danvanbueren"
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={
                        <GitHubIcon />
                      }
                      endIcon={
                        <LaunchIcon />
                      }
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        width: '100%',
                        py: 1.5,
                        px: 2,
                        borderColor: 'divider',
                        color: 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(144, 202, 249, 0.08)',
                        },
                        '& .MuiButton-startIcon': {
                          color: 'primary.main',
                          mr: 1.5,
                        },
                        '& .MuiButton-endIcon': {
                          color: 'text.secondary',
                          marginLeft: 'auto',
                        },
                      }}
                    >
                      /danvanbueren
                    </Button>
                  </Box>

                  {/* Professional Network */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        display: 'block',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Professional Network
                    </Typography>
                    <Button
                      variant="outlined"
                      href="https://www.linkedin.com/in/danvanbueren/"
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={
                        <LinkedInIcon />
                      }
                      endIcon={
                        <LaunchIcon />
                      }
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        width: '100%',
                        py: 1.5,
                        px: 2,
                        borderColor: 'divider',
                        color: 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(144, 202, 249, 0.08)',
                        },
                        '& .MuiButton-startIcon': {
                          color: 'primary.main',
                          mr: 1.5,
                        },
                        '& .MuiButton-endIcon': {
                          color: 'text.secondary',
                          marginLeft: 'auto',
                        },
                      }}
                    >
                      /in/danvanbueren
                    </Button>
                  </Box>

                  {/* Support Me */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        display: 'block',
                        mb: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Support Me
                    </Typography>
                    <Button
                      variant="outlined"
                      href="https://ko-fi.com/danvanbueren"
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={
                        <LocalCafeIcon />
                      }
                      endIcon={
                        <LaunchIcon />
                      }
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        width: '100%',
                        py: 1.5,
                        px: 2,
                        borderColor: 'divider',
                        color: 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(144, 202, 249, 0.08)',
                        },
                        '& .MuiButton-startIcon': {
                          color: 'primary.main',
                          mr: 1.5,
                        },
                        '& .MuiButton-endIcon': {
                          color: 'text.secondary',
                          marginLeft: 'auto',
                        },
                      }}
                    >
                      /danvanbueren
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
