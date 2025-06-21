import Select from "react-select";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { FilterState } from "./types";
import { DUMMY_PEGAWAIS } from "@/data/pegawai-dummy";
import { organisasi, satker, tahun } from "@/lib/constants"

// interface FilterState {
//   periode: string | null;
//   tahun: string | null;
//   bulan?: string | null; // untuk bulanan
//   mode?: string | null;  // untuk tahunan
//   satker: string | null;
//   unitKerja: string | null;
//   pegawai: string | null;
// }


const periodeOptions = [
  { value: "tahunan", label: "Tahunan" },
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

const tahunanModeOptions = [
  { value: "pegawai", label: "Per Pegawai" },
  { value: "unit_kerja", label: "Unit Kerja" },
];


const pegawaiOptions = [
  { value: "", label: "Pilih Pegawai" },
  ...DUMMY_PEGAWAIS.map((p) => ({
    value: p.nip,
    label: `[${p.nip}] ${p.nama}`,
  })),
];

const styles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#f1f5f9" : "white",
    borderColor: state.isDisabled ? "#cbd5e1" : provided.borderColor,
    color: state.isDisabled ? "#94a3b8" : provided.color,
    cursor: state.isDisabled ? "not-allowed" : "default",
    opacity: state.isDisabled ? 1 : 1,
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: state.isDisabled ? "#94a3b8" : provided.color,
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: state.isDisabled ? "#94a3b8" : provided.color,
  }),
};

interface DataTableFilterProps {
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const DataTableFilterRekap: React.FC<DataTableFilterProps> = ({ setFilters }) => {
  const [selectedPeriode, setSelectedPeriode] = React.useState<string>("tahunan");
  const [selectedBulan, setSelectedBulan] = React.useState<string | null>(null);
  const [selectedMode, setSelectedMode] = React.useState<string | null>(null);

  const handleFilterChange = (name: keyof FilterState, value: string | DateRange | null) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePeriodeChange = (selected: any) => {
    const value = selected?.value ?? "tahunan";
    setSelectedPeriode(value);

    if (value === "tahunan") {
      // Reset bulan dan mode state internal
      setSelectedBulan(null);
      setSelectedMode(null);
      setFilters((prev) => ({
        ...prev,
        periode: value,
        bulan: null,
        mode: null,
      }));
    } else if (value === "bulanan") {
      // Reset mode dan bulan state internal
      setSelectedMode(null); // Tambahan ini biar reset visual mode
      setSelectedBulan(null);
      setFilters((prev) => ({
        ...prev,
        periode: value,
        bulan: null,
        mode: null,
      }));
    }
  };




  const handleBulanChange = (selected: any) => {
    const value = selected?.value ?? null;
    setSelectedBulan(value);
    setFilters((prev) => ({
      ...prev,
      bulan: value,
      mode: null, // RESET mode saat pilih bulan (jaga-jaga)
    }));
  };


  const handleModeChange = (selected: any) => {
    const value = selected?.value ?? null;
    setSelectedMode(value);
    setFilters((prev) => ({
      ...prev,
      mode: value,
      bulan: null, // RESET bulan saat pilih mode (jaga-jaga)
    }));
  };


  return (
    <div className="grid grid-cols-1 w-full gap-y-4">
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium z-50">Rentang Waktu</label>
        <div className="flex items-center gap-8 flex-1">
          <div className="flex items-center gap-2 flex-1">
            <label className="font-medium">Tipe</label>
            <Select
              key={selectedPeriode} // Force rerender
              className="react-select flex-1 z-50 rounded-md"
              classNamePrefix="select"
              options={periodeOptions}
              value={periodeOptions.find(p => p.value === selectedPeriode)}
              styles={styles}
              onChange={handlePeriodeChange}
            />

          </div>

          <div className="flex items-center gap-2 flex-1">
            <label className="font-medium">Tahun</label>
            <Select
              className="react-select flex-1 z-50 rounded-md"
              classNamePrefix="select"
              options={tahun}
              styles={styles}
              placeholder="Pilih Tahun"
              name="tahun"
              onChange={(selected) => handleFilterChange("tahun", selected?.value ?? null)}
            />
          </div>
          {/* Select Bulan ATAU Mode */}
          {selectedPeriode === "bulanan" ? (
            <div className="flex items-center gap-2 flex-1">
              <label className="font-medium">Bulan</label>
              <Select
                className="react-select flex-1 rounded-md z-50"
                classNamePrefix="select"
                options={bulanOptions}
                styles={styles}
                placeholder="Pilih Bulan"
                value={
                  selectedBulan
                    ? [
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
                    ].find((m) => m.value === selectedBulan)
                    : null
                }
                onChange={handleBulanChange}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-1">
              <label className="font-medium">Mode</label>
              <Select
                className="react-select flex-1 rounded-md z-50"
                classNamePrefix="select"
                options={[
                  { value: "per_pegawai", label: "Per Pegawai" },
                  { value: "unit_kerja", label: "Unit Kerja" },
                ]}
                styles={styles}
                placeholder="Pilih Mode"
                value={
                  selectedMode
                    ? [
                      { value: "per_pegawai", label: "Per Pegawai" },
                      { value: "unit_kerja", label: "Unit Kerja" },
                    ].find((m) => m.value === selectedMode)
                    : null
                }
                onChange={handleModeChange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="w-48 font-medium">Satuan Kerja</label>
        <Select
          className="react-select flex-1 rounded-md z-45"
          classNamePrefix="select"
          placeholder="Pilih Satuan Kerja"
          styles={styles}
          options={satker}
          isClearable
          onChange={(selected) => handleFilterChange("satker", selected?.value ?? null)}
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="w-48 font-medium">Unit Kerja</label>
        <Select
          className="react-select flex-1 rounded-md z-40"
          classNamePrefix="select"
          placeholder="Pilih Unit Kerja"
          styles={styles}
          options={organisasi}
          isClearable
          onChange={(selected) => handleFilterChange("unitKerja", selected?.value ?? null)}
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="w-48 font-medium">Pegawai</label>
        <Select
          className={`react-select flex-1 rounded-md z-30 ${selectedPeriode === "bulanan" ? "bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed" : ""
            }`}
          classNamePrefix="select"
          placeholder="Pilih Pegawai"
          styles={styles}
          options={pegawaiOptions}
          isClearable
          isDisabled={selectedPeriode === "bulanan"}
          // value={
          //   selectedPeriode === "bulanan"
          //     ? { value: "all", label: "Semua Pegawai" }
          //     : filters
          //       ? pegawaiOptions.find((opt) => opt.value === filters.pegawai) ?? null
          //       : null

          // }
          onChange={(selected) => handleFilterChange("pegawai", selected?.value ?? null)}
        />
      </div>
    </div>
  );
};


export default DataTableFilterRekap;
