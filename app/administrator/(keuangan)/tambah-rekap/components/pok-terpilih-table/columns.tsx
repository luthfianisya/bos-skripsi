"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { FormPOK } from "@/lib/interface";

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


export const columns = (onHapus: (item: FormPOK) => void, readOnly?: boolean): ColumnDef<FormPOK>[] => [
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
      accessorKey: "noPermintaan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="NOMOR PERMINTAAN" />
      ),
      cell: ({ row }) => <div>{row.getValue("noPermintaan")}</div>,
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
      accessorKey: "grup",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="GRUP POK" />
      ),
      cell: ({ row }) => <div>{row.getValue("grup")}</div>,
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
  ...(!readOnly
    ? [{
        accessorKey: "aksi",
        header: ({ column }: { column: Column<FormPOK> }) => (
          <DataTableColumnHeader className="justify-center" column={column} title="AKSI" />
        ),
        cell: ({ row }: { row: Row<FormPOK> }) => (
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
      }]
    : []),
];