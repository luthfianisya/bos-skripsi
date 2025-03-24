"use client";

import React from "react";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import step components
import StepInformasiUmum from "./steps/step1";
import StepPOK from "./steps/step2";
import StepPeserta from "./steps/step3";

const VStepForm2 = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const steps = [
    { label: "Informasi Umum", content: "Isi informasi umum permintaan" },
    { label: "POK", content: "Pilih POK yang tersedia" },
    { label: "Peserta Berangkat", content: "Tambahkan peserta yang berangkat" },
  ];

  const isStepOptional = (step: number) => step === 1;

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  const onSubmit = () => {
    toast({
      title: "Submit Berhasil",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-primary-foreground">Permintaan Berhasil Disimpan!</p>
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
              Semua langkah telah selesai!
            </div>
            <Button size="xs" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        ) : (
          <>
            <form>
              <div className="grid grid-cols-12 gap-4">
                {activeStep === 0 && <StepInformasiUmum />}
                {activeStep === 1 && <StepPOK />}
                {activeStep === 2 && <StepPeserta />}
              </div>
            </form>

            {/* Navigation Buttons */}
            <div className="flex pt-4 items-center gap-2">
              <Button
                size="xs"
                variant="outline"
                className={cn("cursor-pointer", { hidden: activeStep === 0 })}
                onClick={handleBack}
              >
                Back
              </Button>

              <div className="flex-1" />

              {activeStep === steps.length - 1 ? (
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => {
                    onSubmit();
                    handleNext();
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button size="xs" variant="outline" onClick={handleNext}>
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

export default VStepForm2;
