"use client";

import React, { useState } from "react";
import AdvancedTable from "../components/pok-table";
import POKTerpilihTable from "../components/pok-terpilih-table";
import PesertaTable from "../components/peserta-berangkat-table";
import PerGrupPOKTable from "../components/per-grup-pok-table"; // Pastikan file ini ada
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StepPOK = () => {
  const [activeTab, setActiveTab] = useState("rincian");

  return (
    <>
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Pilih Form POK</h4>
        <p className="mt-1 text-sm text-gray-500">Pilih data Form POK yang sesuai untuk rekap ini.</p>
      </div>

      <div className="col-span-12">
        <AdvancedTable />
      </div>

      <div className="col-span-12 pt-6">
        <h4 className="text-lg font-semibold text-gray-800">Preview Data POK Terpilih</h4>
      </div>

      <div className="col-span-12">
        <POKTerpilihTable />
      </div>

      <div className="col-span-12 pt-6">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-gray-800">Rincian Rekapitulasi</h4>
          <Tabs
            defaultValue="rincian"
            value={activeTab}
            onValueChange={(val) => setActiveTab(val)}
          >
            <TabsList>
              <TabsTrigger value="rincian" className="data-[state=active]:bg-blue-700 data-[state=active]:text-primary-foreground">Rincian Peserta</TabsTrigger>
              <TabsTrigger value="pergrup" className="data-[state=active]:bg-blue-700 data-[state=active]:text-primary-foreground">Per Grup POK</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="col-span-12">
        {activeTab === "rincian" && <PesertaTable />}
        {activeTab === "pergrup" && <PerGrupPOKTable />}
      </div>
    </>
  );
};

export default StepPOK;
