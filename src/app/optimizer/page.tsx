"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  Bell,
  UserCheck,
  ShieldCheck,
  Clock,
} from "lucide-react";

/* ─── Mockup Data ─── */

interface ShiftSlot {
  perawat: string;
  level: number;
  status: "normal" | "kurang";
}

interface DaySchedule {
  hari: string;
  tanggal: string;
  pagi: ShiftSlot[];
  siang: ShiftSlot[];
  malam: ShiftSlot[];
}

const jadwalShift: DaySchedule[] = [
  {
    hari: "Senin",
    tanggal: "23 Jun",
    pagi: [
      { perawat: "Ns. Rina", level: 3, status: "normal" },
      { perawat: "Ns. Budi", level: 2, status: "normal" },
    ],
    siang: [
      { perawat: "Ns. Dewi", level: 3, status: "normal" },
      { perawat: "Ns. Ari", level: 2, status: "normal" },
    ],
    malam: [
      { perawat: "Ns. Fajar", level: 2, status: "normal" },
      { perawat: "Ns. Lina", level: 1, status: "normal" },
    ],
  },
  {
    hari: "Selasa",
    tanggal: "24 Jun",
    pagi: [
      { perawat: "Ns. Sari", level: 3, status: "normal" },
      { perawat: "Ns. Hadi", level: 2, status: "normal" },
    ],
    siang: [
      { perawat: "Ns. Maya", level: 2, status: "normal" },
      { perawat: "Ns. Tono", level: 2, status: "normal" },
    ],
    malam: [
      { perawat: "Ns. Yuni", level: 1, status: "kurang" },
    ],
  },
  {
    hari: "Rabu",
    tanggal: "25 Jun",
    pagi: [
      { perawat: "Ns. Rina", level: 3, status: "normal" },
      { perawat: "Ns. Budi", level: 2, status: "normal" },
    ],
    siang: [
      { perawat: "Ns. Dewi", level: 3, status: "normal" },
      { perawat: "Ns. Lina", level: 1, status: "normal" },
    ],
    malam: [
      { perawat: "Ns. Ari", level: 2, status: "normal" },
      { perawat: "Ns. Fajar", level: 2, status: "normal" },
    ],
  },
];

const kandidatPengganti = [
  {
    nama: "Ns. Ratna Kusuma",
    level: 3,
    unit: "ICU",
    skorKelelahan: 28,
    statusKelelahan: "Aman",
    risikoJeda: "0%",
  },
  {
    nama: "Ns. Andika Pratama",
    level: 3,
    unit: "Rawat Inap A",
    skorKelelahan: 35,
    statusKelelahan: "Aman",
    risikoJeda: "0%",
  },
];

/* ─── Komponen ─── */

function ShiftCell({ slots, isDeficit }: { slots: ShiftSlot[]; isDeficit: boolean }) {
  return (
    <td
      className={cn(
        "px-3 py-3 border-r border-slate-100 last:border-r-0",
        isDeficit && "bg-rose-50"
      )}
    >
      <div className="space-y-1.5">
        {slots.map((slot, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-2 text-xs px-2 py-1.5 rounded-lg",
              slot.status === "kurang"
                ? "bg-rose-100 text-rose-700 border border-rose-200"
                : "bg-slate-50 text-slate-600"
            )}
          >
            <span className="font-medium truncate">{slot.perawat}</span>
            <span
              className={cn(
                "ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                slot.level >= 3
                  ? "bg-emerald-100 text-emerald-700"
                  : slot.level === 2
                  ? "bg-blue-100 text-blue-700"
                  : "bg-amber-100 text-amber-700"
              )}
            >
              L{slot.level}
            </span>
          </div>
        ))}
        {isDeficit && (
          <div className="flex items-center gap-1.5 text-[11px] text-rose-600 font-semibold mt-1">
            <AlertTriangle className="w-3 h-3" />
            Kekurangan staf
          </div>
        )}
      </div>
    </td>
  );
}

