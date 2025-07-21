import { Fragment, useState } from "react";
import { columns, POK } from "./components/columns";
import { DataTable } from "./components/data-table";
import { POKs } from "@/data/entri-pembiayaan";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AssignPembiayaan from "./components/assign-pembiayaan/assign-pembiayaan";


export default function AdvancedTable() {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEditRow, setSelectedEditRow] = useState<POK | null>(null);

  const handleEditClick = (row: POK) => {
    setSelectedEditRow(row);
    setOpenEdit(true);
  };

    const handleClose = () => {
    setOpenEdit(false);
    setSelectedEditRow(null);
  };

  return (
    <Fragment>
      <DataTable
        data={POKs}
        columns={columns(handleEditClick)}
      />

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent  overlayClass="backdrop-blur-none">
          <DialogHeader>
            <DialogTitle>Assign Pembiayaan</DialogTitle>
          </DialogHeader>
          {selectedEditRow && (
            <AssignPembiayaan
              rowData={selectedEditRow}
              onClose={handleClose}
            />
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
