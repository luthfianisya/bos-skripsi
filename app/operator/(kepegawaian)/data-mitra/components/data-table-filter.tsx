
import Select from "react-select";
const satker: { value: string, label: string }[] = [
    { value: "", label: "Pilih Satuan Kerja" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const organisasi: { value: string, label: string }[] = [
    { value: "", label: "Pilih Organisasi Mitra/PPNPN" },
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
        <label className="w-48 font-medium z-30">Satuan Kerja</label>
        <Select
          className="react-select flex-1 z-30"
          classNamePrefix="select"
          defaultValue={satker[0]}
          styles={styles}
          name="clear"
          options={satker}
          isClearable
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium z-20">Organisasi Mitra/PPNPN</label>
        <Select
          className="react-select flex-1 z-20"
          classNamePrefix="select"
          defaultValue={organisasi[0]}
          styles={styles}
          name="clear"
          options={organisasi}
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