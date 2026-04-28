'use client';

import React from 'react';
import { X, Gauge, Droplets, MapPin } from 'lucide-react';
import { Vehicle, Driver, Anomaly } from '../../types';
import { Badge, vehicleStatusVariant } from '../ui/Badge';
import { VEHICLE_STATUS_LABELS, VEHICLE_STATUS_COLORS, ANOMALY_ICONS } from '../../constants';
import { formatRelative, formatNaira, anomalyLabel } from '../../lib/formatters';
import { clsx } from 'clsx';

interface VehicleDetailPanelProps {
  vehicle: Vehicle | null;
  driver?: Driver;
  recentAnomalies?: Anomaly[];
  onClose: () => void;
}

function FuelBar({ level }: { level: number }) {
  const color = level > 50 ? '#00C896' : level > 20 ? '#F59E0B' : '#EF4444';
  return (
    <div className="w-full bg-[#111827] rounded-full h-2 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${level}%`, background: color }} />
    </div>
  );
}

export function VehicleDetailPanel({ vehicle, driver, recentAnomalies = [], onClose }: VehicleDetailPanelProps) {
  if (!vehicle) return null;
  const statusColor = VEHICLE_STATUS_COLORS[vehicle.status];

  return (
    <div className="absolute top-4 right-4 bottom-4 w-80 z-[500] bg-[#1A2235]/95 backdrop-blur-md border border-[#1E2D42] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-300">

      {/* Header */}
      <div className="flex items-start justify-between px-4 py-4 border-b border-[#1E2D42]">
        <div>
          <h3 className="font-bold text-[#E2E8F0] text-base">{vehicle.plate}</h3>
          <Badge label={VEHICLE_STATUS_LABELS[vehicle.status]} variant={vehicleStatusVariant[vehicle.status]} dot className="mt-1" />
        </div>
        <button onClick={onClose} className="text-[#64748B] hover:text-[#E2E8F0] p-1 rounded-lg hover:bg-[#111827] transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* Fuel Level */}
        {vehicle.fuel_level !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Droplets size={12} />Fuel Level
              </div>
              <span className={clsx(
                'text-sm font-bold tabular-nums',
                vehicle.fuel_level > 50 ? 'text-[#00C896]' : vehicle.fuel_level > 20 ? 'text-amber-400' : 'text-red-400'
              )}>
                {vehicle.fuel_level}%
              </span>
            </div>
            <FuelBar level={vehicle.fuel_level} />
          </div>
        )}

        {/* Speed */}
        {vehicle.current_speed !== undefined && (
          <div className="flex items-center justify-between py-2 border-b border-[#1E2D42]">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <Gauge size={12} />Speed
            </div>
            <span className="font-mono text-sm text-[#E2E8F0]">{vehicle.current_speed} km/h</span>
          </div>
        )}

        {/* Location */}
        {vehicle.current_lat && vehicle.current_lng && (
          <div className="flex items-center justify-between py-2 border-b border-[#1E2D42]">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <MapPin size={12} />Coordinates
            </div>
            <span className="font-mono text-xs text-[#64748B]">
              {vehicle.current_lat.toFixed(4)}, {vehicle.current_lng.toFixed(4)}
            </span>
          </div>
        )}

        {/* Driver */}
        {driver && (
          <div className="bg-[#111827] rounded-lg p-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#00C896]/10 flex items-center justify-center text-[#00C896] text-xs font-bold">
                {driver.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-[#E2E8F0]">{driver.name}</p>
                <p className="text-xs text-[#64748B]">{driver.phone}</p>
              </div>
              <div className="ml-auto text-right">
                <span className="text-sm font-bold" style={{ color: driver.score >= 80 ? '#00C896' : driver.score >= 60 ? '#F59E0B' : '#EF4444' }}>
                  {driver.score}
                </span>
                <p className="text-xs text-[#64748B]">score</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Anomalies */}
        {recentAnomalies.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Recent Anomalies</h4>
            <div className="space-y-2">
              {recentAnomalies.slice(0, 4).map(anomaly => (
                <div key={anomaly.id} className="flex items-start gap-2.5 bg-[#111827] rounded-lg p-2.5">
                  <span className="text-base">{ANOMALY_ICONS[anomaly.type] || '⚠️'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#E2E8F0] truncate">{anomalyLabel[anomaly.type]}</p>
                    <p className="text-xs text-[#64748B]">{formatRelative(anomaly.timestamp)}</p>
                  </div>
                  {anomaly.naira_value && (
                    <span className="text-xs text-red-400 font-mono font-medium shrink-0">-{formatNaira(anomaly.naira_value)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {recentAnomalies.length === 0 && (
          <div className="text-center py-4">
            <p className="text-xs text-[#64748B]">No recent anomalies ✅</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#1E2D42]">
        <button className="w-full bg-[#00C896]/10 text-[#00C896] hover:bg-[#00C896]/20 text-sm font-medium py-2 rounded-lg transition-colors">
          View Full Details →
        </button>
      </div>
    </div>
  );
}
