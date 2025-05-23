/** @type {import('next').NextConfig} */
const baseConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        loader: "default",
        formats: ["image/avif", "image/webp"],
        remotePatterns: [{ hostname: "localhost" }]
    },
    serverExternalPackages: ["@napi-rs/canvas"] 
};

export default baseConfig;
