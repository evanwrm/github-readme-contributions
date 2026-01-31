// @ts-check
import { env as clientEnv } from "./client.mjs";
import { serverSchema } from "./schema.mjs";

const parsed = serverSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("❌ Invalid environment variables:\n", parsed.error.issues);
    throw new Error("Invalid environment variables");
}

for (const key of Object.keys(parsed.data)) {
    if (key.startsWith("NEXT_PUBLIC_")) {
        console.warn("❌ You are exposing a server-side env-variable:", key);

        throw new Error("You are exposing a server-side env-variable");
    }
}

export const env = { ...parsed.data, ...clientEnv };
