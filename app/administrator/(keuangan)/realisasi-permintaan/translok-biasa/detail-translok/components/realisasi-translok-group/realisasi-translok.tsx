"use client";

import { useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Realisasi } from "../columns";



const RealisasiTranslokGroup = ({
    rowData,
    updateRow,
    isBerangkat,
}: {
    rowData: Realisasi;
    updateRow: (nip: string, update: Partial<Realisasi>) => void;
    isBerangkat: boolean;
}) => {
    const promise = () =>
        new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000));
    const [open, setOpen] = useState(false);



    const data = {
        nomorSpd: "SPD-2025-001",
        nama: "Yeni",
        statusPresensi: "BLOK",
        statusSpj: "Dalam Proses",
        booked: 170000,
        realisasi: 0,
        statusBerangkat: "Ya",
    };

    const [nilaiRealisasi, setNilaiRealisasi] = useState<number>(rowData.realisasi);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="xs" color="primary" icon={BanknotesIcon} disabled={!isBerangkat}>
                    Hitung Realisasi
                </Button>
            </DialogTrigger>
            <DialogContent size="4xl" className="max-h-screen p-0">
                <DialogHeader className="px-4 pt-4">
                    <DialogTitle className="text-xl font-semibold">Realisasi Permintaan</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6 px-6 ">


                    {/* Hitung Realisasi */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-lg font-semibold text-gray-800">Hitung Realisasi</h4>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 flex flex-col gap-2">
                                <Label className="text-sm font-medium">Nilai Translok Booked</Label>
                                <InputGroup className="h-10">
                                    <InputGroupText>Rp</InputGroupText>
                                    <Input type="text" placeholder="Masukkan nilai booked" className="h-10 text-end text-sm" value={data.booked} />
                                </InputGroup>
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <Label className="text-sm font-medium">Nilai Translok Realisasi</Label>
                                <InputGroup className="h-10">
                                    <InputGroupText>Rp</InputGroupText>
                                    <Input
                                        type="number"
                                        placeholder="Masukkan nilai realisasi"
                                        className="h-10 text-end text-sm"
                                        value={nilaiRealisasi}
                                        onChange={(e) => setNilaiRealisasi(Number(e.target.value))}
                                    />

                                </InputGroup>
                                <div className="flex items-center gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="samaDenganBooked"
                                        className="accent-primary"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setNilaiRealisasi(data.booked);
                                            } else {
                                                setNilaiRealisasi(0);
                                            }
                                        }}
                                    />


                                    <Label htmlFor="samaDenganBooked" className="text-sm font-normal">
                                        Nilai realisasi sama dengan booked
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Footer */}
                <div className="flex justify-end gap-3 mt-4 p-4">
                    <DialogClose asChild>
                        <Button type="button" color="secondary" size="md" variant="soft">Batal</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            color="primary"
                            size="md"
                            onClick={() =>
                                updateRow(rowData.nip, {
                                    realisasi: nilaiRealisasi,
                                    statusSpj: "Rekap Bendahara",
                                })
                            }
                        >
                            Simpan
                        </Button>
                    </DialogClose>

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

export default RealisasiTranslokGroup;
