import { forms } from "@/data/form-permintaan-data";
import { Fragment } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";


export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable
        data={forms}
        columns={columns}
      />
    </Fragment>
  );
}
