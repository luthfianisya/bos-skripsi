import { Fragment } from "react";
import { columns as getColumns, data } from "./columns"; // rename import function menjadi getColumns
import { DataTable } from "./data-table";

interface AdvancedTableProps {
  isBlokTranslokActive: boolean;
}

export default function AdvancedTable({ isBlokTranslokActive }: AdvancedTableProps) {
  const columns = getColumns(isBlokTranslokActive); // panggil function dengan props

  return (
    <Fragment>
      <DataTable
        data={data}
        columns={columns}
      />
    </Fragment>
  );
}
