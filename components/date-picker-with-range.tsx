"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker"; // Import tipe DateRange

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";

interface DatePickerWithRangeProps {
  className?: string;
  onSelect?: (date: DateRange | undefined) => void; // Tambahkan prop onSelect
}

export default function DatePickerWithRange({ className, onSelect }: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined); // Perbaiki tipe

  const { theme: mode } = useTheme();

  // Handle perubahan tanggal
  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (onSelect) {
      onSelect(selectedDate); // Panggil onSelect jika ada
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            color={mode === "dark" ? "secondary" : "default"}
            className={cn("font-normal justify-start", {
              " bg-white text-default-500 border border-default-300": mode !== "dark",
            })}
          >
            <CalendarIcon className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Tanggal Awal - Tanggal Akhir</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange} // Gunakan handleDateChange
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
