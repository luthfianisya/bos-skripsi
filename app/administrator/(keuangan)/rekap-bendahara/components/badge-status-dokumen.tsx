import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { STATUS_DOKUMEN_MAP } from "@/lib/constants";

// Daftar warna & deskripsi status dokumen
const badgeStatusMap: Record<
  string,
  {
    color: "secondary" | "info" | "success" | "warning" | "destructive";
    description: string;
  }
> = {
  belum_direkap: {
    color: "secondary",
    description: "Dokumen belum mulai diproses rekapnya.",
  },
  proses_rekap: {
    color: "info",
    description: "Dokumen sedang dalam proses rekap.",
  },
  terbit_sp2d: {
    color: "success",
    description: "Dokumen sudah selesai dan SP2D telah terbit.",
  },
  direkap_bendahara: {
    color: "info",
    description: "Sudah direkap oleh bendahara.",
  },
  dikirim_verifikasi: {
    color: "info",
    description: "Dikirim ke tim verifikasi.",
  },
  dikembalikan_bendahara: {
    color: "warning",
    description: "Dikembalikan ke bendahara untuk revisi.",
  },
  terbit_spm_clean: {
    color: "success",
    description: "SPM terbit tanpa catatan.",
  },
  terbit_spm_catatan: {
    color: "warning",
    description: "SPM terbit dengan catatan.",
  },
  dibatalkan_spp: {
    color: "destructive",
    description: "SPP dibatalkan/diganti.",
  },
  dikirim_admin: {
    color: "info",
    description: "Dikirim ke admin verifikasi.",
  },
};

const StatusDokumenBadge = ({ status }: { status: string }) => {
  const label = STATUS_DOKUMEN_MAP[status] || status;
  const { color = "secondary", description = "-" } = badgeStatusMap[status] || {};

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 justify-center">
        {/* Tooltip di badge: menampilkan deskripsi */}
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Badge variant="outline" color={color} className="cursor-default">
                {label}
              </Badge>
            </span>
          </TooltipTrigger>

          <TooltipContent side="top" className="p-2 rounded shadow text-sm" color="secondary">
            {description}
          </TooltipContent>
        </Tooltip>

        {/* Tooltip di ikon: menampilkan tabel */}
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
