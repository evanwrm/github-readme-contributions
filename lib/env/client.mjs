// @ts-check
import { clientEnv, clientSchema } from "./schema.mjs";

const parsed = clientSchema.safeParse(clientEnv);
if (!parsed.success) {
    console.error("❌ Invalid environment variables:\n", parsed.error.issues);
    throw new Error("Invalid environment variables");
}

for (const key of Object.keys(parsed.data)) {
    if (!key.startsWith("NEXT_PUBLIC_")) {
        console.warn(
            `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`,
        );

        throw new Error("Invalid public environment variable name");
    }
}

export const env = parsed.data;
