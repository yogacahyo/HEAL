"use client";

import { Card, CardContent } from "./ui/card";
import { useDatasetStore } from "@/components/providers/dataset-context";
import { sumBy, avgBy } from "@/lib/dashboard-calculations";
import { TrendingUp, TrendingDown, Users, UserPlus, AlertTriangle, Activity } from "lucide-react";

export function KPICards() {
  const { aiShifting } = useDatasetStore();

  const predictedLoad = sumBy(aiShifting, (s) => s.patient_volume);
  const requiredStaff = sumBy(aiShifting, (s) => s.required_staff_next_shift);
  const staffingGap = sumBy(aiShifting, (s) => s.staffing_gap);
  const shiftEfficiency = avgBy(aiShifting, (s) => s.shift_efficiency_score);

  const kpis = [
    {
      id: "predictedLoad",
      icon: Users,
      label: "Predicted Patient Load",
      value: predictedLoad,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: "requiredStaff",
      icon: UserPlus,
      label: "Required Staff (Next Shift)",
      value: requiredStaff,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      id: "staffingGap",
      icon: AlertTriangle,
      label: "Total Staffing Gap",
      value: staffingGap,
      color: staffingGap > 0 ? "text-rose-600" : "text-emerald-600",
      bg: staffingGap > 0 ? "bg-rose-50" : "bg-emerald-50",
    },
    {
      id: "shiftEfficiency",
      icon: Activity,
      label: "Avg Shift Efficiency",
      value: `${shiftEfficiency.toFixed(1)}%`,
      color: shiftEfficiency < 50 ? "text-amber-600" : "text-emerald-600",
      bg: shiftEfficiency < 50 ? "bg-amber-50" : "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;

        return (
          <Card key={kpi.id} className="overflow-hidden relative group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} strokeWidth={2} />
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <h3 className="text-2xl font-bold text-slate-800 tabular-nums tracking-tight">
                    {kpi.value}
                  </h3>
                </div>
                <p className="text-xs font-medium text-slate-500 line-clamp-1">
                  {kpi.label}
                </p>
              </div>
            </CardContent>
            
            {/* Hover accent */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${kpi.bg.replace('bg-', 'bg-').replace('50', '500')}`} />
          </Card>
        );
      })}
    </div>
  );
}
