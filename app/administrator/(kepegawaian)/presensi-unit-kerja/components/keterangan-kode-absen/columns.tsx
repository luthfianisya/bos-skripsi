"use client";

import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

interface Presensi {
  kode: string;
  singkatan: string;
  istilah: string;
  deskripsi: string;
}

export const columns: ColumnDef<Presensi>[] = [
  {
    accessorKey: "kode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" />
    ),
    cell: ({ row }) => <div className="w-auto">{row.getValue("kode")}</div>,
  },
  {
    accessorKey: "singkatan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Singkatan" />
    ),
    cell: ({ row }) => <div className="w-auto">{row.getValue("singkatan")}</div>,
  },
  {
    accessorKey: "istilah",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Istilah" />
    ),
    cell: ({ row }) => <div className="w-auto">{row.getValue("istilah")}</div>,
  },
  {
    accessorKey: "deskripsi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deskripsi" />
    ),
    cell: ({ row }) => (
      <div className="w-full flex-grow">{row.getValue("deskripsi")}</div>
    ),
  },
];

export const presensiData: Presensi[] = [
  { kode: "10", singkatan: "CT", istilah: "CUTI 2 TAHUN LALU", deskripsi: "CT10, Cuti yang dapat digunakan PNS jika selama 3 tahun terakhir belum pernah menggunakan cuti tahunan dan cuti besar" },
  { kode: "11", singkatan: "CT", istilah: "CUTI TAHUN SEKARANG", deskripsi: "CT11, Cuti yang tersedia untuk tahun ini" },
  { kode: "12", singkatan: "CT", istilah: "CUTI TAHUN LALU", deskripsi: "CT12, Cuti tahun lalu N-1 yang masih dapat digunakan" },
  { kode: "13", singkatan: "CP", istilah: "CUTI PENTING", deskripsi: "Cuti untuk keperluan pernikahan atau kondisi kedaruratan lainnya" },
  { kode: "14", singkatan: "CM", istilah: "CUTI MELAHIRKAN", deskripsi: "Cuti untuk persalinan 1 s.d. 3 untuk PNS" },
  { kode: "15", singkatan: "CB", istilah: "CUTI BESAR", deskripsi: "Cuti bagi PNS dengan masa kerja = 5 tahun" },
  { kode: "16", singkatan: "CS", istilah: "CUTI SAKIT", deskripsi: "Cuti bagi PNS yang sakit dengan melampirkan surat keterangan medis" },
  { kode: "17", singkatan: "CL", istilah: "CUTI LTN", deskripsi: "Cuti bagi PNS dengan masa kerja = 5 tahun dengan status PNS nya terputus dari semua kewajiban dan hak" },
  { kode: "18", singkatan: "CST1", istilah: "CUTI SETENGAH HARI PAGI", deskripsi: "Cuti bagi PNS karena keperluannya, melakukan presensi masuk bekerja paling lambat pukul 12.30 dan presensi pulang bekerja paling cepat jam 16.00 (Senin-Kamis) dan 16.30 (Jumat)" },
  { kode: "19", singkatan: "CST2", istilah: "CUTI SETENGAH HARI SIANG", deskripsi: "Cuti bagi PNS karena keperluannya, melakukan presensi masuk bekerja paling lambat pukul 07.30 dan presensi pulang bekerja paling cepat jam 12.00" },
  { kode: "21", singkatan: "TK", istilah: "TANPA KABAR", deskripsi: "Pegawai tidak hadir di kantor tanpa keterangan. Pegawai tidak melakukan presensi" },
  { kode: "32", singkatan: "CS1", istilah: "CUTI SAKIT TANPA POTONGAN", deskripsi: "Cuti untuk pegawai yang sakit dengan surat dokter minimal 3 hari atau menjalani rawat inap minimal 3 hari" },
  { kode: "33", singkatan: "CP1", istilah: "CUTI PENTING TANPA POTONGAN", deskripsi: "Cuti alasan penting dengan durasi 3-14 hari kerja" },
  { kode: "34", singkatan: "CM1", istilah: "CUTI MELAHIRKAN TANPA POTONGAN", deskripsi: "Cuti untuk persalinan anak ke 1 s.d. 3 tanpa potongan tunjangan kinerja" },
  { kode: "35", singkatan: "CB1", istilah: "CUTI BESAR TANPA POTONGAN", deskripsi: "Cuti bagi PNS dengan masa kerja = 5 tahun dengan alasan melahirkan anak ke 4, ibadah haji, dan ibadah agama lain" },
  { kode: "40", singkatan: "KN", istilah: "KONSINYASI", deskripsi: "Tugas dinas dalam rangka konsinyering pembiayaan instansi lain, blok presensi di kepegawaian" },
  { kode: "41", singkatan: "TD", istilah: "TUGAS DAERAH", deskripsi: "Tugas dinas keluar daerah pembiayaan instansi lain, blok presensi di kepegawaian" },
  { kode: "42", singkatan: "TL", istilah: "TUGAS LUAR", deskripsi: "Tugas dinas dalam kota, pembiayaan internal ataupun instansi lain" },
  { kode: "43", singkatan: "DL", istilah: "DINAS LUAR NEGERI", deskripsi: "Tugas dinas ke luar negeri pembiayaan internal. Kode absen ini digunakan untuk Form Permintaan tipe JLN sub tipe form Luar Negeri" },
  { kode: "45", singkatan: "PD", istilah: "PERJALANAN DINAS", deskripsi: "Tugas dinas dengan pembiayaan internal. Kode absen ini digunakan khusus untuk Realisasi Form Permintaan tipe form Perjalanan Dinas (JLN)" },
];