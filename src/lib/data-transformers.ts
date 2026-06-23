import {
  SIMRSVolumeRecord,
  SIMRSDiagnosisRecord,
  SIMRSAcuityRecord,
  HRISAttendanceRecord,
  HRISScheduleRecord,
  AIShiftingRecord
} from "./types";

export function normalizeExcelDate(value: unknown): string {
  if (value === null || value === undefined || value === "") return "";

  if (typeof value === "number") {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const date = new Date(excelEpoch.getTime() + value * 24 * 60 * 60 * 1000);
    return date.toISOString().slice(0, 10);
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  const str = String(value).trim();
  const parsed = new Date(str);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  return str;
}

export function toNumber(value: unknown, fallback = 0): number {
  if (value === null || value === undefined || value === "") return fallback;
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function toStringSafe(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

export function toNullableTime(value: unknown): string | null {
  if (value === null || value === undefined || value === "") return null;
  return String(value).trim();
}

// SIMRS Transformers
export function transformSIMRSVolume(row: any): SIMRSVolumeRecord {
  return {
    source_trace_key: toStringSafe(row.source_trace_key),
    tanggal: normalizeExcelDate(row.tanggal),
    unit_layanan: toStringSafe(row.unit_layanan),
    shift: toStringSafe(row.shift),
    jam_mulai: toStringSafe(row.jam_mulai),
    jam_selesai: toStringSafe(row.jam_selesai),
    kapasitas_bed: toNumber(row.kapasitas_bed),
    jumlah_pasien_masuk: toNumber(row.jumlah_pasien_masuk),
    jumlah_pasien_keluar: toNumber(row.jumlah_pasien_keluar),
    jumlah_pasien_dirawat: toNumber(row.jumlah_pasien_dirawat),
    BOR_unit: toNumber(row.BOR_unit),
    waiting_time_menit: toNumber(row.waiting_time_menit),
    peak_hour_flag: toNumber(row.peak_hour_flag) as 0 | 1,
  };
}

export function transformSIMRSDiagnosis(row: any): SIMRSDiagnosisRecord {
  return {
    id_pasien: toStringSafe(row.id_pasien),
    source_trace_key: toStringSafe(row.source_trace_key),
    tanggal: normalizeExcelDate(row.tanggal),
    unit_layanan: toStringSafe(row.unit_layanan),
    shift: toStringSafe(row.shift),
    kode_diagnosa_icd10: toStringSafe(row.kode_diagnosa_icd10),
    nama_diagnosa: toStringSafe(row.nama_diagnosa),
    kelompok_diagnosa: toStringSafe(row.kelompok_diagnosa),
    jenis_kasus: toStringSafe(row.jenis_kasus),
    risiko_klinis: toStringSafe(row.risiko_klinis),
    komorbid: toNullableTime(row.komorbid) // using nullable string helper
  };
}

export function transformSIMRSAcuity(row: any): SIMRSAcuityRecord {
  return {
    id_pasien: toStringSafe(row.id_pasien),
    source_trace_key: toStringSafe(row.source_trace_key),
    tanggal: normalizeExcelDate(row.tanggal),
    unit_layanan: toStringSafe(row.unit_layanan),
    shift: toStringSafe(row.shift),
    triase_igd: toStringSafe(row.triase_igd),
    level_perawatan: toStringSafe(row.level_perawatan),
    acuity_score: toNumber(row.acuity_score),
    status_kritis: toStringSafe(row.status_kritis),
    butuh_monitoring_ketat: toStringSafe(row.butuh_monitoring_ketat),
    jumlah_tindakan: toNumber(row.jumlah_tindakan),
    order_lab_radiologi: toNumber(row.order_lab_radiologi),
    lama_rawat_hari: toNumber(row.lama_rawat_hari),
  };
}

// HRIS Transformers
export function transformHRISAttendance(row: any): HRISAttendanceRecord {
  return {
    id_pegawai: toStringSafe(row.id_pegawai),
    source_trace_key: toStringSafe(row.source_trace_key),
    tanggal: normalizeExcelDate(row.tanggal),
    unit_kerja: toStringSafe(row.unit_kerja),
    shift: toStringSafe(row.shift),
    profesi: toStringSafe(row.profesi),
    jam_masuk_aktual: toNullableTime(row.jam_masuk_aktual),
    jam_pulang_aktual: toNullableTime(row.jam_pulang_aktual),
    status_absensi: toStringSafe(row.status_absensi),
    durasi_kerja_aktual_jam: toNumber(row.durasi_kerja_aktual_jam),
    lembur_menit: toNumber(row.lembur_menit),
    keterlambatan_menit: toNumber(row.keterlambatan_menit),
    sick_leave_flag: toNumber(row.sick_leave_flag) as 0 | 1,
  };
}

export function transformHRISSchedule(row: any): HRISScheduleRecord {
  return {
    id_jadwal: toStringSafe(row.id_jadwal),
    source_trace_key: toStringSafe(row.source_trace_key),
    id_pegawai: toStringSafe(row.id_pegawai),
    tanggal_shift: normalizeExcelDate(row.tanggal_shift),
    unit_penempatan: toStringSafe(row.unit_penempatan),
    jenis_shift: toStringSafe(row.jenis_shift),
    jam_mulai_shift: toStringSafe(row.jam_mulai_shift),
    jam_selesai_shift: toStringSafe(row.jam_selesai_shift),
    profesi: toStringSafe(row.profesi),
    skill_level: toNumber(row.skill_level),
    status_kontrak: toStringSafe(row.status_kontrak),
    durasi_shift_jam: toNumber(row.durasi_shift_jam),
    shift_malam_berturut: toNumber(row.shift_malam_berturut),
    hari_kerja_berturut: toNumber(row.hari_kerja_berturut),
    jarak_antar_shift_jam: toNumber(row.jarak_antar_shift_jam),
    quick_return_flag: toNumber(row.quick_return_flag) as 0 | 1,
    riwayat_tukar_shift: toNumber(row.riwayat_tukar_shift) as 0 | 1,
  };
}

// AI Shifting Transformers
export function transformAIShifting(row: any): AIShiftingRecord {
  return {
    source_trace_key: toStringSafe(row.source_trace_key),
    tanggal: normalizeExcelDate(row.tanggal),
    unit: toStringSafe(row.unit),
    shift: toStringSafe(row.shift),
    BOR_unit: toNumber(row.BOR_unit),
    patient_volume: toNumber(row.patient_volume),
    waiting_time_menit: toNumber(row.waiting_time_menit),
    avg_severity: toNumber(row.avg_severity),
    high_risk_patient_count: toNumber(row.high_risk_patient_count),
    critical_patient_count: toNumber(row.critical_patient_count),
    monitoring_need_count: toNumber(row.monitoring_need_count),
    diagnosis_complexity_index: toNumber(row.diagnosis_complexity_index),
    avg_actions_per_patient: toNumber(row.avg_actions_per_patient),
    avg_lab_radiology_order: toNumber(row.avg_lab_radiology_order),
    avg_length_of_stay: toNumber(row.avg_length_of_stay),
    staff_scheduled: toNumber(row.staff_scheduled),
    staff_present: toNumber(row.staff_present),
    absence_rate: toNumber(row.absence_rate),
    overtime_hours: toNumber(row.overtime_hours),
    late_minutes: toNumber(row.late_minutes),
    avg_skill_level: toNumber(row.avg_skill_level),
    skill_mix_index: toNumber(row.skill_mix_index),
    night_shift_flag: toNumber(row.night_shift_flag) as 0 | 1,
    avg_consecutive_night_shifts: toNumber(row.avg_consecutive_night_shifts),
    avg_working_hours_last7days: toNumber(row.avg_working_hours_last7days),
    patient_to_staff_ratio: toNumber(row.patient_to_staff_ratio),
    acuity_adjusted_load: toNumber(row.acuity_adjusted_load),
    staffing_standard_load: toNumber(row.staffing_standard_load),
    required_staff_next_shift: toNumber(row.required_staff_next_shift),
    staffing_gap: toNumber(row.staffing_gap),
    fatigue_score: toNumber(row.fatigue_score),
    burnout_risk_score: toNumber(row.burnout_risk_score),
    burnout_risk_category: toStringSafe(row.burnout_risk_category),
    shift_efficiency_score: toNumber(row.shift_efficiency_score),
    cost_efficiency_index: toNumber(row.cost_efficiency_index),
    recommendation_label: toStringSafe(row.recommendation_label),
  };
}
