import { faker } from "@faker-js/faker";

type POKStatus = "terpakai" | "revisi" | "tidak_terpakai";

export interface POK {
  grup: string;
  detail: string;
  paguAwal: number;
  paguRevisi: number;
  paguBooked: number;
  paguReali: number;
  selfBlocking: number;
  paguSisa: number;
  sumber: string;
  kodeBeban: string;
  jenisP: string;
  hargaSatuan: number;
  volume: number;
  satuan: string;
  tipeForm: string;
  ppk: string;
  unitKerja: string;
  status: POKStatus;
}

const jenisPengeluaran = [
  { kode: "2", nama: "Borongan" },
  { kode: "3", nama: "Perjalanan Dinas" },
  { kode: "4", nama: "Pembahasan" },
  { kode: "5", nama: "Bahan" },
  { kode: "6", nama: "Pengiriman" },
  { kode: "7", nama: "Operasional Lainnya" },
  { kode: "8", nama: "Pencetakan" },
  { kode: "9", nama: "Pokja" },
  { kode: "10", nama: "Rapat" },
  { kode: "11", nama: "Translok" },
  { kode: "12", nama: "Jasa Profesi" },
  { kode: "13", nama: "Jasa Konsultan" },
  { kode: "14", nama: "Jasa Lainnya" },
  { kode: "15", nama: "Sewa" },
  { kode: "16", nama: "Operasional Perkantoran" },
];

const tipeFormList = [
  { tipeForm: "FORM - JLN", deskripsi: "Belanja Perjalanan Dinas Biasa" },
  { tipeForm: "FORM - NON OPR", deskripsi: "Belanja Barang Non Operasional" },
  { tipeForm: "FORM - BAHAN", deskripsi: "Belanja Bahan" },
  { tipeForm: "FORM - PERSEDIAAN", deskripsi: "Belanja Persediaan" },
  { tipeForm: "FORM - PEMELIHARAAN", deskripsi: "Belanja Pemeliharaan" },
  { tipeForm: "FORM - MODAL", deskripsi: "Belanja Modal" },
  { tipeForm: "FORM - SEWA", deskripsi: "Belanja Sewa" },
  { tipeForm: "FORM - JASA KONSULTAN", deskripsi: "Belanja Jasa Konsultan" },
  { tipeForm: "FORM - JASA PROFESI", deskripsi: "Belanja Jasa Profesi" },
  { tipeForm: "FORM - HONOR", deskripsi: "Honor Output Kegiatan" },
  { tipeForm: "FORM - FULLDAY/HALFDAY", deskripsi: "Paket Pertemuan" },
  { tipeForm: "FORM - FULLBOARD DALAM KOTA", deskripsi: "Paket Meeting DK" },
  { tipeForm: "FORM - FULLBOARD LUAR KOTA", deskripsi: "Paket Meeting LK" },
  { tipeForm: "FORM - TRANSLOK", deskripsi: "Belanja Translok" },
  { tipeForm: "FORM -JASA LAINNYA", deskripsi: "Belanja Jasa Lainnya" },
  { tipeForm: "FORM - PERKANTORAN", deskripsi: "Belanja Perkantoran" },
  { tipeForm: "FORM – PAKET MEETING LAINNYA", deskripsi: "Meeting Lainnya" },
  { tipeForm: "FORM - OPERASIONAL", deskripsi: "Barang Operasional" },
  { tipeForm: "FORM - BELANJA LANGGANAN", deskripsi: "Langganan" },
  { tipeForm: "FORM - LEMBUR", deskripsi: "Lembur" },
  { tipeForm: "FORM - PENGHASILAN", deskripsi: "Belanja Penghasilan" },
];

const sumberDanaMap: Record<string, string> = {
  A: "RM",
  B: "PLN",
  C: "RMP",
  D: "PNBP",
  E: "PDN",
  F: "BLU",
  G: "STM",
  H: "HDN",
  I: "HLN",
  K: "PBS",
};

const statusList: POKStatus[] = ["terpakai", "revisi", "tidak_terpakai"];
const satuanList = ["Orang", "Hari", "Unit", "Paket", "Dokumen"];
const ppkList = ["Rina Cahyani", "Ahmad Fauzi", "Dewi Kartika", "Budi Santoso"];
const unitKerjaList = ["BPS Provinsi", "BPS Kabupaten/Kota", "BPS Pusat"];

export function generateDummyPOK(count = 50): POK[] {
    const data: POK[] = [];
  
    for (let i = 0; i < count; i++) {
      const jenis = faker.helpers.arrayElement(jenisPengeluaran);
      const tipe = faker.helpers.arrayElement(tipeFormList);
      const kodeBeban = faker.helpers.arrayElement(Object.keys(sumberDanaMap));
      const sumber = sumberDanaMap[kodeBeban];
      const volume = faker.number.int({ min: 10, max: 100 });
      const hargaSatuan = faker.helpers.arrayElement([
        50000, 75000, 100000, 250000, 500000, 750000, 1000000, 1500000, 2000000,
      ]);
  
      const paguAwal = volume * hargaSatuan;
      const revisiOffset = faker.helpers.arrayElement([
        -2000000, -1000000, 0, 1000000, 2000000, 5000000,
      ]);
      const paguRevisi = paguAwal + revisiOffset;
      const paguBooked = Math.round(faker.number.int({ min: 0, max: paguRevisi * 0.5 }) / 100000) * 100000;
      const paguReali = Math.round(faker.number.int({ min: 0, max: paguBooked }) / 100000) * 100000;
      const selfBlocking = Math.round(
        faker.number.int({ min: 0, max: paguRevisi - paguBooked - paguReali }) / 100000
      ) * 100000;
      const paguSisa = paguRevisi - paguBooked - paguReali - selfBlocking;
  
      const pok: POK = {
        grup: `GG ${faker.number.int({ min: 1000, max: 9999 })} ${faker.string.alpha(3).toUpperCase()} ${faker.number.int({ min: 100, max: 999 })} ${faker.string.alpha(3).toUpperCase()} 521811 1`,
        detail: tipe.deskripsi,
        paguAwal,
        paguRevisi,
        paguBooked,
        paguReali,
        selfBlocking,
        paguSisa,
        sumber,
        kodeBeban,
        jenisP: jenis.kode,
        hargaSatuan,
        volume,
        satuan: faker.helpers.arrayElement(satuanList),
        tipeForm: tipe.tipeForm,
        ppk: faker.helpers.arrayElement(ppkList),
        unitKerja: "BPS Kabupaten/Kota",
        status: faker.helpers.arrayElement(statusList),
      };
  
      data.push(pok);
    }
  
    return data;
  }
  