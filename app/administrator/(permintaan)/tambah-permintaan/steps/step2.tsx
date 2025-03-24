import React from "react";
import AdvancedTable from "../components/pok-table";
import POKTerpilihTable from "../components/pok-terpilih-table";

const StepPOK = () => {
  return (
    <>
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Pilih POK</h4>
        <p className="mt-1 text-sm text-gray-500">Pilih data POK yang sesuai untuk permintaan ini.</p>
      </div>

      <div className="col-span-12">
        <AdvancedTable />
      </div>

      <div className="col-span-12 pt-6">
        <h4 className="text-lg font-semibold text-gray-800">Preview Data POK Terpilih</h4>
      </div>

      <div className="col-span-12">
        <POKTerpilihTable />
      </div>
    </>
  );
};

export default StepPOK;
