'use client';

import React from 'react';
import { Driver } from '../../types';
import { AlertTriangle } from 'lucide-react';
import { SCORE_COLOR } from '../../constants';

interface ScoreRingProps { 
  score: number; 
  size?: number; 
}

function ScoreRing({ score, size = 64 }: ScoreRingProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = SCORE_COLOR(score);

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle 
          cx={size/2} cy={size/2} r={radius} 
          fill="none" stroke="#1E2D42" strokeWidth="4" 
        />
        {/* Progress */}
        <circle
          cx={size/2} cy={size/2} r={radius} 
          fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Score text — counter-rotate to stay upright */}
      <span 
        className="absolute inset-0 flex items-center justify-center font-display font-bold text-sm tracking-tighter"
        style={{ color, transform: 'rotate(0deg)' }}
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
    <div className="group bg-fleer-card border border-fleer-border rounded-xl p-5 shadow-card hover:border-fleer-accent/50 hover:shadow-card-hover hover:-translate-y-[2px] transition-all duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative">
          {rank && (
            <span className="absolute -top-1 -left-1 z-10 bg-fleer-surface border border-fleer-border text-[10px] font-display font-bold text-fleer-text-dim w-5 h-5 rounded-full flex items-center justify-center">
              #{rank}
            </span>
          )}
          <div className="w-10 h-10 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent text-sm font-display font-bold border border-fleer-accent/20">
            {driver.name.charAt(0)}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-fleer-text text-sm leading-none tracking-tight">{driver.name}</p>
          <p className="font-display text-[11px] text-fleer-text-muted mt-1.5 font-medium uppercase tracking-wider">{driver.trips_this_week} trips this week</p>
        </div>

        <ScoreRing score={driver.score} size={52} />
      </div>

      {/* Metrics */}
      <div className="space-y-2">
        {Object.entries(driver.score_breakdown).map(([key, value]) => {
          const color = SCORE_COLOR(value);
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="font-display text-[11px] font-bold text-fleer-text-muted w-[130px] shrink-0 truncate uppercase tracking-widest">
                {scoreBreakdownLabels[key as keyof Driver['score_breakdown']]}
              </span>
              <div className="flex-1 bg-fleer-surface rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${value}%`, backgroundColor: color }}
                />
              </div>
              <span className="font-mono text-[11px] text-fleer-text-muted w-6 text-right shrink-0 tabular-nums">
                {value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Anomaly Banner */}
      {driver.anomalies_this_week > 0 && (
        <div className="mt-4 bg-fleer-warning/10 border border-fleer-warning/20 rounded-lg px-3 py-2 flex items-center gap-2">
          <AlertTriangle size={12} className="text-fleer-warning" />
          <p className="font-display text-[11px] text-fleer-warning font-bold uppercase tracking-wider">
            {driver.anomalies_this_week} anomalies this week
          </p>
        </div>
      )}
    </div>
  );
}
