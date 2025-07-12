"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { ArrowDownTrayIcon, ArrowUpTrayIcon, DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "react-select";
import { motion } from "framer-motion";
import PesertaTable from ".";

const VStepFormPeserta = () => {
  const [open, setOpen] = useState(false);
  const [showSelects, setShowSelects] = useState(false);

  const satker = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const tahun = [
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
  ];

  const organisasi = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const styles = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" color="primary" variant="outline" size="md" icon={DocumentArrowUpIcon}>
          Import Peserta
        </Button>
      </DialogTrigger>
      <DialogContent size="5xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Import Peserta Berangkat</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-4 border-r border-gray-300 pr-4">
            <Stepper current={3} direction="vertical" className="items-start">
              <Step className="flex flex-col gap-2 self-start p-4 border rounded-lg bg-gray-50 mb-6">
                <StepLabel className="font-semibold">Download Template</StepLabel>
                <p className="text-xs text-gray-500 mb-2">Download template Peserta Berangkat yang tersedia</p>

                <div className="flex items-center gap-2 mb-2">
                  <Checkbox
                    id="default_2"
                    checked={showSelects}
                    onCheckedChange={(checked) => setShowSelects(checked === "indeterminate" ? false : checked)}
                  />
                  <label htmlFor="default_2" className="text-sm font-medium">Sertakan Master SOBAT</label>
                </div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: showSelects ? 1 : 0, height: showSelects ? "auto" : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-visible z-[9999]"
                >
                  <div className="grid grid-cols-1 w-full space-y-4 z-[9999]">
                    <div>
                      <label className="font-medium block mb-1">Tahun Anggaran</label>
                      <Select className="react-select w-full z-[9999]" classNamePrefix="select" styles={styles} options={tahun} isClearable />
                    </div>

                    <div>
                      <label className="font-medium block mb-1">Satuan Kerja</label>
                      <Select className="react-select w-full z-[9998]" classNamePrefix="select" styles={styles} options={satker} isClearable />
                    </div>

                    <div>
                      <label className="font-medium block mb-1">Unit Kerja</label>
                      <Select className="react-select w-full z-[9997]" classNamePrefix="select" styles={styles} options={satker} isClearable />
                    </div>
                  </div>
                </motion.div>

                <Button variant="outline" size="md" icon={ArrowDownTrayIcon} className="w-full mt-4 mb-6 z-1000">
                  Download Excel
                </Button>
              </Step>

              <Step className="flex flex-col gap-2 self-start">
                <StepLabel className="font-semibold">Lengkapi Isian Template</StepLabel>
                <p className="text-xs text-gray-500 mb-6">Harap tidak mengubah urutan kolom atau baris.</p>
              </Step>

              <Step className="flex flex-col gap-2 self-start">
                <StepLabel className="font-semibold">Upload Template Terisi</StepLabel>
                <p className="text-xs text-gray-500 mb-2">Upload template Simulasi Perjalanan terisi</p>
                <Button size="md" icon={ArrowUpTrayIcon} className="w-full">Upload Excel</Button>
              </Step>
            </Stepper>
          </div>
          <div className="col-span-12 xl:col-span-8">
            <div className="col-span-12">
              <h4 className="text-lg font-semibold text-gray-800">Preview Data Simulasi Perjalanan</h4>
              <p className="mt-1 text-sm text-gray-500">Isikan data informasi umum yang sesuai untuk permintaan ini.</p>
            </div>
            <div className="mt-4 w-full">
              <PesertaTable />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button size="md" variant="soft" color="secondary" onClick={() => setOpen(false)}>Batal</Button>
          <Button size="md" color="primary">Import</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VStepFormPeserta;
