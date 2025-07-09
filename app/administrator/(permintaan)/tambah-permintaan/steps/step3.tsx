import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select as UISelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PesertaTable from "../components/peserta-berangkat-table";
import { Plus } from "lucide-react";
import { DUMMY_PEGAWAIS } from "@/data/pegawai-dummy";
import Select from "react-select";
import { Peserta } from "../components/peserta-berangkat-table/columns";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger as Trigger,
} from "@/components/ui/accordion";
import { Icon } from "@iconify/react";
import { CustomIcon } from "@/components/svg";
import { cn } from "@/lib/utils";
import { DetailPesertas } from "@/data/peserta-berangkat";
import { toast } from "sonner";


interface AccordionTriggerProps {
  children: React.ReactNode;
  value: string;
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const pesertaOptions = DUMMY_PEGAWAIS.map((pegawai) => ({
  value: pegawai.nip,
  label: pegawai.nama,
}));

export const asalOptions = [
  { value: "depok", label: "Depok" },
  { value: "beji", label: "Beji" },
  { value: "cimanggis", label: "Cimanggis" },
  { value: "sawangan", label: "Sawangan" },
  { value: "cinere", label: "Cinere" },
];

export const tujuanOptions = [
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

const AccordionTrigger = ({ children, value, activeItem, setActiveItem }: AccordionTriggerProps) => {
  const isOpen = activeItem === value;

  const toggleOpen = () => {
    setActiveItem(isOpen ? null : value);
  };

  return (
    <Trigger
      onClick={toggleOpen}
      className="flex items-center justify-between w-full gap-2 [&>svg]:hidden"
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-8 w-8 inline-flex items-center justify-center rounded-full transition-colors",
            {
              "bg-default-100 text-primary": isOpen,
              "hover:bg-default-100 dark:hover:bg-default-200 text-default-500 dark:text-default-800":
                !isOpen,
            }
          )}
        >
          <CustomIcon className="h-5 w-5" />
        </div>
        <div className="text-sm font-medium">{children}</div>
      </div>

      <div
        className={cn(
          "h-6 w-6 inline-flex items-center justify-center rounded transition-colors",
          {
            "bg-primary text-white": isOpen,
            "bg-primary/10 text-primary": !isOpen,
          }
        )}
      >
        {isOpen ? (
          <Icon icon="heroicons:minus" className="h-4 w-4" />
        ) : (
          <Icon icon="heroicons:plus-small-solid" className="h-4 w-4" />
        )}
      </div>
    </Trigger>

  );
};

interface StepPesertaProps {
  dataPeserta: Peserta[];
  setDataPeserta: React.Dispatch<React.SetStateAction<Peserta[]>>;
  readOnly?: boolean;
}

