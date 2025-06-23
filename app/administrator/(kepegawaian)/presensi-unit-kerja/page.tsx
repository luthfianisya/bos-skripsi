"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import RentangTable from "./index-rentang-khusus";
import BulananTable from "./index-bulanan";
import DataMitraBreadCrumbs from "./components/bread-crumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTableFilter from "./components/data-table-filter";
import { FilterState } from "./components/types";
import RekapTahunanTable from "./index-rekap-tahunan";
import DataTableFilterRekap from "./components/data-table-filter-rekap";
import RekapTahunanPegawaiTable from "./index-rekap-tahunan-pegawai";


// ✅ Definisikan tipe FilterState


const DataTablePage = () => {
  // ✅ Gunakan tipe FilterState di useState
  const [selectedFiltersUnit, setSelectedFiltersUnit] = useState<FilterState>({
    periode: "rentang",
    tahun: null,
    rentang: null, // TAMBAHKAN ini
    bulan: null,
    mode: null,
    satker: null,
    unitKerja: null,
    pegawai: null,
  });

  const [selectedFiltersRekap, setSelectedFiltersRekap] = useState<FilterState>({
    periode: "tahunan",
    tahun: null,
    rentang: null,
    bulan: null,
    mode: "unit_kerja", // default unit kerja
    satker: null,
    unitKerja: null,
    pegawai: null,
  });





  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap mb-7">
        <div className="text-xl font-medium text-default-900 flex-1">
          Presensi Unit Kerja
        </div>
        <div className="flex-none">
          <DataMitraBreadCrumbs />
        </div>
      </div>

      {/* Advanced Table */}
      <Card>
        <Tabs defaultValue="unitKerja">
          <CardContent className="pt-6">
            <TabsList className="mb-2">
              <TabsTrigger value="unitKerja" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Unit Kerja
              </TabsTrigger>
              <TabsTrigger value="rekap" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Rekap Unit Kerja
              </TabsTrigger>
            </TabsList>
            <TabsContent value="unitKerja" className="space-y-4">
              <DataTableFilter
                filters={selectedFiltersUnit}
                setFilters={setSelectedFiltersUnit}
              />
              {selectedFiltersUnit.periode === "rentang" ? (
                <RentangTable filters={selectedFiltersUnit} />
              ) : (
                <BulananTable filters={selectedFiltersUnit} />
              )}
            </TabsContent>
            <TabsContent value="rekap" className="space-y-4">
              <DataTableFilterRekap setFilters={setSelectedFiltersRekap} />

              {selectedFiltersRekap.periode === "tahunan" && selectedFiltersRekap.mode === "per_pegawai" ? (
                <RekapTahunanPegawaiTable filters={selectedFiltersRekap} />
              ) : selectedFiltersRekap.periode === "tahunan" && selectedFiltersRekap.mode === "unit_kerja" ? (
                <RekapTahunanTable filters={selectedFiltersRekap} />
              ) : selectedFiltersRekap.periode === "bulanan" ? (
                <RekapTahunanTable filters={selectedFiltersRekap} />
              ) : (
                <div className="text-muted-foreground text-center">
                  Pilih periode dan mode yang sesuai untuk melihat data rekap.
                </div>
              )}
            </TabsContent>

          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DataTablePage;
