import { CanvasType, Context2DType } from "@/lib/isometric/utils";
import { SKRSContext2D } from "@napi-rs/canvas";

export const getPixel = (imageData: ImageData, x: number, y: number) => {
    const data = imageData.data;
    const index = (y * imageData.width + x) * 4;
    const [r, g, b] = [data[index], data[index + 1], data[index + 2]];
    return (r << 16) | (g << 8) | b;
};

export const getContext = (canvas: CanvasType) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Unable to get 2D context");
    return ctx as Context2DType;
};

// https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas
interface RoundRectRadius {
    tl: number;
    tr: number;
    br: number;
    bl: number;
}
export const roundRect = (
    ctx: SKRSContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number | RoundRectRadius = 5,
    fill: boolean = false,
    stroke: boolean = true
) => {
    if (typeof radius === "number") radius = { tl: radius, tr: radius, br: radius, bl: radius };
    else if (typeof radius === "object") {
        const defaultRadius: RoundRectRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (const [key, val] of Object.entries(defaultRadius)) {
            const side = key as keyof RoundRectRadius;
            radius[side] = radius[side] ?? val;
        }
    } else throw new Error("Invalid radius type");

    ctx.strokeStyle = "#666666";

    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();

    fill && ctx.fill();
    stroke && ctx.stroke();
};
