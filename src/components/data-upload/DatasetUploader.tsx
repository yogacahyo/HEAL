"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle, AlertTriangle, FileSpreadsheet, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatasetUploadState, SchemaValidationResult } from "@/lib/types";

interface DatasetUploaderProps {
  title: string;
  description: string;
  requiredSchema: string[];
  onDatasetApplied: (parsedData: any[]) => void;
  onReset: () => void;
  activeStatus: "dummy" | "uploaded";
}

export function DatasetUploader({
  title,
  description,
  requiredSchema,
  onDatasetApplied,
  onReset,
  activeStatus
}: DatasetUploaderProps) {
  const [uploadState, setUploadState] = useState<DatasetUploadState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    const isCsv = file.name.endsWith(".csv");
    
    let parsedData: any[] = [];
    let headers: string[] = [];

    if (isCsv) {
      // Dynamic import — only loaded when user uploads a CSV file
      const Papa = (await import("papaparse")).default;
      const text = await file.text();
      const result = Papa.parse(text, { header: true, skipEmptyLines: true });
      parsedData = result.data;
      headers = result.meta.fields || [];
    } else {
      // Dynamic import — only loaded when user uploads an Excel file
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      parsedData = XLSX.utils.sheet_to_json(worksheet);
      if (parsedData.length > 0) {
        headers = Object.keys(parsedData[0] as object);
      }
    }

    const normalizedHeaders = headers.map(h => h.trim());
    const matched = requiredSchema.filter(col => normalizedHeaders.includes(col));
    const missing = requiredSchema.filter(col => !normalizedHeaders.includes(col));

    const validation: SchemaValidationResult = {
      matchedColumns: matched,
      missingColumns: missing,
      extraColumns: [],
      totalRows: parsedData.length,
      isValid: missing.length === 0,
      message: missing.length === 0 ? "Schema valid." : "Beberapa kolom wajib belum ditemukan."
    };

    setUploadState({
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
      availableSheets: [],
      validationResults: [validation],
      previewRows: parsedData.slice(0, 5),
      parsedRows: parsedData,
      isApplied: false,
      source: "uploaded"
    });
  };

  const handleApply = () => {
    if (uploadState?.parsedRows) {
      onDatasetApplied(uploadState.parsedRows);
      setUploadState(prev => prev ? { ...prev, isApplied: true } : null);
    }
  };

  const handleReset = () => {
    setUploadState(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onReset();
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Card className="border-slate-200">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              {title}
            </h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">{description}</p>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase">Status Dataset Aktif:</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-md ${activeStatus === 'dummy' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {activeStatus === 'dummy' ? 'Dummy Dataset Loaded' : 'Uploaded Dataset Active'}
              </span>
            </div>

            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                ${isDragging ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400 bg-slate-50"}
              `}
            >
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-700">Drag & drop file Excel/CSV di sini</p>
              <p className="text-xs text-slate-500 mt-1">atau klik untuk memilih file dari komputer</p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(e) => e.target.files && processFile(e.target.files[0])}
              />
            </div>
          </div>

          {uploadState && (
            <div className="flex-1 bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col">
              <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                Preview & Validasi
                {uploadState.validationResults[0].isValid ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                )}
              </h4>
              
              <div className="space-y-3 flex-1">
                <p className="text-xs text-slate-600">
                  <span className="font-semibold">File:</span> {uploadState.fileName} ({(uploadState.fileSize / 1024).toFixed(1)} KB)
                </p>
                <p className="text-xs text-slate-600">
                  <span className="font-semibold">Total Baris:</span> {uploadState.validationResults[0].totalRows}
                </p>
                
                {!uploadState.validationResults[0].isValid && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg">
                    <p className="text-xs text-rose-700 font-medium">Kolom wajib yang hilang:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {uploadState.validationResults[0].missingColumns.map(col => (
                        <span key={col} className="text-[10px] bg-white border border-rose-200 px-1.5 py-0.5 rounded text-rose-600">
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-3">
                <Button
                  onClick={handleApply}
                  disabled={!uploadState.validationResults[0].isValid || uploadState.isApplied}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {uploadState.isApplied ? "Dataset Diterapkan" : "Gunakan Dataset Ini"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="text-slate-600 hover:text-slate-800"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
