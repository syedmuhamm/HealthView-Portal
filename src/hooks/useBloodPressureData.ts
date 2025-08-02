import { useState, useCallback, useEffect } from 'react';
import { useAsync } from './useAsync';
import { apiService } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { BloodPressureData } from '../types/models';

export const useBloodPressureData = () => {
  const { user } = useAuth();
  const [range, setRange] = useState<[number, number]>([80, 140]);
  const [logScale, setLogScale] = useState(false);
  const [pollInterval, setPollInterval] = useState(5000);

  const fetchData = useCallback(async (): Promise<BloodPressureData> => {
    if (!user?.token) throw new Error('No user token available');
    
    const response = await apiService.getBloodPressureData(user.token);
    if (response.error || !response.data) {
      throw new Error(response.error || 'Failed to fetch data');
    }
    return response.data;
  }, [user?.token]);

  const { data, error, loading, execute } = useAsync(fetchData, false);

  useEffect(() => {
    if (!user?.token) return;
    
    let intervalId: NodeJS.Timeout;
    let isMounted = true;

    const fetchAndHandleData = async () => {
      try {
        await execute();
      } catch (err) {
        if (isMounted) {
          console.error('Polling error:', err);
        }
      }
    };

    fetchAndHandleData();
    
    if (pollInterval > 0) {
      intervalId = setInterval(fetchAndHandleData, pollInterval);
    }

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [execute, pollInterval, user?.token]);

  return {
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
  };
};