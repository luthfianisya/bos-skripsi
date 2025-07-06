import { Fragment } from "react";
import { columns } from "./columns"; // columns khusus untuk tabel terpilih
import { DataTable } from "./data-table";
import { FormPOK } from "@/lib/interface";

interface POKTerpilihTableProps {
  data: FormPOK[];
  onHapus: (item: FormPOK) => void;
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
