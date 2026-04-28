'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Vehicle, VehicleStatus } from '../../types';
import { VEHICLE_STATUS_COLORS, VEHICLE_STATUS_LABELS } from '../../constants';

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then(m => m.ZoomControl), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(m => m.Tooltip), { ssr: false });

const LAGOS_CENTER: [number, number] = [6.5244, 3.3792];
const LAGOS_ZOOM = 11;

type FilterStatus = VehicleStatus | 'all';

const filterOptions: { value: FilterStatus; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'on_route', label: 'On Route' },
  { value: 'anomaly',  label: 'Anomaly' },
  { value: 'alert',    label: 'Alert' },
  { value: 'idle',     label: 'Idle' },
  { value: 'offline',  label: 'Offline' },
];

interface FleetMapProps {
  vehicles: Vehicle[];
  onVehicleClick: (vehicle: Vehicle) => void;
  height?: string;
}

export function FleetMap({ vehicles, onVehicleClick, height = '100%' }: FleetMapProps) {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredVehicles = filter === 'all'
    ? vehicles
    : vehicles.filter(v => v.status === filter);

  const counts = vehicles.reduce((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#1E2D42]" style={{ height }}>

      {/* Filter Bar */}
      <div className="absolute top-4 left-4 z-[400] flex items-center gap-1.5 bg-[#1A2235]/90 backdrop-blur-sm border border-[#1E2D42] rounded-lg p-1">
        {filterOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-150 flex items-center gap-1.5 ${
              filter === opt.value
                ? 'bg-[#00C896] text-[#0A0E1A]'
                : 'text-[#64748B] hover:text-[#E2E8F0]'
            }`}
          >
            {opt.value !== 'all' && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: VEHICLE_STATUS_COLORS[opt.value as VehicleStatus] }} />
            )}
            {opt.label}
            {opt.value !== 'all' && counts[opt.value] !== undefined && (
              <span className="opacity-60">{counts[opt.value]}</span>
            )}
          </button>
        ))}
      </div>

      {/* Vehicle Count */}
      <div className="absolute top-4 right-4 z-[400] bg-[#1A2235]/90 backdrop-blur-sm border border-[#1E2D42] rounded-lg px-3 py-2">
        <p className="text-xs text-[#64748B]">Showing</p>
        <p className="text-lg font-bold text-[#E2E8F0] tabular-nums">{filteredVehicles.length}</p>
        <p className="text-xs text-[#64748B]">of {vehicles.length} vehicles</p>
      </div>

      {/* Map */}
      <MapWithVehicles
        filteredVehicles={filteredVehicles}
        onVehicleClick={onVehicleClick}
      />
    </div>
  );
}

// Separate client component to avoid hydration issues
function MapWithVehicles({ filteredVehicles, onVehicleClick }: {
  filteredVehicles: Vehicle[];
  onVehicleClick: (v: Vehicle) => void;
}) {
  const [L, setL] = React.useState<typeof import('leaflet') | null>(null);

  React.useEffect(() => {
    import('leaflet').then(leaflet => {
      // Fix leaflet default icon
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      setL(leaflet);
    });
  }, []);

  function createVehicleIcon(leaflet: typeof import('leaflet'), status: Vehicle['status']) {
    const color = VEHICLE_STATUS_COLORS[status];
    return leaflet.divIcon({
      className: '',
      html: `<div style="width:12px;height:12px;background:${color};border:2px solid #0A0E1A;border-radius:50%;box-shadow:0 0 0 3px ${color}30;"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
  }

  if (!L) {
    return (
      <div className="w-full h-full bg-[#0A0E1A] flex items-center justify-center">
        <div className="text-[#64748B] text-sm">Loading map...</div>
      </div>
    );
  }

  return (
    <MapContainer
      center={LAGOS_CENTER}
      zoom={LAGOS_ZOOM}
      style={{ width: '100%', height: '100%', background: '#0A0E1A' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        className="map-tiles-dark"
      />
      <ZoomControl position="bottomright" />
      {filteredVehicles
        .filter(v => v.current_lat && v.current_lng)
        .map(vehicle => (
          <Marker
            key={vehicle.id}
            position={[vehicle.current_lat!, vehicle.current_lng!]}
            icon={createVehicleIcon(L, vehicle.status)}
            eventHandlers={{ click: () => onVehicleClick(vehicle) }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              <div style={{ background: '#1A2235', border: '1px solid #1E2D42', borderRadius: 8, padding: '6px 10px', minWidth: 100 }}>
                <div style={{ fontWeight: 700, color: '#E2E8F0', fontSize: 13 }}>{vehicle.plate}</div>
                <div style={{ color: VEHICLE_STATUS_COLORS[vehicle.status], fontSize: 11 }}>{VEHICLE_STATUS_LABELS[vehicle.status]}</div>
                {vehicle.current_speed !== undefined && (
                  <div style={{ color: '#64748B', fontSize: 11 }}>{vehicle.current_speed} km/h</div>
                )}
              </div>
            </Tooltip>
          </Marker>
        ))}
    </MapContainer>
  );
}
