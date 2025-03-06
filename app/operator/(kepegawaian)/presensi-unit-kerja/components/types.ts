export interface FilterState {
    periode: "rentang" | "bulanan" | null;
    tahun: string | null;
    rentang: { from: string; to: string } | null;
    satker: string | null;
    unitKerja: string | null;
    pegawai: string | null;
  }
  