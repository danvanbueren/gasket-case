'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#06b6d4', // Vibrant Cyan
      light: '#67e8f9',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a855f7', // Vivid Purple/Violet
      light: '#d8b4fe',
      dark: '#7e22ce',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0f1d', // Deep space background
      paper: '#121b2e',   // Glassy/dark navy paper
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto), Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '8px 20px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#121b2e',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.25)',
        },
      },
    },
  },
});

export default theme;
