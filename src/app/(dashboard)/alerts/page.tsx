'use client';

import React, { useState } from 'react';
import { AlertsLog } from '@/components/alerts/AlertsLog';
import { Card, CardHeader } from '@/components/ui/Card';
import { useAlerts } from '@/hooks/useAlerts';
import { AlertSeverity } from '@/types';
import { clsx } from 'clsx';

type FilterTab = 'all' | 'unresolved' | AlertSeverity;

const tabs: { value: FilterTab; label: string }[] = [
  { value: 'all',        label: 'All Alerts' },
  { value: 'unresolved', label: 'Unresolved' },
  { value: 'critical',   label: 'Critical' },
  { value: 'warning',    label: 'Warning' },
  { value: 'info',       label: 'Info' },
];

export default function AlertsPage() {
  const { alerts, unread, resolveAlert } = useAlerts();
  const [activeTab, setActiveTab] = useState<FilterTab>('unresolved');

  const filtered = alerts.filter(alert => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unresolved') return !alert.resolved;
    return alert.severity === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#E2E8F0]">Anomaly Alerts</h2>
          <p className="text-sm text-[#64748B]">{unread} unresolved alerts requiring attention</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-[#111827] border border-[#1E2D42] rounded-xl p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={clsx(
              'px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
              activeTab === tab.value
                ? 'bg-[#1A2235] text-[#E2E8F0] shadow-sm'
                : 'text-[#64748B] hover:text-[#E2E8F0]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader
          title="Incident Log"
          subtitle={`${filtered.length} items found`}
        />
        <AlertsLog alerts={filtered} onResolve={resolveAlert} />
      </Card>
    </div>
  );
}
