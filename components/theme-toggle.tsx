"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeSwitch({ id }: { id: string }) {
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
}

const themes = [
    { id: "dark", label: "Dark", icon: MoonIcon },
    { id: "light", label: "Light", icon: SunIcon },
    { id: "system", label: "System", icon: MonitorIcon },
];
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleTheme = (value: string) => {
        if (value) setTheme(value);
    };

    if (!mounted) return null;

    return (
        <ToggleGroup type="single" size="default" value={theme} onValueChange={handleTheme}>
            {themes.map(({ id, label, icon: Icon }) => (
                <Tooltip key={id}>
                    <ToggleGroupItem
                        value={id}
                        aria-label={id}
                        asChild
                        className="border-border/60 text-muted-foreground data-[state=on]:bg-muted/80 data-[state=on]:text-foreground"
                    >
                        <TooltipTrigger>
                            <Icon className="size-3" />
                        </TooltipTrigger>
                    </ToggleGroupItem>
                    <TooltipContent>{label}</TooltipContent>
                </Tooltip>
            ))}
        </ToggleGroup>
    );
}
