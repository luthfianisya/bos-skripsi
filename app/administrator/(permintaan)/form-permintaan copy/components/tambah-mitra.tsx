
"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { CalendarDays, X } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-select";

const users = [
  { value: "202", label: "Cleopetra" },
  { value: "203", label: "Nicolas" },
  { value: "204", label: "John Doe" },
];
const statuses = [
  { value: "todo", label: "To do" },
  { value: "inprogress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];
const prioriy = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const styles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};
const CreateTask = ({ open, onClose }: {
  open: boolean,
  onClose: () => void
}) => {

  const [openDate, setOPenDate] = useState<boolean>(true);







  return (
    <Sheet
      open={open}
      onOpenChange={onClose}
    >
      <SheetContent className="pt-5 max-w-lg overflow-y-auto max-h-screen">
        <SheetHeader className="flex-row items-center justify-between mb-4">
          <span className="text-lg font-semibold text-default-900">Tambah Mitra</span>
        </SheetHeader>
        <form className=" h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <Label htmlFor="assignedMember" className="mb-1.5 text-default-600">Satuan Kerja</Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={users}
                styles={styles}
                isMulti
              />
            </div>

            <div>
              <Label
                htmlFor="status"
                className="mb-1.5 text-default-600">
                Organisasi Mitra/PPNPN
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                options={statuses}
                styles={styles}
              />
            </div>
            <div>
              <Label htmlFor="boardTitle" className="mb-1.5 text-default-600">Nama Mitra/PPNPN</Label>
              <Input id="boardTitle" placeholder="Board Title" />
            </div>
            <div>
              <Label htmlFor="boardTitle" className="mb-1.5 text-default-600">NIK KTP</Label>
              <Input id="boardTitle" placeholder="Board Title" />
            </div>
            <div>
              <Label htmlFor="boardTitle" className="mb-1.5 text-default-600">NIP</Label>
              <Input id="boardTitle" placeholder="Board Title" />
            </div>
            <div className="flex gap-x-4">
  {/* Provinsi Tugas */}
  <div className="w-1/2">
    <Label htmlFor="provinsi" className="mb-1.5 text-default-600">
      Provinsi Tugas
    </Label>
    <Select
      className="react-select"
      classNamePrefix="select"
      options={prioriy}
      styles={styles}
    />
  </div>

  {/* Kabupaten Tugas */}
  <div className="w-1/2">
    <Label htmlFor="kabupaten" className="mb-1.5 text-default-600">
      Kabupaten Tugas
    </Label>
    <Select
      className="react-select"
      classNamePrefix="select"
      options={prioriy}
      styles={styles}
    />
  </div>
</div>
<div className="flex gap-x-4">
<div className="w-1/2">
    <Label htmlFor="provinsi" className="mb-1.5 text-default-600">
      Eselon
    </Label>
    <Select
      className="react-select"
      classNamePrefix="select"
      options={prioriy}
      styles={styles}
    />
  </div>

  {/* Kabupaten Tugas */}
  <div className="w-1/2">
    <Label htmlFor="kabupaten" className="mb-1.5 text-default-600">
      Golongan
    </Label>
    <Select
      className="react-select"
      classNamePrefix="select"
      options={prioriy}
      styles={styles}
    />
  </div>
</div>

<div>
              <Label htmlFor="boardTitle" className="mb-1.5 text-default-600">Instansi</Label>
              <Input id="boardTitle" placeholder="Board Title" />
            </div>

            <div>
              <Label htmlFor="boardTitle" className="mb-1.5 text-default-600">Jabatan</Label>
              <Input id="boardTitle" placeholder="Board Title" />
            </div>

            <div>
              <Label htmlFor="boardTitle" className="mb-1.5 text-default-600">NPWP</Label>
              <Input id="boardTitle" placeholder="Board Title" />
            </div>

            <div className="flex gap-x-4">
<div className="w-2/5">
    <Label htmlFor="provinsi" className="mb-1.5 text-default-600">
      Bank
    </Label>
    <Select
      className="react-select"
      classNamePrefix="select"
      options={prioriy}
      styles={styles}
    />
  </div>

  {/* Kabupaten Tugas */}
  <div className="w-3/5">
    <Label htmlFor="kabupaten" className="mb-1.5 text-default-600">
      Nomor Rekening
    </Label>
    <Select
      className="react-select"
      classNamePrefix="select"
      options={prioriy}
      styles={styles}
    />
  </div>
</div>

<div>
              <Label htmlFor="boardTitle" className="mb-1.5 text-default-600">Nama Pemilik Rekening</Label>
              <Input id="boardTitle" placeholder="Board Title" />
            </div>

            <div>
              <Label htmlFor="boardTitle" className="mb-1.5 text-default-600">Email</Label>
              <Input id="boardTitle" placeholder="Board Title" />
            </div>
          </div>
          <SheetFooter className="pb-10 pt-6">
            <SheetClose asChild>
              <Button type="button" color="destructive">Cancel</Button>
            </SheetClose>
            <Button>Simpan</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTask;

            {/* <div>
              <Label
                htmlFor="priority"
                className="mb-1.5 text-default-600">
                Due Date
              </Label>

              <div className="relative">
                <Input
                  placeholder="Select Date"

                />

                <CalendarDays
                  className="w-4 h-4 text-default-400 absolute top-1/2 right-2 -translate-y-1/2"
                />
                <div
                  className={cn("absolute bottom-10 left-0 w-[300px] bg-background z-20 hidden", {
                    "block": openDate
                  })}
                > */}

                {/* </div>
              </div> */}
            {/* </div> */}