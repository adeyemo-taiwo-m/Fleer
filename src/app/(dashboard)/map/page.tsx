'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FleetMap } from '@/components/map/FleetMap';
import { VehicleDetailPanel } from '@/components/fleet/VehicleDetailPanel';
import { useVehicles } from '@/hooks/useVehicles';
import { useAlerts } from '@/hooks/useAlerts';
import { useDrivers } from '@/hooks/useDrivers';
import { Vehicle } from '@/types';

export default function LiveMapPage() {
  const { vehicles } = useVehicles();
  const { alerts } = useAlerts();
  const { drivers } = useDrivers();
  const searchParams = useSearchParams();
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Handle URL param selection
  useEffect(() => {
    const vehicleId = searchParams.get('vehicle');
    if (vehicleId && vehicles.length > 0) {
      const v = vehicles.find(v => v.id === vehicleId);
      if (v) setSelectedVehicle(v);
    }
  }, [searchParams, vehicles]);

  const selectedDriver = selectedVehicle?.current_driver_id 
    ? drivers.find(d => d.id === selectedVehicle.current_driver_id)
    : undefined;

  const vehicleAnomalies = selectedVehicle
    ? alerts.filter(a => a.vehicle_id === selectedVehicle.id)
    : [];

  return (
    <div className="relative h-[calc(100vh-7rem)] rounded-xl overflow-hidden border border-[#1E2D42]">
      <FleetMap
        vehicles={vehicles}
        onVehicleClick={setSelectedVehicle}
        height="100%"
      />

      <VehicleDetailPanel
        vehicle={selectedVehicle}
        driver={selectedDriver}
        recentAnomalies={vehicleAnomalies}
        onClose={() => setSelectedVehicle(null)}
      />
    </div>
  );
}
