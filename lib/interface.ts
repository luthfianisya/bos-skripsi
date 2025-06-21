import { PerjalananDinas } from "@/app/administrator/(permintaan)/tambah-permintaan/components/peserta-berangkat-table/columns";
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
  pesertaBerangkat: PerjalananDinas[];
  kategoriPeserta: string;
}

export interface Realisasi {
  noPermintaan: string;
  deskripsi: string;
  noSurat: string;
  paguBooked: number;
  paguReali: number;
}
