export interface RekapTahunan {
    nip: string;
    nama: string;
    bulan: string; // Contoh: "Januari", "Februari"
    tahun: string; // Contoh: "2024"
    hk: number;
    hd: number;
    tk: number;
    tl: number;
    tb: number;
    pd: number;
    dk: number;
    kn: number;
    cb: number;
    cl: number;
    cm: number;
    cp: number;
    cs: number;
    ct10: number;
    ct11: number;
    ct12: number;
    cst1: number;
    cst2: number;
    cs1: number;
    cp1: number;
    cm1: number;
    cb1: number;
    psw: number;
    psw1: number;
    psw2: number;
    psw3: number;
    psw4: number;
    ht: number;
    tl1: number;
    tl2: number;
    tl3: number;
    tl4: number;
    kjkHt: number;
    kjkPsw: number;
    kjk: number;
    diperbarui: string;
  }

  export const presensiData: RekapTahunan[] = [
      // {
      //   id: 1,
      //   tanggal: "Senin, 04 Maret 2024",
      //   masuk: "08:05",
      //   pulang: "16:30",
      //   status: "Hadir",
      //   kodeAbsen: "A123",
      //   terlambatKe: "1",
      //   keterangan: "Terlambat 5 menit",
      //   diperbarui: "04 Maret 2024 17:00",
      // },
      // {
      //   id: 2,
      //   tanggal: "Selasa, 05 Maret 2024",
      //   masuk: "07:55",
      //   pulang: "16:30",
      //   status: "Hadir",
      //   kodeAbsen: "A124",
      //   terlambatKe: "0",
      //   keterangan: "-",
      //   diperbarui: "05 Maret 2024 17:00",
      // },
      // {
      //   id: 3,
      //   tanggal: "Rabu, 06 Maret 2024",
      //   masuk: "08:10",
      //   pulang: "16:30",
      //   status: "Hadir",
      //   kodeAbsen: "A125",
      //   terlambatKe: "2",
      //   keterangan: "Terlambat 10 menit",
      //   diperbarui: "06 Maret 2024 17:00",
      // },
    ];