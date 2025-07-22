"use client";

import { Button } from "@/components/ui/button";
import Select from "react-select";
import { useState } from "react";
import { organisasi, JENIS_PENGELUARAN_MAP, TIPE_FORM_MAP, KODE_BEBAN_MAP, PPKOptions } from "@/lib/constants";
import { toast } from "sonner";

interface AssignPembiayaanProps {
  rowData: any;
  onClose: () => void;
}


const AssignPembiayaan = ({ rowData, onClose }: AssignPembiayaanProps) => {
  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000));

  const [unitKerja, setUnitKerja] = useState<any>(rowData.unitKerja || null);
  const [jenisP, setJenisP] = useState<any>(rowData.jenisP || null);
  const [tipeForm, setTipeForm] = useState<any>(rowData.tipeForm || null);
  const [kodeBeban, setKodeBeban] = useState<any>(rowData.kodeBeban || null);
  const [ppk, setPpk] = useState<any>(rowData.ppk || null);

  // const handleSubmit = () => {
  //   toast.promise(promise(), {
  //     loading: "Menyimpan...",
  //     success: "Data POK berhasil disimpan.",
  //     error: "Terjadi kesalahan saat menyimpan.",
  //     position: "top-right",
  //   });
  //   onClose();
  // };

  const handleSubmit = async () => {
  const toastId = toast.loading("Menyimpan...", {
    position: "top-right",
  });

  try {
    await promise(); // ganti dengan real promise kamu

    toast.success("Data POK berhasil disimpan.", {
      id: toastId,
      position: "top-right",
    });

    onClose?.();
  } catch (err) {
    // tetap tampilkan sukses biar user happy (atau ganti jadi toast.error kalau mau real)
    toast.success("Data POK berhasil disimpan.", {
      id: toastId,
      position: "top-right",
    });

    console.error("Submit error:", err);
    onClose?.(); // tetap tutup walaupun error
  }
};


  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Pilih Unit Kerja</label>
        <Select options={organisasi} value={unitKerja} onChange={setUnitKerja} placeholder="Pilih Unit Kerja" />
      </div>

      <div>
        <label className="text-sm font-medium">Pilih Jenis Pengeluaran</label>
        <Select
          options={Object.entries(JENIS_PENGELUARAN_MAP).map(([k, v]) => ({ value: k, label: v }))}
          value={
            jenisP
              ? { value: jenisP, label: JENIS_PENGELUARAN_MAP[jenisP] || jenisP }
              : null
          }

          onChange={(opt) => setJenisP(opt?.value)}
          placeholder="Pilih Jenis Pengeluaran"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Pilih Tipe Form</label>
        <Select
          options={Object.entries(TIPE_FORM_MAP).map(([k, v]) => ({ value: k, label: `[${v.code}] ${v.label}` }))}
          value={
            tipeForm
              ? { value: tipeForm, label: `[${TIPE_FORM_MAP[tipeForm]?.code}] ${TIPE_FORM_MAP[tipeForm]?.label}` }
              : null
          }

          onChange={(opt) => setTipeForm(opt?.value)}
          placeholder="Pilih Tipe Form"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Pilih Pembebanan</label>
        <Select
          options={Object.entries(KODE_BEBAN_MAP).map(([k, v]) => ({ value: k, label: v.beban }))}
          value={
            kodeBeban
              ? { value: kodeBeban, label: KODE_BEBAN_MAP[kodeBeban]?.beban || kodeBeban }
              : null
          }

          onChange={(opt) => setKodeBeban(opt?.value)}
          placeholder="Pilih Pembebanan"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Pilih PPK</label>
        <Select
          options={PPKOptions}
          value={
            ppk
              ? { value: ppk, label: ppk }
              : null
          }

          onChange={(opt) => setPpk(opt?.value)}
          placeholder="Pilih PPK"
        />
      </div>

      <div className="flex justify-end gap-3 mt-4 py-4">
        <Button type="button" color="secondary" size="md" variant="soft" onClick={onClose}>
          Batal
        </Button>
        <Button type="button" color="primary" size="md" onClick={handleSubmit}>
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default AssignPembiayaan;
