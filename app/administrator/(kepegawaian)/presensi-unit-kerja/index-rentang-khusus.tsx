import { Fragment } from "react";
import { columnsRentang } from "./components/columns-rentang-khusus";
import { DataTable } from "./components/data-table";
import { isWithinInterval, parseISO } from "date-fns";
import { dataPresensiRentang } from "@/data/presensi-rentang-data";

// Definisi tipe props
interface RentangTableProps {
  filters: {
    periode: string | null;
    tahun: string | null;
    rentang: { from: string; to: string } | null; // Rentang tanggal
    satker: string | null;
    unitKerja: string | null;
    pegawai: string | null;
  };
}

export default function RentangTable({ filters }: RentangTableProps) {
  // Filter data berdasarkan filters yang diterima
  const filteredData = dataPresensiRentang.filter((item) => {
    // // Filter berdasarkan tahun
    // if (filters.tahun && item.tahun !== filters.tahun) return false;

    // // Filter berdasarkan unit kerja
    // if (filters.unitKerja && item.unitKerja !== filters.unitKerja) return false;

    // // Filter berdasarkan pegawai
    // if (filters.pegawai && item.pegawai !== filters.pegawai) return false;

    // Filter berdasarkan rentang tanggal
    if (filters.rentang && filters.rentang.from && filters.rentang.to) {
      const itemDate = parseISO(item.tanggal); // Konversi string ke Date
      const fromDate = parseISO(filters.rentang.from);
      const toDate = parseISO(filters.rentang.to);

      if (!isWithinInterval(itemDate, { start: fromDate, end: toDate })) {
        return false;
      }
    }

    return true;
  });

  return (
    <Fragment>
      <DataTable data={filteredData} columns={columnsRentang} />
    </Fragment>
  );
}
