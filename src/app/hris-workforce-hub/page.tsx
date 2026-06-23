"use client";

import { Header } from "@/components/header";
import { DatasetUploader } from "@/components/data-upload/DatasetUploader";
import { hrisAttendanceSchema, hrisScheduleSchema } from "@/lib/hris-schema";
import { useDatasetStore } from "@/components/providers/dataset-context";
import { transformHRISAttendance, transformHRISSchedule } from "@/lib/data-transformers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ListFilter } from "lucide-react";

export default function HRISWorkforceHubPage() {
  const { 
    updateHRISAttendance, 
    updateHRISSchedule, 
    sourceStatus,
    hrisAttendance,
    hrisSchedule
  } = useDatasetStore();

  return (
    <div className="min-h-screen pb-12">
      <Header title="HRIS Workforce Hub" subtitle="Portal Integrasi Data Kepegawaian & Presensi" />

      <div className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto animate-fade-in space-y-8">
        
        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="attendance">Data Kehadiran & Lembur</TabsTrigger>
            <TabsTrigger value="schedule">Jadwal Historis</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-6">
            <DatasetUploader
              title="Upload Dataset Kehadiran"
              description="Upload data jam masuk/pulang aktual, lembur, dan absensi perawat."
              requiredSchema={hrisAttendanceSchema}
              onDatasetApplied={(data) => updateHRISAttendance(data.map(transformHRISAttendance))}
              onReset={() => {}}
              activeStatus={sourceStatus}
            />
            {hrisAttendance.length > 0 && (
              <DataPreviewTable 
                title="Preview Attendance Data" 
                headers={Object.keys(hrisAttendance[0])} 
                rows={hrisAttendance.slice(0, 5)} 
                totalCount={hrisAttendance.length} 
              />
            )}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <DatasetUploader
              title="Upload Dataset Jadwal Historis"
              description="Upload data shift yang telah dijalani untuk analisis shift malam dan rotasi."
              requiredSchema={hrisScheduleSchema}
              onDatasetApplied={(data) => updateHRISSchedule(data.map(transformHRISSchedule))}
              onReset={() => {}}
              activeStatus={sourceStatus}
            />
            {hrisSchedule.length > 0 && (
              <DataPreviewTable 
                title="Preview Historical Schedule Data" 
                headers={Object.keys(hrisSchedule[0])} 
                rows={hrisSchedule.slice(0, 5)} 
                totalCount={hrisSchedule.length} 
              />
            )}
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}

function DataPreviewTable({ title, headers, rows, totalCount }: { title: string, headers: string[], rows: any[], totalCount: number }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-slate-500" />
            {title}
          </h3>
          <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md">
            Showing 5 of {totalCount} rows
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/50 text-slate-500 text-[10px] uppercase font-semibold">
              <tr>
                {headers.map(h => (
                  <th key={h} className="px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  {headers.map(h => (
                    <td key={h} className="px-4 py-2 text-slate-600 whitespace-nowrap">
                      {String(row[h] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
