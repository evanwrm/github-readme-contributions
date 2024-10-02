"use client";

import { InfoPopover } from "@/components/info-popover";
import { Preview } from "@/components/preview";
import { ThemeSwatch } from "@/components/theme-swatch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { themes } from "@/lib/theme";

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
        </div>
    );
}
