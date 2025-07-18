import { Fragment } from "react";
import { columns, pegawais } from "./columns";
import { DataTable } from "./data-table";
// import { data } from "./data";

export default function PesertaTable() {
  return (
    <Fragment>
      <DataTable
        data={pegawais}
        columns={columns}
      />
    </Fragment>
  );
}
