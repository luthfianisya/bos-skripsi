export enum KategoriPresensi {
  BLOK = "BLOK",
  MANUAL = "MANUAL",
  LIBUR = "LIBUR",
  TERLAMBAT = "TERLAMBAT",
}

export type Presensi = {
  id: number;
  tanggal: string;
  masuk?: string | null;       // ✅ Opsional
  pulang?: string | null;      // ✅ Opsional
  kodeAbsen?: string | null;   // ✅ Opsional
  status: string| null;
  terlambatKe?: string | null; // ✅ Opsional
  keterangan?: string | null;  // ✅ Opsional
  diperbarui: string;
  kategori?: KategoriPresensi | null; // ✅ Opsional
};

export const dataPresensi: Presensi[] = [
  {
    id: 1,
    tanggal: "Senin, 18 Maret 2024",
    masuk: "08:00",
    pulang: "17:00",
    kodeAbsen: "A123",
    status: "Hadir",
    terlambatKe: null,
    keterangan: "Tepat waktu",
    diperbarui: "18-03-2024 17:10",
    kategori: KategoriPresensi.MANUAL
  },
  {
    id: 2,
    tanggal: "Selasa, 19 Maret 2024",
    masuk: "08:05",
    pulang: "17:00",
    kodeAbsen: "A124",
    status: "Hadir",
    terlambatKe: "1",
    keterangan: "Terlambat 5 menit",
    diperbarui: "19-03-2024 17:10",
    kategori: KategoriPresensi.TERLAMBAT
  },
  {
    id: 3,
    tanggal: "Rabu, 20 Maret 2024",
    masuk: null,
    pulang: null,
    kodeAbsen: null,
    status: "Izin",
    terlambatKe: null,
    keterangan: "Sakit",
    diperbarui: "20-03-2024 17:10",
    kategori: null
  },
  {
    id: 4,
    tanggal: "Kamis, 21 Maret 2024",
    masuk: "08:00",
    pulang: "17:00",
    kodeAbsen: "A126",
    status: "Hadir",
    terlambatKe: null,
    keterangan: "Tepat waktu",
    diperbarui: "21-03-2024 17:10",
    kategori: KategoriPresensi.MANUAL
  },
  {
    id: 5,
    tanggal: "Jumat, 22 Maret 2024",
    masuk: "08:10",
    pulang: "17:00",
    kodeAbsen: "A127",
    status: "Hadir",
    terlambatKe: "2",
    keterangan: "Terlambat 10 menit",
    diperbarui: "22-03-2024 17:10",
    kategori: KategoriPresensi.TERLAMBAT
  },
  {
    id: 6,
    tanggal: "Sabtu, 23 Maret 2024",
    masuk: null,
    pulang: null,
    kodeAbsen: null,
    status: null,
    terlambatKe: null,
    keterangan: null,
    diperbarui: "29-03-2024 17:10",
    kategori: null
  },
  {
    id: 7,
    tanggal: "Minggu, 24 Maret 2024",
    masuk: null,
    pulang: null,
    kodeAbsen: null,
    status: null,
    terlambatKe: null,
    keterangan: null,
    diperbarui: "29-03-2024 17:10",
    kategori: null
  },
  {
    id: 8,
    tanggal: "Senin, 25 Maret 2024",
    masuk: "08:00",
    pulang: "17:00",
    kodeAbsen: "A130",
    status: "Hadir",
    terlambatKe: null,
    keterangan: "Tepat waktu",
    diperbarui: "25-03-2024 17:10",
    kategori: KategoriPresensi.MANUAL
  },
  {
    id: 9,
    tanggal: "Selasa, 26 Maret 2024",
    masuk: "08:20",
    pulang: "17:00",
    kodeAbsen: "A131",
    status: "Hadir",
    terlambatKe: "3",
    keterangan: "Terlambat 20 menit",
    diperbarui: "26-03-2024 17:10",
    kategori: KategoriPresensi.TERLAMBAT
  },
  {
    id: 10,
    tanggal: "Rabu, 27 Maret 2024",
    masuk: null,
    pulang: null,
    kodeAbsen: null,
    status: "Alpha",
    terlambatKe: null,
    keterangan: "Tanpa keterangan",
    diperbarui: "27-03-2024 17:10",
    kategori: KategoriPresensi.BLOK
  },
  {
    id: 11,
    tanggal: "Kamis, 28 Maret 2024",
    masuk: "08:00",
    pulang: "17:00",
    kodeAbsen: "A133",
    status: "Hadir",
    terlambatKe: null,
    keterangan: "Tepat waktu",
    diperbarui: "28-03-2024 17:10",
    kategori: KategoriPresensi.MANUAL
  },
  {
    id: 12,
    tanggal: "Jumat, 29 Maret 2024",
    masuk: "08:30",
    pulang: "17:00",
    kodeAbsen: "A134",
    status: "Hadir",
    terlambatKe: "4",
    keterangan: "Terlambat 30 menit",
    diperbarui: "29-03-2024 17:10",
    kategori: KategoriPresensi.TERLAMBAT
  },
  {
    id: 13,
    tanggal: "Sabtu, 30 Maret 2024",
    masuk: null,
    pulang: null,
    kodeAbsen: null,
    status: null,
    terlambatKe: null,
    keterangan: null,
    diperbarui: "29-03-2024 17:10",
    kategori: null
  },
  {
    id: 14,
    tanggal: "Minggu, 31 Maret 2024",
    masuk: null,
    pulang: null,
    kodeAbsen: null,
    status: null,
    terlambatKe: null,
    keterangan: null,
    diperbarui: "29-03-2024 17:10",
    kategori: null
  }
];


