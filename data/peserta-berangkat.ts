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
        tujuan: "depok",
        pulangPergi: {
            tanggalPergi: "2025-07-15",
            tanggalPulang: "2025-07-15",            
        },
        jumlah: 170000,
        transportPergi: 0,    // Kereta ekonomi
        transportPulang: 0,   // Kereta ekonomi
        taksiAsal: 0,          // Taksi ke stasiun
        taksiTujuan: 0,        // Taksi dari stasiun ke hotel
        lamaTranslok: 1,
        rateTranslok: 170000,
        totalTranslok: 170000,
        lamaHotel: 0,
        rateHotel: 0,
        totalHotel: 0,
        lamaUangHarian: 0,
        rateUangHarian: 0,
        totalUangHarian: 0,
        lamaUangSaku: 0,
        rateUangSaku: 0,
        totalUangSaku: 0,
        lamaRepresentatif: 0,
        rateRepresentatif: 0,
        totalRepresentatif: 0,
    },
]