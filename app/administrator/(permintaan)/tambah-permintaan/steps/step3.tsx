import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select as UISelect, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PesertaTable from "../components/peserta-berangkat-table";
import { Plus } from "lucide-react";
import { DUMMY_PEGAWAIS } from "@/data/pegawai-dummy";
import Select from "react-select";
import { PerjalananDinas } from "../components/peserta-berangkat-table/columns";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const pesertaOptions = DUMMY_PEGAWAIS.map((pegawai) => ({
  value: pegawai.nip,
  label: pegawai.nama,
}));

const asalOptions = [
  { value: "depok", label: "Depok" },
  { value: "beji", label: "Beji" },
  { value: "cimanggis", label: "Cimanggis" },
  { value: "sawangan", label: "Sawangan" },
  { value: "cinere", label: "Cinere" },
];

const tujuanOptions = [
  { value: "pancoran_mas", label: "Pancoran Mas" },
  { value: "bojongsari", label: "Bojongsari" },
  { value: "cilodong", label: "Cilodong" },
  { value: "jakarta_selatan", label: "Jakarta Selatan" },
  { value: "bogor", label: "Bogor" },
];

const PesertaSchema = z.object({
  nama: z.object({ label: z.string(), value: z.string() }, { required_error: "Nama harus dipilih" }),
  asal: z.object({ label: z.string(), value: z.string() }, { required_error: "Asal harus dipilih" }),
  tujuan: z.object({ label: z.string(), value: z.string() }, { required_error: "Tujuan harus dipilih" }),
  tanggalPergi: z.string().min(1, { message: "Tgl pergi wajib diisi" }),
  tanggalPulang: z.string().min(1, { message: "Tgl pulang wajib diisi" }),
});

