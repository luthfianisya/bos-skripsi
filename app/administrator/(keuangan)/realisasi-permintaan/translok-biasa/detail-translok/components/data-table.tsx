"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button'
import Select from "react-select";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import DataTableFilter from "./data-table-filter";
import { CalculatorIcon, LockClosedIcon, LockOpenIcon, PaperAirplaneIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { realisasis, Realisasi } from "./columns";


interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}
import { getColumns } from "./columns"; // ganti path sesuai lokasi file columns.tsx
import RealisasiTranslok from "./realisasi-translok/realisasi-translok";
import RealisasiTranslokGroup from "./realisasi-translok-group/realisasi-translok";

export function DataTable<TData extends Realisasi>({
  data,
}: Omit<DataTableProps<TData>, "columns">) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isBlokTranslokActive, setIsBlokTranslokActive] = React.useState(false);
  const [isKirimTranslokActive, setIsKirimTranslokActive] = React.useState(false);

  // Panggil getColumns dengan state aktif
  const columns = React.useMemo(() => getColumns(isBlokTranslokActive), [isBlokTranslokActive]);


  const handleToggleKirimTranslok = () => {
    setIsKirimTranslokActive((prev) => !prev);
  };

  const handleBlokTranslok = () => {
    setIsBlokTranslokActive((prev) => !prev);
    console.log(isBlokTranslokActive ? "Unblok Translok" : "Blok Translok");
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const handleCancel = () => {
    // Reset row selection
    setRowSelection({});
  };


  return (
    <div className="space-y-4">
      {/* <DataTableFilter /> */}
      {selectedCount > 0 ? (
        // Action Bar yang tadi kita bikin
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border rounded-full bg-primary-50 text-primary-700">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm font-medium">
              <Badge variant="outline" className="bg-white">{selectedCount}/{table.getRowModel().rows.length} Selected</Badge>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={handleBlokTranslok}
                      icon={isBlokTranslokActive ? LockClosedIcon : LockOpenIcon}
                      color={isBlokTranslokActive ? "secondary" : "primary"}
                      variant={isBlokTranslokActive ? "outline" : null}
                    >
                      {isBlokTranslokActive ? "Unblok Translok" : "Blok Translok"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-sm" color="secondary">
                    {isBlokTranslokActive
                      ? "Klik untuk membuka blokir translok"
                      : "Klik untuk memblokir translok"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <RealisasiTranslokGroup/>
            </div>

          </div>
          <div className="flex gap-2">
            <Button onClick={handleCancel} size="xs" color="secondary" variant="outline" className="rounded-full bg-white">Batal</Button>
            {/* <Button onClick={handleSaveSelected} size="xs" color="primary" className="rounded-full" icon={PaperAirplaneIcon}>Kirim Translok</Button> */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="xs"
                    onClick={handleToggleKirimTranslok}
                    icon={PaperAirplaneIcon}
                    color={isKirimTranslokActive ? "destructive" : "primary"}
                    className="rounded-full"
                  >
                    {isKirimTranslokActive ? "Batal" : "Simpan"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs" color="secondary">
                  {isKirimTranslokActive
                    ? "Klik untuk membatalkan pengiriman"
                    : "Klik untuk mengirim translok terpilih"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </div>
        </div>
      ) : (
        // Toolbar default kalau nggak ada row yang di-select
        <DataTableToolbar table={table} />
      )}
      <div className="relative rounded-md border overflow-x-auto">
        <Table className="table-auto min-w-max">
          {/* HEADER */}
          <TableHeader className="bg-default-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={
                        header.column.id === "grup" || header.column.id === "checkbox" || header.column.id === "aksi" || header.column.id === "status"
                          ? "sticky z-10 drop-shadow-md bg-default-100"
                          : ""
                      }
                      style={
                        header.column.id === "checkbox"
                          ? { left: 0, width: 50, minWidth: 50 }
                          : header.column.id === "status"
                            ? { left: 50, width: 150, minWidth: 150 }
                            : header.column.id === "grup"
                              ? { left: 200, width: 150, minWidth: 150 } // posisi setelah checkbox
                              : header.column.id === "aksi"
                                ? { right: 0, width: 100, minWidth: 100 }
                                : {}
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="group hover:bg-muted">
                  {row.getVisibleCells().map((cell) => {
                    const isSticky = cell.column.id === "grup" || cell.column.id === "aksi" || cell.column.id === "checkbox" || cell.column.id === "status";
                    return (
                      <TableCell
                        key={cell.id}
                        className={`transition-colors duration-200 ease-in-out ${isSticky
                          ? `sticky z-10 drop-shadow-md 
                               ${row.getIsSelected() ? "bg-muted" : "bg-background"} 
                               group-hover:bg-muted`
                          : ""
                          }`}
                        style={
                          cell.column.id === "checkbox"
                            ? { left: 0, width: 50, minWidth: 50 }
                            : cell.column.id === "status"
                              ? { left: 50, width: 150, minWidth: 150 }
                              : cell.column.id === "grup"
                                ? { left: 200, width: 150, minWidth: 150 } // posisi setelah checkbox
                                : cell.column.id === "aksi"
                                  ? { right: 0, width: 100, minWidth: 100 }
                                  : {}
                        }
                      >

                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
