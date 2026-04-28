'use client';

import React from 'react';
import { X, Gauge, Droplets, MapPin } from 'lucide-react';
import { Vehicle, Driver, Anomaly } from '../../types';
import { Badge, vehicleStatusVariant } from '../ui/Badge';
import { VEHICLE_STATUS_LABELS, ANOMALY_ICONS, SCORE_COLOR } from '../../constants';
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
    <div className="w-full bg-fleer-surface rounded-full h-2 overflow-hidden border border-fleer-border/30">
      <div 
        className="h-full rounded-full transition-all duration-1000 ease-out" 
        style={{ width: `${level}%`, backgroundColor: color }} 
      />
    </div>
  );
}

export function VehicleDetailPanel({ vehicle, driver, recentAnomalies = [], onClose }: VehicleDetailPanelProps) {
  if (!vehicle) return null;

  return (
    <div className="absolute top-4 right-4 bottom-4 w-80 z-[500] bg-fleer-surface/95 backdrop-blur-xl border border-fleer-border rounded-xl shadow-card-hover flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-300">

      {/* Header */}
      <div className="flex items-start justify-between px-5 py-5 border-b border-fleer-border bg-fleer-bg/30">
        <div>
          <h3 className="font-display font-bold text-fleer-text text-base tracking-tight">{vehicle.plate}</h3>
          <Badge 
            label={VEHICLE_STATUS_LABELS[vehicle.status]} 
            variant={vehicleStatusVariant[vehicle.status]} 
            dot 
            className="mt-1.5" 
          />
        </div>
        <button onClick={onClose} className="text-fleer-text-dim hover:text-fleer-text p-1.5 rounded-lg hover:bg-fleer-card transition-all">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">

        {/* Fuel Section */}
        {vehicle.fuel_level !== undefined && (
          <div className="space-y-3 bg-fleer-bg/40 p-4 rounded-xl border border-fleer-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-display font-bold text-fleer-text-muted uppercase tracking-widest">
                <Droplets size={14} className="text-fleer-info" />
                Fuel Level
              </div>
              <span className={clsx(
                'font-display font-bold tabular-nums text-sm',
                vehicle.fuel_level > 50 ? 'text-fleer-accent' : vehicle.fuel_level > 20 ? 'text-fleer-warning' : 'text-fleer-danger'
              )}>
                {vehicle.fuel_level}%
              </span>
            </div>
            <FuelBar level={vehicle.fuel_level} />
          </div>
        )}

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-fleer-bg/30 border border-fleer-border p-3 rounded-lg">
             <p className="text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-[0.15em] mb-1">Live Speed</p>
             <div className="flex items-baseline gap-1">
               <span className="font-mono text-base font-bold text-fleer-text">{vehicle.current_speed}</span>
               <span className="font-display text-[10px] font-bold text-fleer-text-dim">KM/H</span>
             </div>
          </div>
          <div className="bg-fleer-bg/30 border border-fleer-border p-3 rounded-lg">
             <p className="text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-[0.15em] mb-1">Status</p>
             <div className="flex items-center gap-1.5 mt-1">
                <span className={clsx("w-2 h-2 rounded-full", vehicle.status === 'on_route' ? 'bg-fleer-accent pulse-green' : 'bg-fleer-text-dim')} />
                <span className="font-display text-[11px] font-bold text-fleer-text-muted uppercase tracking-wider">
                  {vehicle.status.replace('_', ' ')}
                </span>
             </div>
          </div>
        </div>

        {/* Driver Snapshot */}
        {driver && (
          <div className="bg-fleer-card border border-fleer-border rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent text-sm font-bold font-display border border-fleer-accent/10">
                {driver.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold text-sm text-fleer-text truncate tracking-tight">{driver.name}</p>
                <p className="font-mono text-[11px] text-fleer-text-muted">{driver.phone}</p>
              </div>
              <div className="text-right">
                <span className="font-display text-lg font-bold tabular-nums tracking-tighter" style={{ color: SCORE_COLOR(driver.score) }}>
                  {driver.score}
                </span>
                <p className="font-display text-[10px] font-bold text-fleer-text-dim uppercase tracking-widest leading-none">Score</p>
              </div>
            </div>
          </div>
        )}

        {/* Incident History */}
        {recentAnomalies.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-display text-[11px] font-bold text-fleer-text-muted uppercase tracking-widest px-1">Recent Incidents</h4>
            <div className="space-y-2">
              {recentAnomalies.slice(0, 3).map(anomaly => (
                <div key={anomaly.id} className="flex items-start gap-3 bg-fleer-card/50 border border-fleer-border rounded-lg p-3 hover:border-fleer-accent/30 transition-all">
                  <span className="text-base shrink-0">{ANOMALY_ICONS[anomaly.type] || '⚠️'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-xs font-bold text-fleer-text truncate uppercase tracking-tight">{anomalyLabel[anomaly.type]}</p>
                    <p className="font-display text-[10px] text-fleer-text-muted font-medium mt-0.5">{formatRelative(anomaly.timestamp)}</p>
                  </div>
                  {anomaly.naira_value && (
                    <span className="font-mono text-xs text-fleer-danger font-bold shrink-0">-{formatNaira(anomaly.naira_value)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-5 border-t border-fleer-border bg-fleer-bg/50">
        <button className="w-full h-11 bg-fleer-accent/10 text-fleer-accent border border-fleer-accent/20 hover:bg-fleer-accent hover:text-fleer-bg font-display font-bold text-[11px] uppercase tracking-[0.2em] rounded-lg shadow-sm transition-all duration-200">
          Full Operations Report
        </button>
      </div>
    </div>
  );
}
