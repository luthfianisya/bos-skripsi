import { Fragment } from "react";
import { columnsBulanan } from "./components/columns-bulanan";
import { DataTable } from "./components/data-table-bulanan";
import { DUMMY_PRESENSI_BULANAN } from "@/data/presensi-bulanan-data";
// Ganti path sesuai lokasi aslinya

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
  const dummyData = DUMMY_PRESENSI_BULANAN;

  // const filteredData = dummyData.filter((item) => {
  //   if (filters.tahun && item.tahun !== filters.tahun) return false;
  //   if (filters.unitKerja && item.unitKerja !== filters.unitKerja) return false;
  //   return true;
  // });

  return (
    <Fragment>
      {/* <DataTable data={filteredData} columns={columnsBulanan} /> */}
      <DataTable data={dummyData} columns={columnsBulanan} />
    </Fragment>
  );
}
