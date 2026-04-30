"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AlertsLog } from "@/components/alerts/AlertsLog";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { useAlerts } from "@/hooks/useAlerts";
import { useOrganization } from "@/hooks/useOrganization";
import { AlertSeverity } from "@/types";
import { AlertRowSkeleton } from "@/components/ui/Skeleton";

type FilterTab = "all" | "unresolved" | AlertSeverity;

const tabs: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All Alerts" },
  { value: "unresolved", label: "Unresolved" },
  { value: "critical", label: "Critical" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" },
];

export default function AlertsPage() {
  const { alerts, unread, isLoading, resolveAlert } = useAlerts();
  const { org, user, logout } = useOrganization();
  const [activeTab, setActiveTab] = useState<FilterTab>("unresolved");

  const filtered = alerts.filter((alert) => {
    if (activeTab === "all") return true;
    if (activeTab === "unresolved") return !alert.resolved;
    return alert.severity === activeTab;
  });

  return (
    <AppShell
      title="Alerts"
      subtitle={`${unread} unresolved`}
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      unreadAlerts={unread}
      onLogout={logout}
    >
      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-fleer-surface border border-fleer-border rounded-xl p-1 mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-display font-medium transition-all duration-150 ${
              activeTab === tab.value
                ? "bg-fleer-card text-fleer-text shadow-sm"
                : "text-fleer-text-muted hover:text-fleer-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader
          title="Anomaly Alerts"
          subtitle={isLoading ? "Syncing with fleet telemetry..." : `${filtered.length} ${
            activeTab === "unresolved" ? "unresolved" : "total"
          }`}
        />
        <CardBody className="p-0">
          {isLoading ? (
            <div className="divide-y divide-fleer-border">
              {Array.from({ length: 6 }).map((_, i) => (
                <AlertRowSkeleton key={i} />
              ))}
            </div>
          ) : (
            <AlertsLog alerts={filtered} onResolve={resolveAlert} />
          )}
        </CardBody>
      </Card>
    </AppShell>
  );
}
