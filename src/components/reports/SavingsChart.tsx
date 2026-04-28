'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatNaira } from '../../lib/formatters';
import { format, parseISO } from 'date-fns';

interface SavingsDataPoint {
  date: string;
  savings: number;
  fuel_bought: number;
  fuel_used: number;
}

interface SavingsChartProps {
  data: SavingsDataPoint[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A2235] border border-[#1E2D42] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-[#64748B] mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-[#64748B] capitalize">{entry.name}:</span>
          <span className="font-semibold text-[#E2E8F0]">
            {entry.name === 'savings' ? formatNaira(entry.value) : `${entry.value.toFixed(0)}L`}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SavingsChart({ data }: SavingsChartProps) {
  const formatted = data.map(d => ({
    ...d,
    label: format(parseISO(d.date), 'MMM d'),
  }));

  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formatted} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C896" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00C896" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2D42" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => formatNaira(v)}
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="savings"
            name="savings"
            stroke="#00C896"
            strokeWidth={2}
            fill="url(#savingsGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
