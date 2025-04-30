import { Fragment } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { dataRekap } from "@/data/rekap-bendahara";
// import { data } from "./data";

export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable
        data={dataRekap}
        columns={columns}
      />
    </Fragment>
  );
}
