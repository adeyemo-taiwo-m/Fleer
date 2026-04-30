"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { FleetSummaryBar } from "@/components/fleet/FleetSummaryBar";
import dynamic from "next/dynamic";
import { AlertsLog } from "@/components/alerts/AlertsLog";
import { DriverLeaderboard } from "@/components/drivers/DriverLeaderboard";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { useVehicles } from "@/hooks/useVehicles";
import { useAlerts } from "@/hooks/useAlerts";
import { useDrivers } from "@/hooks/useDrivers";
import { useOrganization } from "@/hooks/useOrganization";
import { Button } from "@/components/ui/Button";
import { RefreshCw } from "lucide-react";
import { AlertRowSkeleton, Skeleton } from "@/components/ui/Skeleton";

const FleetMap = dynamic(() => import("@/components/map/FleetMap").then(mod => mod.FleetMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] bg-fleer-card animate-pulse rounded-xl border border-fleer-border flex items-center justify-center">
      <p className="text-xs font-display font-bold text-fleer-text-dim uppercase tracking-widest">Initializing Map Engine...</p>
    </div>
  )
});

export default function DashboardPage() {
  const {
    vehicles,
    summary,
    isLoading: vehiclesLoading,
    refetch,
  } = useVehicles();
  const { alerts, unread, isLoading: alertsLoading } = useAlerts();
  const { drivers, isLoading: driversLoading } = useDrivers();
  const { org, user, logout } = useOrganization();

  return (
    <AppShell
      title="Dashboard"
      subtitle={org?.name}
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      unreadAlerts={unread}
      onLogout={logout}
      topBarActions={
        <Button
          variant="ghost"
          size="sm"
          icon={<RefreshCw size={13} />}
          onClick={refetch}
        >
          Refresh
        </Button>
      }
    >
      {/* Summary Metrics Row */}
      <FleetSummaryBar summary={summary} isLoading={vehiclesLoading} />

      {/* Map — Medium Height */}
      <div className="mb-6">
        <FleetMap
          vehicles={vehicles}
          onVehicleClick={() => {}}
          height="380px"
        />
      </div>

      {/* Bottom 2-column Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Live Alerts */}
        <Card>
          <CardHeader
            title="Live Alerts"
            subtitle={alertsLoading ? "Syncing..." : `${unread} unread`}
            action={
              !alertsLoading && unread > 0 && (
                <span className="bg-fleer-danger/10 text-fleer-danger text-xs font-display font-bold px-2 py-0.5 rounded-full border border-fleer-danger/20">
                  {unread} new
                </span>
              )
            }
          />
          <CardBody className="p-0">
            {alertsLoading ? (
              <div className="divide-y divide-fleer-border">
                {Array.from({ length: 5 }).map((_, i) => (
                  <AlertRowSkeleton key={i} />
                ))}
              </div>
            ) : (
              <AlertsLog alerts={alerts.slice(0, 8)} compact />
            )}
          </CardBody>
        </Card>

        {/* Driver Leaderboard */}
        <Card>
          <CardHeader 
            title="Driver Scores" 
            subtitle={driversLoading ? "Calculating..." : "This week"} 
          />
          <CardBody className="p-0">
            {driversLoading ? (
              <div className="p-4 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="flex-1 h-4 rounded" />
                    <Skeleton className="w-12 h-4 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <DriverLeaderboard drivers={drivers.slice(0, 8)} />
            )}
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
