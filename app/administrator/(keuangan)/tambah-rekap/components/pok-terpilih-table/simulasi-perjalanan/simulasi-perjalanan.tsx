"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalculatorIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";

const DialogForm = () => {
  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000));

  const [pergi, setPergi] = useState("");
  const [pulang, setPulang] = useState("");
  const [lamaHari, setLamaHari] = useState(0);

  // TRANSPORT
  const [transportPergi, setTransportPergi] = useState(0);
  const [transportPulang, setTransportPulang] = useState(0);

  // TAKSI
  const [taksiAsal, setTaksiAsal] = useState(0);
  const [taksiTujuan, setTaksiTujuan] = useState(0);

  // TRANSLOK
  const [lamaTranslok, setLamaTranslok] = useState(0);
  const [rateTranslok, setRateTranslok] = useState(0);
  const [totalTranslok, setTotalTranslok] = useState(0);

  // HOTEL
  const [lamaHotel, setLamaHotel] = useState(0);
  const [rateHotel, setRateHotel] = useState(0);
  const [totalHotel, setTotalHotel] = useState(0);

  // UANG HARIAN
  const [lamaUangHarian, setLamaUangHarian] = useState(0);
  const [rateUangHarian, setRateUangHarian] = useState(0);
  const [totalUangHarian, setTotalUangHarian] = useState(0);

  // UANG SAKU
  const [lamaUangSaku, setLamaUangSaku] = useState(0);
  const [rateUangSaku, setRateUangSaku] = useState(0);
  const [totalUangSaku, setTotalUangSaku] = useState(0);

  // REPRESENTATIF
  const [lamaRepresentatif, setLamaRepresentatif] = useState(0);
  const [rateRepresentatif, setRateRepresentatif] = useState(0);
  const [totalRepresentatif, setTotalRepresentatif] = useState(0);


  // Fungsi untuk hitung lama hari secara otomatis
  useEffect(() => {
    if (pergi && pulang) {
      const pergiDate = new Date(pergi);
      const pulangDate = new Date(pulang);

      // validasi agar pulang >= pergi
      if (pulangDate >= pergiDate) {
        const timeDiff = pulangDate.getTime() - pergiDate.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24) + 1; // +1 biar dihitung hari pertama juga
        setLamaHari(daysDiff);
      } else {
        setLamaHari(0); // reset kalau tanggal salah
      }
    } else {
      setLamaHari(0);
    }
  }, [pergi, pulang]);

  useEffect(() => {
    setTotalTranslok(lamaTranslok * rateTranslok);
  }, [lamaTranslok, rateTranslok]);

  useEffect(() => {
    setTotalHotel(lamaHotel * rateHotel);
  }, [lamaHotel, rateHotel]);

  useEffect(() => {
    setTotalUangHarian(lamaUangHarian * rateUangHarian);
  }, [lamaUangHarian, rateUangHarian]);

  useEffect(() => {
    setTotalUangSaku(lamaUangSaku * rateUangSaku);
  }, [lamaUangSaku, rateUangSaku]);

  useEffect(() => {
    setTotalRepresentatif(lamaRepresentatif * rateRepresentatif);
  }, [lamaRepresentatif, rateRepresentatif]);

  const [bruto, setBruto] = useState(0);
  const [ppn, setPpn] = useState(0);
  const [pph22, setPph22] = useState(0);
  const [pph23, setPph23] = useState(0);

  const totalSemua =
    transportPergi +
    transportPulang +
    taksiAsal +
    taksiTujuan +
    totalTranslok +
    totalHotel +
    totalUangHarian +
    totalUangSaku +
    totalRepresentatif;

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" color="primary" className="h-7 w-7">
          <CalculatorIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent size="2xl">
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="text-base font-semibold text-default-700">
            Tambah Nilai Realisasi
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="flex flex-col gap-4">
            <div className="border-b pb-4 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-base font-semibold">Informasi Nota</h2>
                <div className="flex gap-4 items-center">
                  <Label className="text-sm">Tanggal</Label>
                  <Input type="date" className="h-9 w-48" />
                </div>
              </div>

              {/* Detail Uraian */}
              <div className="flex flex-col gap-2">
                <Label>Detail Uraian</Label>
                <Input
                  type="text"
                  placeholder="Tulis detail uraian di sini"
                  className="h-10"
                />
              </div>
            </div>


            <div className="border-b pb-2 flex justify-between items-center">
              <h2 className="text-base font-semibold">Biaya</h2>

              <Badge variant="outline" className="flex items-center gap-1 text-sm font-semibold py-1 rounded-full">
                <InformationCircleIcon className="h-4 w-4" />
                <span>Total Booked Rp 500.000</span>
              </Badge>
            </div>



            {/* Bruto */}
            <div className="flex gap-8 items-center border-b pb-4">
              <Label className="w-12">Bruto</Label>
              <InputGroup className="h-10 flex flex-1">
                <InputGroupText>Rp</InputGroupText>
                <Input
                  type="text"
                  placeholder="Masukkan bruto"
                  className="h-10 text-end text-sm"
                  value={bruto}
                  onChange={(e) => setBruto(Number(e.target.value))}
                />
              </InputGroup>
            </div>

            {/* PPN */}
            <div className="flex gap-8 items-center justify-end">
              <Label className="w-12">PPN</Label>
              <InputGroup className="h-10 w-52">
                <InputGroupText>Rp</InputGroupText>
                <Input
                  type="text"
                  placeholder="Masukkan PPN"
                  className="h-10 text-end text-sm"
                  value={ppn}
                  onChange={(e) => setPpn(Number(e.target.value))}
                />
              </InputGroup>
            </div>

            {/* PPh 22 */}
            <div className="flex gap-8 items-center justify-end">
              <Label className="w-12">PPh 22</Label>
              <InputGroup className="h-10 w-52">
                <InputGroupText>Rp</InputGroupText>
                <Input
                  type="text"
                  placeholder="Masukkan PPh 22"
                  className="h-10 text-end text-sm"
                  value={pph22}
                  onChange={(e) => setPph22(Number(e.target.value))}
                />
              </InputGroup>
            </div>

            {/* PPh 23 */}
            <div className="flex gap-8 items-center justify-end">
              <Label className="w-12">PPh 23</Label>
              <InputGroup className="h-10 w-52">
                <InputGroupText>Rp</InputGroupText>
                <Input
                  type="text"
                  placeholder="Masukkan PPh 23"
                  className="h-10 text-end text-sm"
                  value={pph23}
                  onChange={(e) => setPph23(Number(e.target.value))}
                />
              </InputGroup>
            </div>

            <div className="border-t pt-4 flex gap-2 flex-col">
              <Label>Netto</Label>
              <Input
                type="text"
                className="h-10 font-bold text-base text-right"
                value={formatRupiah(bruto - (ppn + pph22 + pph23))}
                readOnly
              />
            </div>
          </div>

        </ScrollArea>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <DialogClose asChild>
            <Button type="button" variant="soft" color="secondary" size="md">
              Batal
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              color="primary"
              size="md"
              onClick={() =>
                toast.promise(promise(), {
                  loading: "Menyimpan...",
                  success: "Data realisasi berhasil disimpan.",
                  error: "Terjadi kesalahan saat menyimpan.",
                  position: "top-right",
                
                })
              }
            >
              Tambah
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
