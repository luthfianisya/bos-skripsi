"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdvancedTable from "./index";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowUturnLeftIcon, PaperAirplaneIcon, PrinterIcon, } from "@heroicons/react/24/solid";
import DetailTranslokBreadCrumbs from "./components/bread-crumbs";
import { Realisasi } from "./components/columns";

const dummyData = {
  noPermintaan: "FP-2025-539170-92800-225",
  pok: "GG 2899 BMA 006 005 A 524113 5",
  prosesSpj: "Belum Proses",
  booked: "Rp 170.000",
  keterangan: "Translok Survei Khusus Neraca Produksi (SKNP) 2025",
  nomorSurat: "B-571/32760/VS.350/2025",
  detailPok: "Translok petugas pemeriksaan lapangan survei khusus neraca produksi",
  volume: 1,
  realisasi: "Rp 0",
};

const DataTablePage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggleSubmit = () => {
    setIsSubmitted((prev) => !prev);
  };

  const [dataTabel, setDataTabel] = useState<Realisasi[]>([
  {
    nip: "198712312019031001",
    nama: "Agus Saputra",
    translok: "BELUM",
    berangkat: "ya",
    booked: 170000,
    realisasi: 0,
    statusSpj: "Belum Proses",
  },
]);


  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap mb-7">
        <div className="text-xl font-medium text-default-900 flex-1">
          Detail Translok
        </div>
        <div className="flex-none">
          <DetailTranslokBreadCrumbs />
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Detail {dummyData.noPermintaan}
          </CardTitle>
          <Badge color="default" variant="outline" className="text-sm font-semibold py-1 rounded-full">
            SPJ {dummyData.prosesSpj}
          </Badge>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Info label="Nomor Permintaan" value={dummyData.noPermintaan} />
            <Info label="Nomor Surat" value={dummyData.nomorSurat} />
            <Info label="POK" value={dummyData.pok} />

            <Info label="Detail POK" value={dummyData.detailPok} />
            <Info label="Keterangan" value={dummyData.keterangan} />
            <Info label="Volume" value={`${dummyData.volume}`} />
            <Info label="Booked" value={dummyData.booked} />
            <Info label="Realisasi" value={dummyData.realisasi} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Realisasi {dummyData.noPermintaan}
          </CardTitle>
          <div className="flex gap-2">
            <Button type="button" color="primary" variant="outline" size="md" icon={PrinterIcon}>
              Cetak SPJ
            </Button>
            <Button
              onClick={handleToggleSubmit}
              color={isSubmitted ? "destructive" : "primary"}
              className="gap-2"
              size="md"
            >
              {isSubmitted ? (
                <>
                  <ArrowUturnLeftIcon className="w-4 h-4" />
                  Batal Kirim
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-4 h-4" />
                  Kirim Translok
                </>
              )}
            </Button>
          </div>

        </CardHeader>

        <CardContent>
          <AdvancedTable data={dataTabel} />
        </CardContent>
      </Card>
    </div>
  );
};

// Reusable Info component
const Info = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) => (
  <div className="flex items-center gap-2">
    <p className="w-36 text-sm font-medium">{label}</p>
    <div className="text-sm text-muted-foreground flex-1">
      : {children ?? value}
    </div>
  </div>
);

export default DataTablePage;
