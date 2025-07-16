import { Fragment } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { Realisasi } from "@/lib/interface";
// import { dataForm } from "@/data/form-permintaan-data";
import { dummyForms } from "@/data/form-permintaan-f-2";

const filteredData = dummyForms.filter(item => 
  item.approvals.operator === "submit" &&
  item.approvals.pj === "approved" &&
  item.approvals.ppk === "approved"
);

const mappedData: Realisasi[] = filteredData.map(item => ({
  noPermintaan: item.noPermintaan,
  deskripsi: item.deskripsi,
  noSurat: item.noSurat,
  paguBooked: item.jumlahUsulan,
  paguReali: item.jumlahUsulan, // contoh realisasi 90%
}));

export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable
        data={mappedData}
        columns={columns}
      />
    </Fragment>
  );
}
