import { Fragment } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { FormPOK } from "@/lib/interface";

interface AdvancedTableProps {
  data: FormPOK[];
  onTambah: (item: FormPOK) => void;
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
