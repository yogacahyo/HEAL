"use client";

import { Bell, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      setCurrentDate(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
      <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left: Page Title */}
        <div className="ml-10 lg:ml-0">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Command Center
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <p className="text-xs text-slate-500">
              {currentDate || "Memuat..."} — <span className="font-mono tabular-nums font-medium text-slate-700">{currentTime || "--:--:--"}</span>
            </p>
          </div>
        </div>

        {/* Right: Status Badges & Notification */}
        <div className="flex items-center gap-3">
          {/* SIMRS Status Badge */}
          <div
            id="badge-simrs"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-[pulse-dot_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-700">
              SIMRS: Connected
            </span>
          </div>

          {/* HRIS Status Badge */}
          <div
            id="badge-hris"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-[pulse-dot_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-700">
              HRIS: Connected
            </span>
          </div>

          {/* Notification Bell */}
          <button
            id="btn-notifications"
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
