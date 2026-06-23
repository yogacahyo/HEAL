"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import {
  Users,
  UserCheck,
  UserX,
  BarChart3,
  Send,
  CheckCircle2,
  ShieldCheck,
  CalendarOff,
  Stethoscope,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

/* ─── Data Perawat ─── */

interface Perawat {
  idPegawai: string;
  nama: string;
  unitUtama: string;
  levelKompetensi: "PK I" | "PK II" | "PK III";
  statusKetersediaan: "Tersedia" | "Cuti Tahunan" | "Izin Sakit";
}

const daftarPerawat: Perawat[] = [
  {
    idPegawai: "HRM-001",
    nama: "Ns. Rina Wati, S.Kep.",
    unitUtama: "ICU",
    levelKompetensi: "PK III",
    statusKetersediaan: "Tersedia",
  },
  {
    idPegawai: "HRM-002",
    nama: "Ns. Budi Santoso, S.Kep.",
    unitUtama: "IGD",
    levelKompetensi: "PK III",
    statusKetersediaan: "Tersedia",
  },
  {
    idPegawai: "HRM-003",
    nama: "Ns. Dewi Lestari, S.Kep.",
    unitUtama: "Rawat Inap A",
    levelKompetensi: "PK II",
    statusKetersediaan: "Tersedia",
  },
  {
    idPegawai: "HRM-004",
    nama: "Ns. Agus Setiawan, S.Kep.",
    unitUtama: "Rawat Inap B",
    levelKompetensi: "PK II",
    statusKetersediaan: "Tersedia",
  },
  {
    idPegawai: "HRM-005",
    nama: "Ns. Yuni Safitri, S.Kep.",
    unitUtama: "IGD",
    levelKompetensi: "PK II",
    statusKetersediaan: "Tersedia",
  },
  {
    idPegawai: "HRM-006",
    nama: "Ns. Lina Marlina, S.Kep.",
    unitUtama: "ICU",
    levelKompetensi: "PK II",
    statusKetersediaan: "Cuti Tahunan",
  },
  {
    idPegawai: "HRM-007",
    nama: "Ns. Doni Prasetyo, S.Kep.",
    unitUtama: "Rawat Inap B",
    levelKompetensi: "PK I",
    statusKetersediaan: "Tersedia",
  },
  {
    idPegawai: "HRM-008",
    nama: "Ns. Ratna Kusuma, S.Kep.",
    unitUtama: "ICU",
    levelKompetensi: "PK III",
    statusKetersediaan: "Tersedia",
  },
  {
    idPegawai: "HRM-009",
    nama: "Ns. Fajar Hidayat, S.Kep.",
    unitUtama: "IGD",
    levelKompetensi: "PK I",
    statusKetersediaan: "Izin Sakit",
  },
  {
    idPegawai: "HRM-010",
    nama: "Ns. Maya Anggraini, S.Kep.",
    unitUtama: "Rawat Inap A",
    levelKompetensi: "PK I",
    statusKetersediaan: "Tersedia",
  },
  {
    idPegawai: "HRM-011",
    nama: "Ns. Hadi Wibowo, S.Kep.",
    unitUtama: "Rawat Inap B",
    levelKompetensi: "PK II",
    statusKetersediaan: "Tersedia",
  },
  {
    idPegawai: "HRM-012",
    nama: "Ns. Sari Mulyani, S.Kep.",
    unitUtama: "ICU",
    levelKompetensi: "PK III",
    statusKetersediaan: "Cuti Tahunan",
  },
];

function getKompetensiConfig(level: Perawat["levelKompetensi"]) {
  switch (level) {
    case "PK III":
      return {
        bg: "bg-indigo-100",
        text: "text-indigo-700",
        border: "border-indigo-200",
      };
    case "PK II":
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-200",
      };
    case "PK I":
      return {
        bg: "bg-slate-100",
        text: "text-slate-600",
        border: "border-slate-200",
      };
  }
}

function getStatusConfig(status: Perawat["statusKetersediaan"]) {
  switch (status) {
    case "Tersedia":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: ShieldCheck,
      };
    case "Cuti Tahunan":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: CalendarOff,
      };
    case "Izin Sakit":
      return {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        icon: Stethoscope,
      };
  }
}

/* ─── Halaman ─── */

