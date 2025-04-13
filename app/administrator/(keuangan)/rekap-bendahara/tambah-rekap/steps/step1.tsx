import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StepInformasiUmum = () => {
  return (
    <>
      {/* Heading */}
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Informasi Umum</h4>
        <p className="text-sm text-gray-500">
          Isikan data informasi umum yang sesuai untuk permintaan ini.
        </p>
      </div>

      {/* Form Grid */}
      <div className="col-span-12 grid grid-cols-1 gap-4">
        {/* Judul Rekap */}
        <div className="flex items-center gap-4">
          <Label className="w-32" htmlFor="judulRekap">
            Judul Rekap
          </Label>
          <Input id="judulRekap" placeholder="Masukkan judul rekap" />
        </div>

        {/* Perekap */}
        <div className="flex items-center gap-4">
          <Label className="w-32" htmlFor="perekap">
            Perekap
          </Label>
          <Input id="perekap" placeholder="Masukkan nama perekap" />
        </div>

        {/* Tanggal Rekap */}
        <div className="flex items-center gap-4">
          <Label className="w-32" htmlFor="tanggalRekap">
            Tanggal Rekap
          </Label>
          <Input id="tanggalRekap" type="date" />
        </div>

        <div className="flex items-center gap-4">
          <Label className="w-32" htmlFor="jenisPencairan">Jenis Pencairan</Label>
          <div className="flex flex-1">
          <Select>
            <SelectTrigger size="md"  radius="md">
              <SelectValue placeholder="Pilih Jenis Pencairan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="up">Dana Uang Persediaan (UP)</SelectItem>
              <SelectItem value="nihil">Nihil</SelectItem>
              <SelectItem value="ls">Pembayaran Langsung (LS)</SelectItem>
              <SelectItem value="pengesahan">Pengesahan</SelectItem>
              <SelectItem value="gup">Penggantian UP (GUP)</SelectItem>
              <SelectItem value="ptup">Pertanggungjawaban TUP (PTUP)</SelectItem>
              <SelectItem value="tup">Tambahan UP (TUP)</SelectItem>
            </SelectContent>
          </Select>
          </div>
         
        </div>


        {/* SPP */}
        {/* <div className="flex items-center gap-4">
          <Label className="w-32">SPP</Label>
          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14" htmlFor="sppNomor">
                Nomor
              </Label>
              <Input id="sppNomor" />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14" htmlFor="sppTanggal">
                Tanggal
              </Label>
              <Input id="sppTanggal" type="date" />
            </div>
          </div>
        </div> */}

        {/* SPM */}
        {/* <div className="flex items-center gap-4">
          <Label className="w-32">SPM</Label>
          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14" htmlFor="spmNomor">
                Nomor
              </Label>
              <Input id="spmNomor" />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14" htmlFor="spmTanggal">
                Tanggal
              </Label>
              <Input id="spmTanggal" type="date" />
            </div>
          </div>
        </div> */}

        {/* SP2D */}
        {/* <div className="flex items-center gap-4">
          <Label className="w-32">SP2D</Label>
          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14" htmlFor="sp2dNomor">
                Nomor
              </Label>
              <Input id="sp2dNomor" />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14" htmlFor="sp2dTanggal">
                Tanggal
              </Label>
              <Input id="sp2dTanggal" type="date" />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default StepInformasiUmum;
