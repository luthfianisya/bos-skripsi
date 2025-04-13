import { format } from "date-fns";
import { id } from "date-fns/locale";

// Daftar hari besar dalam setahun
const hariBesar = [
    { tanggal: "2025-03-27", nama: "Hari Raya Idul Fitri 1446 H" },
    { tanggal: "2025-03-28", nama: "Hari Raya Idul Fitri 1446 H" },
    { tanggal: "2025-12-25", nama: "Hari Raya Natal" },
    { tanggal: "2025-01-01", nama: "Tahun Baru 2025" },
    // Tambahkan hari besar lainnya sesuai kebutuhan
];

// Daftar kode absen
const kodeAbsenList = [
    { kode: "10", singkatan: "CT", istilah: "CUTI 2 TAHUN LALU", deskripsi: "Cuti yang dapat digunakan PNS jika selama 3 tahun terakhir belum pernah menggunakan cuti tahunan dan cuti besar" },
    { kode: "11", singkatan: "CT", istilah: "CUTI TAHUN SEKARANG", deskripsi: "Cuti yang tersedia untuk tahun ini" },
    { kode: "12", singkatan: "CT", istilah: "CUTI TAHUN LALU", deskripsi: "Cuti tahun lalu N-1 yang masih dapat digunakan" },
    { kode: "13", singkatan: "CP", istilah: "CUTI PENTING", deskripsi: "Cuti untuk keperluan pernikahan atau kondisi kedaruratan lainnya" },
    { kode: "14", singkatan: "CM", istilah: "CUTI MELAHIRKAN", deskripsi: "Cuti untuk persalinan 1 s.d. 3 untuk PNS" },
    { kode: "15", singkatan: "CB", istilah: "CUTI BESAR", deskripsi: "Cuti bagi PNS dengan masa kerja = 5 tahun" },
    { kode: "16", singkatan: "CS", istilah: "CUTI SAKIT", deskripsi: "Cuti bagi PNS yang sakit dengan melampirkan surat keterangan medis" },
    { kode: "17", singkatan: "CL", istilah: "CUTI LTN", deskripsi: "Cuti bagi PNS dengan masa kerja = 5 tahun dengan status PNS nya terputus dari semua kewajiban dan hak" },
    { kode: "18", singkatan: "CST1", istilah: "CUTI SETENGAH HARI PAGI", deskripsi: "Cuti bagi PNS karena keperluannya, melakukan presensi masuk bekerja paling lambat pukul 12.30 dan presensi pulang bekerja paling cepat jam 16.00 (Senin-Kamis) dan 16.30 (Jumat)" },
    { kode: "19", singkatan: "CST2", istilah: "CUTI SETENGAH HARI SIANG", deskripsi: "Cuti bagi PNS karena keperluannya, melakukan presensi masuk bekerja paling lambat pukul 07.30 dan presensi pulang bekerja paling cepat jam 12.00" },
    { kode: "21", singkatan: "TK", istilah: "TANPA KABAR", deskripsi: "Pegawai tidak hadir di kantor tanpa keterangan. Pegawai tidak melakukan presensi" },
    { kode: "32", singkatan: "CS1", istilah: "CUTI SAKIT TANPA POTONGAN", deskripsi: "Cuti untuk pegawai yang sakit dengan surat dokter minimal 3 hari atau menjalani rawat inap minimal 3 hari" },
    { kode: "33", singkatan: "CP1", istilah: "CUTI PENTING TANPA POTONGAN", deskripsi: "Cuti alasan penting dengan durasi 3-14 hari kerja" },
    { kode: "34", singkatan: "CM1", istilah: "CUTI MELAHIRKAN TANPA POTONGAN", deskripsi: "Cuti untuk persalinan anak ke 1 s.d. 3 tanpa potongan tunjangan kinerja" },
    { kode: "35", singkatan: "CB1", istilah: "CUTI BESAR TANPA POTONGAN", deskripsi: "Cuti bagi PNS dengan masa kerja = 5 tahun dengan alasan melahirkan anak ke 4, ibadah haji, dan ibadah agama lain" },
    { kode: "40", singkatan: "KN", istilah: "KONSINYASI", deskripsi: "Tugas dinas dalam rangka konsinyering pembiayaan instansi lain, blok presensi di kepegawaian" },
    { kode: "41", singkatan: "TD", istilah: "TUGAS DAERAH", deskripsi: "Tugas dinas keluar daerah pembiayaan instansi lain, blok presensi di kepegawaian" },
    { kode: "42", singkatan: "TL", istilah: "TUGAS LUAR", deskripsi: "Tugas dinas dalam kota, pembiayaan internal ataupun instansi lain" },
    { kode: "43", singkatan: "DL", istilah: "DINAS LUAR NEGERI", deskripsi: "Tugas dinas ke luar negeri pembiayaan internal. Kode absen ini digunakan untuk Form Permintaan tipe JLN sub tipe form Luar Negeri" },
    { kode: "45", singkatan: "PD", istilah: "PERJALANAN DINAS", deskripsi: "Tugas dinas dengan pembiayaan internal. Kode absen ini digunakan khusus untuk Realisasi Form Permintaan tipe form Perjalanan Dinas (JLN)" },
];

// Function to check if the date is a holiday
const isHariBesar = (tanggalISO: string) => hariBesar.find((hari) => hari.tanggal === tanggalISO);