const StepPeserta = () => {
  const [kategoriPeserta, setKategoriPeserta] = useState("");
  const [dataPeserta, setDataPeserta] = useState<PerjalananDinas[]>([]);
  const [minTanggalPulang, setMinTanggalPulang] = useState("");
  const [maxTanggalPulang, setMaxTanggalPulang] = useState("");

  const { register, handleSubmit, control, reset, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(PesertaSchema),
    defaultValues: {
      nama: undefined,
      asal: undefined,
      tujuan: undefined,
      tanggalPergi: "",
      tanggalPulang: "",
    }
  });

  const tanggalPergi = watch("tanggalPergi");

  React.useEffect(() => {
    if (tanggalPergi) {
      const pergiDate = new Date(tanggalPergi);
      const minDate = pergiDate.toISOString().split("T")[0];
      const maxDate = new Date(pergiDate.setDate(pergiDate.getDate() + 1)).toISOString().split("T")[0];
      setMinTanggalPulang(minDate);
      setMaxTanggalPulang(maxDate);

      // Reset tanggalPulang kalau di luar range
      setValue("tanggalPulang", "");
    }
  }, [tanggalPergi, setValue]);

  const onSubmit = (data: any) => {
    const newPeserta: PerjalananDinas = {
      nama: data.nama.label,
      gol: "",
      asal: data.asal.label,
      tujuan: data.tujuan.label,
      pulangPergi: {
        tanggalPergi: data.tanggalPergi,
        tanggalPulang: data.tanggalPulang,
      },
      jumlah: 0,
    };

    setDataPeserta([...dataPeserta, newPeserta]);

    toast({
      title: "Peserta Ditambahkan",
      description: `${newPeserta.nama} berhasil ditambahkan ke tabel.`,
    });

    reset();
  };

  const isDisabled = kategoriPeserta === "sobat" || kategoriPeserta === "";

  return (
    <>
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Pilih Peserta Berangkat</h4>
      </div>

      <div className="grid grid-cols-12 gap-4 col-span-12">
        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="flex flex-col gap-2 col-span-3">
            <Label>Peserta</Label>
            <UISelect onValueChange={setKategoriPeserta}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kategori Peserta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sobat">Pegawai/Mitra/PPNPN</SelectItem>
                <SelectItem value="bps">Mitra Sensus/Survei SOBAT</SelectItem>
              </SelectContent>
            </UISelect>
          </div>
          <div className="flex flex-col gap-2 col-span-3">
            <Label>Wilayah</Label>
            <UISelect disabled={isDisabled}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Wilayah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wilayah1">Wilayah 1</SelectItem>
                <SelectItem value="wilayah2">Wilayah 2</SelectItem>
              </SelectContent>
            </UISelect>
          </div>
          <div className="flex flex-col gap-2 col-span-3">
            <Label>Sensus/Survei</Label>
            <UISelect disabled={isDisabled}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Sensus/Survei" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sensus1">Sensus 1</SelectItem>
                <SelectItem value="survey2">Survei 2</SelectItem>
              </SelectContent>
            </UISelect>
          </div>
          <div className="flex flex-col gap-2 col-span-3">
            <Label>Kegiatan</Label>
            <UISelect disabled={isDisabled}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kegiatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kegiatan1">Kegiatan 1</SelectItem>
                <SelectItem value="kegiatan2">Kegiatan 2</SelectItem>
              </SelectContent>
            </UISelect>
          </div>
        </div>

        {/* Nama Peserta - Asal Tujuan - Tanggal */}
        <div className="col-span-12 grid grid-cols-12 gap-4">
          <div className="col-span-4 flex flex-col gap-2">
            <Label className={errors.nama ? "text-red-500" : ""}>Nama Peserta</Label>
            <Controller
              name="nama"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="react-select w-full"
                  classNamePrefix="select"
                  placeholder="Pilih Nama Peserta"
                  options={pesertaOptions}
                  isClearable
                />
              )}
            />
            {errors.nama && <span className="text-red-500 text-sm">{errors.nama.message}</span>}
          </div>

          <div className="col-span-4 flex flex-col gap-2">
            <Label className={errors.asal || errors.tujuan ? "text-red-500" : ""}>Asal - Tujuan</Label>
            <div className="flex items-start gap-2">
              <div className="flex flex-col gap-2">
                <Controller
                  name="asal"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="react-select w-full"
                      classNamePrefix="select"
                      placeholder="Pilih Asal"
                      options={asalOptions}
                      isClearable
                    />
                  )}
                />
                {errors.asal && <span className="text-red-500 text-sm">{errors.asal.message}</span>}
              </div>

              <span className="mx-2 text-lg font-semibold text-gray-500">-</span>
              <div className="flex flex-col gap-2">
                <Controller
                  name="tujuan"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="react-select w-full"
                      classNamePrefix="select"
                      placeholder="Pilih Tujuan"
                      options={tujuanOptions}
                      isClearable
                    />
                  )}
                />
                {errors.tujuan && <span className="text-red-500 text-sm">{errors.tujuan.message}</span>}
              </div>

            </div>


          </div>

          <div className="col-span-4 flex flex-col gap-2 w-full">
            <Label className={errors.tanggalPulang || errors.tanggalPergi ? "text-red-500" : ""}>Pulang - Pergi</Label>
            <div className="flex items-start gap-2">
              <div className="flex flex-col gap-2">
                <Input type="date" className="w-full" {...register("tanggalPergi")} />
                {errors.tanggalPergi && <span className="text-red-500 text-sm">{errors.tanggalPergi.message}</span>}
              </div>

              <span className="mx-2 text-lg font-semibold text-gray-500">-</span>
              <div className="flex flex-col gap-2 w-full">
                <Input
                  type="date"
                  className="w-full"
                  {...register("tanggalPulang")}
                  min={minTanggalPulang}
                  max={maxTanggalPulang}
                />

                {errors.tanggalPulang && <span className="text-red-500 text-sm">{errors.tanggalPulang.message}</span>}
              </div>

            </div>


          </div>
        </div>
      </div>

      <div className="col-span-12 flex justify-end mt-2">
        <Button type="button" size="md" icon={Plus} color="primary" onClick={handleSubmit(onSubmit)}>
          Tambah
        </Button>
      </div>

      <div className="col-span-12 pt-2">
        <h4 className="text-lg font-semibold text-gray-800">Preview Data Peserta Berangkat</h4>
      </div>

      <div className="col-span-12">
        <PesertaTable data={dataPeserta} />
      </div>
    </>
  );
};

export default StepPeserta;
