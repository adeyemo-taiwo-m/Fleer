"use client";

import React from "react";
import { Driver } from "../../types";
import { SCORE_COLOR } from "../../constants";

interface DriverLeaderboardProps {
  drivers: Driver[];
}

export function DriverLeaderboard({ drivers }: DriverLeaderboardProps) {
  const sorted = [...drivers].sort((a, b) => b.score - a.score);

  if (sorted.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-fleer-text-muted">No driver data yet</p>
      </div>
    );
  }

  return (
    <div>
      {sorted.map((driver, index) => (
        <div
          key={driver.id}
          className="flex items-center gap-3 px-5 py-3 border-b border-fleer-border last:border-0 hover:bg-fleer-surface/50 transition-colors"
        >
          {/* Rank */}
          <span
            className={`text-sm font-display font-bold w-5 text-center ${
              index === 0
                ? "text-yellow-400"
                : index === 1
                ? "text-slate-400"
                : index === 2
                ? "text-amber-600"
                : "text-fleer-text-dim"
            }`}
          >
            {index === 0
              ? "🥇"
              : index === 1
              ? "🥈"
              : index === 2
              ? "🥉"
              : `#${index + 1}`}
          </span>

          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent text-xs font-bold font-display shrink-0">
            {driver.name.charAt(0)}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-display font-medium text-fleer-text truncate">
              {driver.name}
            </p>
            <p className="text-xs text-fleer-text-muted">
              {driver.trips_this_week} trips
            </p>
          </div>

          {/* Score */}
          <div className="text-right">
            <span
              className="text-base font-display font-bold tabular-nums"
              style={{ color: SCORE_COLOR(driver.score) }}
            >
              {driver.score}
            </span>
            <p className="text-xs text-fleer-text-muted">/ 100</p>
          </div>
        </div>
      ))}
    </div>
  );
}