export default function HRISPage() {
  const [pushing, setPushing] = useState(false);
  const [pushed, setPushed] = useState(false);

  const totalAktif = 80;
  const cutiSakit = daftarPerawat.filter(
    (p) => p.statusKetersediaan !== "Tersedia"
  ).length;

  function handlePush() {
    setPushing(true);
    setTimeout(() => {
      setPushing(false);
      setPushed(true);
      setTimeout(() => setPushed(false), 4000);
    }, 2000);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="px-6 lg:px-8 py-6 max-w-7xl">
        {/* Page Header — Indigo identity */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-600" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                Manajemen Kompetensi & Kehadiran Keperawatan
              </h2>
              <p className="text-sm text-slate-500">
                Human Resource Information System (HRIS)
              </p>
            </div>
          </div>
        </div>

        {/* Panel Status Integrasi */}
        <div className="mb-6 p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-sm text-indigo-700 flex-1">
            <span className="font-semibold">API Sinkronisasi Aktif</span>{" "}
            <span className="text-indigo-400 mx-1">|</span>
            Data Ketersediaan Staf terhubung ke algoritma HEAL.
          </p>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-[pulse-dot_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
          </span>
        </div>

        {/* Komponen A: Ringkasan SDM */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: UserCheck,
              label: "Total Perawat Aktif",
              value: totalAktif.toString(),
              unit: "Orang",
              color: "text-indigo-600",
              bg: "bg-indigo-50",
              border: "border-indigo-200",
              iconBg: "from-indigo-100 to-indigo-200",
            },
            {
              icon: UserX,
              label: "Perawat Cuti / Sakit",
              value: cutiSakit.toString(),
              unit: "Orang",
              color: "text-amber-600",
              bg: "bg-amber-50",
              border: "border-amber-200",
              iconBg: "from-amber-100 to-amber-200",
            },
            {
              icon: BarChart3,
              label: "Distribusi Kompetensi",
              value: "",
              unit: "",
              color: "text-violet-600",
              bg: "bg-violet-50",
              border: "border-violet-200",
              iconBg: "from-violet-100 to-violet-200",
              custom: true,
            },
          ].map((m) => {
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
                      {"custom" in m && m.custom ? (
                        <div className="flex items-center gap-2 mt-1">
                          {[
                            { level: "PK I", persen: "20%", color: "bg-slate-400" },
                            { level: "PK II", persen: "50%", color: "bg-blue-500" },
                            { level: "PK III", persen: "30%", color: "bg-indigo-600" },
                          ].map((d) => (
                            <span
                              key={d.level}
                              className="flex items-center gap-1 text-[11px] text-slate-600"
                            >
                              <span
                                className={cn("w-2 h-2 rounded-full", d.color)}
                              />
                              <span className="font-bold tabular-nums">
                                {d.persen}
                              </span>
                              <span className="text-slate-400">{d.level}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
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
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Komponen B: Tabel Direktori Staf */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <CardTitle className="text-base">
                  Direktori & Matriks Keterampilan Staf
                </CardTitle>
                <p className="text-xs text-slate-400 mt-1">
                  Level kompetensi dan status ketersediaan menentukan keputusan
                  penjadwalan AI
                </p>
              </div>

              <button
                id="btn-push-hris"
                onClick={handlePush}
                disabled={pushing}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  pushed
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 focus:ring-emerald-500"
                    : pushing
                    ? "bg-indigo-500 text-white opacity-80 cursor-wait"
                    : "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 active:scale-[0.98] focus:ring-indigo-500"
                )}
              >
                {pushed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Matriks Terkirim ke HEAL
                  </>
                ) : pushing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memperbarui...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Perbarui Matriks Keterampilan ke HEAL
                  </>
                )}
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-t border-slate-200 bg-slate-50/80">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      ID Pegawai
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Nama Perawat
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Unit Utama
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Level Kompetensi
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status Ketersediaan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {daftarPerawat.map((p) => {
                    const kompCfg = getKompetensiConfig(p.levelKompetensi);
                    const statusCfg = getStatusConfig(p.statusKetersediaan);
                    const StatusIcon = statusCfg.icon;
                    const tidakTersedia =
                      p.statusKetersediaan !== "Tersedia";

                    return (
                      <tr
                        key={p.idPegawai}
                        className={cn(
                          "border-b border-slate-100 last:border-b-0 transition-colors",
                          tidakTersedia
                            ? "bg-slate-50/70 opacity-75"
                            : "hover:bg-slate-50/50"
                        )}
                      >
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-xs text-slate-500 tabular-nums">
                            {p.idPegawai}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "font-medium",
                                tidakTersedia
                                  ? "text-slate-400 line-through"
                                  : "text-slate-700"
                              )}
                            >
                              {p.nama}
                            </span>
                            {tidakTersedia && (
                              <AlertTriangle className="w-3 h-3 text-amber-400" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-slate-600">{p.unitUtama}</span>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span
                            className={cn(
                              "inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full border",
                              kompCfg.bg,
                              kompCfg.text,
                              kompCfg.border
                            )}
                          >
                            {p.levelKompetensi}
                          </span>
                        </td>
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
                            {p.statusKetersediaan}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Catatan AI */}
            <div className="mx-5 mb-5 mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5">
              <span className="relative flex h-2.5 w-2.5 mt-1">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-[pulse-dot_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
              </span>
              <p className="text-xs text-blue-700 leading-relaxed">
                <span className="font-semibold">Catatan Integrasi AI:</span>{" "}
                Perawat dengan status{" "}
                <span className="font-bold text-amber-700">Cuti Tahunan</span>{" "}
                atau{" "}
                <span className="font-bold text-rose-700">Izin Sakit</span>{" "}
                otomatis dikecualikan oleh algoritma HEAL dari pool penjadwalan.
                Nama mereka tidak akan muncul sebagai kandidat pengganti.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
