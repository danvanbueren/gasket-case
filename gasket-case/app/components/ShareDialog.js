'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'

export default function ShareDialog({ open, onClose, isSaving, onShareVehicle, demoMode }) {
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (open) {
      setEmail('')
    }
  }, [open])

  const handleSubmit = () => {
    if (email.trim()) {
      onShareVehicle(email.trim())
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#111827',
            backgroundImage: 'none',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            minWidth: { xs: '90%', sm: 400 },
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 800,
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          pb: 2,
        }}
      >
        Share Vehicle Profile
      </DialogTitle>
      <DialogContent
        sx={{
          pt: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 3.5,
            lineHeight: 1.5,
          }}
        >
          {demoMode
            ? 'Simulate sharing this vehicle profile invite (mocked for demo).'
            : 'Grant read/write permissions directly on the underlying Google Sheet spreadsheet in Google Drive to a mechanic, family member, or friend.'}
        </Typography>
        <TextField
          label="Collaborator Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          autoFocus
        />
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: 'text.secondary',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSaving || !email.trim()}
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: '#0891B2',
            },
          }}
        >
          {isSaving ? <CircularProgress size={20} /> : 'Send Invite'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
