"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdvancedTable from "./index";
import DataMitraBreadCrumbs from "./components/bread-crumbs";
import { useState } from "react";
import { tahun } from "@/lib/constants";
// import DraggableTable from "./draggable-table";

const DataTablePage = () => {
  const [filterState, setFilterState] = useState({
    tahun: tahun.find(t => t.value === "2025") ?? null,
    satker: null,
    program: null,
    kegiatan: null,
    output: null,
    suboutput: null,
    komponen: null,
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap mb-7">
        <div className="text-xl font-medium text-default-900 flex-1">
          Rekap Bendahara
        </div>
        <div className="flex-none">
          <DataMitraBreadCrumbs />
        </div>
      </div>

      {/* Advanced Table */}
      <Card>
        <CardContent className="pt-6">
          <AdvancedTable
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTablePage;
