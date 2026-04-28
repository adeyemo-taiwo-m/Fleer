'use client';

import React from 'react';
import { Truck, AlertTriangle, TrendingDown, MapPin, Fuel } from 'lucide-react';
import { FleetSummary } from '../../types';
import { Stat } from '../ui/Stat';
import { formatNaira, formatKm, formatLitres } from '../../lib/formatters';
import { Card } from '../ui/Card';

interface FleetSummaryBarProps {
  summary: FleetSummary;
  isLoading?: boolean;
}

export function FleetSummaryBar({ summary, isLoading }: FleetSummaryBarProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-5 gap-4 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-[#1A2235] rounded-xl border border-[#1E2D42] h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  const anomalyPercent = summary.total_vehicles > 0
    ? Math.round((summary.vehicles_with_anomaly / summary.total_vehicles) * 100)
    : 0;

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      <Card className="p-4">
        <Stat
          label="Active Vehicles"
          value={summary.active_vehicles}
          subValue={`/ ${summary.total_vehicles}`}
          icon={<Truck size={14} />}
          trend={summary.active_vehicles > 0 ? 'up' : 'neutral'}
          trendLabel={`${summary.vehicles_on_route} on route`}
        />
      </Card>

      <Card className="p-4">
        <Stat
          label="Anomalies Today"
          value={summary.anomalies_today}
          icon={<AlertTriangle size={14} />}
          trend={summary.anomalies_today > 0 ? 'up' : 'neutral'}
          trendLabel={summary.anomalies_today > 0 ? `${anomalyPercent}% of fleet` : 'All clear'}
          trendInverse
        />
      </Card>

      <Card className="p-4" accent>
        <Stat
          label="Savings Today"
          value={formatNaira(summary.estimated_savings_today_naira)}
          icon={<TrendingDown size={14} />}
          trend={summary.estimated_savings_today_naira > 0 ? 'up' : 'neutral'}
          trendLabel={summary.estimated_savings_today_naira > 0 ? 'Leakage prevented' : 'Monitoring...'}
          highlight
        />
      </Card>

      <Card className="p-4">
        <Stat
          label="Distance Today"
          value={formatKm(summary.total_distance_today_km)}
          icon={<MapPin size={14} />}
        />
      </Card>

      <Card className="p-4">
        <Stat
          label="Fuel Used"
          value={formatLitres(summary.total_fuel_today_litres)}
          icon={<Fuel size={14} />}
          trend="neutral"
          trendLabel="vs baseline"
        />
      </Card>
    </div>
  );
}
