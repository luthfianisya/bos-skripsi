"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
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
import { getColumns } from "./columns";
import { realisasis, Realisasi } from "./columns";
import RealisasiTranslokGroup from "./realisasi-translok-group/realisasi-translok";
import { LockClosedIcon, LockOpenIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";

export function DataTable<TData extends Realisasi>({
  data,
}: {
  data: TData[];
}) {
  const [tableData, setTableData] = React.useState<TData[]>(data); // ✅ state table data
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isBlokTranslokActive, setIsBlokTranslokActive] = React.useState(false);
  const [isKirimTranslokActive, setIsKirimTranslokActive] = React.useState(false);
  const [isBerangkat, setIsBerangkat] = React.useState(false);

  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000));

  const columns = React.useMemo(() => getColumns(isBlokTranslokActive), [isBlokTranslokActive]);

  const table = useReactTable({
    data: tableData,
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
    setRowSelection({});
  };

  const handleSwitchBerangkat = (checked: boolean) => {
    setIsBerangkat(checked);
    console.log("Switch Berangkat:", checked);
  };

  const handleBlokTranslok = () => {
    const selectedRowIds = selectedRows.map(row => row.original.nip);

    const updatedData = tableData.map(row => {
      if (selectedRowIds.includes(row.nip)) {
        return {
          ...row,
          translok: !isBlokTranslokActive ? "BLOK" : "BELUM", // ✅ toggle BLOK/BELUM
        };
      }
      return row;
    });

    setTableData(updatedData); // ✅ update state

    setIsBlokTranslokActive((prev) => !prev);
    console.log(!isBlokTranslokActive ? "Blok Translok" : "Unblok Translok");
  };


  const handleToggleKirimTranslok = () => {
    setIsKirimTranslokActive((prev) => !prev);
  };

  const handleSubmit = () => {
    const selectedRowIds = selectedRows.map(row => row.original.nip);

    // Update tableData
    const updatedData = tableData.map(row => {
      if (selectedRowIds.includes(row.nip)) {
        return {
          ...row,
          berangkat: isBerangkat ? "ya" : "tidak", // ✅ update sesuai switch
          // tambahkan field lain di sini jika ingin diupdate bersama
        };
      }
      return row;
    });

    setTableData(updatedData); // ✅ set data terbaru

    toast.promise(promise(), {
      loading: "Menyimpan...",
      success: "Data realisasi berhasil disimpan.",
      error: "Terjadi kesalahan saat menyimpan.",
      position: "top-right",
    });

    setRowSelection({});
  };


  return (
    <div className="space-y-4">
      {selectedCount > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border rounded-md bg-primary-50">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm font-medium">
              <Badge variant="outline" className="bg-white">
                {selectedCount}/{table.getRowModel().rows.length} Selected
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center space-x-2">
                <Switch checked={isBerangkat} onCheckedChange={handleSwitchBerangkat} />
                <span className="text-md font-semibold">Berangkat</span>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={handleBlokTranslok}
                      icon={isBlokTranslokActive ? LockClosedIcon : LockOpenIcon}
                      color={isBlokTranslokActive ? "secondary" : "primary"}
                      variant={isBlokTranslokActive ? "soft" : null}
                      className={isBlokTranslokActive ? "border border-gray-300" : ""}
                      disabled={!isBerangkat} // ✅ disable jika berangkat false
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

              <RealisasiTranslokGroup isBerangkat={isBerangkat} />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleCancel}
              size="xs"
              color="secondary"
              variant="soft"
              className="border border-gray-300"
            >
              Batal
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="xs"
                    onClick={handleSubmit}
                    color="primary"
                  >
                    Simpan
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
        <DataTableToolbar table={table} />
      )}

      <div className="relative rounded-md border overflow-x-auto">
        <Table className="table-auto min-w-max">
          <TableHeader className="bg-default-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={
                      ["grup", "checkbox", "aksi", "status"].includes(header.column.id || "")
                        ? "sticky z-10 drop-shadow-md bg-default-100"
                        : ""
                    }
                    style={
                      header.column.id === "checkbox"
                        ? { left: 0, width: 50, minWidth: 50 }
                        : header.column.id === "status"
                          ? { left: 50, width: 150, minWidth: 150 }
                          : header.column.id === "grup"
                            ? { left: 200, width: 150, minWidth: 150 }
                            : header.column.id === "aksi"
                              ? { right: 0, width: 100, minWidth: 100 }
                              : {}
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="group hover:bg-muted">
                  {row.getVisibleCells().map((cell) => {
                    const isSticky = ["grup", "aksi", "checkbox", "status"].includes(cell.column.id || "");
                    return (
                      <TableCell
                        key={cell.id}
                        className={`transition-colors duration-200 ease-in-out ${isSticky
                          ? `sticky z-10 drop-shadow-md ${row.getIsSelected() ? "bg-muted" : "bg-background"} group-hover:bg-muted`
                          : ""}`}
                        style={
                          cell.column.id === "checkbox"
                            ? { left: 0, width: 50, minWidth: 50 }
                            : cell.column.id === "status"
                              ? { left: 50, width: 150, minWidth: 150 }
                              : cell.column.id === "grup"
                                ? { left: 200, width: 150, minWidth: 150 }
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
