import { Realisasi } from "@/app/administrator/(keuangan)/realisasi-permintaan/translok-biasa/detail-translok/components/columns";
import { DUMMY_PEGAWAIS } from "./pegawai-dummy";


const pegawai = DUMMY_PEGAWAIS[0]; // ambil index 0

export const realisasis: Realisasi[] = [
  {
    nip: pegawai.nip,
    nama: pegawai.nama,
    translok: "BELUM",
    berangkat: "ya",
    booked: 170000,
    realisasi: 0,
    statusSpj: "Belum Proses",
  },
];
