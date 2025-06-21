import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import HStepForm from "./hstep-form";


export default function TambahRekapDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" color="primary" size="md" icon={Plus}>
          Tambah Rekap
        </Button>
      </DialogTrigger>
      <DialogContent size="9xl" overlayClass="backdrop-blur-none" className="h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg">Tambah Rekap</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <HStepForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
