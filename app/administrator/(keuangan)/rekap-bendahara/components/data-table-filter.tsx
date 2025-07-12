import React, { useState } from "react";
import Select from "react-select";
import { PROGRAMS, satker, organisasi, tahun } from "@/lib/constants";

type OptionType = { value: string; label: string };

const styles = {
  option: (provided: any) => ({
    ...provided,
    fontSize: "14px",
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
};

const DataTableFilter = () => {
  const [selectedProgram, setSelectedProgram] = useState<OptionType | null>(null);
  const [selectedKegiatan, setSelectedKegiatan] = useState<OptionType | null>(null);
  const [selectedOutput, setSelectedOutput] = useState<OptionType | null>(null);
  const [selectedSuboutput, setSelectedSuboutput] = useState<OptionType | null>(null);
  const [selectedKomponen, setSelectedKomponen] = useState<OptionType | null>(null);

  const programOptions = PROGRAMS.map(p => ({
    value: p.code,
    label: `[${p.code}] ${p.label}`,
  }));

  const kegiatanOptions = selectedProgram
    ? PROGRAMS.find(p => p.code === selectedProgram.value)?.kegiatan.map(k => ({
      value: k.code,
      label: `[${k.code}] ${k.label}`,
    })) ?? []
    : [];

  const outputOptions = selectedProgram && selectedKegiatan
    ? PROGRAMS.find(p => p.code === selectedProgram.value)
      ?.kegiatan.find(k => k.code === selectedKegiatan.value)
      ?.output.map(o => ({
        value: o.code,
        label: `[${o.code}] ${o.label}`,
      })) ?? []
    : [];

  const subOutputOptions = selectedProgram && selectedKegiatan && selectedOutput
    ? PROGRAMS.find(p => p.code === selectedProgram.value)
      ?.kegiatan.find(k => k.code === selectedKegiatan.value)
      ?.output.find(o => o.code === selectedOutput.value)
      ?.suboutput?.map(s => ({
        value: s.code,
        label: `[${s.code}] ${s.label}`,
      })) ?? []
    : [];

  const komponenOptions = selectedProgram && selectedKegiatan && selectedOutput && selectedSuboutput
    ? PROGRAMS.find(p => p.code === selectedProgram.value)
      ?.kegiatan.find(k => k.code === selectedKegiatan.value)
      ?.output.find(o => o.code === selectedOutput.value)
      ?.suboutput.find(s => s.code === selectedSuboutput.value)
      ?.komponen?.map(c => ({
        value: c.code,
        label: c.label,
      })) ?? []
    : [];

  return (
    <div className="grid grid-cols-1 w-full gap-y-4">
      <div className="flex items-center gap-3">
        <label className="w-48 font-medium z-30">Tahun Anggaran</label>
        <Select
          className="react-select flex-1 z-30"
          classNamePrefix="select"
          defaultValue={tahun[0]}
          styles={styles}
          name="clear"
          options={tahun}
          isClearable
          menuPortalTarget={document.body}
        />
      </div>
      <div className="flex gap-10">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {/* Pastikan semua label memiliki lebar yang sama */}
            <label className="w-48 font-medium z-30">Satuan Kerja</label>
            <Select
              className="react-select flex-1 z-30"
              classNamePrefix="select"
              placeholder="Pilih Satuan Kerja"
              styles={styles}
              name="clear"
              options={satker}
              isClearable
              menuPortalTarget={document.body}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="w-48 font-medium z-20">Program</label>
            <Select
              className="react-select flex-1 z-20"
              classNamePrefix="select"
              placeholder="Pilih Unit Kerja"
              styles={styles}
              name="clear"
              options={programOptions}
              value={selectedProgram}
              onChange={(option) => {
                setSelectedProgram(option);
                setSelectedKegiatan(null);
                setSelectedOutput(null);
                setSelectedSuboutput(null);
                setSelectedKomponen(null);
              }}
              isClearable
              menuPortalTarget={document.body}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="w-48 font-medium z-20">Kegiatan</label>
            <Select
              className="react-select flex-1 z-20"
              classNamePrefix="select"
              placeholder="Pilih Kegiatan"
              styles={styles}
              name="clear"
              options={kegiatanOptions}
              value={selectedKegiatan}
              onChange={(option) => {
                setSelectedKegiatan(option);
                setSelectedOutput(null);
                setSelectedSuboutput(null);
                setSelectedKomponen(null);
              }}
              isClearable
              menuPortalTarget={document.body}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <label className="w-24 font-medium z-20">Output</label>
            <Select
              className="react-select flex-1 z-20"
              classNamePrefix="select"
              placeholder="Pilih Output"
              styles={styles}
              name="clear"
               options={outputOptions}
              value={selectedOutput}
              onChange={(option) => {
                setSelectedOutput(option);
                setSelectedSuboutput(null);
                setSelectedKomponen(null);
              }}
              
              isClearable
              isDisabled={!selectedKegiatan}
              menuPortalTarget={document.body}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="w-24 font-medium z-20">Sub Output</label>
            <Select
              className="react-select flex-1 z-20"
              classNamePrefix="select"
              placeholder="Pilih Sub Output"
              styles={styles}
              name="clear"
               options={subOutputOptions}
              value={selectedSuboutput}
              onChange={(option) => {
                setSelectedSuboutput(option);
                setSelectedKomponen(null);
              }}
              
              isClearable
              isDisabled={!selectedOutput}
              menuPortalTarget={document.body}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="w-24 font-medium z-20">Komponen</label>
            <Select
              className="react-select flex-1 z-20"
              classNamePrefix="select"
              placeholder="Pilih Komponen"
              styles={styles}
              name="clear"
              options={komponenOptions}
              value={selectedKomponen}
              onChange={(option) => {
                setSelectedKomponen(option);
              }}
              
              isClearable
              isDisabled={!selectedSuboutput}
              menuPortalTarget={document.body}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableFilter;