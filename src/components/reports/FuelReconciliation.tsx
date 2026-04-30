"use client";

import React from "react";
import { formatNaira, formatLitres } from "../../lib/formatters";
import { clsx } from "clsx";

interface ReconciliationRow {
  vehicle_plate: string;
  driver_name: string;
  fuel_bought_litres: number;
  fuel_used_litres: number;
  variance_litres: number;
  variance_naira: number;
  anomaly_count: number;
}

interface FuelReconciliationProps {
  rows: ReconciliationRow[];
  period: string;
}

export function FuelReconciliation({ rows, period }: FuelReconciliationProps) {
  const sorted = [...rows].sort(
    (a, b) => Math.abs(b.variance_naira) - Math.abs(a.variance_naira),
  );
  const totalVarianceNaira = rows.reduce((s, r) => s + r.variance_naira, 0);
  const totalVarianceLitres = rows.reduce((s, r) => s + r.variance_litres, 0);

  return (
    <div>
      {/* Period header */}
      <div className="flex items-center justify-between px-5 py-3 bg-fleer-surface border-b border-fleer-border">
        <p className="text-sm font-display font-medium text-fleer-text">
          {period}
        </p>
        <div className="text-right">
          <p className="text-xs text-fleer-text-muted">Total Unaccounted</p>
          <p
            className={clsx(
              "text-base font-display font-bold tabular-nums",
              totalVarianceLitres < 0
                ? "text-fleer-danger"
                : "text-fleer-accent",
            )}
          >
            {formatNaira(Math.abs(totalVarianceNaira))}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-fleer-border">
              <th className="text-left text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-5 py-3">
                Vehicle
              </th>
              <th className="text-left text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-3 py-3">
                Driver
              </th>
              <th className="text-right text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-3 py-3">
                Bought
              </th>
              <th className="text-right text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-3 py-3">
                Used
              </th>
              <th className="text-right text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-3 py-3">
                Variance
              </th>
              <th className="text-right text-xs font-display font-medium text-fleer-text-muted uppercase tracking-wider px-5 py-3">
                Naira Impact
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => {
              const isNegative = row.variance_litres < 0;
              return (
                <tr
                  key={row.vehicle_plate}
                  className={clsx(
                    "border-b border-fleer-border hover:bg-fleer-surface/50 transition-colors",
                    isNegative &&
                      Math.abs(row.variance_litres) > 10 &&
                      "bg-red-500/5",
                  )}
                >
                  <td className="px-5 py-3 font-mono text-sm text-fleer-text font-medium">
                    {row.vehicle_plate}
                  </td>
                  <td className="px-3 py-3 text-fleer-text-muted">
                    {row.driver_name}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-fleer-text">
                    {formatLitres(row.fuel_bought_litres)}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-fleer-text">
                    {formatLitres(row.fuel_used_litres)}
                  </td>
                  <td
                    className={clsx(
                      "px-3 py-3 text-right font-mono font-medium",
                      isNegative ? "text-fleer-danger" : "text-fleer-accent",
                    )}
                  >
                    {isNegative ? "" : "+"}
                    {formatLitres(row.variance_litres)}
                  </td>
                  <td
                    className={clsx(
                      "px-5 py-3 text-right font-display font-bold tabular-nums",
                      isNegative ? "text-fleer-danger" : "text-fleer-accent",
                    )}
                  >
                    {isNegative ? "-" : "+"}
                    {formatNaira(Math.abs(row.variance_naira))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
