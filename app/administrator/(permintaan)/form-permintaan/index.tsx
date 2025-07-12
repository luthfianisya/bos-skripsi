import { Fragment, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { dummyForms, FullFormPermintaan } from "@/data/form-permintaan-f";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import VStepForm from "../tambah-permintaan/vstep-form";
import { POK } from "../../(anggaran)/entri-pembiayaan/components/columns";
import StaticGenerationSearchParamsBailoutProvider from "next/dist/client/components/static-generation-searchparams-bailout-provider";
import { Card } from "@/components/ui/card";
import FileUploaderMultiple from "./components/up-attachment/file-uploader-multiple";
import { Button } from "@/components/ui/button";

export default function AdvancedTable() {
  const [data, setData] = useState<FullFormPermintaan[]>(dummyForms);
  const [selectedForm, setSelectedForm] = useState<FullFormPermintaan | null>(null);
  const [openUpload, setOpenUpload] = useState(false);
  const [mappedPok, setMappedPok] = useState<POK[]>([]);
  const [open, setOpen] = useState(false);

  const handleDetailClick = (form: FullFormPermintaan) => {
    setSelectedForm(form);
    setOpen(true);
  };

  const handleUploadAttachment = (form: FullFormPermintaan) => {
    setSelectedForm(form);
    setOpenUpload(true);
  };

  return (
    <Fragment>
      <DataTable
        data={data}
        columns={columns(handleDetailClick, handleUploadAttachment)}
      />


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="9xl" overlayClass="backdrop-blur-none" className="h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-lg">Detail Permintaan</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            {selectedForm && (
              <VStepForm defaultValues={selectedForm} readOnly />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openUpload} onOpenChange={setOpenUpload}>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle>Upload Ulang Attachment untuk {selectedForm?.noPermintaan}</DialogTitle>
          </DialogHeader>

          <Card>
            <FileUploaderMultiple onUploadSuccess={() => setOpenUpload(false)} />
          </Card>
        </DialogContent>
      </Dialog>

    </Fragment>
  );
}
