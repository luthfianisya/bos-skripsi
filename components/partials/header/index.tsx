"use client";
import React from "react";
import { cn } from "@/lib/utils";
import ThemeButton from "./theme-button";
import { useSidebar, useThemeStore } from "@/store";
import ProfileInfo from "./profile-info";
import VerticalHeader from "./vertical-header";
import HorizontalHeader from "./horizontal-header";
import Inbox from "./inbox";
import HorizontalMenu from "./horizontal-menu";
import NotificationMessage from "./notification-message";

import { useMediaQuery } from "@/hooks/use-media-query";
import MobileMenuHandler from "./mobile-menu-handler";
import ClassicHeader from "./layout/classic-header";
import FullScreen from "./full-screen";
import { Button } from "@/components/ui/button";
import { Book, Pointer } from "@/components/svg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DocumentPlusIcon, PencilSquareIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import router from "next/router";
import Link from "next/link";

const NavTools = ({ isDesktop, isMobile, sidebarType }: { isDesktop: boolean; isMobile: boolean; sidebarType: string }) => {
  return (
    <div className="nav-tools flex items-center  gap-2">
      {isDesktop}


      {/* <ThemeButton />
      <Inbox />
      <NotificationMessage /> */}

      <TooltipProvider>
        <DropdownMenu>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Buku Panduan</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Panduan 1")}>
              Panduan 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Panduan 2")}>
              Panduan 2
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100 dark:hover:bg-default-200 
            data-[state=open]:bg-default-100 dark:data-[state=open]:bg-default-200 
            hover:text-primary text-default-500 dark:text-default-800 rounded-full"
                >
                  <Pointer className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              Aksi Cepat
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent className="grid grid-cols-2 gap-0 p-0">
  <Link href="/administrator/presensi-unit-kerja">
    <DropdownMenuItem className="flex flex-col items-center justify-center border-b border-r border-default-200 p-4 rounded-none focus:bg-primary/10 focus:text-primary">
      <UserGroupIcon className="h-5 w-5 mb-2 text-primary-700" />
      <span>Presensi Unit Kerja</span>
    </DropdownMenuItem>
  </Link>

  <Link href="/administrator/entri-pembiayaan">
    <DropdownMenuItem className="flex flex-col items-center justify-center border-b border-default-200 p-4 rounded-none focus:bg-primary/10 focus:text-primary">
      <PencilSquareIcon className="h-5 w-5 mb-2 text-primary-700" />
      <span>Entri Pembiayaan</span>
    </DropdownMenuItem>
  </Link>

  <Link href="/administrator/tambah-permintaan">
    <DropdownMenuItem className="flex flex-col items-center justify-center border-r border-default-200 p-4 rounded-none focus:bg-primary/10 focus:text-primary">
      <DocumentPlusIcon className="h-5 w-5 mb-2 text-primary-700" />
      <span>Tambah Permintaan</span>
    </DropdownMenuItem>
  </Link>

  <Link href="/administrator/tambah-rekap">
    <DropdownMenuItem className="flex flex-col items-center justify-center p-4 rounded-none focus:bg-primary/10 focus:text-primary">
      <DocumentPlusIcon className="h-5 w-5 mb-2 text-primary-700" />
      <span>Tambah Rekap</span>
    </DropdownMenuItem>
  </Link>
</DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative md:h-9 md:w-9 h-8 w-8 hover:bg-default-100 dark:hover:bg-default-200 
          data-[state=open]:bg-default-100 dark:data-[state=open]:bg-default-200 
          hover:text-primary text-default-500 dark:text-default-800 rounded-full"
            >
              <Book className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Buku Panduan
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isDesktop && <FullScreen />}

      <div className="ltr:pl-2 rtl:pr-2">
        <ProfileInfo />
      </div>
      {!isDesktop && sidebarType !== "module" && <MobileMenuHandler />}
    </div>
  );
};
const Header = ({ handleOpenSearch }: { handleOpenSearch: () => void; }) => {
  const { collapsed, sidebarType, setCollapsed, subMenu, setSidebarType } =
    useSidebar();
  const { layout, navbarType, setLayout } = useThemeStore();

  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const isMobile = useMediaQuery("(min-width: 768px)");

  // set header style to classic if isDesktop
  React.useEffect(() => {
    if (!isDesktop && layout === "horizontal") {
      setSidebarType("classic");
    }
  }, [isDesktop]);

  // if horizontal layout
  if (layout === "horizontal" && navbarType !== "hidden") {
    return (
      <ClassicHeader
        className={cn(" ", {
          "sticky top-0 z-50": navbarType === "sticky",
        })}
      >
        <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
          <div className="flex justify-between items-center h-full">
            {/* <HorizontalHeader handleOpenSearch={handleOpenSearch} /> */}
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
        </div>
        {isDesktop && (
          <div className=" bg-card/90 backdrop-blur-lg  w-full px-6  shadow-md">
            <HorizontalMenu />
          </div>
        )}
      </ClassicHeader>
    );
  }
  if (layout === "semibox" && navbarType !== "hidden") {
    return (
      <ClassicHeader
        className={cn("has-sticky-header rounded-md   ", {
          "ltr:xl:ml-[72px] rtl:xl:mr-[72px] ": collapsed,
          "ltr:xl:ml-[272px] rtl:xl:mr-[272px] ": !collapsed,

          "sticky top-6": navbarType === "sticky",
        })}
      >
        <div className="xl:mx-20 mx-4">
          <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 rounded-md my-6 shadow-md border-b">
            <div className="flex justify-between items-center h-full">
              <VerticalHeader
                handleOpenSearch={handleOpenSearch}
              />
              <NavTools
                isDesktop={isDesktop}
                isMobile={isMobile}
                sidebarType={sidebarType}
              />
            </div>
          </div>
        </div>
      </ClassicHeader>
    );
  }
  if (
    sidebarType !== "module" &&
    navbarType !== "floating" &&
    navbarType !== "hidden"
  ) {
    return (
      <ClassicHeader
        className={cn("", {
          "ltr:xl:ml-[248px] rtl:xl:mr-[248px]": !collapsed,
          "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
          "sticky top-0": navbarType === "sticky",
        })}
      >
        <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
          <div className="flex justify-between items-center h-full">
            <VerticalHeader

              handleOpenSearch={handleOpenSearch}
            />
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
        </div>
      </ClassicHeader>
    );
  }
  if (navbarType === "hidden") {
    return null;
  }
  if (navbarType === "floating") {
    return (
      <ClassicHeader
        className={cn("  has-sticky-header rounded-md sticky top-6  px-6  ", {
          "ltr:ml-[72px] rtl:mr-[72px]": collapsed,
          "ltr:xl:ml-[300px] rtl:xl:mr-[300px]  ":
            !collapsed && sidebarType === "module",
          "ltr:xl:ml-[248px] rtl:xl:mr-[248px] ":
            !collapsed && sidebarType !== "module",
        })}
      >
        <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 rounded-md my-6 shadow-md border-b">
          <div className="flex justify-between items-center h-full">
            <VerticalHeader

              handleOpenSearch={handleOpenSearch}
            />
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
        </div>
      </ClassicHeader>
    );
  }

  return (
    <ClassicHeader
      className={cn("", {
        "ltr:xl:ml-[300px] rtl:xl:mr-[300px]": !collapsed,
        "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,

        "sticky top-0": navbarType === "sticky",
      })}
    >
      <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
        <div className="flex justify-between items-center h-full">
          <VerticalHeader

            handleOpenSearch={handleOpenSearch}
          />
          <NavTools
            isDesktop={isDesktop}
            isMobile={isMobile}
            sidebarType={sidebarType}
          />
        </div>
      </div>
    </ClassicHeader>
  );
};

export default Header;
