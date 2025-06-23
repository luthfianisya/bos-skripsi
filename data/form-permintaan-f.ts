import { ApprovalStatus } from "@/lib/type";

export interface FullFormPermintaan {
  noPermintaan: string;
  deskripsi: string;
  noSurat: string;
  tanggalSurat: string;
  tipeForm: string;
  subTipeForm?: string;
  jenisPok: "single" | "multi";
  linkPermintaan: string;
  uploadKAK?: File | null; // optional hanya untuk form, bukan ditampilkan
  jumlahUsulan: number;
  pembuat: string;
  approvals: Record<"operator" | "pj" | "ppk", ApprovalStatus>;
  pokTerpilih: {
    grup: string;
    detail: string;
    kode: string;
    uraian: string;
    nilai: number;
  }[];
  dataPeserta: {
    nama: string;
    asal: string;
    gol: string;
    tujuan: string;
    pulangPergi: {
      tanggalPergi: string;
      tanggalPulang: string;
    };
    jumlah: number;
  }[];
}

export const dummyForms: FullFormPermintaan[] = [
  {
    noPermintaan: "POK-001/2025",
    deskripsi: "Pengadaan Laptop Lenovo ThinkPad X1 Carbon",
    noSurat: "001/IT/STIS/2025",
    tanggalSurat: "2025-04-12",
    tipeForm: "FORM - MODAL",
    subTipeForm: "biasa",
    jenisPok: "single",
    linkPermintaan: "link1",
    jumlahUsulan: 45000000,
    pembuat: "Dian Sasmita",
    approvals: {
      operator: "approved",
      pj: "approved",
      ppk: "approved",
    },
    pokTerpilih: [
      {
        grup: "MODAL_01",
        detail: "Laptop High-End",
        kode: "528115",
        uraian: "Belanja Modal Peralatan dan Mesin",
        nilai: 45000000,
      },
    ],
    dataPeserta: [
      {
        nama: "Raka Setiawan",
        gol: "IIIA",
        asal: "Depok",
        tujuan: "Jakarta Selatan",
        pulangPergi: {
          tanggalPergi: "2025-04-14",
          tanggalPulang: "2025-04-15",
        },
        jumlah: 45000000,
      },
    ],
  },
  {
    noPermintaan: "POK-002/2025",
    deskripsi: "Fullboard Pelatihan Enumerator di luar kota",
    noSurat: "002/IT/STIS/2025",
    tanggalSurat: "2025-04-13",
    tipeForm: "FORM - FULLBOARD LUAR KOTA",
    subTipeForm: "biasa",
    jenisPok: "single",
    linkPermintaan: "link2",
    jumlahUsulan: 18000000,
    pembuat: "Rian Pratama",
    approvals: {
      operator: "approved",
      pj: "submit",
      ppk: "pending",
    },
    pokTerpilih: [
      {
        grup: "KONSUMSI_02",
        detail: "Hotel & Konsumsi",
        kode: "524119",
        uraian: "Belanja Fullboard",
        nilai: 18000000,
      },
    ],
    dataPeserta: [
      {
        nama: "Andi Prakoso",
        gol: "IIIA",
        asal: "Beji",
        tujuan: "Bogor",
        pulangPergi: {
          tanggalPergi: "2025-05-01",
          tanggalPulang: "2025-05-02",
        },
        jumlah: 18000000,
      },
    ],
  },
  {
    noPermintaan: "POK-003/2025",
    deskripsi: "Honor Narasumber Workshop Data Science",
    noSurat: "003/IT/STIS/2025",
    tanggalSurat: "2025-04-15",
    tipeForm: "FORM - HONOR",
    subTipeForm: "biasa",
    jenisPok: "multi",
    linkPermintaan: "link1",
    jumlahUsulan: 12000000,
    pembuat: "Siti Aisyah",
    approvals: {
      operator: "submit",
      pj: "pending",
      ppk: "pending",
    },
    pokTerpilih: [
      {
        grup: "HONOR_01",
        detail: "Honor Narasumber",
        kode: "521213",
        uraian: "Belanja Honorarium",
        nilai: 12000000,
      },
    ],
    dataPeserta: [
      {
        nama: "Wulan Safitri",
        gol: "IIIA",
        asal: "Cimanggis",
        tujuan: "Jakarta Selatan",
        pulangPergi: {
          tanggalPergi: "2025-05-05",
          tanggalPulang: "2025-05-06",
        },
        jumlah: 12000000,
      },
    ],
  },
  {
    noPermintaan: "POK-004/2025",
    deskripsi: "Translok Petugas Sensus Ekonomi",
    noSurat: "004/IT/STIS/2025",
    tanggalSurat: "2025-04-17",
    tipeForm: "FORM - TRANSLOK",
    subTipeForm: "biasa",
    jenisPok: "single",
    linkPermintaan: "link2",
    jumlahUsulan: 8000000,
    pembuat: "Yusuf Hamka",
    approvals: {
      operator: "approved",
      pj: "rejected",
      ppk: "rejected",
    },
    pokTerpilih: [
      {
        grup: "TRANSLOK_01",
        detail: "Transportasi Petugas",
        kode: "524111",
        uraian: "Belanja Translok",
        nilai: 8000000,
      },
    ],
    dataPeserta: [
      {
        nama: "Mega Larasati",
        gol: "IIIA",
        asal: "Sawangan",
        tujuan: "Cilodong",
        pulangPergi: {
          tanggalPergi: "2025-05-08",
          tanggalPulang: "2025-05-08",
        },
        jumlah: 8000000,
      },
    ],
  },
  {
    noPermintaan: "POK-005/2025",
    deskripsi: "Sewa Kendaraan Operasional Bulan Mei",
    noSurat: "005/IT/STIS/2025",
    tanggalSurat: "2025-04-20",
    tipeForm: "FORM - SEWA",
    subTipeForm: "biasa",
    jenisPok: "single",
    linkPermintaan: "link1",
    jumlahUsulan: 25000000,
    pembuat: "Nadya Anjani",
    approvals: {
      operator: "approved",
      pj: "approved",
      ppk: "submit",
    },
    pokTerpilih: [
      {
        grup: "SEWA_01",
        detail: "Kendaraan Operasional",
        kode: "524113",
        uraian: "Belanja Sewa Kendaraan",
        nilai: 25000000,
      },
    ],
    dataPeserta: [
      {
        nama: "Bagas Saputra",
        gol: "IIIA",
        asal: "Cinere",
        tujuan: "Jakarta Selatan",
        pulangPergi: {
          tanggalPergi: "2025-05-10",
          tanggalPulang: "2025-05-12",
        },
        jumlah: 25000000,
      },
    ],
  },
];
