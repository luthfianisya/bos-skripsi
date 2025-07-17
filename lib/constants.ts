import { dummyForms } from "@/data/form-permintaan-f-2";
import { POKs } from "@/data/entri-pembiayaan";
import { FormPOK, PegawaiDetail } from "@/lib/interface";
import { DUMMY_PEGAWAIS } from "@/data/pegawai-dummy";

export const stylesFilter = {
  option: (provided: any) => ({ ...provided, fontSize: "14px" }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
};

export const bulanOptions = [
  { value: "01", label: "Januari" },
  { value: "02", label: "Februari" },
  { value: "03", label: "Maret" },
  { value: "04", label: "April" },
  { value: "05", label: "Mei" },
  { value: "06", label: "Juni" },
  { value: "07", label: "Juli" },
  { value: "08", label: "Agustus" },
  { value: "09", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
];

export const organisasiOptions = [
  { value: "03100", label: "[03100] Mitra Pengemudi" },
  { value: "04100", label: "[04100] Mitra Taman" },
  { value: "04110", label: "[04110] Mitra Taman Komplek" },
  { value: "04400", label: "[04400] Mitra Resepsionis" },
  { value: "04500", label: "[04500] Mitra Poliklinik" },
  { value: "04900", label: "[04900] Mitra Penata Arsip" },
  { value: "05100", label: "[05100] Mitra Petugas Kebersihan" },
  { value: "05400", label: "[05400] Mitra Teknisi" },
  { value: "05500", label: "[05500] Mitra Satpam" },
  { value: "05800", label: "[05800] Mitra Administrasi" },
  { value: "05900", label: "[05900] Mitra STIS" },
  { value: "06600", label: "[06600] Mitra Orang luar" },
  { value: "06770", label: "[06770] Mitra Sensus/Survei Sobat" },
  { value: "06790", label: "[06790] Mitra Pengolahan" },
  { value: "08500", label: "[08500] Mitra Magang" },
];

export const pegawaiOptions = [
  ...DUMMY_PEGAWAIS.map((p) => ({
    value: p.nip,
    label: `[${p.nip}] ${p.nama}`,
  })),
];

export const provinsiOptions = [
  { value: "00", label: "[0000000] Pusat" },
  { value: "11", label: "[1100000] Aceh" },
  { value: "12", label: "[1200000] Sumatera Utara" },
  { value: "13", label: "[1300000] Sumatera Barat" },
  { value: "14", label: "[1400000] Riau" },
  { value: "15", label: "[1500000] Jambi" },
  { value: "16", label: "[1600000] Sumatera Selatan" },
  { value: "17", label: "[1700000] Bengkulu" },
  { value: "18", label: "[1800000] Lampung" },
  { value: "19", label: "[1900000] Kepulauan Bangka Belitung" },
  { value: "21", label: "[2100000] Kepulauan Riau" },
  { value: "31", label: "[3100000] DKI Jakarta" },
  { value: "32", label: "[3200000] Jawa Barat" },
  { value: "33", label: "[3300000] Jawa Tengah" },
  { value: "34", label: "[3400000] DI Yogyakarta" },
  { value: "35", label: "[3500000] Jawa Timur" },
  { value: "36", label: "[3600000] Banten" },
  { value: "51", label: "[5100000] Bali" },
  { value: "52", label: "[5200000] Nusa Tenggara Barat" },
  { value: "53", label: "[5300000] Nusa Tenggara Timur" },
  { value: "61", label: "[6100000] Kalimantan Barat" },
  { value: "62", label: "[6200000] Kalimantan Tengah" },
  { value: "63", label: "[6300000] Kalimantan Selatan" },
  { value: "64", label: "[6400000] Kalimantan Timur" },
  { value: "65", label: "[6500000] Kalimantan Utara" },
  { value: "71", label: "[7100000] Sulawesi Utara" },
  { value: "72", label: "[7200000] Sulawesi Tengah" },
  { value: "73", label: "[7300000] Sulawesi Selatan" },
  { value: "74", label: "[7400000] Sulawesi Tenggara" },
  { value: "75", label: "[7500000] Gorontalo" },
  { value: "76", label: "[7600000] Sulawesi Barat" },
  { value: "81", label: "[8100000] Maluku" },
  { value: "82", label: "[8200000] Maluku Utara" },
  { value: "91", label: "[9100000] Papua" },
  { value: "92", label: "[9200000] Papua Barat" },
];

// kabupatenOptions.ts

export const kabupatenOptions = {
  "11": [
    { value: "1101", label: "[1101000] Kab. Simeulue" },
    { value: "1102", label: "[1102000] Kab. Aceh Singkil" },
    { value: "1103", label: "[1103000] Kab. Aceh Selatan" },
    { value: "1104", label: "[1104000] Kab. Aceh Tenggara" },
    { value: "1105", label: "[1105000] Kab. Aceh Timur" },
    // ... semua kabupaten di Aceh
  ],
  "12": [
    { value: "1201", label: "[1201000] Kab. Nias" },
    { value: "1202", label: "[1202000] Kab. Mandailing Natal" },
    { value: "1203", label: "[1203000] Kab. Tapanuli Selatan" },
    // ... semua kabupaten di Sumut
  ],
  "13": [
    { value: "1301", label: "[1301000] Kab. Kepulauan Mentawai" },
    { value: "1302", label: "[1302000] Kab. Pesisir Selatan" },
    // ... semua kabupaten di Sumbar
  ],
  "32": [
    { value: "3201", label: "[3201000] Kab. Bogor" },
    { value: "3202", label: "[3202000] Kab. Sukabumi" },
    { value: "3203", label: "[3203000] Kab. Cianjur" },
    { value: "3204", label: "[3204000] Kab. Bandung" },
    { value: "3205", label: "[3205000] Kab. Garut" },
    { value: "3206", label: "[3206000] Kab. Tasikmalaya" },
    { value: "3207", label: "[3207000] Kab. Ciamis" },
    { value: "3208", label: "[3208000] Kab. Kuningan" },
    { value: "3209", label: "[3209000] Kab. Cirebon" },
    { value: "3210", label: "[3210000] Kab. Majalengka" },
    { value: "3211", label: "[3211000] Kab. Sumedang" },
    { value: "3212", label: "[3212000] Kab. Indramayu" },
    { value: "3213", label: "[3213000] Kab. Subang" },
    { value: "3214", label: "[3214000] Kab. Purwakarta" },
    { value: "3215", label: "[3215000] Kab. Karawang" },
    { value: "3216", label: "[3216000] Kab. Bekasi" },
    { value: "3217", label: "[3217000] Kab. Bandung Barat" },
    { value: "3271", label: "[3271000] Kota Bogor" },
    { value: "3272", label: "[3272000] Kota Sukabumi" },
    { value: "3273", label: "[3273000] Kota Bandung" },
    { value: "3274", label: "[3274000] Kota Cirebon" },
    { value: "3275", label: "[3275000] Kota Bekasi" },
    { value: "3276", label: "[3276000] Kota Depok" },
    { value: "3277", label: "[3277000] Kota Cimahi" },
    { value: "3278", label: "[3278000] Kota Tasikmalaya" },
    { value: "3279", label: "[3279000] Kota Banjar" },
  ],
  // dst untuk seluruh provinsi Indonesia

  "35": [
    { value: "3501", label: "[3501000] Kab. Pacitan" },
    { value: "3502", label: "[3502000] Kab. Ponorogo" },
    { value: "3503", label: "[3503000] Kab. Trenggalek" },
    { value: "3504", label: "[3504000] Kab. Tulungagung" },
    { value: "3505", label: "[3505000] Kab. Blitar" },
    // ... semua kabupaten/kota di Jawa Timur
  ],

  // contoh provinsi lainnya
  "51": [
    { value: "5101", label: "[5101000] Kab. Jembrana" },
    { value: "5102", label: "[5102000] Kab. Tabanan" },
    { value: "5103", label: "[5103000] Kab. Badung" },
    { value: "5104", label: "[5104000] Kab. Gianyar" },
    { value: "5105", label: "[5105000] Kab. Klungkung" },
    { value: "5106", label: "[5106000] Kab. Bangli" },
    { value: "5107", label: "[5107000] Kab. Karangasem" },
    { value: "5108", label: "[5108000] Kab. Buleleng" },
    { value: "5171", label: "[5171000] Kota Denpasar" },
  ],
};

export const golonganOptions = [
  { value: "11", label: "[11] I/a (Juru Muda)" },
  { value: "11P", label: "[11P] I (Golongan I)" },
  { value: "12", label: "[12] I/b (Juru Muda Tk. I)" },
  { value: "12P", label: "[12P] II (Golongan II)" },
  { value: "13", label: "[13] I/c (Juru)" },
  { value: "13P", label: "[13P] III (Golongan III)" },
  { value: "14", label: "[14] I/d (Juru Tk. I)" },
  { value: "14P", label: "[14P] IV (Golongan IV)" },
  { value: "21", label: "[21] II/a (Pengatur Muda)" },
  { value: "21P", label: "[21P] V (Golongan V)" },
  { value: "22", label: "[22] II/b (Pengatur Muda Tk. I)" },
  { value: "22P", label: "[22P] VI (Golongan VI)" },
  { value: "23", label: "[23] II/c (Pengatur)" },
  { value: "23P", label: "[23P] VII (Golongan VII)" },
  { value: "24", label: "[24] II/d (Pengatur Tk. I)" },
  { value: "24P", label: "[24P] VIII (Golongan VIII)" },
  { value: "31", label: "[31] III/a (Penata Muda)" },
  { value: "31P", label: "[31P] IX (Golongan IX)" },
  { value: "32", label: "[32] III/b (Penata Muda Tk. I)" },
  { value: "32P", label: "[32P] X (Golongan X)" },
  { value: "33", label: "[33] III/c (Penata)" },
  { value: "33P", label: "[33P] XI (Golongan XI)" },
  { value: "34", label: "[34] III/d (Penata Tk. I)" },
  { value: "34P", label: "[34P] XII (Golongan XII)" },
  { value: "41", label: "[41] IV/a (Pembina)" },
  { value: "41P", label: "[41P] XIII (Golongan XIII)" },
  { value: "42", label: "[42] IV/b (Pembina Tk. I)" },
  { value: "42P", label: "[42P] XIV (Golongan XIV)" },
  { value: "43", label: "[43] IV/c (Pembina Utama Muda)" },
  { value: "43P", label: "[43P] XV (Golongan XV)" },
  { value: "44", label: "[44] IV/d (Pembina Utama Madya)" },
  { value: "44P", label: "[44P] XVI (Golongan XVI)" },
  { value: "45", label: "[45] IV/e (Pembina Utama)" },
  { value: "45P", label: "[45P] XVII (Golongan XVII)" },
];

export const bankOptions = [
  { value: "bca", label: "BCA" },
  { value: "bri", label: "BRI" },
  { value: "bni", label: "BNI" },
  { value: "mandiri", label: "Mandiri" },
  { value: "btn", label: "BTN" },
  { value: "cimb", label: "CIMB Niaga" },
  { value: "danamon", label: "Danamon" },
  { value: "permata", label: "Permata Bank" },
  { value: "mega", label: "Bank Mega" },
  { value: "bukopin", label: "Bukopin" },
  { value: "panin", label: "Panin Bank" },
  { value: "ocbc", label: "OCBC NISP" },
  { value: "maybank", label: "Maybank" },
  { value: "muamalat", label: "Muamalat" },
  { value: "bsi", label: "BSI" },
];

export const eselonOptions = [
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
];

export const wilayahList = [
  "Jakarta", "Bandung", "Surabaya", "Medan", "Semarang",
  "Yogyakarta", "Makassar", "Palembang", "Denpasar", "Padang"
];

export const namaDepanLaki = ["Andi", "Budi", "Dedi", "Eko", "Fajar", "Gilang", "Hadi", "Iqbal", "Joko", "Kurniawan"];
export const namaBelakangLaki = ["Saputra", "Santoso", "Wijaya", "Purnama", "Haryanto"];
export const namaDepanPerempuan = ["Ayu", "Bella", "Citra", "Dewi", "Eka", "Fitri", "Gita", "Indah", "Lestari", "Maya"];
export const namaBelakangPerempuan = ["Susanti", "Permata", "Anggraini", "Melati", "Wulandari"];

export const domainAlternatif = ["gmail.com", "yahoo.com", "outlook.com", "mail.com"];

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
];

export const wilayah: { value: string, label: string }[] = [
  { value: "3200", label: "[3200] BPS Provinsi Jawa Barat" },
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
  B: { beban: "PINJ. VALAS", sumberDana: "PLN", deskripsi: "Pinjaman Luar Negeri" },
  B2: { beban: "RPLN", sumberDana: "PLN", deskripsi: "Pinjaman Luar Negeri" },
  C: { beban: "L.COST/RMP", sumberDana: "RMP", deskripsi: "Rupiah Murni Pendamping" },
  D: { beban: "PNBP", sumberDana: "PNBP", deskripsi: "PNBP" },
  E: { beban: "PDN", sumberDana: "PDN", deskripsi: "Pinjaman Dalam Negeri" },
  F: { beban: "BLU", sumberDana: "BLU", deskripsi: "Badan Layanan Umum" },
  G: { beban: "STM", sumberDana: "STM", deskripsi: "Stimulus" },
  H: { beban: "HDN", sumberDana: "HDN", deskripsi: "Hibah Dalam Negeri" },
  H2: { beban: "HDN LANGSUNG", sumberDana: "HDN", deskripsi: "Hibah Dalam Negeri" },
  I: { beban: "HIBAH VALAS", sumberDana: "HLN / HLD / HLL", deskripsi: "Hibah Luar Negeri & Langsung" },
  I2: { beban: "HIBAH RHLN", sumberDana: "HLN / HLD / HLL", deskripsi: "Hibah Luar Negeri & Langsung" },
  I3: { beban: "HIBAH VALAS LANGSUNG", sumberDana: "HLN / HLD / HLL", deskripsi: "Hibah Luar Negeri & Langsung" },
  I4: { beban: "HIBAH LUAR LANGSUNG", sumberDana: "HLN / HLD / HLL", deskripsi: "Hibah Luar Negeri & Langsung" },
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
  "17": "Honor/Upah",
  "18": "Perjalanan Pindah",
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

export const jenisPencairanOptions = [
  { value: "up", label: "Dana Uang Persediaan (UP)" },
  { value: "nihil", label: "Nihil" },
  { value: "ls", label: "Pembayaran Langsung (LS)" },
  { value: "pengesahan", label: "Pengesahan" },
  { value: "gup", label: "Penggantian UP (GUP)" },
  { value: "ptup", label: "Pertanggungjawaban TUP (PTUP)" },
  { value: "tup", label: "Tambahan UP (TUP)" },
];

// constants.ts
export const STATUS_DOKUMEN_MAP: Record<string, string> = {
  direkap_bendahara: "Direkap di Bendahara",
  dikirim_verifikasi: "Dikirim ke Verifikasi",
  dikembalikan_bendahara: "Dikembalikan ke Bendahara",
  terbit_sp2d: "Terbit SP2D",
  terbit_spm_clean: "Terbit SPM Clean",
  terbit_spm_catatan: "Terbit SPM dengan Catatan",
  dibatalkan_spp: "Dibatalkan/Ganti SPP",
  dikirim_admin: "Dikirim ke Admin Verifikasi",
};


export const PPKOptions = [
  { value: "1", label: "Maura Delvina" },
  { value: "2", label: "Luthfiani Nur Aisyah" },
  { value: "3", label: "Andi  Santoso" },
];


const dummyPegawai: PegawaiDetail[] = [
  {
    nama: "Agus Saputra",
    nip: "198712312019031001",
    nomorSpd: "001/539170/92800/TRANSLOK-2899/05/2025",
    tanggalSpd: "2025-07-014",
    tujuan: "Depok",
    booked: 170000,
    realisasi: 170000,
    status: "Selesai",
  },
];

export const combinedForms: FormPOK[] = dummyForms.map((form, index) => ({
  id: `form-${index}`,
  grup: POKs[index % POKs.length].grup, // ambil grup POK berurutan, looping jika habis
  deskripsi: form.deskripsi,
  detail: "-",
  noSurat: form.noSurat,
  paguBooked: 170000, // constant
  paguReali: 170000,  // constant
  noPermintaan: form.noPermintaan,
  details: dummyPegawai, // ← tambahkan dummyPegawai di setiap baris
}));

export const PROGRAMS = [
  {
    code: "GG",
    label: "Program Penyediaan dan Pelayanan Informasi Statistik",
    kegiatan: [
      {
        code: "2900",
        label: "Pengembangan Metodologi Sensus dan Survei",
        output: [
          {
            code: "BMA",
            label: "Data dan Informasi Publik",
            suboutput: [
              {
                code: "005",
                label: "DOKUMEN/LAPORAN PENGEMBANGAN METODOLOGI KEGIATAN STATISTIK",
                komponen: [
                  { code: "005", label: "Dukungan Penyelenggaraan Tugas dan Fungsi Unit" },
                  { code: "051", label: "PERSIAPAN" },
                  { code: "052", label: "PENGUMPULAN DATA" },
                  { code: "053", label: "PENGOLAHAN DAN ANALISIS" },
                  { code: "054", label: "DISEMINASI DAN EVALUASI" },
                ]
              }
            ]
          }
        ]
      },
      {
        code: "2899",
        label: "Penyediaan dan Pengembangan Statistik Neraca Produksi",
        output: [
          {
            code: "BDB",
            label: "Fasilitasi dan Pembinaan Lembaga",
            suboutput: [
              {
                code: "100",
                label: "Pembinaan Statistik Sektoral Neraca Produksi",
                komponen: [
                  { code: "100", label: "Pelaksanaan Pembinaan Statistik Sektoral" },
                ]
              }
            ]
          },
          {
            code: "BMA",
            label: "Data dan Informasi Publik",
            suboutput: [
              {
                code: "006",
                label: "Publikasi/Laporan Neraca Produksi",
                komponen: [
                  { code: "005", label: "Dukungan Penyelenggaraan Tugas dan Fungsi Unit" },
                  { code: "051", label: "PERSIAPAN" },
                  { code: "052", label: "PENGUMPULAN DATA" },
                  { code: "053", label: "PENGOLAHAN DAN ANALISIS" },
                  { code: "054", label: "DISEMINASI DAN EVALUASI" },
                ]
              }
            ]
          }
        ]
      }
      // tambahkan kegiatan lainnya di sini sesuai kebutuhan
    ]
  },
  {
    code: "WA",
    label: "Program Dukungan Manajemen",
    kegiatan: [
      {
        code: "2886",
        label: "Dukungan Manajemen dan Pelaksanaan Tugas Teknis Lainnya BPS Provinsi",
        output: [
          {
            code: "EBA",
            label: "Layanan Dukungan Manajemen Internal",
            suboutput: [
              {
                code: "956",
                label: "Layanan BMN",
                komponen: [
                  { code: "051", label: "Tanpa Komponen" }
                ]
              },
              {
                code: "958",
                label: "Layanan Hubungan Masyarakat dan Informasi",
                komponen: [
                  { code: "051", label: "Tanpa Komponen" }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
