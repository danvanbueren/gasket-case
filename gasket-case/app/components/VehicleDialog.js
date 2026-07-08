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

export default function VehicleDialog({ open, onClose, isSaving, onCreateVehicle, demoMode }) {
  const [vehicleName, setVehicleName] = useState('')

  useEffect(() => {
    if (open) {
      setVehicleName('')
    }
  }, [open])

  const handleSubmit = () => {
    if (vehicleName.trim()) {
      onCreateVehicle(vehicleName.trim())
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
        Add New Vehicle Profile
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
            ? 'Add a vehicle profile in your local browser sandbox.'
            : 'GasketCase will initialize a new Google Sheet inside your Drive root directory specifically formatted for this vehicle.'}
        </Typography>
        <TextField
          label="Vehicle Name (e.g. 2021 Corolla)"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
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
          disabled={isSaving || !vehicleName.trim()}
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: '#0891B2',
            },
          }}
        >
          {isSaving ? <CircularProgress size={20} /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
