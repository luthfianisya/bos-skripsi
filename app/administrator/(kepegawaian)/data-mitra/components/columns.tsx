"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface Mitra {
  id: number;
  nama: string;
  nip: string;
  organisasi: string;
  eselon?: string;
  gol?: string;
  instansi?: string;
  jabatan?: string;
  email: string;
  wilayah: string;
}

export const columns: ColumnDef<Mitra>[] = [
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="NAMA"
      />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-3">
          {/* Jika ingin menggunakan avatar, uncomment bagian berikut */}
          {/* <Avatar className="rounded-full">
            <AvatarImage src={user.avatar} alt={user.nama} />
            <AvatarFallback>{user.nama?.charAt(0)}</AvatarFallback>
          </Avatar> */}
          <div>
            <span className="text-sm block text-card-foreground font-medium">
              {user.nama}
            </span>
            <span className="text-xs mt-1 block font-normal text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "nip",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIP" />
    ),
    cell: ({ row }) => <div>{row.getValue("nip")}</div>,
  },
  {
    accessorKey: "organisasi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ORGANISASI" />
    ),
    cell: ({ row }) => <div>{row.getValue("organisasi")}</div>,
  },
  {
    accessorKey: "eselon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ESELON" />
    ),
    cell: ({ row }) => <div>{row.getValue("eselon")}</div>,
  },
  {
    accessorKey: "gol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GOLONGAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("gol")}</div>,
  },
  {
    accessorKey: "instansi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="INSTANSI" />
    ),
    cell: ({ row }) => <div>{row.getValue("instansi")}</div>,
  },
  {
    accessorKey: "jabatan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JABATAN" />
    ),
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("jabatan")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EMAIL" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "wilayah",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="WILAYAH TUGAS" />
    ),
    cell: ({ row }) => <div>{row.getValue("wilayah")}</div>,
  },
  {
    accessorKey: "aksi",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="AKSI"
      />
    ),
    cell: ({ row }) => (
      <div className="flex gap-3 justify-end">
        <Button
          size="icon"
          variant="outline"
          color="warning"
          className="h-7 w-7"
        >
          <Icon icon="heroicons:pencil-square" className="h-4 w-4" />
        </Button>
        {/* <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          color="secondary"
        >
          <Icon icon="heroicons:eye" className="h-4 w-4" />
        </Button> */}
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          color="destructive"
        >
          <Icon icon="heroicons:trash" className="h-4 w-4" />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

// Data Mitra
export const mitras: Mitra[] = [
  {
    id: 1,
    nama: "Mark Dsuza",
    nip: "123456789",
    organisasi: "BPS Jakarta Pusat",
    eselon: "III",
    gol: "III/B",
    instansi: "BPS",
    jabatan: "Statistisi Ahli Muda",
    email: "mark.dsuza@example.com",
    wilayah: "Jakarta",
  },
  {
    id: 2,
    nama: "Josef Jennyfer",
    nip: "234567890",
    organisasi: "BPS Kota Bandung",
    eselon: "III",
    gol: "III/A",
    instansi: "BPS",
    jabatan: "Statistisi Ahli Pertama",
    email: "josef.jennyfer@example.com",
    wilayah: "Bandung",
  },
  {
    id: 3,
    nama: "Romeo D Custa",
    nip: "345678901",
    organisasi: "BPS Kota Surabaya",
    eselon: "IV",
    gol: "IV/A",
    instansi: "BPS",
    jabatan: "Kepala Bidang Statistik Sosial",
    email: "romeo.custa@example.com",
    wilayah: "Surabaya",
  },
  {
    id: 4,
    nama: "Anald Donald",
    nip: "456789012",
    organisasi: "BPS Kota Medan",
    eselon: "II",
    gol: "II/C",
    instansi: "BPS",
    jabatan: "Statistisi Penyelia",
    email: "anald.donald@example.com",
    wilayah: "Medan",
  },
  {
    id: 5,
    nama: "Vicky Patel",
    nip: "567890123",
    organisasi: "BPS Kota Semarang",
    eselon: "III",
    gol: "III/C",
    instansi: "BPS",
    jabatan: "Statistisi Ahli Muda",
    email: "vicky.patel@example.com",
    wilayah: "Semarang",
  },
];
