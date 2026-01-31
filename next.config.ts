import type { NextConfig } from "next";

const baseConfig: NextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        loader: "default",
        formats: ["image/avif", "image/webp"],
        remotePatterns: [{ hostname: "localhost" }],
    },
    reactCompiler: true,
    serverExternalPackages: ["@napi-rs/canvas"],
};

export default baseConfig;
