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

interface FormPOK {
  tipeForm: string;          // untuk kolom DESKRIPSI
  detail: string;            // untuk kolom DESKRIPSI
  unitKerja: string;         // untuk kolom KETERANGAN
  nomorSurat?: string;       // untuk kolom NOMOR SURAT
  paguBooked: number;        // untuk kolom BOOKED
  paguReali: number;         // untuk kolom REALISASI
  nomorPermintaan?: string;  // untuk kolom NOMOR PERMINTAAN
  grup: string;              // untuk kolom GRUP POK
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
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
];

// ✅ Update data pegawais
export const pegawais: FormPOK[] = [
  {
    tipeForm: "Form A",
    detail: "Gaji dan Tunjangan",
    unitKerja: "Bagian Umum",
    nomorSurat: "123/UM/2024",
    paguBooked: 100000000,
    paguReali: 90000000,
    nomorPermintaan: "001/PER/2024",
    grup: "Belanja Pegawai",
  },
  {
    tipeForm: "Form B",
    detail: "Pengadaan ATK",
    unitKerja: "Bagian Keuangan",
    nomorSurat: "456/KEU/2024",
    paguBooked: 5000000,
    paguReali: 4000000,
    nomorPermintaan: "002/PER/2024",
    grup: "Belanja Barang",
  },
  {
    tipeForm: "Form C",
    detail: "Pengadaan Komputer",
    unitKerja: "Bagian TI",
    nomorSurat: "789/TI/2024",
    paguBooked: 20000000,
    paguReali: 18000000,
    nomorPermintaan: "003/PER/2024",
    grup: "Belanja Modal",
  },
];
