import { Fragment } from "react";
import { columns } from "./columns"; // columns khusus untuk tabel terpilih
import { DataTable } from "./data-table";
import { POK } from "./columns"; // tipe POK

interface POKTerpilihTableProps {
  data: POK[];
  onHapus: (item: POK) => void;
  readOnly?: boolean;
}
export default function POKTerpilihTable({ data, onHapus, readOnly = false }: POKTerpilihTableProps) {
  return (
    <Fragment>
      <DataTable
        data={data}
        columns={columns(onHapus, readOnly)}
      />
    </Fragment>
  );
}
