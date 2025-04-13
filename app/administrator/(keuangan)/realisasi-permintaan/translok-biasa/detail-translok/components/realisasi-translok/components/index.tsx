import { Fragment } from "react";
import { columns, data } from "./columns";
import { DataTable } from "./data-table";
// import { data } from "./data";

export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable
        data={data}
        columns={columns}
      />
    </Fragment>
  );
}
