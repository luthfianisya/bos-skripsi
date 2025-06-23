import { Fragment, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { dummyForms, FullFormPermintaan } from "@/data/form-permintaan-f";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import VStepForm from "../tambah-permintaan/vstep-form";
import { POK } from "../../(anggaran)/entri-pembiayaan/components/columns";
import { mapPokTerpilihToPOK } from "@/lib/utils";
import POKTerpilihTable from "../tambah-permintaan/components/pok-terpilih-table";

export default function AdvancedTable() {
  const [data, setData] = useState<FullFormPermintaan[]>(dummyForms);
  const [selectedForm, setSelectedForm] = useState<FullFormPermintaan | null>(null);
  // const [openDetail, setOpenDetail] = useState(false);
  const [mappedPok, setMappedPok] = useState<POK[]>([]);
  const [open, setOpen] = useState(false);

  const handleDetailClick = (form: FullFormPermintaan) => {
    setSelectedForm(form);
    setOpen(true);
  };

  return (
    <Fragment>
      <DataTable
        data={data}
        columns={columns(handleDetailClick)}
      />

      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="9xl" overlayClass="backdrop-blur-none" className="h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg">Detail Permintaan</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            {/* <div className="text-sm text-gray-600">Deskripsi: {selectedForm?.deskripsi}</div> */}
            {selectedForm && (
              <VStepForm defaultValues={selectedForm} readOnly />
            )}
          </div>
        </DialogContent>
      </Dialog>

    </Fragment>
  );
}
