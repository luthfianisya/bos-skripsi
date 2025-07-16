// components/index.tsx (AdvancedTable)
import { Fragment } from "react";
import { DataTable } from "./components/data-table";
import { Realisasi } from "./components/columns";

interface Props {
  data: Realisasi[];
}

export default function AdvancedTable({ data }: Props) {
  return (
    <Fragment>
      <DataTable<Realisasi> data={data} />
    </Fragment>
  );
}
