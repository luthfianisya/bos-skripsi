import { Fragment } from "react";
import { columnsRkpTahun } from "./components/columns-rekap-tahunan";
import { DataTable } from "./components/data-table-rekap";
import { presensiData } from "./data/rekap-tahunan";

// Definisi tipe data yang sesuai
interface RekapTahunan {
  nip: string;
  nama: string;
  bulan: string; // Contoh: "Januari", "Februari"
  tahun: string; // Contoh: "2024"
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

// Mapping nama bulan ke angka
const bulanMapping: { [key: string]: string } = {
  Januari: "01",
  Februari: "02",
  Maret: "03",
  April: "04",
  Mei: "05",
  Juni: "06",
  Juli: "07",
  Agustus: "08",
  September: "09",
  Oktober: "10",
  November: "11",
  Desember: "12",
};

// Definisi tipe props
interface RekapTahunanTableProps {
  filters: {
    periode: string | null;
    tahun: string | null;
    rentang: { from: string; to: string } | null; // Rentang tanggal
    satker: string | null;
    unitKerja: string | null;
    pegawai: string | null;
  };
}

export default function RekapTahunanTable({ filters }: RekapTahunanTableProps) {
  // Filter data berdasarkan tahun dan bulan
  const filteredData = presensiData.filter((item) => {
    // Filter berdasarkan tahun
    if (filters.tahun && item.tahun !== filters.tahun) {
      return false;
    }

    // Filter berdasarkan rentang bulan
    if (filters.rentang && filters.rentang.from && filters.rentang.to) {
      const itemBulan = bulanMapping[item.bulan]; // Konversi ke angka
      const fromBulan = bulanMapping[filters.rentang.from];
      const toBulan = bulanMapping[filters.rentang.to];

      // Pastikan bulan valid
      if (!itemBulan || !fromBulan || !toBulan) return false;

      // Konversi ke format "YYYY-MM"
      const itemDate = `${item.tahun}-${itemBulan}`;
      const fromDate = `${filters.tahun}-${fromBulan}`;
      const toDate = `${filters.tahun}-${toBulan}`;

      if (itemDate < fromDate || itemDate > toDate) {
        return false;
      }
    }

    return true;
  });

  return (
    <Fragment>
      <DataTable data={filteredData} columns={columnsRkpTahun} />
    </Fragment>
  );
}
