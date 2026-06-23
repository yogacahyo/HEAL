import {
  SIMRSVolumeRecord,
  SIMRSDiagnosisRecord,
  SIMRSAcuityRecord,
  HRISAttendanceRecord,
  HRISScheduleRecord,
  AIShiftingRecord
} from "./types";

export const simrsVolumeMock: SIMRSVolumeRecord[] = [
  {
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit_layanan: "IGD",
    shift: "Pagi",
    jam_mulai: "07:00",
    jam_selesai: "14:00",
    kapasitas_bed: 0,
    jumlah_pasien_masuk: 28,
    jumlah_pasien_keluar: 27,
    jumlah_pasien_dirawat: 28,
    BOR_unit: 0,
    waiting_time_menit: 47,
    peak_hour_flag: 1
  },
  {
    source_trace_key: "2026-01-01|IGD|Sore",
    tanggal: "2026-01-01",
    unit_layanan: "IGD",
    shift: "Sore",
    jam_mulai: "14:00",
    jam_selesai: "21:00",
    kapasitas_bed: 0,
    jumlah_pasien_masuk: 27,
    jumlah_pasien_keluar: 20,
    jumlah_pasien_dirawat: 27,
    BOR_unit: 0,
    waiting_time_menit: 72,
    peak_hour_flag: 0
  },
  {
    source_trace_key: "2026-01-01|IGD|Malam",
    tanggal: "2026-01-01",
    unit_layanan: "IGD",
    shift: "Malam",
    jam_mulai: "21:00",
    jam_selesai: "07:00",
    kapasitas_bed: 0,
    jumlah_pasien_masuk: 50,
    jumlah_pasien_keluar: 44,
    jumlah_pasien_dirawat: 50,
    BOR_unit: 0,
    waiting_time_menit: 41,
    peak_hour_flag: 0
  }
];

export const simrsDiagnosisMock: SIMRSDiagnosisRecord[] = [
  {
    id_pasien: "PX0001",
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit_layanan: "IGD",
    shift: "Pagi",
    kode_diagnosa_icd10: "A09",
    nama_diagnosa: "Gastroenteritis",
    kelompok_diagnosa: "Infeksi",
    jenis_kasus: "Gawat Darurat",
    risiko_klinis: "Rendah",
    komorbid: "Diabetes"
  },
  {
    id_pasien: "PX0002",
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit_layanan: "IGD",
    shift: "Pagi",
    kode_diagnosa_icd10: "A09",
    nama_diagnosa: "Gastroenteritis",
    kelompok_diagnosa: "Infeksi",
    jenis_kasus: "Gawat Darurat",
    risiko_klinis: "Rendah",
    komorbid: "Diabetes"
  },
  {
    id_pasien: "PX0003",
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit_layanan: "IGD",
    shift: "Pagi",
    kode_diagnosa_icd10: "J18",
    nama_diagnosa: "Pneumonia",
    kelompok_diagnosa: "Respirasi",
    jenis_kasus: "Gawat Darurat",
    risiko_klinis: "Sedang",
    komorbid: "Diabetes"
  }
];

export const simrsAcuityMock: SIMRSAcuityRecord[] = [
  {
    id_pasien: "PX0001",
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit_layanan: "IGD",
    shift: "Pagi",
    triase_igd: "Hijau",
    level_perawatan: "Rawat Biasa",
    acuity_score: 1,
    status_kritis: "Tidak",
    butuh_monitoring_ketat: "Tidak",
    jumlah_tindakan: 2,
    order_lab_radiologi: 1,
    lama_rawat_hari: 1.2
  },
  {
    id_pasien: "PX0002",
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit_layanan: "IGD",
    shift: "Pagi",
    triase_igd: "Hijau",
    level_perawatan: "Rawat Biasa",
    acuity_score: 1,
    status_kritis: "Tidak",
    butuh_monitoring_ketat: "Tidak",
    jumlah_tindakan: 2,
    order_lab_radiologi: 1,
    lama_rawat_hari: 1.2
  },
  {
    id_pasien: "PX0003",
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit_layanan: "IGD",
    shift: "Pagi",
    triase_igd: "Kuning",
    level_perawatan: "Rawat Biasa",
    acuity_score: 3,
    status_kritis: "Tidak",
    butuh_monitoring_ketat: "Ya",
    jumlah_tindakan: 6,
    order_lab_radiologi: 3,
    lama_rawat_hari: 3.6
  }
];

