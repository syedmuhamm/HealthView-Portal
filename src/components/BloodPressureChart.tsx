import React from 'react';
import { Paper, Box, CircularProgress, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  <Paper elevation={3} sx={{ 
    p: { xs: 2, sm: 3 },
    height: { xs: '350px', sm: '450px', md: '500px' },
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 3,
    '&:hover': {
      boxShadow: 6,
    }
  }}>
    {loading && !data.length ? (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexGrow: 1 
      }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    ) : (
      <>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1,
            px: 1,
            textAlign: 'center',
            color: 'text.secondary',
            fontWeight: 600
          }}
        >
          Blood Pressure Readings
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
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
                  fontSize: isMobile ? 10 : 12,
                  fontWeight: 600
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
                contentStyle={{
                  fontSize: isMobile ? 12 : 14,
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#8884d8" 
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