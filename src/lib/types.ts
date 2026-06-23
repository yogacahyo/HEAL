export interface SIMRSVolumeRecord {
  source_trace_key: string
  tanggal: string
  unit_layanan: string
  shift: "Pagi" | "Sore" | "Malam" | string
  jam_mulai: string
  jam_selesai: string
  kapasitas_bed: number
  jumlah_pasien_masuk: number
  jumlah_pasien_keluar: number
  jumlah_pasien_dirawat: number
  BOR_unit: number
  waiting_time_menit: number
  peak_hour_flag: 0 | 1 | number
}

export interface SIMRSDiagnosisRecord {
  id_pasien: string
  source_trace_key: string
  tanggal: string
  unit_layanan: string
  shift: "Pagi" | "Sore" | "Malam" | string
  kode_diagnosa_icd10: string
  nama_diagnosa: string
  kelompok_diagnosa: string
  jenis_kasus: string
  risiko_klinis: "Rendah" | "Sedang" | "Tinggi" | string
  komorbid: string | null
}

export interface SIMRSAcuityRecord {
  id_pasien: string
  source_trace_key: string
  tanggal: string
  unit_layanan: string
  shift: "Pagi" | "Sore" | "Malam" | string
  triase_igd: "Hijau" | "Kuning" | "Merah" | string
  level_perawatan: string
  acuity_score: number
  status_kritis: "Ya" | "Tidak" | string
  butuh_monitoring_ketat: "Ya" | "Tidak" | string
  jumlah_tindakan: number
  order_lab_radiologi: number
  lama_rawat_hari: number
}

export interface HRISAttendanceRecord {
  id_pegawai: string
  source_trace_key: string
  tanggal: string
  unit_kerja: string
  shift: "Pagi" | "Sore" | "Malam" | string
  profesi: string
  jam_masuk_aktual: string | null
  jam_pulang_aktual: string | null
  status_absensi: "Hadir" | "Sakit" | "Izin" | "Telat" | string
  durasi_kerja_aktual_jam: number
  lembur_menit: number
  keterlambatan_menit: number
  sick_leave_flag: 0 | 1 | number
}

export interface HRISScheduleRecord {
  id_jadwal: string
  source_trace_key: string
  id_pegawai: string
  tanggal_shift: string
  unit_penempatan: string
  jenis_shift: "Pagi" | "Sore" | "Malam" | string
  jam_mulai_shift: string
  jam_selesai_shift: string
  profesi: string
  skill_level: number
  status_kontrak: string
  durasi_shift_jam: number
  shift_malam_berturut: number
  hari_kerja_berturut: number
  jarak_antar_shift_jam: number
  quick_return_flag: 0 | 1 | number
  riwayat_tukar_shift: 0 | 1 | number
}

export interface AIShiftingRecord {
  source_trace_key: string
  tanggal: string
  unit: string
  shift: "Pagi" | "Sore" | "Malam" | string
  BOR_unit: number
  patient_volume: number
  waiting_time_menit: number
  avg_severity: number
  high_risk_patient_count: number
  critical_patient_count: number
  monitoring_need_count: number
  diagnosis_complexity_index: number
  avg_actions_per_patient: number
  avg_lab_radiology_order: number
  avg_length_of_stay: number
  staff_scheduled: number
  staff_present: number
  absence_rate: number
  overtime_hours: number
  late_minutes: number
  avg_skill_level: number
  skill_mix_index: number
  night_shift_flag: 0 | 1 | number
  avg_consecutive_night_shifts: number
  avg_working_hours_last7days: number
  patient_to_staff_ratio: number
  acuity_adjusted_load: number
  staffing_standard_load: number
  required_staff_next_shift: number
  staffing_gap: number
  fatigue_score: number
  burnout_risk_score: number
  burnout_risk_category: "Rendah" | "Sedang" | "Tinggi" | string
  shift_efficiency_score: number
  cost_efficiency_index: number
  recommendation_label: string
}

export interface SchemaValidationResult {
  sheetName?: string
  matchedColumns: string[]
  missingColumns: string[]
  extraColumns: string[]
  totalRows: number
  isValid: boolean
  message?: string
}

export interface DatasetUploadState<T = unknown> {
  fileName: string
  fileSize: number
  uploadedAt: string
  availableSheets: string[]
  validationResults: SchemaValidationResult[]
  previewRows: T[]
  parsedRows: T[]
  isApplied: boolean
  source: "dummy" | "uploaded"
}

export interface AISafetyParameters {
  maxConsecutiveNightShiftsBeforeAlert: number
  minRestHoursBetweenShifts: number
  maxConsecutiveWorkdaysBeforeAlert: number
  highPatientToStaffRatio: number
  highWaitingTimeMinutes: number
  criticalBorThreshold: number
  highAcuityScore: number
  highStaffingGap: number
  highOvertimeMinutes: number
  fatigueBlockThreshold: number
  lowShiftEfficiencyThreshold: number
}
