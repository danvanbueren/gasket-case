'use client'

import React from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Link,
} from '@mui/material'
import CloudIcon from '@mui/icons-material/Cloud'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageIcon from '@mui/icons-material/Language'

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
                    mb: 3,
                  }}
                >
                  Internal Links
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2.5,
                  }}
                >
                  <Link
                    href="/"
                    underline="hover"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1.5,
                      color: 'primary.main',
                      fontWeight: 500,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <CloudIcon
                      sx={{
                        fontSize: '1.3rem',
                      }}
                    />
                    Home (Root)
                  </Link>
                  <Link
                    href="https://airspace-sim.vanbueren.cloud/"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1.5,
                      color: 'primary.main',
                      fontWeight: 500,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <LaunchIcon
                      sx={{
                        fontSize: '1.3rem',
                      }}
                    />
                    Airspace Sim
                  </Link>
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
                    mb: 3,
                  }}
                >
                  External Links
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2.5,
                  }}
                >
                  <Link
                    href="https://github.com/danvanbueren"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1.5,
                      color: 'primary.main',
                      fontWeight: 500,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <GitHubIcon
                      sx={{
                        fontSize: '1.3rem',
                      }}
                    />
                    GitHub Profile
                  </Link>
                  <Link
                    href="https://ko-fi.com/danvanbueren"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1.5,
                      color: 'primary.main',
                      fontWeight: 500,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <LanguageIcon
                      sx={{
                        fontSize: '1.3rem',
                      }}
                    />
                    Ko-fi
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/danvanbueren/"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1.5,
                      color: 'primary.main',
                      fontWeight: 500,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <LaunchIcon
                      sx={{
                        fontSize: '1.3rem',
                      }}
                    />
                    LinkedIn
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
