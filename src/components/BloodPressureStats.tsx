import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  LinearProgress,
} from '@mui/material';
import { 
  ArrowUpward, 
  ArrowDownward, 
  ArrowForward,
  Favorite,
  FavoriteBorder,
  Timeline,
  ShowChart,
  AccessTime,
  Whatshot
} from '@mui/icons-material';
import { BloodPressureData } from '../types/models';
import '../styles/components/_blood-pressure-stats.scss';

interface BloodPressureStatsProps {
  data?: BloodPressureData | null;
  filteredData?: { value: number; rawValue: number }[];
  isMobile: boolean;
}

export const BloodPressureStats: React.FC<BloodPressureStatsProps> = ({ 
  data, 
  filteredData = [], 
  isMobile 
}) => {
  if (!data || !filteredData.length) return null;

  // Calculate stats
  const latestReading = filteredData[0]?.rawValue;
  const currentAverage = filteredData.reduce((sum, { rawValue }) => sum + rawValue, 0) / filteredData.length;
  const minValue = Math.min(...filteredData.map(d => d.rawValue));
  const maxValue = Math.max(...filteredData.map(d => d.rawValue));
  const totalReadings = filteredData.length;
  const trend = filteredData.length > 1 
    ? (filteredData[0].rawValue - filteredData[Math.min(2, filteredData.length-1)].rawValue) / 
      Math.min(2, filteredData.length-1)
    : 0;
  const trendDirection = trend > 1 ? 'up' : trend < -1 ? 'down' : 'stable';
  const status = getStatus(latestReading);
  const healthScore = Math.max(0, 100 - Math.abs(120 - latestReading) * 1.5);

  return (
    <Paper elevation={3} className={`blood-pressure-stats ${isMobile ? 'mobile' : ''}`}>
      <Box className="stats-header">
        <Box className="status-indicator" />
        <Box>
          <Typography variant="h6" className="stats-title">
            Blood Pressure Overview
          </Typography>
          <Typography variant="body2" className="readings-count">
            {totalReadings} readings analyzed
          </Typography>
        </Box>
      </Box>

      <Box className="stats-grid">
        <Box className="stats-column">
          <Box className="current-reading-header">
            <Typography variant="subtitle1" className="section-title">
              Current Reading
            </Typography>
            <Box className="timestamp">
              <AccessTime fontSize="small" className="time-icon" />
              <Typography variant="caption">
                Just now
              </Typography>
            </Box>
          </Box>

          <Box className="reading-display">
            <Box className="reading-value">
              <Typography variant="h2" className={`value ${status.severity}`}>
                {latestReading}
              </Typography>
              <Typography variant="body2" className="unit">
                mmHg
              </Typography>
            </Box>

            <Box className="status-info">
              <Box className="status-indicator-row">
                <Box className={`status-dot ${status.severity}`} />
                <Typography variant="body1" className="status-text">
                  {status.text}
                </Typography>
              </Box>
              <Typography variant="body2" className="status-description">
                {status.severity === 'normal' ? 
                  'Within healthy range' : 
                  'Consider consulting your doctor'}
              </Typography>
            </Box>
          </Box>

          <Box className="health-score">
            <Box className="score-header">
              <Typography variant="caption" className="score-label">
                Health score
              </Typography>
              <Typography variant="caption" className="score-value">
                {Math.round(healthScore)}/100
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={healthScore} 
              className={`score-bar ${healthScore > 70 ? 'good' : healthScore > 40 ? 'fair' : 'poor'}`}
            />
          </Box>
        </Box>

        <Box className="trends-column">
          <Typography variant="subtitle1" className="section-title">
            Trends & History
          </Typography>

          <Box className="stats-cards">
            <StatCard 
              icon={<Timeline className="primary-icon" />}
              label="Average"
              value={Math.round(currentAverage)}
              unit="mmHg"
              variant="primary"
            />
            <StatCard 
              icon={trendDirection === 'up' ? 
                <ArrowUpward className="error-icon" /> : 
                trendDirection === 'down' ? 
                <ArrowDownward className="success-icon" /> : 
                <ArrowForward className="info-icon" />}
              label="Trend"
              value={trendDirection}
              unit={`${Math.abs(Math.round(trend))} mmHg`}
              variant={trendDirection === 'up' ? 'error' : trendDirection === 'down' ? 'success' : 'info'}
            />
            <StatCard 
              icon={<ShowChart className="secondary-icon" />}
              label="Range"
              value={`${minValue}-${maxValue}`}
              unit="mmHg"
              variant="secondary"
            />
            <StatCard 
              icon={healthScore > 70 ? 
                <Favorite className="error-icon" /> : 
                <FavoriteBorder className="disabled-icon" />}
              label="Health"
              value={healthScore > 70 ? 'Good' : healthScore > 40 ? 'Fair' : 'Poor'}
              unit=""
              variant={healthScore > 70 ? 'success' : healthScore > 40 ? 'warning' : 'error'}
            />
          </Box>

          <Box className="trend-message">
            <Typography variant="caption" className="message-text">
              <Whatshot className="trend-icon" />
              {trendDirection === 'up' ? 
                'Your blood pressure is trending upwards' : 
               trendDirection === 'down' ? 
                'Your blood pressure is improving' : 
                'Your blood pressure is stable'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  variant: string;
}> = ({ icon, label, value, unit, variant }) => (
  <Paper elevation={0} className={`stat-card ${variant}`}>
    <Box className="card-icon">
      {icon}
    </Box>
    <Typography variant="caption" className="card-label">
      {label}
    </Typography>
    <Typography variant="h6" className="card-value">
      {value}
    </Typography>
    {unit && (
      <Typography variant="caption" className="card-unit">
        {unit}
      </Typography>
    )}
  </Paper>
);

function getStatus(value: number) {
  if (value < 90) return { text: 'Low', severity: 'low' };
  if (value < 120) return { text: 'Normal', severity: 'normal' };
  if (value < 140) return { text: 'Elevated', severity: 'elevated' };
  return { text: 'High', severity: 'high' };
}