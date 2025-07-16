"use client"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import WelcomeBlock from "./components/welcome-block";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EcommerceStats from "./components/ecommerce-stats";
import PaguAwalRevisi from "./components/pagu-awal-revisi";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Select from "react-select";
import { Icon } from "@iconify/react";
import MonAnggaranWilayah from "./components/monitoring-anggaran-wilayah";
import MonBosSakti from "./components/monitoring-bos-sakti";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, MoreHorizontal } from "lucide-react";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { useState } from "react";
import ProjectList from "./components/monitoring-jenis";
import RekapitulasiPresensi from "./components/rekapitulasi-presensi";
import { satker, stylesFilter, tahun, wilayah } from "@/lib/constants";
import { TableCellsIcon } from "@heroicons/react/24/solid";

const prioritiesColorMap = {
  high: "destructive",
  medium: "warning",
  low: "info",
};

const BlankPage = () => {

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap mb-7">
        <div className="text-xl font-medium text-default-900 flex-1">
          Dashboard
        </div>
      </div>

      {/* Advanced Table */}
      <WelcomeBlock />

      <Card>
        <CardContent className="flex-1 p-4 w-full h-full">
          <div className="grid grid-cols-1 w-full gap-y-4">
            <div className="flex items-center gap-3">
              <label className="w-48 font-medium z-30">Tahun Anggaran</label>
              <Select
                className="react-select flex-1 z-30"
                classNamePrefix="select"
                placeholder="Pilih Tahun"
                styles={stylesFilter}
                options={tahun}
                defaultValue={tahun[0]}
                isClearable
                menuPortalTarget={document.body}
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="w-48 font-medium z-30">Wilayah</label>
              <Select
                className="react-select flex-1 z-30"
                classNamePrefix="select"
                placeholder="Pilih Wilayah"
                styles={stylesFilter}
                options={wilayah}
                defaultValue={wilayah[0]}
                isClearable
                menuPortalTarget={document.body}
              />
            </div>
            <div className="flex items-center gap-3">
              {/* Pastikan semua label memiliki lebar yang sama */}
              <label className="w-48 font-medium z-30">Satuan Kerja</label>
              <Select
                className="react-select flex-1 z-30"
                classNamePrefix="select"
                placeholder="Pilih Satuan Kerja"
                styles={stylesFilter}
                name="clear"
                options={[
                  { label: "Semua Satuan Kerja", value: "ALL" },
                  ...satker,
                ]}
                  defaultValue={{ label: "Semua Satuan Kerja", value: "ALL" }}
                isClearable
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="mb-0 border-none p-4 pb-0 flex-row flex-wrap items-center justify-between gap-4">
          <CardTitle className="whitespace-nowrap">Rekapitulasi Anggaran</CardTitle>
          <Button type="button" color="primary" variant="outline" size="sm" icon={TableCellsIcon}>
            Rincian
          </Button>
          {/* <div className="w-[150px]"> */}
          {/* <Select>
              <SelectTrigger size="md" className="text-default-500 bg-transparent dark:bg-transparent">
                <Icon icon="heroicons:calendar-days" className="w-4 h-4" />
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Jan 10,2024</SelectItem>
                <SelectItem value="11">Jan 11,2024</SelectItem>
                <SelectItem value="12">Jan 12,2024</SelectItem>
                <SelectItem value="13">Jan 13,2024</SelectItem>
              </SelectContent>
            </Select> */}
          {/* </div> */}
        </CardHeader>
        <CardContent className="flex justify-between gap-4 p-4">
          <PaguAwalRevisi />
          <div className="w-[2px] bg-gray-200 dark:bg-gray-500"></div>
          <EcommerceStats />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="mb-0 border-none p-4 pb-0 flex-row flex-wrap items-center justify-between gap-4">
          <CardTitle className="whitespace-nowrap">Monitoring Perbandingan Alokasi Anggaran</CardTitle>
          <Button type="button" color="primary" variant="outline" size="sm" icon={TableCellsIcon}>
            Rincian
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-4 w-full h-full">
          <MonAnggaranWilayah />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="mb-0 border-none p-4 pb-0 flex-row flex-wrap items-center justify-between gap-4">
          <CardTitle className="whitespace-nowrap">Monitoring Perbandingan Alokasi Anggaran</CardTitle>
          <Button type="button" color="primary" variant="outline" size="sm" icon={TableCellsIcon}>
            Rincian
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-4 w-full h-full">
          <MonBosSakti />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="mb-0 border-none p-4 pb-0 flex-row flex-wrap items-center justify-between gap-4">
          <CardTitle className="whitespace-nowrap">Rekapitulasi Presensi</CardTitle>
          <Button type="button" color="primary" variant="outline" size="sm" icon={TableCellsIcon}>
            Rincian
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-4 w-full h-full">
          <RekapitulasiPresensi />
        </CardContent>
      </Card>

      <ProjectList />

    </div>
  );
};

export default BlankPage;