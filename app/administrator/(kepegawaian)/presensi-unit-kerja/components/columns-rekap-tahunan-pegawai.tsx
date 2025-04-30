"use client";

import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

export interface Presensi {
 bulan: number;
  hk: number;
  hd: number;
  tk: number;
  tl: number;
  tb: number;
  pd: number;
  dk: number;
  kn: number;
  cb: number;
  cl: number;
  cm: number;
  cp: number;
  cs: number;
  ct10: number;
  ct11: number;
  ct12: number;
  cst1: number;
  cst2: number;
  cs1: number;
  cp1: number;
  cm1: number;
  cb1: number;
  psw: number;
  psw1: number;
  psw2: number;
  psw3: number;
  psw4: number;
  ht: number;
  tl1: number;
  tl2: number;
  tl3: number;
  tl4: number;
  kjkHt: number;
  kjkPsw: number;
  kjk: number;
  diperbarui: string;
}

export const columnsRkpTahunPegawai: ColumnDef<Presensi>[] = [
    { accessorKey: "bulan", header: "BULAN", cell: ({ row }) => <div>{row.getValue("bulan")}</div> },
  { accessorKey: "hk", header: "HK", cell: ({ row }) => <div>{row.getValue("hk")}</div> },
  { accessorKey: "hd", header: "HD", cell: ({ row }) => <div>{row.getValue("hd")}</div> },
  { accessorKey: "tk", header: "TK", cell: ({ row }) => <div>{row.getValue("tk")}</div> },
  { accessorKey: "tl", header: "TL", cell: ({ row }) => <div>{row.getValue("tl")}</div> },
  { accessorKey: "tb", header: "TB", cell: ({ row }) => <div>{row.getValue("tb")}</div> },
  { accessorKey: "pd", header: "PD", cell: ({ row }) => <div>{row.getValue("pd")}</div> },
  { accessorKey: "dk", header: "DK", cell: ({ row }) => <div>{row.getValue("dk")}</div> },
  { accessorKey: "kn", header: "KN", cell: ({ row }) => <div>{row.getValue("kn")}</div> },
  { accessorKey: "cb", header: "CB", cell: ({ row }) => <div>{row.getValue("cb")}</div> },
  { accessorKey: "cl", header: "CL", cell: ({ row }) => <div>{row.getValue("cl")}</div> },
  { accessorKey: "cm", header: "CM", cell: ({ row }) => <div>{row.getValue("cm")}</div> },
  { accessorKey: "cp", header: "CP", cell: ({ row }) => <div>{row.getValue("cp")}</div> },
  { accessorKey: "cs", header: "CS", cell: ({ row }) => <div>{row.getValue("cs")}</div> },
  { accessorKey: "ct10", header: "CT10", cell: ({ row }) => <div>{row.getValue("ct10")}</div> },
  { accessorKey: "ct11", header: "CT11", cell: ({ row }) => <div>{row.getValue("ct11")}</div> },
  { accessorKey: "ct12", header: "CT12", cell: ({ row }) => <div>{row.getValue("ct12")}</div> },
  { accessorKey: "cst1", header: "CST1", cell: ({ row }) => <div>{row.getValue("cst1")}</div> },
  { accessorKey: "cst2", header: "CST2", cell: ({ row }) => <div>{row.getValue("cst2")}</div> },
  { accessorKey: "cs1", header: "CS1", cell: ({ row }) => <div>{row.getValue("cs1")}</div> },
  { accessorKey: "cp1", header: "CP1", cell: ({ row }) => <div>{row.getValue("cp1")}</div> },
  { accessorKey: "cm1", header: "CM1", cell: ({ row }) => <div>{row.getValue("cm1")}</div> },
  { accessorKey: "cb1", header: "CB1", cell: ({ row }) => <div>{row.getValue("cb1")}</div> },
  { accessorKey: "psw", header: "PSW", cell: ({ row }) => <div>{row.getValue("psw")}</div> },
  { accessorKey: "psw1", header: "PSW1", cell: ({ row }) => <div>{row.getValue("psw1")}</div> },
  { accessorKey: "psw2", header: "PSW2", cell: ({ row }) => <div>{row.getValue("psw2")}</div> },
  { accessorKey: "psw3", header: "PSW3", cell: ({ row }) => <div>{row.getValue("psw3")}</div> },
  { accessorKey: "psw4", header: "PSW4", cell: ({ row }) => <div>{row.getValue("psw4")}</div> },
  { accessorKey: "ht", header: "HT", cell: ({ row }) => <div>{row.getValue("ht")}</div> },
  { accessorKey: "tl1", header: "TL1", cell: ({ row }) => <div>{row.getValue("tl1")}</div> },
  { accessorKey: "tl2", header: "TL2", cell: ({ row }) => <div>{row.getValue("tl2")}</div> },
  { accessorKey: "tl3", header: "TL3", cell: ({ row }) => <div>{row.getValue("tl3")}</div> },
  { accessorKey: "tl4", header: "TL4", cell: ({ row }) => <div>{row.getValue("tl4")}</div> },
  { accessorKey: "kjkHt", header: "KJK HT", cell: ({ row }) => <div>{row.getValue("kjkHt")}</div> },
  { accessorKey: "kjkPsw", header: "KJK PSW", cell: ({ row }) => <div>{row.getValue("kjkPsw")}</div> },
  { accessorKey: "kjk", header: "KJK", cell: ({ row }) => <div>{row.getValue("kjk")}</div> },
  { accessorKey: "diperbarui", header: "DIPERBAHARUI", cell: ({ row }) => <div>{row.getValue("diperbarui")}</div> },
];
