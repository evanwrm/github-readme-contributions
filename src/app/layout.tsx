import { RootProviders } from "@/app/root-provider";
import { env } from "@/lib/env/client.mjs";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Fira_Code, Inter } from "next/font/google";

const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans"
});
const fontMono = Fira_Code({
    subsets: ["latin"],
    variable: "--font-mono"
});

interface Props {
    children?: React.ReactNode;
}

const description = "Dynamically generate github contributions chart for github readmes";
export const metadata: Metadata = {
    title: {
        default: env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
        template: `%s | ${env.NEXT_PUBLIC_DEFAULT_SITE_TITLE}`
    },
    description,
    applicationName: env.NEXT_PUBLIC_DEFAULT_APPLICATION_NAME,
    openGraph: {
        title: env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
        description,
        url: env.NEXT_PUBLIC_SITE_URL,
        siteName: env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
        locale: "en_US",
        type: "website"
    }
};
export const viewport: Viewport = {
    themeColor: "#000",
    colorScheme: "dark light",
    width: "device-width",
    initialScale: 1,
    minimumScale: 1
};

export default function RootLayout({ children }: Props) {
    return (
        <html
            lang="en"
            dir="ltr"
            className={cn(fontSans.variable, fontMono.variable)}
            suppressHydrationWarning
        >
            <body className="scrollbar bg-background text-foreground transition duration-150">
                <RootProviders>
                    <div className="relative flex min-h-screen flex-col bg-background">
                        {children}
                    </div>
                </RootProviders>
            </body>
        </html>
    );
}
