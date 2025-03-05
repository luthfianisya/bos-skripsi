"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdvancedTable from "./index";
import DataPegawaiBreadCrumbs from "./components/bread-crumbs";
// import DraggableTable from './draggable-table';

const DataTablePage = () => {

  return (
    <div className="space-y-5">
      {/* <Card>
        <CardHeader>
          <CardTitle>Basic</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <BasicDataTable />
        </CardContent>
      </Card> */}
      <div className="flex flex-wrap mb-7">
        <div className="text-xl font-medium text-default-900 flex-1">
          Data Pegawai
        </div>
        <div className="flex-none">
          <DataPegawaiBreadCrumbs />
        </div>
      </div>

      <Card>
        {/* <CardHeader>
          <CardTitle>Advanced Table</CardTitle>
        </CardHeader> */}
        <CardContent className="pt-6">
          <AdvancedTable />
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader>
          <CardTitle>Draggable Table</CardTitle>
        </CardHeader>
        <CardContent >
          <DraggableTable />
        </CardContent>
      </Card> */}

    </div>
  );
};

export default DataTablePage;
