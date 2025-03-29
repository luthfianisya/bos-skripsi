import { Fragment } from "react";
import { DataTable } from "./data-table";
import { columns, presensiData } from "./columns";
// import { data } from "./data";

export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable
        data={presensiData}
        columns={columns}
      />
    </Fragment>
  );
}
