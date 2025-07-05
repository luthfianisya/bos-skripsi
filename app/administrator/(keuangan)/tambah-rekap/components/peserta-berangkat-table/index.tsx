import { Fragment } from "react";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { PerjalananDinas } from "./columns";

interface PesertaTableProps {
  data: PerjalananDinas[];
  onUpdateTotal: (index: number, total: number) => void;
}

export default function PesertaTable({ data, onUpdateTotal }: PesertaTableProps) {
  const columns = getColumns(onUpdateTotal);

  return (
    <Fragment>
      <DataTable
        data={data}
        columns={columns}
      />
    </Fragment>
  );
}
