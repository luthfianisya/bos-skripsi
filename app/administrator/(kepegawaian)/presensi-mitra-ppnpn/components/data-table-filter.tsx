import Select from "react-select";
import * as React from "react";
import { DateRange } from "react-day-picker";
import DatePickerWithRange from "@/components/date-picker-with-range";
import { FilterState } from "./types";

const satker = [
  { value: "", label: "Pilih Satuan Kerja" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const tahunOptions = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];

const periodeOptions = [
  { value: "rentang", label: "Rentang Khusus" },
  { value: "bulanan", label: "Bulanan" },
];

const bulanOptions = [
  { value: "01", label: "Januari" },
  { value: "02", label: "Februari" },
  { value: "03", label: "Maret" },
  { value: "04", label: "April" },
  { value: "05", label: "Mei" },
  { value: "06", label: "Juni" },
  { value: "07", label: "Juli" },
  { value: "08", label: "Agustus" },
  { value: "09", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
];

const unitKerja = [
  { value: "", label: "Pilih Unit Kerja" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const pegawai = [
  { value: "", label: "Pilih Pegawai" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const styles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#f1f5f9" : "white", // slate-100
    borderColor: state.isDisabled ? "#cbd5e1" : provided.borderColor, // slate-300
    color: state.isDisabled ? "#94a3b8" : provided.color, // slate-400
    cursor: state.isDisabled ? "not-allowed" : "default",
    opacity: state.isDisabled ? 1 : 1,
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: state.isDisabled ? "#94a3b8" : provided.color, // slate-400
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: state.isDisabled ? "#94a3b8" : provided.color, // slate-400
  }),
};


interface DataTableFilterProps {
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const DataTableFilter: React.FC<DataTableFilterProps> = ({ setFilters }) => {
  const [selectedPeriode, setSelectedPeriode] = React.useState<string>("rentang");

  const handleFilterChange = (name: keyof FilterState, value: string | DateRange | null) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 w-full gap-y-4">
      <div className="flex items-center gap-3">
  {/* Rentang Waktu */}
        <label className="w-48 font-medium z-50">Rentang Waktu</label>

        {/* Container untuk ketiga Select */}
        <div className="flex items-center gap-8 flex-1">
          {/* Select 1 */}
          <div className="flex items-center gap-2 flex-1">
            <label className="font-medium">Tipe</label>
              <Select
                className="react-select flex-1 z-50 rounded-md"
                classNamePrefix="select"
                options={periodeOptions}
                defaultValue={periodeOptions[0]}
                styles={styles}
                onChange={(selected) => {
                  const value = selected?.value ?? "rentang";
                  setSelectedPeriode(value);
                  handleFilterChange("periode", value);
                }}
              />
          </div>

          {/* Select 2 */}
          <div className="flex items-center gap-2 flex-1">
            <label className="font-medium">Tahun</label>
            <Select
                className="react-select flex-1 z-50 rounded-md"
                classNamePrefix="select"
                options={tahunOptions}
                styles={styles}
                placeholder="Pilih Tahun"
                name="tahun"
                onChange={(selected) => handleFilterChange("tahun", selected?.value ?? null)}
              />
          </div>

    {/* Select 3 */}
    <div className="flex items-center gap-2 flex-1">
    <label className="font-medium">
          {selectedPeriode === "rentang" ? "Rentang" : "Bulan"}
        </label>
        {selectedPeriode === "rentang" ? (
          <DatePickerWithRange
            className="flex-1"
            onSelect={(date: DateRange | undefined) => handleFilterChange("rentang", date ?? null)}
          />
        ) : (
          <Select
            className="react-select flex-1 rounded-md"
            classNamePrefix="select"
            options={bulanOptions}
            styles={styles}
            placeholder="Pilih Bulan"
            onChange={(selected) => handleFilterChange("bulan", selected?.value ?? null)}
          />
        )}
      </div>
  </div>
</div>



      {/* Filter Satuan Kerja */}
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium">Satuan Kerja</label>
        <Select
          className="react-select flex-1 rounded-md"
          classNamePrefix="select"
          placeholder="Pilih Satuan Kerja"
          styles={styles}
          options={satker}
          isClearable
          onChange={(selected) => handleFilterChange("satker", selected?.value ?? null)}
        />
      </div>

      {/* Filter Unit Kerja */}
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium">Unit Kerja</label>
        <Select
          className="react-select flex-1 rounded-md"
          classNamePrefix="select"
          placeholder="Pilih Unit Kerja"
          styles={styles}
          options={unitKerja}
          isClearable
          onChange={(selected) => handleFilterChange("unitKerja", selected?.value ?? null)}
        />
      </div>

      {/* Filter Pegawai */}
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium">Pegawai</label>
        <Select
          className={`react-select flex-1 rounded-md ${
            selectedPeriode === "bulanan" ? "bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed" : ""
          }`}
          classNamePrefix="select"
          placeholder="Pilih Pegawai"
          styles={styles}
          options={pegawai}
          isClearable
          isDisabled={selectedPeriode === "bulanan"}
          value={selectedPeriode === "bulanan" ? { value: "all", label: "Semua Pegawai" } : null}
          onChange={(selected) => handleFilterChange("pegawai", selected?.value ?? null)}
        />
      </div>
    </div>
  );
};

export default DataTableFilter;

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