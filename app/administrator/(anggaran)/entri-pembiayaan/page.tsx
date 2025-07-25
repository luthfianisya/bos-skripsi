"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdvancedTable from "./index";
import DataMitraBreadCrumbs from "./components/bread-crumbs";
// import DraggableTable from "./draggable-table";

const DataTablePage = () => {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap mb-7">
        <div className="text-xl font-medium text-default-900 flex-1">
          Entri Pembiayaan
        </div>
        <div className="flex-none">
          <DataMitraBreadCrumbs />
        </div>
      </div>

      {/* Advanced Table */}
      <Card>
        <CardContent className="pt-6">
          <AdvancedTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTablePage;
