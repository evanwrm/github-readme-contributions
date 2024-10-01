// @ts-check
import { clientEnv, clientSchema } from "./schema.mjs";

const envParsed = clientSchema.safeParse(clientEnv);

export const formatErrors = (
    /** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
    errors
) =>
    Object.entries(errors)
        .map(([name, value]) => {
            if (value && "_errors" in value) return `${name}: ${value._errors.join(", ")}\n`;
            else return null;
        })
        .filter(Boolean);

if (!envParsed.success) {
    console.error("❌ Invalid environment variables:\n", ...formatErrors(envParsed.error.format()));
    throw new Error("Invalid environment variables");
}

for (const key of Object.keys(envParsed.data)) {
    if (!key.startsWith("NEXT_PUBLIC_")) {
        console.warn(
            `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`
        );

        throw new Error("Invalid public environment variable name");
    }
}

export const env = envParsed.data;
