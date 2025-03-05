import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps {
  column: Column<any, any>;
  title: string;
  className?: string;
}

export function DataTableColumnHeader({ column, title, className }: DataTableColumnHeaderProps) {
  const isSortable = column.id === "tanggal"; // Hanya kolom 'tanggal' yang bisa di-sort

  const handleSort = () => {
    if (!isSortable) return; // Jika bukan kolom 'tanggal', tidak melakukan sorting
    if (column.getIsSorted() === "asc") {
      column.toggleSorting(true); // Ubah ke Desc
    } else if (column.getIsSorted() === "desc") {
      column.clearSorting(); // Kembali ke default (tidak ada sorting)
    } else {
      column.toggleSorting(false); // Ubah ke Asc
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full select-none",
        isSortable ? "cursor-pointer" : "cursor-default", // Hanya kolom sortable yang bisa diklik
        className
      )}
      onClick={handleSort}
    >
      <span>{title}</span>
      {isSortable && column.getCanSort() && (
        <span className="ml-2">
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronsUpDown className="h-4 w-4" />
          )}
        </span>
      )}
    </div>
  );
}
