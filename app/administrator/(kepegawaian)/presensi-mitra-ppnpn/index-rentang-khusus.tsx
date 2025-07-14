import { Fragment } from "react";
import { columnsRentang } from "./components/columns-rentang-khusus";
import { DataTable } from "./components/data-table";
import { dataPresensiRentang } from "@/data/presensi-rentang-data";
import { isWithinInterval, parseISO } from "date-fns";

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

    // Filter berdasarkan rentang tanggal
    if (filters.rentang && filters.rentang.from && filters.rentang.to) {
      const itemDate = parseISO(item.tanggalISO); // Ini tetap pakai parseISO karena ISO string
      const fromDate = filters.rentang.from;
      const toDate = filters.rentang.to;

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
