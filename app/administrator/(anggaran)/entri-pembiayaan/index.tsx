import { Fragment } from "react";
import { columns} from "./components/columns";
import { DataTable } from "./components/data-table";
import { POKs } from "@/data/entri-pembiayaan";
// import { data } from "./data";

export default function AdvancedTable() {
  return (
    <Fragment>
      <DataTable
        data={POKs}
        columns={columns}
      />
    </Fragment>
  );
}
