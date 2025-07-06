import React, { useMemo, useState } from "react";
import AdvancedTable from "../components/pok-table";
import POKTerpilihTable from "../components/pok-terpilih-table";

import { POKs } from "@/data/entri-pembiayaan";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger as Trigger,
} from "@/components/ui/accordion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Files } from "@/components/svg";
import { FormPOK } from "@/lib/interface";
import { combinedForms } from "@/lib/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerGrupPOKTable from "../components/per-grup-pok-table";
import PesertaTable from "../components/peserta-berangkat-table";
import RincianPesertaTable from "../components/rincian-peserta-table";

interface AccordionTriggerProps {
  children: React.ReactNode;
  value: string;
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
}

interface StepPOKProps {
  pokTerpilih: FormPOK[];
  setPokTerpilih: React.Dispatch<React.SetStateAction<FormPOK[]>>;
  readOnly?: boolean;
}

const AccordionTrigger = ({ children, value, activeItem, setActiveItem }: AccordionTriggerProps) => {
  const isOpen = activeItem === value;

  const toggleOpen = () => {
    setActiveItem(isOpen ? null : value);
  };

  return (
    <Trigger
      onClick={toggleOpen}
      className="flex items-center justify-between w-full gap-2 [&>svg]:hidden"
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-8 w-8 inline-flex items-center justify-center rounded-full transition-colors",
            {
              "bg-default-100 text-primary": isOpen,
              "hover:bg-default-100 dark:hover:bg-default-200 text-default-500 dark:text-default-800":
                !isOpen,
            }
          )}
        >
          <Files className="h-5 w-5" />
        </div>
        <div className="text-sm font-medium">{children}</div>
      </div>

      <div
        className={cn(
          "h-6 w-6 inline-flex items-center justify-center rounded transition-colors",
          {
            "bg-primary text-white": isOpen,
            "bg-primary/10 text-primary": !isOpen,
          }
        )}
      >
        {isOpen ? (
          <Icon icon="heroicons:minus" className="h-4 w-4" />
        ) : (
          <Icon icon="heroicons:plus-small-solid" className="h-4 w-4" />
        )}
      </div>
    </Trigger>
  );
};

const StepPOK = ({ pokTerpilih, setPokTerpilih, readOnly = false }: StepPOKProps) => {
  const [pokData, setPokData] = useState<FormPOK[]>(combinedForms);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("rincian");

  const handleTambah = (item: FormPOK) => {
    setPokTerpilih((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
    setPokData((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleHapus = (item: FormPOK) => {
    setPokTerpilih((prev) =>
      prev.filter((i) => i.grup !== item.grup || i.detail !== item.detail)
    );
    setPokData((prev) => [...prev, item]);
  };

  const perGrupData = useMemo(() => {
    return pokTerpilih.map((item) => ({
      grupPok: item.grup,
      booked: item.paguBooked,
      realisasi: item.paguReali,
      netto: item.paguReali,
      pajak: 0,
    }));
  }, [pokTerpilih]);

  const rincianPesertaData = useMemo(() => {
    return pokTerpilih.flatMap((item) => {
      if (!item.details) return [];
      return item.details.map((d) => ({
        nip: d.nip,
        nama: d.nama,
        booked: item.paguBooked,
        realisasi: item.paguReali,
        netto: d.realisasi,
        pajak: 0,
      }));
    });
  }, [pokTerpilih]);

  return readOnly ? (
    <>
      <div className="col-span-12 pt-6">
        <h4 className="text-lg font-semibold text-gray-800">Rincian Rekapitulasi</h4>
      </div>

      <div className="col-span-12">
        <Tabs
          defaultValue="rincian"
          value={activeTab}
          onValueChange={(val) => setActiveTab(val)}
        >
          <TabsList>
            <TabsTrigger value="rincian" className="data-[state=active]:bg-blue-700 data-[state=active]:text-primary-foreground">Rincian Peserta</TabsTrigger>
            <TabsTrigger value="pergrup" className="data-[state=active]:bg-blue-700 data-[state=active]:text-primary-foreground">Per Grup POK</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="col-span-12">
        {activeTab === "rincian" && (
          <RincianPesertaTable
            data={[{
              nip: combinedForms[0].details?.[0]?.nip ?? "-",
              nama: combinedForms[0].details?.[0]?.nama ?? "-",
              booked: combinedForms[0].paguBooked,
              realisasi: combinedForms[0].paguReali,
              netto: combinedForms[0].details?.[0]?.realisasi ?? 0,
              pajak: 0,
            }]}
          />
        )}
        {activeTab === "pergrup" && (
          <PerGrupPOKTable
            data={[{
              grupPok: combinedForms[0].grup,
              booked: combinedForms[0].paguBooked,
              realisasi: combinedForms[0].paguReali,
              netto: combinedForms[0].paguReali,
              pajak: 0,
            }]}
          />
        )}
      </div>
    </>
  ) : (
    <>
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Pilih Form POK</h4>
        <p className="mt-1 text-sm text-gray-500">Pilih data Form POK yang sesuai untuk rekap ini.</p>
      </div>

      <div className="col-span-12">
        <Accordion type="single" collapsible className="w-full space-y-3.5">
          <AccordionItem value="pok-table">
            <AccordionTrigger value="pok-table" activeItem={activeItem} setActiveItem={setActiveItem}>
              <div className="text-base">Data Form POK</div>
            </AccordionTrigger>
            <AccordionContent>
              <AdvancedTable data={pokData} onTambah={handleTambah} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="col-span-12 pt-6">
        <h4 className="text-lg font-semibold text-gray-800">Preview Data Form POK Terpilih</h4>
      </div>

      <div className="col-span-12">
        <POKTerpilihTable data={pokTerpilih} onHapus={handleHapus} readOnly={readOnly} />
      </div>

      <div className="col-span-12 pt-6">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-gray-800">Rincian Rekapitulasi</h4>
          <Tabs
            defaultValue="rincian"
            value={activeTab}
            onValueChange={(val) => setActiveTab(val)}
          >
            <TabsList>
              <TabsTrigger value="rincian" className="data-[state=active]:bg-blue-700 data-[state=active]:text-primary-foreground">Rincian Peserta</TabsTrigger>
              <TabsTrigger value="pergrup" className="data-[state=active]:bg-blue-700 data-[state=active]:text-primary-foreground">Per Grup POK</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="col-span-12">
        {activeTab === "rincian" && <RincianPesertaTable data={rincianPesertaData} />}
        {activeTab === "pergrup" && <PerGrupPOKTable data={perGrupData} />}
      </div>
    </>
  );
};

export default StepPOK;
