import React from 'react';
import { clsx } from 'clsx';
import { VehicleStatus, AlertSeverity } from '../../types';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple';

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  danger:  'bg-red-500/10 text-red-400 border border-red-500/20',
  info:    'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  neutral: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  purple:  'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
};

export const vehicleStatusVariant: Record<VehicleStatus, BadgeVariant> = {
  on_route: 'success',
  anomaly:  'warning',
  alert:    'danger',
  idle:     'purple',
  offline:  'neutral',
};

export const severityVariant: Record<AlertSeverity, BadgeVariant> = {
  critical: 'danger',
  warning:  'warning',
  info:     'info',
};

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
  dot?: boolean;
  className?: string;
}

export function Badge({ label, variant, dot, className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium',
      variantStyles[variant],
      className
    )}>
      {dot && (
        <span className={clsx(
          'w-1.5 h-1.5 rounded-full',
          variant === 'success' && 'bg-emerald-400 animate-pulse',
          variant === 'warning' && 'bg-amber-400',
          variant === 'danger'  && 'bg-red-400',
          variant === 'info'    && 'bg-blue-400',
          variant === 'neutral' && 'bg-slate-400',
          variant === 'purple'  && 'bg-indigo-400',
        )} />
      )}
      {label}
    </span>
  );
}
