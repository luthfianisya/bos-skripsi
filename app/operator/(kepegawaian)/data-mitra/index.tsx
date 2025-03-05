import { Fragment } from "react";
import { columns, pegawais } from "./components/columns";
import { DataTable } from "./components/data-table";
// import { data } from "./data";

export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable
        data={pegawais}
        columns={columns}
      />
    </Fragment>
  );
}
