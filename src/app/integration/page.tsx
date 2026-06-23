"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Users, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function IntegrationPage() {
  return (
    <div className="min-h-screen pb-12">
      <Header title="System Integration" subtitle="Status Sinkronisasi SIMRS & HRIS" />

      <div className="px-6 lg:px-8 py-8 max-w-[1200px] mx-auto animate-fade-in space-y-8">
        
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">HEAL Data Pipeline</h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Dashboard ini terhubung secara real-time dengan portal SIMRS (Klinis) dan HRIS (Kepegawaian) RS Hermina untuk menarik data load pasien dan status cuti perawat.
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl shadow-sm hover:bg-slate-50">
            <RefreshCw className="w-4 h-4 text-slate-400" />
            Force Sync All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SIMRS Portal Link */}
          <Card className="hover:shadow-lg transition-shadow border-teal-100">
            <CardHeader className="bg-teal-50/50 border-b border-teal-100 pb-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
                <Badge className="bg-teal-100 text-teal-700 border-teal-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="mb-2 text-xl text-teal-900">Portal SIMRS</CardTitle>
              <p className="text-sm text-slate-500 mb-6">Sistem Informasi Manajemen RS. Menyediakan data admisi IGD, BOR (Bed Occupancy Rate), dan Acuity Mix pasien secara real-time.</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Last Sync</span>
                  <span className="font-semibold text-slate-700">2 menit yang lalu</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Data Transfer</span>
                  <span className="font-semibold text-slate-700">12.4 MB/day</span>
                </div>
              </div>

              <Link href="/simrs" className="flex items-center justify-center gap-2 w-full py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors shadow-sm shadow-teal-600/20">
                Buka Portal SIMRS <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>

          {/* HRIS Portal Link */}
          <Card className="hover:shadow-lg transition-shadow border-indigo-100">
            <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 pb-4">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="mb-2 text-xl text-indigo-900">Portal HRIS</CardTitle>
              <p className="text-sm text-slate-500 mb-6">Human Resource Information System. Menyediakan direktori staf, kompetensi klinis, histori kehadiran, dan status cuti/sakit.</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Last Sync</span>
                  <span className="font-semibold text-slate-700">1 jam yang lalu</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Data Transfer</span>
                  <span className="font-semibold text-slate-700">4.1 MB/day</span>
                </div>
              </div>

              <Link href="/hris" className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20">
                Buka Portal HRIS <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
