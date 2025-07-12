import React from "react";
import Select from "react-select";
import { PROGRAMS, satker, organisasi, tahun } from "@/lib/constants";

type OptionType = { value: string; label: string };

type FilterState = {
  tahun?: OptionType | null;
  satker?: OptionType | null;
  program?: OptionType | null;
  kegiatan?: OptionType | null;
  output?: OptionType | null;
  suboutput?: OptionType | null;
  komponen?: OptionType | null;
};

interface DataTableFilterProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}

const styles = {
  option: (provided: any) => ({ ...provided, fontSize: "14px" }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
};

const DataTableFilter = ({ filterState, setFilterState }: DataTableFilterProps) => {
  const programOptions = PROGRAMS.map(p => ({
    value: p.code,
    label: `[${p.code}] ${p.label}`,
  }));

  const kegiatanOptions =
    filterState.program?.value
      ? PROGRAMS.find(p => p.code === filterState.program!.value)?.kegiatan.map(k => ({
        value: k.code,
        label: `[${k.code}] ${k.label}`,
      })) ?? []
      : [];

  const outputOptions =
    filterState.program?.value && filterState.kegiatan?.value
      ? PROGRAMS.find(p => p.code === filterState.program!.value)
        ?.kegiatan.find(k => k.code === filterState.kegiatan!.value)
        ?.output.map(o => ({
          value: o.code,
          label: `[${o.code}] ${o.label}`,
        })) ?? []
      : [];

  const subOutputOptions =
    filterState.program?.value && filterState.kegiatan?.value && filterState.output?.value
      ? PROGRAMS.find(p => p.code === filterState.program!.value)
        ?.kegiatan.find(k => k.code === filterState.kegiatan!.value)
        ?.output.find(o => o.code === filterState.output!.value)
        ?.suboutput?.map(s => ({
          value: s.code,
          label: `[${s.code}] ${s.label}`,
        })) ?? []
      : [];

  const komponenOptions =
    filterState.program?.value &&
      filterState.kegiatan?.value &&
      filterState.output?.value &&
      filterState.suboutput?.value
      ? PROGRAMS.find(p => p.code === filterState.program!.value)
        ?.kegiatan.find(k => k.code === filterState.kegiatan!.value)
        ?.output.find(o => o.code === filterState.output!.value)
        ?.suboutput.find(s => s.code === filterState.suboutput!.value)
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
          placeholder="Pilih Tahun"
          styles={styles}
          options={tahun}
          value={filterState.tahun ?? null}
          onChange={(option) => setFilterState(prev => ({ ...prev, tahun: option }))}
          isClearable
          menuPortalTarget={document.body}
        />
      </div>
      <div className="flex gap-10">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <label className="w-48 font-medium z-30">Satuan Kerja</label>
            <Select
              className="react-select flex-1 z-30"
              classNamePrefix="select"
              placeholder="Pilih Satuan Kerja"
              styles={styles}
              options={satker}
              value={filterState.satker ?? null}
              onChange={(option) => setFilterState(prev => ({ ...prev, satker: option }))}
              isClearable
              menuPortalTarget={document.body}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="w-48 font-medium z-20">Program</label>
            <Select
              className="react-select flex-1 z-20"
              classNamePrefix="select"
              placeholder="Pilih Program"
              styles={styles}
              options={programOptions}
              value={filterState.program ?? null}
              onChange={(option) =>
                setFilterState(prev => ({
                  ...prev,
                  program: option,
                  kegiatan: null,
                  output: null,
                  suboutput: null,
                  komponen: null,
                }))
              }
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
              options={kegiatanOptions}
              value={filterState.kegiatan ?? null}
              onChange={(option) =>
                setFilterState(prev => ({
                  ...prev,
                  kegiatan: option,
                  output: null,
                  suboutput: null,
                  komponen: null,
                }))
              }
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
                options={outputOptions}
                value={filterState.output ?? null}
                onChange={(option) =>
                  setFilterState(prev => ({
                    ...prev,
                    output: option,
                    suboutput: null,
                    komponen: null,
                  }))
                }
                isClearable
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
                options={subOutputOptions}
                value={filterState.suboutput ?? null}
                onChange={(option) =>
                  setFilterState(prev => ({
                    ...prev,
                    suboutput: option,
                    komponen: null,
                  }))
                }
                isClearable
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
                options={komponenOptions}
                value={filterState.komponen ?? null}
                onChange={(option) =>
                  setFilterState(prev => ({
                    ...prev,
                    komponen: option,
                  }))
                }
                isClearable
                menuPortalTarget={document.body}
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableFilter;
