export interface PresensiBulanan {
    id: number;
    nama: string;
    nip: string;
    [key: string]: string | number;
  }

export const dummyData: PresensiBulanan[] = [
    // {
    //   id: 1,
    //   nama: "John Doe",
    //   nip: "123456789",
    //   ...Object.fromEntries(Array.from({ length: new Date().getDate() }, (_, i) => [(i + 1).toString().padStart(2, "0"), "✔"])),
    // },
    // {
    //   id: 2,
    //   nama: "Jane Smith",
    //   nip: "987654321",
    //   ...Object.fromEntries(Array.from({ length: new Date().getDate() }, (_, i) => [(i + 1).toString().padStart(2, "0"), "❌"])),
    // },
  ];