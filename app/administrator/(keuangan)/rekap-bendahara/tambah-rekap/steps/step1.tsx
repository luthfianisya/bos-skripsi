"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select"; // pakai react-select ya!
import { PROGRAMS } from "@/lib/constants"; // sesuaikan path kamu


const StepInformasiUmum = () => {
  const [selectedProgram, setSelectedProgram] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedKegiatan, setSelectedKegiatan] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedOutput, setSelectedOutput] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedSuboutput, setSelectedSuboutput] = React.useState<{ value: string; label: string } | null>(null);
  const [selectedKomponen, setSelectedKomponen] = React.useState<{ value: string; label: string } | null>(null);



  const programOptions = PROGRAMS.map(p => ({
    value: p.code,
    label: p.label
  }));

  const kegiatanOptions = selectedProgram
    ? PROGRAMS.find(p => p.code === selectedProgram.value)?.kegiatan.map(k => ({
      value: k.code,
      label: k.label
    }))
    : [];

  const outputOptions = selectedProgram && selectedKegiatan
    ? PROGRAMS.find(p => p.code === selectedProgram.value)
      ?.kegiatan.find(k => k.code === selectedKegiatan.value)
      ?.output?.map(o => ({
        value: o.code,
        label: o.label
      })) ?? []
    : [];


  const subOutputOptions = selectedProgram && selectedKegiatan && selectedOutput
    ? PROGRAMS.find(p => p.code === selectedProgram.value)
      ?.kegiatan.find(k => k.code === selectedKegiatan.value)
      ?.output.find(o => o.code === selectedOutput.value)
      ?.suboutput?.map(s => ({
        value: s.code,
        label: s.label
      })) ?? []
    : [];


  const komponenOptions = selectedProgram && selectedKegiatan && selectedOutput && selectedSuboutput
    ? PROGRAMS.find(p => p.code === selectedProgram.value)
      ?.kegiatan.find(k => k.code === selectedKegiatan.value)
      ?.output.find(o => o.code === selectedOutput.value)
      ?.suboutput.find(s => s.code === selectedSuboutput.value)
      ?.komponen?.map(c => ({
        value: c.code,
        label: c.label
      })) ?? []
    : [];



  const satkerOptions = [
    { value: "satker1", label: "Satker 1" },
    { value: "satker2", label: "Satker 2" },
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

        {/* Dropdown Grid (2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kolom 1: Satuan Kerja, Program, Kegiatan */}
          <div className="flex flex-col gap-4">
            {/* Satuan Kerja */}
            <div className="flex items-center gap-4">
              <Label className="w-32">Satuan Kerja</Label>
              <div className="flex-1">
                <Select options={satkerOptions} placeholder="Pilih Satuan Kerja" />
              </div>
            </div>

            {/* Program */}
            <div className="flex items-center gap-4">
              <Label className="w-32">Program</Label>
              <div className="flex-1">
                <Select
                  options={programOptions}
                  value={selectedProgram}
                  onChange={(val) => {
                    setSelectedProgram(val);
                    setSelectedKegiatan(null);
                    setSelectedOutput(null);
                    setSelectedSuboutput(null);
                    setSelectedKomponen(null);
                  }}
                  placeholder="Pilih Program"
                />
              </div>
            </div>

            {/* Kegiatan */}
            <div className="flex items-center gap-4">
              <Label className="w-32">Kegiatan</Label>
              <div className="flex-1">
                <Select
                  options={kegiatanOptions}
                  value={selectedKegiatan}
                  onChange={(val) => {
                    setSelectedKegiatan(val);
                    setSelectedOutput(null);
                    setSelectedSuboutput(null);
                    setSelectedKomponen(null);
                  }}
                  placeholder="Pilih Kegiatan"
                  isDisabled={!selectedProgram}
                />
              </div>
            </div>
          </div>

          {/* Kolom 2: Output, Suboutput, Komponen */}
          <div className="flex flex-col gap-4">
            {/* Output */}
            <div className="flex items-center gap-4">
              <Label className="w-32">Output</Label>
              <div className="flex-1">
                <Select
                  options={outputOptions}
                  value={selectedOutput}
                  onChange={(val) => {
                    setSelectedOutput(val);
                    setSelectedSuboutput(null);
                    setSelectedKomponen(null);
                  }}
                  placeholder="Pilih Output"
                  isDisabled={!selectedKegiatan}
                />
              </div>
            </div>

            {/* Sub Output */}
            <div className="flex items-center gap-4">
              <Label className="w-32">Sub Output</Label>
              <div className="flex-1">
                <Select
                  options={subOutputOptions}
                  value={selectedSuboutput}
                  onChange={(val) => {
                    setSelectedSuboutput(val);
                    setSelectedKomponen(null);
                  }}
                  placeholder="Pilih Sub Output"
                  isDisabled={!selectedOutput}
                />
              </div>
            </div>

            {/* Komponen */}
            <div className="flex items-center gap-4">
              <Label className="w-32">Komponen</Label>
              <div className="flex-1">
                <Select
                  options={komponenOptions}
                  value={selectedKomponen}
                  onChange={setSelectedKomponen}
                  placeholder="Pilih Komponen"
                  isDisabled={!selectedSuboutput}
                />
              </div>
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

      </div >
    </>
  );
};

export default StepInformasiUmum;