export const hrisAttendanceMock: HRISAttendanceRecord[] = [
  {
    id_pegawai: "STF006",
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit_kerja: "IGD",
    shift: "Pagi",
    profesi: "Dokter",
    jam_masuk_aktual: null,
    jam_pulang_aktual: null,
    status_absensi: "Hadir",
    durasi_kerja_aktual_jam: 7,
    lembur_menit: 0,
    keterlambatan_menit: 0,
    sick_leave_flag: 0
  },
  {
    id_pegawai: "STF007",
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit_kerja: "IGD",
    shift: "Pagi",
    profesi: "Perawat",
    jam_masuk_aktual: null,
    jam_pulang_aktual: null,
    status_absensi: "Hadir",
    durasi_kerja_aktual_jam: 7,
    lembur_menit: 0,
    keterlambatan_menit: 0,
    sick_leave_flag: 0
  },
  {
    id_pegawai: "STF008",
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit_kerja: "IGD",
    shift: "Pagi",
    profesi: "Perawat",
    jam_masuk_aktual: null,
    jam_pulang_aktual: null,
    status_absensi: "Hadir",
    durasi_kerja_aktual_jam: 7.5,
    lembur_menit: 30,
    keterlambatan_menit: 0,
    sick_leave_flag: 0
  }
];

export const hrisScheduleMock: HRISScheduleRecord[] = [
  {
    id_jadwal: "J00001",
    source_trace_key: "2026-01-01|IGD|Pagi",
    id_pegawai: "STF006",
    tanggal_shift: "2026-01-01",
    unit_penempatan: "IGD",
    jenis_shift: "Pagi",
    jam_mulai_shift: "07:00",
    jam_selesai_shift: "14:00",
    profesi: "Dokter",
    skill_level: 3,
    status_kontrak: "Tetap",
    durasi_shift_jam: 7,
    shift_malam_berturut: 0,
    hari_kerja_berturut: 1,
    jarak_antar_shift_jam: 24,
    quick_return_flag: 0,
    riwayat_tukar_shift: 0
  },
  {
    id_jadwal: "J00002",
    source_trace_key: "2026-01-01|IGD|Pagi",
    id_pegawai: "STF007",
    tanggal_shift: "2026-01-01",
    unit_penempatan: "IGD",
    jenis_shift: "Pagi",
    jam_mulai_shift: "07:00",
    jam_selesai_shift: "14:00",
    profesi: "Perawat",
    skill_level: 4,
    status_kontrak: "Tetap",
    durasi_shift_jam: 7,
    shift_malam_berturut: 0,
    hari_kerja_berturut: 3,
    jarak_antar_shift_jam: 8,
    quick_return_flag: 1,
    riwayat_tukar_shift: 0
  },
  {
    id_jadwal: "J00003",
    source_trace_key: "2026-01-01|IGD|Pagi",
    id_pegawai: "STF008",
    tanggal_shift: "2026-01-01",
    unit_penempatan: "IGD",
    jenis_shift: "Pagi",
    jam_mulai_shift: "07:00",
    jam_selesai_shift: "14:00",
    profesi: "Perawat",
    skill_level: 3,
    status_kontrak: "Tetap",
    durasi_shift_jam: 7,
    shift_malam_berturut: 0,
    hari_kerja_berturut: 5,
    jarak_antar_shift_jam: 24,
    quick_return_flag: 0,
    riwayat_tukar_shift: 0
  }
];

export const aiShiftingMock: AIShiftingRecord[] = [
  {
    source_trace_key: "2026-01-01|IGD|Pagi",
    tanggal: "2026-01-01",
    unit: "IGD",
    shift: "Pagi",
    BOR_unit: 0,
    patient_volume: 28,
    waiting_time_menit: 47,
    avg_severity: 1.67,
    high_risk_patient_count: 0,
    critical_patient_count: 0,
    monitoring_need_count: 1,
    diagnosis_complexity_index: 4,
    avg_actions_per_patient: 3.33,
    avg_lab_radiology_order: 1.67,
    avg_length_of_stay: 2,
    staff_scheduled: 4,
    staff_present: 4,
    absence_rate: 0,
    overtime_hours: 1,
    late_minutes: 0,
    avg_skill_level: 3.25,
    skill_mix_index: 0.25,
    night_shift_flag: 0,
    avg_consecutive_night_shifts: 0,
    avg_working_hours_last7days: 7.25,
    patient_to_staff_ratio: 7,
    acuity_adjusted_load: 46.67,
    staffing_standard_load: 10,
    required_staff_next_shift: 5,
    staffing_gap: 1,
    fatigue_score: 9.49,
    burnout_risk_score: 0.189,
    burnout_risk_category: "Rendah",
    shift_efficiency_score: 86.32,
    cost_efficiency_index: 84.27,
    recommendation_label: "Optimal"
  },
  {
    source_trace_key: "2026-01-01|IGD|Sore",
    tanggal: "2026-01-01",
    unit: "IGD",
    shift: "Sore",
    BOR_unit: 0,
    patient_volume: 27,
    waiting_time_menit: 72,
    avg_severity: 2.67,
    high_risk_patient_count: 1,
    critical_patient_count: 1,
    monitoring_need_count: 2,
    diagnosis_complexity_index: 6,
    avg_actions_per_patient: 5.33,
    avg_lab_radiology_order: 2.67,
    avg_length_of_stay: 3.2,
    staff_scheduled: 4,
    staff_present: 3,
    absence_rate: 0.25,
    overtime_hours: 0,
    late_minutes: 0,
    avg_skill_level: 3,
    skill_mix_index: 0.25,
    night_shift_flag: 0,
    avg_consecutive_night_shifts: 0,
    avg_working_hours_last7days: 5.25,
    patient_to_staff_ratio: 9,
    acuity_adjusted_load: 72,
    staffing_standard_load: 10,
    required_staff_next_shift: 8,
    staffing_gap: 5,
    fatigue_score: 7.34,
    burnout_risk_score: 0.243,
    burnout_risk_category: "Rendah",
    shift_efficiency_score: 47.72,
    cost_efficiency_index: 63.94,
    recommendation_label: "Add Staff"
  },
  {
    source_trace_key: "2026-01-01|IGD|Malam",
    tanggal: "2026-01-01",
    unit: "IGD",
    shift: "Malam",
    BOR_unit: 0,
    patient_volume: 50,
    waiting_time_menit: 41,
    avg_severity: 2.33,
    high_risk_patient_count: 0,
    critical_patient_count: 0,
    monitoring_need_count: 2,
    diagnosis_complexity_index: 5,
    avg_actions_per_patient: 4.67,
    avg_lab_radiology_order: 2.33,
    avg_length_of_stay: 2.8,
    staff_scheduled: 3,
    staff_present: 3,
    absence_rate: 0,
    overtime_hours: 0.5,
    late_minutes: 0,
    avg_skill_level: 3,
    skill_mix_index: 0,
    night_shift_flag: 1,
    avg_consecutive_night_shifts: 1.67,
    avg_working_hours_last7days: 10.17,
    patient_to_staff_ratio: 16.67,
    acuity_adjusted_load: 116.67,
    staffing_standard_load: 10,
    required_staff_next_shift: 12,
    staffing_gap: 9,
    fatigue_score: 18.77,
    burnout_risk_score: 0.351,
    burnout_risk_category: "Rendah",
    shift_efficiency_score: 17.47,
    cost_efficiency_index: 34.72,
    recommendation_label: "Add Staff"
  }
];

