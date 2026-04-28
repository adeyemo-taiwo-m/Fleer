'use client';

import React from 'react';
import { Driver } from '../../types';
import { AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

interface ScoreRingProps { 
  score: number; 
  size?: number; 
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'var(--score-high)';
  if (score >= 60) return 'var(--score-mid)';
  return 'var(--score-low)';
};

function ScoreRing({ score, size = 52 }: ScoreRingProps) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);
  
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle 
          cx={size/2} cy={size/2} r={radius} 
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" 
        />
        <circle
          cx={size/2} cy={size/2} r={radius} 
          fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span 
        className="absolute inset-0 flex items-center justify-center text-[var(--text-lg)] font-extrabold tracking-tighter"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

const scoreBreakdownLabels: Record<keyof Driver['score_breakdown'], string> = {
  unauthorized_stops: 'Unauthorized Stops',
  fuel_anomalies:     'Fuel Anomalies',
  route_compliance:   'Route Compliance',
  idle_time:          'Idle Time',
  speed_compliance:   'Speed Compliance',
};

export function DriverScorecard({ driver, rank }: { driver: Driver; rank?: number }) {
  return (
    <div className="group bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] p-[var(--space-6)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--border-default)] hover:-translate-y-0.5 transition-all duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-[var(--space-4)] mb-[var(--space-5)] relative">
        <div className="relative">
          {rank && (
            <span className="absolute -top-1 -left-1 z-10 bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[10px] font-bold text-[var(--text-muted)] w-5 h-5 rounded-full flex items-center justify-center">
              #{rank}
            </span>
          )}
          <div className="w-[44px] h-[44px] rounded-full bg-[var(--accent-green-dim)] flex items-center justify-center text-[var(--accent-green)] text-[var(--text-base)] font-bold border border-[var(--accent-green)]/10">
            {driver.name.charAt(0)}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[var(--text-base)] font-bold text-[var(--text-primary)] leading-none">{driver.name}</p>
          <p className="text-[var(--text-xs)] text-[var(--text-secondary)] mt-1">{driver.trips_this_week} trips this week</p>
        </div>

        <ScoreRing score={driver.score} />
      </div>

      {/* Metrics */}
      <div className="space-y-[var(--space-2)]">
        {Object.entries(driver.score_breakdown).map(([key, value]) => {
          const color = getScoreColor(value);
          return (
            <div key={key} className="flex items-center gap-[var(--space-3)]">
              <span className="text-[var(--text-xs)] text-[var(--text-secondary)] w-[130px] shrink-0 truncate">
                {scoreBreakdownLabels[key as keyof Driver['score_breakdown']]}
              </span>
              <div className="flex-1 bg-white/[0.08] rounded-full h-1 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${value}%`, backgroundColor: color }}
                />
              </div>
              <span className="text-[var(--text-xs)] text-[var(--text-secondary)] font-mono w-[24px] text-right shrink-0">
                {value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Anomaly Banner */}
      {driver.anomalies_this_week > 0 && (
        <div className="mt-[var(--space-4)] bg-[var(--accent-yellow)]/10 border border-[var(--accent-yellow)]/25 rounded-[var(--radius-md)] p-[var(--space-2)] px-[var(--space-3)] flex items-center gap-[var(--space-2)]">
          <AlertTriangle size={12} className="text-[var(--accent-yellow)]" />
          <p className="text-[var(--text-xs)] text-[var(--accent-yellow)] font-semibold">
            {driver.anomalies_this_week} anomalies detected this week
          </p>
        </div>
      )}
    </div>
  );
}
