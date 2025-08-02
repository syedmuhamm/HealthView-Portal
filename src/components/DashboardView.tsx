import React, { useMemo } from 'react';
import { Alert, Box } from '@mui/material';
import { BloodPressureStats } from './BloodPressureStats';
import { ChartControls } from './ChartControls';
import { BloodPressureChart } from './BloodPressureChart';
import { useBloodPressureData } from '../hooks/useBloodPressureData';

interface DashboardViewProps {
  isMobile: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ isMobile }) => {
  const {
    data,
    error,
    loading,
    range,
    logScale,
    pollInterval,
    setRange,
    setLogScale,
    setPollInterval,
    execute
  } = useBloodPressureData();

  const filteredData = useMemo(() => {
    if (!data?.readings) return [];
    
    return data.readings
      .filter(({ value }) => value >= range[0] && value <= range[1])
      .map((reading, index) => ({
        name: `#${index + 1}`,
        value: logScale ? Math.log10(reading.value) : reading.value,
        rawValue: reading.value,
        timestamp: reading.timestamp,
      }));
  }, [data, range, logScale]);

  const handleRangeChange = (event: Event, newValue: number | number[]) => {
    setRange(newValue as [number, number]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <ChartControls 
        range={range}
        logScale={logScale}
        pollInterval={pollInterval}
        onRangeChange={handleRangeChange}
        onLogScaleChange={setLogScale}
        onPollIntervalChange={setPollInterval}
        onRefresh={execute}
        loading={loading}
        isMobile={isMobile}
      />

      <Box sx={{ 
        display: 'grid',
        gap: 3,
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }
      }}>
        <BloodPressureStats 
          data={data} 
          filteredData={filteredData} 
          isMobile={isMobile} 
        />
        
        <BloodPressureChart 
          data={filteredData} 
          loading={loading} 
          logScale={logScale}
          isMobile={isMobile}
        />
      </Box>
    </Box>
  );
};