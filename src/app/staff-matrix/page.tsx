"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Filter, Search, Award, Activity } from "lucide-react";
import { staffSkillMatrix } from "@/lib/mock-data";

export default function StaffMatrixPage() {
  return (
    <div className="min-h-screen pb-12">
      <Header title="Staff & Skill Matrix" subtitle="Direktori Perawat & Kompetensi Klinis" />

      <div className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto animate-fade-in space-y-8">
        
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari perawat atau NIK..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50">
              <Filter className="w-4 h-4" />
              Filter Unit
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-sm hover:bg-blue-700">
              <Award className="w-4 h-4" />
              Update Kompetensi
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <Card>
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-500" />
                Matriks Kompetensi
              </div>
              <Badge variant="outline">{staffSkillMatrix.length} Perawat</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Nama Perawat</th>
                  <th className="px-4 py-4 text-center">ACLS</th>
                  <th className="px-4 py-4 text-center">Ventilator</th>
                  <th className="px-4 py-4 text-center">ICU</th>
                  <th className="px-4 py-4 text-center">Pediatrik</th>
                  <th className="px-4 py-4 text-center">Triage</th>
                  <th className="px-4 py-4 text-center border-l border-slate-200">Fatigue Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {staffSkillMatrix.map((staff, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{staff.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">{staff.unit}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] uppercase font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{staff.contract}</span>
                      </div>
                    </td>
                    
                    {/* Skill Columns */}
                    {[staff.acls, staff.vent, staff.icu, staff.peds, staff.triage].map((skill, j) => (
                      <td key={j} className="px-4 py-4 text-center">
                        <div className="flex justify-center gap-0.5">
                          {[1,2,3,4,5].map(level => (
                            <div 
                              key={level} 
                              className={`w-3 h-3 rounded-sm ${level <= skill ? 'bg-indigo-500' : 'bg-slate-100'}`}
                            />
                          ))}
                        </div>
                      </td>
                    ))}

                    <td className="px-4 py-4 text-center border-l border-slate-100">
                      <div className="flex items-center justify-center gap-2">
                        <Activity className={`w-4 h-4 ${staff.fatigueScore > 75 ? 'text-rose-500' : staff.fatigueScore > 60 ? 'text-amber-500' : 'text-emerald-500'}`} />
                        <span className={`font-bold tabular-nums ${staff.fatigueScore > 75 ? 'text-rose-600' : staff.fatigueScore > 60 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {staff.fatigueScore}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
