import { useRef, useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export const EllipsisTooltip = ({ children }: { children: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight);
    }
  }, [children]);

  const content = (
    <div
      ref={ref}
      className="max-w-[300px] line-clamp-2 text-ellipsis overflow-hidden cursor-default"
    >
      {children}
    </div>
  );

  if (!isTruncated) return content;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
