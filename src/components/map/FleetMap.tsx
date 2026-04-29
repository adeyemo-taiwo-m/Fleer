"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { VehicleMarker } from "./VehicleMarker";
import { Vehicle, VehicleStatus } from "../../types";
import {
  LAGOS_CENTER,
  LAGOS_ZOOM,
  VEHICLE_STATUS_COLORS,
  VEHICLE_STATUS_LABELS,
} from "../../constants";

interface FleetMapProps {
  vehicles: Vehicle[];
  onVehicleClick: (vehicle: Vehicle) => void;
  height?: string;
}

type FilterStatus = VehicleStatus | "all";

const filterOptions: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "on_route", label: "On Route" },
  { value: "anomaly", label: "Anomaly" },
  { value: "alert", label: "Alert" },
  { value: "idle", label: "Idle" },
  { value: "offline", label: "Offline" },
];

export function FleetMap({
  vehicles,
  onVehicleClick,
  height = "100%",
}: FleetMapProps) {
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filteredVehicles =
    filter === "all" ? vehicles : vehicles.filter((v) => v.status === filter);

  const counts = vehicles.reduce(
    (acc, v) => {
      acc[v.status] = (acc[v.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-fleer-border"
      style={{ height }}
    >
      {/* Filter Bar (overlaid on map) */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-1.5 bg-fleer-card/90 backdrop-blur-sm border border-fleer-border rounded-lg p-1">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-3 py-1 rounded-md text-xs font-display font-medium transition-all duration-150 flex items-center gap-1.5 ${
              filter === opt.value
                ? "bg-fleer-accent text-fleer-bg"
                : "text-fleer-text-muted hover:text-fleer-text"
            }`}
          >
            {opt.value !== "all" && (
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: VEHICLE_STATUS_COLORS[opt.value as VehicleStatus],
                }}
              />
            )}
            {opt.label}
            {opt.value !== "all" && counts[opt.value] !== undefined && (
              <span className="opacity-60">{counts[opt.value]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Vehicle Count (overlaid) */}
      <div className="absolute top-4 right-4 z-[400] bg-fleer-card/90 backdrop-blur-sm border border-fleer-border rounded-lg px-3 py-2">
        <p className="text-xs text-fleer-text-muted font-display">Showing</p>
        <p className="text-lg font-display font-bold text-fleer-text tabular-nums">
          {filteredVehicles.length}
        </p>
        <p className="text-xs text-fleer-text-muted">
          of {vehicles.length} vehicles
        </p>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={LAGOS_CENTER}
        zoom={LAGOS_ZOOM}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ZoomControl position="bottomright" />
        {filteredVehicles.map((vehicle) => (
          <VehicleMarker
            key={vehicle.id}
            vehicle={vehicle}
            onClick={onVehicleClick}
          />
        ))}
      </MapContainer>
    </div>
  );
}
