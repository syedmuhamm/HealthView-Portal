import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Slider, 
  FormControlLabel, 
  Switch,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  IconButton
} from '@mui/material';
import { Logout, Refresh } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiService } from '../api/api';
import { BloodPressureData } from '../types';
import { useTheme, useMediaQuery } from '@mui/material';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<BloodPressureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [range, setRange] = useState<[number, number]>([80, 140]);
  const [logScale, setLogScale] = useState(false);
  const [pollInterval, setPollInterval] = useState(5000);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle auth redirect properly in useEffect
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    if (!data) return [];
    
    return data.blood_pressures
      .filter(value => value >= range[0] && value <= range[1])
      .map((value, index) => ({
        name: `Measurement ${index + 1}`,
        value: logScale ? Math.log10(value) : value,
        rawValue: value,
      }));
  }, [data, range, logScale]);

  // Fetch data function
  const fetchData = useCallback(async () => {
    if (!user?.token) return;
    
    try {
      setLoading(true);
      const { data: apiData, error: apiError } = await apiService.getBloodPressureData(user.token);
      
      if (apiError || !apiData) {
        throw new Error(apiError || 'Failed to fetch data');
      }
      
      setData(apiData);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  // Polling effect
  useEffect(() => {
    if (!user) return; // Don't start polling if no user
    
    fetchData(); // Initial fetch
    
    const intervalId = setInterval(fetchData, pollInterval);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchData, pollInterval, user]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle range change
  const handleRangeChange = (event: Event, newValue: number | number[]) => {
    setRange(newValue as [number, number]);
  };

  if (!user) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: isMobile ? 2 : 4,
        px: isMobile ? 1 : 4 
      }}
    >
      <Box sx={{ my: 2 }}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
          flexDirection={isMobile ? 'column' : 'row'}
          gap={2}
        >
          <Typography variant={isMobile ? 'h5' : 'h4'} component="h1">
            Blood Pressure Monitoring
          </Typography>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<Logout />}
            onClick={handleLogout}
            size={isMobile ? 'small' : 'medium'}
          >
            {isMobile ? 'Logout' : 'Sign Out'}
          </Button>
        </Box>

        {error && (
          <Paper elevation={2} sx={{ 
            p: 2, 
            mb: 3, 
            bgcolor: 'error.light',
            textAlign: 'center'
          }}>
            <Typography color="error">{error}</Typography>
          </Paper>
        )}

        <Paper elevation={3} sx={{ 
          p: isMobile ? 2 : 3, 
          mb: 3 
        }}>
          <Box 
            display="flex" 
            flexDirection={isMobile ? 'column' : 'row'} 
            gap={3}
          >
            <Box flex={1}>
              <FormControl fullWidth margin="normal" size={isMobile ? 'small' : 'medium'}>
                <InputLabel id="poll-interval-label">Update Interval</InputLabel>
                <Select
                  labelId="poll-interval-label"
                  value={pollInterval}
                  label="Update Interval"
                  onChange={(e) => setPollInterval(Number(e.target.value))}
                >
                  <MenuItem value={2000}>2 seconds</MenuItem>
                  <MenuItem value={5000}>5 seconds</MenuItem>
                  <MenuItem value={10000}>10 seconds</MenuItem>
                  <MenuItem value={30000}>30 seconds</MenuItem>
                </Select>
              </FormControl>

              <Box mt={2}>
                <Typography variant={isMobile ? 'body2' : 'body1'} gutterBottom>
                  Value Range: {range[0]} - {range[1]}
                </Typography>
                <Slider
                  value={range}
                  onChange={handleRangeChange}
                  valueLabelDisplay={isMobile ? 'auto' : 'on'}
                  min={60}
                  max={180}
                  step={5}
                  sx={{
                    width: isMobile ? '90%' : '100%',
                    mx: isMobile ? 'auto' : 0
                  }}
                />
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={logScale}
                    onChange={(e) => setLogScale(e.target.checked)}
                    size={isMobile ? 'small' : 'medium'}
                  />
                }
                label="Logarithmic Scale"
                sx={{ mt: 1 }}
              />
            </Box>

            <Box 
              flex={1} 
              display="flex" 
              alignItems="center" 
              justifyContent={isMobile ? 'flex-start' : 'center'}
              mt={isMobile ? 2 : 0}
            >
              <IconButton 
                onClick={fetchData} 
                disabled={loading}
                size={isMobile ? 'small' : 'medium'}
              >
                <Refresh fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
              <Typography 
                variant={isMobile ? 'body2' : 'body1'} 
                sx={{ ml: 1 }}
              >
                {loading ? 'Updating...' : `Last updated: ${new Date().toLocaleTimeString()}`}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper 
          elevation={3} 
          sx={{ 
            p: isMobile ? 1 : 3, 
            height: isMobile ? '350px' : '500px',
            position: 'relative'
          }}
        >
          {loading && !data ? (
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <YAxis 
                  label={{ 
                    value: logScale ? 'Log Value' : 'mmHg', 
                    angle: -90, 
                    position: 'insideLeft',
                    fontSize: isMobile ? 10 : 12
                  }} 
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <Tooltip 
                  formatter={(value: number) => [
                    logScale 
                      ? `10^${value.toFixed(2)} = ${Math.pow(10, value).toFixed(2)} mmHg`
                      : `${value} mmHg`,
                    logScale ? 'Log Value' : 'Value'
                  ]}
                  contentStyle={{
                    fontSize: isMobile ? 12 : 14
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage;