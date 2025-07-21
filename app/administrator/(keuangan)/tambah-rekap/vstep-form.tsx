"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { toast as stoast, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import StepInformasiUmum from "./steps/step1";
import StepPOK from "./steps/step2";
import StepPeserta from "./steps/step3";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Peserta } from "./components/peserta-berangkat-table/columns";
import { PaperAirplaneIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { FullFormPermintaan } from "@/data/form-permintaan-f-2"; // pastikan impor ini ada
import { combinedForms, jenisPencairanOptions, PROGRAMS, satker, SUB_TIPE_FORM_MAP, TIPE_FORM_MAP } from "@/lib/constants";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { POKs } from "@/data/entri-pembiayaan";
import { FormPOK } from "@/lib/interface";
import { SaveIcon } from "lucide-react";
import { fullFormRekap, FullFormRekap } from "@/data/rekap-bendahara-f";


interface VStepFormProps {
  defaultValues?: any;
  readOnly?: boolean;
  data?: FullFormRekap;
}

const VStepForm = ({ defaultValues, readOnly = false, data }: VStepFormProps & { data?: FullFormRekap }) => {
  const router = useRouter();
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {

      satker: satker[0],

      // satker: defaultValues?.satker ?? null,
  program: defaultValues?.program ?? null,
  kegiatan: defaultValues?.kegiatan ?? null,
  output: defaultValues?.output ?? null,
  suboutput: defaultValues?.suboutput ?? null,
  komponen: defaultValues?.komponen ?? null,


      // judulRekap: defaultValues?.judulRekap ?? "",
      perekap: defaultValues?.perekap ?? "",
      tglRekap: defaultValues?.tglRekap ?? "", // ✅ Perhatikan: gunakan `tglRekap`, bukan `tanggalRekap`
      linkPermintaan: jenisPencairanOptions.find(j => j.value === defaultValues?.statusPencairan) ?? null,
      sppNomor: defaultValues?.sppNomor ?? "",
      sppTanggal: defaultValues?.sppTanggal ?? "",
      spmNomor: defaultValues?.spmNomor ?? "",
      spmTanggal: defaultValues?.spmTanggal ?? "",
      sp2dNomor: defaultValues?.sp2dNomor ?? "",
      sp2dTanggal: defaultValues?.sp2dTanggal ?? "",
      rekapStatus: defaultValues?.rekapStatus ?? "",
    },
  });

  const {
    // getValues,
    watch,
    setValue,
  } = methods;

  const sppNomor = watch("sppNomor");
  const sppTanggal = watch("sppTanggal");
  const spmNomor = watch("spmNomor");
  const spmTanggal = watch("spmTanggal");
  const sp2dNomor = watch("sp2dNomor");
  const sp2dTanggal = watch("sp2dTanggal");




  const { trigger } = methods;




  const [activeStep, setActiveStep] = React.useState(0);
  const [pokTerpilih, setPokTerpilih] = React.useState<FormPOK[]>([]);
  React.useEffect(() => {
    if (readOnly) {
      setPokTerpilih([combinedForms[0]]);
    } else if (data?.pokTerpilih) {
      setPokTerpilih(data.pokTerpilih);
    }
  }, [readOnly, data]);

  React.useEffect(() => {
    if (readOnly) {
      setShowRincianPeserta(true);
    }
  }, [readOnly]);





  const [dataPeserta, setDataPeserta] = React.useState<Peserta[]>(
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
    { label: "Informasi Umum", content: "Isi informasi umum rekap" },
    { label: "Form POK", content: "Pilih Form POK yang tersedia" },
    { label: "SPP, SPD, SP2D", content: "Isi nomor SPP, SPD, dan SP2D" },
  ];

  const [showRincianPeserta, setShowRincianPeserta] = useState(false);

  const MySwal = withReactContent(Swal);

  const handleSubmitFinalConfirm = () => {
    MySwal.fire({
      title: 'Yakin Kirim ke PJ?',
      text: 'Pastikan data sudah benar sebelum dikirim.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb', // biru
      cancelButtonColor: '#d33', // merah
      confirmButtonText: 'Ya, Kirim!',
      cancelButtonText: 'Batal',
      customClass: {
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmitFinal(); // jalankan fungsi kirim PJ asli
        MySwal.fire(
          'Terkirim!',
          'Form permintaan berhasil dikirim ke PJ.',
          'success'
        );
      }
    });
  };

  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000));



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

  const { getValues } = methods;

  const handleSubmitFinal = () => {
    toast.promise(promise(), {
      loading: "Menyimpan...",
      success: "Rekap Bendahara berhasil difinalisasi.",
      error: "Terjadi kesalahan saat finalisasi.",
      position: "top-right",
    });
    router.push("/administrator/rekap-bendahara");
  };
