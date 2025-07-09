"use client";
import { X, Plus, PlusCircleIcon, PrinterIcon } from "lucide-react";
import * as Icon from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Importb from "@/components/svg/duel-tone/document-arrow-up.svg";
import Refresh from "@/components/svg/duel-tone/arrow-path.svg";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { TipeForm } from "./columns"
import Link from "next/link";
import TambahRekapDialog from "../../tambah-rekap/vstep-form-dialog";

// import TambahRekap from "./tambah-rekap/tambah-rekap";

const tipeFormOptions = [
  { label: "Translokasi", value: TipeForm.TRANSLOK }, // "TRANSLOK"
  { label: "Jalan Dinas", value: TipeForm.JLN },      // "JALAN"
  { label: "Bahan", value: TipeForm.BHN },            // "BAHAN"
];

// Approval data
const approvalRoles = ["operator", "pj", "ppk"] as const;
type ApprovalRole = typeof approvalRoles[number];

const approvalStatuses = ["approved", "submit", "rejected", "pending"] as const;
type ApprovalStatus = typeof approvalStatuses[number];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const approvalFilterOptions = approvalRoles.flatMap((role) => {
  return approvalStatuses.map((status) => {
    const statusLabel = status === "pending" ? "Belum Ada" : capitalize(status);
    const roleLabel = role.toUpperCase();

    return {
      label: `${roleLabel} ${statusLabel}`,
      value: `${role}-${status}`,
    };
  });
});

interface DataTableToolbarProps {
  table: Table<any>;
}
export function DataTableToolbar({ table }: DataTableToolbarProps) {
  const globalFilter = table.getState().globalFilter as string;
  const isFiltered = table.getState().columnFilters.length > 0;

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

  // const approvalsColumn = table.getColumn("approvals");
  // const tipeFormColumn = table.getColumn("tipeForm");

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
            placeholder="Cari data rekap bendahara..."
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
          Cetak POK
        </Button> */}
        {/* <DataTableViewOptions table={table} /> */}
        {/* {tipeFormColumn && (
          <DataTableFacetedFilter
            column={tipeFormColumn}
            title="Filter Tipe Form"
            options={tipeFormOptions}
          />
        )}
        {approvalsColumn && (
          <DataTableFacetedFilter
            column={approvalsColumn}
            title="Filter Status"
            options={approvalFilterOptions}
          />
        )} */}
        {/* <Button type="button" color="primary" size="md" icon={Plus} onClick={handleSheetOpen}>
          Tambah Rekap
        </Button> */}
        {/* <TambahRekap/> */}
        {/* <Link href="/administrator/rekap-bendahara/tambah-rekap">
                <Button
                  color="primary" size="md" icon={Plus}
                >
                  Tambah Rekap
                </Button>
                </Link> */}
                <TambahRekapDialog/>
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
{/* <DataTableViewOptions table={table} /> */ }
