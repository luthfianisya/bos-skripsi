"use client";

import React from "react";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import AdvancedTable from "./components/pok-table/index";
import { Plus } from "lucide-react";
import POKTerpilihTable from "./components/pok-terpilih-table";
import PesertaTable from "./components/peserta-berangkat-table";

const VStepForm = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const steps = [
    { label: "Informasi Umum", content: "Isi informasi umum permintaan" },
    { label: "POK", content: "Pilih POK yang tersedia" },
    { label: "Peserta Berangkat", content: "Tambahkan peserta yang berangkat" },
  ];

  const isStepOptional = (step: number) => step === 1;

  const handleNext = () => setActiveStep((prev) => prev + 1);

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleReset = () => setActiveStep(0);

  const onSubmit = () => {
    toast({
      title: "You submitted the following values:",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-primary-foreground">Done</p>
        </div>
      ),
    });
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Sidebar Stepper */}
      <div className="col-span-12 xl:col-span-3 border-r border-gray-300 pr-4">
        <Stepper current={activeStep} direction="vertical">
          {steps.map((step, index) => {
            const labelProps: any = {};

            if (isStepOptional(index)) {
              labelProps.optional = <StepLabel>Optional</StepLabel>;
            }

            return (
              <Step key={step.label}>
                <StepLabel {...labelProps}>
                  <div className="flex flex-col">
                    <span>{step.label}</span>
                    <span>{step.content}</span>
                  </div>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>

      {/* Step Form Content */}
      <div className="col-span-12 xl:col-span-9">
        {activeStep === steps.length ? (
          <div className="flex flex-col items-center">
            <div className="mt-2 mb-4 text-center font-semibold">
              All steps completed - you're finished
            </div>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        ) : (
          <>
            <form>
              <div className="grid grid-cols-12 gap-4">
                {/* Step 1 */}
                {activeStep === 0 && (
                  
                  <div className="grid grid-cols-12 gap-4 col-span-12">
                    <div className="col-span-12">
      <h4 className="text-lg font-semibold text-gray-800">Informasi Umum</h4>
      <p className="mt-1 text-sm text-gray-500">
        Isikan data informasi umum yang sesuai untuk permintaan ini.
      </p>
    </div>
                    
                    {/* Baris 1: Satuan Kerja | Unit Kerja | Tahun Anggaran */}
                    <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="satker" >Satuan Kerja</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Satuan Kerja" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="satker1">Satker 1</SelectItem>
                            <SelectItem value="satker2">Satker 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="unitKerja">Unit Kerja</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Unit Kerja" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unit1">Unit 1</SelectItem>
                            <SelectItem value="unit2">Unit 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="tahunAnggaran">Tahun Anggaran</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Tahun" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Baris 2: Tipe Form | Sub-Tipe Form | Jenis POK */}
                    <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="tipeForm">Tipe Form</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Tipe Form" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="perjalanan">Perjalanan Dinas</SelectItem>
                            <SelectItem value="barang">Pengadaan Barang</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="subTipeForm">Sub-Tipe Form</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Sub-Tipe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dalam_negeri">Dalam Negeri</SelectItem>
                            <SelectItem value="luar_negeri">Luar Negeri</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label>Jenis POK</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="jenisPok" value="single" className="accent-primary" />
                            <span>Single POK</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="jenisPok" value="multi" className="accent-primary" />
                            <span>Multi POK</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Baris 3: Nomor Surat | Tanggal Surat */}
                    <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="nomorSurat">Nomor Surat</Label>
                        <Input type="text" id="nomorSurat" placeholder="Nomor Surat" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="tanggalSurat">Tanggal Surat</Label>
                        <Input type="date" id="tanggalSurat" />
                      </div>
                    </div>

                    {/* Baris 4: Deskripsi Permintaan */}
                    <div className="col-span-12 flex flex-col gap-2">
                      <Label htmlFor="deskripsiPermintaan">Deskripsi Permintaan</Label>
                      <textarea
                        id="deskripsiPermintaan"
                        placeholder="Deskripsi lengkap permintaan..."
                        className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-primary"
                        rows={4}
                      />
                    </div>

                    {/* Baris 5: Link Permintaan Belanja | Upload KAK */}
                    <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="linkPermintaan">Link Permintaan Belanja</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Link Permintaan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="link1">Permintaan 1</SelectItem>
                            <SelectItem value="link2">Permintaan 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="uploadKAK">Upload KAK</Label>
                        <Input type="file" id="uploadKAK" />
                      </div>
                    </div>
                  </div>
)}

                {/* Step 2 */}
                {activeStep === 1 && (
  <>
    <div className="col-span-12">
      <h4 className="text-lg font-semibold text-gray-800">Pilih POK</h4>
      <p className="mt-1 text-sm text-gray-500">
        Pilih data POK yang sesuai untuk permintaan ini.
      </p>
    </div>

    {/* Komponen Tabel POK */}
    <div className="col-span-12">
      <AdvancedTable />
    </div>

    <div className="col-span-12 pt-6">
      <h4 className="text-lg font-semibold text-gray-800">Preview Data POK Terpilih</h4>
      {/* <p className="mt-1 text-sm text-gray-500">
        Pilih data POK yang sesuai untuk permintaan ini.
      </p> */}
    </div>

    {/* Komponen Tabel POK */}
    <div className="col-span-12">
      <POKTerpilihTable />
    </div>
  </>
)}

                {/* Step 3 */}
                {activeStep === 2 && (
  <>
  <div className="col-span-12">
      <h4 className="text-lg font-semibold text-gray-800">Pilih Peserta Berangkat</h4>
      {/* <p className="mt-1 text-sm text-gray-500">
        Pilih data POK yang sesuai untuk permintaan ini.
      </p> */}
    </div>
    <div className="grid grid-cols-12 gap-4 col-span-12">
      
      {/* Baris 1: Peserta | Wilayah | Sensus/Survei | Kegiatan */}
      <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="flex flex-col gap-2 col-span-3">
          <Label htmlFor="peserta">Peserta</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Kategori Peserta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sobat">Pegawai/Mitra/PPNPN</SelectItem>
              <SelectItem value="bps">Mitra Sensus/Survei SOBAT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 col-span-3">
          <Label htmlFor="wilayah">Wilayah</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Wilayah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wilayah1">Wilayah 1</SelectItem>
              <SelectItem value="wilayah2">Wilayah 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 col-span-3">
          <Label htmlFor="sensus">Sensus/Survei</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Sensus/Survei" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sensus1">Sensus 1</SelectItem>
              <SelectItem value="survey2">Survei 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 col-span-3">
          <Label htmlFor="kegiatan">Kegiatan</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Kegiatan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kegiatan1">Kegiatan 1</SelectItem>
              <SelectItem value="kegiatan2">Kegiatan 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

{/* Nama Peserta - Asal-Tujuan - Tanggal Pergi Pulang */}
<div className="col-span-12 grid grid-cols-12 gap-4">

  {/* Nama Peserta */}
  <div className="col-span-4 flex flex-col gap-2">
    <Label>Nama Peserta</Label>
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih Nama Peserta" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="andi">Andi</SelectItem>
        <SelectItem value="budi">Budi</SelectItem>
      </SelectContent>
    </Select>
  </div>

  {/* Asal - Tujuan */}
  <div className="col-span-4 flex flex-col gap-2">
  <Label>Asal - Tujuan</Label>
  <div className="flex items-center gap-2">
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih Asal" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="jakarta">Jakarta</SelectItem>
      </SelectContent>
    </Select>

    <span className="mx-2 text-lg font-semibold text-gray-500">-</span>
 {/* Tanda pemisah */}

    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih Tujuan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bandung">Bandung</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>

  {/* Pulang - Pergi */}
  <div className="col-span-4 flex flex-col gap-2">
  <Label>Pulang - Pergi</Label>
  <div className="flex items-center gap-2">
    <Input type="date" className="w-full" />

    <span className="mx-2 text-lg font-semibold text-gray-500">-</span>
 {/* Tanda pemisah */}

    <Input type="date" className="w-full" />
  </div>
</div>

</div>

{/* Tombol Tambah */}
<div className="col-span-12 flex justify-end mt-2">
  <Button type="button" size="md" icon={Plus} color="primary">Tambah</Button>
</div>
    </div>

    <div className="col-span-12 pt-2">
      <h4 className="text-lg font-semibold text-gray-800">Preview Data Peserta Berangkat</h4>
      {/* <p className="mt-1 text-sm text-gray-500">
        Pilih data POK yang sesuai untuk permintaan ini.
      </p> */}
    </div>

    <div className="col-span-12">
      <PesertaTable />
    </div>
  </>
)}
              </div>
            </form>

            {/* Navigation Buttons */}
            <div className="flex pt-4 items-center gap-2">
              <Button
                size="xs"
                variant="outline"
                className={cn("cursor-pointer", {
                  hidden: activeStep === 0,
                })}
                onClick={handleBack}
              >
                Back
              </Button>

              <div className="flex-1" />

              {activeStep === steps.length - 1 ? (
                <Button
                  size="xs"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => {
                    onSubmit();
                    handleNext();
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  size="xs"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VStepForm;
