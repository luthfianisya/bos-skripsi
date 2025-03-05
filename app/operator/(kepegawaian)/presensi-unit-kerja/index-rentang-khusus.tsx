import { Fragment } from "react";
import { columns} from "./components/columns";
import { DataTable } from "./components/data-table";
import { presensiData } from "./data/rentang-khusus";
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
