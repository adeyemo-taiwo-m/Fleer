'use client';

import React from 'react';
import { DriverScorecard } from '@/components/drivers/DriverScorecard';
import { useDrivers } from '@/hooks/useDrivers';

export default function DriversPage() {
  const { drivers, isLoading } = useDrivers();
  const sorted = [...drivers].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#E2E8F0]">Driver Performance</h2>
          <p className="text-sm text-[#64748B]">Monitoring safety scores and efficiency metrics</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-[#1A2235] rounded-xl animate-pulse border border-[#1E2D42]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sorted.map((driver, index) => (
            <DriverScorecard key={driver.id} driver={driver} rank={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
