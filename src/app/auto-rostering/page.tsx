"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCog, Play, CheckCircle2, AlertCircle } from "lucide-react";
import { weeklySchedule } from "@/lib/mock-data";
import { useDatasetStore } from "@/components/providers/dataset-context";

export default function AutoRosteringPage() {
  const { safetyParameters } = useDatasetStore();

  const hardConstraints = [
    { label: `Maksimal jam kerja berturut-turut: ${safetyParameters.maxConsecutiveWorkdaysBeforeAlert} hari`, active: true },
    { label: `Jarak minimum antar shift: ${safetyParameters.minRestHoursBetweenShifts} jam`, active: true },
    { label: "Rotasi skill mix wajib ada 1 senior", active: true },
    { label: "Tidak ada shift double dalam 24 jam", active: true },
  ];

  const softConstraints = [
    { label: `Minimalkan shift malam berturut-turut (Batas alert: ${safetyParameters.maxConsecutiveNightShiftsBeforeAlert})`, active: true },
    { label: "Pemerataan akhir pekan libur", active: true },
    { label: "Pilihan shift favorit staf terpenuhi", active: true },
  ];

  return (
    <div className="min-h-screen pb-12">
      <Header title="Auto Rostering" subtitle="Smart Schedule Generation" />

      <div className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto animate-fade-in space-y-8">
        
        {/* Top Section: Generate Button & Status */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Simulasi Roster Bulan Depan</h3>
            <p className="text-sm text-slate-500">
              Parameter engine menggunakan setting Safety AI terkini.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors">
            <Play className="w-5 h-5" fill="currentColor" />
            Generate Next Month Schedule
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Constraints */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Hard Constraints
                </CardTitle>
                <p className="text-xs text-slate-500">Aturan mutlak yang tidak boleh dilanggar.</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {hardConstraints.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 hover:bg-slate-50">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${c.active ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-300"}`}>
                        {c.active && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{c.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Soft Constraints
                </CardTitle>
                <p className="text-xs text-slate-500">Aturan yang akan dioptimalkan (penalty minimization).</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {softConstraints.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 hover:bg-slate-50">
                      <div className={`w-8 h-4 rounded-full transition-colors flex items-center px-0.5 ${c.active ? "bg-blue-500 justify-end" : "bg-slate-200 justify-start"}`}>
                        <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{c.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Simulation Result & Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-slate-50 border-transparent">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Penalty Score</p>
                  <p className="text-3xl font-black text-slate-800 tabular-nums">142</p>
                  <p className="text-[10px] font-medium text-emerald-600 mt-1 bg-emerald-100 px-2 py-0.5 rounded-full">-15% vs bulan lalu</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-transparent">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fairness Index</p>
                  <p className="text-3xl font-black text-blue-600 tabular-nums">0.92</p>
                  <p className="text-[10px] font-medium text-blue-600 mt-1 bg-blue-100 px-2 py-0.5 rounded-full">Sangat Baik</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-transparent">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Violation</p>
                  <p className="text-3xl font-black text-slate-800 tabular-nums">0</p>
                  <p className="text-[10px] font-medium text-slate-500 mt-1 px-2 py-0.5 rounded-full border border-slate-200">Hard constraints</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <CardTitle>Hasil Simulasi (Minggu 1)</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700">P: Pagi</Badge>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">S: Siang</Badge>
                    <Badge variant="outline" className="bg-rose-50 text-rose-700">M: Malam</Badge>
                    <Badge variant="outline" className="bg-slate-50 text-slate-500">O: Off</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Nama Staf</th>
                      <th className="px-3 py-3 text-center">Sen</th>
                      <th className="px-3 py-3 text-center">Sel</th>
                      <th className="px-3 py-3 text-center">Rab</th>
                      <th className="px-3 py-3 text-center">Kam</th>
                      <th className="px-3 py-3 text-center">Jum</th>
                      <th className="px-3 py-3 text-center text-rose-500">Sab</th>
                      <th className="px-3 py-3 text-center text-rose-500">Min</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {weeklySchedule.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-700">{row.name}</td>
                        <td className="px-3 py-3 text-center font-bold text-emerald-600">{row.mon}</td>
                        <td className="px-3 py-3 text-center font-bold text-emerald-600">{row.tue}</td>
                        <td className="px-3 py-3 text-center font-bold text-rose-600">{row.wed}</td>
                        <td className="px-3 py-3 text-center font-bold text-rose-600">{row.thu}</td>
                        <td className="px-3 py-3 text-center font-bold text-slate-400">{row.fri}</td>
                        <td className="px-3 py-3 text-center font-bold text-slate-400">{row.sat}</td>
                        <td className="px-3 py-3 text-center font-bold text-emerald-600">{row.sun}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
