"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, LayoutDashboard, CalendarCog, HeartPulse, TrendingUp, Users, ArrowLeftRight, FlaskConical, BarChart3, Database } from "lucide-react";

export default function GuidePage() {
  const guideSections = [
    {
      id: "cmd-center",
      icon: LayoutDashboard,
      title: "Command Center",
      description: "Halaman dashboard utama untuk memantau status operasional secara keseluruhan.",
      features: [
        "Smart Action Center: Sistem deteksi dini berbasis AI yang menyoroti masalah paling kritis (misal: Overload IGD, Risiko Burnout Staf) beserta tombol aksi cepat.",
        "Unit Status Cards: Pantauan real-time untuk masing-masing unit (ICU, IGD, Rawat Inap) yang menunjukkan metrik BOR (Bed Occupancy Rate), rasio perawat vs pasien, dan bauran keakutan pasien (Acuity Mix).",
        "AI Engines Panel: Menampilkan status dan metrik tingkat kepercayaan (Confidence Score) dari 3 engine AI utama di balik sistem HEAL."
      ]
    },
    {
      id: "auto-rostering",
      icon: CalendarCog,
      title: "Auto Rostering",
      description: "Modul optimasi jadwal (rostering) cerdas menggunakan AI.",
      features: [
        "Parameter Constraint: Mengatur batasan keras (Hard Constraints) seperti libur mingguan minimal dan batasan lunak (Soft Constraints) seperti preferensi shift perawat.",
        "Fairness Index: AI mendistribusikan shift akhir pekan dan hari libur secara adil untuk mencegah kecemburuan sosial.",
        "Penalty Score: Semakin rendah penalty score, semakin optimal sebuah jadwal memenuhi semua batasan klinis dan aturan tenaga kerja."
      ]
    },
    {
      id: "burnout-radar",
      icon: HeartPulse,
      title: "Burnout Radar",
      description: "Sistem pelacakan dan pencegahan kelelahan tenaga medis.",
      features: [
        "Fatigue Distribution Chart: Visualisasi persentase perawat dalam tingkat kelelahan aman, waspada, dan kritis.",
        "Top Risk List: Daftar perawat dengan Fatigue Score tertinggi yang harus segera dijauhkan dari shift malam atau unit intensitas tinggi.",
        "Heatmap Risiko: Memvisualisasikan pola kelelahan berdasarkan hari dan unit secara komprehensif."
      ]
    },
    {
      id: "clinical-load",
      icon: TrendingUp,
      title: "Clinical Load Forecast",
      description: "Prediksi tingkat kedatangan dan kepadatan pasien 24 jam ke depan.",
      features: [
        "AI Prediction vs Actual: Membandingkan kapasitas staf aktual dengan garis prediksi lonjakan pasien dari model AI.",
        "Faktor Pendorong Eksternal: AI menarik data konteks di luar RS (misal: kondisi cuaca memburuk yang berkorelasi dengan peningkatan kecelakaan) untuk menyesuaikan prediksi."
      ]
    },
    {
      id: "staff-matrix",
      icon: Users,
      title: "Staff & Skill Matrix",
      description: "Pusat data kompetensi klinis seluruh perawat rumah sakit.",
      features: [
        "Pelacakan Sertifikasi: Melacak kompetensi spesifik (seperti ACLS, penggunaan Ventilator, dll) yang krusial untuk penjadwalan unit khusus (ICU/NICU).",
        "Fatigue Integration: Menyatukan data kelelahan (Fatigue Score) perawat dengan data keterampilan mereka dalam satu matriks tabel yang sama."
      ]
    },
    {
      id: "shift-swap",
      icon: ArrowLeftRight,
      title: "Shift Swap",
      description: "Sistem manajemen pertukaran jadwal (tukar shift) yang didukung analisis keamanan AI.",
      features: [
        "Swap Suitability Score: AI mengevaluasi apakah permintaan tukar shift aman (tidak memicu penumpukan jam kerja yang membahayakan keselamatan pasien).",
        "AI Assessment Recommendation: Rekomendasi Approve/Reject otomatis yang disertai dengan alasan jelas seperti 'Fatigue risk' atau 'Minor skill gap'."
      ]
    },
    {
      id: "what-if",
      icon: FlaskConical,
      title: "What-If Simulation",
      description: "Fasilitas 'Stress-Testing' untuk menguji ketahanan rumah sakit terhadap krisis ekstrim.",
      features: [
        "Uji Skenario Khusus: Menyimulasikan roster untuk situasi spesifik seperti libur Lebaran, lonjakan pasien wabah DBD, atau penutupan separuh bed ICU.",
        "Prediksi Dampak: Menghitung secara teoritis bagaimana skenario tersebut memengaruhi Cost (Biaya Lembur), NCH (Nursing Care Hours), dan rata-rata Fatigue perawat."
      ]
    },
    {
      id: "executive",
      icon: BarChart3,
      title: "Executive Insight",
      description: "Halaman laporan strategis khusus untuk Kepala Rumah Sakit atau Direktur.",
      features: [
        "Efisiensi Cost: Pantauan metrik seperti penghematan biaya lembur (Cost Overtime) setelah penggunaan sistem.",
        "Turnover: Menyatukan data terkait retensi (Retention Rate) staf yang berkorelasi dengan menurunnya indeks burnout."
      ]
    },
    {
      id: "integration",
      icon: Database,
      title: "System Integration",
      description: "Hub yang menunjukkan status keterhubungan dengan infrastruktur RS eksisting.",
      features: [
        "Portal SIMRS: Status sinkronisasi sistem informasi klinis untuk menarik data pasien masuk, tingkat keakutan, dll.",
        "Portal HRIS: Status sinkronisasi ke data kepegawaian untuk menarik informasi kehadiran, cuti, dan demografi perawat."
      ]
    }
  ];

  return (
    <div className="min-h-screen pb-12 bg-slate-50/50">
      <Header title="Panduan Penggunaan" subtitle="Dokumentasi Interaktif HEAL AI Command Center" />

      <div className="px-6 lg:px-8 py-8 max-w-[1000px] mx-auto animate-fade-in space-y-8">
        
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">Selamat Datang di HEAL Shift AI</h2>
              <p className="text-blue-50 max-w-2xl leading-relaxed">
                HEAL (Hermina Employee Allocation Logic) dirancang tidak hanya untuk membuat jadwal dinas, tetapi juga mencegah *burnout*, 
                mengoptimalkan beban klinis, dan memastikan kualitas *Nursing Care Hours (NCH)* tetap optimal dengan kecerdasan buatan.
              </p>
            </div>
          </div>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-white border-b border-slate-100 pb-5">
            <CardTitle className="text-lg font-bold text-slate-800">Modul & Fitur Sistem</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {guideSections.map((section) => {
                const Icon = section.icon;
                return (
                  <AccordionItem value={section.id} key={section.id} className="border-b border-slate-100 last:border-0 px-6">
                    <AccordionTrigger className="hover:no-underline py-5 group">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <Icon className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors">{section.title}</h3>
                          <p className="text-xs text-slate-500 font-normal mt-0.5">{section.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pt-2 pl-14">
                      <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 space-y-4">
                        {section.features.map((feature, idx) => {
                          const [title, desc] = feature.split(": ");
                          return (
                            <div key={idx} className="flex gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                              <p className="text-sm text-slate-600 leading-relaxed">
                                <strong className="text-slate-800 font-semibold">{title}: </strong>
                                {desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
