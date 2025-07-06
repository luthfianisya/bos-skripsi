"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";

// Interface baru
interface Pegawai {
  nip: string;
  nama: string;
  netto: number;
  pajak: number;
}

export const columns: ColumnDef<Pegawai>[] = [
  {
    accessorKey: "nip",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIP" />
    ),
    cell: ({ row }) => <div>{row.getValue("nip")}</div>,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAMA" />
    ),
    cell: ({ row }) => <div>{row.getValue("nama")}</div>,
  },
  {
    accessorKey: "netto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NETTO" />
    ),
    cell: ({ row }) => {
      const netto = row.getValue("netto") as number;
      return (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(netto)}
        </div>
      );
    },
  },
  {
    accessorKey: "pajak",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAJAK" />
    ),
    cell: ({ row }) => {
      const pajak = row.getValue("pajak") as number;
      return (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(pajak)}
        </div>
      );
    },
  },
  {
    id: "bruto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BRUTO" />
    ),
    cell: ({ row }) => {
      const netto = row.getValue("netto") as number;
      const pajak = row.getValue("pajak") as number;
      const bruto = netto + pajak;

      return (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(bruto)}
        </div>
      );
    },
  },
  {
    accessorKey: "aksi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AKSI" className="flex justify-center"/>
    ),
    cell: () => (
      <div className="flex gap-3 justify-center">
        {/* <DialogForm />
        <Button
          size="icon"
          variant="outline"
          color="warning"
          className="h-7 w-7"
          icon={PencilSquareIcon}
        /> */}
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

export const pegawais: Pegawai[] = [
  {
    nip: "198312122008031001",
    nama: "Budi Santoso",
    netto: 1800000,
    pajak: 200000,
  },
  {
    nip: "198702182009032002",
    nama: "Siti Aminah",
    netto: 2200000,
    pajak: 250000,
  },
  {
    nip: "197506101998032003",
    nama: "Andi Wijaya",
    netto: 3000000,
    pajak: 400000,
  },
];
