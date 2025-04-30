import { dataForm } from "./form-permintaan-data";

export const dummyRealisasiPermintaan = dataForm
  .filter((item) =>
    item.approvals.operator === "submit" &&
    item.approvals.pj === "approved" &&
    item.approvals.ppk === "approved"
  )
  .map((item) => ({
    noPermintaan: item.noPermintaan,
    deskripsi: item.deskripsi,
    noSurat: item.noSurat,
    paguBooked: item.jumlahUsulan,
    paguReali: item.jumlahUsulan, // contoh: realisasi 95% dari usulan
  }));
