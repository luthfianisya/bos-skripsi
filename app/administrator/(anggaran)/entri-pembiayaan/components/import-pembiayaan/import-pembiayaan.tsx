"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { ArrowDownTrayIcon, ArrowUpTrayIcon, DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";
import AdvancedTable from ".";


const VStepFormPembiayaan = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button type="button" color="primary" size="md" icon={DocumentArrowUpIcon}>
          Import Entri
        </Button>
      </DialogTrigger>
      <DialogContent size="7xl" overlayClass="backdrop-blur-none">
        <DialogHeader>
          <DialogTitle className="text-lg">
          Entri Pembiayaan
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-4">
          {/* Left Side: Steps */}
          <div className="col-span-12 xl:col-span-4 border-r border-gray-300 pr-4">
            <Stepper current={3} direction="vertical">
              <Step className="flex flex-col gap-2 flex-1">
                <StepLabel className="font-semibold">Download Template</StepLabel>
                <p className="text-xs text-gray-500 mb-2">
                  Download template Import Pembiayaan
                </p>
                <Button variant="outline" size="md" icon={ArrowDownTrayIcon} className="w-44">
                  Download Excel
                </Button>
              </Step>
              <Step className="flex flex-col gap-2 flex-1">
                <StepLabel className="font-semibold">Lengkapi Isian Template</StepLabel>
                <p className="text-xs text-gray-500 mb-2">
                  Lengkapi isian dari template dengan master yang tersedia.
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Note:</strong> Harap tidak mengubah urutan kolom atau baris.
                </p>
              </Step>
              <Step className="flex flex-col gap-2 flex-1">
                <StepLabel className="font-semibold">Upload Template Terisi</StepLabel>
                <p className="text-xs text-gray-500 mb-2">
                  Upload template Import Pembiayaan terisi
                </p>
                <Button size="md" icon={ArrowUpTrayIcon} className="w-44">Upload Excel</Button>
              </Step>
            </Stepper>
          </div>


          {/* Right Side: Content */}
          <div className="col-span-12 xl:col-span-8  max-h-[400px] overflow-y-auto">
            <div className="col-span-12">
              <h4 className="text-lg font-semibold text-gray-800">Preview Data Pembiayaan</h4>
            </div>

            {/* Table Wrapper */}
            <div className="mt-4 w-full">
              <AdvancedTable />
            </div>

          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-6 gap-2">
          <Button size="md" variant="soft" color="secondary" onClick={() => setOpen(false)}>Batal</Button>
          <Button size="md" color="primary">Import</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VStepFormPembiayaan;
