"use client";

import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

interface Presensi {
  kode: string;
  keterangan: string;
}

export const columns: ColumnDef<Presensi>[] = [
  {
    accessorKey: "kode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" />
    ),
    cell: ({ row }) => <div>{row.getValue("kode")}</div>,
  },
  {
    accessorKey: "keterangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Keterangan" />
    ),
    cell: ({ row }) => <div>{row.getValue("keterangan")}</div>,
  },
];

export const presensiData: Presensi[] = [
  { kode: "HK", keterangan: "Hari Kerja dalam 1 bulan" },
  { kode: "HD", keterangan: "Hadir dalam 1 bulan" },
  { kode: "TK", keterangan: "Tanpa Kabar" },
  { kode: "TL", keterangan: "Tugas Luar" },
  { kode: "TB", keterangan: "Tugas Belajar" },
  { kode: "PD", keterangan: "Perjalanan Dinas" },
  { kode: "DK", keterangan: "Diklat/Pelatihan" },
  { kode: "KN", keterangan: "Konsinyasi" },
  { kode: "PSW", keterangan: "Pulang Sebelum Waktunya" },
  { kode: "PSW 1", keterangan: "PSW <= 30 menit" },
  { kode: "PSW 2", keterangan: "PSW 30 - 60 menit" },
  { kode: "PSW 3", keterangan: "PSW 60 - 90 menit" },
  { kode: "PSW 4", keterangan: "PSW > 90 atau tidak melakukan absensi" },
  { kode: "HT", keterangan: "Hadir Terlambat atau Jumlah dari TL1+TL2+TL3+TL4" },
  { kode: "TL 1", keterangan: "Keterlambatan <= 30 menit" },
  { kode: "TL 2", keterangan: "Keterlambatan 30 - 60 menit" },
  { kode: "TL 3", keterangan: "Keterlambatan 60 - 90 menit" },
  { kode: "TL 4", keterangan: "Keterlambatan > 90 menit atau tidak melakukan absensi" },
  { kode: "CB", keterangan: "Cuti Besar" },
  { kode: "CL", keterangan: "Cuti LTN" },
  { kode: "CM", keterangan: "Cuti Melahirkan" },
  { kode: "CP", keterangan: "Cuti Penting" },
  { kode: "CS", keterangan: "Cuti Sakit" },
  { kode: "CT 10", keterangan: "Cuti 2 Tahun Lalu" },
  { kode: "CT 11", keterangan: "Cuti Tahun Sekarang" },
  { kode: "CT 12", keterangan: "Cuti Tahun Lalu" },
  { kode: "CS1", keterangan: "Cuti Sakit Tanpa Potongan" },
  { kode: "CP1", keterangan: "Cuti Penting Tanpa Potongan" },
  { kode: "CM1", keterangan: "Cuti Melahirkan Tanpa Potongan" },
  { kode: "CB1", keterangan: "Cuti Besar Tanpa Potongan" },
  { kode: "KJK HT", keterangan: "Kekurangan Jam Kerja Hadir Terlambat (dalam HH:MM)" },
  { kode: "KJK PSW", keterangan: "Kekurangan Jam Kerja Pulang Sebelum Waktunya (dalam HH:MM)" },
  { kode: "KJK", keterangan: "Kekurangan Jam Kerja (KJK HT + KJK PSW)" },
  { kode: "KJK Hari", keterangan: "Kekurangan Jam Kerja (dalam DD:HH:MM)" },
];
