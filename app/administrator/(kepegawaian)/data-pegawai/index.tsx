import { Fragment } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { pegawais } from "@/data/pegawai-data";

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
