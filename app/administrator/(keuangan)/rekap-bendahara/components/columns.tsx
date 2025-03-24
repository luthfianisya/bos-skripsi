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
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import StatusDokumenBadge from "./badge-status-dokumen";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ApprovalStatus = "approved" | "pending" | "submit" | "rejected";

// ✅ Tambahin tipe/enum ini buat statusPencairan
export type PencairanStatus = "belum" | "proses" | "cair";

// Kalau statusDokumen juga belum ada tipe-nya:
export type DokumenStatus = "belum_direkap" | "proses_rekap" | "terbit_sp2d";

export enum TipeForm {
  TRANSLOK = "TRANSLOK",
  JLN = "JALAN",
  BHN = "BAHAN",
}

interface Form {
  noPermintaan: string;
  deskripsi: string;
  noSurat: string;
  pembuat: string;
  jumlahUsulan: number;
  tipeForm: TipeForm;
  approvals: {
    operator: ApprovalStatus;
    pj: ApprovalStatus;
    ppk: ApprovalStatus;
  };
}

// ✅ Helper capital
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const approvalStatuses: ApprovalStatus[] = ["approved", "submit", "rejected", "pending"];

const approvalRoles = ["operator", "pj", "ppk"] as const;
type ApprovalRole = typeof approvalRoles[number];

const approvalFilterOptions = approvalRoles.flatMap((role) => {
  return approvalStatuses.map((status) => {
    const statusLabel = status === "pending" ? "Belum Ada" : capitalize(status);
    const roleLabel = role.toUpperCase();

    return {
      label: `${roleLabel} ${statusLabel}`,
      value: `${role}-${status}`,
    };
  });
});

const getNormalizedStatus = (status: ApprovalStatus | undefined): ApprovalStatus => {
  return status ?? "pending";
};

const tipeFormOptions = [
  { label: "Translokasi", value: TipeForm.TRANSLOK },
  { label: "Jalan Dinas", value: TipeForm.JLN },
  { label: "Bahan", value: TipeForm.BHN },
];

// ✅ Badge Approval (status approval rekap)
const getBadgeProps = (status: ApprovalStatus): {
  color: "success" | "destructive" | "secondary" | "default" | "info" | "warning" | "dark";
  variant: "outline" | "soft";
} => {
  switch (status) {
    case "approved":
      return { color: "success", variant: "outline" };
    case "submit":
      return { color: "info", variant: "outline" };
    case "rejected":
      return { color: "destructive", variant: "outline" };
    default:
      return { color: "secondary", variant: "outline" };
  }
};

const ApprovalBadge = ({ label, status }: { label: string; status: ApprovalStatus }) => {
  const { variant, color } = getBadgeProps(status);

  const getIcon = (status: ApprovalStatus) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon className="w-4 h-4 mr-1 text-green-600" />;
      case "submit":
        return <PaperAirplaneIcon className="w-4 h-4 mr-1 text-blue-600" />;
      case "rejected":
        return <ExclamationCircleIcon className="w-4 h-4 mr-1 text-red-600" />;
      default:
        return <MinusCircleIcon className="w-4 h-4 mr-1 text-gray-500" />;
    }
  };

  return (
    <Badge color={color} variant={variant} className="flex items-center gap-1">
      {getIcon(status)}
      <span>{label}</span>
    </Badge>
  );
};

// ✅ Badge Pencairan Status
const getPencairanBadgeProps = (status: PencairanStatus): {
  color: "success" | "info" | "secondary";
  label: string;
} => {
  switch (status) {
    case "cair":
      return { color: "success", label: "Sudah Cair" };
    case "proses":
      return { color: "info", label: "Proses Cair" };
    default:
      return { color: "secondary", label: "Belum Cair" };
  }
};

// ✅ Columns untuk table
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "idRekap",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID REKAP" />,
    cell: ({ row }) => <div>{row.getValue("idRekap")}</div>,
  },
  {
    accessorKey: "tglRekap",
    header: ({ column }) => <DataTableColumnHeader column={column} title="TGL REKAP" />,
    cell: ({ row }) => <div>{row.getValue("tglRekap")}</div>,
  },
  {
    accessorKey: "judulRekap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JUDUL REKAP" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("judulRekap") as string;
  
      return (
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[300px] line-clamp-2 text-ellipsis cursor-help">
              {value}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            {value}
          </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        
      );
    },
  },    
  {
    accessorKey: "perekap",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PEREKAP" />,
    cell: ({ row }) => <div>{row.getValue("perekap")}</div>,
  },
  {
    accessorKey: "statusPencairan",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        <DataTableColumnHeader column={column} title="STATUS PENCAIRAN" />
        {/* ✅ Info icon dengan popover */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <InformationCircleIcon className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </PopoverTrigger>
          <PopoverContent side="top" className="w-48 text-sm">
            <div className="font-medium mb-1">Keterangan Status:</div>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Belum Cair</strong>: Belum diproses pencairannya</li>
              <li><strong>Proses Cair</strong>: Dalam proses pencairan</li>
              <li><strong>Sudah Cair</strong>: Dana sudah dicairkan</li>
            </ul>
          </PopoverContent>
        </Popover> */}
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue("statusPencairan") as PencairanStatus;
      const { color, label } = getPencairanBadgeProps(status);
      return <Badge variant="outline" color={color}>{label}</Badge>;
    },
  },
  {
    accessorKey: "tipeRekap",
    header: ({ column }) => <DataTableColumnHeader column={column} title="TIPE REKAP" />,
    cell: ({ row }) => <div>{row.getValue("tipeRekap")}</div>,
  },
  {
    accessorKey: "totalBooked",
    header: ({ column }) => <DataTableColumnHeader column={column} title="TOTAL BOOKED" />,
    cell: ({ row }) => <div>{row.getValue("totalBooked")}</div>,
  },
  {
    accessorKey: "totalRealisasi",
    header: ({ column }) => <DataTableColumnHeader column={column} title="TOTAL REALISASI" />,
    cell: ({ row }) => <div>{row.getValue("totalRealisasi")}</div>,
  },
  {
    accessorKey: "statusDokumen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS DOKUMEN" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("statusDokumen") as DokumenStatus;
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
    cell: () => (
      <div className="flex justify-end">
        <Button size="sm" variant="outline" className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4" />
          Riwayat
        </Button>
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
