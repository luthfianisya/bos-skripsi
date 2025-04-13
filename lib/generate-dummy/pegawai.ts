import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export interface Pegawai {
  id: number;
  nama: string;
  avatar: string;
  nip: string;
  nipBaru: string;
  wilayah: string;
  unitKerja: string;
  gol: string;
  jabatan: string;
}

const wilayahUnitMap: Record<string, string[]> = {
  "Jakarta": ["BPS Jakarta Pusat", "BPS Jakarta Barat", "BPS Jakarta Timur", "BPS Jakarta Selatan", "BPS Jakarta Utara"],
  "Bandung": ["BPS Kota Bandung", "BPS Kabupaten Bandung", "BPS Bandung Barat"],
  "Surabaya": ["BPS Kota Surabaya", "BPS Kabupaten Sidoarjo", "BPS Kabupaten Gresik"],
  "Medan": ["BPS Kota Medan", "BPS Kabupaten Deli Serdang", "BPS Kabupaten Langkat"],
  "Semarang": ["BPS Kota Semarang", "BPS Kabupaten Semarang", "BPS Kabupaten Demak"],
  "Makassar": ["BPS Kota Makassar", "BPS Kabupaten Gowa", "BPS Kabupaten Maros"],
  "Yogyakarta": ["BPS Kota Yogyakarta", "BPS Kabupaten Sleman", "BPS Kabupaten Bantul"],
  "Denpasar": ["BPS Kota Denpasar", "BPS Kabupaten Badung", "BPS Kabupaten Gianyar"],
  "Pontianak": ["BPS Kota Pontianak", "BPS Kabupaten Kubu Raya", "BPS Kabupaten Mempawah"],
  "Palembang": ["BPS Kota Palembang", "BPS Kabupaten Banyuasin", "BPS Kabupaten Ogan Ilir"]
};

const golList = [
  "I/A", "I/B", "II/A", "II/B", "II/C", "III/A", "III/B", "III/C", "III/D", "IV/A", "IV/B"
];

const jabatanList = [
  "Statistisi Ahli Pertama", "Statistisi Ahli Muda", "Statistisi Ahli Madya",
  "Statistisi Penyelia", "Statistisi Terampil", "Asisten Statistisi",
  "Kepala Seksi Neraca Wilayah", "Kepala Bidang Statistik Sosial"
];

const namaDepanLaki = [
  "Andi", "Budi", "Dedi", "Eko", "Fajar", "Gilang", "Hadi", "Iqbal", "Joko", "Kurniawan",
  "Lukman", "Mahmud", "Nugroho", "Rizky", "Teguh", "Wahyu", "Yusuf", "Zainal"
];

const namaBelakangLaki = [
  "Saputra", "Santoso", "Wijaya", "Purnama", "Haryanto", "Siregar", "Gunawan", "Nugraha", "Mahendra", "Subekti"
];

const namaDepanPerempuan = [
  "Ayu", "Bella", "Citra", "Dewi", "Eka", "Fitri", "Gita", "Indah", "Lestari", "Maya",
  "Nadia", "Putri", "Ratna", "Sari", "Tiara", "Utami", "Vania", "Wulan"
];

const namaBelakangPerempuan = [
  "Susanti", "Permata", "Anggraini", "Melati", "Puspitasari", "Wulandari", "Pratiwi", "Yuliana", "Rosdiana", "Safitri"
];

export function generateDummyPegawai(count: number = 1000): Pegawai[] {
    const data: Pegawai[] = [];
  
    for (let i = 1; i <= count; i++) {
      const isFemale = Math.random() < 0.5;
  
      const depan = isFemale
        ? faker.helpers.arrayElement(namaDepanPerempuan)
        : faker.helpers.arrayElement(namaDepanLaki);
  
      const belakang = isFemale
        ? faker.helpers.arrayElement(namaBelakangPerempuan)
        : faker.helpers.arrayElement(namaBelakangLaki);
  
      const nama = `${depan} ${belakang}`;
      const avatar = `/images/avatar/avatar-${faker.number.int({ min: 1, max: 10 })}.jpg`;
  
      const wilayah = faker.helpers.arrayElement(Object.keys(wilayahUnitMap));
      const unitKerja = faker.helpers.arrayElement(wilayahUnitMap[wilayah]);
      const gol = faker.helpers.arrayElement(golList);
      const jabatan = faker.helpers.arrayElement(jabatanList);
  
      // === NIP BARU (18 digit) ===
      const birthDate = faker.date.birthdate({ min: 1960, max: 1995, mode: 'year' });
      const formattedBirth = dayjs(birthDate).format('YYYYMMDD');
  
      const pengangkatanDate = faker.date.between({ from: '2005-01-01', to: '2020-12-31' });
      const formattedPengangkatan = dayjs(pengangkatanDate).format('YYYYMM');
  
      const jenisKelamin = isFemale ? '2' : '1';
      const nomorUrut = String(faker.number.int({ min: 1, max: 999 })).padStart(3, '0');
  
      const nipBaru = `${formattedBirth}${formattedPengangkatan}${jenisKelamin}${nomorUrut}`;
  
      // === NIP LAMA (9 digit) ===
      const kodeInstansi = String(faker.number.int({ min: 1, max: 99 })).padStart(2, '0');
      const urutLama = String(faker.number.int({ min: 1, max: 9999999 })).padStart(7, '0');
      const nipLama = `${kodeInstansi}${urutLama}`;
  
      data.push({
        id: i,
        nama,
        avatar,
        nip: nipLama,
        nipBaru: nipBaru,
        wilayah,
        unitKerja,
        gol,
        jabatan,
      });
    }
  
    return data;
  }
  
