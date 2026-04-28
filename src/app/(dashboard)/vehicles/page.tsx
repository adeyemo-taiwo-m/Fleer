'use client';

import React, { useState } from 'react';
import { VehicleCard } from '@/components/fleet/VehicleCard';
import { useVehicles } from '@/hooks/useVehicles';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { VehicleStatus } from '@/types';
import { Truck, Search } from 'lucide-react';
import { clsx } from 'clsx';

type StatusFilter = VehicleStatus | 'all';

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'on_route', label: 'On Route' },
  { value: 'anomaly',  label: 'Anomaly' },
  { value: 'alert',    label: 'Alert' },
  { value: 'idle',     label: 'Idle' },
  { value: 'offline',  label: 'Offline' },
];

export default function VehiclesPage() {
  const { vehicles, isLoading } = useVehicles();
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');

  const filtered = vehicles.filter(v => {
    const matchesFilter = filter === 'all' || v.status === filter;
    const matchesSearch = v.plate.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#E2E8F0]">Fleet Inventory</h2>
          <p className="text-sm text-[#64748B]">{vehicles.length} vehicles registered</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search plate..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-[#111827] border border-[#1E2D42] rounded-lg pl-9 pr-4 py-2 text-sm text-[#E2E8F0] placeholder:text-[#64748B] focus:outline-none focus:border-[#00C896]/50 w-48 transition-all"
            />
          </div>
          <div className="flex items-center gap-1 bg-[#111827] border border-[#1E2D42] rounded-xl p-1">
            {statusFilters.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
                  filter === f.value
                    ? 'bg-[#1A2235] text-[#E2E8F0]'
                    : 'text-[#64748B] hover:text-[#E2E8F0]'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex items-center justify-center">
          <LoadingSpinner label="Retrieving fleet data..." />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 bg-[#111827]/30 border border-dashed border-[#1E2D42] rounded-2xl">
          <EmptyState
            icon={<Truck className="text-[#64748B]" />}
            title="No vehicles found"
            description={search ? `No vehicles match "${search}"` : 'No vehicles in this category'}
            action={search ? { label: 'Clear search', onClick: () => setSearch('') } : undefined}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}
