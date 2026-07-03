'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Slider,
  Switch,
  Chip,
  Paper,
} from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DnsIcon from '@mui/icons-material/Dns';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function Home() {
  const [serverLoad, setServerLoad] = useState(45);
  const [isLiveMonitoring, setIsLiveMonitoring] = useState(true);

  const handleSliderChange = (event, newValue) => {
    setServerLoad(newValue);
  };

  const getLoadColor = (load) => {
    if (load < 50) return '#06b6d4'; // Cyan (Normal)
    if (load < 80) return '#eab308'; // Yellow (Warning)
    return '#ef4444'; // Red (Critical)
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0a0f1d',
        backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(10, 15, 29, 0) 50%)',
        color: '#f8fafc',
        pb: 8,
      }}
    >
      {/* Glassmorphic Navbar */}
      <Box
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(10, 15, 29, 0.7)',
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CloudIcon sx={{ fontSize: '2rem', color: '#06b6d4', filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  background: 'linear-gradient(to right, #06b6d4, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                VANBUEREN CLOUD
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label={isLiveMonitoring ? "LIVE UPDATING" : "MONITORING PAUSED"}
                size="small"
                color={isLiveMonitoring ? "success" : "default"}
                sx={{
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': { px: 1 },
                }}
              />
              <IconButton sx={{ color: '#94a3b8' }}>
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Header */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(to right, #ffffff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Next-Gen Cloud Orchestration
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8', maxWidth: '600px', mx: 'auto', mb: 4 }}>
            Monitor and scale your virtual instances, serverless functions, and globally distributed databases from a single unified portal.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="contained" color="primary" size="large">
              Launch Console
            </Button>
            <Button variant="outlined" color="secondary" size="large">
              Read API Docs
            </Button>
          </Box>
        </Box>

        {/* Dashboard Grid */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Card 1: Server Load Controls */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Load Simulator
                  </Typography>
                  <IconButton color="primary">
                    <AutorenewIcon />
                  </IconButton>
                </Box>
                
                <Box sx={{ my: 'auto', textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      color: getLoadColor(serverLoad),
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {serverLoad}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Simulated Active Cluster CPU
                  </Typography>
                </Box>

                <Box sx={{ px: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Adjust Load Level</span>
                    <span>{serverLoad < 50 ? "Normal" : serverLoad < 80 ? "Elevated" : "Critical"}</span>
                  </Typography>
                  <Slider
                    value={serverLoad}
                    onChange={handleSliderChange}
                    aria-label="Load Level"
                    sx={{
                      color: getLoadColor(serverLoad),
                      transition: 'color 0.3s ease',
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2: System Architecture */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Cluster Core Metrics
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StorageIcon sx={{ color: '#06b6d4' }} />
                        <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600 }}>Memory</Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        {((serverLoad * 0.12) + 4.2).toFixed(1)} GB
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#06b6d4' }}>
                        of 16.0 GB total
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SpeedIcon sx={{ color: '#a855f7' }} />
                        <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600 }}>Network</Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        {((serverLoad * 4.8) + 120).toFixed(0)} Mbps
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#a855f7' }}>
                        Inbound bandwidth
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DnsIcon sx={{ color: '#10b981' }} />
                        <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600 }}>Active Nodes</Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        {serverLoad > 80 ? "12 / 12" : serverLoad > 50 ? "8 / 12" : "4 / 12"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#10b981' }}>
                        Nodes online
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderRadius: 2, border: '1px dashed rgba(255, 255, 255, 0.12)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TrendingUpIcon sx={{ color: '#06b6d4' }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Auto-Scaling</Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>Automatically provision new node clusters at 80% CPU threshold</Typography>
                    </Box>
                  </Box>
                  <Switch
                    checked={isLiveMonitoring}
                    onChange={(e) => setIsLiveMonitoring(e.target.checked)}
                    color="primary"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
