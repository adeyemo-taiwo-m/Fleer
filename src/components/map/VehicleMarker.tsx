"use client";

import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { Vehicle } from "../../types";
import { VEHICLE_STATUS_COLORS, VEHICLE_STATUS_LABELS } from "../../constants";

interface VehicleMarkerProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

function createVehicleIcon(
  status: Vehicle["status"],
  isSelected: boolean,
): L.DivIcon {
  const color = VEHICLE_STATUS_COLORS[status];
  const size = isSelected ? 16 : 12;
  const ring = isSelected ? `box-shadow: 0 0 0 3px ${color}40;` : "";

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 2px solid #0A0E1A;
        border-radius: 50%;
        ${ring}
        transition: all 0.2s;
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export function VehicleMarker({ vehicle, onClick }: VehicleMarkerProps) {
  if (!vehicle.current_lat || !vehicle.current_lng) return null;

  return (
    <Marker
      position={[vehicle.current_lat, vehicle.current_lng]}
      icon={createVehicleIcon(vehicle.status, false)}
      eventHandlers={{ click: () => onClick(vehicle) }}
    >
      <Tooltip
        direction="top"
        offset={[0, -8]}
        opacity={1}
        className="!bg-fleer-card !border-fleer-border !text-fleer-text !rounded-lg !px-2.5 !py-1.5 !shadow-card !text-xs !font-display"
      >
        <div className="font-semibold">{vehicle.plate}</div>
        <div style={{ color: VEHICLE_STATUS_COLORS[vehicle.status] }}>
          {VEHICLE_STATUS_LABELS[vehicle.status]}
        </div>
        {vehicle.current_speed !== undefined && (
          <div className="text-fleer-text-muted">
            {vehicle.current_speed} km/h
          </div>
        )}
      </Tooltip>
    </Marker>
  );
}
