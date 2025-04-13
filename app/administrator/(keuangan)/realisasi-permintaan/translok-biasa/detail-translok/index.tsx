import { Fragment } from "react";
import { DataTable } from "./components/data-table";
import { realisasis, Realisasi } from "./components/columns";


export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable<Realisasi> data={realisasis} />
    </Fragment>
  );
}
