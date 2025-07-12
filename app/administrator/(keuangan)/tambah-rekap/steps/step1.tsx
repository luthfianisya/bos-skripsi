import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { jenisPencairanOptions, organisasi, satker, SUB_TIPE_FORM_MAP, tahun, TIPE_FORM_MAP } from "@/lib/constants";
import { PROGRAMS } from "@/lib/constants";

interface StepInformasiUmumProps {
  readOnly?: boolean;
  defaultValues?: Record<string, any>;
}

const StepInformasiUmum = ({ readOnly = false, defaultValues }: StepInformasiUmumProps) => {

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { getValues } = useFormContext();

  React.useEffect(() => {
    if (!defaultValues) return;

    if (defaultValues.tahun) setValue("tahun", defaultValues.tahun);
    if (defaultValues.satker) setValue("satker", defaultValues.satker);
    if (defaultValues.program) {
      setValue("program", defaultValues.program);
      setSelectedProgram(defaultValues.program);
    }
    if (defaultValues.kegiatan) {
      setValue("kegiatan", defaultValues.kegiatan);
      setSelectedKegiatan(defaultValues.kegiatan);
    }
    if (defaultValues.output) {
      setValue("output", defaultValues.output);
      setSelectedOutput(defaultValues.output);
    }
    if (defaultValues.suboutput) {
      setValue("suboutput", defaultValues.suboutput);
      setSelectedSuboutput(defaultValues.suboutput);
    }
    if (defaultValues.komponen) {
      setValue("komponen", defaultValues.komponen);
      setSelectedKomponen(defaultValues.komponen);
    }
  }, [defaultValues]);


  React.useEffect(() => {
    const tipeFormValue = getValues("tipeForm");
    const subTipeValue = getValues("subTipeForm");

    if (tipeFormValue) setSelectedTipeForm(tipeFormValue);
    if (subTipeValue) setSelectedSubTipe(subTipeValue);

    if (tipeFormValue?.value === "FORM - TRANSLOK") {
      setJenisPok("single");
    }
  }, [getValues]);

  const [selectedProgram, setSelectedProgram] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedKegiatan, setSelectedKegiatan] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedOutput, setSelectedOutput] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedSuboutput, setSelectedSuboutput] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedKomponen, setSelectedKomponen] = React.useState<{ value: string; label: string } | null>(null);

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
        label: c.label
      })) ?? []
    : [];

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
          <Select options={tahun} value={defaultTahun} className="z-50" placeholder="Pilih Tahun" isDisabled />
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
              render={({ field }) => (
                <Select
                  {...field}
                  options={satker}
                  placeholder="Pilih Satuan Kerja"
                  isDisabled={readOnly}
                  onChange={(option) => field.onChange(option)}
                />
              )}
            />
          </div>

          {/* Program */}
          <div className="flex flex-col gap-2">
            <Label>Program</Label>
            <Controller
              name="program"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={programOptions}
                  value={selectedProgram}
                  onChange={(option) => {
                    field.onChange(option);
                    setSelectedProgram(option);
                    setSelectedKegiatan(null);
                    setSelectedOutput(null);
                    setSelectedSuboutput(null);
                    setSelectedKomponen(null);
                  }}
                  placeholder="Pilih Program"
                  isDisabled={readOnly}
                />
              )}
            />
          </div>

          {/* Kegiatan */}
          <div className="flex flex-col gap-2">
            <Label>Kegiatan</Label>
            <Controller
              name="kegiatan"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={kegiatanOptions}
                  value={selectedKegiatan}
                  onChange={(option) => {
                    field.onChange(option);
                    setSelectedKegiatan(option);
                    setSelectedOutput(null);
                    setSelectedSuboutput(null);
                    setSelectedKomponen(null);
                  }}
                  placeholder="Pilih Kegiatan"
                  isDisabled={readOnly || !selectedProgram}
                />
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
              render={({ field }) => (
                <Select
                  {...field}
                  options={outputOptions}
                  value={selectedOutput}
                  onChange={(option) => {
                    field.onChange(option);
                    setSelectedOutput(option);
                    setSelectedSuboutput(null);
                    setSelectedKomponen(null);
                  }}
                  placeholder="Pilih Output"
                  isDisabled={readOnly || !selectedKegiatan}
                />
              )}
            />
          </div>

          {/* Sub Output */}
          <div className="flex flex-col gap-2">
            <Label>Sub Output</Label>
            <Controller
              name="suboutput"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={subOutputOptions}
                  value={selectedSuboutput}
                  onChange={(option) => {
                    field.onChange(option);
                    setSelectedSuboutput(option);
                    setSelectedKomponen(null);
                  }}
                  placeholder="Pilih Sub Output"
                  isDisabled={readOnly || !selectedOutput}
                />
              )}
            />
          </div>

          {/* Komponen */}
          <div className="flex flex-col gap-2">
            <Label>Komponen</Label>
            <Controller
              name="komponen"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={komponenOptions}
                  value={selectedKomponen}
                  onChange={(option) => {
                    field.onChange(option);
                    setSelectedKomponen(option);
                  }}
                  placeholder="Pilih Komponen"
                  isDisabled={readOnly || !selectedSuboutput}
                />
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
            <Input
              size="lg"
              type="text"
              id="perekap"
              placeholder="Masukkan Nama Perekap"
              {...register("perekap", { required: "Perekap wajib diisi" })}
              className={`border rounded-md p-2 ${errors.perekap ? "border-destructive" : "border-gray-300 focus:border-primary"}`}
              disabled={readOnly}
            />
            {errors.perekap && (
              <p className="text-red-500 text-sm">{errors.perekap.message as string}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="tanggalRekap">Tanggal Rekap</Label>
            <Input
              size="lg"
              type="date"
              id="tanggalRekap"
              {...register("tanggalRekap", { required: "Tanggal Rekap wajib diisi" })}
              className={`border rounded-md p-2 ${errors.tanggalRekap ? "border-destructive" : "border-gray-300 focus:border-primary"}`}
              disabled={readOnly}
            />
            {errors.tanggalRekap && (
              <p className="text-red-500 text-sm">{errors.tanggalRekap.message as string}</p>
            )}
          </div>
        </div>






      </div>

      <div className="col-span-12 grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="linkPermintaan">Jenis Pencairan</Label>
          <Controller
            name="linkPermintaan"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={jenisPencairanOptions}
                placeholder="Pilih Jenis Pencairan"
                isDisabled={readOnly}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: base => ({ ...base, zIndex: 9999 }) // pastikan zIndex tinggi
                }}
                menuPlacement="top"
              />
            )}
          />
        </div>
      </div>

    </>
  );
};

export default StepInformasiUmum;
