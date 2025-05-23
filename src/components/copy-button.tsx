"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const copyClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
};

interface CopyButtonProps {
    text: string;
    title?: string;
    className?: string;
}

export const CopyButton = ({ text, title = "Copy to clipboard", className }: CopyButtonProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className={cn("absolute", className)}
                    onClick={() => copyClipboard(text)}
                >
                    <Copy className="h-4 w-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>{title}</TooltipContent>
        </Tooltip>
    );
};
