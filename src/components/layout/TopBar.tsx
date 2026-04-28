'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { WifiOff } from 'lucide-react';
import { clsx } from 'clsx';

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
    <header className="fixed top-0 left-60 right-0 h-14 bg-fleer-bg/95 backdrop-blur-md border-b border-fleer-border flex items-center px-6 z-20">

      {/* Page Title */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h1 className="font-display font-bold text-base text-fleer-text tracking-tight">{title}</h1>
          {subtitle && (
            <span className="font-display text-xs text-fleer-text-muted uppercase tracking-wider font-medium">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Live Indicator */}
        {isLive !== undefined && (
          <div className={clsx(
            'flex items-center gap-1.5 text-[11px] font-display font-bold px-2.5 py-1 rounded-full border tracking-widest',
            isLive
              ? 'text-fleer-accent bg-fleer-accent/10 border-fleer-accent/20'
              : 'text-fleer-text-muted bg-fleer-surface border-fleer-border'
          )}>
            {isLive ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-fleer-accent pulse-green" />
                LIVE
              </>
            ) : (
              <>
                <WifiOff size={11} className="text-fleer-text-dim" />
                OFFLINE
              </>
            )}
          </div>
        )}

        {/* Clock */}
        <div className="text-right hidden sm:block border-l border-fleer-border pl-6">
          <p className="font-mono text-sm text-fleer-text font-medium tabular-nums tracking-tighter">
            {format(time, 'HH:mm:ss')}
          </p>
          <p className="font-display text-[11px] text-fleer-text-muted font-medium uppercase tracking-widest mt-0.5">
            {format(time, 'EEE, MMM d')}
          </p>
        </div>

        {/* Custom Actions */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
