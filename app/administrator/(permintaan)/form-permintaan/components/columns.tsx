"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  PaperAirplaneIcon,
  MinusCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
  PrinterIcon,
  ArrowUpOnSquareIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon
} from "@heroicons/react/24/solid";
import {
  ClockIcon,
} from "@heroicons/react/24/outline";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Icon } from "leaflet";
import { Icon } from "@iconify/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRef, useState, useEffect } from "react";
import { TIPE_FORM_MAP } from "@/lib/constants";
import { ApprovalStatus } from "@/lib/type";
import { Form } from "@/lib/interface";

// type ApprovalStatus = "approved" | "pending" | "submit" | "rejected";


// export enum TipeForm {
//   JLN = "FORM - JLN",
//   NONOPR = "FORM - NON OPR",
//   BHN = "FORM - BAHAN",
//   PERSEDIAAN = "FORM - PERSEDIAAN",
//   PMLH = "FORM - PEMELIHARAAN",
//   MDL = "FORM - MODAL",
//   SEWA = "FORM - SEWA",
//   JS_KONSLTN = "FORM - JASA KONSULTAN",
//   JS = "FORM - JASA PROFESI",
//   UPH = "FORM - HONOR",
//   FD_HD = "FORM - FULLDAY/HALFDAY",
//   KONSI_DK = "FORM - FULLBOARD DALAM KOTA",
//   KONSI_LK = "FORM - FULLBOARD LUAR KOTA",
//   TRANSLOK = "FORM - TRANSLOK",
//   JS_LAINNYA = "FORM - JASA LAINNYA",
//   KPRL_KANTOR = "FORM - PERKANTORAN",
//   PLT = "FORM - PAKET MEETING LAINNYA",
//   OPR = "FORM - OPERASIONAL",
//   LANGGANAN = "FORM - BELANJA LANGGANAN",
//   LEMBUR = "FORM - LEMBUR",
//   PENGHASILAN = "FORM - PENGHASILAN",
// }

// export interface Form {
//   noPermintaan: string;
//   deskripsi: string;
//   noSurat: string;
//   pembuat: string;
//   jumlahUsulan: number;
//   tipeForm: TipeForm;
//   approvals: {
//     operator: ApprovalStatus;
//     pj: ApprovalStatus;
//     ppk: ApprovalStatus;
//   };
// }

const EllipsisTooltip = ({ children }: { children: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight);
    }
  }, [children]);

  const content = (
    <div
      ref={ref}
      className="max-w-[300px] line-clamp-2 text-ellipsis overflow-hidden cursor-default"
    >
      {children}
    </div>
  );

  if (!isTruncated) return content;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const approvalStatuses: ApprovalStatus[] = ["approved", "submit", "rejected", "pending"];

const approvalRoles = ["operator", "pj", "ppk"] as const;
type ApprovalRole = typeof approvalRoles[number];

const approvalFilterOptions = approvalRoles.flatMap((role) => {
  return approvalStatuses.map((status) => {
    const statusLabel = status === "pending" ? "Belum Ada" : capitalize(status);
    const roleLabel = role.toUpperCase();

    return {
      label: `${roleLabel} ${statusLabel}`,
      value: `${role}-${status}`, // contoh: ppk-approved
    };
  });
});

const getNormalizedStatus = (status: ApprovalStatus | undefined): ApprovalStatus => {
  return status ?? "pending"; // undefined dianggap pending
};

// const tipeFormOptions = Object.entries(TipeForm).map(([key, value]) => ({
//   label: value,
//   value: value,
// }));


// Function buat mapping badge props berdasarkan status
const getBadgeProps = (status: ApprovalStatus): {
  color: "success" | "destructive" | "secondary" | "default" | "info" | "warning" | "dark";
  variant: "outline" | "soft";
} => {
  switch (status) {
    case "approved":
      return {
        color: "success", // Hijau
        variant: "outline",
      };
    case "submit":
      return {
        color: "info", // Biru (anggap sebagai primary)
        variant: "outline",
      };
    case "rejected":
      return {
        color: "destructive", // Merah
        variant: "outline",
      };
    default:
      return {
        color: "secondary", // Abu-abu buat undefined/null
        variant: "outline",
      };
  }
};

