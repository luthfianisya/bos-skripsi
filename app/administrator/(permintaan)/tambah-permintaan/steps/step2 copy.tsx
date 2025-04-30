import React, { useState } from "react";
import AdvancedTable from "../components/pok-table";
import POKTerpilihTable from "../components/pok-terpilih-table";
import { POK } from "../components/pok-table/columns";
import { POKs } from "@/data/entri-pembiayaan";

const StepPOK = () => {
  const [pokTerpilih, setPokTerpilih] = useState<POK[]>([]);
  const [pokData, setPokData] = useState<POK[]>(POKs); // misal data awal

  const handleTambah = (item: POK) => {
    setPokTerpilih((prev) => {
      if (prev.find((i) => i.grup === item.grup && i.detail === item.detail)) {
        return prev; // jangan duplikat
      }
      return [...prev, item];
    });
  
    // Hapus dari pokData
    setPokData((prev) => prev.filter((i) => i.grup !== item.grup || i.detail !== item.detail));
  };
  

  const handleHapus = (item: POK) => {
    setPokTerpilih((prev) => prev.filter((i) => i.grup !== item.grup || i.detail !== item.detail));
  
    // Optional: Balikin ke pokData
    setPokData((prev) => [...prev, item]);
  };
  
  return (
    <>
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Pilih POK</h4>
        <p className="mt-1 text-sm text-gray-500">Pilih data POK yang sesuai untuk permintaan ini.</p>
      </div>

      <div className="col-span-12">
      <AdvancedTable data={pokData} onTambah={handleTambah} />
      </div>

      <div className="col-span-12 pt-6">
        <h4 className="text-lg font-semibold text-gray-800">Preview Data POK Terpilih</h4>
      </div>

      <div className="col-span-12">
        <POKTerpilihTable data={pokTerpilih} onHapus={handleHapus} />
      </div>
    </>
  );
};

export default StepPOK;
