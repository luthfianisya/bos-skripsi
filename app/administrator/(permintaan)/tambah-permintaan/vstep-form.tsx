"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { toast as stoast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import StepInformasiUmum from "./steps/step1";
import StepPOK from "./steps/step2";
import StepPeserta from "./steps/step3";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { POK } from "./components/pok-terpilih-table/columns";
import { cn } from "@/lib/utils";
import { PerjalananDinas } from "./components/peserta-berangkat-table/columns";

import { FullFormPermintaan } from "@/data/form-permintaan-f"; // pastikan impor ini ada
import { SUB_TIPE_FORM_MAP, TIPE_FORM_MAP } from "@/lib/constants";

interface VStepFormProps {
  defaultValues?: any;
  readOnly?: boolean;
  data?: FullFormPermintaan;
}

const VStepForm = ({ defaultValues, readOnly = false, data }: VStepFormProps & { data?: FullFormPermintaan }) => {
  const router = useRouter();
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      uploadKAK: undefined,
      noSurat: defaultValues?.noSurat ?? "",
      tanggalSurat: defaultValues?.tanggalSurat ?? "",
      deskripsiPermintaan: defaultValues?.deskripsi ?? "",
      tipeForm: defaultValues?.tipeForm
      ? {
          value: defaultValues.tipeForm,
          label: `[${TIPE_FORM_MAP[defaultValues.tipeForm].code}] ${TIPE_FORM_MAP[defaultValues.tipeForm].label}`,
        }
      : null,
      subTipeForm:
      defaultValues?.subTipeForm && defaultValues?.tipeForm &&
      SUB_TIPE_FORM_MAP[defaultValues.tipeForm]
        ? {
            value: defaultValues.subTipeForm,
            label:
              SUB_TIPE_FORM_MAP[defaultValues.tipeForm].find(
                (opt) => opt.value === defaultValues.subTipeForm
              )?.label ?? defaultValues.subTipeForm, // fallback kalau label tidak ditemukan
          }
        : null,
    
    
    },
  });


  const { trigger } = methods;

  const [activeStep, setActiveStep] = React.useState(0);
  const [pokTerpilih, setPokTerpilih] = React.useState<POK[]>(
    (data?.pokTerpilih ?? []).map(p => ({
      ...p,
      paguAwal: p.nilai,
      paguRevisi: 0,
      paguBooked: 0,
      paguReali: 0,
      selfBlocking: 0,
      kodeBeban: p.kode, // default asal sama
      jenisP: "",
      hargaSatuan: 0,
      volume: 0,
      satuan: "",
      tipeForm: "",
      ppk: "",
      unitKerja: "",
      status: "terpakai", // default aman
    }))
  );
  const [dataPeserta, setDataPeserta] = React.useState<PerjalananDinas[]>(
    (data?.dataPeserta ?? []).map((p) => ({
      nama: p.nama,
      gol: p.gol,
      asal: p.asal,
      tujuan: p.tujuan,
      pulangPergi: p.pulangPergi,
      jumlah: p.jumlah,
    }))
  );
  const [fileKAK, setFileKAK] = React.useState<File | null>(null); // tetap null karena File tidak bisa diserialisasi


  const steps = [
    { label: "Informasi Umum", content: "Isi informasi umum permintaan" },
    { label: "POK", content: "Pilih POK yang tersedia" },
    { label: "Peserta Berangkat", content: "Tambahkan peserta yang berangkat" },
  ];

  const handleNext = async () => {
    const valid = await trigger();
    if (activeStep === 1 && pokTerpilih.length === 0) {
      stoast.error("Data POK harus terisi, tabel tidak boleh kosong", { position: "top-right" });
      return;
    }
    if (!valid) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  // const handleSubmitFinal = () => {
  //   stoast.success("Data Form Permintaan berhasil di-submit ke PJ", { position: "top-right" });
  //   setTimeout(() => router.push("/administrator/form-permintaan"), 1500);
  // };

  const handleSimpan = () => {
    stoast.info("Data Form permintaan berhasil disimpan", { position: "top-right" });
  };

  const { getValues } = methods;

  const handleSubmitFinal = () => {
    const formData = {
      ...getValues(),          // dari StepInformasiUmum
      pokTerpilih,             // dari StepPOK
      dataPeserta,             // dari StepPeserta
    };

    console.log("FULL FORM:", formData);

    stoast.success("Data Form Permintaan berhasil di-submit ke PJ", { position: "top-right" });
    setTimeout(() => router.push("/administrator/form-permintaan"), 1500);
  };


  return (
    <div className="flex flex-col gap-4">
      {/* Stepper di atas konten */}
      <div className="sticky top-0 z-40 bg-white border-b p-4">
        <Stepper current={activeStep} direction="horizontal">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-base font-semibold",
                      index === activeStep ? "text-blue-600" : "text-gray-800"
                    )}
                  >
                    {step.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{step.content}</span>
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Step Form Content */}
      <div className="flex-1 overflow-y-auto px-4 z-30">
        {activeStep === steps.length ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="mb-4 text-center font-semibold">Semua langkah telah selesai!</div>
            <Button size="xs" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        ) : (
          <FormProvider {...methods}>
            <form>
              <div className="grid grid-cols-12 gap-4">
                {activeStep === 0 && (
                  <StepInformasiUmum fileKAK={fileKAK} setFileKAK={setFileKAK} readOnly={readOnly} />
                )}

                {activeStep === 1 && (
                  <StepPOK pokTerpilih={pokTerpilih} setPokTerpilih={setPokTerpilih} readOnly={readOnly} />
                )}
                {activeStep === 2 && (
                  <StepPeserta
                    dataPeserta={dataPeserta}
                    setDataPeserta={setDataPeserta}
                    readOnly={readOnly}
                  />
                )}
              </div>
            </form>
          </FormProvider>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex pt-4 items-center gap-2 bg-white sticky bottom-0 border-t border-gray-200 py-2 px-4 z-50">
        {activeStep !== 0 && (
          <Button size="xs" variant="outline" onClick={handleBack}>
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </Button>
        )}

        <div className="flex-1" />

        {activeStep === steps.length - 1 ? (
          <div className="flex gap-2">
            <Button size="xs" variant="outline" onClick={handleSimpan}>
              Simpan
            </Button>
            <Button size="xs" color="primary" onClick={handleSubmitFinal}>
              <PaperAirplaneIcon className="h-5 w-5 mr-1" />
              Kirim PJ
            </Button>
          </div>
        ) : (
          <Button size="xs" variant="outline" onClick={handleNext}>
            Next
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VStepForm;
