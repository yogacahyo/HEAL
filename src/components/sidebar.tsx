"use client";

import {
  LayoutDashboard,
  CalendarCog,
  HeartPulse,
  TrendingUp,
  Users,
  ArrowLeftRight,
  FlaskConical,
  BarChart3,
  Database,
  Settings,
  Menu,
  X,
  Brain,
  BookOpen,
  Server,
  Contact,
  HardDrive
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

const navItems = [
  { icon: LayoutDashboard, label: "Command Center", href: "/" },
  { icon: CalendarCog, label: "Auto Rostering", href: "/auto-rostering" },
  { icon: HeartPulse, label: "Burnout Radar", href: "/burnout-radar" },
  { icon: TrendingUp, label: "Clinical Load Forecast", href: "/clinical-load" },
  { icon: Users, label: "Staff & Skill Matrix", href: "/staff-matrix" },
  { icon: ArrowLeftRight, label: "Shift Swap", href: "/shift-swap" },
  { icon: FlaskConical, label: "What-If Simulation", href: "/what-if" },
  { icon: BarChart3, label: "Executive Insight", href: "/executive" },
];

const portalItems = [
  {
    icon: Server,
    label: "Portal SIMRS",
    href: "/simrs-data-hub",
  },
  {
    icon: Contact,
    label: "Portal HRIS",
    href: "/hris-workforce-hub",
  },
  {
    icon: HardDrive,
    label: "AI Shifting Dataset",
    href: "/ai-shifting-dataset",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: BookOpen,
    label: "Panduan Penggunaan",
    href: "/guide",
  },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        id="sidebar-mobile-toggle"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-slate-800 transition-colors"
        aria-label="Buka menu navigasi"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 lg:z-auto
          h-screen w-[260px] bg-white border-r border-slate-200
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close button for mobile */}
        <button
          id="sidebar-mobile-close"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Tutup menu navigasi"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo */}
        <div className="px-6 pt-8 pb-6 border-b border-slate-100/60">
          <Link href="/" className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Brain className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">
                  HEAL Shift AI
                </h1>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider leading-none mt-0.5">
                  AI-Powered Rostering
                </p>
              </div>
            </div>
            <div>
              <Badge variant="ai" className="text-[10px] py-0.5 shadow-sm border-cyan-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-[pulse-dot_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                Prototype Mode
              </Badge>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Main Engine
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent"
                  }
                `}
              >
                <Icon
                  className={`w-[18px] h-[18px] ${
                    isActive ? "text-blue-600" : "text-slate-400"
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                {item.label}
              </Link>
            );
          })}

          {/* Divider + System Links */}
          <div className="!mt-6 pt-4 border-t border-dashed border-slate-200">
            <p className="px-3 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              System
            </p>
            {portalItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  id={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium
                    transition-all duration-200 mb-1
                    ${
                      isActive
                        ? "bg-slate-100 text-slate-800 shadow-sm border border-slate-200/60"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent"
                    }
                  `}
                >
                  <Icon
                    className={`w-[16px] h-[16px] ${
                      isActive ? "text-slate-700" : "text-slate-400"
                    }`}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer — User Profile */}
        <div className="px-6 py-5 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300">
              <span className="text-xs font-bold text-slate-600">HR</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate">
                Dr. Herman R.
              </p>
              <p className="text-[11px] text-slate-500 truncate">Direktur Operasional</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
