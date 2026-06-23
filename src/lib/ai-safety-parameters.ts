import type { AISafetyParameters } from "./types";

export const defaultAiSafetyParameters: AISafetyParameters = {
  maxConsecutiveNightShiftsBeforeAlert: 2,
  minRestHoursBetweenShifts: 11,
  maxConsecutiveWorkdaysBeforeAlert: 5,
  highPatientToStaffRatio: 10,
  highWaitingTimeMinutes: 60,
  criticalBorThreshold: 0.85,
  highAcuityScore: 4,
  highStaffingGap: 5,
  highOvertimeMinutes: 60,
  fatigueBlockThreshold: 80,
  lowShiftEfficiencyThreshold: 50
};
