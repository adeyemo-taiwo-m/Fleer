"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { FleetSummaryBar } from "@/components/fleet/FleetSummaryBar";
import { FleetMap } from "@/components/map/FleetMap";
import { AlertsLog } from "@/components/alerts/AlertsLog";
import { DriverLeaderboard } from "@/components/drivers/DriverLeaderboard";
import { Card, CardHeader } from "@/components/ui/Card";
import { useVehicles } from "@/hooks/useVehicles";
import { useAlerts } from "@/hooks/useAlerts";
import { useDrivers } from "@/hooks/useDrivers";
import { useOrganization } from "@/hooks/useOrganization";
import { Button } from "@/components/ui/Button";
import { RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const {
    vehicles,
    summary,
    isLoading: vehiclesLoading,
    refetch,
  } = useVehicles();
  const { alerts, unread } = useAlerts();
  const { drivers } = useDrivers();
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
            subtitle={`${unread} unread`}
            action={
              unread > 0 && (
                <span className="bg-fleer-danger/10 text-fleer-danger text-xs font-display font-bold px-2 py-0.5 rounded-full border border-fleer-danger/20">
                  {unread} new
                </span>
              )
            }
          />
          <AlertsLog alerts={alerts.slice(0, 8)} compact />
        </Card>

        {/* Driver Leaderboard */}
        <Card>
          <CardHeader title="Driver Scores" subtitle="This week" />
          <DriverLeaderboard drivers={drivers.slice(0, 8)} />
        </Card>
      </div>
    </AppShell>
  );
}
