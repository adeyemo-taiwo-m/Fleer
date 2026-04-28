'use client';

import React from 'react';
import { X, Gauge, Droplets, MapPin } from 'lucide-react';
import { Vehicle, Driver, Anomaly } from '../../types';
import { Badge, vehicleStatusVariant } from '../ui/Badge';
import { VEHICLE_STATUS_LABELS, ANOMALY_ICONS } from '../../constants';
import { formatRelative, formatNaira, anomalyLabel } from '../../lib/formatters';
import { clsx } from 'clsx';

interface VehicleDetailPanelProps {
  vehicle: Vehicle | null;
  driver?: Driver;
  recentAnomalies?: Anomaly[];
  onClose: () => void;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'var(--score-high)';
  if (score >= 60) return 'var(--score-mid)';
  return 'var(--score-low)';
};

function FuelBar({ level }: { level: number }) {
  const color = level > 50 ? 'var(--score-high)' : level > 20 ? 'var(--score-mid)' : 'var(--score-low)';
  return (
    <div className="w-full bg-white/[0.08] rounded-full h-1 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${level}%`, backgroundColor: color }} />
    </div>
  );
}

export function VehicleDetailPanel({ vehicle, driver, recentAnomalies = [], onClose }: VehicleDetailPanelProps) {
  if (!vehicle) return null;

  return (
    <div className="absolute top-[var(--space-4)] right-[var(--space-4)] bottom-[var(--space-4)] w-[320px] z-[500] bg-[var(--bg-surface)]/95 backdrop-blur-xl border border-[var(--border-default)] rounded-[var(--radius-xl)] shadow-[var(--shadow-card-hover)] flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-300">

      {/* Header */}
      <div className="flex items-start justify-between px-[var(--space-4)] py-[var(--space-4)] border-b border-[var(--border-subtle)]">
        <div>
          <h3 className="font-bold text-[var(--text-primary)] text-[var(--text-base)] tracking-tight">{vehicle.plate}</h3>
          <Badge label={VEHICLE_STATUS_LABELS[vehicle.status]} variant={vehicleStatusVariant[vehicle.status]} dot className="mt-1" />
        </div>
        <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-[var(--radius-md)] hover:bg-white/5 transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-[var(--space-4)] space-y-[var(--space-5)] scrollbar-hide">

        {/* Fuel Level */}
        {vehicle.fuel_level !== undefined && (
          <div className="space-y-[var(--space-2)] bg-black/10 p-3 rounded-[var(--radius-md)] border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[var(--text-xs)] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                <Droplets size={12} />Fuel Level
              </div>
              <span className={clsx(
                'text-[var(--text-sm)] font-bold tabular-nums',
                vehicle.fuel_level > 50 ? 'text-[var(--score-high)]' : vehicle.fuel_level > 20 ? 'text-[var(--score-mid)]' : 'text-[var(--score-low)]'
              )}>
                {vehicle.fuel_level}%
              </span>
            </div>
            <FuelBar level={vehicle.fuel_level} />
          </div>
        )}

        {/* Core Stats */}
        <div className="space-y-[var(--space-1)]">
          {vehicle.current_speed !== undefined && (
            <div className="flex items-center justify-between py-[var(--space-2)] border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-[var(--text-xs)] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                <Gauge size={12} />Speed
              </div>
              <span className="font-mono text-[var(--text-sm)] text-[var(--text-primary)]">{vehicle.current_speed} <span className="text-[10px] text-[var(--text-muted)]">KM/H</span></span>
            </div>
          )}

          {vehicle.current_lat && vehicle.current_lng && (
            <div className="flex items-center justify-between py-[var(--space-2)] border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-1.5 text-[var(--text-xs)] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                <MapPin size={12} />Position
              </div>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                {vehicle.current_lat.toFixed(4)}, {vehicle.current_lng.toFixed(4)}
              </span>
            </div>
          )}
        </div>

        {/* Driver Card */}
        {driver && (
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[var(--accent-green-dim)] flex items-center justify-center text-[var(--accent-green)] text-[var(--text-sm)] font-bold border border-[var(--accent-green)]/10">
                {driver.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[var(--text-sm)] font-bold text-[var(--text-primary)] truncate">{driver.name}</p>
                <p className="text-[10px] text-[var(--text-muted)] tracking-wider">{driver.phone}</p>
              </div>
              <div className="text-right">
                <span className="text-[var(--text-base)] font-extrabold tracking-tighter" style={{ color: getScoreColor(driver.score) }}>
                  {driver.score}
                </span>
                <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-widest">Score</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Anomalies */}
        {recentAnomalies.length > 0 && (
          <div>
            <h4 className="text-[var(--text-xs)] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3 px-1">Recent Anomalies</h4>
            <div className="space-y-[var(--space-2)]">
              {recentAnomalies.slice(0, 4).map(anomaly => (
                <div key={anomaly.id} className="flex items-start gap-3 bg-[var(--bg-card)]/50 border border-[var(--border-subtle)] rounded-[var(--radius-md)] p-2.5 hover:border-[var(--border-default)] transition-colors">
                  <span className="text-[var(--text-base)]">{ANOMALY_ICONS[anomaly.type] || '⚠️'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--text-xs)] font-bold text-[var(--text-primary)] truncate uppercase tracking-tight">{anomalyLabel[anomaly.type]}</p>
                    <p className="text-[10px] text-[var(--text-muted)] font-medium">{formatRelative(anomaly.timestamp)}</p>
                  </div>
                  {anomaly.naira_value && (
                    <span className="text-[var(--text-xs)] text-[var(--accent-red)] font-mono font-bold shrink-0">-{formatNaira(anomaly.naira_value)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!recentAnomalies.length && (
          <div className="text-center py-6 border-2 border-dashed border-[var(--border-subtle)] rounded-[var(--radius-lg)]">
             <div className="text-2xl mb-1">🛡️</div>
             <p className="text-[var(--text-xs)] text-[var(--text-muted)] font-medium">All systems normal</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-[var(--space-4)] border-t border-[var(--border-subtle)] bg-[var(--bg-card)]/30">
        <button className="w-full bg-[var(--accent-green-dim)] text-[var(--accent-green)] border border-[var(--accent-green)]/20 hover:bg-[var(--accent-green)] hover:text-[#0d1117] text-[var(--text-xs)] font-bold uppercase tracking-widest py-2.5 rounded-[var(--radius-md)] transition-all duration-200">
          Full Diagnostic Report
        </button>
      </div>
    </div>
  );
}