export default function OptimizerPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="px-6 lg:px-8 py-6 max-w-7xl">
        <PageHeader
          icon={BrainCircuit}
          title="Pengoptimal Jadwal AI"
          subtitle="Rekomendasi pergeseran staf cerdas berbasis beban kerja"
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Komponen A: Tabel Kalender Shift */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Jadwal Shift Mingguan — IGD</CardTitle>
                    <p className="text-xs text-slate-400 mt-1">
                      Minggu ke-4, Juni 2026
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-[11px] font-semibold border border-rose-200">
                    <AlertTriangle className="w-3 h-3" />
                    1 Konflik Terdeteksi
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">
                          Hari
                        </th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            Shift Pagi
                          </span>
                        </th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-blue-400" />
                            Shift Siang
                          </span>
                        </th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                            Shift Malam
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jadwalShift.map((day) => {
                        const malamDeficit = day.malam.some(
                          (s) => s.status === "kurang"
                        ) || day.malam.length < 2;

                        return (
                          <tr
                            key={day.hari}
                            className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="px-4 py-3 border-r border-slate-100">
                              <div className="font-semibold text-slate-700 text-sm">
                                {day.hari}
                              </div>
                              <div className="text-[11px] text-slate-400 tabular-nums">
                                {day.tanggal}
                              </div>
                            </td>
                            <ShiftCell slots={day.pagi} isDeficit={false} />
                            <ShiftCell slots={day.siang} isDeficit={false} />
                            <ShiftCell
                              slots={day.malam}
                              isDeficit={malamDeficit}
                            />
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Komponen B: Panel Resolusi AI */}
          <div className="xl:col-span-1">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/40">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BrainCircuit className="w-4 h-4 text-blue-600" />
                  </div>
                  <CardTitle className="text-base">Resolusi AI</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Peringatan */}
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-rose-700 leading-relaxed">
                      Ditemukan{" "}
                      <span className="font-bold">Kekurangan 1 Perawat Senior (Level 3)</span>{" "}
                      di IGD Shift Malam hari Selasa, 24 Juni 2026.
                    </p>
                  </div>
                </div>

                {/* Kandidat */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Kandidat Pengganti (Constraint Solver)
                  </p>
                  <div className="space-y-3">
                    {kandidatPengganti.map((k, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-700">
                                {k.nama}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {k.unit} · Level {k.level}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            L{k.level}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="px-2.5 py-1.5 rounded-lg bg-slate-50 text-center">
                            <p className="text-[10px] text-slate-400">Skor Kelelahan</p>
                            <div className="flex items-center justify-center gap-1 mt-0.5">
                              <ShieldCheck className="w-3 h-3 text-emerald-500" />
                              <span className="text-xs font-bold text-emerald-600 tabular-nums">
                                {k.skorKelelahan}/100
                              </span>
                            </div>
                            <p className="text-[9px] text-emerald-500 font-medium">
                              {k.statusKelelahan}
                            </p>
                          </div>
                          <div className="px-2.5 py-1.5 rounded-lg bg-slate-50 text-center">
                            <p className="text-[10px] text-slate-400">Risiko Jeda</p>
                            <div className="flex items-center justify-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-emerald-500" />
                              <span className="text-xs font-bold text-emerald-600 tabular-nums">
                                {k.risikoJeda}
                              </span>
                            </div>
                            <p className="text-[9px] text-emerald-500 font-medium">
                              Tidak ada risiko
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tombol Aksi */}
                <button
                  id="btn-setujui-notifikasi"
                  className="
                    w-full inline-flex items-center justify-center gap-2
                    px-5 py-3 rounded-xl
                    bg-gradient-to-r from-blue-600 to-blue-700
                    text-white font-semibold text-sm
                    shadow-lg shadow-blue-600/25
                    hover:shadow-xl hover:shadow-blue-600/30
                    hover:from-blue-700 hover:to-blue-800
                    active:scale-[0.98]
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  "
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Setujui & Beri Notifikasi
                  <Bell className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
