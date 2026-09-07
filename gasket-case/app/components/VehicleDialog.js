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

export default function VehicleDialog({
  open,
  onClose,
  isSaving,
  onCreateVehicle,
  onSubmit,
  initialName = '',
  mode = 'create',
  demoMode,
}) {
  const [vehicleName, setVehicleName] = useState('')

  useEffect(() => {
    if (open) {
      setVehicleName(initialName || '')
    }
  }, [open, initialName])

  const handleSubmit = () => {
    const trimmed = vehicleName.trim()
    if (!trimmed) return

    if (onSubmit) {
      onSubmit(trimmed)
    } else if (onCreateVehicle) {
      onCreateVehicle(trimmed)
    }
  }

  const isRename = mode === 'rename'

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
        {isRename ? 'Rename Vehicle Profile' : 'Add New Vehicle Profile'}
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
          {isRename
            ? 'Update the name of this vehicle. This will update the spreadsheet name in your GasketCase Drive folder.'
            : demoMode
            ? 'Add a vehicle profile in your local browser sandbox.'
            : 'GasketCase will initialize a new Google Sheet inside your GasketCase Drive folder specifically formatted for this vehicle.'}
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
          disabled={isSaving || !vehicleName.trim() || (isRename && vehicleName.trim() === initialName)}
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: '#0891B2',
            },
          }}
        >
          {isSaving ? (
            <CircularProgress
              size={20}
              sx={{
                color: 'primary.contrastText',
              }}
            />
          ) : isRename ? (
            'Save Name'
          ) : (
            'Create'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
