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
import DataTableFilter from "./data-table-filter";
import { organisasi, JENIS_PENGELUARAN_MAP, TIPE_FORM_MAP, KODE_BEBAN_MAP, PPKOptions } from "@/lib/constants";
import { toast } from "sonner";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [massUpdate, setMassUpdate] = React.useState({
    unitKerja: null,
    jenisP: null,
    tipeForm: null,
    kodeBeban: null,
    ppk: null,
  });
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

  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000));

  const handleMassChange = (field: string, value: any) => {
    setMassUpdate(prev => ({ ...prev, [field]: value }));

    // ✅ Apply langsung ke data terpilih (replace this with your backend update or state management)
    selectedRows.forEach(row => {
      (row.original as any)[field] = value.value || value; // menyesuaikan format react-select {value,label}
    });
  };

  const handleSubmit = () => {
    toast.promise(promise(), {
      loading: "Menyimpan...",
      success: "Data POK berhasil disimpan.",
      error: "Terjadi kesalahan saat menyimpan.",
      position: "top-right",
    });
    setRowSelection({});
  };

  // const styles = {
  //   control: (provided: any, state: any) => ({
  //     ...provided,
  //     minHeight: '2.25rem',
  //     height: '2.25rem',
  //     fontSize: '0.875rem',

  //     backgroundColor: state.hasValue ? '#FFFFFF' : '#1D4ED8', // putih kalau ada value, biru-700 kalau belum dipilih
  //     borderColor: '#1D4ED8', // selalu biru-700 border-nya

  //     boxShadow: state.isFocused ? '0 0 0 1px #1D4ED8' : 'none',
  //     '&:hover': {
  //       borderColor: '#1D4ED8',
  //     },
  //   }),

  //   placeholder: (provided: any, state: any) => ({
  //     ...provided,
  //     color: '#FFFFFF', // placeholder putih (belum ada value)
  //     fontWeight: '500',
  //   }),

  //   singleValue: (provided: any, state: any) => ({
  //     ...provided,
  //     color: '#1D4ED8', // text biru-700 (kalau udah dipilih)
  //     fontWeight: '500',
  //   }),

  //   valueContainer: (provided: any) => ({
  //     ...provided,
  //     height: '32px',
  //     padding: '0 8px',
  //   }),

  //   indicatorsContainer: (provided: any) => ({
  //     ...provided,
  //     height: '32px',
  //   }),

  //   dropdownIndicator: (provided: any, state: any) => ({
  //     ...provided,
  //     padding: '4px',
  //     color: state.hasValue
  //       ? '#1D4ED8' // icon biru-700 kalau udah dipilih
  //       : '#FFFFFF', // icon putih kalau belum
  //     '&:hover': {
  //       color: '#1D4ED8',
  //     },
  //   }),

  //   clearIndicator: (provided: any, state: any) => ({
  //     ...provided,
  //     padding: '4px',
  //     color: state.hasValue ? '#1D4ED8' : '#FFFFFF',
  //     '&:hover': {
  //       color: '#1D4ED8',
  //     },
  //   }),

  //   menu: (provided: any) => ({
  //     ...provided,
  //     fontSize: '12px',
  //   }),

  //   option: (provided: any, state: any) => ({
  //     ...provided,
  //     fontSize: '12px',
  //     backgroundColor: state.isSelected
  //       ? '#1D4ED8'
  //       : state.isFocused
  //         ? '#DBEAFE'
  //         : '#FFFFFF',
  //     color: state.isSelected ? '#FFFFFF' : '#111827',
  //     '&:hover': {
  //       backgroundColor: '#DBEAFE',
  //       color: '#111827',
  //     },
  //   }),
  // };


  return (
    <div className="space-y-4">
      <DataTableFilter />
      {selectedCount > 0 ? (
        <div className="p-4 border rounded-md bg-primary-50 space-y-2">


          <div className="justify-between flex items-center">
            <div className="flex gap-3 items-center ">
              <div className="text-sm font-medium">
                <Badge variant="outline">{selectedCount}/{table.getRowModel().rows.length} Selected</Badge>
              </div>
              <Select
                placeholder="Pilih Unit Kerja"
                options={organisasi}
                value={massUpdate.unitKerja}
                onChange={(val) => handleMassChange("unitKerja", val)}
                className="w-44 z-[10000]"
              />

              <Select
                placeholder="Pilih Jenis Pengeluaran"
                options={Object.entries(JENIS_PENGELUARAN_MAP).map(([k, v]) => ({ value: k, label: v }))}
                value={massUpdate.jenisP}
                onChange={(val) => handleMassChange("jenisP", val)}
                className="w-56"
              />

              <Select
                placeholder="Pilih Tipe Form"
                options={Object.entries(TIPE_FORM_MAP).map(([k, v]) => ({ value: k, label: `[${v.code}] ${v.label}` }))}
                value={massUpdate.tipeForm}
                onChange={(val) => handleMassChange("tipeForm", val)}
                className="w-44"
              />

              <Select
                placeholder="Pilih Pembebanan"
                options={Object.entries(KODE_BEBAN_MAP).map(([k, v]) => ({ value: k, label: v.deskripsi }))}
                value={massUpdate.kodeBeban}
                onChange={(val) => handleMassChange("kodeBeban", val)}
                className="w-48"
              />

              <Select
                placeholder="Pilih PPK"
                options={PPKOptions}
                value={massUpdate.ppk}
                onChange={(val) => handleMassChange("ppk", val)}
                className="w-44"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="soft" color="secondary" size="md" onClick={() => setRowSelection({})} className="border border-gray-300">Batal</Button>
              <Button color="primary" size="md" onClick={handleSubmit}>Simpan</Button>
            </div>
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
                    const isSticky = cell.column.id === "grup" || cell.column.id === "aksi" || cell.column.id === "checkbox" || cell.column.id === "status";
                    return (
                      <TableCell
                        key={cell.id}
                        className={`transition-colors duration-200 ease-in-out ${isSticky
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
