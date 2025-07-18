import { tahun, satker, PROGRAMS } from "@/lib/constants";
import { DUMMY_PEGAWAIS } from "./pegawai-dummy";
import { FormPOK } from "@/lib/interface";
import { Peserta } from "@/app/administrator/(keuangan)/tambah-rekap/components/peserta-berangkat-table/columns";

export interface FullFormRekap {
    idRekap: string;
    tglRekap: string;
    judulRekap: string;
    perekap: string;
    jenisPencairan: string;
    tipeRekap: string;
    totalBooked: number;
    totalRealisasi: number;
    statusDokumen: string;
    tahun: string;
    satker: string;
    program: string;
    kegiatan: string;
    output: string;
    suboutput: string;
    komponen: string;
    pokTerpilih: FormPOK[];
    dataPeserta: Peserta[];
    sppNomor: string;
    sppTanggal: string;
    spmNomor: string;
    spmTanggal: string;
    sp2dNomor: string;
    sp2dTanggal: string;
}

export const fullFormRekap: FullFormRekap[] = [
    {
        idRekap: "#00000237835",
        tglRekap: "2025-03-01",
        judulRekap: "Translok evaluasi administrasi BPS Kota Depok",
        perekap: DUMMY_PEGAWAIS[0].nama,
        jenisPencairan: "up",
        tipeRekap: "Rekap Translok",
        totalBooked: 170000,
        totalRealisasi: 170000,
        statusDokumen: "terbit_sp2d",
        tahun: tahun[0].value,
        satker: satker[0].value,
        program: PROGRAMS[0].code,
        kegiatan: PROGRAMS[0].kegiatan[0].code,
        output: PROGRAMS[0].kegiatan[0].output[0].code,
        suboutput: PROGRAMS[0].kegiatan[0].output[0].suboutput[0].code,
        komponen: PROGRAMS[0].kegiatan[0].output[0].suboutput[0].komponen[0].code,
        pokTerpilih: [
            {
                id: "1",
                grup: "GG 2899 BMA 006 005 A 524113 5",
                deskripsi: "Translok Survei Khusus Neraca Produksi (SKNP) 2025",
                detail: "Translok petugas pemeriksaan lapangan survei khusus neraca produksi",
                noSurat: "B-571/32760/VS.350/2025",
                paguBooked: 170000,
                paguReali: 170000,
                noPermintaan: "FP-2025-539170-92800-198",
                details: [],
            },
        ],
        dataPeserta: [
            {
                nama: "Budi",
                gol: "III/a",
                asal: "Surabaya",
                tujuan: "Depok",
                pulangPergi: {
                    tanggalPergi: "2025-07-15", // format ISO string atau tanggal biasa
                    tanggalPulang: "2025-07-15",
                },
                jumlah: 170000,
            },
        ],
        sppNomor: "00019T",
        sppTanggal: "2025-07-15",
        spmNomor: "00019A",
        spmTanggal: "2025-07-15",
        sp2dNomor: "250191301002390",
        sp2dTanggal: "2025-07-15",
    },
    {
    idRekap: "#00000237836",
    tglRekap: "2025-03-02",
    judulRekap: "Translok pemantauan harga pangan BPS Kota Surabaya",
    perekap: DUMMY_PEGAWAIS[1].nama,
    jenisPencairan: "tup",
    tipeRekap: "Rekap Translok",
    totalBooked: 200000,
    totalRealisasi: 195000,
    statusDokumen: "terbit_sp2d",
    tahun: tahun[0].value,
    satker: satker[0].value,
    program: PROGRAMS[0].code,
    kegiatan: PROGRAMS[0].kegiatan[0].code,
    output: PROGRAMS[0].kegiatan[0].output[0].code,
    suboutput: PROGRAMS[0].kegiatan[0].output[0].suboutput[0].code,
    komponen: PROGRAMS[0].kegiatan[0].output[0].suboutput[0].komponen[0].code,
        pokTerpilih: [
            {
                id: "1",
                grup: "GG 2899 BMA 006 005 A 524113 5",
                deskripsi: "Translok Survei Khusus Neraca Produksi (SKNP) 2025",
                detail: "Translok petugas pemeriksaan lapangan survei khusus neraca produksi",
                noSurat: "B-571/32760/VS.350/2025",
                paguBooked: 170000,
                paguReali: 170000,
                noPermintaan: "FP-2025-539170-92800-198",
                details: [],
            },
        ],
        dataPeserta: [
            {
                nama: "Budi",
                gol: "III/a",
                asal: "Surabaya",
                tujuan: "Depok",
                pulangPergi: {
                    tanggalPergi: "2025-07-15", // format ISO string atau tanggal biasa
                    tanggalPulang: "2025-07-15",
                },
                jumlah: 170000,
            },
        ],
        sppNomor: "00019T",
        sppTanggal: "2025-07-15",
        spmNomor: "00019A",
        spmTanggal: "2025-07-15",
        sp2dNomor: "250191301002390",
        sp2dTanggal: "2025-07-15",
    },
     {
    idRekap: "#00000237837",
    tglRekap: "2025-03-03",
    judulRekap: "Translok pengawasan kegiatan BPS Kota Malang",
    perekap: DUMMY_PEGAWAIS[2].nama,
    jenisPencairan: "gup",
    tipeRekap: "Rekap Translok",
    totalBooked: 180000,
    totalRealisasi: 180000,
    statusDokumen: "terbit_sp2d",
    tahun: tahun[0].value,
    satker: satker[0].value,
    program: PROGRAMS[0].code,
    kegiatan: PROGRAMS[0].kegiatan[0].code,
    output: PROGRAMS[0].kegiatan[0].output[0].code,
    suboutput: PROGRAMS[0].kegiatan[0].output[0].suboutput[0].code,
    komponen: PROGRAMS[0].kegiatan[0].output[0].suboutput[0].komponen[0].code,
        pokTerpilih: [
            {
                id: "1",
                grup: "GG 2899 BMA 006 005 A 524113 5",
                deskripsi: "Translok Survei Khusus Neraca Produksi (SKNP) 2025",
                detail: "Translok petugas pemeriksaan lapangan survei khusus neraca produksi",
                noSurat: "B-571/32760/VS.350/2025",
                paguBooked: 170000,
                paguReali: 170000,
                noPermintaan: "FP-2025-539170-92800-198",
                details: [],
            },
        ],
        dataPeserta: [
            {
                nama: "Budi",
                gol: "III/a",
                asal: "Surabaya",
                tujuan: "Depok",
                pulangPergi: {
                    tanggalPergi: "2025-07-15", // format ISO string atau tanggal biasa
                    tanggalPulang: "2025-07-15",
                },
                jumlah: 170000,
            },
        ],
        sppNomor: "00019T",
        sppTanggal: "2025-07-15",
        spmNomor: "00019A",
        spmTanggal: "2025-07-15",
        sp2dNomor: "250191301002390",
        sp2dTanggal: "2025-07-15",
    },
];
