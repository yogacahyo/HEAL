"use client";

import { Header } from "@/components/header";
import { DatasetUploader } from "@/components/data-upload/DatasetUploader";
import { aiShiftingSchema } from "@/lib/ai-shifting-schema";
import { useDatasetStore } from "@/components/providers/dataset-context";
import { transformAIShifting } from "@/lib/data-transformers";
import { Card, CardContent } from "@/components/ui/card";
import { ListFilter } from "lucide-react";

export default function AIShiftingDatasetPage() {
  const { 
    updateAIShifting, 
    sourceStatus,
    aiShifting,
  } = useDatasetStore();

  return (
    <div className="min-h-screen pb-12">
      <Header title="AI Shifting Dataset" subtitle="Master Dataset Terintegrasi untuk AI Operations" />

      <div className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto animate-fade-in space-y-8">
        
        <div className="space-y-6">
          <DatasetUploader
            title="Upload Master Dataset AI Shifting"
            description="Upload dataset final hasil join data SIMRS dan HRIS untuk mengaktifkan Command Center dan simulasi."
            requiredSchema={aiShiftingSchema}
            onDatasetApplied={(data) => updateAIShifting(data.map(transformAIShifting))}
            onReset={() => {}}
            activeStatus={sourceStatus}
          />
          {aiShifting.length > 0 && (
            <DataPreviewTable 
              title="Preview AI Shifting Data" 
              headers={Object.keys(aiShifting[0])} 
              rows={aiShifting.slice(0, 10)} 
              totalCount={aiShifting.length} 
            />
          )}
        </div>

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
            Showing {rows.length} of {totalCount} rows
          </span>
        </div>
        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/50 text-slate-500 text-[10px] uppercase font-semibold sticky top-0 z-10 shadow-sm">
              <tr>
                {headers.map(h => (
                  <th key={h} className="px-4 py-3 whitespace-nowrap bg-slate-50/90 backdrop-blur-sm">{h}</th>
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
