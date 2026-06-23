"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  LayoutDashboard,
  BrainCircuit,
  HeartPulse,
  Activity,
  Settings,
  ChevronDown,
  Lightbulb,
  MousePointerClick,
  Monitor,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Shield,
} from "lucide-react";
import { useState } from "react";

/* ─── Data Panduan ─── */

interface PanduanHalaman {
  id: string;
  icon: typeof LayoutDashboard;
  iconColor: string;
  iconBg: string;
  judul: string;
  deskripsi: string;
  fiturUtama: {
    judul: string;
    penjelasan: string;
  }[];
  caraPenggunaan: string[];
}

const panduanHalaman: PanduanHalaman[] = [
  {
    id: "command-center",
    icon: LayoutDashboard,
    iconColor: "text-blue-600",
    iconBg: "from-blue-100 to-blue-200",
    judul: "Command Center",
    deskripsi:
      "Pusat komando utama yang memberikan gambaran keseluruhan status rumah sakit dalam satu layar. Halaman ini dirancang agar kepala perawat dapat mengambil keputusan cepat tanpa perlu berpindah-pindah menu.",
    fiturUtama: [
      {
        judul: "Kartu Status Unit",
        penjelasan:
          "Menampilkan 3 kartu bangsal (ICU, IGD, Rawat Inap B) dengan persentase BOR (Bed Occupancy Rate) dan status berwarna — Hijau (Aman), Kuning (Waspada), Merah (Kritis).",
      },
      {
        judul: "Smart Action Center",
        penjelasan:
          "Widget peringatan utama yang menampilkan krisis terdeteksi oleh AI. Berisi detail masalah, rasio perawat-pasien, dan tombol 'Lihat Resolusi AI' untuk melihat solusi yang direkomendasikan.",
      },
      {
        judul: "Ikhtisar Risiko Burnout",
        penjelasan:
          "Grafik donat yang menunjukkan distribusi risiko burnout seluruh staf — proporsi staf Aman (hijau), Waspada (kuning), dan Risiko Tinggi (merah).",
      },
    ],
    caraPenggunaan: [
      "Buka halaman utama untuk melihat ringkasan kondisi rumah sakit.",
      "Perhatikan kartu unit berwarna merah — ini menandakan bangsal yang memerlukan perhatian segera.",
      "Klik tombol 'Lihat Resolusi AI' pada Smart Action Center untuk melihat rekomendasi penyelesaian.",
      "Periksa grafik donat untuk mengetahui berapa persen staf yang berada di zona risiko tinggi.",
    ],
  },
  {
    id: "optimizer",
    icon: BrainCircuit,
    iconColor: "text-purple-600",
    iconBg: "from-purple-100 to-purple-200",
    judul: "Pengoptimal HEAL",
    deskripsi:
      "Halaman algoritma penjadwalan preskriptif yang menggunakan AI untuk menganalisis jadwal shift dan merekomendasikan pergeseran staf secara otomatis berdasarkan beban kerja dan kompetensi.",
    fiturUtama: [
      {
        judul: "Tabel Kalender Shift",
        penjelasan:
          "Menampilkan jadwal perawat mingguan per unit (Shift Pagi, Siang, Malam). Setiap slot menunjukkan nama perawat dan level kompetensi (L1–L3). Slot berwarna merah menandakan kekurangan staf yang kompeten.",
      },
      {
        judul: "Panel Resolusi AI",
        penjelasan:
          "Menampilkan detail konflik yang terdeteksi (misal: kekurangan 1 perawat senior) beserta daftar kandidat pengganti hasil Constraint Solver. Setiap kandidat dilengkapi skor kelelahan dan risiko jeda istirahat.",
      },
      {
        judul: "Tombol Setujui & Beri Notifikasi",
        penjelasan:
          "Setelah memilih kandidat pengganti, tekan tombol ini untuk menyetujui pergeseran dan mengirimkan notifikasi otomatis kepada perawat terkait.",
      },
    ],
    caraPenggunaan: [
      "Buka halaman Pengoptimal HEAL melalui menu navigasi.",
      "Periksa tabel shift — cari slot berwarna merah yang menandakan kekurangan staf.",
      "Lihat Panel Resolusi AI di sisi kanan untuk melihat rekomendasi kandidat pengganti.",
      "Verifikasi skor kelelahan dan risiko jeda istirahat kandidat sebelum menyetujui.",
      "Klik 'Setujui & Beri Notifikasi' untuk mengonfirmasi pergeseran staf.",
    ],
  },
  {
    id: "burnout-radar",
    icon: HeartPulse,
    iconColor: "text-rose-500",
    iconBg: "from-rose-100 to-rose-200",
    judul: "Radar Burnout",
    deskripsi:
      "Dasbor pemantauan kesehatan tenaga medis yang memonitor tingkat kelelahan setiap perawat secara real-time untuk mencegah burnout sebelum terjadi.",
    fiturUtama: [
      {
        judul: "Metrik Agregat",
        penjelasan:
          "Tiga kartu ringkasan: jumlah staf berisiko tinggi, rata-rata skor kelelahan seluruh staf (skala 0–100), dan jumlah pelanggaran jeda istirahat antar shift.",
      },
      {
        judul: "Tabel Peringatan Dini Individu",
        penjelasan:
          "Daftar lengkap perawat dengan bar kelelahan berwarna (merah >70, kuning 50–70, hijau <50), jumlah shift malam berturut-turut, dan status rekomendasi (Butuh Libur / Perlu Perhatian / Aman).",
      },
    ],
    caraPenggunaan: [
      "Periksa kartu metrik agregat untuk gambaran umum kesehatan staf.",
      "Fokus pada perawat dengan status 'Butuh Libur' — mereka memerlukan rotasi segera.",
      "Perhatikan kolom 'Shift Malam Berturut-turut' — angka 3 atau lebih ditandai merah sebagai pelanggaran.",
      "Gunakan informasi ini sebagai dasar untuk mengatur ulang jadwal di Pengoptimal HEAL.",
    ],
  },
  {
    id: "clinical-load",
    icon: Activity,
    iconColor: "text-emerald-600",
    iconBg: "from-emerald-100 to-emerald-200",
    judul: "Beban Klinis",
    deskripsi:
      "Transparansi data klinis dari SIMRS (Sistem Informasi Manajemen Rumah Sakit) untuk memantau arus pasien dan memastikan kompetensi perawat sesuai dengan kompleksitas penyakit.",
    fiturUtama: [
      {
        judul: "Grafik Indeks Gesekan (Admisi vs Discharge)",
        penjelasan:
          "Grafik area 24 jam yang menampilkan jumlah pasien masuk (admisi) dan keluar (discharge). Selisih tinggi antara keduanya menandakan beban administratif perawat yang meningkat drastis.",
      },
      {
        judul: "Defisit Keterampilan Klinis",
        penjelasan:
          "Menampilkan rasio antara kompleksitas penyakit pasien vs tingkat keterampilan perawat per bangsal. Bangsal dengan label 'Bahaya' menandakan terlalu banyak perawat junior saat pasien risiko tinggi masuk.",
      },
    ],
    caraPenggunaan: [
      "Perhatikan grafik area — jam dengan selisih terbesar antara admisi dan discharge adalah periode kritis.",
      "Periksa bagian Defisit Keterampilan — bangsal berlabel 'Bahaya' memerlukan rotasi perawat senior segera.",
      "Bandingkan bar kompleksitas penyakit (merah) dengan bar keterampilan perawat (biru) — idealnya seimbang.",
      "Gunakan data ini untuk merencanakan penempatan staf di Pengoptimal HEAL.",
    ],
  },
  {
    id: "settings",
    icon: Settings,
    iconColor: "text-slate-600",
    iconBg: "from-slate-100 to-slate-200",
    judul: "Pengaturan",
    deskripsi:
      "Halaman konfigurasi sistem dan parameter batas aman AI. Di sini Anda dapat memantau status koneksi ke sistem rumah sakit dan mengatur batasan operasional AI.",
    fiturUtama: [
      {
        judul: "Status Koneksi API",
        penjelasan:
          "Menampilkan status real-time koneksi ke API SIMRS (data klinis) dan API HRIS (data kepegawaian). Badge hijau berkedip menandakan koneksi aktif beserta latensi dan waktu sinkronisasi terakhir.",
      },
      {
        judul: "Parameter AI — Batas Aman",
        penjelasan:
          "Formulir konfigurasi untuk mengatur: (1) Batas maksimal shift malam berturut-turut (default 3, sesuai rekomendasi WHO), dan (2) Minimal jam istirahat antar shift/Quick Return (default 11 jam, sesuai EU Working Time Directive).",
      },
    ],
    caraPenggunaan: [
      "Periksa badge status koneksi — pastikan kedua API berstatus 'Terhubung'.",
      "Sesuaikan parameter batas shift malam dan jam istirahat sesuai kebijakan rumah sakit Anda.",
      "Klik 'Simpan Konfigurasi' setelah mengubah parameter. AI akan langsung menggunakan parameter baru.",
    ],
  },
];