const StepPeserta = ({ dataPeserta, setDataPeserta, readOnly }: StepPesertaProps) => {
  const [kategoriPeserta, setKategoriPeserta] = useState("");
  const [minTanggalPulang, setMinTanggalPulang] = useState("");
  const [maxTanggalPulang, setMaxTanggalPulang] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const isDisabled = kategoriPeserta === "sobat" || kategoriPeserta === "";

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PesertaSchema),
    defaultValues: {
      nama: undefined,
      asal: undefined,
      tujuan: undefined,
      tanggalPergi: "",
      tanggalPulang: "",
    },
  });

  const tanggalPergi = watch("tanggalPergi");

  useEffect(() => {
    if (readOnly) {
      const mapped = DetailPesertas.map((d) => ({
        nama: d.nama,
        gol: d.gol,
        asal: d.asal,
        tujuan: d.tujuan,
        pulangPergi: d.pulangPergi,
        jumlah: d.jumlah ?? 0,
      }));
      setDataPeserta(mapped);
    }
  }, [readOnly, setDataPeserta]);


  const onSubmit = (data: any) => {
    const newPeserta: Peserta = {
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

    toast(`${newPeserta.nama} berhasil ditambahkan ke tabel.`, {
      description: "Peserta Ditambahkan",
      position: "top-right",
    });


    reset();
  };

  return (
    <>
      {!readOnly && (
        <><div className="col-span-12">
          <h4 className="text-lg font-semibold text-gray-800">Pilih Peserta Berangkat</h4>
        </div><div className="col-span-12">
            <Accordion type="single" collapsible className="w-full space-y-3.5">
              <AccordionItem value="form-peserta">
                <AccordionTrigger value="pok-table" activeItem={activeItem} setActiveItem={setActiveItem}>
                  <div className="text-base">
                    Tambah Peserta
                  </div>
                </AccordionTrigger>

                <AccordionContent className="overflow-visible z-[20] relative">
                  <div className="grid grid-cols-12 gap-4 mt-4">
                    {/* Baris pertama */}
                    <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
                      <div className="flex flex-col gap-2 col-span-3">
                        <Label>Peserta</Label>
                        <UISelect onValueChange={setKategoriPeserta}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kategori Peserta" />
                          </SelectTrigger>
                          <SelectContent className="z-[9999]">
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
                          <SelectContent className="z-[9999]">
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
                          <SelectContent className="z-[9999]">
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
                          <SelectContent className="z-[9999]">
                            <SelectItem value="kegiatan1">Kegiatan 1</SelectItem>
                            <SelectItem value="kegiatan2">Kegiatan 2</SelectItem>
                          </SelectContent>
                        </UISelect>
                      </div>
                    </div>

                    {/* Nama - Asal Tujuan - Pulang Pergi */}
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
                              isClearable />
                          )} />
                        {errors.nama && <span className="text-red-500 text-sm">{errors.nama.message}</span>}
                      </div>

                      <div className="col-span-4 flex flex-col gap-2">
                        <Label className={errors.asal || errors.tujuan ? "text-red-500" : ""}>Asal - Tujuan</Label>
                        <div className="flex items-start gap-2">
                          <div className="flex flex-1 flex-col gap-2">
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
                                  isClearable />
                              )} />
                            {errors.asal && <span className="text-red-500 text-sm">{errors.asal.message}</span>}
                          </div>
                          <span className="mx-2 text-lg font-semibold text-gray-500">-</span>
                          <div className="flex flex-1 flex-col gap-2">
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
                                  isClearable />
                              )} />
                            {errors.tujuan && <span className="text-red-500 text-sm">{errors.tujuan.message}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-4 flex flex-col gap-2 w-full">
                        <Label className={errors.tanggalPulang || errors.tanggalPergi ? "text-red-500" : ""}>Pulang - Pergi</Label>
                        <div className="flex items-start gap-2">
                          <div className="flex flex-1 flex-col gap-2">
                            <Input type="date" className="w-full" {...register("tanggalPergi")} />
                            {errors.tanggalPergi && <span className="text-red-500 text-sm">{errors.tanggalPergi.message}</span>}
                          </div>
                          <span className="mx-2 text-lg font-semibold text-gray-500">-</span>
                          <div className="flex flex-1 flex-col gap-2 w-full">
                            <Input
                              type="date"
                              className="w-full"
                              min={tanggalPergi}
                              {...register("tanggalPulang")}
                            />
                            {errors.tanggalPulang && <span className="text-red-500 text-sm">{errors.tanggalPulang.message}</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 flex justify-end mt-2">
                      <Button type="button" size="md" icon={Plus} color="primary" onClick={handleSubmit(onSubmit)}>
                        Tambah
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div></>
      )}

      <div className="col-span-12 pt-2">
        <h4 className="text-lg font-semibold text-gray-800">Preview Data Peserta Berangkat</h4>
      </div>

      <div className="col-span-12">
        <PesertaTable
          data={dataPeserta}
          onUpdateTotal={(index, total) => {
            if (readOnly) return;
            const newData = [...dataPeserta];
            newData[index].jumlah = total;
            setDataPeserta(newData);
          }}
          readOnly={readOnly ?? false}
        />



      </div>
    </>
  );
};

export default StepPeserta;
