import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const StepInformasiUmum = () => {
  return (
    <>
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Informasi Umum</h4>
        <p className="mt-1 text-sm text-gray-500">Isikan data informasi umum yang sesuai untuk permintaan ini.</p>
      </div>

      {/* Baris 1: Satuan Kerja | Unit Kerja | Tahun Anggaran */}
                          <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="satker" >Satuan Kerja</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih Satuan Kerja" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="satker1">Satker 1</SelectItem>
                                  <SelectItem value="satker2">Satker 2</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
      
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="unitKerja">Unit Kerja</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih Unit Kerja" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="unit1">Unit 1</SelectItem>
                                  <SelectItem value="unit2">Unit 2</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
      
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="tahunAnggaran">Tahun Anggaran</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih Tahun" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2024">2024</SelectItem>
                                  <SelectItem value="2025">2025</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
      
                          {/* Baris 2: Tipe Form | Sub-Tipe Form | Jenis POK */}
                          <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="tipeForm">Tipe Form</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih Tipe Form" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="perjalanan">Perjalanan Dinas</SelectItem>
                                  <SelectItem value="barang">Pengadaan Barang</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
      
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="subTipeForm">Sub-Tipe Form</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih Sub-Tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="dalam_negeri">Dalam Negeri</SelectItem>
                                  <SelectItem value="luar_negeri">Luar Negeri</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
      
                            <div className="flex flex-col gap-2">
                              <Label>Jenis POK</Label>
                              <div className="flex items-center gap-4 mt-2">
                                <label className="flex items-center space-x-2">
                                  <input type="radio" name="jenisPok" value="single" className="accent-primary" />
                                  <span>Single POK</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="radio" name="jenisPok" value="multi" className="accent-primary" />
                                  <span>Multi POK</span>
                                </label>
                              </div>
                            </div>
                          </div>
      
                          {/* Baris 3: Nomor Surat | Tanggal Surat */}
                          <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="nomorSurat">Nomor Surat</Label>
                              <Input type="text" id="nomorSurat" placeholder="Nomor Surat" />
                            </div>
      
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="tanggalSurat">Tanggal Surat</Label>
                              <Input type="date" id="tanggalSurat" />
                            </div>
                          </div>
      
                          {/* Baris 4: Deskripsi Permintaan */}
                          <div className="col-span-12 flex flex-col gap-2">
                            <Label htmlFor="deskripsiPermintaan">Deskripsi Permintaan</Label>
                            <textarea
                              id="deskripsiPermintaan"
                              placeholder="Deskripsi lengkap permintaan..."
                              className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-primary"
                              rows={4}
                            />
                          </div>
      
                          {/* Baris 5: Link Permintaan Belanja | Upload KAK */}
                          <div className="col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="linkPermintaan">Link Permintaan Belanja</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih Link Permintaan" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="link1">Permintaan 1</SelectItem>
                                  <SelectItem value="link2">Permintaan 2</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
      
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="uploadKAK">Upload KAK</Label>
                              <Input type="file" id="uploadKAK" />
                            </div>
                          </div>
    </>
  );
};

export default StepInformasiUmum;
