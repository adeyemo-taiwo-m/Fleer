'use client';

import React from 'react';
import { Driver } from '../../types';
import { SCORE_COLOR } from '../../constants';
import { Card } from '../ui/Card';

interface ScoreRingProps { score: number; size?: number; }

function ScoreRing({ score, size = 64 }: ScoreRingProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = SCORE_COLOR(score);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#1E2D42" strokeWidth={4} />
      <circle
        cx={size/2} cy={size/2} r={radius} fill="none"
        stroke={color} strokeWidth={4}
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize="14" fontWeight="700" fontFamily="'Space Grotesk', sans-serif"
        style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%' }}
      >
        {score}
      </text>
    </svg>
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
    <Card className="p-5">
      <div className="flex items-center gap-4 mb-4">
        {rank && (
          <span className="text-lg font-bold text-[#334155] w-6 text-center">#{rank}</span>
        )}
        <div className="w-10 h-10 rounded-full bg-[#00C896]/10 flex items-center justify-center text-[#00C896] font-bold">
          {driver.name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-[#E2E8F0]">{driver.name}</p>
          <p className="text-xs text-[#64748B]">{driver.trips_this_week} trips this week</p>
        </div>
        <ScoreRing score={driver.score} />
      </div>

      <div className="space-y-2">
        {Object.entries(driver.score_breakdown).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-xs text-[#64748B] w-36 shrink-0">
              {scoreBreakdownLabels[key as keyof Driver['score_breakdown']]}
            </span>
            <div className="flex-1 bg-[#111827] rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${value}%`, background: SCORE_COLOR(value) }}
              />
            </div>
            <span className="text-xs font-mono text-[#64748B] w-8 text-right">{value}</span>
          </div>
        ))}
      </div>

      {driver.anomalies_this_week > 0 && (
        <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
          <p className="text-xs text-amber-400">⚠️ {driver.anomalies_this_week} anomalies this week</p>
        </div>
      )}
    </Card>
  );
}
