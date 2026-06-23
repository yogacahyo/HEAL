"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, Bell, Shield, Paintbrush, Link2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen pb-12 bg-slate-50/30">
      <Header title="Settings" subtitle="Konfigurasi Sistem & Preferensi" />

      <div className="px-6 lg:px-8 py-8 max-w-[1000px] mx-auto animate-fade-in">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Settings Sidebar */}
          <div className="md:col-span-1 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-semibold text-sm transition-colors">
              <Settings2 className="w-4 h-4" /> Umum
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-sm transition-colors">
              <Bell className="w-4 h-4 text-slate-400" /> Notifikasi
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-sm transition-colors">
              <Shield className="w-4 h-4 text-slate-400" /> Keamanan
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-sm transition-colors">
              <Paintbrush className="w-4 h-4 text-slate-400" /> Tampilan
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-medium text-sm transition-colors">
              <Link2 className="w-4 h-4 text-slate-400" /> Integrasi API
            </button>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader className="border-b border-slate-100">
                <CardTitle>Profil Rumah Sakit</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Nama Rumah Sakit</label>
                    <input type="text" defaultValue="RS Hermina Kemayoran" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-800 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Kode Faskes</label>
                    <input type="text" defaultValue="HS-KMY-001" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium text-slate-800 transition-all" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b border-slate-100">
                <CardTitle>Parameter AI Engine</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Batas Kritis Kelelahan (Fatigue Threshold)</p>
                      <p className="text-xs text-slate-500">Skor di atas batas ini akan diblokir dari shift malam.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="number" defaultValue="80" className="w-16 px-3 py-1.5 rounded-lg border border-slate-200 text-center text-sm font-bold text-rose-600 focus:outline-none focus:border-blue-500" />
                      <span className="text-sm text-slate-400">/ 100</span>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-slate-100" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Auto-Approval Swap Request</p>
                      <p className="text-xs text-slate-500">Izinkan AI menyetujui otomatis jika skor keamanan tinggi.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-sm hover:bg-blue-700 transition-colors">
                    Simpan Perubahan
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
