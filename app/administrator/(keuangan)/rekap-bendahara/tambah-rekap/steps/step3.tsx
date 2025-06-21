import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PesertaTable from "../components/peserta-berangkat-table";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type BadgeColor = "secondary" | "default" | "success" | "destructive" | "info" | "warning" | "dark";

const StepPeserta = ({
  statusRekap,
  sppNomor,
  sppTanggal,
  spmNomor,
  spmTanggal,
  sp2dNomor,
  sp2dTanggal,
  setSppNomor,
  setSppTanggal,
  setSpmNomor,
  setSpmTanggal,
  setSp2dNomor,
  setSp2dTanggal,
  disabled,
}: {
  statusRekap: "direkap" | "spm" | "sp2d";
  sppNomor: string;
  sppTanggal: string;
  spmNomor: string;
  spmTanggal: string;
  sp2dNomor: string;
  sp2dTanggal: string;
  setSppNomor: (val: string) => void;
  setSppTanggal: (val: string) => void;
  setSpmNomor: (val: string) => void;
  setSpmTanggal: (val: string) => void;
  setSp2dNomor: (val: string) => void;
  setSp2dTanggal: (val: string) => void;
  disabled: boolean;
}) => {
  const badgeText = {
    direkap: "Direkap di Bendahara",
    spm: "Terbit SPM Clean",
    sp2d: "Terbit SP2D",
  }[statusRekap];

  const badgeColorMap = {
    direkap: "secondary",
    spm: "default",
    sp2d: "success",
  } as const;
  
  const badgeColor: BadgeColor = badgeColorMap[statusRekap];

  
  return (
    <>
      <div className="col-span-12">
        <div className="justify-between flex">
          <h4 className="text-lg font-semibold text-gray-800">SPP, SPM dan SP2D</h4>
          <Badge color={badgeColor} variant="outline" className="text-sm font-semibold py-1 rounded-full">
            {badgeText}
          </Badge>
        </div>
      </div>

      <div className="col-span-12 grid grid-cols-1 gap-4">
        {/* SPP */}
        <div className="flex items-center gap-4">
          <Label className="w-32">SPP</Label>
          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Nomor</Label>
              <Input value={sppNomor} onChange={(e) => setSppNomor(e.target.value)} disabled={disabled} />

            </div>
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Tanggal</Label>
              <Input type="date" value={sppTanggal} onChange={(e) => setSppTanggal(e.target.value)} disabled={disabled} />
            </div>
          </div>
        </div>

        {/* SPM */}
        <div className="flex items-center gap-4">
          <Label className="w-32">SPM</Label>
          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Nomor</Label>
              <Input
                value={spmNomor}
                onChange={(e) => setSpmNomor(e.target.value)}
                disabled={disabled || statusRekap === "direkap"}
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Tanggal</Label>
              <Input
                type="date"
                value={spmTanggal}
                onChange={(e) => setSpmTanggal(e.target.value)}
                disabled={disabled || statusRekap === "direkap"}
              />
            </div>
          </div>
        </div>

        {/* SP2D */}
        <div className="flex items-center gap-4">
          <Label className="w-32">SP2D</Label>
          <div className="flex flex-1 gap-6">
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Nomor</Label>
              <Input
                value={sp2dNomor}
                onChange={(e) => setSp2dNomor(e.target.value)}
                disabled={disabled || statusRekap !== "spm"}
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Label className="w-14">Tanggal</Label>
              <Input
                type="date"
                value={sp2dTanggal}
                onChange={(e) => setSp2dTanggal(e.target.value)}
                disabled={disabled || statusRekap !== "spm"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepPeserta;