// Komponen ApprovalBadge
const ApprovalBadge = ({
  label,
  status,
}: {
  label: string;
  status: ApprovalStatus;
}) => {
  const { variant, color } = getBadgeProps(status);

  const getIcon = (status: ApprovalStatus) => {
    switch (status) {
      case "approved":
        return <CheckCircleIcon className="w-4 h-4 mr-1 text-green-600" />;
      case "submit":
        return <PaperAirplaneIcon className="w-4 h-4 mr-1 text-blue-600" />;
      case "rejected":
        return <ExclamationCircleIcon className="w-4 h-4 mr-1 text-red-600" />;
      default:
        return <MinusCircleIcon className="w-4 h-4 mr-1 text-gray-500" />;
    }
  };

  return (
    <Badge color={color} variant={variant} className="flex items-center gap-1">
      {getIcon(status)}
      <span>
        {label === "pj" || label === "ppk"
          ? label.toUpperCase()
          : label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
      </span>
    </Badge>
  );
};

// Tabel Kolom
export const columns: ColumnDef<Form>[] = [
  {
    accessorKey: "noPermintaan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NOMOR PERMINTAAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("noPermintaan")}</div>,
  },
  {
    accessorKey: "deskripsi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DESKRIPSI" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("deskripsi") as string;
      return <EllipsisTooltip>{value}</EllipsisTooltip>;
    },
  },
  {
    accessorKey: "noSurat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NOMOR SURAT" />
    ),
    cell: ({ row }) => <div>{row.getValue("noSurat")}</div>,
  },
  {
    accessorKey: "tipeForm",
    header: ({ column }) => <DataTableColumnHeader column={column} title="TIPE FORM" />,
    cell: ({ row }) => {
      const tipeFormKey = row.getValue("tipeForm") as string;
      const tipeFormData = TIPE_FORM_MAP[tipeFormKey];
      return <div>{tipeFormData ? tipeFormData.code : tipeFormKey}</div>;
    },
    
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(columnId));
    },
  },
  
  // {
  //   accessorKey: "tipeForm",
  //   header: ({ column }) => (
  //     <div className="flex items-center justify-between">
  //       <DataTableColumnHeader column={column} title="TIPE FORM" />
  //     </div>
  //     ),
  //     cell: ({ row }) => {
  //       const fullLabel = row.getValue("tipeForm") as string;
  //       const shortLabel = Object.entries(TipeForm).find(
  //         ([_, value]) => value === fullLabel
  //       )?.[0]; // Ambil key-nya, misalnya JLN dari "FORM - JLN"

  //       return <div>{shortLabel}</div>;
  //     },
  //     filterFn: (row, columnId, filterValue) => {
  //       if (!filterValue?.length) return true;
  //       return filterValue.includes(row.getValue(columnId));
  //     },
  // },  
  {
    accessorKey: "pembuat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DIBUAT OLEH" />
    ),
    cell: ({ row }) => <div>{row.getValue("pembuat")}</div>,
  },
  {
    accessorKey: "jumlahUsulan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JUMLAH USULAN" />
    ),
    cell: ({ row }) => <div>{row.getValue("jumlahUsulan")}</div>,
  },
  {
    accessorKey: "approvals",
    header: ({ column }) => (
      <div className="flex justify-between items-center">
        <DataTableColumnHeader
          column={column}
          title="STATUS"
          className="justify-center text-center"
        />
      </div>
    ),
    cell: ({ row }) => {
      const approvals = row.original.approvals;

      return (
        <div className="flex gap-2 justify-center">
          {(["operator", "pj", "ppk"] as ApprovalRole[]).map((role) => {
            const status = getNormalizedStatus(approvals[role]);
            const displayLabel = role === "pj" || role === "ppk"
              ? role.toUpperCase()
              : role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

              const tooltipText =
              status === "pending"
                ? role === "operator"
                  ? "Operator entri"
                  : `${displayLabel} belum ada`
                : `${displayLabel} ${status}`;            


            return (
              <TooltipProvider key={role}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ApprovalBadge label={role} status={status} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="z-50" color="secondary">
                    {tooltipText}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      );
    },
    filterFn: (
      row: { original: { approvals: Record<ApprovalRole, ApprovalStatus> } },
      columnId: string,
      filterValues: string[]
    ) => {
      if (!filterValues?.length) return true;

      const approvals = row.original.approvals;

      // ✅ AND Logic: semua filter harus match
      return filterValues.every((filter: string) => {
        const [role, status] = filter.split("-") as [ApprovalRole, ApprovalStatus];

        const approvalStatus = getNormalizedStatus(approvals[role]);
        return approvalStatus === status;
      });
    }
  },
  {
    accessorKey: "aksi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AKSI" className="justify-center text-center" />
    ),
    cell: () => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="soft"
              className="h-7 w-7"
              color="primary"
              icon={EllipsisHorizontalIcon}
            >
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[248px]" align="end" avoidCollisions>
            <DropdownMenuLabel className="text-default-950">
              Aksi
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 text-default-600 focus:bg-yellow-50 focus:text-yellow-600 cursor-pointer">
              <DocumentTextIcon className="w-5 h-5 text-yellow-500" />
              <p className="text-sm">Detail Permintaan</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 text-default-600 focus:bg-primary-50 focus:text-primary-600 cursor-pointer">
              <DocumentDuplicateIcon className="w-5 h-5 text-primary-700" />
              <p className="text-sm">Duplikat Permintaan</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 text-default-600 focus:bg-primary-50 focus:text-primary-600 cursor-pointer">
              <ArrowUpOnSquareIcon className="w-5 h-5 text-primary-700" />
              <p className="text-sm">Upload Ulang Attachment</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 text-default-600 focus:bg-primary-50 focus:text-primary-600 cursor-pointer">
              <PrinterIcon className="w-5 h-5 text-primary-700" />
              <p className="text-sm">Print Permintaan</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 text-default-600 focus:bg-red-50 focus:text-red-600 cursor-pointer">
              <TrashIcon className="w-5 h-5 text-red-600" />
              <p className="text-sm">Hapus Permintaan</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

// // Dummy data
// export const dataForm: Form[] = [
//   {
//     noPermintaan: "POK-001/2025",
//     deskripsi: "Pengadaan Laptop Lenovo ThinkPad X1 Carbon",
//     noSurat: "001/IT/STIS/2025",
//     pembuat: "Dian Sasmita",
//     jumlahUsulan: 10,
//     tipeForm: TipeForm.TRANSLOK,
//     approvals: {
//       operator: "approved",
//       pj: "approved",
//       ppk: "approved",
//     },
//   },
//   {
//     noPermintaan: "POK-002/2025",
//     deskripsi: "Jasa Konsultan Pengembangan Website",
//     noSurat: "002/IT/STIS/2025",
//     pembuat: "Rian Pratama",
//     jumlahUsulan: 1,
//     tipeForm: TipeForm.BHN,
//     approvals: {
//       operator: "approved",
//       pj: "submit",
//       ppk: "pending",
//     },
//   },
//   {
//     noPermintaan: "POK-003/2025",
//     deskripsi: "Honor Narasumber Workshop Data Science",
//     noSurat: "003/IT/STIS/2025",
//     pembuat: "Siti Aisyah",
//     jumlahUsulan: 3,
//     tipeForm: TipeForm.JLN,
//     approvals: {
//       operator: "approved",
//       pj: "pending",
//       ppk: "rejected",
//     },
//   },
// ];
