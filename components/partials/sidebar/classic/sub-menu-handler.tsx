"use client";
import { Icon } from "@iconify/react";
import { cn, translate } from "@/lib/utils";

const SubMenuHandler = ({
  item,
  toggleSubmenu,
  index,
  activeSubmenu,
  collapsed,
  hovered,
}: {
  item: any;
  toggleSubmenu: any;
  index: number;
  activeSubmenu: number | null;
  collapsed: boolean;
  hovered: boolean;
}) => {
  const { title } = item;

  return (
    <>
      {!collapsed || hovered ? (
        <div
          onClick={() => toggleSubmenu(index)}
          className={cn(
            "flex text-default-700 group font-medium text-sm capitalize px-[10px] py-3 rounded cursor-pointer hover:bg-gradient-to-r hover:from-[#234C90] hover:to-[#3B82F6] hover:text-white",
            {
              "bg-gradient-to-r from-[#234C90] to-[#3B82F6] text-white": activeSubmenu === index,
            }
          )}
        >
          <div className="flex-1 gap-3 flex items-start">
            <span className="inline-flex items-center">
              <item.icon className="w-5 h-5" />
            </span>
            <div>{title}</div>
          </div>
          <div className="flex-0">
            <div
              className={cn(
                "text-base rounded-full flex justify-center items-center group-hover:text-white",
                {
                  "rotate-90": activeSubmenu === index,
                  "text-default-500": activeSubmenu !== index,
                }
              )}
            >
              <Icon
                icon="heroicons:chevron-right-20-solid"
                className="h-5 w-5"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="inline-flex cursor-pointer items-center justify-center data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#234C90] data-[state=open]:to-[#3B82F6] data-[state=open]:text-white w-12 h-12 rounded-md">
          <item.icon className="w-6 h-6" />
        </div>
      )}
    </>
  );
};

export default SubMenuHandler;