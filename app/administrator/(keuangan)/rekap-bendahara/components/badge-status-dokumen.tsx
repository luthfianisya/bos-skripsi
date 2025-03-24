import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

type DokumenStatus = "belum_direkap" | "proses_rekap" | "terbit_sp2d";

const dokumenStatusMap: Record<
  DokumenStatus,
  {
    label: string;
    color: "secondary" | "info" | "success";
    description: string;
  }
> = {
  belum_direkap: {
    label: "Belum Direkap",
    color: "secondary", // gray
    description: "Dokumen belum mulai diproses rekapnya.",
  },
  proses_rekap: {
    label: "Proses Rekap",
    color: "info", // biru
    description: "Dokumen sedang dalam proses rekap.",
  },
  terbit_sp2d: {
    label: "Terbit SP2D",
    color: "success", // hijau
    description: "Dokumen sudah selesai dan SP2D telah terbit.",
  },
};

const StatusDokumenBadge = ({ status }: { status: DokumenStatus }) => {
  const { label, color, description } = dokumenStatusMap[status];

  return (
    <div className="flex items-center gap-1">
      <Badge variant="outline" color={color}>
        {label}
      </Badge>
      <Popover>
        <PopoverTrigger asChild>
          <InformationCircleIcon className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="w-64 text-sm">{description}</PopoverContent>
      </Popover>
    </div>
  );
};

export default StatusDokumenBadge;
