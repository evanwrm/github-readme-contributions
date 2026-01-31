// @ts-check
import { z } from "zod";

export const serverSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    ANALYZE: z.enum(["true", "false"]).default("false"),

    // private
    GITHUB_API_TOKEN: z.string(),
});

export const clientSchema = z.object({
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_DEFAULT_APPLICATION_NAME: z.string().default("Github Readme Contributions"),
    NEXT_PUBLIC_DEFAULT_SITE_TITLE: z.string().default("Github Readme Contributions"),
});

/** @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }} */
export const clientEnv = {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_DEFAULT_APPLICATION_NAME: process.env.NEXT_PUBLIC_DEFAULT_APPLICATION_NAME,
    NEXT_PUBLIC_DEFAULT_SITE_TITLE: process.env.NEXT_PUBLIC_DEFAULT_SITE_TITLE,
};
