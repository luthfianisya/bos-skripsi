import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps {
  column: Column<any, any>;
  title: string;
  className?: string;
}

export function DataTableColumnHeader({ column, title, className }: DataTableColumnHeaderProps) {
  const handleSort = () => {
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
      className={cn("flex items-center justify-between w-full cursor-pointer select-none", className)}
      onClick={handleSort}
    >
      <span>{title}</span>
      {column.getCanSort() && (
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
