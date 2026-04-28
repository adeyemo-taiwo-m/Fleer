'use client';

import React from 'react';
import { DriverScorecard } from '@/components/drivers/DriverScorecard';
import { useDrivers } from '@/hooks/useDrivers';

export default function DriversPage() {
  const { drivers, isLoading } = useDrivers();
  const sorted = [...drivers].sort((a, b) => b.score - a.score);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Page Header */}
      <header className="flex flex-row justify-between items-center pb-[var(--space-6)] border-b border-[var(--border-subtle)] mb-[var(--space-8)]">
        <div>
          <h1 className="text-[var(--text-2xl)] font-bold text-[var(--text-primary)] tracking-tight">Driver Performance</h1>
          <p className="text-[var(--text-sm)] text-[var(--text-secondary)] mt-1">Monitoring safety scores and efficiency metrics across the fleet</p>
        </div>
        <div className="hidden md:block text-right text-[var(--text-xs)] text-[var(--text-muted)] font-mono">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-[var(--space-6)]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-[var(--bg-card)] rounded-[var(--radius-xl)] animate-pulse border border-[var(--border-subtle)]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-[var(--space-6)] items-start">
          {sorted.map((driver, index) => (
            <DriverScorecard key={driver.id} driver={driver} rank={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
