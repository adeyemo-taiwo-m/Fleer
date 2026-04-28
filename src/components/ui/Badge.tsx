import React from 'react';
import { clsx } from 'clsx';
import { VehicleStatus, AlertSeverity } from '../../types';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple';

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-fleer-accent/10 text-fleer-accent border-fleer-accent/20',
  warning: 'bg-fleer-warning/10 text-fleer-warning border-fleer-warning/20',
  danger:  'bg-fleer-danger/10 text-fleer-danger border-fleer-danger/20',
  info:    'bg-fleer-info/10 text-fleer-info border-fleer-info/20',
  neutral: 'bg-fleer-text-dim/20 text-fleer-text-muted border-fleer-border',
  purple:  'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
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
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-display font-bold uppercase tracking-widest leading-none',
      variantStyles[variant],
      className
    )}>
      {dot && (
        <span className={clsx(
          'w-1.5 h-1.5 rounded-full shrink-0',
          variant === 'success' && 'bg-fleer-accent pulse-green',
          variant === 'warning' && 'bg-fleer-warning',
          variant === 'danger'  && 'bg-fleer-danger',
          variant === 'info'    && 'bg-fleer-info',
          variant === 'neutral' && 'bg-fleer-text-muted',
          variant === 'purple'  && 'bg-indigo-400',
        )} />
      )}
      {label}
    </span>
  );
}
