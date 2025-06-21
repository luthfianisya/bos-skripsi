// export const TIPE_FORM_MAP: Record<string, string> = {
//     "FORM - JLN": "Belanja Perjalanan Dinas Biasa",
//     "FORM - NON OPR": "Belanja Barang Non Operasional",
//     "FORM - BAHAN": "Belanja Bahan",
//     "FORM - PERSEDIAAN": "Belanja Persediaan Barang Konsumsi",
//     "FORM - PEMELIHARAAN": "Belanja Pemeliharaan",
//     "FORM - MODAL": "Belanja Modal",
//     "FORM - SEWA": "Belanja Sewa",
//     "FORM - JASA KONSULTAN": "Belanja Jasa Konsultan",
//     "FORM - JASA PROFESI": "Belanja Jasa Profesi",
//     "FORM - HONOR": "Honor Output Kegiatan",
//     "FORM - FULLDAY/HALFDAY": "Paket Pertemuan Fullday / Halfday",
//     "FORM - FULLBOARD DALAM KOTA": "Fullboard Dalam Kota",
//     "FORM - FULLBOARD LUAR KOTA": "Fullboard Luar Kota",
//     "FORM - TRANSLOK": "Perjalanan Dalam Kota/Translok",
//     "FORM -JASA LAINNYA": "Jasa Lainnya",
//     "FORM - PERKANTORAN": "Operasional Perkantoran",
//     "FORM – PAKET MEETING LAINNYA": "Paket Meeting Lainnya",
//     "FORM - OPERASIONAL": "Operasional Barang Lainnya",
//     "FORM - BELANJA LANGGANAN": "Belanja Langganan (Listrik/Air/Telepon)",
//     "FORM - LEMBUR": "Lembur",
//     "FORM - PENGHASILAN": "Belanja Penghasilan"
// };

export const statuses = [
    { label: "Terpakai", value: "terpakai" },
    { label: "Revisi", value: "revisi" },
    { label: "Tak Terpakai", value: "tidak_terpakai" },
  ];
  
  export const paguSisaFilters = [
    { label: "Tersedia", value: "tersedia" }, // sisa > 0
    { label: "Nol/Minus", value: "nol_minus" }, // sisa <= 0
  ];

export const satker: { value: string, label: string }[] = [
    { value: "637148", label: "[637148] BPS Kota Depok" },
  ];
  
export const tahun: { value: string, label: string }[] = [
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
  ];
  
export const organisasi: { value: string, label: string }[] = [
    { value: "92800", label: "[92800] BPS Kabupaten/Kota" },
  ];

export const TIPE_FORM_MAP: Record<string, { code: string; label: string }> = {
    "FORM - JLN": { code: "JLN", label: "FORM - JLN" },
    "FORM - NON OPR": { code: "NONOPR", label: "FORM - NON OPR" },
    "FORM - BAHAN": { code: "BHN", label: "FORM - BAHAN" },
    "FORM - PERSEDIAAN": { code: "PERSEDIAAN", label: "FORM - PERSEDIAAN" },
    "FORM - PEMELIHARAAN": { code: "PMLH", label: "FORM - PEMELIHARAAN" },
    "FORM - MODAL": { code: "MDL", label: "FORM - MODAL" },
    "FORM - SEWA": { code: "SEWA", label: "FORM - SEWA" },
    "FORM - JASA KONSULTAN": { code: "JS-KONSLTN", label: "FORM - JASA KONSULTAN" },
    "FORM - JASA PROFESI": { code: "JS", label: "FORM - JASA PROFESI" },
    "FORM - HONOR": { code: "UPH", label: "FORM - HONOR" },
    "FORM - FULLDAY/HALFDAY": { code: "FD-HD", label: "FORM - FULLDAY/HALFDAY" },
    "FORM - FULLBOARD DALAM KOTA": { code: "KONSI-DK", label: "FORM - FULLBOARD DALAM KOTA" },
    "FORM - FULLBOARD LUAR KOTA": { code: "KONSI-LK", label: "FORM - FULLBOARD LUAR KOTA" },
    "FORM - TRANSLOK": { code: "TRANSLOK", label: "FORM - TRANSLOK" },
    "FORM - JASA LAINNYA": { code: "JS-LAINNYA", label: "FORM - JASA LAINNYA" },
    "FORM - PERKANTORAN": { code: "KPRL-KANTOR", label: "FORM - PERKANTORAN" },
    "FORM – PAKET MEETING LAINNYA": { code: "PLT", label: "FORM - PAKET MEETING LAINNYA" },
    "FORM - OPERASIONAL": { code: "OPR", label: "FORM - OPERASIONAL" },
    "FORM - BELANJA LANGGANAN": { code: "LANGGANAN", label: "FORM - BELANJA LANGGANAN" },
    "FORM - LEMBUR": { code: "LEMBUR", label: "FORM - LEMBUR" },
    "FORM - PENGHASILAN": { code: "PENGHASILAN", label: "FORM - PENGHASILAN" },
  };
  

