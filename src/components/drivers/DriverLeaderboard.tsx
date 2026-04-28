import React from 'react';
import { Driver } from '../../types';
import { SCORE_COLOR } from '../../constants';

export function DriverLeaderboard({ drivers }: { drivers: Driver[] }) {
  const sorted = [...drivers].sort((a, b) => b.score - a.score);

  if (sorted.length === 0) {
    return <div className="py-12 text-center"><p className="text-sm text-[#64748B]">No driver data yet</p></div>;
  }

  return (
    <div>
      {sorted.map((driver, index) => (
        <div key={driver.id} className="flex items-center gap-3 px-5 py-3 border-b border-[#1E2D42] last:border-0 hover:bg-[#111827]/50 transition-colors">
          <span className={`text-sm font-bold w-5 text-center ${
            index === 0 ? 'text-yellow-400' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-600' : 'text-[#334155]'
          }`}>
            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
          </span>
          <div className="w-7 h-7 rounded-full bg-[#00C896]/10 flex items-center justify-center text-[#00C896] text-xs font-bold shrink-0">
            {driver.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#E2E8F0] truncate">{driver.name}</p>
            <p className="text-xs text-[#64748B]">{driver.trips_this_week} trips</p>
          </div>
          <div className="text-right">
            <span className="text-base font-bold tabular-nums" style={{ color: SCORE_COLOR(driver.score) }}>
              {driver.score}
            </span>
            <p className="text-xs text-[#64748B]">/ 100</p>
          </div>
        </div>
      ))}
    </div>
  );
}
