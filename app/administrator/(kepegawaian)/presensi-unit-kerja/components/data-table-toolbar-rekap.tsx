"use client";
import { X, Plus, Printer, Info, ArrowDownCircleIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "./data-table-view-options";
import Importb from "@/components/svg/duel-tone/document-arrow-up.svg";
import Refresh from "@/components/svg/duel-tone/arrow-path.svg";
// import { priorities, statuses } from "../data/data";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import KetKode from "./keterangan-kode/keterangan-kode";

interface DataTableToolbarProps {
  table: Table<any>;
}
export function DataTableToolbar({ table }: DataTableToolbarProps) {
  const globalFilter = table.getState().globalFilter as string;

  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(event.target.value);
  };

  const handleSheetOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleRefresh = () => {
    table.resetRowSelection(); // Reset selected rows
    table.resetSorting(); // Reset sorting
    table.resetColumnFilters(); // Reset filters
    table.setGlobalFilter(""); // Reset global search
  };
  
  // const statusColumn = table.getColumn("status");
  // const priorityColumn = table.getColumn("priority");

  return (
    <div className="flex w-full justify-between items-center gap-4">
      {/* Container kiri */}
      <div className="flex flex-1 items-center gap-2">
        {/* Tombol Refresh (di luar max-w-sm) */}
        <Button
  type="button"
  color="primary"
  variant="outline"
  size="md"
  icon={Refresh}
  onClick={handleRefresh}
>
  Refresh
</Button>


        {/* Container kecil untuk Search & Reset (max-w-sm) */}
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Input
            placeholder="Cari presensi unit kerja..."
            value={globalFilter || ""}
            onChange={handleFilterChange}
            className="h-9 flex-1"
          />
          {globalFilter && (
            <Button
              variant="outline"
              onClick={() => table.setGlobalFilter("")}
              className="h-9 px-2 lg:px-3"
            >
              Reset
              <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            </Button>
          )}
        </div>  
      </div>

      {/* Container kanan: Semua tombol di kanan */}
      <div className="flex items-center gap-2">
      {/* <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="md">
        Pilih Aksi
        <ChevronDown className="h-4 w-4 ml-2" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => console.log("Export")}>Export Data</DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Import")}>Import Data</DropdownMenuItem>
      <DropdownMenuItem onClick={() => console.log("Lihat Statistik")}>Lihat Statistik</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu> */}
   
        <KetKode/>
             <Button
          type="button"
          color="primary"
          variant="outline"
          size="md"
          icon={Refresh}
        >
          Rekap Ulang
        </Button>
        <Button type="button" color="primary" size="md" icon={Printer} onClick={handleSheetOpen}>
          Cetak Presensi
        </Button>
      </div>
    </div>
    
    

  );
}

{/* <Input
        placeholder="Cari data mitra/PPNPN..."
        value={table.getColumn("title")?.getFilterValue() as string || ""}
        onChange={handleFilterChange}
        className="h-9 min-w-[200px] max-w-sm"
      /> */}

      {/* {statusColumn && (
        <DataTableFacetedFilter
          column={statusColumn}
          title="Status"
          options={statuses}
        />
      )}
      {priorityColumn && (
        <DataTableFacetedFilter
          column={priorityColumn}
          title="Priority"
          options={priorities}
        />
      )}
      {isFiltered && (
        <Button
          variant="outline"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
        </Button>
      )} */}
      {/* <DataTableViewOptions table={table} /> */}
