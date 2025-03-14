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


// ✅ Definisikan tipe FilterState

const DataTablePage = () => {
  // ✅ Gunakan tipe FilterState di useState
  const [selectedFiltersUnit, setSelectedFiltersUnit] = useState<FilterState>({
    periode: "rentang", // Default untuk "Unit Kerja"
    tahun: null,
    rentang: null,
    satker: null,
    unitKerja: null,
    pegawai: null,
    bulan: null,
  });
  
  const [selectedFiltersRekap, setSelectedFiltersRekap] = useState<FilterState>({
    periode: "tahunan", // Default untuk "Rekap Unit Kerja"
    tahun: null,
    rentang: null,
    satker: null,
    unitKerja: null,
    pegawai: null,
    bulan: null,
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
              <DataTableFilter setFilters={setSelectedFiltersUnit}/>
              {selectedFiltersUnit.periode === "rentang" ? (
                <RentangTable filters={selectedFiltersUnit} />
              ) : (
                <BulananTable filters={selectedFiltersUnit} />
              )}
            </TabsContent>
            <TabsContent value="rekap" className="space-y-4">
              <DataTableFilterRekap setFilters={setSelectedFiltersRekap}/>
              {selectedFiltersRekap.periode === "tahunan" ? (
                <RekapTahunanTable filters={selectedFiltersRekap} />
              ) : (
                // <BulananTable filters={selectedFiltersRekap} />
                <RekapTahunanTable filters={selectedFiltersRekap} />
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DataTablePage;
