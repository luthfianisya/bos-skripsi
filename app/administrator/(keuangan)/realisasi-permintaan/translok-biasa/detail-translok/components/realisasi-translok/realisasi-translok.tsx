"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BanknotesIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import AdvancedTable from "./components";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";

// Helper format rupiah
const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

// Badge mapping
const spjStatusMap: Record<string, { color: "secondary" | "success" | "default" | "destructive" | "info" | "warning" | "dark" | undefined; variant: "outline" }> = {
    "Belum Proses": { color: "secondary", variant: "outline" },
    "Dalam Proses": { color: "default", variant: "outline" },
    "Selesai": { color: "success", variant: "outline" },
};

const presensiStatusMap: Record<string, { color: "secondary" | "success" | "default" | "destructive" | "info" | "warning" | "dark" | undefined }> = {
    "TIDAK BLOK": { color: "secondary" },
    "BLOK": { color: "default" },
};


const RealisasiTranslok = () => {
    const [open, setOpen] = useState(false);

    const tanggalPergi = new Date();
    const tanggalPulang = new Date();
    const lamaHari = 3;
    const [isBlokTranslokActive, setIsBlokTranslokActive] = React.useState(false);

    const handleBlokTranslok = () => {
        setIsBlokTranslokActive((prev) => !prev);
        console.log(isBlokTranslokActive ? "Unblok Translok" : "Blok Translok");
    };

    const data = {
        nomorSpd: "SPD-2025-001",
        nama: "Yeni",
        statusPresensi: "BLOK",
        statusSpj: "Dalam Proses",
        booked: 1500000,
        realisasi: 2500000,
        statusBerangkat: "Ya",
    };

    const spjBadge = spjStatusMap[data.statusSpj] || { color: "default", variant: "outline" };
    const presensiBadge = presensiStatusMap[data.statusPresensi] || { color: "default", variant: "outline" };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline" className="h-7 w-7" icon={BanknotesIcon} />
            </DialogTrigger>
            <DialogContent size="3xl" className="max-h-screen p-0">
                <DialogHeader className="px-4 pt-4">
                    <DialogTitle className="text-xl font-semibold">Realisasi Permintaan</DialogTitle>
                </DialogHeader>
                <div className="h-[70vh]">
                    <ScrollArea className="h-full">
                        <div className="flex flex-col gap-6 px-6 ">

                            {/* Informasi Utama */}
                            <div className="grid md:grid-cols-2 gap-3">
                                <Info label="Nomor SPD" value={data.nomorSpd} />
                                <Info label="Nama" value={data.nama} />
                                <Info label="Status Berangkat" value={data.statusBerangkat} />
                                <Info label="Status Presensi">
                                    <Badge color={presensiBadge.color}>
                                        {data.statusPresensi}
                                    </Badge>
                                </Info>
                                <Info label="Tanggal Pergi" value={format(tanggalPergi, "PPP")} />
                                <Info label="Tanggal Pulang" value={format(tanggalPulang, "PPP")} />
                                <Info label="Lama Hari" value={`${lamaHari} hari`} />
                                <Info label="Status SPJ">
                                    <Badge variant={spjBadge.variant} color={spjBadge.color}>
                                        {data.statusSpj}
                                    </Badge>
                                </Info>
                                <Info label="Booked" value={formatRupiah(data.booked)} />
                                <Info label="Realisasi" value={formatRupiah(data.realisasi)} />
                            </div>

                            <hr />

                            {/* Status dan Blokir */}
                            <div className="flex flex-col">
                                <h4 className="text-lg font-semibold text-gray-800 pb-3">Detail Translok</h4>
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-4 items-center">
                                            <Label className="text-sm font-medium">Berangkat</Label>
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center space-x-2 text-sm">
                                                    <input type="radio" name="jenisPok" value="single" className="accent-primary" />
                                                    <span>Ya</span>
                                                </label>
                                                <label className="flex items-center space-x-2 text-sm">
                                                    <input type="radio" name="jenisPok" value="multi" className="accent-primary" />
                                                    <span>Tidak</span>
                                                </label>
                                            </div>
                                        </div>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        size="sm"
                                                        onClick={handleBlokTranslok}
                                                        icon={isBlokTranslokActive ? LockClosedIcon : LockOpenIcon}
                                                        color={isBlokTranslokActive ? "secondary" : "primary"}
                                                    >
                                                        {isBlokTranslokActive ? "Unblok Translok" : "Blok Translok"}
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="text-sm z-[9999]">
                                                    {isBlokTranslokActive
                                                        ? "Klik untuk membuka blokir dan izinkan perubahan data"
                                                        : "Klik untuk mengunci data agar tidak bisa diubah"}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div>
                                        <AdvancedTable />
                                    </div>
                                </div>

                            </div>


                            {/* Tabel */}


                            {/* Hitung Realisasi */}
                            <div className="flex flex-col gap-3">
                                <h4 className="text-lg font-semibold text-gray-800">Hitung Realisasi</h4>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 flex flex-col gap-2">
                                        <Label className="text-sm font-medium">Nilai Translok Booked</Label>
                                        <InputGroup className="h-10">
                                            <InputGroupText>Rp</InputGroupText>
                                            <Input type="text" placeholder="Masukkan nilai booked" className="h-10" />
                                        </InputGroup>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <Label className="text-sm font-medium">Nilai Translok Realisasi</Label>
                                        <InputGroup className="h-10">
                                            <InputGroupText>Rp</InputGroupText>
                                            <Input type="text" placeholder="Masukkan nilai realisasi" className="h-10" />
                                        </InputGroup>
                                        <div className="flex items-center gap-2 pt-1">
                                            <input type="checkbox" id="samaDenganBooked" className="accent-primary" />
                                            <Label htmlFor="samaDenganBooked" className="text-xs font-normal">
                                                Nilai realisasi sama dengan booked
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-4 p-4">
                    <DialogClose asChild>
                        <Button type="button" color="secondary" size="md">Cancel</Button>
                    </DialogClose>
                    <Button type="button" color="primary" size="md">Simpan</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Reusable Info row
const Info = ({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) => (
    <div className="flex items-center gap-2">
        <p className="w-36 text-sm font-medium">{label}</p>
        <div className="text-sm text-muted-foreground flex-1">: {children ?? value}</div>
    </div>
);

export default RealisasiTranslok;
