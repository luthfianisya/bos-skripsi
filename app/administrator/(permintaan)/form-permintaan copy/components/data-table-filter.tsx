import { organisasi, satker, tahun } from "@/lib/constants";
import Select from "react-select";

const styles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const DataTableFilter = () => {
  return (
    <div className="grid grid-cols-1 w-full gap-y-4">
      <div className="flex items-center gap-3">
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
