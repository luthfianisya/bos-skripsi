export interface DetailPeserta {
    nama: string;
    gol: string;
    asal: string;
    tujuan: string;
    pulangPergi: {
      tanggalPergi: string;
      tanggalPulang: string;
    };
    jumlah?: number;
  
    // TRANSPORT
    transportPergi: number;
    transportPulang: number;
  
    // TAKSI
    taksiAsal: number;
    taksiTujuan: number;
  
    // TRANSLOK
    lamaTranslok: number;
    rateTranslok: number;
    totalTranslok: number;
  
    // HOTEL
    lamaHotel: number;
    rateHotel: number;
    totalHotel: number;
  
    // UANG HARIAN
    lamaUangHarian: number;
    rateUangHarian: number;
    totalUangHarian: number;
  
    // UANG SAKU
    lamaUangSaku: number;
    rateUangSaku: number;
    totalUangSaku: number;
  
    // REPRESENTATIF
    lamaRepresentatif: number;
    rateRepresentatif: number;
    totalRepresentatif: number;
  }
  

export const DetailPesertas: DetailPeserta[] = [
    {
        nama: "Adi Saputra",
        gol: "IIIa",
        asal: "depok",
        tujuan: "bogor",
        pulangPergi: {
            tanggalPergi: "2025-07-01",
            tanggalPulang: "2025-07-01",            
        },
        jumlah: 100000,
        transportPergi: 250000,    // Kereta ekonomi
        transportPulang: 250000,   // Kereta ekonomi
        taksiAsal: 50000,          // Taksi ke stasiun
        taksiTujuan: 60000,        // Taksi dari stasiun ke hotel
        lamaTranslok: 2,
        rateTranslok: 150000,
        totalTranslok: 300000,
        lamaHotel: 2,
        rateHotel: 400000,
        totalHotel: 800000,
        lamaUangHarian: 3,
        rateUangHarian: 250000,
        totalUangHarian: 750000,
        lamaUangSaku: 3,
        rateUangSaku: 50000,
        totalUangSaku: 150000,
        lamaRepresentatif: 1,
        rateRepresentatif: 200000,
        totalRepresentatif: 200000,
    },
]