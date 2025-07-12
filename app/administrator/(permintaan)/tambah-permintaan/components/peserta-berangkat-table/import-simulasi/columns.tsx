"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { CalculatorIcon } from "@heroicons/react/24/solid";
import { Icon } from "@iconify/react";
import { PencilIcon } from "lucide-react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { SimulasiPerjalanan } from "@/lib/interface";

// Interface baru sesuai kebutuhan



export const columns: ColumnDef<SimulasiPerjalanan>[] = [
   {
    accessorKey: "nama",
    header: "Nama",
    cell: ({ row }) => row.getValue("nama"),
  },
   {
    accessorKey: "asal",
    header: "Asal",
    cell: ({ row }) => row.getValue("asal"),
  },
  {
    accessorKey: "tujuan",
    header: "Tujuan",
    cell: ({ row }) => row.getValue("tujuan"),
  },
  {
    accessorKey: "tanggalPergi",
    header: "Pergi",
    cell: ({ row }) => {
      const tanggal = row.getValue("tanggalPergi");
      return new Date(tanggal as string).toLocaleDateString("id-ID");
    },
  },
  {
    accessorKey: "tanggalPulang",
    header: "Pulang",
    cell: ({ row }) => {
      const tanggal = row.getValue("tanggalPulang");
      return new Date(tanggal as string).toLocaleDateString("id-ID");
    },
  },
  {
    accessorKey: "lamaHari",
    header: "Lama Hari",
    cell: ({ row }) => {
      const pergi = new Date(row.original.tanggalPergi);
      const pulang = new Date(row.original.tanggalPulang);
      const diff = Math.ceil((pulang.getTime() - pergi.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return `${diff} hari`;
    },
  },
  {
    accessorKey: "transportPergi",
    header: "Transport Pergi",
    cell: ({ row }) => row.getValue("transportPergi"),
  },
  {
    accessorKey: "transportPulang",
    header: "Transport Pulang",
    cell: ({ row }) => row.getValue("transportPulang"),
  },
  {
    accessorKey: "taksiAsal",
    header: "Taksi Asal",
    cell: ({ row }) => row.getValue("taksiAsal"),
  },
  {
    accessorKey: "taksiTujuan",
    header: "Taksi Tujuan",
    cell: ({ row }) => row.getValue("taksiTujuan"),
  },
  // Translok
  {
    accessorKey: "totalTranslok",
    header: "Translok",
    cell: ({ row }) => row.getValue("totalTranslok"),
  },
  // Hotel
  {
    accessorKey: "totalHotel",
    header: "Hotel",
    cell: ({ row }) => row.getValue("totalHotel"),
  },
  // Uang Harian
  {
    accessorKey: "totalUangHarian",
    header: "Uang Harian",
    cell: ({ row }) => row.getValue("totalUangHarian"),
  },
  // Uang Saku
  {
    accessorKey: "totalUangSaku",
    header: "Uang Saku",
    cell: ({ row }) => row.getValue("totalUangSaku"),
  },
  // Representatif
  {
    accessorKey: "totalRepresentatif",
    header: "Representatif",
    cell: ({ row }) => row.getValue("totalRepresentatif"),
  },
  // TOTAL
  {
    accessorKey: "totalSemua",
    header: "TOTAL",
    cell: ({ row }) => {
      const total = row.getValue("totalSemua") as number;
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(total);
    },
  },
];