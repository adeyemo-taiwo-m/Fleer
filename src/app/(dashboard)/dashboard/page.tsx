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
import { TopBar } from '@/components/layout/TopBar';

export default function DashboardPage() {
  const { summary, vehicles, isLoading: vehiclesLoading } = useVehicles();
  const { alerts, resolveAlert } = useAlerts();
  const { drivers } = useDrivers();
  const router = useRouter();

  return (
    <>
      <TopBar 
        title="Fleet Intelligence" 
        subtitle="Operations Overview" 
        isLive={true} 
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
        
        {/* KPI Bar */}
        <FleetSummaryBar summary={summary} isLoading={vehiclesLoading} />

        {/* Map Preview */}
        <Card className="overflow-hidden">
          <CardHeader
            title="Live Fleet View"
            subtitle="Real-time vehicle telemetry"
            action={
              <button
                onClick={() => router.push('/map')}
                className="font-display text-[11px] font-bold text-fleer-accent hover:underline uppercase tracking-widest"
              >
                Full Map →
              </button>
            }
          />
          <div className="h-[380px] relative">
            <FleetMap
              vehicles={vehicles}
              onVehicleClick={(v) => router.push(`/map?vehicle=${v.id}`)}
            />
            <div className="absolute top-4 right-4 z-[400] bg-fleer-surface/80 backdrop-blur-md border border-fleer-border rounded-lg px-3 py-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-fleer-accent pulse-green" />
              <span className="font-display text-[10px] font-bold text-fleer-text uppercase tracking-widest">Tracking Live</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-12 gap-6">
          
          {/* Recent Alerts */}
          <div className="col-span-12 lg:col-span-7">
            <Card className="h-full">
              <CardHeader
                title="Recent Anomalies"
                subtitle="Last 24 hours of operation"
                action={
                  <button
                    onClick={() => router.push('/alerts')}
                    className="font-display text-[11px] font-bold text-fleer-text-muted hover:text-fleer-text uppercase tracking-widest"
                  >
                    View All
                  </button>
                }
              />
              <AlertsLog
                alerts={alerts.slice(0, 6)}
                onResolve={resolveAlert}
                compact
              />
            </Card>
          </div>

          {/* Leaderboard */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <Card className="flex-1">
              <CardHeader
                title="Top Performing Drivers"
                subtitle="Safety & Efficiency Ranking"
                action={
                  <button
                    onClick={() => router.push('/drivers')}
                    className="font-display text-[11px] font-bold text-fleer-text-muted hover:text-fleer-text uppercase tracking-widest"
                  >
                    Details
                  </button>
                }
              />
              <div className="pb-2">
                <DriverLeaderboard drivers={drivers.slice(0, 6)} />
              </div>
            </Card>

            <Card className="p-5 border-l-2 border-l-fleer-accent bg-fleer-accent/5">
               <h3 className="font-display font-bold text-[11px] text-fleer-accent uppercase tracking-widest mb-2">Operations Insight</h3>
               <p className="font-body text-sm text-fleer-text-muted leading-relaxed">
                 Fuel siphoning attempts are down <span className="text-fleer-accent font-bold">12%</span> this week following the implementation of night-movement alerts.
               </p>
            </Card>
          </div>

        </div>
      </div>
    </>
  );
}
