"use client";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "./data-table-view-options";

// import { priorities, statuses } from "../data/data";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Table } from "@tanstack/react-table";
interface DataTableToolbarProps {
  table: Table<any>;
}
// export function DataTableToolbar({ table }: DataTableToolbarProps) {
//   const isFiltered = table.getState().columnFilters.length > 0;
//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     table.getColumn("nama")?.setFilterValue(value);
//   };
  // const statusColumn = table.getColumn("status");
  // const priorityColumn = table.getColumn("priority");

  export function DataTableToolbar({ table }: DataTableToolbarProps) {
    const globalFilter = table.getState().globalFilter as string;
  
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      table.setGlobalFilter(event.target.value);
    };
  
    return (
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 max-w-sm w-full">
          <Input
            placeholder="Cari pegawai berdasarkan nama, NIP, jabatan, dll..."
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
    );
  }
  

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
