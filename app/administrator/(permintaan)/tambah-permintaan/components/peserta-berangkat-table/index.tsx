import { Fragment } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { PerjalananDinas } from "./columns"; // pastikan interface di-import

interface PesertaTableProps {
  data: PerjalananDinas[];
}

export default function PesertaTable({ data }: PesertaTableProps) {
  return (
    <Fragment>
      <DataTable
        data={data}
        columns={columns}
      />
    </Fragment>
  );
}