export const SUB_TIPE_FORM_MAP: Record<string, { value: string; label: string }[]> = {
    "FORM - TRANSLOK": [
      { value: "biasa", label: "[Biasa] Translok Biasa" },
      { value: "lebih_8_jam", label: "[Lebih 8 Jam] Translok lebih dari 8 jam" },
    ],
  };
  

export const KODE_BEBAN_MAP: Record<
    string,
    { beban: string; sumberDana: string; deskripsi: string }
> = {
    A: { beban: "RM", sumberDana: "RM", deskripsi: "Rupiah Murni" },
    B: { beban: "PINJ. VALAS / RPLN", sumberDana: "PLN", deskripsi: "Pinjaman Luar Negeri" },
    C: { beban: "L.COST/RMP", sumberDana: "RMP", deskripsi: "Rupiah Murni Pendamping" },
    D: { beban: "PNBP", sumberDana: "PNBP", deskripsi: "PNBP" },
    E: { beban: "PDN", sumberDana: "PDN", deskripsi: "Pinjaman Dalam Negeri" },
    F: { beban: "BLU", sumberDana: "BLU", deskripsi: "Badan Layanan Umum" },
    G: { beban: "STM", sumberDana: "STM", deskripsi: "Stimulus" },
    H: { beban: "HDN / HDN LANGSUNG", sumberDana: "HDN", deskripsi: "Hibah Dalam Negeri" },
    I: { beban: "HIBAH VALAS / RHLN / LANGSUNG", sumberDana: "HLN / HLD / HLL", deskripsi: "Hibah Luar Negeri & Langsung" },
    K: { beban: "SBSN PBS", sumberDana: "SBSN", deskripsi: "Surat Berharga Syariah Negara" },
};


export const JENIS_PENGELUARAN_MAP: Record<string, string> = {
    "2": "Borongan",
    "3": "Perjalanan Dinas",
    "4": "Pembahasan",
    "5": "Bahan",
    "6": "Pengiriman",
    "7": "Operasional Lainnya",
    "8": "Pencetakan",
    "9": "Pokja",
    "10": "Rapat",
    "11": "Translok",
    "12": "Jasa Profesi",
    "13": "Jasa Konsultan",
    "14": "Jasa Lainnya",
    "15": "Sewa",
    "16": "Operasional Perkantoran",
};

export const STATUS_PENCAIRAN_MAP: Record<string, string> = {
    UP: "Uang Persediaan (UP)",
    TUP: "Tambahan UP (TUP)",
    GUP: "Penggantian UP (GUP)",
    LS: "Pembayaran Langsung (LS)",
    Nihil: "Nihil",
    PTUP: "Pertanggungjawaban TUP (PTUP)",
    Pengesahan: "Pengesahan",
  };
  