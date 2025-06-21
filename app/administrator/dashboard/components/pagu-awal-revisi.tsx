"use client"

import { CupBar, NoteIcon } from "@/components/svg";
import { cn } from "@/lib/utils";
import { DocumentTextIcon, PencilIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Icon } from "@iconify/react";

const PaguAwalRevisi = () => {
  const data = [
    {
      text: "PAGU AWAL",
      total: "Rp 380.000.000",
      color: "primary",
      desc: "Tahun Anggaran 2025",
      icon: <DocumentTextIcon className="w-5 h-5 text-white" />
    },
    {
      text: "PAGU REVISI",
      total: "Rp 420.000.000",
      color: "warning",
      percent: "150%",
      desc: "dari Pagu Awal",
      icon: <PencilIcon className="w-5 h-5 text-white" />
    },
  ];
  return (
    <>
      <div className="flex flex-col w-96 gap-4">
        {data.map((item, index) => (
          <div
            key={`reports-state-${index}`}
            className={cn(
              "flex flex-col p-4 rounded-sm overflow-hidden bg-primary/10 items-start relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden",
              {
                "bg-primary/10 dark:bg-primary/70": item.color === "primary",
                "bg-orange-50 dark:bg-orange-500": item.color === "warning",
                "bg-green-50 dark:bg-green-500": item.color === "success",
                "bg-red-50 dark:bg-red-500": item.color === "destructive",
              }
            )}
          >
            <span
              className={cn(
                "h-[95px] w-[95px] rounded-full bg-primary/40 absolute -top-8 -right-8 ring-[20px] ring-primary/30",
                {
                  "bg-primary/50 ring-primary/20 dark:bg-primary dark:ring-primary/40": item.color === "primary",
                  "bg-orange-200 ring-orange-100 dark:bg-orange-300 dark:ring-orange-400": item.color === "warning",
                  "bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400": item.color === "success",
                  "bg-red-200 ring-red-100 dark:bg-red-300 dark:ring-red-400": item.color === "destructive",
                }
              )}
            ></span>
            <div className="flex justify-between w-full items-start">
              <span className="mt-2 text-lg text-default-800 dark:text-primary-foreground font-bold capitalize relative z-10">
                {item.text}
              </span>
              <div className={`z-40 w-10 h-10 grid place-content-center rounded-full border border-dashed border-${item.color} dark:border-primary-foreground/60`}>
                <span
                  className={cn(
                    `z-40 h-8 w-8 rounded-full grid place-content-center bg-${item.color}`,
                    {
                      "dark:bg-[#EFF3FF]/30": item.color === "primary",
                      "dark:bg-[#FFF7ED]/30": item.color === "warning",
                      "dark:bg-[#ECFDF4]/30": item.color === "success",
                      "dark:bg-[#FEF2F2]/30": item.color === "destructive",
                    }
                  )}
                >
                  {item.icon}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className={cn(`text-xl font-bold dark:text-primary-foreground`,{
                  "text-primary-700": item.color === "primary",
                  "text-orange-600": item.color === "warning",
                  "text-success-700": item.color === "success",
                  "text-destructive-700": item.color === "destructive",
                })}>{item.total}</span>
            </div>
            <div className="flex items-center gap-1">
              {item.text === "PAGU REVISI" && (
                <Icon 
                  icon={parseFloat(item.percent ?? "0") > 100 ? "heroicons:arrow-trending-up" : "heroicons:arrow-trending-down"} 
                  className={cn("w-5 h-5 mt-4", {
                    "text-green-500": parseFloat(item.percent ?? "0") > 100,
                    "text-red-500": parseFloat(item.percent ?? "0") < 100,
                  })} 
                />
              )}
              <span className={cn("text-md font-semibold text-default-900 mt-4", {
                "text-green-500": parseFloat(item.percent ?? "0") > 100,
                "text-red-500": parseFloat(item.percent ?? "0") < 100,
              })}>{item.percent}</span>
              <span className="text-sm font-medium text-default-600 dark:text-primary-foreground mt-4">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PaguAwalRevisi;
