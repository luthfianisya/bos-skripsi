export interface FilterState {
    periode: "rentang" | "bulanan" |"tahunan"| null;
    tahun: string | null;
    rentang: { from: string; to: string } | null;
    bulan: string | null;
    satker: string | null;
    unitKerja: string | null;
    pegawai: string | null;
  }
  