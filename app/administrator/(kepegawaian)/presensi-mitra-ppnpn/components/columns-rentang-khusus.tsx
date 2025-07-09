"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NoSymbolIcon, PencilSquareIcon, CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

// ENUM untuk kategori
export enum KategoriPresensi {
  BLOK = "BLOK",
  MANUAL = "MANUAL",
  LIBUR = "LIBUR",
  TERLAMBAT = "TERLAMBAT",
}

export type Presensi = {
  id: number;
  tanggal: string;
  masuk?: string | null;       // ✅ Opsional
  pulang?: string | null;      // ✅ Opsional
  kodeAbsen?: string | null;   // ✅ Opsional
  status?: string| null;
  terlambatKe?: string | null; // ✅ Opsional
  keterangan?: string | null;  // ✅ Opsional
  diperbarui: string;
  kategori?: KategoriPresensi | null; // ✅ Opsional
};

export const columnsRentang: ColumnDef<Presensi>[] = [
  {
    accessorKey: "kategori",
    header: "#",
    cell: ({ row }) => {
      const kategori = row.getValue("kategori") as KategoriPresensi | null;

      const icons: Record<KategoriPresensi, JSX.Element> = {
        BLOK: <NoSymbolIcon className="h-5 w-5 text-red-700" />,
        MANUAL: <PencilSquareIcon className="h-5 w-5 text-gray-600" />,
        LIBUR: <CalendarDaysIcon className="h-5 w-5 text-red-700" />,
        TERLAMBAT: <ClockIcon className="h-5 w-5 text-yellow-500" />,
      };

      const descriptions: Record<KategoriPresensi, string> = {
        BLOK: "Blok Presensi",
        MANUAL: "Presensi Manual",
        LIBUR: "Hari Libur",
        TERLAMBAT: "Terlambat",
      };

      if (!kategori) {
        return <div></div>;
      }

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center cursor-pointer">{icons[kategori]}</div>
            </TooltipTrigger>
            <TooltipContent color="secondary">
              <p>{descriptions[kategori]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "tanggal",
    header: "HARI/TANGGAL",
    cell: ({ row }) => {
      const rawTanggal = row.getValue("tanggal");
      const tanggal = typeof rawTanggal === "string" ? rawTanggal : "";
      const hari = tanggal ? tanggal.split(",")[0] : "Tidak diketahui";

      // Cek apakah hari libur atau weekend
      const kategori = row.getValue("kategori") as KategoriPresensi | null;
      const isLibur = kategori === KategoriPresensi.LIBUR || hari === "Sabtu" || hari === "Minggu";

      return (
        <span className={isLibur ? "text-red-500" : ""}>
          {tanggal || "Tidak diketahui"}
        </span>
      );
    },
  },
  {
    accessorKey: "masuk",
    header: "MASUK",
    cell: ({ row }) => <div>{row.getValue("masuk") || "-"}</div>,
  },
  {
    accessorKey: "pulang",
    header: "PULANG",
    cell: ({ row }) => <div>{row.getValue("pulang") || "-"}</div>,
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => <div>{row.getValue("status") || "-"}</div>,
  },
  {
    accessorKey: "kodeAbsen",
    header: "KODE ABSEN",
    cell: ({ row }) => <div>{row.getValue("kodeAbsen") || "-"}</div>,
  },
  {
    accessorKey: "terlambatKe",
    header: "TERLAMBAT KE-",
    cell: ({ row }) => <div>{row.getValue("terlambatKe") || "-"}</div>,
  },
  {
    accessorKey: "keterangan",
    header: "KETERANGAN",
    cell: ({ row }) => <div>{row.getValue("keterangan") || "-"}</div>,
  },
  {
    accessorKey: "diperbarui",
    header: "DIPERBAHARUI",
    cell: ({ row }) => <div>{row.getValue("diperbarui") || "-"}</div>,
  },
];
