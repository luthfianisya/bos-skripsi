"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select"; // pakai react-select ya!

const StepInformasiUmum = () => {
  const satkerOptions = [
    { value: "satker1", label: "Satker 1" },
    { value: "satker2", label: "Satker 2" },
  ];

  const outputOptions = [
    { value: "output1", label: "Output 1" },
    { value: "output2", label: "Output 2" },
  ];

  const programOptions = [
    { value: "program1", label: "Program 1" },
    { value: "program2", label: "Program 2" },
  ];

  const subOutputOptions = [
    { value: "suboutput1", label: "Sub Output 1" },
    { value: "suboutput2", label: "Sub Output 2" },
  ];

  const kegiatanOptions = [
    { value: "kegiatan1", label: "Kegiatan 1" },
    { value: "kegiatan2", label: "Kegiatan 2" },
  ];

  const komponenOptions = [
    { value: "komponen1", label: "Komponen 1" },
    { value: "komponen2", label: "Komponen 2" },
  ];

  const jenisPencairanOptions = [
    { value: "up", label: "Dana Uang Persediaan (UP)" },
    { value: "nihil", label: "Nihil" },
    { value: "ls", label: "Pembayaran Langsung (LS)" },
    { value: "pengesahan", label: "Pengesahan" },
    { value: "gup", label: "Penggantian UP (GUP)" },
    { value: "ptup", label: "Pertanggungjawaban TUP (PTUP)" },
    { value: "tup", label: "Tambahan UP (TUP)" },
  ];

  return (
    <>
      {/* Heading */}
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Informasi Umum</h4>
        <p className="text-sm text-gray-500">
          Isikan data informasi umum yang sesuai untuk rekap ini.
        </p>
      </div>

      {/* Form Grid */}
      <div className="col-span-12 grid grid-cols-1 gap-4">

        {/* Tahun Anggaran */}
        <div className="flex items-center gap-4">
          <Label className="w-32" htmlFor="tahunAnggaran">
            Tahun Anggaran
          </Label>
          <Input id="tahunAnggaran" value="2025" disabled />
        </div>

        {/* Satuan Kerja - Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4">
            <Label className="w-32">Satuan Kerja</Label>
            <div className="flex-1">
              <Select options={satkerOptions} placeholder="Pilih Satuan Kerja" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-32">Output</Label>
            <div className="flex-1">
              <Select options={outputOptions} placeholder="Pilih Output" />
            </div>
          </div>
        </div>

        {/* Program - Sub Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4">
            <Label className="w-32">Program</Label>
            <div className="flex-1">
              <Select options={programOptions} placeholder="Pilih Program" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-32">Sub Output</Label>
            <div className="flex-1">
              <Select options={subOutputOptions} placeholder="Pilih Sub Output" />
            </div>
          </div>
        </div>

        {/* Kegiatan - Komponen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4">
            <Label className="w-32">Kegiatan</Label>
            <div className="flex-1">
              <Select options={kegiatanOptions} placeholder="Pilih Kegiatan" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-32">Komponen</Label>
            <div className="flex-1">
              <Select options={komponenOptions} placeholder="Pilih Komponen" />
            </div>
          </div>
        </div>

        {/* Judul Rekap */}
        <div className="flex items-center gap-4">
          <Label className="w-32" htmlFor="judulRekap">
            Judul Rekap
          </Label>
          <Input id="judulRekap" placeholder="Masukkan judul rekap" />
        </div>

        {/* Perekap */}
        <div className="flex items-center gap-4">
          <Label className="w-32" htmlFor="perekap">
            Perekap
          </Label>
          <Input id="perekap" placeholder="Masukkan nama perekap" />
        </div>

        {/* Tanggal Rekap */}
        <div className="flex items-center gap-4">
          <Label className="w-32" htmlFor="tanggalRekap">
            Tanggal Rekap
          </Label>
          <Input id="tanggalRekap" type="date" />
        </div>

        {/* Jenis Pencairan */}
        <div className="flex items-center gap-4">
          <Label className="w-32">Jenis Pencairan</Label>
          <div className="flex-1">
            <Select options={jenisPencairanOptions} placeholder="Pilih Jenis Pencairan" />
          </div>
        </div>

      </div>
    </>
  );
};

export default StepInformasiUmum;
