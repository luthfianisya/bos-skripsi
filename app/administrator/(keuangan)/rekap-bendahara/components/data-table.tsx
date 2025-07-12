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
  filterState: any;
  setFilterState: (state: any) => void;
}


export function DataTable<TData>({
  columns,
  data,
  filterState,
  setFilterState,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

const filteredData = React.useMemo(() => {
  return data.filter((item: any) => {
    // Kalau data tidak punya field yang kita butuhkan, biarkan lolos
    const matchTahun = !filterState.tahun || item?.tahun?.toString() === filterState.tahun.value;
    const matchSatker = !filterState.satker || item?.satker === filterState.satker.value;
    const matchProgram = !filterState.program || item?.program === filterState.program.value;
    const matchKegiatan = !filterState.kegiatan || item?.kegiatan === filterState.kegiatan.value;
    const matchOutput = !filterState.output || item?.output === filterState.output.value;
    const matchSuboutput = !filterState.suboutput || item?.suboutput === filterState.suboutput.value;
    const matchKomponen = !filterState.komponen || item?.komponen === filterState.komponen.value;

    return (
      matchTahun &&
      matchSatker &&
      matchProgram &&
      matchKegiatan &&
      matchOutput &&
      matchSuboutput &&
      matchKomponen
    );
  });
}, [data, filterState]);



  const table = useReactTable({
    data: filteredData,
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
      <DataTableFilter
        filterState={filterState}
        setFilterState={setFilterState}
      />

    <DataTableToolbar table={table} filterState={filterState} />
      <div className="relative rounded-md border overflow-x-auto">
        <Table className="table-auto min-w-max">
          {/* HEADER */}
          <TableHeader className="bg-default-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSticky = header.column.id === "noPermintaan" || header.column.id === "aksi";
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={isSticky ? "sticky z-10 drop-shadow-md bg-default-100" : ""}
                      style={{
                        minWidth: "max-content",
                        width: "max-content",
                        ...(header.column.id === "noPermintaan" ? { left: 0 } : {}),
                        ...(header.column.id === "aksi" ? { right: 0 } : {}),
                      }}
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
                    const isSticky = cell.column.id === "noPermintaan" || cell.column.id === "aksi";
                    return (
                      <TableCell
                        key={cell.id}
                        className={isSticky ? "sticky z-10 bg-background drop-shadow-md" : ""}
                        style={{
                          minWidth: "max-content",
                          width: "max-content",
                          ...(cell.column.id === "noPermintaan" ? { left: 0 } : {}),
                          ...(cell.column.id === "aksi" ? { right: 0 } : {}),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns?.length || 1} className="h-24 text-center">
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
