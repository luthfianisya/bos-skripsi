import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
    color: "secondary",
    description: "Dokumen belum mulai diproses rekapnya.",
  },
  proses_rekap: {
    label: "Proses Rekap",
    color: "info",
    description: "Dokumen sedang dalam proses rekap.",
  },
  terbit_sp2d: {
    label: "Terbit SP2D",
    color: "success",
    description: "Dokumen sudah selesai dan SP2D telah terbit.",
  },
};

const StatusDokumenBadge = ({ status }: { status: DokumenStatus }) => {
  const { label, color, description } = dokumenStatusMap[status];

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Badge variant="outline" color={color}>
          {label}
        </Badge>
        <Tooltip>
          <TooltipTrigger asChild>
            <InformationCircleIcon className="w-4 h-4 text-muted-foreground cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent side="top" className="p-2 rounded shadow text-sm" color="secondary">
            <table className="min-w-[200px]">
              <tbody>
                <tr className="py-1.5">
                  <td className="font-semibold pr-2 py-1.5">SPP</td>
                  <td className="pr-2 py-1.5">00037T</td>
                  <td className="text-gray-500 py-1.5">2024-03-19</td>
                </tr>
                <tr className="py-1.5">
                  <td className="font-semibold pr-2 py-1.5">SPM</td>
                  <td className="pr-2 py-1.5">00037A</td>
                  <td className="text-gray-500 py-1.5">2024-03-19</td>
                </tr>
                <tr className="py-1.5">
                  <td className="font-semibold pr-2 py-1.5">SP2D</td>
                  <td className="pr-2 py-1.5">240191301009803</td>
                  <td className="text-gray-500 py-1.5">2024-03-19</td>
                </tr>
              </tbody>
            </table>
          </TooltipContent>

        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default StatusDokumenBadge;
