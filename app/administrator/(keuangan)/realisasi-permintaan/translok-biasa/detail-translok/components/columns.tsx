"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ClockIcon, MinusCircleIcon } from "@heroicons/react/24/outline"
import { LockClosedIcon, EyeIcon, TrashIcon, PrinterIcon } from "@heroicons/react/24/solid"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RealisasiTranslok from "./realisasi-translok/realisasi-translok";

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export interface Realisasi {
  nip: string;
  nama: string;
  translok?: "BELUM" | "BLOK";
  berangkat: "ya" | "tidak";
  booked: number;
  realisasi: number;
  statusSpj: "Belum Proses" | "Dalam Proses" | "Selesai";
}



export const getColumns = (isBlokTranslokActive: boolean): ColumnDef<Realisasi>[] => [

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
    accessorKey: "nip",
    header: ({ column }) => <DataTableColumnHeader column={column} title="NIP" />,
    cell: ({ row }) => <div className="w-auto whitespace-nowrap">{row.getValue("nip")}</div>,
  },
  {
    accessorKey: "nama",
    size: 9999,
    header: ({ column }) => <DataTableColumnHeader column={column} title="NAMA" />,
    cell: ({ row }) => <div className="w-56">{row.getValue("nama")}</div>,
  },
  {
    accessorKey: "translok",
    header: ({ column }) => <DataTableColumnHeader column={column} title="TRANSLOK" className="flex justify-center"/>,
    cell: ({ row }) => {
      const translok = row.getValue("translok") as "BLOK" | "BELUM" | undefined;
      const isBlok = translok === "BLOK";
  
      return (
        <div className="w-auto whitespace-nowrap flex justify-center">
          <Badge color={isBlok ? "default" : "secondary"} className="w-20 justify-center">
            {isBlok ? (
              <LockClosedIcon className="mr-1 h-3 w-3" />
            ) : (
              <MinusCircleIcon className="mr-1 h-3 w-3" />
            )}
            {translok || "Tidak Ada"}
          </Badge>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },  
  {
    accessorKey: "berangkat",
    header: ({ column }) => <DataTableColumnHeader column={column} title="BERANGKAT" />,
    cell: ({ row }) => {
      const berangkat = row.getValue("berangkat") as "ya" | "tidak";
    
      return (
        <div className="w-auto whitespace-nowrap flex justify-center">
          <Badge
            className={`w-16 justify-center ${
              berangkat === "ya" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {berangkat === "ya" ? "YA" : "TIDAK"}
          </Badge>
        </div>
      );
    },
    
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "booked",
    header: ({ column }) => <DataTableColumnHeader column={column} title="BOOKED" />,
    cell: ({ row }) => <div className="w-auto whitespace-nowrap">{formatRupiah(row.getValue("booked"))}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "realisasi",
    header: ({ column }) => <DataTableColumnHeader column={column} title="REALISASI" />,
    cell: ({ row }) => <div className="w-auto whitespace-nowrap">{formatRupiah(row.getValue("realisasi"))}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "statusSpj",
    header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS SPJ" />,
    cell: ({ row }) => (
      <div className="w-auto whitespace-nowrap flex justify-center">
        <Badge
          color={
            row.getValue("statusSpj") === "Belum Proses"
              ? "secondary"
              : row.getValue("statusSpj") === "Dalam Proses"
                ? "default"
                : "success"
          }
          variant="outline"
        >
          {row.getValue("statusSpj")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "aksi",
    header: ({ column }) => <DataTableColumnHeader column={column} title="AKSI" />,
    cell: ({ row }) => (
      <div className="w-auto flex gap-3 justify-end">
        <RealisasiTranslok/>
        <Button size="icon" variant="outline" className="h-7 w-7" color="primary" icon={PrinterIcon} />
        {/* <Button size="icon" variant="outline" color="warning" className="h-7 w-7" icon={EyeIcon} /> */}
        <Button size="icon" variant="outline" className="h-7 w-7" color="destructive" icon={TrashIcon} />
        {/* <Button
          size="icon"
          variant={row.original.translok === "BLOK" || isBlokTranslokActive ? undefined : "outline"}
          color="primary"
          className="h-7 w-7"
          icon={LockClosedIcon}
        /> */}
        
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export const realisasis: Realisasi[] = [
  {
    nip: "1987654321",
    nama: "Budi Santoso",
    translok: "BLOK",
    berangkat: "ya",
    booked: 5000000,
    realisasi: 4800000,
    statusSpj: "Dalam Proses",
  },
  {
    nip: "1981234567",
    nama: "Siti Aminah",
    translok: "BELUM",
    berangkat: "tidak",
    booked: 3000000,
    realisasi: 2900000,
    statusSpj: "Belum Proses",
  },
  {
    nip: "1998765432",
    nama: "Joko Widodo",
    translok: "BLOK",
    berangkat: "ya",
    booked: 7000000,
    realisasi: 6900000,
    statusSpj: "Selesai",
  },
];