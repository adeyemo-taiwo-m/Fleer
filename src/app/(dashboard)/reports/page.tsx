"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { SavingsChart } from "@/components/reports/SavingsChart";
import { FuelReconciliation } from "@/components/reports/FuelReconciliation";
import { Stat } from "@/components/ui/Stat";
import { Button } from "@/components/ui/Button";
import { useOrganization } from "@/hooks/useOrganization";
import { Download, TrendingDown, Fuel, AlertTriangle } from "lucide-react";
import { formatNaira } from "@/lib/formatters";

// MOCK DATA — replace with real Supabase query
const mockChartData = Array.from({ length: 14 }, (_, i) => ({
  date: new Date(Date.now() - (13 - i) * 86400000).toISOString().split("T")[0],
  savings: Math.random() * 400000 + 100000,
  fuel_bought: Math.random() * 500 + 200,
  fuel_used: Math.random() * 400 + 150,
}));

const mockReconciliation = [
  {
    vehicle_plate: "LND-341-GF",
    driver_name: "Emeka Obi",
    fuel_bought_litres: 340,
    fuel_used_litres: 298,
    variance_litres: -42,
    variance_naira: -67200,
    anomaly_count: 3,
  },
  {
    vehicle_plate: "LND-882-KA",
    driver_name: "Tunde Fashola",
    fuel_bought_litres: 280,
    fuel_used_litres: 271,
    variance_litres: -9,
    variance_naira: -14400,
    anomaly_count: 1,
  },
  {
    vehicle_plate: "LND-119-BB",
    driver_name: "Chidi Okeke",
    fuel_bought_litres: 420,
    fuel_used_litres: 418,
    variance_litres: -2,
    variance_naira: -3200,
    anomaly_count: 0,
  },
];

export default function ReportsPage() {
  const { org, user, logout } = useOrganization();
  const [downloading, setDownloading] = useState(false);

  const totalSavings = mockChartData.reduce((s, d) => s + d.savings, 0);
  const totalVarianceNaira = mockReconciliation.reduce(
    (s, r) => s + r.variance_naira,
    0,
  );

  const handleDownloadPDF = async () => {
    setDownloading(true);
    // TODO: Call backend endpoint to generate Puppeteer PDF
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <AppShell
      title="Financial Reports"
      subtitle="Fuel spend & savings analysis"
      isLive={true}
      orgName={org?.name || ""}
      userEmail={user?.email || ""}
      onLogout={logout}
      topBarActions={
        <Button
          variant="primary"
          size="sm"
          icon={<Download size={13} />}
          loading={downloading}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
      }
    >
      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
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

      {/* Savings Trend Chart */}
      <Card className="mb-6">
        <CardHeader
          title="Savings Trend"
          subtitle="Daily estimated savings from anomaly detection"
        />
        <CardBody>
          <SavingsChart data={mockChartData} />
        </CardBody>
      </Card>

      {/* Fuel Reconciliation Table */}
      <Card>
        <CardHeader
          title="Fuel Reconciliation"
          subtitle="Fuel bought vs actual consumption — variance is your exposure"
        />
        <FuelReconciliation rows={mockReconciliation} period="Last 14 Days" />
      </Card>
    </AppShell>
  );
}
