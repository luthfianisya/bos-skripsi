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
import { CalculatorIcon } from "@heroicons/react/24/solid";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { getColumns, Peserta } from "../columns";
import { DataTable } from "../data-table";
import { asalOptions, tujuanOptions } from "../../../steps/step3";
import { DetailPesertas } from "@/data/peserta-berangkat";

const PesertaTable = ({ data, onUpdateTotal, readOnly }: { data: Peserta[], onUpdateTotal: (i: number, t: number) => void, readOnly?: boolean }) => {
  const columns = getColumns(onUpdateTotal, readOnly);

  return <DataTable columns={columns} data={data} />;
};

interface DialogFormProps {
  data: Peserta;
  onSave: (updatedTotal: number) => void;
  readOnly?: boolean;
}

const DialogForm = ({ data, onSave, readOnly }: DialogFormProps) => {
  const [pergi, setPergi] = useState(data.pulangPergi.tanggalPergi || "");
  const [pulang, setPulang] = useState(data.pulangPergi.tanggalPulang || "");
  const [asal, setAsal] = useState(data.asal || "");
  const [tujuan, setTujuan] = useState(data.tujuan || "");
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

  useEffect(() => {
    if (readOnly) {
      const dummy = DetailPesertas[0]; // atau data dummy sesuai kebutuhanmu

      setPergi(dummy.pulangPergi.tanggalPergi);
      setPulang(dummy.pulangPergi.tanggalPulang);
      setAsal(dummy.asal);
      setTujuan(dummy.tujuan);

      setTransportPergi(dummy.transportPergi);
      setTransportPulang(dummy.transportPulang);

      setTaksiAsal(dummy.taksiAsal);
      setTaksiTujuan(dummy.taksiTujuan);

      setLamaTranslok(dummy.lamaTranslok);
      setRateTranslok(dummy.rateTranslok);

      setLamaHotel(dummy.lamaHotel);
      setRateHotel(dummy.rateHotel);

      setLamaUangHarian(dummy.lamaUangHarian);
      setRateUangHarian(dummy.rateUangHarian);

      setLamaUangSaku(dummy.lamaUangSaku);
      setRateUangSaku(dummy.rateUangSaku);

      setLamaRepresentatif(dummy.lamaRepresentatif);
      setRateRepresentatif(dummy.rateRepresentatif);
    }
  }, [readOnly]);


  const handleSimpan = () => {
    onSave(totalSemua);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" color="primary" className="h-7 w-7">
          <CalculatorIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent size="4xl">
        <DialogHeader className="p-0 mb-4">
          <DialogTitle className="text-base font-semibold text-default-700">
            Tambah Biaya Perjalanan
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="flex flex-col gap-6">
            {/* ASAL - TUJUAN - PERGI - PULANG - LAMA HARI */}
            <div className="grid grid-cols-5 gap-4">
              <div>
                <Label>Asal</Label>
                <Select value={asal} onValueChange={setAsal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Asal" />
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    {asalOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tujuan</Label>
                <Select value={tujuan} onValueChange={setTujuan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Tujuan" />
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    {tujuanOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Pergi</Label>
                <Input
                  type="date"
                  className="w-full"
                  value={pergi}
                  onChange={(e) => setPergi(e.target.value)}
                />
              </div>

              <div>
                <Label>Pulang</Label>
                <Input
                  type="date"
                  className="w-full"
                  value={pulang}
                  onChange={(e) => setPulang(e.target.value)}
                />
              </div>

              <div>
                <Label>Lama Hari</Label>
                <Input
                  type="number"
                  placeholder="0 Hari"
                  className="h-10"
                  value={lamaHari}
                  readOnly
                />
              </div>
            </div>

            {/* TRANSPORT */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Transport Utama Pergi</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Masukkan jumlah uang transport utama pergi" className="h-10"
                    value={transportPergi}
                    onChange={(e) => setTransportPergi(Number(e.target.value))}
                  />
                </InputGroup>
              </div>
              <div>
                <Label>Transport Utama Pulang</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Masukkan jumlah uang transport utama pulang" className="h-10"
                    value={transportPulang}
                    onChange={(e) => setTransportPulang(Number(e.target.value))} />
                </InputGroup>
              </div>
            </div>

            {/* TAKSI */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Taksi Asal</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Masukkan jumlah uang taksi asal" className="h-10"
                    value={taksiAsal}
                    onChange={(e) => setTaksiAsal(Number(e.target.value))}
                  />
                </InputGroup>
              </div>
              <div>
                <Label>Taksi Tujuan</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Masukkan jumlah uang taksi tujuan" className="h-10"
                    value={taksiTujuan}
                    onChange={(e) => setTaksiTujuan(Number(e.target.value))}
                  />
                </InputGroup>
              </div>
            </div>

            {/* TRANLOK */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Lama Translok</Label>
                <Input type="number" placeholder="0" className="h-10"
                  value={lamaTranslok}
                  onChange={(e) => setLamaTranslok(Number(e.target.value))} />
              </div>
              <div>
                <Label>Rate Translok</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Masukkan rate translok" className="h-10"
                    value={rateTranslok}
                    onChange={(e) => setRateTranslok(Number(e.target.value))}
                  />
                </InputGroup>
              </div>
              <div>
                <Label>Total Translok</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Total Translok" className="h-10" value={totalTranslok} />
                </InputGroup>
              </div>
            </div>

            {/* HOTEL */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Lama Hotel</Label>
                <Input type="number" placeholder="0" className="h-10"
                  value={lamaHotel}
                  onChange={(e) => setLamaHotel(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Rate Hotel</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Masukkan rate hotel" className="h-10"
                    value={rateHotel}
                    onChange={(e) => setRateHotel(Number(e.target.value))}
                  />
                </InputGroup>
              </div>
              <div>
                <Label>Total Biaya Hotel</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Total biaya hotel" className="h-10" value={totalHotel} />
                </InputGroup>
              </div>
            </div>

            {/* UANG HARIAN */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Lama Uang Harian</Label>
                <Input type="number" placeholder="0" className="h-10"
                  value={lamaUangHarian}
                  onChange={(e) => setLamaUangHarian(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Rate Uang Harian</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Masukkan rate uang harian" className="h-10"
                    value={rateUangHarian}
                    onChange={(e) => setRateUangHarian(Number(e.target.value))}
                  />
                </InputGroup>
              </div>
              <div>
                <Label>Total Uang Harian</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Total uang harian" className="h-10" value={totalUangHarian} />
                </InputGroup>
              </div>
            </div>

            {/* UANG SAKU */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Lama Uang Saku</Label>
                <Input type="number" placeholder="0" className="h-10"
                  value={lamaUangSaku}
                  onChange={(e) => setLamaUangSaku(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Rate Uang Saku</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Masukkan rate uang saku" className="h-10"
                    value={rateUangSaku}
                    onChange={(e) => setRateUangSaku(Number(e.target.value))}
                  />
                </InputGroup>
              </div>
              <div>
                <Label>Total Uang Saku</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Total uang saku" className="h-10" value={totalUangSaku} />
                </InputGroup>
              </div>
            </div>

            {/* REPRESENTATIF */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Lama Representatif</Label>
                <Input type="number" placeholder="0" className="h-10"
                  value={lamaRepresentatif}
                  onChange={(e) => setLamaRepresentatif(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Rate Representatif</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input
                    type="text" placeholder="Masukkan rate representatif" className="h-10"
                    value={rateRepresentatif}
                    onChange={(e) => setRateRepresentatif(Number(e.target.value))} />
                </InputGroup>
              </div>
              <div>
                <Label>Total Representatif</Label>
                <InputGroup className="h-10">
                  <InputGroupText>Rp</InputGroupText>
                  <Input type="text" placeholder="Total Representatif" className="h-10" value={totalRepresentatif} />
                </InputGroup>
              </div>
            </div>

            {/* TOTAL */}
            <div className="mt-4">
              <Label className="font-semibold">TOTAL</Label>
              <Input type="text" placeholder="Rp 0" className="h-12 font-bold text-lg text-right" value={formatRupiah(totalSemua)} />
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
              onClick={handleSimpan}
            >
              Simpan
            </Button>
          </DialogClose>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
