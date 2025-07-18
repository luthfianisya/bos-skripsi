import React from "react";

import { Badge } from "@/components/ui/badge";
import { cn, isLocationMatch, translate, getDynamicPath } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
const SingleMenuItem = ({ item, collapsed, hovered }: {
  item: any;
  collapsed: boolean;
  hovered: boolean;
}) => {
  const { badge, href, title } = item;

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);
  return (
    <Link href={href}>
      <>
        {!collapsed || hovered ? (
          <div
            className={cn(
              "flex  gap-3 group  text-default-700 dark:text-default-950  font-medium  text-sm capitalize px-[10px] py-3 rounded cursor-pointer hover:bg-gradient-to-r hover:from-[#234C90] hover:to-[#3B82F6] hover:text-white",
              {
                "bg-gradient-to-r from-[#234C90] to-[#3B82F6] text-white": isLocationMatch(
                  href,
                  locationName
                ),
              }
            )}
          >
            <span className="flex-grow-0">
              <item.icon className="w-5 h-5  " />
            </span>
            <div className="text-box flex-grow">{title}</div>
            {badge && <Badge className=" rounded">{item.badge}</Badge>}
          </div>
        ) : (
          <div>
            <span
              className={cn(
                "h-12 w-12 mx-auto rounded-md  transition-all duration-300 inline-flex flex-col items-center justify-center  relative  ",
                {
                  "bg-primary text-primary-foreground ": isLocationMatch(
                    href,
                    locationName
                  ),
                  " text-default-600   ": !isLocationMatch(href, locationName),
                }
              )}
            >
              <item.icon className="w-6 h-6" />
            </span>
          </div>
        )}
      </>
    </Link>
  );
};

export default SingleMenuItem;
