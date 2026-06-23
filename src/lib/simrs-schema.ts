export const simrsVolumeSchema = [
  "source_trace_key",
  "tanggal",
  "unit_layanan",
  "shift",
  "jam_mulai",
  "jam_selesai",
  "kapasitas_bed",
  "jumlah_pasien_masuk",
  "jumlah_pasien_keluar",
  "jumlah_pasien_dirawat",
  "BOR_unit",
  "waiting_time_menit",
  "peak_hour_flag"
];

export const simrsDiagnosisSchema = [
  "id_pasien",
  "source_trace_key",
  "tanggal",
  "unit_layanan",
  "shift",
  "kode_diagnosa_icd10",
  "nama_diagnosa",
  "kelompok_diagnosa",
  "jenis_kasus",
  "risiko_klinis",
  "komorbid"
];

export const simrsAcuitySchema = [
  "id_pasien",
  "source_trace_key",
  "tanggal",
  "unit_layanan",
  "shift",
  "triase_igd",
  "level_perawatan",
  "acuity_score",
  "status_kritis",
  "butuh_monitoring_ketat",
  "jumlah_tindakan",
  "order_lab_radiologi",
  "lama_rawat_hari"
];
