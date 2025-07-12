import { Fragment } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
// import { data } from "./data";

export default function PesertaTable() {
  return (
    <Fragment>
      <DataTable
        data={[]}
        columns={columns}
      />
    </Fragment>
  );
}
