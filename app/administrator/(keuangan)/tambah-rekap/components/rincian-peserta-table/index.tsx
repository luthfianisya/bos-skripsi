import { Fragment } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

// Definisikan tipe props
interface RincianPesertaTableProps {
  data: {
    nip: string;
    nama: string;
    booked: number;
    realisasi: number;
    netto: number;
    pajak: number;
  }[];
}

export default function RincianPesertaTable({ data }: RincianPesertaTableProps) {
  return (
    <Fragment>
      <DataTable data={data} columns={columns} />
    </Fragment>
  );
}
