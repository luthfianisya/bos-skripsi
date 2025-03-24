import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PesertaTable from "../components/peserta-berangkat-table";
import { Plus } from "lucide-react";

const StepPeserta = () => {
  // State buat kategori peserta
  const [kategoriPeserta, setKategoriPeserta] = useState("");

  // Handler saat kategori peserta dipilih
  const handleChangeKategori = (value: string) => {
    setKategoriPeserta(value);
  };  

  // Cek apakah disabled
  const isDisabled = kategoriPeserta === "sobat" || kategoriPeserta === "";

  return (
    <>
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Pilih Peserta Berangkat</h4>
      </div>

      {/* Form Peserta */}
      <div className="grid grid-cols-12 gap-4 col-span-12">
       <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
               <div className="flex flex-col gap-2 col-span-3">
                 <Label htmlFor="peserta">Peserta</Label>
                 <Select onValueChange={handleChangeKategori}>
                   <SelectTrigger>
                     <SelectValue placeholder="Pilih Kategori Peserta" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="sobat">Pegawai/Mitra/PPNPN</SelectItem>
                     <SelectItem value="bps">Mitra Sensus/Survei SOBAT</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
       
               <div className="flex flex-col gap-2 col-span-3">
                 <Label htmlFor="wilayah">Wilayah</Label>
                 <Select disabled={isDisabled}>
                   <SelectTrigger>
                     <SelectValue placeholder="Pilih Wilayah" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="wilayah1">Wilayah 1</SelectItem>
                     <SelectItem value="wilayah2">Wilayah 2</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
       
               <div className="flex flex-col gap-2 col-span-3">
                 <Label htmlFor="sensus">Sensus/Survei</Label>
                 <Select disabled={isDisabled}>
                   <SelectTrigger>
                     <SelectValue placeholder="Pilih Sensus/Survei" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="sensus1">Sensus 1</SelectItem>
                     <SelectItem value="survey2">Survei 2</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
       
               <div className="flex flex-col gap-2 col-span-3">
                 <Label htmlFor="kegiatan">Kegiatan</Label>
                 <Select disabled={isDisabled}>
                   <SelectTrigger>
                     <SelectValue placeholder="Pilih Kegiatan" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="kegiatan1">Kegiatan 1</SelectItem>
                     <SelectItem value="kegiatan2">Kegiatan 2</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>
       
       {/* Nama Peserta - Asal-Tujuan - Tanggal Pergi Pulang */}
       <div className="col-span-12 grid grid-cols-12 gap-4">
       
         {/* Nama Peserta */}
         <div className="col-span-4 flex flex-col gap-2">
           <Label>Nama Peserta</Label>
           <Select>
             <SelectTrigger className="w-full">
               <SelectValue placeholder="Pilih Nama Peserta" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="andi">Andi</SelectItem>
               <SelectItem value="budi">Budi</SelectItem>
             </SelectContent>
           </Select>
         </div>
       
         {/* Asal - Tujuan */}
         <div className="col-span-4 flex flex-col gap-2">
         <Label>Asal - Tujuan</Label>
         <div className="flex items-center gap-2">
           <Select>
             <SelectTrigger className="w-full">
               <SelectValue placeholder="Pilih Asal" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="jakarta">Jakarta</SelectItem>
             </SelectContent>
           </Select>
       
           <span className="mx-2 text-lg font-semibold text-gray-500">-</span>
        {/* Tanda pemisah */}
       
           <Select>
             <SelectTrigger className="w-full">
               <SelectValue placeholder="Pilih Tujuan" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="bandung">Bandung</SelectItem>
             </SelectContent>
           </Select>
         </div>
       </div>
       
         {/* Pulang - Pergi */}
         <div className="col-span-4 flex flex-col gap-2">
         <Label>Pulang - Pergi</Label>
         <div className="flex items-center gap-2">
           <Input type="date" className="w-full" />
       
           <span className="mx-2 text-lg font-semibold text-gray-500">-</span>
        {/* Tanda pemisah */}
       
           <Input type="date" className="w-full" />
         </div>
       </div>
       
       </div>
      </div>

      {/* Tombol tambah peserta */}
      <div className="col-span-12 flex justify-end mt-2">
        <Button type="button" size="md" icon={Plus} color="primary">Tambah</Button>
      </div>

      <div className="col-span-12 pt-2">
        <h4 className="text-lg font-semibold text-gray-800">Preview Data Peserta Berangkat</h4>
      </div>

      <div className="col-span-12">
        <PesertaTable />
      </div>
    </>
  );
};

export default StepPeserta;
