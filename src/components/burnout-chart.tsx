"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Aman", value: 70, color: "#10b981" },       // emerald-500
  { name: "Waspada", value: 20, color: "#fbbf24" },     // amber-400
  { name: "Risiko Tinggi", value: 10, color: "#f43f5e" },   // rose-500
];

const totalStaff = 120;

interface CustomLabelProps {
  viewBox?: { cx: number; cy: number };
}

function CenterLabel({ viewBox }: CustomLabelProps) {
  const cx = viewBox?.cx ?? 0;
  const cy = viewBox?.cy ?? 0;
  return (
    <g>
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-slate-800 text-2xl font-bold"
        style={{ fontFamily: "inherit", fontFeatureSettings: '"tnum"' }}
      >
        {totalStaff}
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-slate-400 text-[11px] font-medium"
        style={{ fontFamily: "inherit" }}
      >
        Total Staf
      </text>
    </g>
  );
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: { color: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0];
    const count = Math.round((item.value / 100) * totalStaff);
    return (
      <div className="bg-white shadow-lg rounded-xl border border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: item.payload.color }}
          />
          <span className="text-sm font-semibold text-slate-700">
            {item.name}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          <span className="font-bold tabular-nums text-slate-700">{count}</span>{" "}
          staf ({item.value}%)
        </p>
      </div>
    );
  }
  return null;
}

export function BurnoutChart() {
  return (
    <section aria-label="Burnout Risk Overview">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
          Burnout Risk Overview
        </h3>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribusi Risiko Burnout</CardTitle>
          <p className="text-xs text-slate-400 mt-1">
            Skor agregat seluruh staf perawat aktif
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Donut Chart */}
            <div className="w-48 h-48 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                    animationBegin={0}
                    animationDuration={1200}
                    animationEasing="ease-out"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  {/* Center Label — rendered via Pie's label prop won't work well; use custom overlay */}
                </PieChart>
              </ResponsiveContainer>

              {/* Center label overlay */}
              <div className="relative -mt-[124px] flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-800 tabular-nums">
                  {totalStaff}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Total Staf
                </span>
              </div>
              <div className="h-[76px]" /> {/* Spacer to maintain layout */}
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-3 w-full">
              {data.map((item) => {
                const count = Math.round((item.value / 100) * totalStaff);
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors"
                  >
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">
                          {item.name}
                        </span>
                        <span className="text-sm font-bold tabular-nums text-slate-800">
                          {item.value}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${item.value}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400 tabular-nums font-medium whitespace-nowrap">
                          {count} staf
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
