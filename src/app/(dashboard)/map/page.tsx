"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { FleetMap } from "@/components/map/FleetMap";
import { VehicleDetailPanel } from "@/components/fleet/VehicleDetailPanel";
import { Vehicle } from "@/types";
import { useVehicles } from "@/hooks/useVehicles";
import { useOrganization } from "@/hooks/useOrganization";
import { useAlerts } from "@/hooks/useAlerts";
import { useDrivers } from "@/hooks/useDrivers";

export default function LiveMapPage() {
  const { vehicles, isLoading } = useVehicles();
  const { org, user, logout } = useOrganization();
  const { alerts } = useAlerts();
  const { drivers } = useDrivers();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | undefined>(undefined);
  const [mapZoom, setMapZoom] = useState<number | undefined>(undefined);

  const handleVehicleClick = (vehicle: Vehicle) => {
    const isSame = selectedVehicle?.id === vehicle.id;
    setSelectedVehicle(isSame ? null : vehicle);
    
    if (vehicle.current_lat && vehicle.current_lng) {
      setMapCenter([vehicle.current_lat, vehicle.current_lng]);
      setMapZoom(16); // Close zoom for specific vehicle
    }
  };

  const selectedDriver = selectedVehicle?.current_driver_id
    ? drivers.find((d) => d.id === selectedVehicle.current_driver_id)
    : undefined;

  const vehicleAnomalies = selectedVehicle
    ? alerts.filter((a) => a.vehicle_id === selectedVehicle.id)
    : [];

  return (
    <AppShell
      title="Live Map"
      subtitle={`${vehicles.length} vehicles tracked`}
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      onLogout={logout}
    >
      <div
        className="relative"
        style={{ height: "calc(100vh - 3.5rem - 3rem)" }}
      >
        <FleetMap
          vehicles={vehicles}
          onVehicleClick={handleVehicleClick}
          height="100%"
          center={mapCenter}
          zoom={mapZoom}
        />
        <VehicleDetailPanel
          vehicle={selectedVehicle}
          driver={selectedDriver}
          recentAnomalies={vehicleAnomalies}
          onClose={() => setSelectedVehicle(null)}
        />
      </div>
    </AppShell>
  );
}
