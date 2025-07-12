"use client";

import * as React from "react";
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

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import DataTableFilter from "./data-table-filter";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

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

  return (
    <div className="space-y-4">
      {/* <DataTableFilter setFilters={setSelectedFilters} /> */}
      <DataTableToolbar table={table} />
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
                      className={`bg-default-100 ${header.column.id === "nip"
                        ? "sticky drop-shadow-md"
                        : header.column.id === "nama"
                          ? "sticky"
                          : ""
                        }`}
                      style={
                        header.column.id === "nama"
                          ? { left: 0, minWidth: 160, width: 160, zIndex: 30 }
                          : header.column.id === "nip"
                            ? { left: 160, minWidth: 200, width: 200, zIndex: 20 }
                            : {}
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`group hover:bg-muted ${row.getValue("kategori") === "LIBUR" ||
                      (typeof row.getValue("tanggal") === "string" &&
                        ["Sabtu", "Minggu"].includes((row.getValue("tanggal") as string).split(",")[0]))
                      ? "bg-red-50"
                      : ""
                    }`}
                >

                  {row.getVisibleCells().map((cell) => {
                    const isSticky = cell.column.id === "nama" || cell.column.id === "nip";

                    return (
                      <TableCell
                        key={cell.id}
                        className={`transition-colors duration-200 ease-in-out ${isSticky
                            ? `sticky 
                             ${cell.column.id === "nip" ? "drop-shadow-md" : ""} 
                             ${row.getIsSelected() ? "bg-muted" : "bg-background"} 
                             group-hover:bg-muted`
                            : ""
                          }`}
                        style={
                          cell.column.id === "nama"
                            ? { left: 0, width: 160, minWidth: 160, zIndex: 30 }
                            : cell.column.id === "nip"
                              ? { left: 160, width: 200, minWidth: 200, zIndex: 20 }
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
