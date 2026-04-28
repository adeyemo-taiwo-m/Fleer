import React from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  trendInverse?: boolean;
  icon?: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

export function Stat({
  label, value, subValue, trend, trendLabel, trendInverse, icon, highlight, className,
}: StatProps) {
  const trendColor = trend === 'neutral'
    ? 'text-fleer-text-muted'
    : trendInverse
      ? trend === 'up' ? 'text-fleer-danger' : 'text-fleer-accent'
      : trend === 'up' ? 'text-fleer-accent' : 'text-fleer-danger';

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className={clsx(
      'flex flex-col gap-1',
      highlight && 'bg-fleer-accent/5 -m-4 p-4 border-l-2 border-l-fleer-accent',
      className
    )}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-fleer-text-muted shrink-0">{icon}</span>}
        <span className="text-[11px] font-display font-bold text-fleer-text-muted uppercase tracking-widest">
          {label}
        </span>
      </div>
      
      <div className="flex items-baseline gap-2 mt-0.5">
        <span className={clsx(
          'font-display font-bold tabular-nums tracking-tighter',
          highlight ? 'text-3xl text-fleer-accent' : 'text-2xl text-fleer-text'
        )}>
          {value}
        </span>
        {subValue && (
          <span className="text-xs font-display font-medium text-fleer-text-muted">
            {subValue}
          </span>
        )}
      </div>

      {trend && trendLabel && (
        <div className={clsx('flex items-center gap-1 text-[11px] font-display font-bold uppercase tracking-wider mt-1', trendColor)}>
          <TrendIcon size={12} />
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