/* ─── Komponen Accordion ─── */

function PanduanAccordion({ halaman }: { halaman: PanduanHalaman }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = halaman.icon;

  return (
    <Card
      id={`panduan-${halaman.id}`}
      className={cn(
        "transition-all duration-300",
        isOpen && "ring-2 ring-blue-200 shadow-md"
      )}
    >
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
        aria-expanded={isOpen}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 transition-transform duration-300",
                halaman.iconBg,
                isOpen && "scale-110"
              )}
            >
              <Icon className={cn("w-5 h-5", halaman.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base">{halaman.judul}</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                {halaman.deskripsi}
              </p>
            </div>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </CardHeader>
      </button>

      {/* Accordion Content */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <CardContent className="pt-0 pb-6">
            {/* Deskripsi Lengkap */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6 pl-[60px]">
              {halaman.deskripsi}
            </p>

            {/* Fitur Utama */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 pl-[60px]">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Fitur Utama
                </h4>
              </div>
              <div className="space-y-3 pl-[60px]">
                {halaman.fiturUtama.map((fitur, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-700 mb-1">
                          {fitur.judul}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {fitur.penjelasan}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cara Penggunaan */}
            <div>
              <div className="flex items-center gap-2 mb-3 pl-[60px]">
                <MousePointerClick className="w-4 h-4 text-blue-500" />
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Cara Penggunaan
                </h4>
              </div>
              <ol className="space-y-2 pl-[60px]">
                {halaman.caraPenggunaan.map((langkah, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-slate-600 leading-relaxed">
                      {langkah}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

/* ─── Halaman Utama ─── */

export default function PanduanPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="px-6 lg:px-8 py-6 max-w-4xl">
        <PageHeader
          icon={BookOpen}
          iconColor="text-indigo-600"
          title="Panduan Penggunaan"
          subtitle="Instruksi lengkap untuk setiap fitur dan halaman di HEAL"
        />

        {/* Kartu Ringkasan */}
        <Card className="mb-8 border-2 border-indigo-100 bg-gradient-to-br from-white to-indigo-50/40">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center flex-shrink-0">
                <Monitor className="w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2">
                  Selamat Datang di HEAL
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  <span className="font-semibold text-emerald-600">HEAL (Hermina Employee Allocation Logic)</span>{" "}
                  adalah sistem manajemen shifting perawat berbasis AI yang dirancang untuk mencegah burnout 
                  dan memastikan alokasi staf optimal di seluruh unit rumah sakit. Sistem ini terintegrasi 
                  dengan SIMRS dan HRIS untuk memberikan rekomendasi cerdas secara real-time.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500 p-2 rounded-lg bg-white border border-slate-100">
                    <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Pencegahan burnout proaktif</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 p-2 rounded-lg bg-white border border-slate-100">
                    <Zap className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span>Rekomendasi AI real-time</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 p-2 rounded-lg bg-white border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <span>Integrasi SIMRS & HRIS</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daftar Tip Cepat */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">Tips Cepat</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Klik pada setiap bagian di bawah ini untuk membuka panduan lengkap. 
              Setiap halaman dijelaskan dengan fitur utama dan langkah-langkah penggunaan yang jelas.
            </p>
          </div>
        </div>

        {/* Accordion Panduan per Halaman */}
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
            Panduan per Halaman
          </h3>
        </div>

        <div className="space-y-4">
          {panduanHalaman.map((halaman) => (
            <PanduanAccordion key={halaman.id} halaman={halaman} />
          ))}
        </div>
      </div>
    </div>
  );
}
