import type { BundledLanguage, BundledTheme } from "shiki";
import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";

interface Props {
    code: string;
    lang: BundledLanguage;
    themes?: { light: BundledTheme; dark: BundledTheme };
    className?: string;
}
export async function CodeBlock({
    code,
    lang,
    themes = { light: "github-light", dark: "github-dark-dimmed" },
    className,
}: Props) {
    const out = await codeToHtml(code, { lang, themes, defaultColor: false });
    return (
        <div className={cn("relative", className)}>
            <div
                className="[&>pre]:scrollbar [&>pre]:overflow-auto [&>pre]:rounded-md [&>pre]:p-4"
                dangerouslySetInnerHTML={{ __html: out }}
            />
            <CopyButton text={code} className="top-2 right-2" />
        </div>
    );
}
