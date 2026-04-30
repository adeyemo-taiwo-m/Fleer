"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DriverScorecard } from "@/components/drivers/DriverScorecard";
import { useDrivers } from "@/hooks/useDrivers";
import { useOrganization } from "@/hooks/useOrganization";

export default function DriversPage() {
  const { drivers, isLoading } = useDrivers();
  const { org, user, logout } = useOrganization();
  const sorted = [...drivers].sort((a, b) => b.score - a.score);

  return (
    <AppShell
      title="Driver Scorecards"
      subtitle={`${drivers.length} drivers tracked`}
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      onLogout={logout}
    >
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-fleer-card rounded-xl animate-pulse border border-fleer-border"
              />
            ))
          : sorted.map((driver, index) => (
              <DriverScorecard
                key={driver.id}
                driver={driver}
                rank={index + 1}
              />
            ))}
      </div>
    </AppShell>
  );
}
