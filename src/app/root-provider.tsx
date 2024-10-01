"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";

interface Props {
    children: React.ReactNode;
}

export const RootProviders = ({ children }: Props) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
        </ThemeProvider>
    );
};
