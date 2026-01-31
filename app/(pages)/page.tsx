import { CodeBlock } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import { InfoPopover } from "@/components/info-popover";
import { Preview } from "@/components/preview";
import { PreviewImage } from "@/components/preview-image";
import { ThemeSwatch } from "@/components/theme-swatch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { env } from "@/lib/env/client.mjs";
import { themes } from "@/lib/theme";

const generateUrl = (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return `${env.NEXT_PUBLIC_SITE_URL}/api/iso?${searchParams.toString()}`;
};

const demoLight = generateUrl({ username: "evanwrm", theme: "light" });
const demoDark = generateUrl({ username: "evanwrm", theme: "dark" });
const demoMediaQuery = `<picture>
    <source media="(prefers-color-scheme: dark)" srcset="${demoDark}">
    <source media="(prefers-color-scheme: light)" srcset="${demoLight}">
    <img alt="GitHub contributions" src="${demoLight}">
</picture>`;

export default function Home() {
    return (
        <div className="mb-12 flex flex-col gap-6">
            <section className="mx-auto my-8 w-full max-w-5xl px-4 text-center">
                <h1 className="mb-3 font-extrabold text-4xl tracking-tight lg:text-5xl">
                    GitHub Readme Contributions
                </h1>
                <p className="text-muted-foreground text-xl">
                    Dynamically generate your GitHub contribution charts for GitHub readmes
                </p>
            </section>
            <section className="mx-auto w-full max-w-5xl px-4">
                <h2 className="font-bold text-2xl">Getting Started</h2>
                <Preview className="mt-3" />
            </section>
            <section className="mx-auto w-full max-w-5xl px-4">
                <h2 className="font-bold text-2xl">Parameters</h2>
                <Tabs defaultValue="parameters" className="mt-3">
                    <TabsList variant="line">
                        <TabsTrigger value="parameters">Parameters</TabsTrigger>
                        <TabsTrigger value="themes">Themes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="parameters" className="mt-3 flex flex-col gap-3">
                        <p>The following parameters are available:</p>
                        <ul className="flex list-inside list-disc flex-col gap-1.5">
                            <li>
                                <strong>username</strong> - Your GitHub username
                            </li>
                            <li>
                                <strong>theme</strong> - The theme name (e.g., dark, halloween)
                            </li>
                            <li>
                                <strong>bgColor</strong> - Background color in hex format (e.g.,
                                fffefe)
                            </li>
                            <li>
                                <strong>titleColor</strong> - Title color in hex format (e.g.,
                                24292f)
                            </li>
                            <li>
                                <strong>textColor</strong> - Text color in hex format (e.g., 24292f)
                            </li>
                            <li>
                                <strong>metricsColor</strong> - Metrics color in hex format (e.g.,
                                1a7f37)
                            </li>
                        </ul>
                    </TabsContent>
                    <TabsContent value="themes" className="mt-3 flex flex-col gap-3">
                        <p>Provided themes to customize your contribution chart:</p>
                        <ul className="grid list-inside list-disc grid-cols-1 gap-2 md:grid-cols-2">
                            {themes.map(theme => (
                                <li key={theme.name}>
                                    <div className="inline-flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <strong>{theme.title}</strong>
                                            <InfoPopover>{theme.description}</InfoPopover>
                                        </div>
                                        <ThemeSwatch theme={theme} className="h-16 w-64" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </TabsContent>
                </Tabs>
            </section>
            <section className="mx-auto w-full max-w-5xl px-4">
                <h2 className="font-bold text-2xl">Examples</h2>
                <div className="mt-3 flex flex-col gap-3">
                    <p>
                        You can generate contribution charts with transparent backgrounds by setting
                        the bgColor parameter to{" "}
                        <code className="rounded-md bg-accent px-1.5 py-0.5">00000000</code>:
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {["light", "dark", "winter", "winter-dark"].map(name => {
                            const url = generateUrl({
                                username: "evanwrm",
                                theme: name,
                                bgColor: "00000000",
                            });
                            return (
                                <div key={name} className="relative">
                                    <PreviewImage src={url} />
                                    <CopyButton text={url} className="top-2 right-2" />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <p>
                        If you want to change the image based on the user's color preference, you
                        can use:
                    </p>
                    <CodeBlock
                        code={demoMediaQuery}
                        lang="html"
                        className="rounded-md border bg-card"
                    />
                </div>
            </section>
        </div>
    );
}
