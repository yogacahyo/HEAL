export const hrisAttendanceSchema = [
  "id_pegawai",
  "source_trace_key",
  "tanggal",
  "unit_kerja",
  "shift",
  "profesi",
  "jam_masuk_aktual",
  "jam_pulang_aktual",
  "status_absensi",
  "durasi_kerja_aktual_jam",
  "lembur_menit",
  "keterlambatan_menit",
  "sick_leave_flag"
];

export const hrisScheduleSchema = [
  "id_jadwal",
  "source_trace_key",
  "id_pegawai",
  "tanggal_shift",
  "unit_penempatan",
  "jenis_shift",
  "jam_mulai_shift",
  "jam_selesai_shift",
  "profesi",
  "skill_level",
  "status_kontrak",
  "durasi_shift_jam",
  "shift_malam_berturut",
  "hari_kerja_berturut",
  "jarak_antar_shift_jam",
  "quick_return_flag",
  "riwayat_tukar_shift"
];
