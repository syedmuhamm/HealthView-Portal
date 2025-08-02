import { useState, useCallback, useEffect } from 'react';
import { AsyncData } from '../types/models';

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): AsyncData<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<AsyncData<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [asyncFunction, immediate]);

  return { ...state, execute };
}
