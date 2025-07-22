"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/sheet";
import { bankOptions, eselonOptions, golonganOptions, kabupatenOptions, organisasiOptions, provinsiOptions, satker } from "@/lib/constants";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "sonner";


const styles = {
  option: (provided: any) => ({
    ...provided,
    fontSize: "14px",
    fontWeight: 400,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontWeight: 400, // atau 500 jika ingin sedikit bold
  }),
};


interface CreateTaskProps {
  open: boolean;
  onClose: () => void;
}

const CreateTask = ({ open, onClose }: CreateTaskProps) => {
  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000));

  const { control, handleSubmit, setValue,   formState: { errors, isValid } } = useForm({
    mode: "onChange",
    defaultValues: {
      satuanKerja: null,
      organisasiMitra: null,
      provinsiTugas: null,
      kabupatenTugas: null,
      nikKtp: '',
      nip: '',
      namaMitra: '',
      npwp: '',
      nomorRekening: '',
      email: '',
    },
  });
  
const onSubmit = async (data: any) => {
  try {
    await toast.promise(
      new Promise((res) => setTimeout(res, 1000)), // simulasi loading
      {
        loading: "Menyimpan...",
        success: "Data mitra berhasil disimpan.",
        error: "Terjadi kesalahan saat menyimpan.",
      }
    );

    console.log("Data:", data);
    onClose?.();
  } catch (err) {
    console.error("Submit error:", err);
    // toast error sudah ditangani oleh toast.promise, jadi ini opsional
  }
};





  const [selectedProvinsi, setSelectedProvinsi] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="pt-5 max-w-xl overflow-y-auto max-h-screen" overlayClass="backdrop-blur-none">
        <SheetHeader className="flex-row items-center justify-between mb-4">
          <span className="text-lg font-semibold text-default-900">Tambah Mitra</span>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between">
          <div className="space-y-4">

            {/* Satuan Kerja (required) */}
            <div>
              <Label htmlFor="satuanKerja" className="mb-1.5 text-default-600">Satuan Kerja</Label>
              <Controller
                name="satuanKerja"
                control={control}
                rules={{ required: "Satuan Kerja wajib diisi" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={satker}
                    styles={styles}
                    placeholder="Pilih satuan kerja..."
                    value={field.value || null}
                    onChange={(val) => field.onChange(val)}
                    isClearable
                  />
                )}
              
              />
              {errors.satuanKerja && <p className="text-red-500 text-sm">{errors.satuanKerja.message}</p>}
            </div>

            {/* Organisasi Mitra (required) */}
            <div>
              <Label htmlFor="organisasiMitra" className="mb-1.5 text-default-600">Organisasi Mitra/PPNPN</Label>
              <Controller
                name="organisasiMitra"
                control={control}
                rules={{ required: "Organisasi Mitra wajib diisi" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={organisasiOptions}
                    styles={styles}
                    placeholder="Pilih organisasi mitra..."
                    value={field.value || null}
                    onChange={(val) => field.onChange(val)}
                    isClearable
                  />
                )}
              />
              {errors.organisasiMitra && <p className="text-red-500 text-sm">{errors.organisasiMitra.message}</p>}
            </div>

            {/* Nama Mitra (optional) */}
            <div>
              <Label htmlFor="namaMitra" className="mb-1.5 text-default-600">Nama Mitra</Label>
              <Controller
                name="namaMitra"
                control={control}
                rules={{ required: "Nama mitra wajib diisi" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="nikKtp"
                    placeholder="Masukkan nama mitra..."
                    className="text-sm"
                    
                  />
                )}
              />
              {errors.namaMitra && <p className="text-red-500 text-sm">{errors.namaMitra.message}</p>}
            </div>

            {/* NIK KTP */}
            <div>
              <Label htmlFor="nikKtp" className="mb-1.5 text-default-600">NIK KTP</Label>
              <Controller
                name="nikKtp"
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "NIK hanya boleh berisi angka"
                  },
                  required: "NIK wajib diisi"
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="nikKtp"
                    placeholder="Masukkan NIK sesuai KTP..."
                    className="text-sm"
                  />
                )}
              />
              {errors.nikKtp && <p className="text-red-500 text-sm">{errors.nikKtp.message}</p>}
            </div>


            {/* NIP (optional) */}
            <div>
              <Label htmlFor="nip" className="mb-1.5 text-default-600">NIP</Label>
              <Controller
                name="nip"
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "NIP hanya boleh berisi angka"
                  }
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="nip"
                    placeholder="Masukkan NIP..."
                    className="text-sm"
                  />
                )}
              />
              {errors.nip && <p className="text-red-500 text-sm">{errors.nip.message}</p>}
            </div>

            {/* Provinsi dan Kabupaten Tugas (required) */}
            <div className="flex gap-x-4">
              <div className="w-1/2">
                <Label htmlFor="provinsiTugas" className="mb-1.5 text-default-600">Provinsi Tugas</Label>
                <Controller
                  name="provinsiTugas"
                  control={control}
                  rules={{
                    required: "Provinsi Tugas wajib diisi",
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={provinsiOptions}
                      styles={styles}
                      placeholder="Pilih provinsi..."
                      value={field.value || null}
                      onChange={(val) => {
                        field.onChange(val);
                        setSelectedProvinsi(val?.value || null);
                        // reset kabupaten ketika provinsi berubah
                        setValue("kabupatenTugas", null);
                      }}
                      isClearable
                    />
                  )}
                />
                {errors.provinsiTugas && <p className="text-red-500 text-sm">{errors.provinsiTugas.message}</p>}
              </div>

              <div className="w-1/2">
                <Label htmlFor="kabupatenTugas" className="mb-1.5 text-default-600">Kabupaten Tugas</Label>
                <Controller
                  name="kabupatenTugas"
                  control={control}
                  rules={{ required: "Kabupaten Tugas wajib diisi" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={
                        selectedProvinsi && selectedProvinsi !== "00"
                          ? kabupatenOptions[selectedProvinsi as keyof typeof kabupatenOptions]
                          : []
                      }
                      styles={styles}
                      placeholder="Pilih kabupaten..."
                      value={field.value || null}
                      onChange={(val) => field.onChange(val)}
                      isDisabled={!selectedProvinsi || selectedProvinsi === "00"}
                      isClearable
                    />


                  )}
                />

                {errors.kabupatenTugas && <p className="text-red-500 text-sm">{errors.kabupatenTugas.message}</p>}
              </div>
            </div>

            {/* Eselon dan Golongan (optional) */}
            <div className="flex gap-x-4">
              <div className="w-1/2">
                <Label htmlFor="eselon" className="mb-1.5 text-default-600">Eselon</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  options={eselonOptions}
                  styles={styles}
                  placeholder="Pilih eselon..."
                  isClearable
                />
              </div>

              <div className="w-1/2">
                <Label htmlFor="golongan" className="mb-1.5 text-default-600">Golongan</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  options={golonganOptions}
                  styles={styles}
                  placeholder="Pilih golongan..."
                  isClearable
                />
              </div>
            </div>

            {/* Instansi (optional) */}
            <div>
              <Label htmlFor="instansi" className="mb-1.5 text-default-600">Instansi</Label>
              <Input id="instansi" placeholder="Masukkan instansi..." className="text-sm" />
            </div>

            {/* Jabatan (optional) */}
            <div>
              <Label htmlFor="jabatan" className="mb-1.5 text-default-600">Jabatan</Label>
              <Input id="jabatan" placeholder="Masukkan jabatan..." className="text-sm" />
            </div>

            {/* NPWP (optional) */}
            <div>
              <Label htmlFor="npwp" className="mb-1.5 text-default-600">NPWP</Label>
              <Controller
                name="npwp"
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "NPWP hanya boleh berisi angka"
                  }
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="nip"
                    placeholder="Masukkan NPWP..."
                    className="text-sm"
                  />
                )}
              />
              {errors.npwp && <p className="text-red-500 text-sm">{errors.npwp.message}</p>}
            </div>

            {/* Bank dan Nomor Rekening (optional) */}
            <div className="flex gap-x-4">
              <div className="w-2/5">
                <Label htmlFor="bank" className="mb-1.5 text-default-600">Bank</Label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  options={bankOptions}
                  styles={styles}
                  placeholder="Pilih bank..."
                  menuPlacement="top"
                  isClearable
                />
              </div>

              <div className="w-3/5">
                <Label htmlFor="nomorRekening" className="mb-1.5 text-default-600">Nomor Rekening</Label>
                <Controller
                  name="nomorRekening"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Nomor rekening hanya boleh berisi angka"
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="nip"
                      placeholder="Masukkan nomor rekening..."
                      className="text-sm"
                    />
                  )}
                />
                {errors.nomorRekening && <p className="text-red-500 text-sm">{errors.nomorRekening.message}</p>}
              </div>
            </div>

            {/* Nama Pemilik Rekening (optional) */}
            <div>
              <Label htmlFor="namaPemilikRekening" className="mb-1.5 text-default-600">Nama Pemilik Rekening</Label>
              <Input id="namaPemilikRekening" placeholder="Masukkan nama pemilik rekening..." className="text-sm" />
            </div>

            {/* Email (optional) */}
            <div>
              <Label htmlFor="email" className="mb-1.5 text-default-600">Email</Label>
              <Controller
                name="email"
                control={control}
                rules={{
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Format email tidak valid"
                  }
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    placeholder="Masukkan email..."
                    className="text-sm"
                  />
                )}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            </div>

          </div>

          <SheetFooter className="pb-10 pt-6">
            <SheetClose asChild>
              <Button type="button" size="md" variant="soft" color="secondary">
                Batal
              </Button>
            </SheetClose>
            <Button type="submit">Simpan</Button>


          </SheetFooter>

        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTask;
