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
    ? 'text-[var(--text-muted)]'
    : trendInverse
      ? trend === 'up' ? 'text-[var(--accent-red)]' : 'text-[var(--accent-green)]'
      : trend === 'up' ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]';

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className={clsx(
      'flex flex-col gap-[var(--space-1)]',
      className
    )}>
      <div className="flex items-center gap-[var(--space-2)]">
        {icon && <span className="text-[var(--text-muted)]">{icon}</span>}
        <span className="text-[var(--text-xs)] font-bold text-[var(--text-muted)] uppercase tracking-widest">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-[var(--space-2)]">
        <span className={clsx(
          'font-extrabold tabular-nums tracking-tighter transition-all duration-300',
          highlight ? 'text-[var(--text-2xl)] text-[var(--accent-green)]' : 'text-[var(--text-xl)] text-[var(--text-primary)]'
        )}>
          {value}
        </span>
        {subValue && <span className="text-[var(--text-sm)] text-[var(--text-secondary)]">{subValue}</span>}
      </div>
      {trend && trendLabel && (
        <div className={clsx('flex items-center gap-[var(--space-1)] text-[var(--text-xs)] font-bold', trendColor)}>
          <TrendIcon size={12} />
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
