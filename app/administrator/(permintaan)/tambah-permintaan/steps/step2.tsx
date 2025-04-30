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

interface AccordionTriggerProps {
  children: React.ReactNode;
  value: string;
  activeItem: string | null;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
}

interface StepPOKProps {
  pokTerpilih: POK[];
  setPokTerpilih: React.Dispatch<React.SetStateAction<POK[]>>;
}

const AccordionTrigger = ({ children, value, activeItem, setActiveItem }: AccordionTriggerProps) => {
  const isOpen = activeItem === value;

  const toggleOpen = () => {
    setActiveItem(isOpen ? null : value);
  };

  return (
    <Trigger onClick={toggleOpen}>
      <div className="flex gap-2 items-center">
        <div
          className={cn(
            "h-4 w-4 inline-flex items-center justify-center rounded",
            {
              "bg-primary/10": !isOpen,
              "bg-primary text-primary-foreground": isOpen,
            }
          )}
        >
          {isOpen ? (
            <Icon icon="heroicons:minus" className="h-5 w-5" />
          ) : (
            <Icon icon="heroicons:plus-small-solid" className="h-5 w-5" />
          )}
        </div>
        <div>{children}</div>
      </div>
    </Trigger>
  );
};

const StepPOK = ({ pokTerpilih, setPokTerpilih }: StepPOKProps) => {
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
      <div className="col-span-12">
        <h4 className="text-lg font-semibold text-gray-800">Pilih POK</h4>
        <p className="mt-1 text-sm text-gray-500">Pilih data POK yang sesuai untuk permintaan ini.</p>
      </div>

      <div className="col-span-12">
        <Accordion type="single" collapsible className="w-full space-y-3.5">
          <AccordionItem value="pok-table">
            <AccordionTrigger value="pok-table" activeItem={activeItem} setActiveItem={setActiveItem}>
              Data POK
            </AccordionTrigger>
            <AccordionContent>
              <AdvancedTable data={pokData} onTambah={handleTambah} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
