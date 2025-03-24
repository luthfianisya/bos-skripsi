
import Select from "react-select";
const satker: { value: string, label: string }[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const tahun: { value: string, label: string }[] = [
{ value: "2025", label: "2025" },
{ value: "2024", label: "2024" },
{ value: "2023", label: "2023" },
];

const organisasi: { value: string, label: string }[] = [
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
        {/* Pastikan semua label memiliki lebar yang sama */}
        <label className="w-48 font-medium z-30">Tahun Anggaran</label>
        <Select
          className="react-select flex-1 z-30"
          classNamePrefix="select"
          defaultValue={tahun[0]}
          styles={styles}
          name="clear"
          options={tahun}
          isClearable
        />
      </div>
      <div className="flex items-center gap-3">
        {/* Pastikan semua label memiliki lebar yang sama */}
        <label className="w-48 font-medium z-30">Satuan Kerja</label>
        <Select
          className="react-select flex-1 z-30"
          classNamePrefix="select"
          placeholder="Pilih Satuan Kerja"
          styles={styles}
          name="clear"
          options={satker}
          isClearable
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium z-20">Unit Kerja</label>
        <Select
          className="react-select flex-1 z-20"
          classNamePrefix="select"
          placeholder="Pilih Unit Kerja"
          styles={styles}
          name="clear"
          options={organisasi}
          isClearable
        />
      </div>
    </div>
  );
};

export default DataTableFilter;