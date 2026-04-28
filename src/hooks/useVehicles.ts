'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { getSocket } from '../lib/socket';
import { Vehicle, FleetSummary } from '../types';
import { MOCK_VEHICLES } from '../constants';

const EMPTY_SUMMARY: FleetSummary = {
  total_vehicles: 0, active_vehicles: 0, vehicles_on_route: 0,
  vehicles_with_anomaly: 0, vehicles_offline: 0,
  total_distance_today_km: 0, total_fuel_today_litres: 0,
  anomalies_today: 0, estimated_savings_today_naira: 0,
};

function computeSummary(vehicles: Vehicle[]): FleetSummary {
  return {
    total_vehicles: vehicles.length,
    active_vehicles: vehicles.filter(v => v.status !== 'offline').length,
    vehicles_on_route: vehicles.filter(v => v.status === 'on_route').length,
    vehicles_with_anomaly: vehicles.filter(v => v.status === 'anomaly' || v.status === 'alert').length,
    vehicles_offline: vehicles.filter(v => v.status === 'offline').length,
    total_distance_today_km: 1240,   // Mocked
    total_fuel_today_litres: 450,    // Mocked
    anomalies_today: vehicles.filter(v => v.status === 'anomaly').length,
    estimated_savings_today_naira: 42000, // Mocked
  };
}

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [summary, setSummary] = useState<FleetSummary>(EMPTY_SUMMARY);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVehicles = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('vehicles').select('*');
      if (!error && data && data.length > 0) {
        const vehicleData = data as Vehicle[];
        setVehicles(vehicleData);
        setSummary(computeSummary(vehicleData));
      } else {
        // Fallback to mock data for demo
        setVehicles(MOCK_VEHICLES);
        setSummary(computeSummary(MOCK_VEHICLES));
      }
    } catch (err) {
      console.warn('Vehicles fetch failed, using mock data:', err);
      setVehicles(MOCK_VEHICLES);
      setSummary(computeSummary(MOCK_VEHICLES));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();

    // Real-time position updates via Socket.IO
    const socket = getSocket();

    socket.on('vehicle:position', (update: {
      vehicle_id: string;
      lat: number;
      lng: number;
      speed: number;
      fuel_level?: number;
      status: Vehicle['status'];
    }) => {
      setVehicles(prev => prev.map(v =>
        v.id === update.vehicle_id
          ? { ...v, current_lat: update.lat, current_lng: update.lng, current_speed: update.speed, fuel_level: update.fuel_level, status: update.status }
          : v
      ));
    });

    // Supabase real-time subscription for status changes
    let channel: any;
    try {
      channel = supabase
        .channel('vehicles-changes')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'vehicles' }, payload => {
          setVehicles(prev => prev.map(v => v.id === payload.new.id ? { ...v, ...payload.new } : v));
        })
        .subscribe();
    } catch (err) {
      console.warn('Supabase real-time subscription failed:', err);
    }

    return () => {
      socket.off('vehicle:position');
      if (channel) supabase.removeChannel(channel);
    };
  }, [fetchVehicles]);

  return { vehicles, summary, isLoading, refetch: fetchVehicles };
}
