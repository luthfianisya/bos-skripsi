import { Fragment } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Form } from "@/lib/interface";

interface AdvancedTableProps {
  data: Form[];
  onTambah: (item: Form) => void;
}

export default function AdvancedTable({ data, onTambah }: AdvancedTableProps) {
  return (
    <Fragment>
      <DataTable
        data={data} // ⬅️ sekarang pake props
        columns={columns(onTambah)} // ⬅️ action tambah
      />
    </Fragment>
  );
}
