// @ts-check

/** @type {import('next').NextConfig} */
const baseConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        loader: "default",
        formats: ["image/avif", "image/webp"],
        remotePatterns: [{ hostname: "localhost" }]
    },
    experimental: { serverComponentsExternalPackages: ["@napi-rs/canvas"] }
};

export default baseConfig;
