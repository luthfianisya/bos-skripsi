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

export interface Realisasi {
  noPermintaan: string;
  deskripsi: string;
  noSurat: string;
  paguBooked: number;
  paguReali: number;
}
