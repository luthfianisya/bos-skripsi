// import { TipeForm } from "@/app/administrator/(permintaan)/form-permintaan/components/columns"; // pastikan path-nya sesuai
// import { Form } from "@/app/administrator/(permintaan)/form-permintaan/components/columns";

// const tahun = 2025;
// const noSatker = "637148";
// const unitKerja = "92800";

// const namaLaki = ["Andi Pratama", "Rian Hidayat", "Budi Santoso", "Deni Nugroho", "Fajar Ramadhan"];
// const namaPerempuan = ["Siti Aisyah", "Dewi Lestari", "Ayu Puspita", "Nina Marlina", "Lina Kartika"];

// const kegiatan = [
//   "Transport Lokal petugas pengawasan lapangan survei IMK triwulanan",
//   "Pengadaan alat tulis kantor untuk kebutuhan rutin",
//   "Jasa Konsultan Analisis Data Sensus Ekonomi",
//   "Honor narasumber pelatihan SP2025",
//   "Sewa kendaraan operasional survei harga konsumen",
//   "Pembelian bahan publikasi digital BPS",
//   "Biaya rapat koordinasi teknis statistik tahunan",
//   "Pengeluaran konsumsi kegiatan pelatihan Enumerator",
//   "Lembur petugas input data lapangan",
//   "Operasional pencetakan kuesioner survei tenaga kerja"
// ];

// const generateNoPermintaan = (index: number): string => {
//   const nomorUrut = (index + 1).toString().padStart(3, "0");
//   const isDepok = index % 2 === 0;
//   const satker = noSatker;
//   const unit = unitKerja;
//   return `FP-${tahun}-${satker}-${unit}-${nomorUrut}`;
// };

// const generateNoSurat = (index: number): string => {
//   const nomor = (index + 1).toString().padStart(4, "0");
//   const suffix = String.fromCharCode(65 + (index % 26)); // A-Z loop
//   return `B-${nomor}${suffix}/${noSatker}/KU.600/04/${tahun}`;
// };

// const tipeForms = Object.values(TipeForm);
// const statuses: ("approved" | "submit" | "rejected" | "pending")[] = [
//   "approved", "submit", "rejected", "pending"
// ];

// const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// export const generateDummyForms = (count = 50): Form[] => {
//     const forms: Form[] = [];
  
//     for (let i = 0; i < count; i++) {
//       const isMale = i % 2 === 0;
//       const pembuat = isMale ? getRandom(namaLaki) : getRandom(namaPerempuan);
  
//       // Menghasilkan jumlah usulan antara 100.000 hingga 50.000.000 dalam kelipatan 100.000
//       const kelipatan = 100000;
//       const min = 1; // 1 x 100.000 = 100.000
//       const max = 500; // 500 x 100.000 = 50.000.000
//       const jumlahUsulan = getRandom(
//         Array.from({ length: max - min + 1 }, (_, i) => (i + min) * kelipatan)
//       );
  
//       const form: Form = {
//         noPermintaan: generateNoPermintaan(i),
//         deskripsi: getRandom(kegiatan),
//         noSurat: generateNoSurat(i),
//         pembuat,
//         jumlahUsulan,
//         tipeForm: getRandom(tipeForms),
//         approvals: {
//           operator: getRandom(statuses),
//           pj: getRandom(statuses),
//           ppk: getRandom(statuses),
//         },
//       };
  
//       forms.push(form);
//     }
  
//     return forms;
//   };
  