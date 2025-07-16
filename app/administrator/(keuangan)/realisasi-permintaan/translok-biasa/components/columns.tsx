"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ClockIcon } from "@heroicons/react/24/outline"
import { EllipsisHorizontalIcon, EyeIcon } from "@heroicons/react/24/solid"
import Link from "next/link";
import { EllipsisTooltip } from "@/components/ui/ellipsis-tooltip";
import { Realisasi } from "@/lib/interface";
import { formatRupiah } from "@/lib/utils";
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const columns: ColumnDef<Realisasi>[] = [
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
    cell: ({ row }) => <div>{formatRupiah(row.getValue("paguBooked"))}</div>,
  },
  {
    accessorKey: "paguReali",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="INPUT REALISASI" />
    ),
    cell: ({ row }) => <div>{formatRupiah(row.getValue("paguReali"))}</div>,
  },
  // {
  //   accessorKey: "keterangan",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="KETERANGAN" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("keterangan")}</div>,
  // },
  {
    accessorKey: "aksi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AKSI" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Link href="/administrator/realisasi-permintaan/translok-biasa/detail-translok">
             <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="soft"
                              className="h-7 w-7"
                              color="primary"
                              icon={EyeIcon}
                            >
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent color="secondary">
                            <p>Detail</p>
                            <TooltipArrow className=" fill-secondary" />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
        {/* <Button
          size="sm"
          variant="outline"
          icon={EyeIcon}
        >
          Detail
        </Button> */}
        </Link>
        
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];