import Select from "react-select";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { FilterState } from "./types";
import { DUMMY_PEGAWAIS } from "@/data/pegawai-dummy";
import { bulanOptions, organisasi, satker, tahun } from "@/lib/constants"


const periodeOptions = [
  { value: "tahunan", label: "Tahunan" },
  { value: "bulanan", label: "Bulanan" },
];

const styles = {
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
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
              menuPortalTarget={document.body}
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
              menuPortalTarget={document.body}
            />
          </div>
          {/* Select Bulan ATAU Mode */}
          {/* Select Bulan hanya di-enable jika periode = bulanan */}
          <div className="flex items-center gap-2 flex-1">
            <label className="font-medium">Bulan</label>
            <Select
              className="react-select flex-1 rounded-md z-50"
              classNamePrefix="select"
              options={bulanOptions}
              styles={styles}
              placeholder="Pilih Bulan"
              isDisabled={selectedPeriode === "tahunan"} // DISABLE jika tahunan
              value={
                selectedBulan
                  ? bulanOptions.find((m) => m.value === selectedBulan)
                  : null
              }
              onChange={handleBulanChange}
              menuPortalTarget={document.body}
            />
          </div>

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
          menuPortalTarget={document.body}
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
          menuPortalTarget={document.body}
        />
      </div>
    </div>
  );
};


export default DataTableFilterRekap;
