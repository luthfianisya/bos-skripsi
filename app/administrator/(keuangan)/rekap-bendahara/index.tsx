import { Fragment } from "react";
import { columns, dataForm } from "./components/columns";
import { DataTable } from "./components/data-table";
// import { data } from "./data";

export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable
        data={dataForm}
        columns={columns}
      />
    </Fragment>
  );
}