const [rekapStatus, setRekapStatus] = useState<"direkap" | "spm" | "sp2d">("direkap");



useEffect(() => {
  if (readOnly) {
    setRekapStatus("sp2d");
  } else {
    setRekapStatus(defaultValues?.rekapStatus ?? "direkap");
  }
}, [readOnly, defaultValues?.rekapStatus]);



console.log("✅ VStepForm setRekapStatus:", defaultValues?.rekapStatus);
  const isSPPComplete = () => !!sppNomor && !!sppTanggal;
  const isSP2DComplete = () => !!sp2dNomor && !!sp2dTanggal;


  const handleFinalisasi = () => {
    MySwal.fire({
      title: 'Yakin Finalisasi Rekap?',
      text: 'Data yang sudah difinalisasi tidak dapat diubah lagi.',
      icon: 'warning',
      showCancelButton: true, // WAJIB agar tombol batal muncul
      confirmButtonText: 'Ya, Finalisasi!',
      cancelButtonText: 'Batal',
      customClass: {
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn',
        popup: 'z-[99999] pointer-events-auto', // ini penting
        container: 'z-[99999] pointer-events-auto',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setRekapStatus("sp2d");
        handleSubmitFinal();
      }
    });
  };

  const handleSimpan = () => {
    stoast.info("Data rekap bendahara berhasil disimpan", { position: "top-right" });
  };

  console.log("🧪 defaultValues di VStepForm", defaultValues);



  return (
    <div className="flex flex-col gap-4 h-full">
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
      <div className="flex-1 overflow-y-auto px-4 z-30 items-start">
        {activeStep === steps.length ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="mb-4 text-center font-semibold">Semua langkah telah selesai!</div>
            <Button size="xs" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        ) : (
          <FormProvider {...methods}>
            <form className="flex-1 flex flex-col">
              <div className="grid grid-cols-12 gap-4">
                {activeStep === 0 && (
                  <StepInformasiUmum readOnly={readOnly} defaultValues={defaultValues} />
                )}

                {activeStep === 1 && (
                  <StepPOK pokTerpilih={pokTerpilih} setPokTerpilih={setPokTerpilih} showRincianPeserta={showRincianPeserta} readOnly={readOnly} />
                )}
                {activeStep === 2 && (
                  <StepPeserta
                    rekapStatus={rekapStatus}
                    disabled={rekapStatus === "sp2d"}
                    readOnly={readOnly} //
                    // defaultValues={fullFormRekap[0]}
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
            <Button size="xs" variant="outline" onClick={handleSimpan}>
              <SaveIcon className="h-5 w-5 mr-1" />
              Simpan
            </Button>


            {!readOnly && rekapStatus === "direkap" && (
              <Button
                size="xs"
                color="primary"
                onClick={() => {
                  setValue("spmNomor", sppNomor);
                  setValue("spmTanggal", sppTanggal);
                  setRekapStatus("spm");
                }}
                disabled={!isSPPComplete()}
              >
                <PaperAirplaneIcon className="h-5 w-5 mr-1" />
                Terbitkan SPM
              </Button>

            )}

            {!readOnly && rekapStatus === "spm" && (
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
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VStepForm;
