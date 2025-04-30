"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { JENIS_PENGELUARAN_MAP, KODE_BEBAN_MAP, TIPE_FORM_MAP} from "@/lib/constants";
// import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ClockIcon } from "@heroicons/react/24/outline"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";

export interface POK {
  grup: string;
  detail: string;
  paguAwal: number;
  paguRevisi: number;
  paguBooked: number;
  paguReali: number;
  selfBlocking: number;
  kodeBeban: string;
  jenisP: string;
  hargaSatuan: number;
  volume: number;
  satuan: string;
  tipeForm: string;
  ppk: string;
  unitKerja: string;
  status: "terpakai" | "revisi" | "tidak_terpakai"; // ✅ Tambah properti status
}



export function hitungPaguSisa(row: POK): number {
  const dasar = row.paguRevisi !== 0 ? row.paguRevisi : row.paguAwal;
  return dasar - row.paguReali - row.paguBooked - row.selfBlocking;
}

const formatRupiah = (value: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

// Komponen inline untuk mendeteksi ellipsis dan tampilkan tooltip hanya jika terpotong
const EllipsisTooltip = ({ children }: { children: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight);
    }
  }, [children]);

  const content = (
    <div
      ref={ref}
      className="max-w-[300px] line-clamp-2 text-ellipsis overflow-hidden cursor-default"
    >
      {children}
    </div>
  );

  if (!isTruncated) return content;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};


export const columns = (onHapus: (item: POK) => void): ColumnDef<POK>[] => [
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#" className="text-center flex justify-center"/>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as POK["status"];

      const iconMap: Record<
        POK["status"],
        { icon: JSX.Element; label: string; color: string }
      > = {
        terpakai: {
          icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
          label: "Terpakai",
          color: "green",
        },
        revisi: {
          icon: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />,
          label: "Revisi",
          color: "yellow",
        },
        tidak_terpakai: {
          icon: <XCircleIcon className="w-5 h-5 text-red-500" />,
          label: "Tak Terpakai",
          color: "red",
        },
      };


      const { icon, label } = iconMap[status];

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center items-center sticky z-20">
                {icon}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="z-[9999]" data-portal color="secondary">
              {label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || value.length === 0) return true;
  
      const rowValue = row.getValue(id); // "terpakai", "revisi", "tidak_terpakai"
      return value.includes(rowValue);
    },
    enableSorting: false,
  },
  {
    accessorKey: "grup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GRUP POK" />
    ),
    cell: ({ row }) => <div>{row.getValue("grup")}</div>,
  },
  {
    accessorKey: "detail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DETAIL" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("detail") as string;
      return <EllipsisTooltip>{value}</EllipsisTooltip>;
    },
  },

  {
    accessorKey: "paguAwal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAGU AWAL" />
    ),
    cell: ({ row }) => <div>{formatRupiah(row.getValue("paguAwal"))}</div>,
  },
  {
    accessorKey: "paguRevisi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAGU REVISI" />
    ),
    cell: ({ row }) => <div className="text-right">{formatRupiah(row.getValue("paguRevisi"))}</div>,
  },
  {
    accessorKey: "paguBooked",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAGU BOOKED" />
    ),
    cell: ({ row }) => <div className="text-right">{formatRupiah(row.getValue("paguBooked"))}</div>,
  },
  {
    accessorKey: "paguReali",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAGU REALISASI" />
    ),
    cell: ({ row }) => <div className="text-right">{formatRupiah(row.getValue("paguReali"))}</div>,
  },
  {
    accessorKey: "selfBlocking",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SELF BLOCKING" />
    ),
    cell: ({ row }) => <div className="text-right">{formatRupiah(row.getValue("selfBlocking"))}</div>,
  },
  {
    accessorKey: "paguSisa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PAGU SISA" />
    ),
    cell: ({ row }) => {
      const sisa = hitungPaguSisa(row.original);
      return <div className="text-right">{formatRupiah(sisa)}</div>;
    },
    filterFn: (row, id, value) => {
      const sisa = hitungPaguSisa(row.original); // 👈 bukan row.getValue("paguSisa")
    
      if (!value || value.length === 0) return true;
    
      const match: boolean[] = value.map((v: string) => {
        if (v === "tersedia") return sisa > 0;
        if (v === "nol_minus") return sisa <= 0;
        return false;
      });
    
      return match.includes(true);
    }    
  },
  {
    accessorKey: "sumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SUMBER DANA" />
    ),
    cell: ({ row }) => {
      const kode = row.getValue("kodeBeban") as string;
      const info = KODE_BEBAN_MAP[kode];
      return info ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-center">{info.sumberDana}</div>
            </TooltipTrigger>
            <TooltipContent color="secondary">
              <p>{info.deskripsi}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div>-</div>
      );
    },
  },
  {
    accessorKey: "kodeBeban",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KODE BEBAN" />
    ),
    cell: ({ row }) => {
      const kode = row.getValue("kodeBeban") as string;
      const info = KODE_BEBAN_MAP[kode];
      return info ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-center">{kode}</div>
            </TooltipTrigger>
            <TooltipContent color="secondary">
              <p>{info.beban}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div>{kode}</div>
      );
    },
  },
  {
    accessorKey: "jenisP",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JENIS PENGELUARAN" />
    ),
    cell: ({ row }) => {
      const kode = row.getValue("jenisP") as string;
      return <div>{JENIS_PENGELUARAN_MAP[kode] ?? kode}</div>;
    },
  },
  {
    accessorKey: "hargaSatuan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="HARGA SATUAN" />
    ),
    cell: ({ row }) => <div className="text-right">{formatRupiah(row.getValue("hargaSatuan"))}</div>,
  },
  {
    accessorKey: "volume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VOLUME" />
    ),
    cell: ({ row }) => <div className="text-right">{row.getValue("volume")}</div>,
  },
  {
    accessorKey: "satuan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SATUAN" />
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("satuan")}</div>,
  },
   {
    accessorKey: "tipeForm",
    header: ({ column }) => <DataTableColumnHeader column={column} title="TIPE FORM" />,
   cell: ({ row }) => {
  const tipeFormKey = row.getValue("tipeForm") as string;
  const tipeFormData = TIPE_FORM_MAP[tipeFormKey];
  return <div>{tipeFormData ? tipeFormData.code : tipeFormKey}</div>;
},

    filterFn: (row, columnId, filterValue) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "ppk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PPK" />
    ),
    cell: ({ row }) => <div>{row.getValue("ppk")}</div>,
  },
  {
    accessorKey: "unitKerja",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UNIT KERJA" />
    ),
    cell: ({ row }) => <div>{row.getValue("unitKerja")}</div>,
  },
  {
    accessorKey: "aksi",
    header: ({ column }) => (
      <DataTableColumnHeader className="justify-center" column={column} title="AKSI" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 justify-center">
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          color="destructive"
          onClick={() => onHapus(row.original)}
        >
          <Icon icon="heroicons:trash" className="h-4 w-4" />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  
  // {
  //   accessorKey: "aksi",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="AKSI" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex justify-end">
  //       <Button
  //         size="sm"
  //         variant="outline"
  //         icon={ClockIcon}
  //       >
  //         Riwayat
  //       </Button>
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
];