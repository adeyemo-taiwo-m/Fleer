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
      'flex items-start gap-3 border-b border-[#1E2D42] last:border-0 transition-colors',
      compact ? 'px-4 py-2.5' : 'px-5 py-4',
      alert.resolved && 'opacity-50',
      !alert.resolved && alert.severity === 'critical' && 'bg-red-500/5'
    )}>
      <span className="text-lg shrink-0 mt-0.5">{ANOMALY_ICONS[alert.type] || '⚠️'}</span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm text-[#E2E8F0]">{anomalyLabel[alert.type]}</span>
          {!compact && <AlertBadge severity={alert.severity} />}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-xs text-[#64748B]">{alert.vehicle_plate}</span>
          {alert.driver_name && (
            <><span className="text-[#334155]">·</span><span className="text-xs text-[#64748B]">{alert.driver_name}</span></>
          )}
          <span className="text-[#334155]">·</span>
          <span className="text-xs text-[#64748B]">{formatRelative(alert.timestamp)}</span>
        </div>
        {alert.description && !compact && (
          <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{alert.description}</p>
        )}
      </div>

      <div className="shrink-0 text-right">
        {alert.naira_value && (
          <span className="text-sm font-mono font-medium text-red-400">-{formatNaira(alert.naira_value)}</span>
        )}
        {!alert.resolved && onResolve && (
          <button
            onClick={() => onResolve(alert.id)}
            className="block ml-auto mt-1 p-1 rounded text-[#64748B] hover:text-[#00C896] hover:bg-[#00C896]/10 transition-colors"
            title="Mark as resolved"
          >
            <Check size={13} />
          </button>
        )}
        {alert.resolved && <span className="block text-xs text-[#334155] mt-1">Resolved</span>}
      </div>
    </div>
  );
}

export function AlertsLog({ alerts, compact, onResolve }: AlertsLogProps) {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <span className="text-3xl mb-2">✅</span>
        <p className="text-sm font-medium text-[#E2E8F0]">No alerts</p>
        <p className="text-xs text-[#64748B]">Fleet is running clean</p>
      </div>
    );
  }

  return (
    <div>
      {alerts.map(alert => (
        <AlertRow key={alert.id} alert={alert} compact={compact} onResolve={onResolve} />
      ))}
    </div>
  );
}
