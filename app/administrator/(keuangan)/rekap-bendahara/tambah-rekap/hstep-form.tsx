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

import { PaperAirplaneIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { FormPOK } from "./components/pok-terpilih-table/columns";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { SaveIcon } from "lucide-react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/src/sweetalert2.scss';

const MySwal = withReactContent(Swal);

const HStepForm = () => {
  const router = useRouter();
  const methods = useForm({ mode: "onChange", reValidateMode: "onChange" });
//   const { trigger } = methods;

  const [activeStep, setActiveStep] = React.useState(0);
//   const [pokTerpilih, setPokTerpilih] = React.useState<FormPOK[]>([]);

  const steps = [
    { label: "Informasi Umum", content: "Isi informasi umum rekap" },
    { label: "Form POK", content: "Pilih Form POK yang tersedia" },
    { label: "SPP, SPM dan SP2D", content: "Input nomor SPP, SPM dan SP2D" },
  ];

//   const handleNext = async () => {
//     const valid = await trigger();
//     if (activeStep === 1 && pokTerpilih.length === 0) {
//       stoast.error("Data POK harus terisi, tabel tidak boleh kosong", { position: "top-right" });
//       return;
//     }
//     if (!valid) return;
//     setActiveStep((prev) => prev + 1);
//   };

//   const handleBack = () => setActiveStep((prev) => prev - 1);
//   const handleReset = () => setActiveStep(0);

//   const handleSubmitFinal = () => {
//     stoast.success("Data Form Permintaan berhasil di-submit ke PJ", { position: "top-right" });
//     setTimeout(() => router.push("/administrator/form-permintaan"), 1500);
//   };

//   const handleSimpan = () => {
//     stoast.info("Data Form permintaan berhasil disimpan", { position: "top-right" });
//   };



const isStepOptional = (step: number) => step === 1;

const handleNext = () => setActiveStep((prev) => prev + 1);
const handleBack = () => setActiveStep((prev) => prev - 1);
const handleReset = () => setActiveStep(0);

const handleFinalisasi = () => {
  MySwal.fire({
    title: 'Yakin Finalisasi Rekap?',
    text: 'Data yang sudah difinalisasi tidak dapat diubah lagi.',
    icon: 'warning',
    showCancelButton: true, // WAJIB agar tombol batal muncul
    confirmButtonColor: '#16a34a',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Finalisasi!',
    cancelButtonText: 'Batal',  
  }).then((result) => {
    if (result.isConfirmed) {
      setRekapStatus("sp2d");
      MySwal.fire(
        'Berhasil!',
        'Rekap telah berhasil difinalisasi.',
        'success'
      );
    }
  });
};


  const onSubmit = () => {
    toast({
      title: "Rekap Berhasil",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-primary-foreground">Rekap Bendahara Berhasil Disimpan!</p>
        </div>
      ),
    });
  };

   const [rekapStatus, setRekapStatus] = React.useState<"direkap" | "spm" | "sp2d">("direkap");
  
    const [sppNomor, setSppNomor] = React.useState("");
    const [sppTanggal, setSppTanggal] = React.useState("");
  
    const [spmNomor, setSpmNomor] = React.useState("");
    const [spmTanggal, setSpmTanggal] = React.useState("");
  
    const [sp2dNomor, setSp2dNomor] = React.useState("");
    const [sp2dTanggal, setSp2dTanggal] = React.useState("");
  
    const isSPPComplete = () => sppNomor && sppTanggal;
    const isSP2DComplete = () => sp2dNomor && sp2dTanggal;

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
                {activeStep === 0 && <StepInformasiUmum />}
                {activeStep === 1 && (
                  <StepPOK />
                )}
                {activeStep === 2 && (
                    <StepPeserta
                      statusRekap={rekapStatus}
                      sppNomor={sppNomor}
                      sppTanggal={sppTanggal}
                      spmNomor={spmNomor}
                      spmTanggal={spmTanggal}
                      sp2dNomor={sp2dNomor}
                      sp2dTanggal={sp2dTanggal}
                      setSppNomor={setSppNomor}
                      setSppTanggal={setSppTanggal}
                      setSpmNomor={setSpmNomor}
                      setSpmTanggal={setSpmTanggal}
                      setSp2dNomor={setSp2dNomor}
                      setSp2dTanggal={setSp2dTanggal}
                      disabled={rekapStatus === "sp2d"}
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
                  <Button size="xs" variant="outline">
                    <PrinterIcon className="h-5 w-5 mr-1" />
                    Cetak Rekap
                  </Button>
                  <Button size="xs" variant="outline">
                    <SaveIcon className="h-5 w-5 mr-1" />
                    Simpan
                  </Button>


                  {rekapStatus === "direkap" && (
                    <Button
                      size="xs"
                      color="primary"
                      onClick={() => {
                        setSpmNomor(sppNomor);
                        setSpmTanggal(sppTanggal);
                        setRekapStatus("spm");
                      }}
                      disabled={!isSPPComplete()}
                    >
                      <PaperAirplaneIcon className="h-5 w-5 mr-1" />
                      Terbitkan SPM
                    </Button>
                  )}

                  {rekapStatus === "spm" && (
                    <Button
                    size="xs"
                    color="success"
                    onClick={handleFinalisasi}
                    disabled={!isSP2DComplete()}
                  >
                    <PaperAirplaneIcon className="h-5 w-5 mr-1" />
                    Finalisasi Rekap
                  </Button>                  
                  )}

                </div>
              ) : (
                <Button size="xs" variant="outline" onClick={handleNext}>
                  Next
                </Button>
              )}
                    </div>
    </div>
  );
};

export default HStepForm;
