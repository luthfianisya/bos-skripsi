"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { CalculatorIcon } from "@heroicons/react/24/solid";
import { Icon } from "@iconify/react";
import { PencilIcon } from "lucide-react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// Interface baru sesuai kebutuhan
interface PerjalananDinas {
  nama: string;
  gol: string;
  asal: string;
  tujuan: string;
  pulangPergi: {
    tanggalPergi: string; // format ISO string atau tanggal biasa
    tanggalPulang: string;
  };
  jumlah: number;
}

export const columns: ColumnDef<PerjalananDinas>[] = [
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAMA" />
    ),
    cell: ({ row }) => <div>{row.getValue("nama")}</div>,
  },
  {
    accessorKey: "gol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GOLONGAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("gol")}</div>,
  },
  {
    accessorKey: "asal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ASAL" />
    ),
    cell: ({ row }) => <div>{row.getValue("asal")}</div>,
  },
  {
    accessorKey: "tujuan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TUJUAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("tujuan")}</div>,
  },
  {
    accessorKey: "pulangPergi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PULANG - PERGI" />
    ),
    cell: ({ row }) => {
      const pulangPergi = row.getValue("pulangPergi") as PerjalananDinas["pulangPergi"];
  
      const tanggalPergi = new Date(pulangPergi.tanggalPergi).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  
      const tanggalPulang = new Date(pulangPergi.tanggalPulang).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
  
      return (
        <div className="flex items-center space-x-2">
          <Badge variant="soft" color="secondary">{tanggalPergi}</Badge>
          <span className="text-gray-500">-</span>
          <Badge variant="soft" color="secondary">{tanggalPulang}</Badge>
        </div>
      );
    },
  },  
  {
    accessorKey: "hari",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JUMLAH HARI" />
    ),
    cell: ({ row }) => {
      const pulangPergi = row.getValue("pulangPergi") as PerjalananDinas["pulangPergi"];
  
      const tanggalPergi = new Date(pulangPergi.tanggalPergi);
      const tanggalPulang = new Date(pulangPergi.tanggalPulang);
  
      // Hitung selisih waktu dalam milidetik
      const selisihWaktu = tanggalPulang.getTime() - tanggalPergi.getTime();
  
      // Convert ke hari (1 hari = 86.400.000 ms)
      const jumlahHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24)) + 1;
  
      return <div>{jumlahHari} hari</div>;
    },
  },  
  {
    accessorKey: "jumlah",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JUMLAH (Rp)" />
    ),
    cell: ({ row }) => {
      const jumlah = row.getValue("jumlah") as number;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(jumlah);
      return <div>{formatted}</div>;
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
                  color="primary"
                  className="h-7 w-7"
                  icon={CalculatorIcon}
                >
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  color="warning"
                  className="h-7 w-7"
                  icon={PencilSquareIcon}
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

export const pegawais: PerjalananDinas[] = [
  {
    nama: "Budi Santoso",
    gol: "III/a",
    asal: "Jakarta",
    tujuan: "Surabaya",
    pulangPergi: {
      tanggalPergi: "2025-03-25",
      tanggalPulang: "2025-03-28",
    },
    jumlah: 1500000,
  },
  {
    nama: "Siti Aminah",
    gol: "II/b",
    asal: "Bandung",
    tujuan: "Semarang",
    pulangPergi: {
      tanggalPergi: "2025-04-01",
      tanggalPulang: "2025-04-05",
    },
    jumlah: 2000000,
  },
  {
    nama: "Andi Wijaya",
    gol: "IV/a",
    asal: "Medan",
    tujuan: "Bali",
    pulangPergi: {
      tanggalPergi: "2025-05-10",
      tanggalPulang: "2025-05-15",
    },
    jumlah: 5000000,
  },
];
