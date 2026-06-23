"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import {
  HeartPulse,
  AlertTriangle,
  Users,
  Gauge,
  ShieldOff,
  Moon,
  CalendarOff,
  ShieldCheck,
} from "lucide-react";

/* ─── Data Metrik Agregat ─── */

const metrikAgregat = [
  {
    label: "Staf Berisiko Tinggi",
    value: "4",
    unit: "Orang",
    icon: AlertTriangle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    iconBg: "from-rose-100 to-rose-200",
  },
  {
    label: "Rata-rata Skor Kelelahan",
    value: "65",
    unit: "/ 100",
    icon: Gauge,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "from-amber-100 to-amber-200",
  },
  {
    label: "Pelanggaran Jeda Istirahat",
    value: "0",
    unit: "Insiden",
    icon: ShieldOff,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "from-emerald-100 to-emerald-200",
  },
];

/* ─── Data Tabel Peringatan Dini ─── */

interface StafPeringatan {
  nama: string;
  unit: string;
  skorKelelahan: number;
  shiftMalamBerturut: number;
  status: "Butuh Libur" | "Aman" | "Perlu Perhatian";
}

const daftarStaf: StafPeringatan[] = [
  {
    nama: "Ns. Yuni Safitri",
    unit: "IGD",
    skorKelelahan: 82,
    shiftMalamBerturut: 4,
    status: "Butuh Libur",
  },
  {
    nama: "Ns. Agus Setiawan",
    unit: "Rawat Inap B",
    skorKelelahan: 78,
    shiftMalamBerturut: 3,
    status: "Butuh Libur",
  },
  {
    nama: "Ns. Lina Marlina",
    unit: "ICU",
    skorKelelahan: 71,
    shiftMalamBerturut: 3,
    status: "Perlu Perhatian",
  },
  {
    nama: "Ns. Doni Prasetyo",
    unit: "Rawat Inap B",
    skorKelelahan: 68,
    shiftMalamBerturut: 2,
    status: "Perlu Perhatian",
  },
  {
    nama: "Ns. Rina Wati",
    unit: "ICU",
    skorKelelahan: 45,
    shiftMalamBerturut: 1,
    status: "Aman",
  },
  {
    nama: "Ns. Budi Santoso",
    unit: "IGD",
    skorKelelahan: 38,
    shiftMalamBerturut: 0,
    status: "Aman",
  },
  {
    nama: "Ns. Dewi Lestari",
    unit: "Rawat Inap A",
    skorKelelahan: 30,
    shiftMalamBerturut: 0,
    status: "Aman",
  },
];

function getKelelahanColor(skor: number) {
  if (skor >= 70) return { bar: "bg-rose-500", text: "text-rose-700" };
  if (skor >= 50) return { bar: "bg-amber-400", text: "text-amber-700" };
  return { bar: "bg-emerald-500", text: "text-emerald-700" };
}

function getStatusConfig(status: StafPeringatan["status"]) {
  switch (status) {
    case "Butuh Libur":
      return {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        icon: CalendarOff,
      };
    case "Perlu Perhatian":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: AlertTriangle,
      };
    case "Aman":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: ShieldCheck,
      };
  }
}

export default function BurnoutRadarPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="px-6 lg:px-8 py-6 max-w-7xl">
        <PageHeader
          icon={HeartPulse}
          iconColor="text-rose-500"
          title="Radar Kelelahan & Risiko Burnout"
          subtitle="Pemantauan kesehatan tenaga medis secara real-time"
        />

        {/* Komponen A: Metrik Agregat */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {metrikAgregat.map((m) => {
            const Icon = m.icon;
            return (
              <Card key={m.label} className={cn("border", m.border, m.bg)}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                        m.iconBg
                      )}
                    >
                      <Icon className={cn("w-6 h-6", m.color)} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-0.5">
                        {m.label}
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={cn(
                            "text-2xl font-bold tabular-nums",
                            m.color
                          )}
                        >
                          {m.value}
                        </span>
                        <span className="text-sm text-slate-400 font-medium">
                          {m.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Komponen B: Tabel Peringatan Dini Individu */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="text-base">
                  Peringatan Dini Individu
                </CardTitle>
                <p className="text-xs text-slate-400 mt-1">
                  Daftar perawat beserta indikator risiko kelelahan
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Users className="w-3.5 h-3.5" />
                <span className="tabular-nums font-medium">{daftarStaf.length} staf dipantau</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-t border-slate-200 bg-slate-50/80">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Nama Perawat
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Unit Asal
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider min-w-[180px]">
                      Tingkat Kelelahan
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <span className="inline-flex items-center gap-1">
                        <Moon className="w-3 h-3" />
                        Shift Malam Berturut
                      </span>
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {daftarStaf.map((staf, i) => {
                    const kelelahanColor = getKelelahanColor(staf.skorKelelahan);
                    const statusCfg = getStatusConfig(staf.status);
                    const StatusIcon = statusCfg.icon;

                    return (
                      <tr
                        key={i}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                      >
                        {/* Nama */}
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-slate-700">
                            {staf.nama}
                          </p>
                        </td>

                        {/* Unit */}
                        <td className="px-4 py-3.5">
                          <span className="text-slate-600">{staf.unit}</span>
                        </td>

                        {/* Progress bar kelelahan */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full rounded-full transition-all duration-700 ease-out",
                                  kelelahanColor.bar
                                )}
                                style={{ width: `${staf.skorKelelahan}%` }}
                              />
                            </div>
                            <span
                              className={cn(
                                "text-xs font-bold tabular-nums w-10 text-right",
                                kelelahanColor.text
                              )}
                            >
                              {staf.skorKelelahan}
                            </span>
                          </div>
                        </td>

                        {/* Shift Malam Berturut */}
                        <td className="px-4 py-3.5 text-center">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 text-xs font-bold tabular-nums px-2.5 py-1 rounded-full",
                              staf.shiftMalamBerturut >= 3
                                ? "bg-rose-100 text-rose-700"
                                : staf.shiftMalamBerturut >= 2
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-100 text-slate-600"
                            )}
                          >
                            <Moon
                              className={cn(
                                "w-3 h-3",
                                staf.shiftMalamBerturut >= 3
                                  ? "text-rose-500"
                                  : "text-slate-400"
                              )}
                            />
                            {staf.shiftMalamBerturut}x
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5 text-center">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border",
                              statusCfg.bg,
                              statusCfg.text,
                              statusCfg.border
                            )}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {staf.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
