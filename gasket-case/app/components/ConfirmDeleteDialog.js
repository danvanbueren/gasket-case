'use client'

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

export default function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  description = 'Are you sure you want to proceed? This action will move the spreadsheet to your Google Drive Trash.',
  itemName,
  isDeleting = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#111827',
            backgroundImage: 'none',
            border: '1px solid rgba(239, 68, 68, 0.2)',
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
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          color: '#EF4444',
        }}
      >
        <WarningAmberIcon
          sx={{
            color: '#EF4444',
          }}
        />
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          pt: 3,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            mb: 1,
          }}
        >
          {itemName ? `Delete "${itemName}"?` : 'Delete this item?'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          p: 2.5,
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Button
          onClick={onClose}
          disabled={isDeleting}
          sx={{
            color: 'text.secondary',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isDeleting}
          sx={{
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#B91C1C',
            },
          }}
        >
          {isDeleting ? (
            <CircularProgress
              size={20}
              sx={{
                color: '#FFFFFF',
              }}
            />
          ) : (
            'Delete'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
