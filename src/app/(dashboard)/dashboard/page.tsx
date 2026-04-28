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
    <div className="space-y-6">
      {/* KPI Bar */}
      <FleetSummaryBar summary={summary} isLoading={vehiclesLoading} />

      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Col: Map & Alerts */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Live Map Preview */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Fleet Live View"
              subtitle="Real-time vehicle positioning"
              action={
                <button
                  onClick={() => router.push('/map')}
                  className="text-xs text-[#00C896] hover:underline font-medium"
                >
                  Open Full Map →
                </button>
              }
            />
            <div className="h-[400px]">
              <FleetMap
                vehicles={vehicles}
                onVehicleClick={(v) => router.push(`/map?vehicle=${v.id}`)}
              />
            </div>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader
              title="Recent Anomalies"
              subtitle="Critical and warning alerts from last 24h"
              action={
                <button
                  onClick={() => router.push('/alerts')}
                  className="text-xs text-[#64748B] hover:text-[#E2E8F0] font-medium"
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
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card>
            <CardHeader
              title="Driver Leaderboard"
              subtitle="Safety & efficiency ranking"
              action={
                <button
                  onClick={() => router.push('/drivers')}
                  className="text-xs text-[#64748B] hover:text-[#E2E8F0] font-medium"
                >
                  Details
                </button>
              }
            />
            <DriverLeaderboard drivers={drivers.slice(0, 8)} />
          </Card>

          <Card className="p-5 bg-gradient-to-br from-[#00C896]/10 to-transparent border-[#00C896]/20">
             <h3 className="text-[#00C896] font-bold text-sm mb-1">Weekly Insight</h3>
             <p className="text-xs text-[#64748B] leading-relaxed">
               Fuel siphoning attempts are down <span className="text-[#00C896] font-bold">12%</span> this week following the implementation of night-movement alerts.
             </p>
          </Card>
        </div>

      </div>
    </div>
  );
}
