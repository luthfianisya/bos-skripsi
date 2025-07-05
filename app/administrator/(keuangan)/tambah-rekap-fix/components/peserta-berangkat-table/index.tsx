import { Fragment } from "react";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { Peserta } from "./columns";

interface PesertaTableProps {
  data: Peserta[];
  onUpdateTotal: (index: number, total: number) => void;
  readOnly: boolean;
}

export default function PesertaTable({ data, onUpdateTotal, readOnly }: PesertaTableProps) {
  const columns = getColumns(onUpdateTotal, readOnly);

  return (
    <Fragment>
      <DataTable
        data={data}
        columns={columns}
        readOnly={readOnly}
      />
    </Fragment>
  );
}

