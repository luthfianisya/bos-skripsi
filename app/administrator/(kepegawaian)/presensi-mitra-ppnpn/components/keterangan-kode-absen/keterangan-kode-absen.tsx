"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import AdvancedTable from ".";

const KetKodeAbsen = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const lebarModal = 600; // Estimasi lebar modal
        const marginX = 150; // Jarak dari kanan
        const marginY = 250; // Jarak dari atas (ditambah biar lebih turun)

        setPosition({
          x: window.innerWidth - lebarModal - marginX,
          y: marginY,
        });
      }
    }, 100); // Delay untuk memastikan layout siap
  }, []);

  const startDrag = (e: { clientX: number; clientY: number; preventDefault: () => void; stopPropagation: () => void; }) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    e.preventDefault();
    e.stopPropagation();
  };

  const onDrag = (e: { clientX: number; clientY: number; }) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const stopDrag = () => setDragging(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button type="button" color="primary" variant="outline" size="md" icon={InformationCircleIcon}>
          Keterangan Simbol
        </Button>
      </DialogTrigger>

      <DialogContent
        size="9xl"
        className="fixed bg-white shadow-lg rounded-lg p-4 z-50 cursor-move"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <DialogHeader
          className="cursor-move"
          onMouseDown={startDrag}
        >
          <DialogTitle className="text-lg">Keterangan Kode</DialogTitle>
        </DialogHeader>

        <AdvancedTable />
      </DialogContent>
    </Dialog>
  );
};

export default KetKodeAbsen;
