import React from 'react';
import { Paper, Box, CircularProgress, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import '../styles/components/_blood-pressure-chart.scss';

interface ChartDataItem {
  name: string;
  value: number;
  rawValue: number;
  timestamp: Date;
}

interface BloodPressureChartProps {
  data: ChartDataItem[];
  loading: boolean;
  logScale: boolean;
  isMobile: boolean;
}

export const BloodPressureChart: React.FC<BloodPressureChartProps> = ({ 
  data, 
  loading, 
  logScale, 
  isMobile 
}) => (
  <Paper elevation={3} className={`blood-pressure-chart ${isMobile ? 'mobile' : ''}`}>
    {loading && !data.length ? (
      <Box className="blood-pressure-chart__loader">
        <CircularProgress size={60} thickness={4} />
      </Box>
    ) : (
      <>
        <Typography variant="h6" className="blood-pressure-chart__title">
          Blood Pressure Readings
        </Typography>
        <Box className="blood-pressure-chart__container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                label={{
                  value: 'Measurement',
                  position: 'insideBottomRight',
                  offset: -5,
                  fontSize: isMobile ? 10 : 12
                }}
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
                  'Value'
                ]}
                labelFormatter={(label: string) => `Measurement ${label}`}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </>
    )}
  </Paper>
);