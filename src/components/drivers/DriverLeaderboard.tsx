import React from 'react';
import { Driver } from '../../types';
import { SCORE_COLOR } from '../../constants';

export function DriverLeaderboard({ drivers }: { drivers: Driver[] }) {
  const sorted = [...drivers].sort((a, b) => b.score - a.score);

  if (sorted.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="font-display text-sm text-fleer-text-muted font-medium uppercase tracking-widest">No driver performance data</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {sorted.map((driver, index) => (
        <div key={driver.id} className="flex items-center gap-3 px-5 py-3 border-b border-fleer-border last:border-0 hover:bg-fleer-surface/50 transition-colors">
          {/* Rank */}
          <span className={`text-sm font-display font-bold w-6 text-center ${
            index === 0 ? 'text-yellow-400' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-600' : 'text-fleer-text-dim'
          }`}>
            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
          </span>
          
          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent text-xs font-bold font-display shrink-0 border border-fleer-accent/10">
            {driver.name.charAt(0)}
          </div>
          
          {/* Driver Info */}
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-semibold text-fleer-text truncate tracking-tight">{driver.name}</p>
            <p className="font-display text-[11px] text-fleer-text-muted font-medium uppercase tracking-wider">{driver.trips_this_week} trips this week</p>
          </div>
          
          {/* Score */}
          <div className="text-right">
            <span className="font-display text-base font-bold tabular-nums tracking-tighter" style={{ color: SCORE_COLOR(driver.score) }}>
              {driver.score}
            </span>
            <p className="font-display text-[10px] text-fleer-text-muted font-bold uppercase tracking-widest leading-none">/ 100</p>
          </div>
        </div>
      ))}
    </div>
  );
}
