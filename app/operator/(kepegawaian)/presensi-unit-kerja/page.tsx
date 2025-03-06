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


// ✅ Definisikan tipe FilterState

const DataTablePage = () => {
  // ✅ Gunakan tipe FilterState di useState
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    periode: "rentang",
    tahun: null,
    rentang: null,
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
              <TabsTrigger value="password" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Rekap Unit Kerja
              </TabsTrigger>
            </TabsList>
            <TabsContent value="unitKerja" className="space-y-4">
              <DataTableFilter setFilters={setSelectedFilters}/>
              {selectedFilters.periode === "rentang" ? (
                <RentangTable filters={selectedFilters} />
              ) : (
                <BulananTable filters={selectedFilters} />
              )}
            </TabsContent>
            <TabsContent value="password">
              <p>Isi untuk Rekap Unit Kerja</p>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DataTablePage;
