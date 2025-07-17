"use client";

import * as React from "react";
import { Fragment } from "react";
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
import { ChevronDown } from "lucide-react";
import { FormPOK } from "@/lib/interface";
import { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import DialogForm from "./nilai-realisasi/nilai-realisasi";

interface DataTableProps<TData extends FormPOK> {
  columns: ColumnDef<TData>[];
  data: TData[];
   onTambahRealisasi: () => void;
}

export function DataTable<TData extends FormPOK>({ columns, data, onTambahRealisasi }: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    { id: "paguSisa", value: ["tersedia"] }, // filter pagu > 0
    { id: "status", value: ["terpakai"] },        // filter status terpakai
  ]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleExpand = (rowId: string) => {
    setExpandedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const [showRincianPeserta, setShowRincianPeserta] = useState(false);


  const columnsWithExpand = React.useMemo<ColumnDef<TData>[]>(
    () => [
      {
        id: "expand",
        header: "",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleExpand(row.id)}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${expandedRows.includes(row.id) ? "rotate-180" : ""
                }`}
            />
          </Button>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      ...columns,
    ],
    [columns, expandedRows]
  );

  const table = useReactTable({
    data,
    columns: columnsWithExpand,
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


  return (
    <div className="space-y-4">
      {/* <DataTableFilter /> */}
      {selectedCount > 0 ? (
        // Action Bar yang tadi kita bikin
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border rounded-md bg-primary-50">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm font-medium">
              <Badge variant="outline">{selectedCount}/{table.getRowModel().rows.length} Selected</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCancel} size="sm" color="secondary" variant="soft" className="border border-gray-300">Batal</Button>
            <Button onClick={handleSaveSelected} size="sm" color="primary">Tambah</Button>
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
                        ["aksi", "expand"].includes(
                          header.column.id
                        )
                          ? "sticky z-10 drop-shadow-md bg-default-100"
                          : ""
                      }
                      style={(() => {
                        switch (header.column.id) {
                          case "expand":
                            return { left: 0, width: 50 };
                          case "aksi":
                            return { right: 0, width: 100 };
                          default:
                            return {};
                        }
                      })()}
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
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={`group hover:bg-muted ${expandedRows.includes(row.id) ? "bg-muted" : ""
                      }`}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isSticky = ["aksi", "expand"].includes(cell.column.id);
                      return (
                        <TableCell
                          key={cell.id}
                          className={`transition-colors duration-200 ease-in-out ${isSticky
                            ? `sticky z-10 drop-shadow-md ${row.getIsSelected() || expandedRows.includes(row.id)
                              ? "bg-muted"
                              : "bg-background"
                            } group-hover:bg-muted`
                            : expandedRows.includes(row.id)
                              ? "bg-muted"
                              : ""
                            }`}
                          style={{
                            ...(cell.column.id === "expand" && { left: 0, width: 50 }),
                            ...(cell.column.id === "aksi" && { right: 0, width: 100 }),
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>

                  {expandedRows.includes(row.id) && (
                    <TableRow>
                      <TableCell colSpan={table.getVisibleFlatColumns().length}>
                        {(row.original as FormPOK).details && (
                          <Table>
                            <TableHeader className="bg-muted">
                              <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>NIP</TableHead>
                                <TableHead>Nomor SPD</TableHead>
                                <TableHead>Tanggal SPD</TableHead>
                                <TableHead>Tujuan</TableHead>
                                <TableHead>Booked</TableHead>
                                <TableHead>Realisasi</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {(row.original as FormPOK).details!.map((d, idx) => (
                                <TableRow key={`${row.id}-${idx}`}>
                                  <TableCell>{d.nama}</TableCell>
                                  <TableCell>{d.nip}</TableCell>
                                  <TableCell>{d.nomorSpd}</TableCell>
                                  <TableCell>{d.tanggalSpd}</TableCell>
                                  <TableCell>{d.tujuan}</TableCell>
                                  <TableCell>{formatRupiah(d.booked)}</TableCell>
                                  <TableCell>{formatRupiah(d.realisasi)}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{d.status}</Badge>
                                  </TableCell>
                                  <TableCell>
<DialogForm onTambah={onTambahRealisasi} />


                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
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
