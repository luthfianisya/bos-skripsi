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

      {/* Form Grid */}
            <div className="col-span-12 grid grid-cols-1 gap-4">
              {/* SPP */}
              <div className="flex items-center gap-4">
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
              </div>
      
              {/* SPM */}
              <div className="flex items-center gap-4">
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
              </div>
      
              {/* SP2D */}
              <div className="flex items-center gap-4">
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
              </div>
            </div>
    </>
  );
};

export default StepPeserta;
