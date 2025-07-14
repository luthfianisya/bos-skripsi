
import { satker, stylesFilter, tahun } from "@/lib/constants";
import Select from "react-select";

const DataTableFilter = () => {
  return (
  <div className="grid grid-cols-1 w-full gap-y-4">
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium z-30">Tahun Anggaran</label>
        <Select
          className="react-select flex-1 z-30"
          classNamePrefix="select"
          placeholder="Pilih Tahun"
          styles={stylesFilter}
          options={tahun}
          isClearable
          menuPortalTarget={document.body}
        />
      </div>
      <div className="flex items-center gap-3">
        {/* Pastikan semua label memiliki lebar yang sama */}
        <label className="w-48 font-medium z-30">Satuan Kerja</label>
        <Select
          className="react-select flex-1 z-30"
          classNamePrefix="select"
          placeholder="Pilih Satuan Kerja"
          styles={stylesFilter}
          name="clear"
          options={satker}
          isClearable
        />
      </div>
    </div>
  );
};

export default DataTableFilter;