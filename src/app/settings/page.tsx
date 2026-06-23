"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Settings,
  Wifi,
  CheckCircle2,
  Database,
  Users,
  Save,
  Moon,
  Clock,
  ShieldCheck,
  Info,
} from "lucide-react";

/* ─── Data Status Koneksi ─── */

const koneksiAPI = [
  {
    nama: "API SIMRS",
    deskripsi: "Data Klinis (Pasien, Diagnosis, BOR)",
    icon: Database,
    status: "Terhubung",
    latency: "24ms",
    terakhirSync: "2 menit lalu",
  },
  {
    nama: "API HRIS",
    deskripsi: "Data Pegawai (Perawat, Jadwal, Kompetensi)",
    icon: Users,
    status: "Terhubung",
    latency: "31ms",
    terakhirSync: "5 menit lalu",
  },
];

export default function SettingsPage() {
  const [batasShiftMalam, setBatasShiftMalam] = useState(3);
  const [minJamIstirahat, setMinJamIstirahat] = useState(11);
  const [tersimpan, setTersimpan] = useState(false);

  function handleSimpan() {
    setTersimpan(true);
    setTimeout(() => setTersimpan(false), 3000);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="px-6 lg:px-8 py-6 max-w-4xl">
        <PageHeader
          icon={Settings}
          iconColor="text-slate-600"
          title="Pengaturan Sistem & Integrasi AI"
          subtitle="Konfigurasi koneksi dan parameter batas aman"
        />

        {/* Komponen A: Status Koneksi */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Wifi className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
              Status Koneksi
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {koneksiAPI.map((api) => {
              const Icon = api.icon;
              return (
                <Card key={api.nama}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm text-slate-700">
                            {api.nama}
                          </h4>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-[pulse-dot_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </span>
                            {api.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">
                          {api.deskripsi}
                        </p>
                        <div className="flex items-center gap-4 text-[11px] text-slate-400">
                          <span>
                            Latensi:{" "}
                            <span className="font-semibold tabular-nums text-slate-600">
                              {api.latency}
                            </span>
                          </span>
                          <span>
                            Sync:{" "}
                            <span className="font-medium text-slate-500">
                              {api.terakhirSync}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Komponen B: Parameter AI Batas Aman */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
              Parameter AI — Batas Aman
            </h3>
          </div>

          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-base">Konfigurasi Batasan AI</CardTitle>
              <p className="text-xs text-slate-400 mt-1">
                Atur batas toleransi sistem AI untuk penjadwalan otomatis
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Input 1: Batas Shift Malam */}
                <div>
                  <label
                    htmlFor="input-batas-shift-malam"
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
                  >
                    <Moon className="w-4 h-4 text-indigo-500" />
                    Batas Maksimal Shift Malam Berturut-turut
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="input-batas-shift-malam"
                      type="number"
                      min={1}
                      max={7}
                      value={batasShiftMalam}
                      onChange={(e) =>
                        setBatasShiftMalam(Number(e.target.value))
                      }
                      className="
                        w-24 px-4 py-2.5 rounded-xl border border-slate-300
                        text-sm font-semibold text-slate-800 tabular-nums
                        bg-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        transition-all
                      "
                    />
                    <span className="text-sm text-slate-400">shift</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400 flex items-start gap-1.5">
                    <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    AI akan memberi peringatan jika perawat melebihi batas ini.
                    Standar WHO merekomendasikan maksimal 3 malam berturut-turut.
                  </p>
                </div>

                {/* Input 2: Minimal Jam Istirahat */}
                <div>
                  <label
                    htmlFor="input-min-istirahat"
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
                  >
                    <Clock className="w-4 h-4 text-amber-500" />
                    Minimal Jam Istirahat antar Shift (Quick Return)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="input-min-istirahat"
                      type="number"
                      min={8}
                      max={16}
                      value={minJamIstirahat}
                      onChange={(e) =>
                        setMinJamIstirahat(Number(e.target.value))
                      }
                      className="
                        w-24 px-4 py-2.5 rounded-xl border border-slate-300
                        text-sm font-semibold text-slate-800 tabular-nums
                        bg-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        transition-all
                      "
                    />
                    <span className="text-sm text-slate-400">jam</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400 flex items-start gap-1.5">
                    <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    Jeda minimum antara akhir shift sebelumnya dan awal shift
                    berikutnya. Regulasi EU Working Time Directive menetapkan
                    minimal 11 jam.
                  </p>
                </div>

                {/* Tombol Simpan */}
                <div className="pt-2 flex items-center gap-4">
                  <button
                    id="btn-simpan-konfigurasi"
                    onClick={handleSimpan}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                      tersimpan
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 focus:ring-emerald-500"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] focus:ring-blue-500"
                    )}
                  >
                    {tersimpan ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Konfigurasi Tersimpan
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Simpan Konfigurasi
                      </>
                    )}
                  </button>
                  {tersimpan && (
                    <span className="text-xs text-emerald-600 font-medium animate-in fade-in">
                      Berhasil disimpan!
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
