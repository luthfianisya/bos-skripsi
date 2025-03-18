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
} from "@heroicons/react/24/solid";
import {
  ClockIcon,
} from "@heroicons/react/24/outline";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

type ApprovalStatus = "approved" | "pending" | "submit" | "rejected";


export enum TipeForm {
  TRANSLOK = "TRANSLOK",
  JLN = "JALAN",
  BHN = "BAHAN",
}

interface Form {
  noPermintaan: string;
  deskripsi: string;
  noSurat: string;
  pembuat: string;
  jumlahUsulan: number;
  tipeForm: TipeForm;
  approvals: {
    operator: ApprovalStatus;
    pj: ApprovalStatus;
    ppk: ApprovalStatus;
  };
}
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

const tipeFormOptions = [
  { label: "Translokasi", value: TipeForm.TRANSLOK },
  { label: "Jalan Dinas", value: TipeForm.JLN },
  { label: "Bahan", value: TipeForm.BHN },
];


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
      <span>{label}</span>
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
    cell: ({ row }) => <div>{row.getValue("deskripsi")}</div>,
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
    header: ({ column }) => (
      <div className="flex items-center justify-between">
        <DataTableColumnHeader column={column} title="TIPE FORM" />
      </div>
      ),
      cell: ({ row }) => <div>{row.getValue("tipeForm")}</div>,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue?.length) return true;
        return filterValue.includes(row.getValue(columnId));
      },
  },  
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
          <ApprovalBadge label="Operator" status={getNormalizedStatus(approvals.operator)} />
          <ApprovalBadge label="PJ" status={getNormalizedStatus(approvals.pj)} />
          <ApprovalBadge label="PPK" status={getNormalizedStatus(approvals.ppk)} />
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
      <DataTableColumnHeader column={column} title="AKSI" className="justify-center text-center"/>
    ),
    cell: () => (
      <div className="flex justify-end">
        <Button size="sm" variant="outline" className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4" />
          Riwayat
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

// Dummy data
export const dataForm: Form[] = [
  {
    noPermintaan: "POK-001/2025",
    deskripsi: "Pengadaan Laptop Lenovo ThinkPad X1 Carbon",
    noSurat: "001/IT/STIS/2025",
    pembuat: "Dian Sasmita",
    jumlahUsulan: 10,
    tipeForm: TipeForm.TRANSLOK,
    approvals: {
      operator: "approved",
      pj: "approved",
      ppk: "approved",
    },
  },
  {
    noPermintaan: "POK-002/2025",
    deskripsi: "Jasa Konsultan Pengembangan Website",
    noSurat: "002/IT/STIS/2025",
    pembuat: "Rian Pratama",
    jumlahUsulan: 1,
    tipeForm: TipeForm.BHN,
    approvals: {
      operator: "approved",
      pj: "submit",
      ppk: "pending",
    },
  },
  {
    noPermintaan: "POK-003/2025",
    deskripsi: "Honor Narasumber Workshop Data Science",
    noSurat: "003/IT/STIS/2025",
    pembuat: "Siti Aisyah",
    jumlahUsulan: 3,
    tipeForm: TipeForm.JLN,
    approvals: {
      operator: "approved",
      pj: "pending",
      ppk: "rejected",
    },
  },
];
