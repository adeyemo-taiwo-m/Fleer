'use client';

import React from 'react';
import { DriverScorecard } from '@/components/drivers/DriverScorecard';
import { useDrivers } from '@/hooks/useDrivers';
import { TopBar } from '@/components/layout/TopBar';

export default function DriversPage() {
  const { drivers, isLoading } = useDrivers();
  const sorted = [...drivers].sort((a, b) => b.score - a.score);

  return (
    <>
      <TopBar 
        title="Driver Performance" 
        subtitle="Safety & Efficiency Metrics" 
        isLive={true} 
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-fleer-card rounded-xl animate-pulse border border-fleer-border" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
            {sorted.map((driver, index) => (
              <DriverScorecard key={driver.id} driver={driver} rank={index + 1} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
