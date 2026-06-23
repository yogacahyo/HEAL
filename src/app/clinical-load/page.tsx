"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  Info,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* ─── Data Grafik Indeks Gesekan ─── */

const dataGesekan = [
  { jam: "00:00", admisi: 2, discharge: 1 },
  { jam: "01:00", admisi: 1, discharge: 0 },
  { jam: "02:00", admisi: 3, discharge: 1 },
  { jam: "03:00", admisi: 2, discharge: 0 },
  { jam: "04:00", admisi: 1, discharge: 1 },
  { jam: "05:00", admisi: 2, discharge: 2 },
  { jam: "06:00", admisi: 5, discharge: 3 },
  { jam: "07:00", admisi: 8, discharge: 4 },
  { jam: "08:00", admisi: 12, discharge: 5 },
  { jam: "09:00", admisi: 15, discharge: 7 },
  { jam: "10:00", admisi: 18, discharge: 10 },
  { jam: "11:00", admisi: 16, discharge: 12 },
  { jam: "12:00", admisi: 14, discharge: 11 },
  { jam: "13:00", admisi: 12, discharge: 9 },
  { jam: "14:00", admisi: 10, discharge: 13 },
  { jam: "15:00", admisi: 8, discharge: 15 },
  { jam: "16:00", admisi: 6, discharge: 12 },
  { jam: "17:00", admisi: 9, discharge: 8 },
  { jam: "18:00", admisi: 11, discharge: 6 },
  { jam: "19:00", admisi: 13, discharge: 5 },
  { jam: "20:00", admisi: 10, discharge: 3 },
  { jam: "21:00", admisi: 7, discharge: 2 },
  { jam: "22:00", admisi: 4, discharge: 1 },
  { jam: "23:00", admisi: 3, discharge: 1 },
];

/* ─── Data Defisit Keterampilan Klinis ─── */

interface BangsalSkill {
  nama: string;
  kompleksitasPasien: number; // 1-10
  tingkatKeterampilan: number; // 1-10
  perawatJunior: number;
  perawatSenior: number;
  status: "bahaya" | "waspada" | "aman";
  catatan: string;
}

const dataBangsal: BangsalSkill[] = [
  {
    nama: "IGD",
    kompleksitasPasien: 8.5,
    tingkatKeterampilan: 5.2,
    perawatJunior: 4,
    perawatSenior: 2,
    status: "bahaya",
    catatan:
      "Terlalu banyak perawat junior saat pasien risiko tinggi masuk — butuh rotasi segera",
  },
  {
    nama: "Rawat Inap B",
    kompleksitasPasien: 7.0,
    tingkatKeterampilan: 5.8,
    perawatJunior: 3,
    perawatSenior: 2,
    status: "waspada",
    catatan:
      "Rasio mendekati batas toleransi — pantau beban admisi malam ini",
  },
  {
    nama: "ICU",
    kompleksitasPasien: 9.0,
    tingkatKeterampilan: 8.5,
    perawatJunior: 2,
    perawatSenior: 6,
    status: "aman",
    catatan: "Rasio keterampilan sesuai dengan kompleksitas pasien",
  },
  {
    nama: "Rawat Inap A",
    kompleksitasPasien: 4.5,
    tingkatKeterampilan: 5.0,
    perawatJunior: 3,
    perawatSenior: 3,
    status: "aman",
    catatan: "Beban klinis normal, kapasitas staf memadai",
  },
];

const statusDefisit = {
  bahaya: {
    label: "Bahaya",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-300",
    barKompleksitas: "bg-rose-500",
    barKeterampilan: "bg-blue-400",
  },
  waspada: {
    label: "Waspada",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-300",
    barKompleksitas: "bg-amber-500",
    barKeterampilan: "bg-blue-400",
  },
  aman: {
    label: "Aman",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    barKompleksitas: "bg-emerald-500",
    barKeterampilan: "bg-blue-400",
  },
};

