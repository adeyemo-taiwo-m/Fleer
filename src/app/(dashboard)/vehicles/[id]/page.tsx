"use client";

import React, { use } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useVehicles } from "@/hooks/useVehicles";
import { useDrivers } from "@/hooks/useDrivers";
import { useAlerts } from "@/hooks/useAlerts";
import { useOrganization } from "@/hooks/useOrganization";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge, vehicleStatusVariant } from "@/components/ui/Badge";
import { 
  Truck, 
  MapPin, 
  Gauge, 
  Droplets, 
  Clock, 
  AlertTriangle, 
  History, 
  Shield, 
  Zap,
  ArrowLeft
} from "lucide-react";
import { 
  VEHICLE_STATUS_LABELS, 
  VEHICLE_STATUS_COLORS, 
  ANOMALY_ICONS 
} from "@/constants";
import { 
  formatRelative, 
  formatSpeed, 
  formatNaira, 
  anomalyLabel 
} from "@/lib/formatters";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { vehicles, isLoading: vehiclesLoading } = useVehicles();
  const { drivers } = useDrivers();
  const { alerts } = useAlerts();
  const { org, user, logout } = useOrganization();
  const router = useRouter();

  const vehicle = vehicles.find((v) => v.id === id);
  const driver = drivers.find((d) => d.id === vehicle?.id); // Simplified mapping for demo
  const vehicleAlerts = alerts.filter((a) => a.vehicle_plate === vehicle?.plate);

  if (vehiclesLoading) {
    return (
      <AppShell title="Vehicle Profile" isLive={true} orgName={org?.name || ""} userEmail={user?.email || ""} onLogout={logout}>
        <LoadingSpinner label="Loading vehicle data..." />
      </AppShell>
    );
  }

  if (!vehicle) {
    return (
      <AppShell title="Vehicle Not Found" isLive={true} orgName={org?.name || ""} userEmail={user?.email || ""} onLogout={logout}>
        <EmptyState 
          icon={<Truck size={48} className="text-fleer-text-dim" />}
          title="Vehicle not found"
          description={`No vehicle with ID ${id} was found in your fleet.`}
          action={{ label: "Back to Fleet", onClick: () => router.push("/vehicles") }}
        />
      </AppShell>
    );
  }

  return (
    <AppShell
      title={`Vehicle Profile — ${vehicle.plate}`}
      subtitle={`${vehicle.type.toUpperCase()} · ${org?.name}`}
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      onLogout={logout}
      topBarActions={
        <Link href="/vehicles" className="flex items-center gap-2 text-xs font-display font-bold text-fleer-text-muted hover:text-fleer-text transition-colors bg-fleer-surface border border-fleer-border px-3 py-1.5 rounded-lg">
          <ArrowLeft size={14} />
          Back to fleet
        </Link>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Core Stats */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Header Card */}
          <Card className="overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-fleer-accent/20 via-fleer-accent/10 to-transparent relative">
              <div className="absolute -bottom-6 left-8 flex items-end gap-6">
                <div className="w-20 h-20 rounded-2xl bg-fleer-card border-4 border-fleer-bg flex items-center justify-center shadow-card">
                  <Truck size={32} className="text-fleer-accent" />
                </div>
                <div className="mb-2">
                  <h1 className="text-2xl font-display font-bold text-fleer-text">{vehicle.plate}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      label={VEHICLE_STATUS_LABELS[vehicle.status]} 
                      variant={vehicleStatusVariant[vehicle.status]} 
                      dot 
                    />
                    <span className="text-xs text-fleer-text-muted font-display uppercase tracking-wider">
                      {vehicle.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-10 px-8 pb-8">
              <div className="grid grid-cols-4 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-widest">Efficiency Baseline</p>
                  <p className="text-lg font-mono font-bold text-fleer-text">{vehicle.efficiency_baseline} <span className="text-xs text-fleer-text-muted">km/L</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-widest">Fuel Capacity</p>
                  <p className="text-lg font-mono font-bold text-fleer-text">{vehicle.fuel_capacity} <span className="text-xs text-fleer-text-muted">L</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-widest">Total Distance</p>
                  <p className="text-lg font-mono font-bold text-fleer-text">14,282 <span className="text-xs text-fleer-text-muted">km</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-widest">Last Telemetry</p>
                  <p className="text-sm font-display font-medium text-fleer-text">{formatRelative(vehicle.last_seen || new Date().toISOString())}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Anomaly Timeline */}
          <Card>
            <CardHeader 
              title="Operational History" 
              subtitle="Timeline of detected anomalies and status changes"
              icon={<History size={16} />}
            />
            <CardBody>
              {vehicleAlerts.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-fleer-border rounded-xl">
                  <p className="text-sm text-fleer-text-muted">No anomalies detected for this vehicle</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {vehicleAlerts.map((alert) => (
                    <div key={alert.id} className="flex gap-4 p-4 bg-fleer-surface border border-fleer-border rounded-xl">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        alert.severity === 'critical' ? 'bg-fleer-danger/10 text-fleer-danger' : 'bg-fleer-warning/10 text-fleer-warning'
                      }`}>
                        {ANOMALY_ICONS[alert.type] || <AlertTriangle size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-display font-bold text-fleer-text">{anomalyLabel[alert.type]}</h4>
                          <span className="text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-wider">{formatRelative(alert.timestamp)}</span>
                        </div>
                        <p className="text-xs text-fleer-text-muted mt-1 leading-relaxed">
                          Detected unusual {alert.type.replace('_', ' ')} pattern at coordinates {alert.lat?.toFixed(4)}, {alert.lng?.toFixed(4)}.
                        </p>
                        {alert.naira_value && (
                          <div className="mt-2 flex items-center gap-2">
                             <Badge label={`Financial Impact: -${formatNaira(alert.naira_value)}`} variant="danger" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Sidebar info */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Real-time Telemetry */}
          <Card accent>
            <CardHeader title="Live Telemetry" icon={<Zap size={16} />} />
            <CardBody className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-display font-bold uppercase tracking-widest text-fleer-text-muted">
                  <span>Current Speed</span>
                  <span className="text-fleer-text font-mono text-sm">{formatSpeed(vehicle.current_speed || 0)}</span>
                </div>
                <div className="h-2 bg-fleer-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-fleer-accent transition-all duration-1000" 
                    style={{ width: `${Math.min(((vehicle.current_speed || 0) / 120) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-display font-bold uppercase tracking-widest text-fleer-text-muted">
                  <span>Fuel Level</span>
                  <span className={`font-mono text-sm ${
                    (vehicle.fuel_level || 0) > 50 ? 'text-fleer-accent' : (vehicle.fuel_level || 0) > 20 ? 'text-fleer-warning' : 'text-fleer-danger'
                  }`}>{vehicle.fuel_level}%</span>
                </div>
                <div className="h-2 bg-fleer-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000" 
                    style={{ 
                      width: `${vehicle.fuel_level}%`,
                      backgroundColor: (vehicle.fuel_level || 0) > 50 ? '#00C896' : (vehicle.fuel_level || 0) > 20 ? '#F59E0B' : '#EF4444'
                    }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-fleer-border">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-fleer-surface flex items-center justify-center text-fleer-text-dim">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-display font-bold text-fleer-text-muted uppercase tracking-widest">Last Coordinates</p>
                      <p className="text-sm font-mono text-fleer-text">{vehicle.current_lat?.toFixed(6)}, {vehicle.current_lng?.toFixed(6)}</p>
                    </div>
                 </div>
              </div>
            </CardBody>
          </Card>

          {/* Assigned Driver */}
          <Card>
            <CardHeader title="Operator" icon={<Shield size={16} />} />
            <CardBody>
              {driver ? (
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-fleer-accent/10 border border-fleer-accent/20 flex items-center justify-center text-xl font-display font-bold text-fleer-accent">
                    {driver.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-display font-bold text-fleer-text">{driver.name}</h4>
                    <p className="text-xs text-fleer-text-muted">{driver.phone}</p>
                    <div className="flex items-center gap-2 mt-2">
                       <div className="px-2 py-0.5 bg-fleer-surface rounded text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-wider">
                         Safety Score: <span className={driver.score >= 80 ? 'text-fleer-accent' : 'text-fleer-warning'}>{driver.score}</span>
                       </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-fleer-text-muted italic">No operator assigned</p>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
