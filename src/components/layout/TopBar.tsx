"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Wifi, WifiOff } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
  isLive?: boolean;
  actions?: React.ReactNode;
}

export function TopBar({ title, subtitle, isLive, actions }: TopBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-fleer-bg/95 backdrop-blur-sm border-b border-fleer-border flex items-center px-6 z-20">
      {/* Page Title */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h1 className="font-display font-bold text-fleer-text text-base">
            {title}
          </h1>
          {subtitle && (
            <span className="text-fleer-text-muted text-sm">{subtitle}</span>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Live Indicator */}
        {isLive !== undefined && (
          <div
            className={`flex items-center gap-1.5 text-xs font-display font-medium px-2.5 py-1 rounded-full border ${
              isLive
                ? "text-fleer-accent bg-fleer-accent/10 border-fleer-accent/20"
                : "text-fleer-text-muted bg-fleer-surface border-fleer-border"
            }`}
          >
            {isLive ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-fleer-accent pulse-green" />
                LIVE
              </>
            ) : (
              <>
                <WifiOff size={11} />
                OFFLINE
              </>
            )}
          </div>
        )}

        {/* Clock */}
        <div className="text-right">
          <p className="font-mono text-sm text-fleer-text tabular-nums">
            {format(time, "HH:mm:ss")}
          </p>
          <p className="text-xs text-fleer-text-muted">
            {format(time, "EEE, MMM d")}
          </p>
        </div>

        {/* Custom Actions */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
