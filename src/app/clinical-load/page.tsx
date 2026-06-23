"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { Activity, ThermometerSun, Map, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDatasetStore } from "@/components/providers/dataset-context";
import { sumBy } from "@/lib/dashboard-calculations";

export default function ClinicalLoadPage() {
  const { aiShifting } = useDatasetStore();

  // Sort by shift time logically
  const shiftOrder: Record<string, number> = { "Pagi": 1, "Sore": 2, "Malam": 3 };
  
  // Aggregate data by shift across all units
  const shifts = Array.from(new Set(aiShifting.map(r => r.shift))).sort((a, b) => (shiftOrder[a] || 99) - (shiftOrder[b] || 99));
  
  const clinicalLoadForecast = shifts.map(shift => {
    const shiftRecords = aiShifting.filter(r => r.shift === shift);
    const patientVolume = sumBy(shiftRecords, r => r.patient_volume);
    const maxCapacity = sumBy(shiftRecords, r => r.staff_present * 5); // Example: 1 staff can handle 5 patients optimally
    
    return {
      time: shift,
      predicted: patientVolume,
      capacity: maxCapacity
    };
  });

  // Find Peak Load
  const peakLoadRecord = [...clinicalLoadForecast].sort((a, b) => b.predicted - a.predicted)[0];
  const peakLoad = peakLoadRecord?.predicted || 0;
  const peakShift = peakLoadRecord?.time || "-";
  
  // Find Staff Needed during peak (assume 1 staff per 5 patients)
  const currentCapacity = peakLoadRecord?.capacity || 0;
  const staffNeeded = Math.max(0, Math.ceil((peakLoad - currentCapacity) / 5));

  return (
    <div className="min-h-screen pb-12">
      <Header title="Clinical Load Forecast" subtitle="Prediksi Beban Klinis & Kebutuhan Staf per Shift" />

      <div className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto animate-fade-in space-y-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">AI Prediction Engine</Badge>
                <span className="text-sm font-medium text-slate-400">Mode Simulasi Aktif</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">Prediksi Lonjakan Pasien</h2>
              <p className="text-slate-300">Puncak beban diprediksi pada shift {peakShift}.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center min-w-[120px]">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Peak Load</p>
                <p className="text-3xl font-bold tabular-nums text-rose-400">{peakLoad}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center min-w-[120px]">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Staff Needed</p>
                <p className="text-3xl font-bold tabular-nums text-emerald-400">+{staffNeeded}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    Beban Klinis vs Kapasitas Staf (Agregat per Shift)
                  </div>
                  <Badge variant="outline" className="text-slate-500">Berdasarkan Dataset</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] mt-6">
                {clinicalLoadForecast.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={clinicalLoadForecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCapacity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                      <RechartsTooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                      <Legend verticalAlign="top" height={36} />
                      <Area type="monotone" name="Volume Pasien" dataKey="predicted" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPredicted)" />
                      <Area type="monotone" name="Estimasi Kapasitas Maks" dataKey="capacity" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCapacity)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500">Data tidak tersedia</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Context Cards */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="flex items-center gap-2">
                  <ThermometerSun className="w-4 h-4 text-amber-500" />
                  Insight dari Dataset (Simulasi)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  <div className="p-4 flex items-start gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Map className="w-4 h-4" /></div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Distribusi Beban</p>
                      <p className="text-xs text-slate-500 mt-1">Shift {peakShift} mencatat volume tertinggi dari seluruh dataset aktif saat ini.</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-3">
                    <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><CalendarClock className="w-4 h-4" /></div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Kapasitas Staf</p>
                      <p className="text-xs text-slate-500 mt-1">Kapasitas dihitung berdasarkan asumsi rasio 1:5 perawat terhadap pasien.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {staffNeeded > 0 && (
              <Card className="bg-blue-600 text-white border-transparent">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Rekomendasi Tindakan</h3>
                  <p className="text-sm text-blue-100 mb-6">Aktifkan {staffNeeded} perawat tambahan untuk shift {peakShift} untuk menutupi gap kapasitas saat peak load.</p>
                  <button className="w-full py-2.5 rounded-xl bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm">
                    Buat Draft Jadwal
                  </button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
