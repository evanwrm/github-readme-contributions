import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface InfoPopoverProps {
    children: React.ReactNode;
    className?: string;
}

export const InfoPopover = ({ children, className }: InfoPopoverProps) => {
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    return (
        <Popover>
            <PopoverTrigger>
                <InfoCircledIcon className="ml-2 h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent
                side={isDesktop ? "right" : "bottom"}
                align="center"
                className={cn("w-64 p-2", className)}
            >
                {children}
            </PopoverContent>
        </Popover>
    );
};
