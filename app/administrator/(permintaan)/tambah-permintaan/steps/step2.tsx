import React, { useState } from "react";
import AdvancedTable from "../components/pok-table";
import POKTerpilihTable from "../components/pok-terpilih-table";
import { POK } from "../components/pok-table/columns";
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

interface AccordionTriggerProps {
  children: React.ReactNode;
  value: string;
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
}

interface StepPOKProps {
  pokTerpilih: POK[];
  setPokTerpilih: React.Dispatch<React.SetStateAction<POK[]>>;
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
  const [pokData, setPokData] = useState<POK[]>(POKs);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleTambah = (item: POK) => {
    setPokTerpilih((prev) => {
      if (prev.find((i) => i.grup === item.grup && i.detail === item.detail)) {
        return prev;
      }
      return [...prev, item];
    });
    setPokData((prev) => prev.filter((i) => i.grup !== item.grup || i.detail !== item.detail));
  };

  const handleHapus = (item: POK) => {
    setPokTerpilih((prev) => prev.filter((i) => i.grup !== item.grup || i.detail !== item.detail));
    setPokData((prev) => [...prev, item]);
  };

  return (
    <>
      {!readOnly && (
        <>
          <div className="col-span-12">
            <h4 className="text-lg font-semibold text-gray-800">Pilih POK</h4>
            {/* <p className="mt-1 text-sm text-gray-500">Pilih data POK yang sesuai untuk permintaan ini.</p> */}
          </div>
          <div className="col-span-12 pb-6">
            <Accordion type="single" collapsible className="w-full space-y-3.5">
              <AccordionItem value="pok-table">
                <AccordionTrigger value="pok-table" activeItem={activeItem} setActiveItem={setActiveItem}>
                  <div className="flex flex-col  text-start">
                    <div className="text-base">Data POK</div>
                    <div className=" text-xs  text-default-600  mt-1">
                      Klik untuk memilih data POK yang sesuai untuk permintaan ini.
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <AdvancedTable data={pokData} onTambah={handleTambah} />
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div></>
      )}

      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Preview Data POK Terpilih</h4>
      </div>

      <div className="col-span-12">
        <POKTerpilihTable data={pokTerpilih} onHapus={handleHapus} readOnly={readOnly} />
      </div>
    </>
  );
};

export default StepPOK;
