export interface Presensi {
    id: number;
    tanggal: string;
    masuk: string;
    pulang: string;
    status: string;
    kodeAbsen: string;
    terlambatKe: string;
    keterangan: string;
    diperbarui: string;
  }

export const presensiData: Presensi[] = [
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
  