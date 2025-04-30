"use client";

import * as React from "react";
import { Fragment, useState } from "react";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import type { FormPOK } from "./columns";
import { CalculatorIcon } from "@heroicons/react/24/solid";
import DialogForm from "./simulasi-perjalanan/simulasi-perjalanan";

interface DataTableProps<TData extends FormPOK> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function DataTable<TData extends FormPOK>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const toggleExpand = (rowId: string) => {
    setExpandedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

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

  const handleCancel = () => setRowSelection({});
  const handleSaveSelected = () => {
    console.log("Menyimpan data: ", selectedRows);
    // Tambah logika simpan di sini
  };

  return (
    <div className="space-y-4">
      {selectedCount > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border rounded-full bg-red-50">
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm font-medium">
              <Badge variant="outline" color="secondary">
                {selectedCount}/{table.getRowModel().rows.length} Selected
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCancel}
              size="xs"
              color="secondary"
              variant="outline"
              className="rounded-full bg-white"
            >
              Batal
            </Button>
            <Button
              onClick={handleSaveSelected}
              size="xs"
              color="destructive"
              className="rounded-full"
            >
              Hapus POK Terpilih
            </Button>
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
                      ["grup", "aksi", "status", "expand"].includes(
                        header.column.id
                      )
                        ? "sticky z-10 drop-shadow-md bg-default-100"
                        : ""
                    }
                    style={(() => {
                      switch (header.column.id) {
                        case "expand":
                          return { left: 0, width: 50 };
                        case "grup":
                          return { left: 200, width: 150 };
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
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const details = row.original.details;

                return (
                  <Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className="group hover:bg-muted"
                    >
                      {row.getVisibleCells().map((cell) => {
                        const isSticky = [
                          "aksi",
                          "expand",
                        ].includes(cell.column.id);
                        return (
                          <TableCell
                            key={cell.id}
                            className={`transition-colors duration-200 ease-in-out ${isSticky
                              ? `sticky z-10 drop-shadow-md ${row.getIsSelected()
                                ? "bg-muted"
                                : "bg-background"
                              } group-hover:bg-muted`
                              : ""
                              }`}
                            style={(() => {
                              switch (cell.column.id) {
                                case "expand":
                                  return { left: 0, width: 50 };
                                case "aksi":
                                  return { right: 0, width: 100 };
                                default:
                                  return {};
                              }
                            })()}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
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
                                  <TableRow key={idx}>
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
                                      <DialogForm/>
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
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
