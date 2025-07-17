import { Fragment, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
// import { dataRekap, RekapForm } from "@/data/rekap-bendahara";

import VStepForm from "../tambah-rekap/vstep-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FullFormRekap, fullFormRekap } from "@/data/rekap-bendahara-f";

export default function AdvancedTable({
  filterState,
  setFilterState,
}: {
  filterState: any;
  setFilterState: (state: any) => void;
}) {
  const [selectedForm, setSelectedForm] = useState<FullFormRekap | null>(null);
  const [open, setOpen] = useState(false);

  const handleDetailClick = (form: FullFormRekap) => {
    setSelectedForm(form);
    setOpen(true);
  };

  return (
    <Fragment>
      <DataTable
        data={fullFormRekap}
        columns={columns(handleDetailClick)} // ✅ ini callback
        filterState={filterState}
        setFilterState={setFilterState}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="9xl" overlayClass="backdrop-blur-none" className="h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg">Detail Rekap</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            {selectedForm && (
              <VStepForm defaultValues={selectedForm} readOnly />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

