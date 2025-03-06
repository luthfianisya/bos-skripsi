import { Fragment } from "react";
import { columnsBulanan } from "./components/columns-bulanan";
import { DataTable } from "./components/data-table";
import { dummyData } from "./data/bulanan";

// Definisi tipe props
interface BulananTableProps {
  filters: {
    periode: string | null;
    tahun: string | null;
    rentang: any | null;
    satker: string | null;
    unitKerja: string | null;
    pegawai: string | null;
  };
}

export default function BulananTable({ filters }: BulananTableProps) {
  // Filter data berdasarkan filters yang diterima
  const filteredData = dummyData.filter((item) => {
    // Contoh filter berdasarkan tahun
    if (filters.tahun && item.tahun !== filters.tahun) return false;
    
    // Contoh filter berdasarkan unit kerja
    if (filters.unitKerja && item.unitKerja !== filters.unitKerja) return false;

    return true;
  });

  return (
    <Fragment>
      <DataTable data={filteredData} columns={columnsBulanan} />
    </Fragment>
  );
}
