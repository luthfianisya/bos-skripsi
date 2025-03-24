"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ClockIcon } from "@heroicons/react/24/outline"
import { EyeIcon } from "@heroicons/react/24/solid"

interface Realisasi {
  noPermintaan: string;
  noSurat: string;
  paguBooked: number;
  paguReali: number;
  keterangan: string;
}

export const columns: ColumnDef<Realisasi>[] = [
  {
    accessorKey: "noPermintaan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NOMOR PERMINTAAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("noPermintaan")}</div>,
  },
  {
    accessorKey: "noSurat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NOMOR SURAT" />
    ),
    cell: ({ row }) => <div>{row.getValue("noSurat")}</div>,
  },
  {
    accessorKey: "paguBooked",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAGU BOOKED" />
    ),
    cell: ({ row }) => <div>{row.getValue("paguBooked")}</div>,
  },
  {
    accessorKey: "paguReali",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAGU REALISASI" />
    ),
    cell: ({ row }) => <div>{row.getValue("paguReali")}</div>,
  },
  {
    accessorKey: "keterangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KETERANGAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("keterangan")}</div>,
  },
  {
    accessorKey: "aksi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AKSI" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          size="sm"
          variant="outline"
          icon={EyeIcon}
        >
          Detail
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

// Contoh data Realisasi
export const realisasis: Realisasi[] = [
  {
    noPermintaan: "Belanja Pegawai",
    noSurat: "Gaji dan Tunjangan",
    paguBooked: 100000000,
    paguReali: 90000000,
    keterangan: "Orang",
  },
  {
    noPermintaan: "Belanja Barang",
    noSurat: "Pengadaan ATK",
    paguBooked: 5000000,
    paguReali: 4000000,
    keterangan: "Pcs",
  },
  {
    noPermintaan: "Belanja Modal",
    noSurat: "Pengadaan Komputer",
    paguBooked: 20000000,
    paguReali: 18000000,
    keterangan: "Unit",
  },
];
