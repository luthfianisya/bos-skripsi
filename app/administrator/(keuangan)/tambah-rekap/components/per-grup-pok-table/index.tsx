import { Fragment } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

// Definisikan tipe props
interface PerGrupPOKTableProps {
  data: {
    grupPok: string;
    booked: number;
    realisasi: number;
    netto: number;
    pajak: number;
  }[];
}

export default function PerGrupPOKTable({ data }: PerGrupPOKTableProps) {
  return (
    <Fragment>
      <DataTable data={data} columns={columns} />
    </Fragment>
  );
}
