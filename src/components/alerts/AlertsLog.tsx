'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Anomaly } from '../../types';
import { AlertBadge } from './AlertBadge';
import { anomalyLabel, formatRelative, formatNaira } from '../../lib/formatters';
import { ANOMALY_ICONS } from '../../constants';
import { clsx } from 'clsx';

interface AlertsLogProps {
  alerts: Anomaly[];
  compact?: boolean;
  onResolve?: (alertId: string) => void;
}

function AlertRow({ alert, compact, onResolve }: {
  alert: Anomaly;
  compact?: boolean;
  onResolve?: (id: string) => void;
}) {
  return (
    <div className={clsx(
      'flex items-start gap-3 border-b border-fleer-border last:border-0 transition-colors',
      compact ? 'px-4 py-2.5' : 'px-5 py-4',
      alert.resolved && 'opacity-50',
      !alert.resolved && alert.severity === 'critical' && 'bg-fleer-danger/5'
    )}>
      <span className="text-lg shrink-0 mt-0.5">{ANOMALY_ICONS[alert.type] || '⚠️'}</span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display font-semibold text-sm text-fleer-text tracking-tight">
            {anomalyLabel[alert.type]}
          </span>
          {!compact && <AlertBadge severity={alert.severity} />}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-[11px] text-fleer-text-muted">{alert.vehicle_plate}</span>
          <span className="text-fleer-text-dim">·</span>
          {alert.driver_name && (
            <>
              <span className="font-display text-[11px] text-fleer-text-muted font-medium uppercase tracking-wider">{alert.driver_name}</span>
              <span className="text-fleer-text-dim">·</span>
            </>
          )}
          <span className="font-display text-[11px] text-fleer-text-muted font-medium uppercase tracking-wider">
            {formatRelative(alert.timestamp)}
          </span>
        </div>
        {alert.description && !compact && (
          <p className="font-body text-xs text-fleer-text-muted mt-2 leading-relaxed line-clamp-2">
            {alert.description}
          </p>
        )}
      </div>

      <div className="shrink-0 text-right">
        {alert.naira_value && (
          <span className="text-sm font-mono font-bold text-fleer-danger tabular-nums">
            -{formatNaira(alert.naira_value)}
          </span>
        )}
        {!alert.resolved && onResolve && (
          <button
            onClick={() => onResolve(alert.id)}
            className="block ml-auto mt-2 p-1 rounded-md text-fleer-text-muted hover:text-fleer-accent hover:bg-fleer-accent/10 transition-all border border-transparent hover:border-fleer-accent/20"
            title="Mark as resolved"
          >
            <Check size={14} />
          </button>
        )}
        {alert.resolved && (
          <span className="block font-display text-[11px] font-bold text-fleer-text-dim uppercase tracking-widest mt-2">
            Resolved
          </span>
        )}
      </div>
    </div>
  );
}

export function AlertsLog({ alerts, compact, onResolve }: AlertsLogProps) {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <div className="w-12 h-12 rounded-full bg-fleer-accent/10 flex items-center justify-center text-2xl mb-4 border border-fleer-accent/10">
          ✅
        </div>
        <p className="font-display font-bold text-sm text-fleer-text uppercase tracking-widest">No Active Alerts</p>
        <p className="font-display text-[11px] text-fleer-text-muted font-medium mt-1 uppercase tracking-wider">Fleet operations are optimized</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {alerts.map(alert => (
        <AlertRow key={alert.id} alert={alert} compact={compact} onResolve={onResolve} />
      ))}
    </div>
  );
}
