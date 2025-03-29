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

interface POK {
  grup: string;
  detail: string;
  paguAwal: number;
  paguRevisi: number;
  paguBooked: number;
  paguReali: number;
  selfBlocking: number;
  paguSisa: number;
  sumber: string;
  kodeBeban: string;
  jenisP: string;
  hargaSatuan: number;
  volume: number;
  satuan: string;
  tipeForm: string;
  ppk: string;
  unitKerja: string;
  status: "terpakai" | "revisi" | "tidak_terpakai"; // ✅ Tambah properti status
}

export const columns: ColumnDef<POK>[] = [
  // {
  //   accessorKey: "checkbox",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected()
  //           ? true
  //           : table.getIsSomePageRowsSelected()
  //           ? "indeterminate"
  //           : false
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // ✅ Tambahkan kolom status setelah checkbox
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as POK["status"];

      const statusMap: Record<
  POK["status"],
  { label: string; color: string }
> = {
  terpakai: { label: "Terpakai", color: "text-green-600 bg-green-100" },
  revisi: { label: "Revisi", color: "text-yellow-600 bg-yellow-100" },
  tidak_terpakai: { label: "Tak Terpakai", color: "text-red-600 bg-red-100" },
};

const { label, color } = statusMap[status];

return (
  <Badge variant="outline" className={color}>
    {label}
  </Badge>
);
    },
  },
  {
    accessorKey: "grup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GRUP POK" />
    ),
    cell: ({ row }) => <div>{row.getValue("grup")}</div>,
  },
  {
    accessorKey: "detail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DETAIL" />
    ),
    cell: ({ row }) => <div>{row.getValue("detail")}</div>,
  },
  {
    accessorKey: "paguAwal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAGU AWAL" />
    ),
    cell: ({ row }) => <div>{row.getValue("paguAwal")}</div>,
  },
  {
    accessorKey: "paguRevisi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAGU REVISI" />
    ),
    cell: ({ row }) => <div>{row.getValue("paguRevisi")}</div>,
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
    accessorKey: "selfBlocking",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SELF BLOCKING" />
    ),
    cell: ({ row }) => <div>{row.getValue("selfBlocking")}</div>,
  },
  {
    accessorKey: "paguSisa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAGU SISA" />
    ),
    cell: ({ row }) => <div>{row.getValue("paguSisa")}</div>,
  },
  {
    accessorKey: "sumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SUMBER DANA" />
    ),
    cell: ({ row }) => <div>{row.getValue("sumber")}</div>,
  },
  {
    accessorKey: "kodeBeban",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KODE BEBAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("kodeBeban")}</div>,
  },
  {
    accessorKey: "jenisP",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JENIS PENGADAAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("jenisP")}</div>,
  },
  {
    accessorKey: "hargaSatuan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="HARGA SATUAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("hargaSatuan")}</div>,
  },
  {
    accessorKey: "volume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VOLUME" />
    ),
    cell: ({ row }) => <div>{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "satuan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SATUAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("satuan")}</div>,
  },
  {
    accessorKey: "tipeForm",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TIPE FORM" />
    ),
    cell: ({ row }) => <div>{row.getValue("tipeForm")}</div>,
  },
  {
    accessorKey: "ppk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PPK" />
    ),
    cell: ({ row }) => <div>{row.getValue("ppk")}</div>,
  },
  {
    accessorKey: "unitKerja",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UNIT KERJA" />
    ),
    cell: ({ row }) => <div>{row.getValue("unitKerja")}</div>,
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
          icon={ClockIcon}
        >
          Riwayat
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

// ✅ Update data pegawais
export const pegawais: POK[] = [
  {
    grup: "Belanja Pegawai",
    detail: "Gaji dan Tunjangan",
    paguAwal: 500000000,
    paguRevisi: 520000000,
    paguBooked: 100000000,
    paguReali: 90000000,
    selfBlocking: 2000000,
    paguSisa: 328000000,
    sumber: "RM",
    kodeBeban: "51",
    jenisP: "Kontraktual",
    hargaSatuan: 1000000,
    volume: 50,
    satuan: "Orang",
    tipeForm: "Form A",
    ppk: "PPK A",
    unitKerja: "Bagian Umum",
    status: "terpakai", // ✅
  },
  {
    grup: "Belanja Barang",
    detail: "Pengadaan ATK",
    paguAwal: 20000000,
    paguRevisi: 25000000,
    paguBooked: 5000000,
    paguReali: 4000000,
    selfBlocking: 500000,
    paguSisa: 15500000,
    sumber: "PNBP",
    kodeBeban: "52",
    jenisP: "Swakelola",
    hargaSatuan: 50000,
    volume: 100,
    satuan: "Pcs",
    tipeForm: "Form B",
    ppk: "PPK B",
    unitKerja: "Bagian Keuangan",
    status: "revisi", // ✅
  },
  {
    grup: "Belanja Modal",
    detail: "Pengadaan Komputer",
    paguAwal: 100000000,
    paguRevisi: 95000000,
    paguBooked: 20000000,
    paguReali: 18000000,
    selfBlocking: 1000000,
    paguSisa: 56000000,
    sumber: "APBN",
    kodeBeban: "53",
    jenisP: "Kontraktual",
    hargaSatuan: 15000000,
    volume: 5,
    satuan: "Unit",
    tipeForm: "Form C",
    ppk: "PPK C",
    unitKerja: "Bagian TI",
    status: "tidak_terpakai", // ✅
  },
];
