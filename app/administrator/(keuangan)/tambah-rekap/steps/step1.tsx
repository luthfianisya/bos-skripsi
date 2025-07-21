import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { jenisPencairanOptions, organisasi, satker, SUB_TIPE_FORM_MAP, tahun, TIPE_FORM_MAP } from "@/lib/constants";
import { PROGRAMS } from "@/lib/constants";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface StepInformasiUmumProps {
  readOnly?: boolean;
  defaultValues?: Record<string, any>;
}

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

const resolveOption = (
  options: { value: string; label: string }[],
  raw: string | { value: string; label: string } | null | undefined
): { value: string; label: string } | null => {
  if (!raw) return null;
  if (typeof raw === "object") return raw;
  return options.find(o => o.value === raw) ?? null;
};


const safeSetSelected = (
  readOnly: boolean,
  defaultVal: string | { value: string; label: string } | null | undefined,
  setter: React.Dispatch<React.SetStateAction<{ value: string; label: string } | null>>,
  options: { value: string; label: string }[]
) => {
  const resolved = resolveOption(options, defaultVal);
  if (resolved) setter(resolved);
  else if (!readOnly) setter(null);
};



const StepInformasiUmum = ({ readOnly = false, defaultValues }: StepInformasiUmumProps) => {
  const { register, control, setValue, reset, formState: { errors } } = useFormContext();
  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
              perekap: defaultValues.perekap ?? "Aldi Pratama",
      });

      // ✅ Hanya jika satker kamu masih string, ubah ke bentuk object
      if (typeof defaultValues.satker === "string") {
        const matchedSatker = satker.find(s => s.value === defaultValues.satker);
        if (matchedSatker) {
          setValue("satker", matchedSatker); // ⬅️ penting
        }
      } else {
        setValue("satker", defaultValues.satker); // sudah object? langsung set
      }
    }
  }, [defaultValues, reset, setValue]);




  const { getValues } = useFormContext();




  const [selectedProgram, setSelectedProgram] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedKegiatan, setSelectedKegiatan] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedOutput, setSelectedOutput] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedSuboutput, setSelectedSuboutput] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedKomponen, setSelectedKomponen] = React.useState<{ value: string; label: string } | null>(null);


  useEffect(() => {
    if (defaultValues?.program) setValue("program", defaultValues.program);
    if (defaultValues?.kegiatan) setValue("kegiatan", defaultValues.kegiatan);
    if (defaultValues?.output) setValue("output", defaultValues.output);
    if (defaultValues?.suboutput) setValue("suboutput", defaultValues.suboutput);
    if (defaultValues?.komponen) setValue("komponen", defaultValues.komponen);
  }, [defaultValues, setValue]);


  const programOptions = PROGRAMS.map(p => ({
    value: p.code,
    label: `[${p.code}] ${p.label}`
  }));

  const kegiatanOptions = selectedProgram
    ? PROGRAMS.find(p => p.code === selectedProgram.value)?.kegiatan.map(k => ({
      value: k.code,
      label: `[${k.code}] ${k.label}`
    }))
    : [];

  const outputOptions = selectedProgram && selectedKegiatan
    ? PROGRAMS.find(p => p.code === selectedProgram.value)
      ?.kegiatan.find(k => k.code === selectedKegiatan.value)
      ?.output?.map(o => ({
        value: o.code,
        label: `[${o.code}] ${o.label}`
      })) ?? []
    : [];


  const subOutputOptions = selectedProgram && selectedKegiatan && selectedOutput
    ? PROGRAMS.find(p => p.code === selectedProgram.value)
      ?.kegiatan.find(k => k.code === selectedKegiatan.value)
      ?.output.find(o => o.code === selectedOutput.value)
      ?.suboutput?.map(s => ({
        value: s.code,
        label: `[${s.code}] ${s.label}`
      })) ?? []
    : [];


  const komponenOptions = selectedProgram && selectedKegiatan && selectedOutput && selectedSuboutput
    ? PROGRAMS.find(p => p.code === selectedProgram.value)
      ?.kegiatan.find(k => k.code === selectedKegiatan.value)
      ?.output.find(o => o.code === selectedOutput.value)
      ?.suboutput.find(s => s.code === selectedSuboutput.value)
      ?.komponen?.map(c => ({
        value: c.code,
        label: `[${c.code}] ${c.label}`
      })) ?? []
    : [];

 useEffect(() => {
  if (!defaultValues) return;

  // resolve semua option berdasarkan string (jika perlu)
  const resolvedSatker = resolveOption(satker, defaultValues.satker);
  const resolvedProgram = resolveOption(programOptions, defaultValues.program);
  const kegiatanList = resolvedProgram
    ? PROGRAMS.find(p => p.code === resolvedProgram.value)?.kegiatan ?? []
    : [];
  const resolvedKegiatan = resolveOption(
    kegiatanList.map(k => ({ value: k.code, label: `[${k.code}] ${k.label}` })),
    defaultValues.kegiatan
  );
  const outputList = resolvedKegiatan
    ? kegiatanList.find(k => k.code === resolvedKegiatan.value)?.output ?? []
    : [];
  const resolvedOutput = resolveOption(
    outputList.map(o => ({ value: o.code, label: `[${o.code}] ${o.label}` })),
    defaultValues.output
  );
  const subList = resolvedOutput
    ? outputList.find(o => o.code === resolvedOutput.value)?.suboutput ?? []
    : [];
  const resolvedSuboutput = resolveOption(
    subList.map(s => ({ value: s.code, label: `[${s.code}] ${s.label}` })),
    defaultValues.suboutput
  );
  const komponenList = resolvedSuboutput
    ? subList.find(s => s.code === resolvedSuboutput.value)?.komponen ?? []
    : [];
  const resolvedKomponen = resolveOption(
    komponenList.map(c => ({ value: c.code, label: `[${c.code}] ${c.label}` })),
    defaultValues.komponen
  );

  // reset sekaligus
  reset({
    ...defaultValues,
    perekap: defaultValues.perekap ?? "Aldi Pratama",
    satker: resolvedSatker,
    program: resolvedProgram,
    kegiatan: resolvedKegiatan,
    output: resolvedOutput,
    suboutput: resolvedSuboutput,
    komponen: resolvedKomponen,
  });

  // sync juga state internal
  setSelectedProgram(resolvedProgram);
  setSelectedKegiatan(resolvedKegiatan);
  setSelectedOutput(resolvedOutput);
  setSelectedSuboutput(resolvedSuboutput);
  setSelectedKomponen(resolvedKomponen);
}, [defaultValues, reset]);




  useEffect(() => {
    if (defaultValues?.jenisPencairan) {
      const matched = jenisPencairanOptions.find(
        (opt) => opt.value === defaultValues.jenisPencairan
      );
      if (matched) {
        setValue("jenisPencairan", matched);
      }
    }
  }, [defaultValues, setValue]);



  // Generate options dari TIPE_FORM_MAP
  const tipeFormOptions = Object.entries(TIPE_FORM_MAP).map(([key, value]) => ({
    value: key,
    label: `[${value.code}] ${value.label}`,
  }));

  const defaultSatker = satker[0]; // [637148] BPS Kota Depok
  const defaultOrganisasi = organisasi[0]; // [92800] BPS Kabupaten/Kota
  const defaultTahun = tahun.find(t => t.value === "2025")!; // Tahun 2025

  const linkOptions = [
    { value: "link1", label: "Permintaan 1" },
    { value: "link2", label: "Permintaan 2" },
  ];

  const [selectedTipeForm, setSelectedTipeForm] = useState<{ value: string; label: string } | null>(null);
  const [selectedSubTipe, setSelectedSubTipe] = useState<{ value: string; label: string } | null>(null);

  const getSubTipeOptions = () => {
    if (!selectedTipeForm || selectedTipeForm.value !== "FORM - TRANSLOK") return [];
    return SUB_TIPE_FORM_MAP["FORM - TRANSLOK"];
  };

  const [jenisPok, setJenisPok] = useState<string>("single");

  return (
    <>
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Informasi Umum</h4>
        <p className="mt-1 text-sm text-gray-500">Isikan data informasi umum yang sesuai untuk rekap ini.</p>
      </div>


      {/* Baris 1 */}
      <div className="col-span-12 grid grid-cols-1 gap-4">


        <div className="flex flex-col gap-2">
          <Label htmlFor="tahunAnggaran">Tahun Anggaran</Label>
          <Select options={tahun} value={defaultTahun} styles={styles} className="z-50" placeholder="Pilih Tahun" isDisabled />
        </div>
      </div>

      {/* Baris 2 */}
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Kolom kiri */}
        <div className="flex flex-col gap-4">

          {/* Satuan Kerja */}
          <div className="flex flex-col gap-2">
            <Label>Satuan Kerja</Label>
            <Controller
              name="satker"
              control={control}
              rules={{ required: "Satuan Kerja wajib diisi" }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    options={satker}
                    placeholder="Pilih Satuan Kerja"
                    value={field.value}
                    styles={styles}
                    isDisabled={readOnly}
                    onChange={(option) => field.onChange(option)}
                  />
                  {errors.satker && <p className="text-red-500 text-sm">{errors.satker.message as string}</p>}
                </>
              )}
            />

          </div>

          {/* Program */}
          <div className="flex flex-col gap-2">
            <Label>Program</Label>
            <Controller
              name="program"
              control={control}
              rules={{ required: "Program wajib diisi" }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    options={programOptions}
                    // value={selectedProgram}
                    onChange={(option) => {
                      field.onChange(option);
                      setSelectedProgram(option);
                      setSelectedKegiatan(null);
                      setSelectedOutput(null);
                      setSelectedSuboutput(null);
                      setSelectedKomponen(null);
                    }}
                    value={field.value}
                    styles={styles}
                    placeholder="Pilih Program"
                    isDisabled={readOnly}
                  />

                  {errors.program && <p className="text-red-500 text-sm">{errors.program.message as string}</p>}
                </>
              )}
            />

          </div>

          {/* Kegiatan */}
          <div className="flex flex-col gap-2">
            <Label>Kegiatan</Label>
            <Controller
              name="kegiatan"
              control={control}
              rules={{ required: "Kegiatan wajib diisi" }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    options={kegiatanOptions}
                    value={field.value}
                    onChange={(option) => {
                      field.onChange(option);
                      setSelectedKegiatan(option);
                      setSelectedOutput(null);
                      setSelectedSuboutput(null);
                      setSelectedKomponen(null);
                    }}
                    styles={styles}
                    placeholder="Pilih Kegiatan"
                    isDisabled={readOnly || !selectedProgram}
                  />
                  {errors.kegiatan && <p className="text-red-500 text-sm">{errors.kegiatan.message as string}</p>}
                </>
              )}
            />

          </div>
        </div>

        {/* Kolom kanan */}
        <div className="flex flex-col gap-4">

          {/* Output */}
          <div className="flex flex-col gap-2">
            <Label>Output</Label>
            <Controller
              name="output"
              control={control}
              rules={{ required: "Output wajib diisi" }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    options={outputOptions}
                    value={field.value}
                    onChange={(option) => {
                      field.onChange(option);
                      setSelectedOutput(option);
                      setSelectedSuboutput(null);
                      setSelectedKomponen(null);
                    }}
                    styles={styles}
                    placeholder="Pilih Output"
                    isDisabled={readOnly || !selectedKegiatan}
                  />
                  {errors.output && <p className="text-red-500 text-sm">{errors.output.message as string}</p>}
                </>
              )}
            />

          </div>

          {/* Sub Output */}
          <div className="flex flex-col gap-2">
            <Label>Sub Output</Label>
            <Controller
              name="suboutput"
              control={control}
              rules={{ required: "Sub Output wajib diisi" }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    options={subOutputOptions}
                    value={field.value}
                    onChange={(option) => {
                      field.onChange(option);
                      setSelectedSuboutput(option);
                      setSelectedKomponen(null);
                    }}
                    styles={styles}
                    placeholder="Pilih Sub Output"
                    isDisabled={readOnly || !selectedOutput}
                  />
                  {errors.suboutput && <p className="text-red-500 text-sm">{errors.suboutput.message as string}</p>}
                </>
              )}
            />

          </div>

          {/* Komponen */}
          <div className="flex flex-col gap-2">
            <Label>Komponen</Label>
            <Controller
              name="komponen"
              control={control}
              rules={{ required: "Komponen wajib diisi" }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    options={komponenOptions}
                    value={field.value}
                    onChange={(option) => {
                      field.onChange(option);
                      setSelectedKomponen(option);
                    }}
                    styles={styles}
                    placeholder="Pilih Komponen"
                    isDisabled={readOnly || !selectedSuboutput}
                  />
                  {errors.komponen && <p className="text-red-500 text-sm">{errors.komponen.message as string}</p>}
                </>
              )}
            />

          </div>

        </div>

      </div>


      {/* Baris 3 */}
      <div className="col-span-12 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="judulRekap">Judul Rekap</Label>
          <Input
            size="lg"
            type="text"
            id="judulRekap"
            placeholder="Masukkan Judul Rekap"
            {...register("judulRekap", { required: "Judul Rekap wajib diisi" })}
            className={`border rounded-md p-2 ${errors.judulRekap ? "border-destructive" : "border-gray-300 focus:border-primary"}`}
            disabled={readOnly}
          />
          {errors.judulRekap && (
            <p className="text-red-500 text-sm">{errors.judulRekap.message as string}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">


          <div className="flex flex-col gap-2">
            <Label htmlFor="perekap">Perekap</Label>
            <Controller
              name="perekap"
              control={control}
              defaultValue="Aldi Pratama"
              render={({ field }) => (
                <Input
                  id="perekap"
                  {...field}
                  disabled
                  className={`border text-[14px] rounded-md p-2 ${errors.perekap ? "border-destructive" : "border-gray-300 focus:border-primary"}`}
                />
              )}
            />


          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="tglRekap">Tanggal Rekap</Label>
            <Controller
              name="tglRekap"
              control={control}
              rules={{ required: "Tanggal Rekap wajib diisi" }}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={cn(
                        "font-normal flex justify-between rounded-md border text-sm",
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

            {errors.tglRekap && <p className="text-red-500 text-sm">{errors.tglRekap.message as string}</p>}
          </div>
        </div>






      </div>

      <div className="col-span-12 grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="jenisPencairan">Jenis Pencairan</Label>
          <Controller
            name="jenisPencairan"
            control={control}
            rules={{ required: "Jenis Pencairan wajib diisi" }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  options={jenisPencairanOptions}
                  placeholder="Pilih Jenis Pencairan"
                  value={field.value}
                  isDisabled={readOnly}
                  styles={styles}
                  menuPortalTarget={document.body}
                  menuPlacement="top"
                />
                {errors.jenisPencairan && <p className="text-red-500 text-sm">{errors.jenisPencairan.message as string}</p>}
              </>
            )}
          />

        </div>
      </div>

    </>
  );
};

export default StepInformasiUmum;
