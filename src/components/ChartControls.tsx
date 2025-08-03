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
import '../styles/components/_chart-controls.scss';

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
  <Paper elevation={3} className={`chart-controls ${isMobile ? 'mobile' : ''}`}>
    <Box className="controls-container">
      <Box className="controls-section">
        <FormControl fullWidth className="interval-select">
          <InputLabel id="poll-interval-label">Update Interval</InputLabel>
          <Select
            labelId="poll-interval-label"
            value={pollInterval}
            label="Update Interval"
            onChange={(e) => onPollIntervalChange(Number(e.target.value))}
            size={isMobile ? 'small' : 'medium'}
          >
            <MenuItem value={2000}>2 seconds</MenuItem>
            <MenuItem value={5000}>5 seconds</MenuItem>
            <MenuItem value={10000}>10 seconds</MenuItem>
            <MenuItem value={30000}>30 seconds</MenuItem>
          </Select>
        </FormControl>

        <Box className="range-control">
          <Typography variant={isMobile ? 'body2' : 'body1'} className="range-label">
            Value Range: {range[0]} - {range[1]}
          </Typography>
          <Slider
            value={range}
            onChange={onRangeChange}
            valueLabelDisplay={isMobile ? 'auto' : 'on'}
            min={60}
            max={180}
            step={5}
            className="range-slider"
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
          className="scale-switch"
        />
      </Box>

      <Box className="refresh-section">
        <IconButton onClick={onRefresh} disabled={loading} className="refresh-button">
          <Refresh fontSize={isMobile ? 'small' : 'medium'} />
        </IconButton>
        <Typography variant={isMobile ? 'body2' : 'body1'} className="refresh-text">
          {loading ? 'Updating...' : `Last updated: ${new Date().toLocaleTimeString()}`}
        </Typography>
      </Box>
    </Box>
  </Paper>
);