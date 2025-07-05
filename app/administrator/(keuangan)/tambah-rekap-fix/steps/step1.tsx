import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { jenisPencairanOptions, organisasi, satker, SUB_TIPE_FORM_MAP, tahun, TIPE_FORM_MAP } from "@/lib/constants";

interface StepInformasiUmumProps {
  readOnly?: boolean;
}

const StepInformasiUmum = ({ readOnly = false }: StepInformasiUmumProps) => {
  // const { register, control, formState: { errors } } = useFormContext();
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { getValues } = useFormContext();

  React.useEffect(() => {
    const tipeFormValue = getValues("tipeForm");
    const subTipeValue = getValues("subTipeForm");

    if (tipeFormValue) setSelectedTipeForm(tipeFormValue);
    if (subTipeValue) setSelectedSubTipe(subTipeValue);

    if (tipeFormValue?.value === "FORM - TRANSLOK") {
      setJenisPok("single");
    }
  }, [getValues]);





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
        <div className="flex flex-col gap-2">
          <Label htmlFor="satker">Satuan Kerja</Label>
          <Select options={satker} value={defaultSatker} className="z-50" placeholder="Pilih Satuan Kerja" isDisabled />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="unitKerja">Output</Label>
          <Select options={organisasi} value={defaultOrganisasi} className="z-50" placeholder="Pilih Unit Kerja" isDisabled />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="tipeForm">Program</Label>
          <Controller
            name="tipeForm"
            control={control}
            rules={{ required: "Tipe Form wajib dipilih" }}
            render={({ field }) => (
              <Select
                {...field}
                options={tipeFormOptions}
                placeholder="Pilih Tipe Form"
                className={`z-40 ${errors.tipeForm ? "border border-destructive rounded-md" : ""}`}
                onChange={(option) => {
                  field.onChange(option);
                  setSelectedTipeForm(option);
                  setSelectedSubTipe(null);
                  if (option?.value === "FORM - TRANSLOK") {
                    setJenisPok("single");
                  }
                }}
                value={field.value}
                isDisabled={readOnly}
              />
            )}
          />


          {errors.tipeForm && <p className="text-red-500 text-sm">{errors.tipeForm.message as string}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="subTipeForm">Sub-Output</Label>
          <Controller
            name="subTipeForm"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={getSubTipeOptions()}
                value={field.value}
                onChange={(option) => {
                  field.onChange(option);
                  setSelectedSubTipe(option); // untuk jaga-jaga sinkron dengan state
                }}
                placeholder="Pilih Sub-Tipe"
                isDisabled={readOnly || !selectedTipeForm || selectedTipeForm.value !== "FORM - TRANSLOK"}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="tipeForm">Kegiatan</Label>
          <Controller
            name="tipeForm"
            control={control}
            rules={{ required: "Tipe Form wajib dipilih" }}
            render={({ field }) => (
              <Select
                {...field}
                options={tipeFormOptions}
                placeholder="Pilih Tipe Form"
                className={`z-40 ${errors.tipeForm ? "border border-destructive rounded-md" : ""}`}
                onChange={(option) => {
                  field.onChange(option);
                  setSelectedTipeForm(option);
                  setSelectedSubTipe(null);
                  if (option?.value === "FORM - TRANSLOK") {
                    setJenisPok("single");
                  }
                }}
                value={field.value}
                isDisabled={readOnly}
              />
            )}
          />


          {errors.tipeForm && <p className="text-red-500 text-sm">{errors.tipeForm.message as string}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="subTipeForm">Komponen</Label>
          <Controller
            name="subTipeForm"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={getSubTipeOptions()}
                value={field.value}
                onChange={(option) => {
                  field.onChange(option);
                  setSelectedSubTipe(option); // untuk jaga-jaga sinkron dengan state
                }}
                placeholder="Pilih Sub-Tipe"
                isDisabled={readOnly || !selectedTipeForm || selectedTipeForm.value !== "FORM - TRANSLOK"}
              />
            )}
          />
        </div>
      </div>

      {/* Baris 3 */}
      <div className="col-span-12 grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
          <Label htmlFor="noSurat">Judul Rekap</Label>
          <Input
            size="lg"
            type="text"
            id="noSurat"
            placeholder="Nomor Surat"
            {...register("noSurat", { required: "Nomor Surat wajib diisi" })}
            className={`border rounded-md p-2 ${errors.noSurat ? "border-destructive" : "border-gray-300 focus:border-primary"}`}
            disabled={readOnly}
          />
          {errors.noSurat && (
            <p className="text-red-500 text-sm">{errors.noSurat.message as string}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          

          <div className="flex flex-col gap-2">
            <Label htmlFor="noSurat">Perekap</Label>
            <Input
              size="lg"
              type="text"
              id="noSurat"
              placeholder="Nomor Surat"
              {...register("noSurat", { required: "Nomor Surat wajib diisi" })}
              className={`border rounded-md p-2 ${errors.noSurat ? "border-destructive" : "border-gray-300 focus:border-primary"}`}
              disabled={readOnly}
            />
            {errors.noSurat && (
              <p className="text-red-500 text-sm">{errors.noSurat.message as string}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="tanggalSurat">Tanggal Rekap</Label>
            <Input
              size="lg"
              type="date"
              id="tanggalSurat"
              {...register("tanggalSurat", { required: "Tanggal Surat wajib diisi" })}
              className={`border rounded-md p-2 ${errors.tanggalSurat ? "border-destructive" : "border-gray-300 focus:border-primary"}`}
              disabled={readOnly}
            />
            {errors.tanggalSurat && <p className="text-red-500 text-sm">{errors.tanggalSurat.message as string}</p>}
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
              />
            )}
          />
        </div>
      </div>

    </>
  );
};

export default StepInformasiUmum;
