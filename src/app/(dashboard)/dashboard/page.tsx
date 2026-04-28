'use client';

import React from 'react';
import { FleetSummaryBar } from '@/components/fleet/FleetSummaryBar';
import { AlertsLog } from '@/components/alerts/AlertsLog';
import { DriverLeaderboard } from '@/components/drivers/DriverLeaderboard';
import { FleetMap } from '@/components/map/FleetMap';
import { Card, CardHeader } from '@/components/ui/Card';
import { useVehicles } from '@/hooks/useVehicles';
import { useAlerts } from '@/hooks/useAlerts';
import { useDrivers } from '@/hooks/useDrivers';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { summary, vehicles, isLoading: vehiclesLoading } = useVehicles();
  const { alerts, resolveAlert } = useAlerts();
  const { drivers } = useDrivers();
  const router = useRouter();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-[var(--space-8)]">
      
      {/* Page Header */}
      <header className="flex flex-row justify-between items-center pb-[var(--space-6)] border-b border-[var(--border-subtle)]">
        <div>
          <h1 className="text-[var(--text-2xl)] font-bold text-[var(--text-primary)] tracking-tight">Fleet Intelligence</h1>
          <p className="text-[var(--text-sm)] text-[var(--text-secondary)] mt-1">Real-time revenue protection and performance monitoring</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[var(--text-xs)] text-[var(--text-muted)] font-mono uppercase tracking-widest">
            Network Status: <span className="text-[var(--accent-green)] font-bold">Online</span>
          </p>
        </div>
      </header>

      {/* KPI Bar */}
      <FleetSummaryBar summary={summary} isLoading={vehiclesLoading} />

      <div className="grid grid-cols-12 gap-[var(--space-6)]">
        
        {/* Left Col: Map & Alerts */}
        <div className="col-span-12 lg:col-span-8 space-y-[var(--space-6)]">
          
          {/* Live Map Preview */}
          <Card className="overflow-hidden border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
            <CardHeader
              title="Fleet Live View"
              subtitle="Real-time vehicle positioning and status"
              action={
                <button
                  onClick={() => router.push('/map')}
                  className="text-[var(--text-xs)] text-[var(--accent-green)] hover:underline font-bold uppercase tracking-wider"
                >
                  Full Map →
                </button>
              }
            />
            <div className="h-[400px] relative">
              <FleetMap
                vehicles={vehicles}
                onVehicleClick={(v) => router.push(`/map?vehicle=${v.id}`)}
              />
              <div className="absolute top-4 right-4 z-[400] bg-[var(--bg-surface)]/80 backdrop-blur-md border border-[var(--border-default)] rounded-[var(--radius-md)] px-3 py-1.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
                <span className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-widest">Live Updates</span>
              </div>
            </div>
          </Card>

          {/* Recent Alerts */}
          <Card className="border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
            <CardHeader
              title="Recent Anomalies"
              subtitle="Critical and warning alerts from last 24h"
              action={
                <button
                  onClick={() => router.push('/alerts')}
                  className="text-[var(--text-xs)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold uppercase tracking-wider"
                >
                  View All
                </button>
              }
            />
            <AlertsLog
              alerts={alerts.slice(0, 5)}
              onResolve={resolveAlert}
              compact
            />
          </Card>
        </div>

        {/* Right Col: Leaderboard & Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-[var(--space-6)]">
          <Card className="border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
            <CardHeader
              title="Top Drivers"
              subtitle="Safety & efficiency ranking"
              action={
                <button
                  onClick={() => router.push('/drivers')}
                  className="text-[var(--text-xs)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold uppercase tracking-wider"
                >
                  Details
                </button>
              }
            />
            <div className="px-[var(--space-4)] pb-[var(--space-4)]">
              <DriverLeaderboard drivers={drivers.slice(0, 8)} />
            </div>
          </Card>

          <Card className="p-[var(--space-6)] bg-gradient-to-br from-[var(--accent-green-dim)] to-transparent border-[var(--accent-green)]/20 shadow-[var(--shadow-card)]">
             <h3 className="text-[var(--accent-green)] font-extrabold text-[var(--text-xs)] uppercase tracking-[0.1em] mb-[var(--space-2)]">Weekly Insight</h3>
             <p className="text-[var(--text-sm)] text-[var(--text-secondary)] leading-relaxed">
               Fuel siphoning attempts are down <span className="text-[var(--accent-green)] font-bold">12%</span> this week following the implementation of night-movement alerts and driver geofencing.
             </p>
          </Card>
        </div>

      </div>
    </div>
  );
}
