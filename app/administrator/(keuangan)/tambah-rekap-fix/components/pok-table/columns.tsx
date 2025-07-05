"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { JENIS_PENGELUARAN_MAP, KODE_BEBAN_MAP, TIPE_FORM_MAP } from "@/lib/constants";
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
import { Form } from "@/lib/interface";

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


export const columns = (onTambah: (item: Form) => void): ColumnDef<Form>[] => [
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
    accessorKey: "grup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GRUP POK" />
    ),
    cell: ({ row }) => <div>{row.getValue("grup")}</div>,
  },
  {
    accessorKey: "deskripsi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DESKRIPSI" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("deskripsi") as string;
      return <EllipsisTooltip>{value}</EllipsisTooltip>;
    },
  },
  {
    accessorKey: "detail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KETERANGAN" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("detail") as string;
      return <EllipsisTooltip>{value}</EllipsisTooltip>;
    },
  },
  {
    accessorKey: "noSurat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NOMOR SURAT" />
    ),
    cell: ({ row }) => <div>{row.getValue("noSurat")}</div>,
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
    accessorKey: "noPermintaan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NOMOR PERMINTAAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("noPermintaan")}</div>,
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
          className="h-7 w-7"
          color="primary"
          icon={PlusIcon}
          onClick={() => onTambah(row.original)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
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
          className="h-7 w-7"
          color="primary"
          icon={PlusIcon}
          onClick={() => onTambah(row.original)}
        />
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