// Get kategori presensi
const getKategoriPresensi = (
    kodeAbsen: string,
    tanggalISO: string,
    keterlambatan: number
): string => {
    // 1. Cek Hari Besar
    if (isHariBesar(tanggalISO)) {
        return "LIBUR";
    }

    // 2. Cek kode absen PD (Perjalanan Dinas)
    if (kodeAbsen.startsWith("PD")) {
        return "BLOK";
    }

    // 3. Cek MANUAL (jika bukan "-" dan bukan PD)
    if (kodeAbsen !== "-" && !kodeAbsen.startsWith("PD")) {
        return "MANUAL";
    }

    // 4. Cek TERLAMBAT
    if (keterlambatan > 0) {
        return "TERLAMBAT";
    }

    // 5. Default: HADIR
    return "HADIR";
};



// Get status presensi berdasarkan jam masuk dan pulang
const getStatusPresensi = (date: Date, jamPulang: string) => {
    //   const jamMasukDate = new Date(`${format(date, "yyyy-MM-dd")}T${jamMasuk}`);
    //   const jamPulangDate = new Date(`${format(date, "yyyy-MM-dd")}T${jamPulang}`);

    const isWFOL =
        (date.getDay() >= 1 && date.getDay() <= 4 && jamPulang >= "16:00") ||
        (date.getDay() === 5 && jamPulang >= "16:30");

    return isWFOL ? "WFOL" : Math.random() < 0.5 ? "WFH" : "WFO";
};

// Fungsi untuk menghitung keterlambatan
const getKeterlambatan = (jamMasuk: string, jamIdeal = "07:30") => {
    const jamMasukTime = new Date(`1970-01-01T${jamMasuk}:00`);
    const jamIdealTime = new Date(`1970-01-01T${jamIdeal}:00`);

    const terlambat = jamMasukTime.getTime() - jamIdealTime.getTime();
    return terlambat > 0 ? Math.floor(terlambat / 60000) : 0; // Return dalam menit
};


// Fungsi untuk mendapatkan kode absen
const getKodeAbsen = (masuk: string, pulang: string): string => {
    if (masuk === "-" && pulang === "-") {
        const randomKodeAbsen = kodeAbsenList[Math.floor(Math.random() * kodeAbsenList.length)];
        return `${randomKodeAbsen.singkatan} (${randomKodeAbsen.istilah})`;
    }
    return "-";
};

// Fungsi untuk menghasilkan data dummy presensi rentang tahun
export function generateDummyPresensiRentang(year = 2025): any[] {
    const data: any[] = [];
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);
    let counter = 1;

    let terlambatCount = 0;
    let currentMonth = -1;
    let terlambatPerMonth = 0;
    let absentDaysThisMonth = 0;

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const day = date.getDay();
        const month = date.getMonth();

        if (month !== currentMonth) {
            currentMonth = month;
            terlambatPerMonth = 0;
            absentDaysThisMonth = 0;
        }

        const tanggalISO = format(date, "yyyy-MM-dd");
        const hariBesarObj = isHariBesar(tanggalISO);

        // Jika hari besar, set kategori ke "LIBUR"
        if (hariBesarObj) {
            data.push({
                id: counter++,
                tanggal: format(date, "EEEE, dd MMMM yyyy", { locale: id }),
                tanggalISO,
                masuk: "-",
                pulang: "-",
                status: "-",
                kodeAbsen: "-",
                terlambatKe: "-",
                keterangan: hariBesarObj.nama,
                kategori: "LIBUR",
                diperbarui: "-",
            });
            continue;
        }

        // Jika hari Sabtu atau Minggu, set semua field selain tanggal menjadi "-"
        if (day === 0 || day === 6) {
            data.push({
                id: counter++,
                tanggal: format(date, "EEEE, dd MMMM yyyy", { locale: id }),
                tanggalISO,
                masuk: "-",
                pulang: "-",
                status: "-",
                kodeAbsen: "-",
                terlambatKe: "-",
                keterangan: "-",
                kategori: "-",
                diperbarui: "-",
            });
            continue;
        }

        let masuk = `${String(7).padStart(2, "0")}:${String(Math.floor(Math.random() * 36)).padStart(2, "0")}`;
        let pulang = `${String(16 + Math.floor(Math.random() * 3)).padStart(2, "0")}:${Math.floor(Math.random() * 60).toString().padStart(2, "0")}`;

        const keterlambatan = getKeterlambatan(masuk);
        let terlambatKe = "-";
        let keterlambatanKeterangan = "-";

        if (keterlambatan > 0 && terlambatPerMonth < 2) {
            terlambatPerMonth++;
            terlambatKe = `${terlambatPerMonth}`;
            keterlambatanKeterangan = `Terlambat ke-${terlambatPerMonth}`;
        }

        let status = getStatusPresensi(new Date(date), pulang);
        const kodeAbsen = getKodeAbsen(masuk, pulang);
        let kategori = getKategoriPresensi(kodeAbsen, tanggalISO, keterlambatan);

        // Pastikan hanya 2 hari absensi "-" per bulan
        if (day >= 1 && day <= 5) {
            if (absentDaysThisMonth < 2 && Math.random() < 0.05) {
                masuk = "-";
                pulang = "-";
                status = "-";
                kategori = "-";
                absentDaysThisMonth++;
            }
        }

        const sumber = "PRESENSI BPS";

        data.push({
            id: counter++,
            tanggal: format(date, "EEEE, dd MMMM yyyy", { locale: id }),
            tanggalISO,
            masuk,
            pulang,
            status,
            kodeAbsen,
            terlambatKe,
            keterangan: keterlambatanKeterangan,
            kategori,
            diperbarui: `[${format(date, "yyyy-MM-dd HH:mm:ss")}] ${sumber}`,
        });
    }

    return data;
}
