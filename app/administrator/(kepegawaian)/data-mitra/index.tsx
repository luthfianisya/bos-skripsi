import { Fragment } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { mitras } from "@/data/mitra-data";

export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable
        data={mitras}
        columns={columns}
      />
    </Fragment>
  );
}
