"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap, AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useDatasetStore } from "@/components/providers/dataset-context";
import { StatusBadge } from "@/components/common/StatusBadge";

export function SmartActionCenter() {
  const { aiShifting, safetyParameters } = useDatasetStore();

  const actions: any[] = [];

  aiShifting.forEach((record) => {
    // 1. Staffing Gap Tinggi
    if (record.staffing_gap >= safetyParameters.highStaffingGap) {
      actions.push({
        id: `gap-${record.unit}-${record.shift}`,
        severity: "critical",
        title: "Kesenjangan Staf Tinggi",
        unit: `${record.unit} ${record.shift}`,
        reason: `Membutuhkan ${record.required_staff_next_shift} staf, tersedia ${record.staff_present}, gap ${record.staffing_gap}.`,
        impact: "Risiko kewalahan dan penurunan standar pelayanan.",
        actionLabel: "Lihat Rekomendasi",
      });
    }

    // 2. Patient to Staff Ratio Tinggi
    if (record.patient_to_staff_ratio > safetyParameters.highPatientToStaffRatio) {
      actions.push({
        id: `ratio-${record.unit}-${record.shift}`,
        severity: "warning",
        title: "Patient-to-Staff Ratio Tinggi",
        unit: `${record.unit} ${record.shift}`,
        reason: `Mencapai ${record.patient_to_staff_ratio.toFixed(2)} pasien per staf.`,
        impact: "Beban perawat terlampau tinggi, risiko keselamatan pasien menurun.",
        actionLabel: "Tinjau Distribusi",
      });
    }

    // 3. Waiting Time Meningkat
    if (record.waiting_time_menit > safetyParameters.highWaitingTimeMinutes) {
      actions.push({
        id: `wait-${record.unit}-${record.shift}`,
        severity: "warning",
        title: "Waiting Time Meningkat",
        unit: `${record.unit} ${record.shift}`,
        reason: `Waktu tunggu mencapai ${record.waiting_time_menit} menit.`,
        impact: "Penumpukan pasien di IGD/Poli.",
        actionLabel: "Akselerasi Triage",
      });
    }

    // 4. Risiko Shift Malam Berturut
    if (record.night_shift_flag === 1 && record.avg_consecutive_night_shifts >= safetyParameters.maxConsecutiveNightShiftsBeforeAlert) {
      actions.push({
        id: `night-${record.unit}-${record.shift}`,
        severity: "critical",
        title: "Risiko Shift Malam Berturut",
        unit: `${record.unit} ${record.shift}`,
        reason: `Rata-rata ${record.avg_consecutive_night_shifts.toFixed(2)} shift malam berturut.`,
        impact: "Fatigue score tinggi, penurunan konsentrasi.",
        actionLabel: "Blokir Jadwal",
      });
    }

    // 5. Efisiensi Shift Rendah
    if (record.shift_efficiency_score < safetyParameters.lowShiftEfficiencyThreshold) {
      actions.push({
        id: `eff-${record.unit}-${record.shift}`,
        severity: "warning",
        title: "Efisiensi Shift Rendah",
        unit: `${record.unit} ${record.shift}`,
        reason: `Skor efisiensi hanya ${record.shift_efficiency_score.toFixed(2)}.`,
        impact: "Pemborosan biaya dan ketidakseimbangan staf.",
        actionLabel: "Optimasi Ulang",
      });
    }
  });

  // Limit to top 4 actions to keep the dashboard clean
  const topActions = actions.slice(0, 4);

  return (
    <section aria-label="Smart Action Center" className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          AI Recommendations & Actions
        </h3>
      </div>

      {topActions.length === 0 ? (
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardContent className="p-8 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-3" />
            <p className="text-sm font-medium text-emerald-800">
              Tidak ada tindakan prioritas tinggi. Dataset saat ini berada dalam batas simulasi aman.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topActions.map((item) => {
            const isCritical = item.severity === "critical";
            const isWarning = item.severity === "warning";
            
            const Icon = isCritical ? AlertTriangle : ShieldAlert;
            const iconColor = isCritical ? "text-rose-600" : "text-amber-600";
            const iconBg = isCritical ? "bg-rose-100" : "bg-amber-100";
            const cardBorder = isCritical ? "border-rose-200" : "border-amber-200";
            const btnColor = isCritical 
              ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20 text-white" 
              : "bg-white border border-amber-300 text-amber-700 hover:bg-amber-50";

            return (
              <Card key={item.id} className={`relative overflow-hidden group border-l-4 ${cardBorder}`}>
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-bold text-slate-800 text-[15px] leading-snug">
                          {item.title}
                        </h4>
                        <StatusBadge label={item.unit} className="flex-shrink-0" dot={false} />
                      </div>

                      <p className="text-sm text-slate-600 mb-2.5">
                        <span className="font-semibold text-slate-700">Penyebab AI:</span> {item.reason}
                      </p>
                      
                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 mb-4 text-xs text-slate-500">
                        <span className="font-semibold text-slate-600">Dampak:</span> {item.impact}
                      </div>

                      <button
                        className={`
                          inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-[13px] shadow-sm transition-all duration-200
                          ${btnColor}
                        `}
                      >
                        {item.actionLabel}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
