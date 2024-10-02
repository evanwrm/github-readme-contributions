"use client";

import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useLayoutEffect, useState } from "react";
import { codeToHtml } from "shiki/bundle/web";

interface CodeBlockProps {
    code: string;
    lang: string;
    className?: string;
}

export const CodeBlock = ({ code, lang, className }: CodeBlockProps) => {
    const [html, setHtml] = useState("");
    const { resolvedTheme } = useTheme();

    useLayoutEffect(() => {
        codeToHtml(code, {
            lang,
            theme: resolvedTheme === "dark" ? "github-dark-default" : "github-light-default"
        }).then(setHtml);
    }, [code, lang, resolvedTheme]);

    return (
        <div className={cn("relative", className)}>
            <div
                dangerouslySetInnerHTML={{ __html: html }}
                className="[&>pre]:scrollbar [&>pre]:overflow-auto [&>pre]:rounded-md [&>pre]:p-2"
            />
            <CopyButton text={code} className="right-2 top-2" />
        </div>
    );
};
