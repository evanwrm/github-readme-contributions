import { fetchContributions } from "@/lib/contributions";
import { renderContributions } from "@/lib/render";
import { getTheme } from "@/lib/theme";
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { merge } from "lodash-es";
import { unstable_cache } from "next/cache";
import { NextRequest } from "next/server";
import { resolve } from "path";
import { z } from "zod";

const fonts = [
    { path: resolve(process.cwd(), "public/fonts", "Arial.ttf"), family: "Arial" },
    {
        path: resolve(process.cwd(), "public/fonts", "Arial_Bold.ttf"),
        family: "Arial",
        weight: "bold"
    },
    {
        path: resolve(process.cwd(), "public/fonts", "Arial_Bold_Italic.ttf"),
        family: "Arial",
        weight: "bold",
        style: "italic"
    },
    {
        path: resolve(process.cwd(), "public/fonts", "Arial_Italic.ttf"),
        family: "Arial",
        style: "italic"
    }
];
for (const { path, family } of fonts) {
    // registerFont(path, { family, weight, style });
    GlobalFonts.registerFromPath(path, family);
}

const getContributions = unstable_cache(fetchContributions, undefined, { revalidate: 3600 });

const hexRegex = /^([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const paramsSchema = z.object({
    username: z.string(),
    theme: z.string().optional(),
    bgColor: z.string().regex(hexRegex).optional(),
    titleColor: z.string().regex(hexRegex).optional(),
    textColor: z.string().regex(hexRegex).optional(),
    metricsColor: z.string().regex(hexRegex).optional()
});

export async function GET(req: NextRequest) {
    const { success, data } = paramsSchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
    if (!success) return new Response("Invalid parameters", { status: 400 });

    const { username, theme: rawTheme = "", bgColor, titleColor, textColor, metricsColor } = data;
    const theme = merge(getTheme(rawTheme), { bgColor, titleColor, textColor, metricsColor });

    if (!username) return new Response("No username found", { status: 404 });

    const contributions = await getContributions(username);

    const canvas = createCanvas(1000, 600);
    renderContributions(canvas, contributions, { username, theme });
    const buffer = canvas.toBuffer("image/png");

    return new Response(buffer, {
        headers: {
            "Content-Type": "image/png",
            "Content-Length": buffer.length.toString()
        }
    });
}
