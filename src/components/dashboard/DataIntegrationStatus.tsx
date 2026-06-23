"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDatasetStore } from "@/components/providers/dataset-context";
import { Database, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { StatusBadge } from "@/components/common/StatusBadge";

export function DataIntegrationStatus() {
  const store = useDatasetStore();

  return (
    <Card className="border-slate-200 shadow-sm col-span-full">
      <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg text-slate-800">Data Integration Status</CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500 font-medium">Mode:</span>
          <StatusBadge label={store.sourceStatus === "dummy" ? "Simulation Mode" : "Active Simulation Mode"} className="bg-indigo-50 text-indigo-700" dot={false} />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* SIMRS Status */}
          <div className="p-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">SIMRS (Clinical Data)</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Source</span>
                <span className={`font-medium ${store.sourceStatus === 'dummy' ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {store.sourceStatus === "dummy" ? "Dummy Dataset Loaded" : "Uploaded Dataset Active"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Volume Records</span>
                <span className="font-semibold text-slate-800 tabular-nums">{store.simrsVolume.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Diagnosis Records</span>
                <span className="font-semibold text-slate-800 tabular-nums">{store.simrsDiagnosis.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Acuity Records</span>
                <span className="font-semibold text-slate-800 tabular-nums">{store.simrsAcuity.length}</span>
              </div>
            </div>
          </div>

          {/* HRIS Status */}
          <div className="p-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">HRIS (Workforce Data)</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Source</span>
                <span className={`font-medium ${store.sourceStatus === 'dummy' ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {store.sourceStatus === "dummy" ? "Dummy Dataset Loaded" : "Uploaded Dataset Active"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Attendance Records</span>
                <span className="font-semibold text-slate-800 tabular-nums">{store.hrisAttendance.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Historical Schedules</span>
                <span className="font-semibold text-slate-800 tabular-nums">{store.hrisSchedule.length}</span>
              </div>
            </div>
          </div>

          {/* AI Shifting Status */}
          <div className="p-5 bg-slate-50/50">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">AI Shifting Hub</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Train Ready Records</span>
                <span className="font-semibold text-blue-700 tabular-nums">{store.aiShifting.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Schema Health</span>
                <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" /> Valid
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Last Updated</span>
                <span className="flex items-center gap-1.5 text-slate-500 tabular-nums">
                  <Clock className="w-3.5 h-3.5" /> 
                  {store.lastUpdated ? new Date(store.lastUpdated).toLocaleTimeString() : "N/A"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
