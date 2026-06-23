"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Plus, PlayCircle, Settings2, BarChart2 } from "lucide-react";
import { whatIfScenarios } from "@/lib/mock-data";

export default function WhatIfPage() {
  return (
    <div className="min-h-screen pb-12">
      <Header title="What-If Simulation" subtitle="Simulasi Skenario & Stress Testing" />

      <div className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto animate-fade-in space-y-8">
        
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Skenario Simulasi</h2>
            <p className="text-sm text-slate-500">Uji ketahanan roster terhadap skenario krisis tanpa mengubah data asli.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Buat Skenario Baru
          </button>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatIfScenarios.map((scenario) => (
            <Card key={scenario.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base mb-1">{scenario.title}</CardTitle>
                    <span className="text-xs font-mono text-slate-400">{scenario.id}</span>
                  </div>
                  <Badge variant={scenario.status === 'Active' ? 'safe' : scenario.status === 'Draft' ? 'outline' : 'watch'}>
                    {scenario.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 flex-1 flex flex-col">
                <p className="text-sm text-slate-600 mb-6 flex-1">
                  {scenario.description}
                </p>
                
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Prediksi Dampak</p>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Fatigue Score</span>
                      <span className={`font-bold tabular-nums ${scenario.impact.fatigue.startsWith('+') ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {scenario.impact.fatigue}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Nursing Care Hours (NCH)</span>
                      <span className={`font-bold tabular-nums ${scenario.impact.nch.startsWith('-') ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {scenario.impact.nch}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Cost (Estimasi)</span>
                      <span className="font-bold tabular-nums text-slate-800">
                        {scenario.impact.cost}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {scenario.status === 'Draft' ? (
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors">
                      <Settings2 className="w-4 h-4" /> Setup
                    </button>
                  ) : (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-semibold hover:bg-slate-900 transition-colors shadow-sm">
                        <PlayCircle className="w-4 h-4" /> Run
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
                        <BarChart2 className="w-4 h-4" /> Hasil
                      </button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
