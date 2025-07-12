import { Peserta } from "@/app/administrator/(permintaan)/tambah-permintaan/components/peserta-berangkat-table/columns";
import { ApprovalStatus } from "./type";

// for calendar
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  extendedProps: {
    calendar: string;
  };
}

export interface CalendarCategory {
  label: string;
  value: string;
  activeClass?: string;
  className?: string;
}

export interface Form {
  noPermintaan: string;
  deskripsi: string;
  noSurat: string;
  pembuat: string;
  jumlahUsulan: number;
  tipeForm: string;
  approvals: {
    operator: ApprovalStatus;
    pj: ApprovalStatus;
    ppk: ApprovalStatus;
  };
}

export interface FullForm {
  noPermintaan: string;
  deskripsi: string;
  noSurat: string;
  pembuat: string;
  tipeForm: string;
  subTipeForm?: string;
  jenisPok: "single" | "multi";
  tanggalSurat: string;
  uploadKAK: File | null;
  linkPermintaan: string;
  jumlahUsulan: number;
  approvals: {
    operator: ApprovalStatus;
    pj: ApprovalStatus;
    ppk: ApprovalStatus;
  };
  pokTerpilih: any[]; // bisa ditentukan lebih spesifik
  pesertaBerangkat: Peserta[];
  kategoriPeserta: string;
}

export interface FormPOK {
  id: string; 
  grup: string;
  deskripsi: string;
  detail: string;
  noSurat: string;
  paguBooked: number;
  paguReali: number;
  noPermintaan: string;
  details?: PegawaiDetail[]; 
}

export interface PegawaiDetail {
  nama: string;
  nip: string;
  nomorSpd: string;
  tanggalSpd: string;
  tujuan: string;
  booked: number;
  realisasi: number;
  status: string;
}

export interface Realisasi {
  noPermintaan: string;
  deskripsi: string;
  noSurat: string;
  paguBooked: number;
  paguReali: number;
}

export interface Komponen {
  code: string;
  label: string;
}

export interface Suboutput {
  code: string;
  label: string;
  komponen: Komponen[];
}

export interface Output {
  code: string;
  label: string;
  suboutput: Suboutput[];
}

export interface Kegiatan {
  code: string;
  label: string;
  output: Output[];
}

export interface Program {
  code: string;
  label: string;
  kegiatan: Kegiatan[];
}

export interface SimulasiPerjalanan {
  nama: string;
  gol: string;
  asal: string;
  tujuan: string;
  tanggalPergi: string;
  tanggalPulang: string;
  transportPergi: number;
  transportPulang: number;
  taksiAsal: number;
  taksiTujuan: number;

  lamaTranslok: number;
  rateTranslok: number;
  totalTranslok: number;

  lamaHotel: number;
  rateHotel: number;
  totalHotel: number;

  lamaUangHarian: number;
  rateUangHarian: number;
  totalUangHarian: number;

  lamaUangSaku: number;
  rateUangSaku: number;
  totalUangSaku: number;

  lamaRepresentatif: number;
  rateRepresentatif: number;
  totalRepresentatif: number;

  totalSemua: number;
}
