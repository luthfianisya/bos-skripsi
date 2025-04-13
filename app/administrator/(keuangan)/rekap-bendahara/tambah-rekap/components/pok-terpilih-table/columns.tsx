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
import { PlusIcon } from "lucide-react";

interface PegawaiDetail {
  nama: string;
  nip: string;
  nomorSpd: string;
  tanggalSpd: string;
  tujuan: string;
  booked: number;
  realisasi: number;
  status: string;
}

export interface FormPOK {
  tipeForm: string;
  detail: string;
  unitKerja: string;
  nomorSurat?: string;
  paguBooked: number;
  paguReali: number;
  nomorPermintaan?: string;
  grup: string;
  details?: PegawaiDetail[]; // ← ini penting buat sub-table
}



const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export const columns: ColumnDef<FormPOK>[] = [
    {
      accessorKey: "checkbox",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "deskripsi",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="DESKRIPSI FORM PERMINTAAN" />
      ),
      cell: ({ row }) => {
        const tipeForm = row.original.tipeForm;
        const detail = row.original.detail;
        return <div>{`${tipeForm} - ${detail}`}</div>;
      },
    },
    {
      accessorKey: "keterangan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="KETERANGAN" />
      ),
      cell: ({ row }) => <div>{row.original.unitKerja}</div>, // bisa diganti field lain
    },
    {
      accessorKey: "nomorSurat",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="NOMOR SURAT" />
      ),
      cell: ({ row }) => <div>{row.original.nomorSurat ?? "-"}</div>,
    },
    {
      accessorKey: "paguBooked",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="BOOKED" />
      ),
      cell: ({ row }) => (
        <div>{formatRupiah(row.getValue<number>("paguBooked"))}</div>
      ),
    },
    {
      accessorKey: "paguReali",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="REALISASI" />
      ),
      cell: ({ row }) => (
        <div>{formatRupiah(row.getValue<number>("paguReali"))}</div>
      ),
    },
    {
      accessorKey: "nomorPermintaan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="NOMOR PERMINTAAN" />
      ),
      cell: ({ row }) => <div>{row.original.nomorPermintaan ?? "-"}</div>,
    },
    {
      accessorKey: "grup",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="GRUP POK" />
      ),
      cell: ({ row }) => <div>{row.getValue("grup")}</div>,
    },  
    {
      accessorKey: "aksi",
      header: ({ column }) => (
        <DataTableColumnHeader className="justify-center" column={column} title="AKSI" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
                  <Button
                    size="icon"
                    className="h-7 w-7"
                    color="primary"
                    icon={PlusIcon}
                  >
                  </Button>
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

// ✅ Update data pegawais
export const pegawais: (FormPOK & { id: string })[] = [
  {
    id: "1",
    tipeForm: "Form A",
    detail: "Gaji dan Tunjangan",
    unitKerja: "Bagian Umum",
    nomorSurat: "123/UM/2024",
    paguBooked: 100000000,
    paguReali: 90000000,
    nomorPermintaan: "001/PER/2024",
    grup: "Belanja Pegawai",
    details: [
      {
        nama: "Budi",
        nip: "198312122008031001",
        nomorSpd: "SPD/001",
        tanggalSpd: "2024-01-15",
        tujuan: "Jakarta",
        booked: 1500000,
        realisasi: 1400000,
        status: "Selesai",
      },
      {
        nama: "Ani",
        nip: "198702182009032002",
        nomorSpd: "SPD/002",
        tanggalSpd: "2024-01-17",
        tujuan: "Bandung",
        booked: 1200000,
        realisasi: 1200000,
        status: "Selesai",
      },
    ],
  },
  {
    id: "1",
    tipeForm: "Form A",
    detail: "Gaji dan Tunjangan",
    unitKerja: "Bagian Umum",
    nomorSurat: "123/UM/2024",
    paguBooked: 100000000,
    paguReali: 90000000,
    nomorPermintaan: "001/PER/2024",
    grup: "Belanja Pegawai",
    details: [
      {
        nama: "Budi",
        nip: "198312122008031001",
        nomorSpd: "SPD/001",
        tanggalSpd: "2024-01-15",
        tujuan: "Jakarta",
        booked: 1500000,
        realisasi: 1400000,
        status: "Selesai",
      },
      {
        nama: "Ani",
        nip: "198702182009032002",
        nomorSpd: "SPD/002",
        tanggalSpd: "2024-01-17",
        tujuan: "Bandung",
        booked: 1200000,
        realisasi: 1200000,
        status: "Selesai",
      },
    ],
  },
];

