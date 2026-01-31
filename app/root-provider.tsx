"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Props {
    children: React.ReactNode;
}
export function RootProviders({ children }: Props) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
            <Toaster />
        </ThemeProvider>
    );
}
