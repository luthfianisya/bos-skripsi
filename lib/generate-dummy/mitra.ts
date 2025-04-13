export interface Mitra {
    id: number;
    nama: string;
    nip: string;
    organisasi: string;
    eselon?: string;
    gol?: string;
    instansi?: string;
    jabatan?: string;
    email: string;
    wilayah: string;
  }
  
  const organisasiOptions = [
    "[03100] Mitra Pengemudi",
    "[04100] Mitra Taman",
    "[04110] Mitra Taman Komplek",
    "[04400] Mitra Resepsionis",
    "[04500] Mitra Poliklinik",
    "[04900] Mitra Penata Arsip",
    "[05100] Mitra Petugas Kebersihan",
    "[05400] Mitra Teknisi",
    "[05500] Mitra Satpam",
    "[05800] Mitra Administrasi",
    "[05900] Mitra STIS",
    "[06600] Mitra Orang luar",
    "[06770] Mitra Sensus/Survei Sobat",
    "[06790] Mitra Pengolahan",
    "[08500] Mitra Magang"
  ];
  
  const wilayahList = [
    "Jakarta", "Bandung", "Surabaya", "Medan", "Semarang", 
    "Yogyakarta", "Makassar", "Palembang", "Denpasar", "Padang"
  ];
  
  const namaDepanLaki = ["Andi", "Budi", "Dedi", "Eko", "Fajar", "Gilang", "Hadi", "Iqbal", "Joko", "Kurniawan"];
  const namaBelakangLaki = ["Saputra", "Santoso", "Wijaya", "Purnama", "Haryanto"];
  const namaDepanPerempuan = ["Ayu", "Bella", "Citra", "Dewi", "Eka", "Fitri", "Gita", "Indah", "Lestari", "Maya"];
  const namaBelakangPerempuan = ["Susanti", "Permata", "Anggraini", "Melati", "Wulandari"];
  
  const domainAlternatif = ["gmail.com", "yahoo.com", "outlook.com", "mail.com"];
  
  function generateNIPLama(i: number): string {
    const kodeInstansi = String(Math.floor(Math.random() * 99) + 1).padStart(2, '0');
    const nomorUrut = String(1000000 + i).padStart(7, '0');
    return `${kodeInstansi}${nomorUrut}`;
  }
  
  export function generateDummyMitra(count: number): Mitra[] {
    const data: Mitra[] = [];
  
    for (let i = 0; i < count; i++) {
      const isFemale = Math.random() < 0.5;
      const depan = isFemale
        ? namaDepanPerempuan[Math.floor(Math.random() * namaDepanPerempuan.length)]
        : namaDepanLaki[Math.floor(Math.random() * namaDepanLaki.length)];
      const belakang = isFemale
        ? namaBelakangPerempuan[Math.floor(Math.random() * namaBelakangPerempuan.length)]
        : namaBelakangLaki[Math.floor(Math.random() * namaBelakangLaki.length)];
      const fullName = `${depan} ${belakang}`;
      const wilayah = wilayahList[Math.floor(Math.random() * wilayahList.length)];
      const organisasi = organisasiOptions[Math.floor(Math.random() * organisasiOptions.length)];
  
      // Email domain
      const domain = Math.random() < 0.7 ? "bps.go.id" : domainAlternatif[Math.floor(Math.random() * domainAlternatif.length)];
      const email = `${depan.toLowerCase()}.${belakang.toLowerCase()}${i}@${domain}`;
  
      // Default optional fields
      let eselon: string | undefined;
      let gol: string | undefined;
      let instansi: string | undefined;
      let jabatan: string | undefined;
  
      // Klasifikasi berdasarkan organisasi
      if (organisasi.includes("Mitra STIS") || organisasi.includes("Mitra Magang")) {
        jabatan = "Mahasiswa Magang";
        instansi = "STIS";
      } else if (organisasi.includes("Satpam")) {
        jabatan = "Satpam";
        instansi = "BPS";
      } else if (organisasi.includes("Petugas Kebersihan")) {
        jabatan = "Cleaning Service";
        instansi = "BPS";
      } else if (organisasi.includes("Pengemudi")) {
        jabatan = "Sopir";
        instansi = "BPS";
      } else if (organisasi.includes("Taman")) {
        jabatan = "Petugas Taman";
        instansi = "BPS";
      } else if (organisasi.includes("Resepsionis")) {
        jabatan = "Resepsionis";
        instansi = "BPS";
      } else if (organisasi.includes("Poliklinik")) {
        jabatan = "Tenaga Medis";
        instansi = "BPS";
      } else if (organisasi.includes("Penata Arsip")) {
        jabatan = "Petugas Arsip";
        instansi = "BPS";
      } else if (organisasi.includes("Teknisi")) {
        jabatan = "Teknisi";
        instansi = "BPS";
      } else if (organisasi.includes("Administrasi")) {
        jabatan = "Staff Administrasi";
        instansi = "BPS";
        gol = "II/C";
      } else if (organisasi.includes("Sensus") || organisasi.includes("Pengolahan")) {
        jabatan = "Mitra Sensus";
        instansi = "BPS";
      }
  
      const nip = generateNIPLama(i);
  
      data.push({
        id: i + 1,
        nama: fullName,
        nip,
        organisasi,
        eselon,
        gol,
        instansi,
        jabatan,
        email,
        wilayah,
      });
    }
  
    return data;
  }
  