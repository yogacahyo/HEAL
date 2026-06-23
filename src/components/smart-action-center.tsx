import { Card, CardContent } from "@/components/ui/card";
import { Zap, AlertTriangle, ArrowRight } from "lucide-react";

export function SmartActionCenter() {
  return (
    <section aria-label="Smart Action Center">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-amber-500" />
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
          Smart Action Center
        </h3>
      </div>

      <Card className="relative overflow-hidden border-2 border-rose-200 bg-gradient-to-br from-white via-white to-rose-50/60">
        {/* Decorative gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500" />

        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#grid)" />
          </svg>
        </div>

        <CardContent className="relative p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Alert Icon */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center shadow-sm">
                <AlertTriangle className="w-7 h-7 text-rose-600" strokeWidth={2} />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-[pulse-dot_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                Krisis Terdeteksi
              </div>

              <h4 className="text-lg font-bold text-slate-800 leading-snug mb-2">
                Krisis Shift Malam terdeteksi di Unit Rawat Inap B
              </h4>

              <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                Prediksi{" "}
                <span className="font-semibold text-slate-700">
                  Acuity-Adjusted Load tinggi
                </span>{" "}
                akibat{" "}
                <span className="font-semibold text-rose-600 tabular-nums">
                  5 admisi pasien baru
                </span>{" "}
                berisiko tinggi. Rasio perawat-pasien saat ini{" "}
                <span className="font-mono tabular-nums font-semibold text-rose-600">
                  1:6
                </span>{" "}
                (rekomendasi maksimal 1:4).
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <button
                id="btn-lihat-resolusi"
                className="
                  group inline-flex items-center gap-2.5
                  px-6 py-3.5 rounded-xl
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
                <Zap className="w-4.5 h-4.5 transition-transform group-hover:rotate-12" />
                Lihat Resolusi AI
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
