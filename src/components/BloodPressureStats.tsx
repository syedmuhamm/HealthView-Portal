import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { BloodPressureData } from '../types/models';

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
  const theme = useTheme();
  
  if (!data || !filteredData.length) return null;

  // Calculate stats based on FILTERED data
  const latestReading = filteredData[0]?.rawValue;
  const currentAverage = filteredData.reduce((sum, { rawValue }) => sum + rawValue, 0) / filteredData.length;
  const minValue = Math.min(...filteredData.map(d => d.rawValue));
  const maxValue = Math.max(...filteredData.map(d => d.rawValue));

  // Calculate trend using last two filtered readings
  const trend = filteredData.length > 1 
    ? filteredData[0].rawValue - filteredData[1].rawValue 
    : 0;
  const trendDirection = trend > 0 ? '↑' : trend < 0 ? '↓' : '→';

  // Determine status based on latest reading
  const getStatus = (value: number) => {
    if (value < 90) return 'Low';
    if (value < 120) return 'Normal';
    if (value < 140) return 'Elevated';
    return 'High';
  };

  const status = getStatus(latestReading);
  const statusColor = {
    Low: theme.palette.info.main,
    Normal: theme.palette.success.main,
    Elevated: theme.palette.warning.main,
    High: theme.palette.error.main
  }[status];

  return (
    <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
      <Box display="flex" justifyContent="space-around" flexWrap="wrap" gap={2}>
        <StatItem 
          label="Current" 
          value={latestReading} 
          unit="mmHg"
          color={theme.palette.primary.main} 
          isMobile={isMobile}
        />
        <StatItem 
          label="Status" 
          value={status} 
          unit=""
          color={statusColor} 
          isMobile={isMobile}
        />
        <StatItem 
          label="Range" 
          value={`${minValue}-${maxValue}`} 
          unit="mmHg"
          color={theme.palette.secondary.main} 
          isMobile={isMobile}
        />
        <StatItem 
          label="Trend" 
          value={trendDirection} 
          unit={`${Math.abs(trend)} mmHg`}
          color={trend > 0 ? theme.palette.error.main : theme.palette.success.main}
          isMobile={isMobile}
        />
      </Box>
    </Paper>
  );
};

const StatItem: React.FC<{ 
  label: string; 
  value: string | number;
  unit: string;
  color: string;
  isMobile: boolean;
}> = ({ label, value, unit, color, isMobile }) => (
  <Box textAlign="center" minWidth={isMobile ? '40%' : 'auto'}>
    <Typography 
      variant={isMobile ? 'caption' : 'body2'} 
      color="text.secondary"
      sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
    >
      {label}
    </Typography>
    <Typography 
      variant={isMobile ? 'h6' : 'h5'} 
      fontWeight="bold"
      color={color}
      sx={{ my: 0.5 }}
    >
      {value}
    </Typography>
    {unit && (
      <Typography 
        variant={isMobile ? 'caption' : 'body2'} 
        color="text.secondary"
      >
        {unit}
      </Typography>
    )}
  </Box>
);