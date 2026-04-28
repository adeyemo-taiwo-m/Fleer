'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { getSocket } from '../lib/socket';
import { Anomaly } from '../types';
import toast from 'react-hot-toast';
import { ANOMALY_ICONS, MOCK_ANOMALIES } from '../constants';
import { anomalyLabel } from '../lib/formatters';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Anomaly[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAlerts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('anomalies')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);
      
      if (!error && data && data.length > 0) {
        setAlerts(data as Anomaly[]);
      } else {
        // Fallback to mock data
        setAlerts(MOCK_ANOMALIES);
      }
    } catch (err) {
      console.warn('Alerts fetch failed, using mock data:', err);
      setAlerts(MOCK_ANOMALIES);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();

    // Real-time new alert via Socket.IO
    const socket = getSocket();
    socket.on('anomaly:new', (anomaly: Anomaly) => {
      setAlerts(prev => [anomaly, ...prev]);

      // Show toast notification
      const icon = ANOMALY_ICONS[anomaly.type] || '⚠️';
      const label = anomalyLabel[anomaly.type];
      if (anomaly.severity === 'critical') {
        toast.error(`${icon} ${label} — ${anomaly.vehicle_plate}`, { duration: 8000 });
      } else {
        toast(`${icon} ${label} — ${anomaly.vehicle_plate}`, { duration: 5000 });
      }
    });

    return () => {
      socket.off('anomaly:new');
    };
  }, [fetchAlerts]);

  const resolveAlert = useCallback(async (alertId: string) => {
    await supabase
      .from('anomalies')
      .update({ resolved: true, resolved_at: new Date().toISOString() })
      .eq('id', alertId);
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
  }, []);

  const unread = alerts.filter(a => !a.resolved && a.severity !== 'info').length;

  return { alerts, unread, isLoading, resolveAlert, refetch: fetchAlerts };
}
