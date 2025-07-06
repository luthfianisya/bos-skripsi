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
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { Peserta } from "./components/peserta-berangkat-table/columns";
import { PaperAirplaneIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { FullFormPermintaan } from "@/data/form-permintaan-f"; // pastikan impor ini ada
import { combinedForms, SUB_TIPE_FORM_MAP, TIPE_FORM_MAP } from "@/lib/constants";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { POKs } from "@/data/entri-pembiayaan";
import { FormPOK } from "@/lib/interface";
import { SaveIcon } from "lucide-react";


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
        defaultValues?.tipeForm &&
          defaultValues?.subTipeForm &&
          SUB_TIPE_FORM_MAP[defaultValues.tipeForm]
          ? {
            value: defaultValues.subTipeForm,
            label:
              SUB_TIPE_FORM_MAP[defaultValues.tipeForm].find(
                (opt) => opt.value === defaultValues.subTipeForm
              )?.label ?? defaultValues.subTipeForm, // fallback label
          }
          : null,
    },
  });


  const { trigger } = methods;




  const [activeStep, setActiveStep] = React.useState(0);
  const [pokTerpilih, setPokTerpilih] = React.useState<FormPOK[]>([]);
  React.useEffect(() => {
    if (readOnly) {
      console.log("Setting pokTerpilih with dummy record");
      setPokTerpilih([combinedForms[0]]);
    } else {
      if (data?.pokTerpilih) {
        setPokTerpilih(data.pokTerpilih.map((p, i) => ({
          id: `from-data-${i}`,               // generate id unik
          grup: p.grup,
          deskripsi: p.uraian ?? "-",         // fallback "-"
          detail: p.detail ?? "-",
          noSurat: "-",                       // default "-"
          paguBooked: p.nilai ?? 0,           // jika nilai null/undefined fallback 0
          paguReali: p.nilai ?? 0,            // sama dengan paguBooked jika tidak ada field lain
          noPermintaan: "-",                  // default "-"
          details: [],
        })));
      }
    }
  }, [readOnly, data]);


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
                {activeStep === 0 && (
                  <StepInformasiUmum readOnly={readOnly} />
                )}

                {activeStep === 1 && (
                  <StepPOK pokTerpilih={pokTerpilih} setPokTerpilih={setPokTerpilih} readOnly={readOnly} />
                )}
                {activeStep === 2 && (
                  <StepPeserta
                    rekapStatus={rekapStatus}
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
                    readOnly={readOnly} // ← tambahkan ini
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
                onClick={() => setRekapStatus("sp2d")}
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

export default VStepForm;
