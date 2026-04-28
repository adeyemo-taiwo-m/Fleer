'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Driver } from '../types';
import { MOCK_DRIVERS } from '../constants';

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDrivers = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('drivers').select('*');
      if (!error && data && data.length > 0) {
        setDrivers(data as Driver[]);
      } else {
        // Fallback to mock data
        setDrivers(MOCK_DRIVERS);
      }
    } catch (err) {
      console.warn('Drivers fetch failed, using mock data:', err);
      setDrivers(MOCK_DRIVERS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  return { drivers, isLoading, refetch: fetchDrivers };
}
