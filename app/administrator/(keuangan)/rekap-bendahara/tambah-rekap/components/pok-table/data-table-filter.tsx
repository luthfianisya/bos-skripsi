import Select from "react-select";

const satker = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const tahun = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];

const organisasi = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const styles = {
  option: (provided: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const DataTableFilter = () => {
  return (
    <div className="grid gap-4 w-full">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex items-center gap-4">
          <label className="w-20 font-medium">Unit Kerja</label>
          <Select
            className="flex-1"
            classNamePrefix="select"
            placeholder="Pilih Satuan Kerja"
            styles={styles}
            options={satker}
            isClearable
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20 font-medium">Tipe Rekap</label>
          <Select
            className="flex-1"
            classNamePrefix="select"
            placeholder="Pilih Tipe Rekap"
            styles={styles}
            options={organisasi}
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default DataTableFilter;
