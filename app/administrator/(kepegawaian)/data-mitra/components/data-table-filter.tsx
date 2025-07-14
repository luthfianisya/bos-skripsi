
import { organisasiOptions, satker, stylesFilter } from "@/lib/constants";
import Select from "react-select";

type DataTableFilterProps = {
  onOrganisasiChange: (value: string | null) => void;
};

const DataTableFilter = ({ onOrganisasiChange }: DataTableFilterProps) => {
  return (
    <div className="grid grid-cols-1 w-full gap-y-4">
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium z-30">Satuan Kerja</label>
        <Select
          className="react-select flex-1 z-30"
          classNamePrefix="select"
          placeholder="Pilih Satuan Kerja"
          styles={stylesFilter}
          options={satker}
          isClearable
          menuPortalTarget={document.body}
          defaultValue={satker[0]}
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium z-20">Organisasi Mitra/PPNPN</label>
        <Select
          className="react-select flex-1 z-20"
          classNamePrefix="select"
          placeholder="Pilih Organisasi Mitra/PPNPN"
          styles={stylesFilter}
          name="clear"
          options={organisasiOptions}
          onChange={(option) => onOrganisasiChange(option?.value ?? null)}
          isClearable
        />
      </div>
    </div>
  );
};

export default DataTableFilter;