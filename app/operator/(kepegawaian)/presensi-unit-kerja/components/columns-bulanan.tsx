"use client";

import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

interface PresensiBulanan {
  id: number;
  nama: string;
  nip: string;
  [key: string]: string | number;
}

const generateDateColumns = (): ColumnDef<PresensiBulanan>[] => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  
  return Array.from({ length: daysInMonth }, (_, i) => ({
    accessorKey: (i + 1).toString().padStart(2, "0"),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={(i + 1).toString().padStart(2, "0")} />
    ),
    cell: ({ row }) => <div>{row.getValue((i + 1).toString().padStart(2, "0"))}</div>,
  }));
};

export const columnsBulanan: ColumnDef<PresensiBulanan>[] = [
  {
    accessorKey: "nama",
    header: ({ column }) => <DataTableColumnHeader column={column} title="NAMA" />,
    cell: ({ row }) => <div>{row.getValue("nama")}</div>,
  },
  {
    accessorKey: "nip",
    header: ({ column }) => <DataTableColumnHeader column={column} title="NIP" />,
    cell: ({ row }) => <div>{row.getValue("nip")}</div>,
  },
  ...generateDateColumns(),
];
