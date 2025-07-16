import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface RowData {
  asal: string;
  tujuan: string;
  pergi: {
    tanggal: string;
    kendaraan: string;
  };
  pulang: {
    tanggal: string;
    kendaraan: string;
  };
}

export const columns = (isBlokTranslokActive: boolean): ColumnDef<any>[] => [
  {
    accessorKey: "asal",
    header: "Asal",
    cell: ({ row }) => row.getValue("asal"),
  },
  {
    accessorKey: "tujuan",
    header: "Tujuan",
    cell: ({ row }) => row.getValue("tujuan"),
  },
  {
    accessorKey: "pergi",
    header: "Pergi",
    cell: ({ row }) => {
      const [isEdit, setIsEdit] = useState(false);
      const [tanggal, setTanggal] = useState(row.original.pergi.tanggal || "");
      const [kendaraan, setKendaraan] = useState(row.original.pergi.kendaraan || "");

      return (
        <div className="flex items-center gap-2 min-w-[150px]">
          {isEdit ? (
            <>
              <div className="flex flex-col gap-1 flex-1">
                <Input
                  type="date"
                  className="w-full"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                />
                <Select value={kendaraan} onValueChange={setKendaraan}>
                  <SelectTrigger className="input input-sm border rounded px-2">
                    <SelectValue placeholder="Pilih Kendaraan" />
                  </SelectTrigger>
                  <SelectContent className="z-[9999]">
                    <SelectItem value="Pesawat">Pesawat</SelectItem>
                    <SelectItem value="Kereta">Kereta</SelectItem>
                    <SelectItem value="Mobil">Mobil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsEdit(false)} className="mt-1">
                <SaveIcon className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-sm">{tanggal || "-"}</p>
                <p className="text-sm text-muted-foreground">{kendaraan || "-"}</p>
              </div>
              {!isBlokTranslokActive && (
                <Button variant="ghost" size="icon" onClick={() => setIsEdit(true)} className="mt-1">
                  <PencilSquareIcon className="h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "pulang",
    header: "Pulang",
    cell: ({ row }) => {
      const [isEdit, setIsEdit] = useState(false);
      const [tanggal, setTanggal] = useState(row.original.pulang.tanggal || "");
      const [kendaraan, setKendaraan] = useState(row.original.pulang.kendaraan || "");

      return (
        <div className="flex items-center gap-2 min-w-[150px]">
          {isEdit ? (
            <>
              <div className="flex flex-col gap-1 flex-1">
                <Input
                  type="date"
                  className="w-full"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                />
                <Select value={kendaraan} onValueChange={setKendaraan}>
                  <SelectTrigger className="input input-sm border rounded px-2">
                    <SelectValue placeholder="Pilih Kendaraan" />
                  </SelectTrigger>
                  <SelectContent className="z-[9999]">
                    <SelectItem value="Pesawat">Pesawat</SelectItem>
                    <SelectItem value="Kereta">Kereta</SelectItem>
                    <SelectItem value="Mobil">Mobil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsEdit(false)} className="mt-1">
                <SaveIcon className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-sm">{tanggal || "-"}</p>
                <p className="text-sm text-muted-foreground">{kendaraan || "-"}</p>
              </div>
              {!isBlokTranslokActive && (
                <Button variant="ghost" size="icon" onClick={() => setIsEdit(true)} className="mt-1">
                  <PencilSquareIcon className="h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </div>
      );
    },
  },
];

export const data: RowData[] = [
  {
    asal: "Depok",
    tujuan: "Depok",
    pergi: {
      tanggal: "2025-07-15",
      kendaraan: "Kendaraan Umum",
    },
    pulang: {
      tanggal: "2025-07-15",
      kendaraan: "Kendaraan Umum",
    },
  },
];
