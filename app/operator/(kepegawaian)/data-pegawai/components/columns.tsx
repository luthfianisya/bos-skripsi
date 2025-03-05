"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Pegawai {
  id: number;
  nama: string;
  avatar: string;
  nip: string;
  nipBaru: string;
  wilayah: string;
  unitKerja: string;
  gol: string;
  jabatan: string;
}

export const columns: ColumnDef<Pegawai>[] = [
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAMA" />
    ),
    cell: ({ row }) => {
      const user = row.original; // Mengambil data lengkap dari row
  
      return (
        <div className="flex gap-3 items-center">
          <Avatar className="rounded-full">
            <AvatarImage src={user.avatar} alt={user.nama} />
            <AvatarFallback>{user.nama?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-sm block text-card-foreground font-medium">
              {user.nama}
            </span>
            <span className="text-xs mt-1 block font-normal text-muted-foreground">
              {user.nip}
            </span>
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },  
  {
    accessorKey: "nip",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIP" />
    ),
    cell: ({ row }) => <div>{row.getValue("nip")}</div>,
  },
  {
    accessorKey: "nipBaru",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIP BARU" />
    ),
    cell: ({ row }) => <div>{row.getValue("nipBaru")}</div>,
  },
  {
    accessorKey: "wilayah",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="WILAYAH" />
    ),
    cell: ({ row }) => <div>{row.getValue("wilayah")}</div>,
  },
  {
    accessorKey: "unitKerja",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UNIT KERJA" />
    ),
    cell: ({ row }) => <div>{row.getValue("unitKerja")}</div>,
  },
  {
    accessorKey: "gol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GOLONGAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("gol")}</div>,
  },
  {
    accessorKey: "jabatan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JABATAN" />
    ),
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("jabatan")}</div>
    ),
  },
  
];

// Data pegawai
export const pegawais: Pegawai[] = [
  {
    id: 1,
    avatar: "/images/avatar/avatar-9.jpg",
    nama: "Mark Dsuza",
    nip: "123456789",
    nipBaru: "987654321",
    wilayah: "Jakarta",
    unitKerja: "BPS Jakarta Pusat",
    gol: "III/B",
    jabatan: "Statistisi Ahli Muda",
  },
  {
    id: 2,
    avatar: "/images/avatar/avatar-10.jpg",
    nama: "Josef Jennyfer",
    nip: "234567890",
    nipBaru: "876543210",
    wilayah: "Bandung",
    unitKerja: "BPS Kota Bandung",
    gol: "III/A",
    jabatan: "Statistisi Ahli Pertama",
  },
  {
    id: 3,
    avatar: "/images/avatar/avatar-8.jpg",
    nama: "Romeo D Custa",
    nip: "345678901",
    nipBaru: "765432109",
    wilayah: "Surabaya",
    unitKerja: "BPS Kota Surabaya",
    gol: "IV/A",
    jabatan: "Kepala Bidang Statistik Sosial",
  },
  {
    id: 4,
    avatar: "/images/avatar/avatar-7.jpg",
    nama: "Anald Donald",
    nip: "456789012",
    nipBaru: "654321098",
    wilayah: "Medan",
    unitKerja: "BPS Kota Medan",
    gol: "II/C",
    jabatan: "Statistisi Penyelia",
  },
  {
    id: 5,
    avatar: "/images/avatar/avatar-6.jpg",
    nama: "Vicky Patel",
    nip: "567890123",
    nipBaru: "543210987",
    wilayah: "Semarang",
    unitKerja: "BPS Kota Semarang",
    gol: "III/C",
    jabatan: "Statistisi Ahli Muda",
  },
  {
    id: 6,
    avatar: "/images/avatar/avatar-5.jpg",
    nama: "Daniel Smith",
    nip: "678901234",
    nipBaru: "432109876",
    wilayah: "Makassar",
    unitKerja: "BPS Kota Makassar",
    gol: "II/B",
    jabatan: "Statistisi Terampil",
  },
  {
    id: 7,
    avatar: "/images/avatar/avatar-4.jpg",
    nama: "Alice Johnson",
    nip: "789012345",
    nipBaru: "321098765",
    wilayah: "Yogyakarta",
    unitKerja: "BPS Kota Yogyakarta",
    gol: "IV/B",
    jabatan: "Kepala Seksi Neraca Wilayah",
  },
  {
    id: 8,
    avatar: "/images/avatar/avatar-3.jpg",
    nama: "David Brown",
    nip: "890123456",
    nipBaru: "210987654",
    wilayah: "Denpasar",
    unitKerja: "BPS Kota Denpasar",
    gol: "III/D",
    jabatan: "Statistisi Ahli Madya",
  },
  {
    id: 9,
    avatar: "/images/avatar/avatar-2.jpg",
    nama: "Sophia Wilson",
    nip: "901234567",
    nipBaru: "109876543",
    wilayah: "Pontianak",
    unitKerja: "BPS Kota Pontianak",
    gol: "II/A",
    jabatan: "Asisten Statistisi",
  },
  {
    id: 10,
    avatar: "/images/avatar/avatar-1.jpg",
    nama: "Michael Lee",
    nip: "012345678",
    nipBaru: "098765432",
    wilayah: "Palembang",
    unitKerja: "BPS Kota Palembang",
    gol: "III/A",
    jabatan: "Statistisi Ahli Pertama",
  },
];
