import Select from "react-select";

const satker = [
  { value: "bps", label: "[92800] BPS Kabupaten/Kota" },
];

const tipeRekapOptions = [
  { value: "rekap-jalan", label: "[1] Rekap Jalan" },
  { value: "rekap-lembur", label: "[4] Rekap Lembur" },
  { value: "rekap-honor-output", label: "[8] Rekap Honor Output" },
  { value: "rekap-pm-perjalanan", label: "[9] Rekap PM Perjalanan" },
  { value: "rekap-translok", label: "[10] Rekap Translok" },
  { value: "rekap-jalan-ln", label: "[12] Rekap Jalan LN" },
  { value: "rekap-pm-penyelenggara", label: "[13] Rekap PM Penyelenggara" },
  { value: "rekap-bahan", label: "[14] Rekap Bahan" },
  { value: "rekap-non-op-non-peserta", label: "[15] Rekap Non Operasional Non-Peserta" },
  { value: "rekap-modal", label: "[16] Rekap Modal" },
  { value: "rekap-perkantoran", label: "[17] Rekap Perkantoran" },
  { value: "rekap-persediaan", label: "[18] Rekap Persediaan" },
  { value: "rekap-pemeliharaan", label: "[21] Rekap Pemeliharaan" },
  { value: "rekap-sewa", label: "[29] Rekap Sewa" },
  { value: "rekap-jasa-profesi", label: "[31] Rekap Jasa Profesi" },
  { value: "rekap-jasa-lainnya", label: "[32] Rekap Jasa Lainnya" },
  { value: "rekap-pokja", label: "[34] Rekap Pokja" },
  { value: "rekap-jasa-konsultan", label: "[35] Rekap Jasa Konsultan" },
  { value: "rekap-belanja-langganan", label: "[36] Rekap Belanja Langganan" },
  { value: "rekap-operasional", label: "[37] Rekap Operasional" },
  { value: "rekap-non-op-peserta", label: "[38] Rekap Non Operasional Peserta" },
  { value: "rekap-biaya-pindah", label: "[39] Rekap Biaya Pindah" },
  { value: "rekap-penghasilan", label: "[40] Rekap Penghasilan" },
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
            placeholder="Pilih Unit Kerja"
            styles={styles}
            options={satker}
            value={satker[0]}
            isDisabled
            isClearable
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20 font-medium">Tipe Rekap</label>
          <Select
            className="flex-1 z-50"
            classNamePrefix="select"
            placeholder="Pilih Tipe Rekap"
            styles={styles}
            options={tipeRekapOptions}
            isClearable
          />

        </div>
      </div>
    </div>
  );
};

export default DataTableFilter;
