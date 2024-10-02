"use client";

import { BlurInput } from "@/components/blur-input";
import { InfoPopover } from "@/components/info-popover";
import { PreviewImage } from "@/components/preview-image";
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
import { useState } from "react";
import { CopyButton } from "./copy-button";

const generateUrl = (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return `${env.NEXT_PUBLIC_SITE_URL}/api/iso?${searchParams.toString()}`;
};
const generateMarkdownSnippet = (url: string) => {
    return `[![GitHub contributions](${url})](${env.NEXT_PUBLIC_SITE_URL})`;
};

interface PreviewProps {
    className?: string;
}

export const Preview = ({ className }: PreviewProps) => {
    const [username, setUsername] = useState("evanwrm");
    const [theme, setTheme] = useState("dark");

    const handleUsername = (username: string) => {
        setUsername(username.trim());
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
                <div className="flex-1">
                    <Label htmlFor="username">GitHub Username</Label>
                    <BlurInput
                        id="username"
                        value={username}
                        onValueChange={handleUsername}
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
                <PreviewImage src={generateUrl({ username, theme })} className="mt-2" />
            </div>
            <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
                <div className="flex-1">
                    <Label className="flex items-center">
                        API Endpoint
                        <InfoPopover>Image URL to use in your projects</InfoPopover>
                    </Label>
                    <div className="relative mt-2 flex items-center">
                        <Input readOnly value={generateUrl({ username, theme })} className="h-12" />
                        <CopyButton text={generateUrl({ username, theme })} className="right-2" />
                    </div>
                </div>
                <div className="flex-1">
                    <Label className="flex items-center">
                        Markdown Code
                        <InfoPopover>Markdown snippet to use in your GitHub readme</InfoPopover>
                    </Label>
                    <div className="relative mt-2 flex items-center">
                        <Input
                            readOnly
                            value={generateMarkdownSnippet(generateUrl({ username, theme }))}
                            className="h-12"
                        />
                        <CopyButton
                            text={generateMarkdownSnippet(generateUrl({ username, theme }))}
                            className="right-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
