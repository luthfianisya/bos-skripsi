import { Fragment } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { POK } from "./columns";

interface AdvancedTableProps {
  data: POK[];
  onTambah: (item: POK) => void;
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
