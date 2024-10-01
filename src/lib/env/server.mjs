// @ts-check
import { env as clientEnv, formatErrors } from "./client.mjs";
import { serverSchema } from "./schema.mjs";

const envParsed = serverSchema.safeParse(process.env);

if (!envParsed.success) {
    console.error("❌ Invalid environment variables:\n", ...formatErrors(envParsed.error.format()));
    throw new Error("Invalid environment variables");
}

for (const key of Object.keys(envParsed.data)) {
    if (key.startsWith("NEXT_PUBLIC_")) {
        console.warn("❌ You are exposing a server-side env-variable:", key);

        throw new Error("You are exposing a server-side env-variable");
    }
}

export const env = { ...envParsed.data, ...clientEnv };
