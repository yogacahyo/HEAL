"use client";

import {
  LayoutDashboard,
  BrainCircuit,
  HeartPulse,
  Activity,
  Settings,
  BookOpen,
  Database,
  Users,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Command Center", href: "/" },
  { icon: BrainCircuit, label: "Pengoptimal HEAL", href: "/optimizer" },
  { icon: HeartPulse, label: "Radar Burnout", href: "/burnout-radar" },
  { icon: Activity, label: "Beban Klinis", href: "/clinical-load" },
  { icon: Settings, label: "Pengaturan", href: "/settings" },
  { icon: BookOpen, label: "Panduan", href: "/panduan" },
];

const portalItems = [
  {
    icon: Database,
    label: "Portal SIMRS",
    href: "/simrs",
    color: "teal",
    activeClass: "bg-teal-50 text-teal-700",
    iconActive: "text-teal-600",
    dot: "bg-teal-600",
  },
  {
    icon: Users,
    label: "Portal HRIS",
    href: "/hris",
    color: "indigo",
    activeClass: "bg-indigo-50 text-indigo-700",
    iconActive: "text-indigo-600",
    dot: "bg-indigo-600",
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
        <div className="px-6 pt-8 pb-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <HeartPulse className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">
                HEAL
              </h1>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider leading-none mt-0.5">
                Hermina Allocation
              </p>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <p className="px-3 mb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu Utama
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
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
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
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}

          {/* Divider + Portal Links */}
          <div className="!mt-4 pt-4 border-t border-dashed border-slate-200">
            <p className="px-3 mb-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Sistem Terintegrasi
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
                    flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium
                    transition-all duration-200 mb-1
                    ${
                      isActive
                        ? item.activeClass + " shadow-sm"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200"
                    }
                  `}
                >
                  <Icon
                    className={`w-[16px] h-[16px] ${
                      isActive ? item.iconActive : "text-slate-300"
                    }`}
                    strokeWidth={isActive ? 2.2 : 1.5}
                  />
                  {item.label}
                  {isActive && (
                    <span className={`ml-auto w-1.5 h-1.5 rounded-full ${item.dot}`} />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer — User Profile */}
        <div className="px-6 py-5 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <span className="text-xs font-semibold text-slate-600">NS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">
                Ns. Sarah
              </p>
              <p className="text-[11px] text-slate-400">Kepala Ruangan IGD</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
