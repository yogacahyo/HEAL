"use client";

import { Header } from "@/components/header";
import { BurnoutChart } from "@/components/burnout-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { Activity, Flame } from "lucide-react";
import { useDatasetStore } from "@/components/providers/dataset-context";
import { avgBy, countBy } from "@/lib/dashboard-calculations";

export default function BurnoutRadarPage() {
  const { aiShifting, safetyParameters } = useDatasetStore();

  // Extract unique units
  const units = Array.from(new Set(aiShifting.map(r => r.unit))).sort();

  // Extract unique dates
  const dates = Array.from(new Set(aiShifting.map(r => r.tanggal))).sort();

  // Generate Fatigue Trend
  const fatigueTrend = dates.map(date => {
    const dayRecords = aiShifting.filter(r => r.tanggal === date);
    const avgScore = avgBy(dayRecords, r => r.fatigue_score);
    // Let's define "incident" as number of shifts with fatigue_score >= threshold
    const incident = countBy(dayRecords, r => r.fatigue_score >= safetyParameters.fatigueBlockThreshold);
    return { date, avgScore: Number(avgScore.toFixed(1)), incident };
  });

  // Generate Heatmap Data
  const burnoutHeatmap = dates.map(date => {
    const row: any = { day: date };
    units.forEach(unit => {
      const records = aiShifting.filter(r => r.tanggal === date && r.unit === unit);
      const score = records.length > 0 ? avgBy(records, r => r.fatigue_score) : 0;
      row[unit] = Number(score.toFixed(1));
    });
    return row;
  });

  const getHeatmapColor = (score: number) => {
    if (score === 0) return "bg-slate-50 text-slate-400"; // No data
    if (score >= safetyParameters.fatigueBlockThreshold) return "bg-rose-500 text-white";
    if (score >= safetyParameters.fatigueBlockThreshold - 10) return "bg-amber-400 text-amber-900";
    if (score >= safetyParameters.fatigueBlockThreshold - 20) return "bg-amber-200 text-amber-900";
    return "bg-emerald-100 text-emerald-800";
  };

  return (
    <div className="min-h-screen pb-12">
      <Header title="Burnout Radar" subtitle="Pemantauan Kelelahan & Risiko Keselamatan" />

      <div className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto animate-fade-in space-y-8">
        {/* Top Half: Distribution & Top Risk (Reused from Dashboard) */}
        <BurnoutChart />

        {/* Bottom Half: Trend & Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fatigue Trend Line Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                Tren Kelelahan Agregat
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72 mt-4">
              {fatigueTrend.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fatigueTrend} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} domain={[0, 100]} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
                    <Line yAxisId="left" type="monotone" name="Skor Fatigue Rata-rata" dataKey="avgScore" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: "#0ea5e9", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="step" name={`Insiden (>= ${safetyParameters.fatigueBlockThreshold})`} dataKey="incident" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3, fill: "#f43f5e" }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">Data tidak tersedia</div>
              )}
            </CardContent>
          </Card>

          {/* Burnout Heatmap by Unit */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                Heatmap Risiko per Unit
              </CardTitle>
            </CardHeader>
            <CardContent>
              {burnoutHeatmap.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-slate-500">Tanggal</th>
                        {units.map(u => (
                          <th key={u} className="px-3 py-2 text-center font-semibold text-slate-500">{u}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {burnoutHeatmap.map((row) => (
                        <tr key={row.day} className="border-t border-slate-100">
                          <td className="px-3 py-2.5 font-medium text-slate-700">{row.day}</td>
                          {units.map(u => {
                            const score = row[u] as number;
                            return (
                              <td key={u} className="px-1 py-1 text-center">
                                <div className={`w-full py-1.5 rounded-md text-xs font-bold tabular-nums ${getHeatmapColor(score)}`}>
                                  {score > 0 ? score : "-"}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center gap-4 mt-6 text-xs text-slate-500 justify-center">
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-emerald-100" /> Aman ({'<'} {safetyParameters.fatigueBlockThreshold - 20})</div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-200" /> Waspada</div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-400" /> Tinggi</div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-rose-500" /> Kritis ({'>='} {safetyParameters.fatigueBlockThreshold})</div>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-slate-500">Data tidak tersedia</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
