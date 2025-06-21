"use client"

import { CupBar, NoteIcon, CheckShape, Spam } from "@/components/svg";
import { cn } from "@/lib/utils";
import { ResponsiveBar } from '@nivo/bar';
import { Icon } from "@iconify/react";
import RevinueChart from "./revinue-chart";
import { ArchiveBoxIcon, BookmarkIcon, CheckBadgeIcon, DocumentTextIcon, LockClosedIcon } from "@heroicons/react/24/solid";

const EcommerceStats = () => {

  const data = [
    {
      text: "PAGU REALISASI",
      total: "Rp 35.000.000",
      percent: "15",
      desc: "dari Pagu Revisi",
      color: "success",
      icon: <CheckBadgeIcon className="w-3.5 h-3.5 text-white" />
    },
    {
      text: "PAGU BOOKED",
      total: "Rp 35.000.000",
      percent: "15",
      desc: "dari Pagu Revisi",
      color: "warning",
      icon: <BookmarkIcon className="w-3.5 h-3.5 text-white" />
    },
    {
      text: "SELF BLOCKING",
      total: "Rp 35.000.000",
      percent: "15",
      desc: "dari Pagu Revisi",
      color: "destructive",
      icon: <LockClosedIcon className="w-3.5 h-3.5 text-white" />
    },
    {
      text: "PAGU SISA",
      total: "Rp 35.000.000",
      percent: "15",
      desc: "dari Pagu Revisi",
      color: "info",
      icon: <ArchiveBoxIcon className="w-3.5 h-3.5 text-white" />
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 w-full items-start">
          {data.map((item, index) => (
            <div
              key={`reports-state-${index}`}
              className={cn(
                "flex flex-col p-4 rounded-sm overflow-hidden bg-primary/10 items-start relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden flex-1 flex-grow",
                {
                  "bg-primary/10 dark:bg-primary/70": item.color === "primary",
                  "bg-orange-50 dark:bg-orange-500": item.color === "warning",
                  "bg-green-50 dark:bg-green-500": item.color === "success",
                  "bg-red-50 dark:bg-red-500": item.color === "destructive",
                  "bg-cyan-50 dark:bg-cyan-500": item.color === "info",
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
                    "bg-cyan-200 ring-cyan-100 dark:bg-cyan-300 dark:ring-cyan-400": item.color === "info",
                  }
                )}
              ></span>
              <div className="flex justify-between w-full items-start">
                <span className="mt-2 text-lg text-default-800 dark:text-primary-foreground font-bold capitalize relative z-10">
                  {item.text}
                </span>
                <div className={`w-10 h-10 z-40 grid place-content-center rounded-full border border-dashed border-${item.color} dark:border-primary-foreground/60`}>
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
                <span className={cn(`text-lg font-semibold dark:text-primary-foreground`, {
                  "text-primary-700": item.color === "primary",
                  "text-orange-600": item.color === "warning",
                  "text-success-700": item.color === "success",
                  "text-destructive-700": item.color === "destructive",
                  "text-cyan-700": item.color === "info",
                })}>{item.total}</span>
                {/* <Icon icon="heroicons:arrow-trending-up" className={
                  `w-5 h-5 text-${item.color} dark:text-primary-foreground`} /> */}
              </div>
              <div className="flex items-center gap-1">
                <Icon icon="heroicons-solid:chart-pie" className={`w-5 h-5 text-${item.color} dark:text-primary-foreground mt-4`} />
                <span className={`text-md font-semibold text-default-900 text-${item.color} dark:text-primary-foreground mt-4`}>{item.percent}%</span>
                <span className="text-sm font-medium text-default-600 dark:text-primary-foreground mt-4">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-gray-800">Distribusi Pagu</h4>
            <p className="mt-1 text-sm text-gray-500">Penggunaan: Rp 30,1 Juta / Rp 379,9 Juta</p>
          </div>
          <RevinueChart />
        </div>

      </div>

    </>

  );
};

export default EcommerceStats;
