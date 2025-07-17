"use client";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import avatar5 from "@/public/images/avatar/avatar-5.jpg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const ProfileInfo = () => {
  const [selectedRole, setSelectedRole] = useState("Administrator");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer pointer-events-auto">
        <div className=" flex items-center  ">
          <Image
            src={avatar5}
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0 overflow-visible relative z-50" align="end">

        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
          <Image
            src={avatar5}
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {"Aldi Pratama"}
            </div>
            <div
              className="text-xs text-default-600 hover:text-primary"
            >
              1985051010010005
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <div className="flex flex-col gap-2 mb-1 p-3">
          <div className="text-sm font-medium text-default-800 capitalize">Role</div>
          <div className="relative">
            <Icon
              icon="lucide:user-round-check"
              className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-2.5 text-default-600"
            />
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="pl-9 min-w-[160px] whitespace-nowrap h-8 text-sm">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" className="z-[9999]">
                {[
                  "Administrator",
                  // "Pengentri Operator",
                  // "Admin Anggaran",
                  // "Anggaran",
                  // "Admin Bendahara",
                  // "Bendahara",
                  // "Pegawai",
                  // "Bagian/Subbagian Umum",
                ].map((role) => (
                  <SelectItem
                    key={role}
                    value={role}
                    className="cursor-pointer hover:bg-muted focus:bg-muted px-3 py-1.5 rounded-sm"
                  >
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <DropdownMenuItem
          onSelect={() => window.location.href = "/"}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
