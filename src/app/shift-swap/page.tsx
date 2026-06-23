"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, Check, X, ShieldAlert, Sparkles } from "lucide-react";
import { shiftSwapRequests } from "@/lib/mock-data";

export default function ShiftSwapPage() {
  return (
    <div className="min-h-screen pb-12">
      <Header title="Shift Swap & Approval" subtitle="AI-Assisted Pertukaran Jadwal" />

      <div className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto animate-fade-in space-y-8">
        
        {/* Banner */}
        <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-slate-300">AI Swap Analysis Active</span>
            </div>
            <h2 className="text-xl font-bold mb-1">Persetujuan Pertukaran Jadwal</h2>
            <p className="text-sm text-slate-400">Setiap permintaan pertukaran shift dianalisis dampaknya terhadap skill mix dan tingkat kelelahan.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-slate-700 p-3 rounded-xl border border-slate-600 text-center min-w-[100px]">
              <p className="text-xs text-slate-400 mb-1">Pending</p>
              <p className="text-2xl font-bold tabular-nums">3</p>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="grid gap-6">
          {shiftSwapRequests.map((req) => {
            const isApproved = req.aiRecommendation === "Approved";
            const isRejected = req.aiRecommendation === "Rejected";
            const isReview = req.aiRecommendation === "Review";

            return (
              <Card key={req.id} className="overflow-hidden">
                <div className={`h-1 w-full ${isApproved ? 'bg-emerald-500' : isRejected ? 'bg-rose-500' : 'bg-amber-400'}`} />
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
                    
                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-slate-500">{req.id}</span>
                        <Badge variant="outline">{req.unit}</Badge>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{req.requester}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                          <span className="font-semibold">{req.fromShift}</span>
                          <ArrowLeftRight className="w-4 h-4 text-slate-400 mx-1" />
                          <span className="font-semibold text-blue-600">{req.toShift}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-3"><span className="font-semibold">Alasan:</span> {req.reason}</p>
                    </div>

                    {/* AI Assessment */}
                    <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Assessment</span>
                        <Badge variant={isApproved ? "safe" : isRejected ? "critical" : "watch"}>
                          Rekomendasi: {req.aiRecommendation}
                        </Badge>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">Swap Suitability Score</span>
                          <span className="font-bold tabular-nums text-slate-800">{req.aiScore}/100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${isApproved ? 'bg-emerald-500' : isRejected ? 'bg-rose-500' : 'bg-amber-400'}`} style={{ width: `${req.aiScore}%` }} />
                        </div>
                      </div>
                      <div className="flex items-start gap-2 mt-3 text-xs">
                        <ShieldAlert className={`w-4 h-4 flex-shrink-0 ${isApproved ? 'text-emerald-500' : 'text-rose-500'}`} />
                        <p className={`font-medium ${isApproved ? 'text-emerald-700' : 'text-rose-700'}`}>{req.conflict}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-3 lg:min-w-[140px]">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20">
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-600 text-sm font-semibold hover:bg-rose-50 transition-colors shadow-sm">
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>

                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
