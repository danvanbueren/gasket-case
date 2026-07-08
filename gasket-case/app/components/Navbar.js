'use client'

import React from 'react'
import {
  Box,
  Container,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

export default function Navbar({ session, demoMode, onExit }) {
  return (
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
                onClick={onExit}
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
  )
}
