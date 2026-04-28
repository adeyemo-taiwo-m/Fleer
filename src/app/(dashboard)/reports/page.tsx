'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { SavingsChart } from '@/components/reports/SavingsChart';
import { FuelReconciliation } from '@/components/reports/FuelReconciliation';
import { Stat } from '@/components/ui/Stat';
import { Button } from '@/components/ui/Button';
import { Download, TrendingDown, Fuel, AlertTriangle } from 'lucide-react';
import { formatNaira } from '@/lib/formatters';

// MOCK DATA
const mockChartData = Array.from({ length: 14 }, (_, i) => ({
  date: new Date(Date.now() - (13 - i) * 86400000).toISOString().split('T')[0],
  savings: Math.random() * 400000 + 100000,
  fuel_bought: Math.random() * 500 + 200,
  fuel_used: Math.random() * 400 + 150,
}));

const mockReconciliation = [
  { vehicle_plate: 'LND-341-GF', driver_name: 'Emeka Obi',     fuel_bought_litres: 340, fuel_used_litres: 298, variance_litres: -42, variance_naira: -67200, anomaly_count: 3 },
  { vehicle_plate: 'LND-882-KA', driver_name: 'Tunde Fashola', fuel_bought_litres: 280, fuel_used_litres: 271, variance_litres: -9,  variance_naira: -14400, anomaly_count: 1 },
  { vehicle_plate: 'LND-119-BB', driver_name: 'Chidi Okeke',   fuel_bought_litres: 420, fuel_used_litres: 418, variance_litres: -2,  variance_naira: -3200,  anomaly_count: 0 },
  { vehicle_plate: 'LND-557-JA', driver_name: 'Amaka Nwosu',   fuel_bought_litres: 310, fuel_used_litres: 308, variance_litres: -2,  variance_naira: -3200,  anomaly_count: 0 },
  { vehicle_plate: 'LND-773-XY', driver_name: 'Bola Adeyemi',  fuel_bought_litres: 290, fuel_used_litres: 245, variance_litres: -45, variance_naira: -72000, anomaly_count: 4 },
];

export default function ReportsPage() {
  const [downloading, setDownloading] = useState(false);

  const totalSavings = mockChartData.reduce((s, d) => s + d.savings, 0);
  const totalVarianceNaira = mockReconciliation.reduce((s, r) => s + r.variance_naira, 0);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#E2E8F0]">Financial Reports</h2>
          <p className="text-sm text-[#64748B]">Fuel spend, variance analysis and savings metrics</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Download size={13} />}
          loading={downloading}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5" accent>
          <Stat
            label="Total Savings (14 days)"
            value={formatNaira(totalSavings)}
            icon={<TrendingDown size={14} />}
            trend="up"
            trendLabel="Leakage prevented"
            highlight
          />
        </Card>
        <Card className="p-5">
          <Stat
            label="Unaccounted Fuel Value"
            value={formatNaira(Math.abs(totalVarianceNaira))}
            icon={<Fuel size={14} />}
            trend="down"
            trendLabel="Fuel variance this period"
            trendInverse
          />
        </Card>
        <Card className="p-5">
          <Stat
            label="Anomalies Detected"
            value={mockReconciliation.reduce((s, r) => s + r.anomaly_count, 0)}
            icon={<AlertTriangle size={14} />}
            trend="neutral"
            trendLabel="This period"
          />
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Savings Trend Chart */}
        <div className="col-span-12 lg:col-span-5">
          <Card className="h-full">
            <CardHeader
              title="Savings Trend"
              subtitle="Daily prevented leakage value"
            />
            <CardBody>
              <SavingsChart data={mockChartData} />
            </CardBody>
          </Card>
        </div>

        {/* Fuel Reconciliation Table */}
        <div className="col-span-12 lg:col-span-7">
          <Card className="h-full overflow-hidden">
            <CardHeader
              title="Fuel Reconciliation"
              subtitle="Bought vs actual consumption variance"
            />
            <FuelReconciliation
              rows={mockReconciliation}
              period="Last 14 Days"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
