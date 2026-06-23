"use client";

import { Bell, Calendar, Play, BrainCircuit, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title = "Command Center", subtitle = "Ringkasan Operasional AI" }: HeaderProps) {
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
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Page Title */}
        <div className="ml-10 lg:ml-0 flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">
              {title}
            </h2>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span className="text-[11px] font-medium text-slate-500">
                {currentDate || "Memuat..."}
              </span>
              <span className="text-slate-300 mx-0.5">•</span>
              <span className="text-[11px] font-bold text-slate-700 tabular-nums">
                {currentTime || "--:--:--"}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        {/* Right: Actions & Status */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* SIMRS & HRIS Mock Status */}
          <div className="hidden md:flex flex-col gap-1 items-end mr-2">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SIMRS & HRIS: <span className="text-emerald-600 font-semibold">Mock Connected</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
              <BrainCircuit className="w-3 h-3 text-cyan-500" />
              AI Confidence: <span className="text-cyan-600 font-semibold tabular-nums">87%</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            {/* Run What-If Button */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <Activity className="w-3.5 h-3.5" />
              Run What-If
            </button>
            
            {/* Generate Schedule Button */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-colors">
              <Play className="w-3 h-3" fill="currentColor" />
              Generate Schedule
            </button>
          </div>

          <div className="w-px h-8 bg-slate-200 hidden sm:block mx-1" />

          {/* Notification Bell */}
          <button
            id="btn-notifications"
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
