import { Fragment } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { dataRekap } from "@/data/rekap-bendahara";

export default function AdvancedTable({
  filterState,
  setFilterState,
}: {
  filterState: any;
  setFilterState: (state: any) => void;
}) {
  return (
    <Fragment>
      <DataTable
        data={dataRekap}
        columns={columns}
        filterState={filterState}
        setFilterState={setFilterState}
      />
    </Fragment>
  );
}
