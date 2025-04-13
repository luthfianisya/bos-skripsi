"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdvancedTable from "./index";
import DataMitraBreadCrumbs from "./components/bread-crumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowUturnLeftIcon, PaperAirplaneIcon, PrinterIcon, XCircleIcon } from "@heroicons/react/24/solid";

const dummyData = {
  noPermintaan: "FP-2025-000001-00001-1",
  pok: "GG 5678 DEF 009 003 A 654321 9",
  prosesSpj: "Dalam Proses",
  booked: "Rp 500.000",
  keterangan: "Perjalanan Dinas Monitoring Data",
  nomorSurat: "B-099 88888/VS.777/03/2025",
  detailPok: "Translok pengumpulan data lapangan",
  volume: 4,
  realisasi: "Rp 450.000",
};

const DataTablePage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggleSubmit = () => {
    setIsSubmitted((prev) => !prev);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap mb-7">
        <div className="text-xl font-medium text-default-900 flex-1">
          Detail Translok
        </div>
        <div className="flex-none">
          <DataMitraBreadCrumbs />
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Detail {dummyData.noPermintaan}
          </CardTitle>
          <Badge color="default" className="text-sm font-semibold py-1 rounded-full">
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
            Realisasi FP-2025-000001-00001-1
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
          <AdvancedTable />
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
