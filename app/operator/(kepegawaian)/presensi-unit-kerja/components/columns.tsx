"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface Presensi {
  id: number;
  tanggal: string;
  masuk: string;
  pulang: string;
  status: string;
  kodeAbsen: string;
  terlambatKe: string;
  keterangan: string;
  diperbarui: string;
}

export const columns: ColumnDef<Presensi>[] = [
  {
    accessorKey: "tanggal",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="HARI/TANGGAL"
      />
    ),
    cell: ({ row }) => <div>{row.getValue("tanggal")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "masuk",
    header: ({ column }) => <DataTableColumnHeader column={column} title="MASUK" />,
    cell: ({ row }) => <div>{row.getValue("masuk")}</div>,
  },
  {
    accessorKey: "pulang",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PULANG" />,
    cell: ({ row }) => <div>{row.getValue("pulang")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS" />,
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    accessorKey: "kodeAbsen",
    header: ({ column }) => <DataTableColumnHeader column={column} title="KODE ABSEN" />,
    cell: ({ row }) => <div>{row.getValue("kodeAbsen")}</div>,
  },
  {
    accessorKey: "terlambatKe",
    header: ({ column }) => <DataTableColumnHeader column={column} title="TERLAMBAT KE-" />,
    cell: ({ row }) => <div>{row.getValue("terlambatKe")}</div>,
  },
  {
    accessorKey: "keterangan",
    header: ({ column }) => <DataTableColumnHeader column={column} title="KETERANGAN" />,
    cell: ({ row }) => <div>{row.getValue("keterangan")}</div>,
  },
  {
    accessorKey: "diperbarui",
    header: ({ column }) => <DataTableColumnHeader column={column} title="DIPERBAHARUI" />,
    cell: ({ row }) => <div>{row.getValue("diperbarui")}</div>,
  },
  // {
  //   accessorKey: "aksi",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
  //   cell: ({ row }) => (
  //     <div className="flex gap-3 justify-end">
  //       <Button size="icon" variant="outline" className="h-7 w-7">
  //         <Icon icon="heroicons:pencil-square" className="h-4 w-4" />
  //       </Button>
  //       <Button size="icon" variant="outline" className="h-7 w-7" color="destructive">
  //         <Icon icon="heroicons:trash" className="h-4 w-4" />
  //       </Button>
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
];

// Data dummy absensi
export const presensiData: Presensi[] = [
  {
    id: 1,
    tanggal: "Senin, 04 Maret 2024",
    masuk: "08:05",
    pulang: "16:30",
    status: "Hadir",
    kodeAbsen: "A123",
    terlambatKe: "1",
    keterangan: "Terlambat 5 menit",
    diperbarui: "04 Maret 2024 17:00",
  },
  {
    id: 2,
    tanggal: "Selasa, 05 Maret 2024",
    masuk: "07:55",
    pulang: "16:30",
    status: "Hadir",
    kodeAbsen: "A124",
    terlambatKe: "0",
    keterangan: "-",
    diperbarui: "05 Maret 2024 17:00",
  },
  {
    id: 3,
    tanggal: "Rabu, 06 Maret 2024",
    masuk: "08:10",
    pulang: "16:30",
    status: "Hadir",
    kodeAbsen: "A125",
    terlambatKe: "2",
    keterangan: "Terlambat 10 menit",
    diperbarui: "06 Maret 2024 17:00",
  },
];
