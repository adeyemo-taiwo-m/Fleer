"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { VehicleCard } from "@/components/fleet/VehicleCard";
import { useVehicles } from "@/hooks/useVehicles";
import { useOrganization } from "@/hooks/useOrganization";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { VehicleStatus } from "@/types";
import { Truck } from "lucide-react";

type StatusFilter = VehicleStatus | "all";

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "on_route", label: "On Route" },
  { value: "anomaly", label: "Anomaly" },
  { value: "alert", label: "Alert" },
  { value: "idle", label: "Idle" },
  { value: "offline", label: "Offline" },
];

export default function VehiclesPage() {
  const { vehicles, isLoading } = useVehicles();
  const { org, user, logout } = useOrganization();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = vehicles.filter((v) => {
    const matchesFilter = filter === "all" || v.status === filter;
    const matchesSearch = v.plate.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <AppShell
      title="Vehicles"
      subtitle={`${vehicles.length} in fleet`}
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      onLogout={logout}
    >
      {/* Search + Filter */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by plate number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-fleer-surface border border-fleer-border rounded-lg px-4 py-2 text-sm text-fleer-text placeholder:text-fleer-text-muted focus:outline-none focus:border-fleer-accent/50 w-64 font-display"
        />
        <div className="flex items-center gap-1 bg-fleer-surface border border-fleer-border rounded-xl p-1">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-medium transition-all ${
                filter === f.value
                  ? "bg-fleer-card text-fleer-text shadow-sm"
                  : "text-fleer-text-muted hover:text-fleer-text"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <LoadingSpinner label="Loading vehicles..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Truck className="text-fleer-text-dim" size={40} />}
          title="No vehicles found"
          description={
            search
              ? `No vehicles match "${search}"`
              : "No vehicles in this category"
          }
          action={
            search
              ? { label: "Clear search", onClick: () => setSearch("") }
              : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