/* ─── Custom Tooltip ─── */

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-xl border border-slate-200 px-4 py-3">
        <p className="text-xs font-semibold text-slate-700 mb-1.5">
          Jam {label}
        </p>
        {payload.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-500">
              {item.dataKey === "admisi"
                ? "Pasien Masuk"
                : "Pasien Keluar"}
              :
            </span>
            <span className="font-bold tabular-nums text-slate-700">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ClinicalLoadPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="px-6 lg:px-8 py-6 max-w-7xl">
        <PageHeader
          icon={Activity}
          iconColor="text-emerald-600"
          title="Analitik Beban Klinis Real-time"
          subtitle="Transparansi data admisi dan discharge dari SIMRS"
        />

        {/* Komponen A: Grafik Indeks Gesekan */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="text-base">
                  Indeks Gesekan — Admisi vs Discharge
                </CardTitle>
                <p className="text-xs text-slate-400 mt-1">
                  Data 24 jam terakhir, diperbarui setiap jam
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-slate-500">Admisi</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-slate-500">Discharge</span>
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dataGesekan}
                  margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gradAdmisi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradDischarge" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="jam"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                    interval={2}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    formatter={(value: string) =>
                      value === "admisi" ? "Pasien Masuk (Admisi)" : "Pasien Keluar (Discharge)"
                    }
                    wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="admisi"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fill="url(#gradAdmisi)"
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="discharge"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fill="url(#gradDischarge)"
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Penjelasan */}
            <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Selisih tinggi antara admisi dan discharge meningkatkan beban
                administratif perawat secara drastis. Perhatikan jam{" "}
                <span className="font-bold tabular-nums">08:00 – 11:00</span>{" "}
                dengan lonjakan admisi tertinggi.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Komponen B: Defisit Keterampilan Klinis */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="text-base">
                  Defisit Keterampilan Klinis per Bangsal
                </CardTitle>
                <p className="text-xs text-slate-400 mt-1">
                  Rasio kompleksitas penyakit pasien vs tingkat keterampilan
                  perawat
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Users className="w-3.5 h-3.5" />
                <span className="tabular-nums font-medium">{dataBangsal.length} bangsal</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataBangsal.map((bangsal) => {
                const cfg = statusDefisit[bangsal.status];

                return (
                  <div
                    key={bangsal.nama}
                    className={cn(
                      "p-4 rounded-xl border transition-all hover:shadow-sm",
                      bangsal.status === "bahaya"
                        ? "border-rose-300 bg-rose-50/50"
                        : "border-slate-200 bg-white"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-slate-700">
                          {bangsal.nama}
                        </h4>
                        <span
                          className={cn(
                            "text-[11px] font-semibold px-2.5 py-0.5 rounded-full border",
                            cfg.bg,
                            cfg.text,
                            cfg.border
                          )}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>
                          Junior:{" "}
                          <span className="font-bold tabular-nums text-slate-700">
                            {bangsal.perawatJunior}
                          </span>
                        </span>
                        <span>
                          Senior:{" "}
                          <span className="font-bold tabular-nums text-slate-700">
                            {bangsal.perawatSenior}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Dual progress bars */}
                    <div className="space-y-2.5">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">
                            Kompleksitas Penyakit
                          </span>
                          <span
                            className={cn(
                              "font-bold tabular-nums",
                              cfg.text
                            )}
                          >
                            {bangsal.kompleksitasPasien}/10
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-700",
                              cfg.barKompleksitas
                            )}
                            style={{
                              width: `${bangsal.kompleksitasPasien * 10}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">
                            Keterampilan Perawat
                          </span>
                          <span className="font-bold tabular-nums text-blue-600">
                            {bangsal.tingkatKeterampilan}/10
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-700",
                              cfg.barKeterampilan
                            )}
                            style={{
                              width: `${bangsal.tingkatKeterampilan * 10}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Catatan peringatan */}
                    {bangsal.status === "bahaya" && (
                      <div className="mt-3 flex items-start gap-2 text-xs text-rose-600">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{bangsal.catatan}</span>
                      </div>
                    )}
                    {bangsal.status === "waspada" && (
                      <div className="mt-3 flex items-start gap-2 text-xs text-amber-600">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{bangsal.catatan}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
