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
    ? 'text-[#64748B]'
    : trendInverse
      ? trend === 'up' ? 'text-red-400' : 'text-[#00C896]'
      : trend === 'up' ? 'text-[#00C896]' : 'text-red-400';

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className={clsx(
      'flex flex-col gap-1',
      highlight && 'bg-[#00C896]/5 rounded-xl p-4 border border-[#00C896]/20',
      className
    )}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-[#64748B]">{icon}</span>}
        <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={clsx(
          'font-bold tabular-nums',
          highlight ? 'text-3xl text-[#00C896]' : 'text-2xl text-[#E2E8F0]'
        )}>
          {value}
        </span>
        {subValue && <span className="text-sm text-[#64748B]">{subValue}</span>}
      </div>
      {trend && trendLabel && (
        <div className={clsx('flex items-center gap-1 text-xs', trendColor)}>
          <TrendIcon size={12} />
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
