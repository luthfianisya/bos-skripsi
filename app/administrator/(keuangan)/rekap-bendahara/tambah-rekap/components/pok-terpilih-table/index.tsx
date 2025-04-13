import { Fragment } from "react";
import { columns, pegawais } from "./columns";
import { DataTable } from "./data-table";
// import { data } from "./data";

export default function POKTerpilihTable() {
  return (
    <Fragment>
      <DataTable
        data={pegawais}
        columns={columns}
      />
    </Fragment>
  );
}
