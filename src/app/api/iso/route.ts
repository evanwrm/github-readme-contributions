import { fetchContributions } from "@/lib/contributions";
import { renderContributions } from "@/lib/render";
import { getTheme } from "@/lib/theme";
import { createCanvas, registerFont } from "canvas";
import { unstable_cache } from "next/cache";
import { NextRequest } from "next/server";
import { resolve } from "path";

registerFont(resolve(process.cwd(), "public/fonts", "Arial.ttf"), { family: "Arial" });
registerFont(resolve(process.cwd(), "public/fonts", "Arial_Bold.ttf"), {
    family: "Arial",
    weight: "bold"
});
registerFont(resolve(process.cwd(), "public/fonts", "Arial_Bold_Italic.ttf"), {
    family: "Arial",
    weight: "bold",
    style: "italic"
});
registerFont(resolve(process.cwd(), "public/fonts", "Arial_Italic.ttf"), {
    family: "Arial",
    style: "italic"
});

export const getContributions = unstable_cache(fetchContributions, undefined, { revalidate: 3600 });

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const username = searchParams.get("username");
    const rawTheme = searchParams.get("theme");
    const theme = getTheme(rawTheme ?? "");

    if (!username) return new Response("No username found", { status: 404 });

    const contributions = await getContributions(username);

    const canvas = createCanvas(1000, 600);
    renderContributions(canvas, contributions, { username, theme });
    const buffer = canvas.toBuffer();

    return new Response(buffer, {
        headers: {
            "Content-Type": "image/png",
            "Content-Length": buffer.length.toString()
        }
    });
}
