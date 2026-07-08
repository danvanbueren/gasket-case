'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material'

export default function LogDialog({
  open,
  onClose,
  isSaving,
  onAddLog,
  initialData,
  defaultIntervals,
}) {
  const [date, setDate] = useState('')
  const [component, setComponent] = useState('Oil Change')
  const [customComponent, setCustomComponent] = useState('')
  const [currentMileage, setCurrentMileage] = useState('')
  const [cost, setCost] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (open) {
      if (initialData) {
        setDate(initialData.date || new Date().toISOString().split('T')[0])
        setComponent(initialData.component || 'Oil Change')
        setCustomComponent(initialData.customComponent || '')
        setCurrentMileage(initialData.currentMileage !== undefined ? String(initialData.currentMileage) : '')
        setCost(initialData.cost !== undefined ? String(initialData.cost) : '')
        setNotes(initialData.notes || '')
      } else {
        setDate(new Date().toISOString().split('T')[0])
        setComponent('Oil Change')
        setCustomComponent('')
        setCurrentMileage('')
        setCost('')
        setNotes('')
      }
    }
  }, [open, initialData])

  const handleSubmit = () => {
    onAddLog({
      date,
      component,
      customComponent,
      currentMileage,
      cost,
      notes,
    })
  }

  const isFormValid = date && component && (component !== 'Other' || customComponent) && currentMileage

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
            minWidth: { xs: '90%', sm: 460 },
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
        Log Maintenance Service
      </DialogTitle>
      <DialogContent
        sx={{
          pt: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* Date Picker */}
        <TextField
          label="Service Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        {/* Component Selection */}
        <TextField
          select
          label="Component / Task"
          value={component}
          onChange={(e) => setComponent(e.target.value)}
          fullWidth
          slotProps={{
            select: {
              MenuProps: {
                slotProps: {
                  paper: {
                    sx: {
                      backgroundColor: '#111827',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    },
                  },
                },
              },
            },
          }}
        >
          {Object.keys(defaultIntervals).map((key) => (
            <MenuItem
              key={key}
              value={key}
            >
              {key}
            </MenuItem>
          ))}
          <MenuItem
            value="Other"
          >
            Other / Custom Task
          </MenuItem>
        </TextField>

        {/* Custom Component input if "Other" is selected */}
        {component === 'Other' && (
          <TextField
            label="Custom Task Name"
            value={customComponent}
            onChange={(e) => setCustomComponent(e.target.value)}
            fullWidth
          />
        )}

        {/* Odometer Input */}
        <TextField
          label="Odometer (Miles)"
          type="number"
          value={currentMileage}
          onChange={(e) => setCurrentMileage(e.target.value)}
          fullWidth
        />

        {/* Cost Input */}
        <TextField
          label="Service Cost (USD)"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          fullWidth
          slotProps={{
            htmlInput: {
              step: '0.01',
            },
          }}
        />

        {/* Notes Input */}
        <TextField
          label="Notes / Comments"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          multiline
          rows={3}
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
          disabled={isSaving || !isFormValid}
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: '#0891B2',
            },
          }}
        >
          {isSaving ? <CircularProgress size={20} /> : 'Save Log'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
