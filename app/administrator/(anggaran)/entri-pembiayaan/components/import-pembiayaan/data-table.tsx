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

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
      { id: "status", value: ["terpakai"] },        // filter status terpakai
    ]);  
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
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

  const selectedRows = table.getFilteredSelectedRowModel().rows;
const selectedCount = selectedRows.length;

const handleCancel = () => {
  // Reset row selection
  setRowSelection({});
};

const handleSaveSelected = () => {
  console.log("Menyimpan data: ", selectedRows);
  // Tambah logika simpan di sini
};

const satker: { value: string, label: string }[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
  
const styles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: '2.25rem',
    height: '2.25rem',
    fontSize: '0.875rem',

    backgroundColor: state.hasValue ? '#FFFFFF' : '#1D4ED8', // putih kalau ada value, biru-700 kalau belum dipilih
    borderColor: '#1D4ED8', // selalu biru-700 border-nya

    boxShadow: state.isFocused ? '0 0 0 1px #1D4ED8' : 'none',
    '&:hover': {
      borderColor: '#1D4ED8',
    },
  }),

  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: '#FFFFFF', // placeholder putih (belum ada value)
    fontWeight: '500',
  }),

  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: '#1D4ED8', // text biru-700 (kalau udah dipilih)
    fontWeight: '500',
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    height: '32px',
    padding: '0 8px',
  }),

  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '32px',
  }),

  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    padding: '4px',
    color: state.hasValue
      ? '#1D4ED8' // icon biru-700 kalau udah dipilih
      : '#FFFFFF', // icon putih kalau belum
    '&:hover': {
      color: '#1D4ED8',
    },
  }),

  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    padding: '4px',
    color: state.hasValue ? '#1D4ED8' : '#FFFFFF',
    '&:hover': {
      color: '#1D4ED8',
    },
  }),

  menu: (provided: any) => ({
    ...provided,
    fontSize: '12px',
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: '12px',
    backgroundColor: state.isSelected
      ? '#1D4ED8'
      : state.isFocused
      ? '#DBEAFE'
      : '#FFFFFF',
    color: state.isSelected ? '#FFFFFF' : '#111827',
    '&:hover': {
      backgroundColor: '#DBEAFE',
      color: '#111827',
    },
  }),
};


  return (
    <div className="space-y-4">
    
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
                          className={
                            header.column.id === "grup" || header.column.id === "aksi"
                              ? "sticky z-10 drop-shadow-md bg-default-100"
                              : header.column.id === "checkbox" || header.column.id === "status"
                              ? "sticky z-10 bg-default-100"
                              : ""
                          }                                                  
                          style={
                            header.column.id === "checkbox"
                              ? { left: 0, width: 50, minWidth: 50, zIndex: 20 }
                              : header.column.id === "status"
                              ? { left: 50, width: 60, minWidth: 60, zIndex: 25 }
                              : header.column.id === "grup"
                              ? { left: 110, width: 160, minWidth: 160, zIndex: 20 }
                              : header.column.id === "aksi"
                              ? { right: 0, width: 100, minWidth: 100, zIndex: 20 }
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
                    const isSticky = cell.column.id === "grup" || cell.column.id === "aksi"  || cell.column.id === "checkbox" || cell.column.id === "status";
                    return (
                      <TableCell
                        key={cell.id}
                        className={`transition-colors duration-200 ease-in-out ${
                          isSticky
                            ? `sticky z-10 
                               ${cell.column.id === "grup" || cell.column.id === "aksi" ? "drop-shadow-md" : ""} 
                               ${row.getIsSelected() ? "bg-muted" : "bg-background"} 
                               group-hover:bg-muted`
                            : ""
                        }`}                        
                        style={
                          cell.column.id === "checkbox"
                            ? { left: 0, width: 50, minWidth: 50, zIndex: 20 }
                            : cell.column.id === "status"
                            ? { left: 50, width: 60, minWidth: 60, zIndex: 25 }
                            : cell.column.id === "grup"
                            ? { left: 110, width: 200, minWidth: 200, zIndex: 20 }
                            : cell.column.id === "aksi"
                            ? { right: 0, width: 100, minWidth: 100, zIndex: 10 }
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
