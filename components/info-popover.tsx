"use client";

import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface Props {
    children?: React.ReactNode;
    className?: string;
}
export function InfoPopover({ children, className }: Props) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    return (
        <Popover>
            <PopoverTrigger>
                <Info className={cn("size-4", className)} />
            </PopoverTrigger>
            <PopoverContent
                side={isDesktop ? "right" : "bottom"}
                align="center"
                className={"w-64 p-2 text-sm"}
            >
                {children}
            </PopoverContent>
        </Popover>
    );
}
