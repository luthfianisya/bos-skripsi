import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { SingleValue } from "react-select";
import { organisasi, satker, SUB_TIPE_FORM_MAP, tahun, TIPE_FORM_MAP } from "@/lib/constants";
import { Icon } from "@iconify/react";
import { Switch } from "@/components/ui/switch";

interface StepInformasiUmumProps {
  fileKAK: File | null;
  setFileKAK: React.Dispatch<React.SetStateAction<File | null>>;
  readOnly?: boolean;
}



const StepInformasiUmum = ({ fileKAK, setFileKAK, readOnly = false }: StepInformasiUmumProps) => {
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

  const [isMultiPok, setIsMultiPok] = useState(false);

// Sinkronkan default value saat komponen mount
React.useEffect(() => {
  const jenisPokValue = getValues("jenisPok");
  setIsMultiPok(jenisPokValue === "multi");
}, [getValues]);


  return (
    <>
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Informasi Umum</h4>
        <p className="mt-1 text-sm text-gray-500">Isikan data informasi umum yang sesuai untuk permintaan ini.</p>
      </div>

      {/* Baris 1 */}
      <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="satker">Satuan Kerja</Label>
          <Select options={satker} value={defaultSatker} className="z-50" placeholder="Pilih Satuan Kerja" isDisabled />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="unitKerja">Unit Kerja</Label>
          <Select options={organisasi} value={defaultOrganisasi} className="z-50" placeholder="Pilih Unit Kerja" isDisabled />
        </div>


        <div className="flex flex-col gap-2">
          <Label htmlFor="tahunAnggaran">Tahun Anggaran</Label>
          <Select options={tahun} value={defaultTahun} className="z-50" placeholder="Pilih Tahun" isDisabled />
        </div>
      </div>

      {/* Baris 2 */}
      <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="tipeForm">Tipe Form</Label>
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
          <Label htmlFor="subTipeForm">Sub-Tipe Form</Label>
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
          <Label>Jenis POK</Label>

          <div className="flex items-center space-x-2.5 mt-2">
            <Switch
              id="jenisPokSwitch"
              checked={isMultiPok}
              onCheckedChange={(checked) => {
                setIsMultiPok(checked);
                setValue("jenisPok", checked ? "multi" : "single");
              }}
              disabled={selectedTipeForm?.value === "FORM - TRANSLOK" || readOnly}
            />
            <Label
              htmlFor="jenisPokSwitch"
              className="text-sm font-normal"
            >
              Multi POK
            </Label>
          </div>
        </div>

      </div>

      {/* Baris 3 */}
      <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="noSurat">Nomor Surat</Label>
          <Input
            size="lg"
            type="text"
            id="noSurat"
            placeholder="Nomor Surat"
            {...register("noSurat", {
              required: "Nomor Surat wajib diisi",
              validate: (value) =>
                value !== "B-0001A/92810/KU.600/07/2025" || "Nomor Surat harus diubah dari default value",
            })}
            className={`border rounded-md p-2 ${errors.noSurat ? "border-destructive" : "border-gray-300 focus:border-primary"
              }`}
            disabled={readOnly}
          />

          {errors.noSurat && (
            <p className="text-red-500 text-sm">{errors.noSurat.message as string}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="tanggalSurat">Tanggal Surat</Label>
          <Input
            size="lg"
            type="date"
            id="tanggalSurat"
            {...register("tanggalSurat", { required: "Tanggal Surat wajib diisi" })}
            className={`border rounded-md p-2 ${errors.tanggalSurat ? "border-destructive" : "border-gray-300 focus:border-primary"}`}
            disabled={readOnly}
          />
          {errors.tanggalSurat && <p className="text-red-500 text-sm">{errors.tanggalSurat.message as string}</p>}        </div>
      </div>

      {/* Baris 4 */}
      <div className="col-span-12 flex flex-col gap-2">
        <Label htmlFor="deskripsiPermintaan">Deskripsi Permintaan</Label>
        <textarea
          id="deskripsiPermintaan"
          placeholder="Deskripsi lengkap permintaan..."
          {...register("deskripsiPermintaan", { required: "Deskripsi wajib diisi" })}
          className={`border rounded-md p-2 focus:outline-none w-full placeholder:text-accent-foreground/50 ${errors.deskripsiPermintaan ? "border-destructive" : "border-gray-300 focus:border-primary"}`} rows={4}
          disabled={readOnly}
        />
        {errors.deskripsiPermintaan && <p className="text-red-500 text-sm">{errors.deskripsiPermintaan.message as string}</p>}
      </div>

      {/* Baris 5 */}
      <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-4 pb-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="linkPermintaan">Link Permintaan Belanja</Label>
          <Controller
            name="linkPermintaan"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={linkOptions}
                placeholder="Pilih Link Permintaan"
                isDisabled={readOnly}
                menuPlacement="top"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="uploadKAK">Upload KAK</Label>
          <Input
            size="lg"
            type="file"
            id="uploadKAK"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setFileKAK(file);
              setValue("uploadKAK", file, { shouldValidate: true });
            }}
            className={`border rounded-md ${errors.uploadKAK ? "border-destructive" : "border-gray-300 focus:border-primary"}`}
            disabled={readOnly}
          />

          {fileKAK && (
            <div className="flex items-center gap-3 border rounded-md p-2 mt-2">
              <div className="w-5 h-5 flex items-center justify-center bg-muted rounded">
                <Icon icon="tabler:file-description" />
              </div>
              <div className="flex items-center justify-between flex-1">
                <span className="text-sm text-gray-700">{fileKAK.name}</span>
                <span className="text-xs text-gray-500">
                  {`${(fileKAK.size / 1024).toFixed(1)} KB`}
                </span>
              </div>
            </div>
          )}

          {errors.uploadKAK && (
            <p className="text-red-500 text-sm">{errors.uploadKAK.message as string}</p>
          )}
        </div>

      </div >
    </>
  );
};

export default StepInformasiUmum;
