"use client";

import React from "react";
import { X, MapPin, Gauge, Droplets, User, AlertTriangle } from "lucide-react";
import { Vehicle, Driver, Anomaly } from "../../types";
import { Badge, vehicleStatusVariant } from "../ui/Badge";
import {
  VEHICLE_STATUS_LABELS,
  VEHICLE_STATUS_COLORS,
  ANOMALY_ICONS,
} from "../../constants";
import {
  formatRelative,
  formatNaira,
  anomalyLabel,
} from "../../lib/formatters";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

interface VehicleDetailPanelProps {
  vehicle: Vehicle | null;
  driver?: Driver;
  recentAnomalies?: Anomaly[];
  onClose: () => void;
}

function FuelBar({ level }: { level: number }) {
  const color = level > 50 ? "#00C896" : level > 20 ? "#F59E0B" : "#EF4444";
  return (
    <div className="w-full bg-fleer-surface rounded-full h-2 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${level}%`, background: color }}
      />
    </div>
  );
}

export function VehicleDetailPanel({
  vehicle,
  driver,
  recentAnomalies = [],
  onClose,
}: VehicleDetailPanelProps) {
  const router = useRouter();
  if (!vehicle) return null;

  const statusColor = VEHICLE_STATUS_COLORS[vehicle.status];

  return (
    <div className="absolute top-4 right-4 bottom-4 w-80 z-[1100] bg-fleer-card/95 backdrop-blur-md border border-fleer-border rounded-xl shadow-2xl flex flex-col overflow-hidden slide-in">
      {/* Panel Header */}
      <div className="relative px-5 py-5 border-b border-fleer-border">
        <div className="pr-8">
          <h3 className="font-display font-bold text-fleer-text text-lg tracking-tight">
            {vehicle.plate}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge
              label={VEHICLE_STATUS_LABELS[vehicle.status]}
              variant={vehicleStatusVariant[vehicle.status]}
              dot
            />
            <span className="text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-widest">
              {vehicle.type}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-fleer-text-muted hover:text-fleer-text p-2 rounded-full hover:bg-fleer-surface border border-transparent hover:border-fleer-border transition-all shadow-sm"
          title="Close Panel"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Fuel Level */}
        {vehicle.fuel_level !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-fleer-text-muted font-display">
                <Droplets size={12} />
                Fuel Level
              </div>
              <span
                className={clsx(
                  "text-sm font-display font-bold tabular-nums",
                  vehicle.fuel_level > 50
                    ? "text-fleer-accent"
                    : vehicle.fuel_level > 20
                      ? "text-fleer-warning"
                      : "text-fleer-danger",
                )}
              >
                {vehicle.fuel_level}%
              </span>
            </div>
            <FuelBar level={vehicle.fuel_level} />
          </div>
        )}

        {/* Speed */}
        {vehicle.current_speed !== undefined && (
          <div className="flex items-center justify-between py-2 border-b border-fleer-border">
            <div className="flex items-center gap-1.5 text-xs text-fleer-text-muted font-display">
              <Gauge size={12} />
              Speed
            </div>
            <span className="font-mono text-sm text-fleer-text">
              {vehicle.current_speed} km/h
            </span>
          </div>
        )}

        {/* Location */}
        {vehicle.current_lat && vehicle.current_lng && (
          <div className="flex items-center justify-between py-2 border-b border-fleer-border">
            <div className="flex items-center gap-1.5 text-xs text-fleer-text-muted font-display">
              <MapPin size={12} />
              Coordinates
            </div>
            <span className="font-mono text-xs text-fleer-text-muted">
              {vehicle.current_lat.toFixed(4)}, {vehicle.current_lng.toFixed(4)}
            </span>
          </div>
        )}

        {/* Driver */}
        {driver && (
          <div className="bg-fleer-surface rounded-lg p-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent text-xs font-bold font-display">
                {driver.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-display font-medium text-fleer-text">
                  {driver.name}
                </p>
                <p className="text-xs text-fleer-text-muted">{driver.phone}</p>
              </div>
              <div className="ml-auto">
                <div className="text-right">
                  <span
                    className="text-sm font-display font-bold"
                    style={{
                      color:
                        driver.score >= 80
                          ? "#00C896"
                          : driver.score >= 60
                            ? "#F59E0B"
                            : "#EF4444",
                    }}
                  >
                    {driver.score}
                  </span>
                  <p className="text-xs text-fleer-text-muted">score</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Anomalies */}
        {recentAnomalies.length > 0 && (
          <div>
            <h4 className="text-xs font-display font-semibold text-fleer-text-muted uppercase tracking-wider mb-2">
              Recent Anomalies
            </h4>
            <div className="space-y-2">
              {recentAnomalies.slice(0, 4).map((anomaly) => (
                <div
                  key={anomaly.id}
                  className="flex items-start gap-2.5 bg-fleer-surface rounded-lg p-2.5"
                >
                  <span className="text-base">
                    {ANOMALY_ICONS[anomaly.type] || "⚠️"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-display font-medium text-fleer-text truncate">
                      {anomalyLabel[anomaly.type]}
                    </p>
                    <p className="text-xs text-fleer-text-muted">
                      {formatRelative(anomaly.timestamp)}
                    </p>
                  </div>
                  {anomaly.naira_value && (
                    <span className="text-xs text-fleer-danger font-mono font-medium shrink-0">
                      -{formatNaira(anomaly.naira_value)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {recentAnomalies.length === 0 && (
          <div className="text-center py-4">
            <p className="text-xs text-fleer-text-muted">No recent anomalies</p>
          </div>
        )}
      </div>

      {/* View Full Details */}
      <div className="p-4 border-t border-fleer-border">
        <button 
          onClick={() => router.push(`/vehicles/${vehicle.id}`)}
          className="w-full bg-fleer-accent/10 text-fleer-accent hover:bg-fleer-accent/20 text-sm font-display font-medium py-2 rounded-lg transition-colors"
        >
          View Full Details →
        </button>
      </div>
    </div>
  );
}
