"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdvancedTable from "./index-rentang-khusus";
import DataMitraBreadCrumbs from "./components/bread-crumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DataTablePage = () => {
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
              <TabsTrigger value="unitKerja" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Unit Kerja</TabsTrigger>
              <TabsTrigger value="password" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ">Rekap Unit Kerja</TabsTrigger>
            </TabsList>
            <TabsContent value="unitKerja">
              <AdvancedTable />
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
