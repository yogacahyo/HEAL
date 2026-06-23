"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, AlertTriangle } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ProgressBar } from "./ui/progress-bar";
import { useDatasetStore } from "@/components/providers/dataset-context";
import { groupCountBy } from "@/lib/dashboard-calculations";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0];
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
          <span className="font-bold tabular-nums text-slate-700">{item.value}</span>{" "}
          unit shift
        </p>
      </div>
    );
  }
  return null;
}

export function BurnoutChart() {
  const { aiShifting, safetyParameters } = useDatasetStore();

  const totalRecords = aiShifting.length;
  
  // Calculate distribution
  const distribution = groupCountBy(aiShifting, s => s.burnout_risk_category);
  
  const burnoutDistribution = [
    { name: "Tinggi", value: distribution["Tinggi"] || 0, color: "#f43f5e" }, // rose-500
    { name: "Sedang", value: distribution["Sedang"] || 0, color: "#fbbf24" }, // amber-400
    { name: "Rendah", value: distribution["Rendah"] || 0, color: "#10b981" }, // emerald-500
  ].filter(d => d.value > 0);

  // Top Risk List based on fatigue_score
  const topRiskList = [...aiShifting]
    .sort((a, b) => b.fatigue_score - a.fatigue_score)
    .slice(0, 5);

  return (
    <section aria-label="Burnout Risk Overview">
      <div className="flex items-center gap-2 mb-4">
        <HeartPulse className="w-4 h-4 text-rose-500" />
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Burnout & Fatigue Monitor
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Distribution */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Distribusi Risiko Kelelahan</CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              Sebaran risiko burnout berdasarkan Unit & Shift simulasi
            </p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            {totalRecords > 0 ? (
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Donut Chart */}
                <div className="w-48 h-48 flex-shrink-0 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={burnoutDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                        strokeWidth={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {burnoutDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center label overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-slate-800 tabular-nums leading-none mb-1">
                      {totalRecords}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center px-2">
                      Total Shifts
                    </span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-3 w-full">
                  {burnoutDistribution.map((item) => {
                    const pct = Math.round((item.value / totalRecords) * 100);
                    return (
                      <div
                        key={item.name}
                        className="p-3 rounded-xl border border-slate-100 bg-slate-50/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm font-semibold text-slate-700">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-sm font-bold tabular-nums text-slate-800">
                            {pct}%
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700 ease-out"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: item.color,
                              }}
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-slate-500 tabular-nums w-10 text-right">
                            {item.value} shift
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 py-10">Data tidak tersedia</div>
            )}
          </CardContent>
        </Card>

        {/* Right: Top Risk Staff */}
        <Card className="flex flex-col border-rose-200">
          <CardHeader className="pb-3 border-b border-slate-100 bg-rose-50/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-rose-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Top Risk Shifts
                </CardTitle>
                <p className="text-xs text-rose-600/70 mt-1">
                  Peringatan AI: Skor fatigue {'>='} {safetyParameters.fatigueBlockThreshold} memicu block shift malam.
                </p>
              </div>
              <StatusBadge label="Top 5" className="bg-rose-100 text-rose-700 border-rose-200" dot={false} />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-auto">
            {topRiskList.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {topRiskList.map((record, i) => (
                  <div key={record.source_trace_key} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                    <div className="w-8 flex-shrink-0 text-center font-bold text-slate-300">
                      #{i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-800 truncate">{record.unit} - {record.shift}</span>
                        <StatusBadge label={record.burnout_risk_category} />
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">Avg Work: {record.avg_working_hours_last7days}h | Cons. Night: {record.avg_consecutive_night_shifts}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-sm font-bold text-rose-600 tabular-nums">
                        {record.fatigue_score.toFixed(1)}
                      </span>
                      <ProgressBar value={record.fatigue_score} variant={record.fatigue_score >= safetyParameters.fatigueBlockThreshold ? "critical" : "watch"} className="w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-10">Data tidak tersedia</div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