export const weeklySchedule = [
  { name: "Ns. Sarah (ICU)", mon: "P", tue: "P", wed: "S", thu: "S", fri: "O", sat: "O", sun: "P" },
  { name: "Ns. Budi (IGD)", mon: "S", tue: "S", wed: "M", thu: "M", fri: "O", sat: "O", sun: "S" },
  { name: "Ns. Siti (Rawat Inap)", mon: "M", tue: "M", wed: "O", thu: "O", fri: "P", sat: "P", sun: "M" }
];

export const shiftSwapRequests = [
  { id: "SWAP-001", unit: "IGD", requester: "Ns. Budi", fromShift: "Malam (Senin)", toShift: "Pagi (Selasa)", reason: "Urusan keluarga", aiScore: 92, aiRecommendation: "Approved", conflict: "Tidak ada pelanggaran hard constraints." }
];

export const staffSkillMatrix = [
  { name: "Ns. Sarah", unit: "ICU", contract: "Tetap", acls: 5, vent: 4, icu: 5, peds: 2, triage: 3, fatigueScore: 45 },
  { name: "Ns. Budi", unit: "IGD", contract: "Kontrak", acls: 4, vent: 2, icu: 2, peds: 3, triage: 5, fatigueScore: 82 }
];

export const whatIfScenarios = [
  { id: "SCN-001", title: "Lonjakan Pasien +30%", status: "Active", description: "Simulasi lonjakan pasien akibat wabah DBD di IGD dan Rawat Inap.", impact: { fatigue: "+15%", nch: "-20%", cost: "+Rp 4.5M" } }
];

export const aiEngines = [
  { name: "Demand Forecasting", status: "Active", output: "Prediksi lonjakan pasien IGD pukul 14:00.", confidence: 92, model: "LSTM-Prophet" },
  { name: "Smart Rostering", status: "Active", output: "Jadwal optimal untuk minggu ke-2.", confidence: 88, model: "Constraint-Opt" },
  { name: "Burnout Scoring", status: "Active", output: "3 staf berisiko tinggi (Fatigue > 80).", confidence: 95, model: "XGBoost-Class" }
];

// Placeholder dummy exports to fix missing imports in some pages not deeply refactored
export const rosterConstraints = {
  hard: [
    { label: "Maksimal jam kerja berturut-turut", active: true },
    { label: "Jarak minimum antar shift 11 jam", active: true }
  ],
  soft: [
    { label: "Minimalkan shift malam berturut-turut", active: true }
  ]
};

export const executiveInsights = [
  { title: "Insiden Keselamatan Pasien", value: "0", isGood: true, trend: "-100%", period: "bulan" },
  { title: "Penghematan Biaya Lembur", value: "Rp 12.5M", isGood: true, trend: "+15%", period: "bulan" },
  { title: "Turnover Perawat (Burnout)", value: "1.2%", isGood: true, trend: "-2%", period: "tahun" },
  { title: "Efisiensi Penempatan Staf", value: "94%", isGood: true, trend: "+8%", period: "bulan" }
];
