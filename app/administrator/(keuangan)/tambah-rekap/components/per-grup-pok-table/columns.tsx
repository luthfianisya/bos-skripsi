"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";

// Interface baru
interface Pegawai {
  grupPok: string;
  booked: number;
  realisasi: number;
  netto: number;
  pajak: number;
}

export const columns: ColumnDef<Pegawai>[] = [
  {
    accessorKey: "grupPok",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GRUP POK" />
    ),
    cell: ({ row }) => <div>{row.getValue("grupPok")}</div>,
  },
  {
    accessorKey: "booked",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BOOKED" />
    ),
    cell: ({ row }) => {
      const booked = row.getValue("booked") as number;
      return (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(booked)}
        </div>
      );
    },
  },
  {
    accessorKey: "realisasi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REALISASI" />
    ),
    cell: ({ row }) => {
      const realisasi = row.getValue("realisasi") as number;
      return (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(realisasi)}
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
    accessorKey: "aksi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AKSI" />
    ),
    cell: () => (
      <div className="flex gap-3 justify-end">
        <Button
          size="icon"
          variant="outline"
          color="warning"
          className="h-7 w-7"
          icon={PencilSquareIcon}
        />
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
    grupPok: "A.1.1",
    booked: 5000000,
    realisasi: 4800000,
    netto: 4500000,
    pajak: 300000,
  },
  {
    grupPok: "B.2.3",
    booked: 3500000,
    realisasi: 3400000,
    netto: 3200000,
    pajak: 200000,
  },
  {
    grupPok: "C.4.2",
    booked: 4200000,
    realisasi: 4100000,
    netto: 3900000,
    pajak: 300000,
  },
];
