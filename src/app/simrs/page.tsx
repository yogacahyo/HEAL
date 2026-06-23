"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import {
  Database,
  Server,
  Send,
  Bed,
  Activity,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Users,
} from "lucide-react";
import { useState } from "react";

/* ─── Data Pasien ─── */

interface Pasien {
  noRM: string;
  nama: string;
  bangsal: string;
  kamar: string;
  diagnosis: string;
  acuity: number;
}

const dataPasien: Pasien[] = [
  {
    noRM: "RM-2026-00412",
    nama: "Tn. Ahmad Subarjo",
    bangsal: "Rawat Inap B",
    kamar: "B-201",
    diagnosis: "Pneumonia Berat + Sepsis",
    acuity: 5,
  },
  {
    noRM: "RM-2026-00415",
    nama: "Ny. Kartini Dewi",
    bangsal: "ICU",
    kamar: "ICU-03",
    diagnosis: "Post-Op Kraniotomi",
    acuity: 5,
  },
  {
    noRM: "RM-2026-00418",
    nama: "Tn. Bambang Hartono",
    bangsal: "Rawat Inap B",
    kamar: "B-105",
    diagnosis: "Stroke Iskemik Akut",
    acuity: 4,
  },
  {
    noRM: "RM-2026-00421",
    nama: "Ny. Siti Rahayu",
    bangsal: "IGD",
    kamar: "IGD-Obs 2",
    diagnosis: "Infark Miokard Akut (STEMI)",
    acuity: 4,
  },
  {
    noRM: "RM-2026-00425",
    nama: "An. Putri Amelia",
    bangsal: "Rawat Inap A",
    kamar: "A-302",
    diagnosis: "Demam Berdarah Dengue Gr. III",
    acuity: 3,
  },
  {
    noRM: "RM-2026-00430",
    nama: "Tn. Dedi Mulyadi",
    bangsal: "Rawat Inap A",
    kamar: "A-108",
    diagnosis: "Diabetes Mellitus Tipe 2 + Ulkus",
    acuity: 3,
  },
  {
    noRM: "RM-2026-00432",
    nama: "Ny. Endang Supriyatin",
    bangsal: "Rawat Inap B",
    kamar: "B-210",
    diagnosis: "Fraktur Femur Post-Op ORIF",
    acuity: 2,
  },
  {
    noRM: "RM-2026-00438",
    nama: "Tn. Rizky Fauzan",
    bangsal: "Rawat Inap A",
    kamar: "A-205",
    diagnosis: "Gastroenteritis Akut",
    acuity: 2,
  },
  {
    noRM: "RM-2026-00441",
    nama: "Ny. Lina Hastuti",
    bangsal: "Rawat Inap A",
    kamar: "A-110",
    diagnosis: "Observasi Post-Partum Normal",
    acuity: 1,
  },
  {
    noRM: "RM-2026-00445",
    nama: "An. Bintang Pratama",
    bangsal: "Rawat Inap A",
    kamar: "A-315",
    diagnosis: "Tonsilitis Akut",
    acuity: 1,
  },
];

function getAcuityConfig(acuity: number) {
  if (acuity >= 4)
    return {
      bg: "bg-rose-100",
      text: "text-rose-700",
      border: "border-rose-200",
      label: "Kritis",
    };
  if (acuity === 3)
    return {
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "border-amber-200",
      label: "Sedang",
    };
  return {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
    label: "Ringan",
  };
}

/* ─── Halaman ─── */

export default function SIMRSPage() {
  const [pushing, setPushing] = useState(false);
  const [pushed, setPushed] = useState(false);

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
        {/* Page Header — Teal identity */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
              <Database className="w-5 h-5 text-teal-600" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                Modul Rawat Inap & Keparahan Pasien
              </h2>
              <p className="text-sm text-slate-500">
                Sistem Informasi Manajemen Rumah Sakit (SIMRS)
              </p>
            </div>
          </div>
        </div>

        {/* Panel Status Integrasi */}
        <div className="mb-6 p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-teal-600" />
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-sm text-teal-700 flex-1">
            <span className="font-semibold">API Sinkronisasi Aktif</span>{" "}
            <span className="text-teal-500 mx-1">|</span>
            Terakhir mengirim data beban klinis ke Engine HEAL:{" "}
            <span className="font-semibold">Hari ini, 13:00 WIB</span>
          </p>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-[pulse-dot_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
          </span>
        </div>

        {/* Komponen A: Ringkasan Kapasitas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: Users,
              label: "Total Pasien Rawat Inap",
              value: "142",
              unit: "Pasien",
              color: "text-teal-600",
              bg: "bg-teal-50",
              border: "border-teal-200",
              iconBg: "from-teal-100 to-teal-200",
            },
            {
              icon: Bed,
              label: "Tingkat Hunian (BOR)",
              value: "85",
              unit: "%",
              color: "text-amber-600",
              bg: "bg-amber-50",
              border: "border-amber-200",
              iconBg: "from-amber-100 to-amber-200",
            },
            {
              icon: Gauge,
              label: "Indeks Keparahan Rata-rata",
              value: "3.2",
              unit: "/ 5.0",
              color: "text-rose-600",
              bg: "bg-rose-50",
              border: "border-rose-200",
              iconBg: "from-rose-100 to-rose-200",
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

        {/* Komponen B: Tabel Admisi Pasien Live */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <CardTitle className="text-base">
                  Admisi Pasien Rawat Inap — Data Live
                </CardTitle>
                <p className="text-xs text-slate-400 mt-1">
                  Data keparahan klinis dikirim ke AI HEAL untuk perhitungan beban kerja
                </p>
              </div>

              <button
                id="btn-push-simrs"
                onClick={handlePush}
                disabled={pushing}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  pushed
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 focus:ring-emerald-500"
                    : pushing
                    ? "bg-teal-500 text-white opacity-80 cursor-wait"
                    : "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-600/25 hover:shadow-xl hover:from-teal-700 hover:to-teal-800 active:scale-[0.98] focus:ring-teal-500"
                )}
              >
                {pushed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Data Terkirim ke HEAL
                  </>
                ) : pushing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Push Data ke HEAL Sekarang
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
                      No. Rekam Medis
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Nama Pasien
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Bangsal / Kamar
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Diagnosis Utama
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <span className="inline-flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        Keparahan (Acuity)
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataPasien.map((p) => {
                    const acuityCfg = getAcuityConfig(p.acuity);
                    return (
                      <tr
                        key={p.noRM}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-xs text-slate-500 tabular-nums">
                            {p.noRM}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-medium text-slate-700">
                            {p.nama}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-slate-600">{p.bangsal}</span>
                          <span className="text-slate-400 ml-1.5 text-xs">
                            {p.kamar}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 max-w-[220px]">
                          <span className="text-slate-600 text-xs">
                            {p.diagnosis}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border tabular-nums",
                              acuityCfg.bg,
                              acuityCfg.text,
                              acuityCfg.border
                            )}
                          >
                            {p.acuity >= 4 && (
                              <AlertTriangle className="w-3 h-3" />
                            )}
                            {p.acuity}/5 · {acuityCfg.label}
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
