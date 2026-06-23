"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, UserPlus, AlertCircle, ShieldCheck, Activity, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ProgressBar } from "./ui/progress-bar";
import { useDatasetStore } from "@/components/providers/dataset-context";

export function UnitStatusCards() {
  const { aiShifting, safetyParameters } = useDatasetStore();

  return (
    <section aria-label="Status unit bangsal" className="space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Unit Status & Staffing Gap
        </h3>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {aiShifting.map((unit, index) => {
          // Dynamic logic based on prompt
          const isKritis = 
            unit.staffing_gap >= safetyParameters.highStaffingGap || 
            unit.patient_to_staff_ratio > safetyParameters.highPatientToStaffRatio ||
            unit.BOR_unit > safetyParameters.criticalBorThreshold;
            
          const isWaspada = 
            (unit.staffing_gap > 0 && unit.staffing_gap < safetyParameters.highStaffingGap) ||
            unit.waiting_time_menit > safetyParameters.highWaitingTimeMinutes;
            
          const isAman = !isKritis && !isWaspada;

          const cardBorder = isKritis
            ? "border-rose-300 shadow-rose-100"
            : isWaspada
            ? "border-amber-200"
            : "border-slate-200";

          const accentColor = isKritis
            ? "bg-rose-500"
            : isWaspada
            ? "bg-amber-400"
            : "bg-emerald-500";

          return (
            <Card
              key={`${unit.unit}-${unit.shift}-${index}`}
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:shadow-md group flex flex-col",
                cardBorder,
                isKritis && "border-2 shadow-md bg-rose-50/10"
              )}
            >
              {/* Top accent bar */}
              <div className={cn("absolute top-0 left-0 right-0 h-1", accentColor)} />

              <CardHeader className="pt-5 pb-3 flex-shrink-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-[15px] leading-tight mb-1">{unit.unit} - {unit.shift}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Burnout Risk:</span>
                      <StatusBadge label={unit.burnout_risk_category} />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge 
                      label={isKritis ? "Critical Staffing Gap" : isWaspada ? "Warning" : "Optimal"} 
                      className={isKritis ? "bg-rose-100 text-rose-700" : ""}
                    />
                    {unit.night_shift_flag === 1 && <StatusBadge label="Night Shift" />}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col">
                
                {/* Metrik Utama: Patient Volume & Acuity */}
                <div className="grid grid-cols-2 gap-3 bg-white rounded-xl border border-slate-100 p-3">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Patient Volume</p>
                    <p className="text-lg font-bold text-slate-800 tabular-nums">{unit.patient_volume}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Acuity Load</p>
                    <p className="text-lg font-bold text-slate-800 tabular-nums">{unit.acuity_adjusted_load.toFixed(1)}</p>
                  </div>
                </div>

                {/* Detail Pasien */}
                <div className="flex justify-between text-xs font-medium text-slate-600 px-1">
                  <span>Critical: <strong className="text-rose-600">{unit.critical_patient_count}</strong></span>
                  <span>Monitoring: <strong className="text-amber-600">{unit.monitoring_need_count}</strong></span>
                  <span>Avg Severity: <strong className="text-slate-800">{unit.avg_severity.toFixed(2)}</strong></span>
                </div>

                {/* Patient to Staff Ratio Alert */}
                {unit.patient_to_staff_ratio > safetyParameters.highPatientToStaffRatio && (
                  <div className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" />
                    Patient-to-Staff Ratio Tinggi ({unit.patient_to_staff_ratio.toFixed(2)})
                  </div>
                )}
                {unit.acuity_adjusted_load > unit.staffing_standard_load && (
                  <div className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" />
                    Acuity Load Melebihi Standar ({unit.staffing_standard_load})
                  </div>
                )}

                <div className="flex-1" /> {/* Spacer */}

                {/* Staffing Gap */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Staffing</p>
                    <p className="text-xs font-medium text-slate-700">
                      {unit.staff_present} tersedia / {unit.required_staff_next_shift} butuh
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Gap</p>
                    <div className={cn(
                      "inline-flex items-center justify-center px-2 py-0.5 rounded-md text-sm font-bold tabular-nums min-w-[2rem]",
                      unit.staffing_gap > 0 ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                    )}>
                      {unit.staffing_gap > 0 ? `+${unit.staffing_gap}` : unit.staffing_gap}
                    </div>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className={cn(
                  "flex items-start gap-2 p-3 rounded-xl border",
                  unit.recommendation_label === "Add Staff" 
                    ? "bg-blue-50 text-blue-700 border-blue-100" 
                    : "bg-slate-50 text-slate-500 border-slate-100"
                )}>
                  {unit.recommendation_label === "Add Staff" 
                    ? <UserPlus className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    : <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  }
                  <div>
                    <p className={cn(
                      "text-[10px] font-bold uppercase tracking-wider mb-0.5",
                      unit.recommendation_label === "Add Staff" ? "text-blue-600/80" : "text-slate-400"
                    )}>AI Recommendation</p>
                    <p className="text-xs font-medium leading-relaxed">
                      {unit.recommendation_label === "Add Staff" 
                        ? `Kekurangan Staf. Rekomendasi: ${unit.recommendation_label} (${unit.staffing_gap})` 
                        : "Staf Mencukupi."}
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
