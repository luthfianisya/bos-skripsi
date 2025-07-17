import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PesertaTable from "../components/peserta-berangkat-table";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Icon } from "@iconify/react";
import { Calendar } from "@/components/ui/calendar";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";


const styles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isDisabled ? '#f1f5f9' : 'white', // slate-100
    borderColor: state.isDisabled ? '#e2e8f0' : base.borderColor, // slate-300
    color: state.isDisabled ? '#94a3b8' : base.color, // slate-400
    cursor: state.isDisabled ? 'not-allowed' : 'default',
    boxShadow: 'none',
    '&:hover': {
      borderColor: state.isDisabled ? '#e2e8f0' : '#a5b4fc', // primary jika aktif
    },
  }),
  singleValue: (base: any, state: any) => ({
    ...base,
    color: state.isDisabled ? '#94a3b8' : base.color,
  }),
  placeholder: (base: any, state: any) => ({
    ...base,
    color: state.isDisabled ? '#94a3b8' : base.color,
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: 'none',
  }),
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    color: state.isDisabled ? '#cbd5e1' : base.color,
    '&:hover': {
      color: state.isDisabled ? '#cbd5e1' : base.color,
    },
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
};

type BadgeColor = "secondary" | "default" | "success" | "destructive" | "info" | "warning" | "dark";

type StepPesertaProps = {
  rekapStatus: "direkap" | "spm" | "sp2d";
  sppNomor: string;
  sppTanggal: string;
  spmNomor: string;
  spmTanggal: string;
  sp2dNomor: string;
  sp2dTanggal: string;
  setSppNomor: (val: string) => void;
  setSppTanggal: (val: string) => void;
  setSpmNomor: (val: string) => void;
  setSpmTanggal: (val: string) => void;
  setSp2dNomor: (val: string) => void;
  setSp2dTanggal: (val: string) => void;
  disabled: boolean;
  readOnly?: boolean;
  defaultValues?: {
    sppNomor: string;
    sppTanggal: string;
    spmNomor: string;
    spmTanggal: string;
    sp2dNomor: string;
    sp2dTanggal: string;
  };
};

const StepPeserta = ({
  rekapStatus,
  sppNomor,
  sppTanggal,
  spmNomor,
  spmTanggal,
  sp2dNomor,
  sp2dTanggal,
  setSppNomor,
  setSppTanggal,
  setSpmNomor,
  setSpmTanggal,
  setSp2dNomor,
  setSp2dTanggal,
  disabled,
  readOnly = false,
  defaultValues,
}: StepPesertaProps) => {

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (readOnly && defaultValues) {
      setSppNomor(defaultValues.sppNomor);
      setSppTanggal(defaultValues.sppTanggal);
      setSpmNomor(defaultValues.spmNomor);
      setSpmTanggal(defaultValues.spmTanggal);
      setSp2dNomor(defaultValues.sp2dNomor);
      setSp2dTanggal(defaultValues.sp2dTanggal);
    }
  }, [readOnly, defaultValues]);



  const badgeText = {
    direkap: "Direkap di Bendahara",
    spm: "Terbit SPM Clean",
    sp2d: "Terbit SP2D",
  }[rekapStatus];

  const badgeColorMap = {
    direkap: "secondary",
    spm: "default",
    sp2d: "success",
  } as const;

  const badgeColor: BadgeColor = badgeColorMap[rekapStatus];



  return (
    <>
      <div className="col-span-12">
        <div className="justify-between flex">
          <h4 className="text-lg font-semibold text-gray-800">SPP, SPM dan SP2D</h4>
          <Badge color={badgeColor} variant="outline" className="text-sm font-semibold py-1 rounded-full">
            {badgeText}
          </Badge>
        </div>
      </div>

      <div className="col-span-12 grid grid-cols-1 gap-4">
        {/* SPP */}
        <div className="flex items-center gap-4">
          <Label className="w-32">SPP</Label>
          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Nomor</Label>
              <Input size="lg" type="text" value={sppNomor} onChange={(e) => setSppNomor(e.target.value)} disabled={readOnly || disabled} />

            </div>
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Tanggal</Label>
              <Controller
                name="sppTanggal"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className={cn(
                          "font-normal flex flex-1 justify-between rounded-md border text-sm",
                          "data-[state=open]:ring-1 data-[state=open]:ring-[#2684FF]",
                          readOnly
                            ? "bg-slate-200 text-slate-600 border-slate-300 cursor-not-allowed"
                            : "bg-white text-default-500 border-default-300 hover:bg-white"
                        )}
                        disabled={readOnly}
                      >

                        {field.value
                          ? new Date(field.value).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                          : "dd/mm/yyyy"}
                        <Icon icon="tabler:calendar" className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />

            </div>
          </div>
        </div>

        {/* SPM */}
        <div className="flex items-center gap-4">
          <Label className="w-32">SPM</Label>
          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Nomor</Label>
              <Input
                value={spmNomor}
                size="lg" type="text"
                onChange={(e) => setSpmNomor(e.target.value)}
                disabled={readOnly || disabled || rekapStatus === "direkap"}
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Tanggal</Label>
              <Controller
                name="spmTanggal"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className={cn(
                          "font-normal flex flex-1 justify-between rounded-md border text-sm",
                          "data-[state=open]:ring-1 data-[state=open]:ring-[#2684FF]",
                          readOnly
                            ? "bg-slate-200 text-slate-600 border-slate-300 cursor-not-allowed"
                            : "bg-white text-default-500 border-default-300 hover:bg-white"
                        )}
                        disabled={readOnly}
                      >

                        {field.value
                          ? new Date(field.value).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                          : "dd/mm/yyyy"}
                        <Icon icon="tabler:calendar" className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />

            </div>
          </div>
        </div>

        {/* SP2D */}
        <div className="flex items-center gap-4">
          <Label className="w-32">SP2D</Label>
          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Nomor</Label>
              <Input
                value={sp2dNomor}
                size="lg" type="text"
                onChange={(e) => setSp2dNomor(e.target.value)}
                disabled={readOnly || disabled || rekapStatus !== "spm"}
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Tanggal</Label>
              <Controller
                name="sp2dTanggal"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className={cn(
                          "font-normal flex flex-1 justify-between rounded-md border text-sm",
                          "data-[state=open]:ring-1 data-[state=open]:ring-[#2684FF]",
                          readOnly
                            ? "bg-slate-200 text-slate-600 border-slate-300 cursor-not-allowed"
                            : "bg-white text-default-500 border-default-300 hover:bg-white"
                        )}
                        disabled={readOnly}
                      >

                        {field.value
                          ? new Date(field.value).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                          : "dd/mm/yyyy"}
                        <Icon icon="tabler:calendar" className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepPeserta;
