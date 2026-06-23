"use client";

import { Header } from "@/components/header";
import { DatasetUploader } from "@/components/data-upload/DatasetUploader";
import { simrsVolumeSchema, simrsDiagnosisSchema, simrsAcuitySchema } from "@/lib/simrs-schema";
import { useDatasetStore } from "@/components/providers/dataset-context";
import { transformSIMRSVolume, transformSIMRSDiagnosis, transformSIMRSAcuity } from "@/lib/data-transformers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileSpreadsheet, ListFilter } from "lucide-react";

export default function SIMRSDataHubPage() {
  const { 
    updateSIMRSVolume, 
    updateSIMRSDiagnosis, 
    updateSIMRSAcuity, 
    sourceStatus,
    simrsVolume,
    simrsDiagnosis,
    simrsAcuity
  } = useDatasetStore();

  return (
    <div className="min-h-screen pb-12">
      <Header title="SIMRS Data Hub" subtitle="Portal Integrasi Data Klinis Rumah Sakit" />

      <div className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto animate-fade-in space-y-8">
        
        <Tabs defaultValue="volume" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="volume">Volume & Kapasitas</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnosis Pasien</TabsTrigger>
            <TabsTrigger value="acuity">Acuity & Triage</TabsTrigger>
          </TabsList>

          <TabsContent value="volume" className="space-y-6">
            <DatasetUploader
              title="Upload Dataset Volume & BOR"
              description="Upload data kunjungan pasien per shift, kapasitas bed, dan BOR per unit."
              requiredSchema={simrsVolumeSchema}
              onDatasetApplied={(data) => updateSIMRSVolume(data.map(transformSIMRSVolume))}
              onReset={() => {}}
              activeStatus={sourceStatus}
            />
            {simrsVolume.length > 0 && (
              <DataPreviewTable 
                title="Preview Volume Data" 
                headers={Object.keys(simrsVolume[0])} 
                rows={simrsVolume.slice(0, 5)} 
                totalCount={simrsVolume.length} 
              />
            )}
          </TabsContent>

          <TabsContent value="diagnosis" className="space-y-6">
            <DatasetUploader
              title="Upload Dataset Diagnosis"
              description="Upload data kompleksitas diagnosis (ICD-10) untuk kalkulasi beban kerja klinis."
              requiredSchema={simrsDiagnosisSchema}
              onDatasetApplied={(data) => updateSIMRSDiagnosis(data.map(transformSIMRSDiagnosis))}
              onReset={() => {}}
              activeStatus={sourceStatus}
            />
            {simrsDiagnosis.length > 0 && (
              <DataPreviewTable 
                title="Preview Diagnosis Data" 
                headers={Object.keys(simrsDiagnosis[0])} 
                rows={simrsDiagnosis.slice(0, 5)} 
                totalCount={simrsDiagnosis.length} 
              />
            )}
          </TabsContent>

          <TabsContent value="acuity" className="space-y-6">
            <DatasetUploader
              title="Upload Dataset Acuity"
              description="Upload data triage IGD, tingkat ketergantungan pasien, dan kebutuhan monitoring."
              requiredSchema={simrsAcuitySchema}
              onDatasetApplied={(data) => updateSIMRSAcuity(data.map(transformSIMRSAcuity))}
              onReset={() => {}}
              activeStatus={sourceStatus}
            />
            {simrsAcuity.length > 0 && (
              <DataPreviewTable 
                title="Preview Acuity Data" 
                headers={Object.keys(simrsAcuity[0])} 
                rows={simrsAcuity.slice(0, 5)} 
                totalCount={simrsAcuity.length} 
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
