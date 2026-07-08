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
} from '@mui/material'

export default function IntervalsDialog({
  open,
  onClose,
  intervals,
  onSaveIntervals,
  defaultIntervals,
}) {
  const [localIntervals, setLocalIntervals] = useState({})

  useEffect(() => {
    if (open) {
      setLocalIntervals({ ...intervals })
    }
  }, [open, intervals])

  const handleChange = (key, value) => {
    const val = parseInt(value) || 0
    setLocalIntervals((prev) => ({
      ...prev,
      [key]: val,
    }))
  }

  const handleReset = () => {
    setLocalIntervals({ ...defaultIntervals })
  }

  const handleSave = () => {
    onSaveIntervals(localIntervals)
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
            minWidth: { xs: '90%', sm: 440 },
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
        Configure Maintenance Intervals
      </DialogTitle>
      <DialogContent
        sx={{
          pt: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 1.5,
            lineHeight: 1.5,
          }}
        >
          Adjust the threshold mileages ($\Delta M$) GasketCase targets for calculations. These updates are client-scoped.
        </Typography>

        {Object.entries(localIntervals).map(([key, value]) => (
          <TextField
            key={key}
            label={`${key} Interval (Miles)`}
            type="number"
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            fullWidth
            size="small"
          />
        ))}
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Button
          onClick={handleReset}
          sx={{
            color: 'warning.main',
            mr: 'auto',
          }}
        >
          Reset Defaults
        </Button>
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
          onClick={handleSave}
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: '#0891B2',
            },
          }}
        >
          Save & Apply
        </Button>
      </DialogActions>
    </Dialog>
  )
}
