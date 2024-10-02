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

export default function Home() {
    return (
        <div className="mb-12 flex flex-col gap-4">
            <section className="mx-auto my-8 w-full max-w-screen-lg p-4 text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    GitHub Readme Contributions
                </h1>
                <p className="text-xl text-muted-foreground">
                    Dynamically generate your GitHub contribution charts for GitHub readmes
                </p>
            </section>
            <section className="mx-auto w-full max-w-screen-lg p-4">
                <h2 className="text-2xl font-bold">Getting Started</h2>
                <Preview className="mt-2" />
            </section>
            <section className="mx-auto w-full max-w-screen-lg p-4">
                <h2 className="text-2xl font-bold">Parameters</h2>
                <Tabs defaultValue="parameters" className="mt-2 w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="parameters">Parameters</TabsTrigger>
                        <TabsTrigger value="themes">Themes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="parameters" className="mt-4 space-y-4">
                        <p>The following parameters are available:</p>
                        <ul className="list-inside list-disc space-y-2">
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
                                <strong>borderColor</strong> - Border color in hex format (e.g.,
                                ebedf0)
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
                    <TabsContent value="themes" className="mt-4 space-y-4">
                        <p>Provided themes to customize your contribution chart:</p>
                        <ul className="grid list-inside list-disc grid-cols-1 space-y-2 md:grid-cols-2">
                            {themes.map(theme => (
                                <li key={theme.name}>
                                    <div className="inline-flex flex-col">
                                        <div className="flex items-center">
                                            <strong>{theme.title}</strong>{" "}
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
            <section className="mx-auto w-full max-w-screen-lg p-4">
                <h2 className="text-2xl font-bold">Examples</h2>
                <div className="mt-4">
                    <p>
                        You can generate contribution charts with transparent backgrounds by setting
                        the bgColor parameter to{" "}
                        <code className="rounded-md bg-accent p-1">00000000</code>:{" "}
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {["light", "dark", "winter", "winter-dark"].map(name => {
                            const url = generateUrl({
                                username: "evanwrm",
                                theme: name,
                                bgColor: "00000000"
                            });
                            return (
                                <div key={name} className="relative mt-2">
                                    <PreviewImage src={url} />
                                    <CopyButton text={url} className="right-2 top-2" />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-4">
                    <p>
                        If you want to change the image based on the users color preference, you can
                        use:
                    </p>
                    <CodeBlock
                        code={`<picture>
    <source media="(prefers-color-scheme: dark)" srcset="${demoDark}">
    <source media="(prefers-color-scheme: light)" srcset="${demoLight}">
    <img alt="GitHub contributions" src="${demoLight}">
</picture>`}
                        lang="html"
                        className="mt-2"
                    />
                </div>
            </section>
        </div>
    );
}
