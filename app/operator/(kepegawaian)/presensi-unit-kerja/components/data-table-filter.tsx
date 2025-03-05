
import Select from "react-select";

import {
  Select as CustomSelect, // Alias untuk Select dari @/components/ui/select
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import DatePickerWithRange from "@/components/date-picker-with-range";

const satker: { value: string, label: string }[] = [
    { value: "", label: "Pilih Satuan Kerja" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const tahun: { value: string, label: string }[] = [
{ value: "", label: "2025" },
{ value: "2024", label: "2024" },
{ value: "2023", label: "2023" },
];

const periode: { value: string, label: string }[] = [
  { value: "rentang", label: "Rentang Khusus" },
  { value: "bulanan", label: "Bulanan" },
  ];

const unitKerja: { value: string, label: string }[] = [
    { value: "", label: "Pilih Unit Kerja" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const pegawai: { value: string, label: string }[] = [
  { value: "", label: "Pilih Unit Kerja" },
{ value: "chocolate", label: "Chocolate" },
{ value: "strawberry", label: "Strawberry" },
{ value: "vanilla", label: "Vanilla" },
];

const styles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const DataTableFilter = () => {
  return (
    <div className="grid grid-cols-1 w-full gap-y-4">
      {/* <div>
        <Select
          className="react-select"
          classNamePrefix="select"
          defaultValue={furits[0]}
          options={furits}
          styles={styles}
        />
      </div> */}
      <div className="flex items-center gap-3">
  {/* Rentang Waktu */}
  <label className="w-48 font-medium z-50">Rentang Waktu</label>

  {/* Container untuk ketiga Select */}
  <div className="flex items-center gap-8 flex-1">
    {/* Select 1 */}
    <div className="flex items-center gap-2 flex-1">
      <label className="font-medium">Periode</label>
      <Select
  className="react-select flex-1 z-50 rounded-md"
  classNamePrefix="select"
  placeholder="Pilih Periode" // Tambahkan ini
  styles={styles}
  name="periode"
  options={periode}
  isClearable
/>
      {/* <CustomSelect>
      <SelectTrigger size="md" radius="md" className="text-sm">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">English</SelectItem>
        <SelectItem value="mathmatics">Mathmatics</SelectItem>
        <SelectItem value="physics">Physics</SelectItem>
        <SelectItem value="chemistry">Chemistry</SelectItem>
        <SelectItem value="biology">Biology</SelectItem>
      </SelectContent>
    </CustomSelect> */}
    </div>

    {/* Select 2 */}
    <div className="flex items-center gap-2 flex-1">
      <label className="font-medium">Tahun</label>
      <Select
  className="react-select flex-1 z-50 rounded-md"
  classNamePrefix="select"
  placeholder="Pilih Tahun" // Tambahkan ini
  styles={styles}
  name="tahun"
  options={tahun}
  isClearable
/>

    </div>

    {/* Select 3 */}
    <div className="flex items-center gap-2 w-auto">
      <label className="font-medium">Rentang</label>
      <DatePickerWithRange className="w-64"/>
    </div>
  </div>
</div>

      <div className="flex items-center gap-3">
        {/* Pastikan semua label memiliki lebar yang sama */}
        <label className="w-48 font-medium z-40">Satuan Kerja</label>
        <Select
          className="react-select flex-1 z-40 rounded-md"
          classNamePrefix="select"
          placeholder="Pilih Satuan Kerja"
          styles={styles}
          name="clear"
          options={satker}
          isClearable
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium z-30 rounded-md">Unit Kerja</label>
        <Select
          className="react-select flex-1 z-30"
          classNamePrefix="select"
          placeholder="Pilih Unit Kerja"
          styles={styles}
          name="clear"
          options={unitKerja}
          isClearable
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium z-20 rounded-md">Pegawai</label>
        <Select
          className="react-select flex-1 z-20"
          classNamePrefix="select"
          placeholder="Pilih Pegawai"
          styles={styles}
          name="clear"
          options={pegawai}
          isClearable
        />
      </div>
    
      {/* <div>
        <Select
          className="react-select"
          classNamePrefix="select"
          defaultValue={furits[2]}
          name="loading"
          options={furits}
          isLoading={true}
          isClearable={false}
          styles={styles}
        />
      </div>
      <div>
        <Select
          className="react-select"
          classNamePrefix="select"
          defaultValue={furits[3]}
          name="disabled"
          options={furits}
          isDisabled={true}
          isClearable={false}
          styles={styles}
        />
      </div> */}
    </div>
  );
};

export default DataTableFilter;

