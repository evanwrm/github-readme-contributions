import { getContext } from "@/lib/canvas";
import { Point, Point3D } from "@/lib/isometric/geom";
import type { Primitive } from "@/lib/isometric/primitive";
import { CanvasManager, type CanvasType, type Context2DType } from "@/lib/isometric/utils";

export class PixelObject {
    canvas: CanvasType;
    x: number;
    y: number;

    constructor(primitive: Primitive, p3D: Point3D = new Point3D()) {
        this.canvas = primitive.canvas;
        this.x = primitive.matrix.tx + p3D.x - p3D.y;
        this.y = primitive.matrix.ty + Math.floor(p3D.x / 2 + p3D.y / 2) - p3D.z;
    }
}

export class PixelView {
    canvas: CanvasType;
    context: Context2DType;
    point: Point;

    constructor(canvas: CanvasType, point?: Point) {
        if (!canvas) throw new Error("Canvas is not defined");

        this.canvas = canvas;
        this.context = getContext(this.canvas);
        this.context.imageSmoothingEnabled = false;

        this.point = point ?? new Point(0, 0);
    }

    renderObject(primitive: Primitive, point3D?: Point3D): void {
        const po = new PixelObject(primitive, point3D);
        this.context.drawImage(po.canvas, this.point.x + po.x, this.point.y + po.y);
    }

    clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export class BitmapData {
    canvas: CanvasType;
    context: Context2DType;
    imageData: ImageData;

    constructor(w: number, h: number) {
        this.canvas = CanvasManager.createCanvas();
        this.canvas.width = w;
        this.canvas.height = h;
        this.context = getContext(this.canvas);
        this.imageData = this.context.createImageData(w, h);
    }

    private setPixelByIndex(index: number, color: number): void {
        const pixels = this.imageData.data;
        pixels[index] = (color >>> 16) & 0xff; // Red
        pixels[index + 1] = (color >>> 8) & 0xff; // Green
        pixels[index + 2] = (color >>> 0) & 0xff; // Blue
        pixels[index + 3] = (color >>> 24) & 0xff; // Alpha
    }

    setPixel(posX: number, posY: number, color: number): void {
        const index = (posY * this.imageData.width + posX) * 4;
        this.setPixelByIndex(index, color);
    }

    floodFill(posX: number, posY: number, color: number): void {
        if (((color >>> 24) & 0xff) === 0x00) return;

        const w = this.imageData.width;
        const h = this.imageData.height;
        const pixels = this.imageData.data;

        const r = (color >>> 16) & 0xff;
        const g = (color >>> 8) & 0xff;
        const b = color & 0xff;
        const a = (color >>> 24) & 0xff;

        if (posX < 0 || posY < 0 || posX >= w || posY >= h) return;

        const startIdx = (posY * w + posX) * 4;
        if (pixels[startIdx + 3] !== 0) return;

        const visited = new Uint8Array(w * h);
        const stack: number[] = [posX, posY];

        while (stack.length > 0) {
            const y = stack.pop();
            let x = stack.pop();
            if (x === undefined || y === undefined || y < 0 || y >= h) continue;

            let key = y * w + x;
            if (visited[key]) continue;

            // Find left edge of this scanline
            while (x > 0) {
                const leftKey = y * w + (x - 1);
                if (visited[leftKey] || pixels[leftKey * 4 + 3] !== 0) break;
                x--;
            }

            // Fill scanline from left to right
            let spanAbove = false;
            let spanBelow = false;

            while (x < w) {
                key = y * w + x;
                if (visited[key] || pixels[key * 4 + 3] !== 0) break;

                visited[key] = 1;
                const idx = key * 4;
                pixels[idx] = r;
                pixels[idx + 1] = g;
                pixels[idx + 2] = b;
                pixels[idx + 3] = a;

                // Check pixel above
                if (y > 0) {
                    const aboveKey = (y - 1) * w + x;
                    const aboveAvailable = !visited[aboveKey] && pixels[aboveKey * 4 + 3] === 0;
                    if (!spanAbove && aboveAvailable) {
                        stack.push(x, y - 1);
                        spanAbove = true;
                    } else if (spanAbove && !aboveAvailable) {
                        spanAbove = false;
                    }
                }

                // Check pixel below
                if (y < h - 1) {
                    const belowKey = (y + 1) * w + x;
                    const belowAvailable = !visited[belowKey] && pixels[belowKey * 4 + 3] === 0;
                    if (!spanBelow && belowAvailable) {
                        stack.push(x, y + 1);
                        spanBelow = true;
                    } else if (spanBelow && !belowAvailable) spanBelow = false;
                }

                x++;
            }
        }
    }

    render(ctx: Context2DType, x: number = 0, y: number = 0): void {
        this.context.putImageData(this.imageData, 0, 0);
        ctx.drawImage(this.canvas, x, y);
    }
}
