'use client'

import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export default function LoadingScreen() {
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
