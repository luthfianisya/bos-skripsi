import { Fragment } from "react";
import { DataTable } from "./data-table";
import { columns, pegawais } from "./columns";
// import { data } from "./data";

export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable
        data={[]}
        columns={columns}
      />
    </Fragment>
  );
}
