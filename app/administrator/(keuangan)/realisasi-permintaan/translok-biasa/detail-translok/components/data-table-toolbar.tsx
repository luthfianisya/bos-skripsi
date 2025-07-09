"use client";
import { X } from "lucide-react";
import * as Icon from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "./data-table-view-options";
import Importb from "@/components/svg/duel-tone/document-arrow-up.svg";
import Refresh from "@/components/svg/duel-tone/arrow-path.svg";
// import { priorities, statuses } from "../data/data";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { PrinterIcon } from "@heroicons/react/24/solid";
// import VStepFormPembiayaan from "./import-pembiayaan/import-pembiayaan";
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
            placeholder="Cari cari data realisasi permintaan..."
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
        {/* <Button type="button" color="primary" variant="outline" size="md" icon={PrinterIcon}>
          Cetak SPJ
        </Button> */}
        {/* <VStepFormPembiayaan/> */}
      </div>
    </div>

  );
}