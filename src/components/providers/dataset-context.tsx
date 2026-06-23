"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import {
  SIMRSVolumeRecord,
  SIMRSDiagnosisRecord,
  SIMRSAcuityRecord,
  HRISAttendanceRecord,
  HRISScheduleRecord,
  AIShiftingRecord,
  AISafetyParameters
} from "@/lib/types";
import {
  simrsVolumeMock,
  simrsDiagnosisMock,
  simrsAcuityMock,
  hrisAttendanceMock,
  hrisScheduleMock,
  aiShiftingMock
} from "@/lib/mock-data";
import { defaultAiSafetyParameters } from "@/lib/ai-safety-parameters";

interface DatasetContextType {
  simrsVolume: SIMRSVolumeRecord[];
  simrsDiagnosis: SIMRSDiagnosisRecord[];
  simrsAcuity: SIMRSAcuityRecord[];
  hrisAttendance: HRISAttendanceRecord[];
  hrisSchedule: HRISScheduleRecord[];
  aiShifting: AIShiftingRecord[];
  safetyParameters: AISafetyParameters;
  sourceStatus: "dummy" | "uploaded";
  lastUpdated: string | null;
  schemaHealth: "Valid" | "Need Mapping";
  
  // Setters
  updateSIMRSVolume: (data: SIMRSVolumeRecord[]) => void;
  updateSIMRSDiagnosis: (data: SIMRSDiagnosisRecord[]) => void;
  updateSIMRSAcuity: (data: SIMRSAcuityRecord[]) => void;
  updateHRISAttendance: (data: HRISAttendanceRecord[]) => void;
  updateHRISSchedule: (data: HRISScheduleRecord[]) => void;
  updateAIShifting: (data: AIShiftingRecord[]) => void;
  updateSafetyParameters: (params: AISafetyParameters) => void;
  resetSafetyParameters: () => void;
  resetToDummyData: () => void;
  markAsUploaded: () => void;
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export function DatasetProvider({ children }: { children: ReactNode }) {
  const [simrsVolume, setSimrsVolume] = useState<SIMRSVolumeRecord[]>(simrsVolumeMock);
  const [simrsDiagnosis, setSimrsDiagnosis] = useState<SIMRSDiagnosisRecord[]>(simrsDiagnosisMock);
  const [simrsAcuity, setSimrsAcuity] = useState<SIMRSAcuityRecord[]>(simrsAcuityMock);
  
  const [hrisAttendance, setHrisAttendance] = useState<HRISAttendanceRecord[]>(hrisAttendanceMock);
  const [hrisSchedule, setHrisSchedule] = useState<HRISScheduleRecord[]>(hrisScheduleMock);
  
  const [aiShifting, setAiShifting] = useState<AIShiftingRecord[]>(aiShiftingMock);
  
  const [safetyParameters, setSafetyParameters] = useState<AISafetyParameters>(defaultAiSafetyParameters);
  
  const [sourceStatus, setSourceStatus] = useState<"dummy" | "uploaded">("dummy");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [schemaHealth, setSchemaHealth] = useState<"Valid" | "Need Mapping">("Valid");

  // Stabilize all setter functions with useCallback to prevent
  // context value identity changes on every render
  const markAsUploaded = useCallback(() => {
    setSourceStatus("uploaded");
    setLastUpdated(new Date().toISOString());
  }, []);

  const updateSIMRSVolume = useCallback((data: SIMRSVolumeRecord[]) => {
    setSimrsVolume(data);
    setSourceStatus("uploaded");
    setLastUpdated(new Date().toISOString());
  }, []);

  const updateSIMRSDiagnosis = useCallback((data: SIMRSDiagnosisRecord[]) => {
    setSimrsDiagnosis(data);
    setSourceStatus("uploaded");
    setLastUpdated(new Date().toISOString());
  }, []);

  const updateSIMRSAcuity = useCallback((data: SIMRSAcuityRecord[]) => {
    setSimrsAcuity(data);
    setSourceStatus("uploaded");
    setLastUpdated(new Date().toISOString());
  }, []);

  const updateHRISAttendance = useCallback((data: HRISAttendanceRecord[]) => {
    setHrisAttendance(data);
    setSourceStatus("uploaded");
    setLastUpdated(new Date().toISOString());
  }, []);

  const updateHRISSchedule = useCallback((data: HRISScheduleRecord[]) => {
    setHrisSchedule(data);
    setSourceStatus("uploaded");
    setLastUpdated(new Date().toISOString());
  }, []);

  const updateAIShifting = useCallback((data: AIShiftingRecord[]) => {
    setAiShifting(data);
    setSourceStatus("uploaded");
    setLastUpdated(new Date().toISOString());
  }, []);
  
  const updateSafetyParameters = useCallback(
    (params: AISafetyParameters) => setSafetyParameters(params),
    []
  );

  const resetSafetyParameters = useCallback(
    () => setSafetyParameters(defaultAiSafetyParameters),
    []
  );

  const resetToDummyData = useCallback(() => {
    setSimrsVolume(simrsVolumeMock);
    setSimrsDiagnosis(simrsDiagnosisMock);
    setSimrsAcuity(simrsAcuityMock);
    setHrisAttendance(hrisAttendanceMock);
    setHrisSchedule(hrisScheduleMock);
    setAiShifting(aiShiftingMock);
    setSourceStatus("dummy");
    setLastUpdated(null);
    setSchemaHealth("Valid");
  }, []);

  // Memoize the context value to only change when actual state changes,
  // not on every render of the provider component
  const contextValue = useMemo<DatasetContextType>(() => ({
    simrsVolume,
    simrsDiagnosis,
    simrsAcuity,
    hrisAttendance,
    hrisSchedule,
    aiShifting,
    safetyParameters,
    sourceStatus,
    lastUpdated,
    schemaHealth,
    
    updateSIMRSVolume,
    updateSIMRSDiagnosis,
    updateSIMRSAcuity,
    updateHRISAttendance,
    updateHRISSchedule,
    updateAIShifting,
    updateSafetyParameters,
    resetSafetyParameters,
    resetToDummyData,
    markAsUploaded,
  }), [
    simrsVolume,
    simrsDiagnosis,
    simrsAcuity,
    hrisAttendance,
    hrisSchedule,
    aiShifting,
    safetyParameters,
    sourceStatus,
    lastUpdated,
    schemaHealth,
    updateSIMRSVolume,
    updateSIMRSDiagnosis,
    updateSIMRSAcuity,
    updateHRISAttendance,
    updateHRISSchedule,
    updateAIShifting,
    updateSafetyParameters,
    resetSafetyParameters,
    resetToDummyData,
    markAsUploaded,
  ]);

  return (
    <DatasetContext.Provider value={contextValue}>
      {children}
    </DatasetContext.Provider>
  );
}

export function useDatasetStore() {
  const context = useContext(DatasetContext);
  if (!context) {
    throw new Error("useDatasetStore must be used within a DatasetProvider");
  }
  return context;
}
