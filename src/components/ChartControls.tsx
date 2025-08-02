import React from 'react';
import { 
  Box, 
  Paper, 
  Slider,
  FormControlLabel, 
  Switch,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Typography
} from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ChartControlsProps {
  range: [number, number];
  logScale: boolean;
  pollInterval: number;
  loading: boolean;
  isMobile: boolean;
  onRangeChange: (event: Event, value: number | number[]) => void;
  onLogScaleChange: (checked: boolean) => void;
  onPollIntervalChange: (interval: number) => void;
  onRefresh: () => void;
}

export const ChartControls: React.FC<ChartControlsProps> = ({
  range,
  logScale,
  pollInterval,
  loading,
  isMobile,
  onRangeChange,
  onLogScaleChange,
  onPollIntervalChange,
  onRefresh,
}) => (
  <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
    <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={3}>
      <Box flex={1}>
        <FormControl fullWidth margin="normal" size={isMobile ? 'small' : 'medium'}>
          <InputLabel id="poll-interval-label">Update Interval</InputLabel>
          <Select
            labelId="poll-interval-label"
            value={pollInterval}
            label="Update Interval"
            onChange={(e) => onPollIntervalChange(Number(e.target.value))}
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
            onChange={onRangeChange}
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
              onChange={(e) => onLogScaleChange(e.target.checked)}
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
        <IconButton onClick={onRefresh} disabled={loading}>
          <Refresh fontSize={isMobile ? 'small' : 'medium'} />
        </IconButton>
        <Typography variant={isMobile ? 'body2' : 'body1'} sx={{ ml: 1 }}>
          {loading ? 'Updating...' : `Last updated: ${new Date().toLocaleTimeString()}`}
        </Typography>
      </Box>
    </Box>
  </Paper>
);