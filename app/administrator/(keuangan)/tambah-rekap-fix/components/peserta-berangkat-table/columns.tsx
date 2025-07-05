"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { CalculatorIcon } from "@heroicons/react/24/solid";
import { Icon } from "@iconify/react";
import { PencilIcon } from "lucide-react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import DialogForm from "./simulasi-perjalanan/simulasi-perjalanan";
import { useState } from "react";
import { asalOptions, tujuanOptions } from "../../steps/step3";

// Interface baru sesuai kebutuhan
export interface Peserta {
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


export function getColumns(onUpdateTotal: (index: number, total: number) => void, readOnly?: boolean): ColumnDef<Peserta>[] {
  return [
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
        <DataTableColumnHeader column={column} title="GOL" />
      ),
      cell: ({ row }) => <div>{row.getValue("gol")}</div>,
    },
    {
      accessorKey: "asal",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ASAL" />
      ),
      cell: ({ row }) => {
        const asalValue = row.getValue("asal") as string;
        const asalLabel = asalOptions.find((o) => o.value === asalValue)?.label || asalValue;
        return <div>{asalLabel}</div>;
      },      
    },
    {
      accessorKey: "tujuan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="TUJUAN" />
      ),
      cell: ({ row }) => {
        const tujuanValue = row.getValue("tujuan") as string;
        const tujuanLabel = tujuanOptions.find((o) => o.value === tujuanValue)?.label || tujuanValue;
        return <div>{tujuanLabel}</div>;
      },      
    },
    {
      accessorKey: "pulangPergi",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PULANG - PERGI" />
      ),
      cell: ({ row }) => {
        const pulangPergi = row.getValue("pulangPergi") as Peserta["pulangPergi"];

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
        const pulangPergi = row.getValue("pulangPergi") as Peserta["pulangPergi"];

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
      cell: ({ row }) => {
        const index = row.index;
        const rowData = row.original;

        return (
          <div className="flex gap-3 justify-end">
            <DialogForm
              data={rowData}
              onSave={(total) => onUpdateTotal(index, total)}
              readOnly={readOnly} // tambahkan ini
            />
            {!readOnly && (
              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7"
                color="destructive"
              >
                <Icon icon="heroicons:trash" className="h-4 w-4" />
              </Button>
            )}
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}