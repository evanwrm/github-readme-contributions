"use client";

import { BlurInput } from "@/components/blur-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { env } from "@/lib/env/client.mjs";
import { themes } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

interface PreviewProps {
    className?: string;
}

export const Preview = ({ className }: PreviewProps) => {
    const [username, setUsername] = useState("evanwrm");
    const [theme, setTheme] = useState("dark");

    const generateUrl = (params = {}) => {
        const searchParams = new URLSearchParams({ username, theme, ...params });
        return `${env.NEXT_PUBLIC_SITE_URL}/api/iso?${searchParams.toString()}`;
    };

    const copyClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast("Copied to clipboard");
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
                <div className="flex-1">
                    <Label htmlFor="username">GitHub Username</Label>
                    <BlurInput
                        id="username"
                        value={username}
                        onValueChange={d => setUsername(d)}
                        placeholder="Enter your GitHub username"
                        className="mt-1"
                    />
                </div>
                <div className="flex-1">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={d => setTheme(d)}>
                        <SelectTrigger className="mt-1 w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            {themes.map(theme => (
                                <SelectItem key={theme.name} value={theme.name}>
                                    {theme.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Label>Preview</Label>
                <div className="mt-2 overflow-hidden rounded-lg border bg-background">
                    <img src={generateUrl()} alt="GitHub Contributions" className="w-full" />
                </div>
            </div>
            <div>
                <Label>Markdown Code</Label>
                <div className="relative mt-2 flex items-center">
                    <Input
                        readOnly
                        value={`[![GitHub contributions](${generateUrl()})](${env.NEXT_PUBLIC_SITE_URL})`}
                        className="h-12"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2"
                        onClick={() =>
                            copyClipboard(
                                `[![GitHub contributions](${generateUrl()})](${env.NEXT_PUBLIC_SITE_URL})`
                            )
                        }
                    >
                        <CopyIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
