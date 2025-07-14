
import { organisasi, satker, tahun } from "@/lib/constants";
import Select from "react-select";

const styles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
};

const DataTableFilter = () => {
  return (
    <div className="grid grid-cols-1 w-full gap-y-4">
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
                        menuPortalTarget={document.body}
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium">Satuan Kerja</label>
        <Select
          className="react-select flex-1 rounded-md"
          classNamePrefix="select"
          placeholder="Pilih Satuan Kerja"
          styles={styles}
          options={satker}
          isClearable
          menuPortalTarget={document.body}
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
          options={organisasi}
          isClearable
          menuPortalTarget={document.body}
        />
      </div>
    </div>
  );
};

export default DataTableFilter;