"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Briefcase, Download, DollarSign } from "lucide-react";
import { executiveInsights } from "@/lib/mock-data";

export default function ExecutiveInsightPage() {
  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      <Header title="Executive Insight" subtitle="Laporan Kinerja & ROI Implementasi AI" />

      <div className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto animate-fade-in space-y-8">
        
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Ringkasan Eksekutif</h2>
            <p className="text-sm text-slate-500">Dampak implementasi AI terhadap efisiensi biaya dan kualitas layanan RS.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Export Laporan PDF
          </button>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {executiveInsights.map((metric, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-bold text-slate-500">{metric.title}</p>
                  <div className={`p-1.5 rounded-lg ${metric.isGood ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {metric.isGood ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight tabular-nums">{metric.value}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`font-bold tabular-nums ${metric.isGood ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {metric.trend}
                  </span>
                  <span className="text-slate-400">vs {metric.period} lalu</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                Penghematan Biaya Lembur (YTD)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
              {/* Placeholder for actual chart */}
              <div className="text-center text-slate-400">
                <BarChartPlaceholder />
                <p className="mt-4 text-sm font-medium">Chart Area: Prediksi vs Aktual Cost</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                Turnover Perawat (Burnout-related)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
              {/* Placeholder for actual chart */}
              <div className="text-center text-slate-400">
                <LineChartPlaceholder />
                <p className="mt-4 text-sm font-medium">Chart Area: Tren Turnover Bulanan</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

// Simple SVG placeholders for visual structure
function BarChartPlaceholder() {
  return (
    <svg width="200" height="150" viewBox="0 0 200 150" className="opacity-50 mx-auto">
      <rect x="20" y="80" width="30" height="70" fill="#cbd5e1" rx="4" />
      <rect x="70" y="50" width="30" height="100" fill="#94a3b8" rx="4" />
      <rect x="120" y="100" width="30" height="50" fill="#10b981" rx="4" />
      <rect x="170" y="30" width="30" height="120" fill="#3b82f6" rx="4" />
      <line x1="0" y1="150" x2="200" y2="150" stroke="#e2e8f0" strokeWidth="2" />
    </svg>
  );
}

function LineChartPlaceholder() {
  return (
    <svg width="200" height="150" viewBox="0 0 200 150" className="opacity-50 mx-auto">
      <path d="M 10 130 Q 50 120 100 80 T 190 30" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="10" cy="130" r="4" fill="#3b82f6" />
      <circle cx="100" cy="80" r="4" fill="#3b82f6" />
      <circle cx="190" cy="30" r="4" fill="#3b82f6" />
      <line x1="0" y1="150" x2="200" y2="150" stroke="#e2e8f0" strokeWidth="2" />
    </svg>
  );
}
