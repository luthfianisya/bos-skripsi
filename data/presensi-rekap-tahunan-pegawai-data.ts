import { DUMMY_PRESENSI_BULANAN } from "./presensi-bulanan-data";

interface RekapBulanan {
  bulan: number; // 1 sampai 12
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

interface PegawaiPresensi {
    nama: string;
    nip: string;
    [key: string]: string; // Ini biar bebas akses "01"-"30"
  }
  

export const generateRekapTahunanPegawai = (): RekapBulanan[] => {
  const rekapData: RekapBulanan[] = [];

  for (let month = 1; month <= 12; month++) {
    if (month === 1) {
      const pegawai = DUMMY_PRESENSI_BULANAN[0];
      const rekap: RekapBulanan = {
        bulan: month,
        hk: 22,
        hd: 0,
        tk: 0,
        tl: 0,
        tb: 0,
        pd: 0,
        dk: 0,
        kn: 0,
        cb: 0,
        cl: 0,
        cm: 0,
        cp: 0,
        cs: 0,
        ct10: 0,
        ct11: 0,
        ct12: 0,
        cst1: 0,
        cst2: 0,
        cs1: 0,
        cp1: 0,
        cm1: 0,
        cb1: 0,
        psw: 0,
        psw1: 0,
        psw2: 0,
        psw3: 0,
        psw4: 0,
        ht: 0,
        tl1: 0,
        tl2: 0,
        tl3: 0,
        tl4: 0,
        kjkHt: 0,
        kjkPsw: 0,
        kjk: 0,
        diperbarui: new Date().toISOString(),
      };

      for (let i = 1; i <= 30; i++) {
        const key = i.toString().padStart(2, "0");
        const value = (pegawai as any)[key];

        if (!value) continue;

        if ((rekap as any).hasOwnProperty(value.toLowerCase())) {
          const lowerKey = value.toLowerCase();
          (rekap as any)[lowerKey]++;
        } else {
          rekap.hd++;
        }
      }

      rekapData.push(rekap);
    } else {
      // Bulan lain kosong
      rekapData.push({
        bulan: month,
        hk: 0,
        hd: 0,
        tk: 0,
        tl: 0,
        tb: 0,
        pd: 0,
        dk: 0,
        kn: 0,
        cb: 0,
        cl: 0,
        cm: 0,
        cp: 0,
        cs: 0,
        ct10: 0,
        ct11: 0,
        ct12: 0,
        cst1: 0,
        cst2: 0,
        cs1: 0,
        cp1: 0,
        cm1: 0,
        cb1: 0,
        psw: 0,
        psw1: 0,
        psw2: 0,
        psw3: 0,
        psw4: 0,
        ht: 0,
        tl1: 0,
        tl2: 0,
        tl3: 0,
        tl4: 0,
        kjkHt: 0,
        kjkPsw: 0,
        kjk: 0,
        diperbarui: new Date().toISOString(),
      });
    }
  }

  return rekapData;
};

export const DUMMY_RKP_TAHUN_PEGAWAI = generateRekapTahunanPegawai();
