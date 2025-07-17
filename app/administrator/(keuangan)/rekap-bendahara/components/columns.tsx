"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  PaperAirplaneIcon,
  MinusCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import StatusDokumenBadge from "./badge-status-dokumen";
import { jenisPencairanOptions, STATUS_DOKUMEN_MAP, STATUS_PENCAIRAN_MAP } from "@/lib/constants";
import { EllipsisTooltip } from "@/components/ui/ellipsis-tooltip";
import { formatDate, formatRupiah } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RekapForm } from "@/data/rekap-bendahara";
import { FullFormRekap } from "@/data/rekap-bendahara-f";

// ✅ Columns untuk table
export const columns = (
  onDetailClick: (form: FullFormRekap) => void,
): ColumnDef<FullFormRekap>[] => [
    {
      accessorKey: "idRekap",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID REKAP" />,
      cell: ({ row }) => <div>{row.getValue("idRekap")}</div>,
    },
    {
      accessorKey: "tglRekap",
      header: ({ column }) => <DataTableColumnHeader column={column} title="TGL REKAP" />,
      cell: ({ row }) => <div>{formatDate(row.getValue("tglRekap"))}</div>,
    },
    {
      accessorKey: "judulRekap",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="JUDUL REKAP" />
      ),
      cell: ({ row }) => {
        const value = row.getValue("judulRekap") as string;
        return <EllipsisTooltip>{value}</EllipsisTooltip>;
      },
    },
    {
      accessorKey: "perekap",
      header: ({ column }) => <DataTableColumnHeader column={column} title="PEREKAP" />,
      cell: ({ row }) => <div>{row.getValue("perekap")}</div>,
    },
    {
      accessorKey: "jenisPencairan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="JENIS PENCAIRAN" />
      ),
      cell: ({ row }) => {
        const value = row.getValue("jenisPencairan") as string; // key-nya statusPencairan
        const label = jenisPencairanOptions.find((opt) => opt.value === value)?.label ?? "-";
        return <div>{label}</div>;
      }

    },
    {
      accessorKey: "tipeRekap",
      header: ({ column }) => <DataTableColumnHeader column={column} title="TIPE REKAP" />,
      cell: ({ row }) => <div>{row.getValue("tipeRekap")}</div>,
    },
    {
      accessorKey: "totalBooked",
      header: ({ column }) => <DataTableColumnHeader column={column} title="TOTAL BOOKED" />,
      cell: ({ row }) => <div className="text-right">{formatRupiah(row.getValue("totalBooked"))}</div>,
    },
    {
      accessorKey: "totalRealisasi",
      header: ({ column }) => <DataTableColumnHeader column={column} title="TOTAL REALISASI" />,
      cell: ({ row }) => <div className="text-right">{formatRupiah(row.getValue("totalRealisasi"))}</div>,
    },
    {
      accessorKey: "statusDokumen",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="STATUS DOKUMEN" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("statusDokumen") as string;
        return <StatusDokumenBadge status={status} />;
      },
    },
    {
      accessorKey: "aksi",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="AKSI"
          className="justify-center text-center"
        />
      ),
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  // variant="soft"
                  color="primary"
                  className="h-7 w-7"
                  onClick={() => onDetailClick(row.original as FullFormRekap)}
                >
                  <Icon icon="heroicons-solid:eye" className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent color="secondary">
                <p>Detail Rekap</p>
                <TooltipArrow className=" fill-secondary" />
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="soft"
                  color="primary"
                  className="h-7 w-7"
                >
                  <Icon icon="heroicons-solid:printer" className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent color="secondary" className="z-[9999]">
                <p>Print Rekap</p>
                <TooltipArrow className=" fill-white" />
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="soft"
                  color="destructive"
                  className="h-7 w-7"
                >
                  <Icon icon="heroicons:arrow-uturn-left" className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent color="secondary" className="z-[9999]">
                <p>Batal SP2D</p>
                <TooltipArrow className=" fill-white" />
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="soft"
                  color="destructive"
                  className="h-7 w-7"
                  disabled
                >
                  <Icon icon="heroicons:trash" className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent color="secondary" className="z-[9999]">
                <p>Hapus</p>
                <TooltipArrow className=" fill-white" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

// ✅ Dummy data
export const dataForm = [
  {
    idRekap: "RK-001/2025",
    tglRekap: "2025-03-01",
    judulRekap: "Rekap Honor Kegiatan A",
    perekap: "Dian Sasmita",
    statusPencairan: "cair",
    tipeRekap: "JALAN",
    totalBooked: 5000000,
    totalRealisasi: 4500000,
    statusDokumen: "terbit_sp2d",
  },
  {
    idRekap: "RK-002/2025",
    tglRekap: "2025-03-02",
    judulRekap: "Rekap Pengadaan Barang",
    perekap: "Rian Pratama",
    statusPencairan: "proses",
    tipeRekap: "BAHAN",
    totalBooked: 20000000,
    totalRealisasi: 18000000,
    statusDokumen: "proses_rekap",
  },
  {
    idRekap: "RK-003/2025",
    tglRekap: "2025-03-03",
    judulRekap: "Rekap Perjalanan Dinas djdsjdsk dsjdhadhsid djhdjshdjsdh ndajhdadhsd bdshddha dhadal fjdeifhesichfs bejscbuiscbhsi sbusbdisd bcsuicbsicb sbcischaoh",
    perekap: "Siti Aisyah",
    statusPencairan: "belum",
    tipeRekap: "TRANSLOK",
    totalBooked: 8000000,
    totalRealisasi: 8000000,
    statusDokumen: "belum_direkap",
  },
];
