"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  label: string;
  className?: string;
  dot?: boolean;
}

export function StatusBadge({ label, className, dot = true }: StatusBadgeProps) {
  let colorClass = "bg-slate-100 text-slate-700 border-slate-200";
  let dotClass = "bg-slate-400";
  const text = label.trim().toLowerCase();

  // Emerald mapping
  if (["rendah", "optimal", "hijau", "hadir", "senior skill"].includes(text) || text.includes("mencukupi")) {
    colorClass = "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    dotClass = "bg-emerald-500";
  }
  // Amber mapping
  else if (["sedang", "kuning", "izin", "telat", "needs supervision"].includes(text) || text.includes("monitoring ketat") || text.includes("peak hour")) {
    colorClass = "bg-amber-50 text-amber-700 border-amber-200/60";
    dotClass = "bg-amber-500";
  }
  // Rose mapping
  else if (["tinggi", "merah", "sakit"].includes(text) || text.includes("critical") || text.includes("kritis") || text.includes("violation") || text.includes("sick leave")) {
    colorClass = "bg-rose-50 text-rose-700 border-rose-200/60";
    dotClass = "bg-rose-500";
  }
  // Cyan/Blue mapping
  else if (text.includes("gawat darurat")) {
    colorClass = "bg-blue-50 text-blue-700 border-blue-200/60";
    dotClass = "bg-blue-500";
  }
  // Indigo/Slate mapping
  else if (text.includes("night shift")) {
    colorClass = "bg-indigo-50 text-indigo-700 border-indigo-200/60";
    dotClass = "bg-indigo-500";
  }
  // Overtime / Add Staff specific
  else if (text.includes("add staff") || text.includes("kekurangan staf") || text.includes("overtime")) {
    // For specific levels we can just pass them directly, default to amber if not critical
    colorClass = "bg-amber-50 text-amber-700 border-amber-200/60";
    dotClass = "bg-amber-500";
  }

  // Fallback for custom overrides
  if (className?.includes("bg-")) {
    colorClass = "";
  }

  return (
    <Badge variant="outline" className={cn("font-medium tracking-tight shadow-sm px-2 py-0.5", colorClass, className)}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", dotClass)} />}
      {label}
    </Badge>
  );
}
