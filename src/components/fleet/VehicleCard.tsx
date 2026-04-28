'use client';

import React from 'react';
import { Truck, Droplets, Gauge, Clock } from 'lucide-react';
import { Vehicle } from '../../types';
import { Card } from '../ui/Card';
import { Badge, vehicleStatusVariant } from '../ui/Badge';
import { VEHICLE_STATUS_LABELS, VEHICLE_STATUS_COLORS } from '../../constants';
import { formatRelative, formatSpeed } from '../../lib/formatters';
import Link from 'next/link';

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full bg-[#111827] rounded-full h-1 overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const statusColor = VEHICLE_STATUS_COLORS[vehicle.status];
  const fuelColor = vehicle.fuel_level
    ? vehicle.fuel_level > 50 ? '#00C896' : vehicle.fuel_level > 20 ? '#F59E0B' : '#EF4444'
    : '#374151';

  return (
    <Link href={`/vehicles/${vehicle.id}`}>
      <Card
        className="p-4 hover:shadow-[0_0_20px_rgba(0,200,150,0.1)] hover:border-[#00C896]/30 transition-all duration-200"
        accent={vehicle.status === 'alert' || vehicle.status === 'anomaly'}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${statusColor}20` }}>
              <Truck size={16} style={{ color: statusColor }} />
            </div>
            <div>
              <p className="font-bold text-[#E2E8F0]">{vehicle.plate}</p>
              <p className="text-xs text-[#64748B] capitalize">{vehicle.type}</p>
            </div>
          </div>
          <Badge label={VEHICLE_STATUS_LABELS[vehicle.status]} variant={vehicleStatusVariant[vehicle.status]} dot />
        </div>

        <div className="space-y-2.5">
          {vehicle.fuel_level !== undefined && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span className="flex items-center gap-1"><Droplets size={10} /> Fuel</span>
                <span className="font-mono" style={{ color: fuelColor }}>{vehicle.fuel_level}%</span>
              </div>
              <MiniBar value={vehicle.fuel_level} color={fuelColor} />
            </div>
          )}
          {vehicle.current_speed !== undefined && (
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-[#64748B]"><Gauge size={10} /> Speed</span>
              <span className="font-mono text-[#E2E8F0]">{formatSpeed(vehicle.current_speed)}</span>
            </div>
          )}
          {vehicle.last_seen && (
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-[#64748B]"><Clock size={10} /> Last seen</span>
              <span className="text-[#64748B]">{formatRelative(vehicle.last_seen)}</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
