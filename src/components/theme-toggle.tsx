"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitch = ({ id }: { id: string }) => {
    const { resolvedTheme, setTheme } = useTheme();
    const checked = resolvedTheme === "dark";
    const tooltipLabel = checked ? "Dark" : "Light";

    const handleTheme = () => {
        setTheme(checked ? "light" : "dark");
    };

    return (
        <>
            <Switch id={id} checked={checked} onClick={handleTheme} />
            <Label htmlFor={id}>{tooltipLabel}</Label>
        </>
    );
};

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleTheme = (value: string) => {
        if (value) setTheme(value);
    };

    if (!mounted) return null;

    return (
        <ToggleGroup type="single" size="sm" value={theme} onValueChange={handleTheme}>
            <Tooltip>
                <ToggleGroupItem value="dark" className="rounded-full" asChild>
                    <TooltipTrigger>
                        <MoonIcon className="h-4 w-4" />
                    </TooltipTrigger>
                </ToggleGroupItem>
                <TooltipContent>Dark</TooltipContent>
            </Tooltip>
            <Tooltip>
                <ToggleGroupItem value="light" className="rounded-full" asChild>
                    <TooltipTrigger>
                        <SunIcon className="h-4 w-4" />
                    </TooltipTrigger>
                </ToggleGroupItem>
                <TooltipContent>Light</TooltipContent>
            </Tooltip>
            <Tooltip>
                <ToggleGroupItem value="system" className="rounded-full" asChild>
                    <TooltipTrigger>
                        <DesktopIcon className="h-4 w-4" />
                    </TooltipTrigger>
                </ToggleGroupItem>
                <TooltipContent>System</TooltipContent>
            </Tooltip>
        </ToggleGroup>
    );
};
