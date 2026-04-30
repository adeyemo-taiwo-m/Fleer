"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { VehicleMarker } from "./VehicleMarker";
import { Vehicle, VehicleStatus } from "../../types";
import {
  LAGOS_CENTER,
  LAGOS_ZOOM,
  VEHICLE_STATUS_COLORS,
  VEHICLE_STATUS_LABELS,
} from "../../constants";
import { Search, User, Navigation } from "lucide-react";

function MapController({ center, zoom }: { center?: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || map.getZoom(), {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [center, zoom, map]);
  return null;
}

interface FleetMapProps {
  vehicles: Vehicle[];
  onVehicleClick: (vehicle: Vehicle) => void;
  height?: string;
  center?: [number, number];
  zoom?: number;
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
  center,
  zoom,
}: FleetMapProps) {
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const filteredVehicles = vehicles.filter((v) => {
    const matchesFilter = filter === "all" || v.status === filter;
    const matchesSearch = v.plate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
        <MapController center={center} zoom={zoom} />
        <ZoomControl position="bottomright" />
        {filteredVehicles.map((vehicle) => (
          <VehicleMarker
            key={vehicle.id}
            vehicle={vehicle}
            onClick={onVehicleClick}
          />
        ))}
      </MapContainer>

      {/* Filter Bar (overlaid on map) */}
      <div className="absolute top-4 left-4 z-[1001] flex items-center gap-1.5 bg-fleer-card/90 backdrop-blur-sm border border-fleer-border rounded-lg p-1">
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

      {/* Vehicle List Overlay */}
      <div className={`absolute top-16 left-4 z-[1001] w-72 max-h-[calc(100%-120px)] bg-fleer-card/95 backdrop-blur-md border border-fleer-border rounded-xl shadow-2xl transition-all duration-300 flex flex-col ${showList ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
        <div className="p-3 border-b border-fleer-border">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fleer-text-dim" />
            <input 
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-fleer-surface border border-fleer-border rounded-lg pl-9 pr-3 py-2 text-xs text-fleer-text focus:outline-none focus:border-fleer-accent/50 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredVehicles.length === 0 ? (
            <p className="text-[10px] text-fleer-text-dim text-center py-4 uppercase font-bold tracking-widest">No matching assets</p>
          ) : (
            filteredVehicles.map(v => (
              <button 
                key={v.id}
                onClick={() => onVehicleClick(v)}
                className="w-full text-left p-2.5 rounded-lg hover:bg-fleer-surface group transition-all flex items-center gap-3 border border-transparent hover:border-fleer-border"
              >
                <div className="w-8 h-8 rounded-lg bg-fleer-accent/10 flex items-center justify-center text-fleer-accent group-hover:bg-fleer-accent group-hover:text-fleer-bg transition-all">
                  <User size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-display font-bold text-fleer-text truncate uppercase">{v.plate}</p>
                  <p className="text-[10px] text-fleer-text-muted capitalize">{v.status.replace('_', ' ')}</p>
                </div>
                <Navigation size={12} className="ml-auto text-fleer-text-dim opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            ))
          )}
        </div>
      </div>

      {/* Toggle List Button */}
      <button 
        onClick={() => setShowList(!showList)}
        className={`absolute bottom-4 left-4 z-[1001] h-10 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 transition-all ${
          showList ? 'bg-fleer-bg border border-fleer-border text-fleer-text' : 'bg-fleer-accent text-fleer-bg shadow-accent'
        }`}
      >
        <Navigation size={14} className={showList ? 'rotate-90' : ''} />
        {showList ? 'Close Asset List' : 'View All Assets'}
      </button>

      {/* Vehicle Count (overlaid) */}
      <div className="absolute top-4 right-4 z-[1001] bg-fleer-card/90 backdrop-blur-sm border border-fleer-border rounded-lg px-3 py-2 text-right">
        <p className="text-xs text-fleer-text-muted font-display">Active Fleet</p>
        <div className="flex items-center gap-2 justify-end">
          <span className="text-lg font-display font-bold text-fleer-text tabular-nums">
            {filteredVehicles.length}
          </span>
          <span className="text-[10px] text-fleer-text-dim font-bold uppercase tracking-wider">Assets</span>
        </div>
      </div>
    </div>
  );
}
