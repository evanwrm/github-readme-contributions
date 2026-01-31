import { getContext } from "@/lib/canvas";
import { Point, Point3D } from "@/lib/isometric/geom";
import { Primitive } from "@/lib/isometric/primitive";
import { CanvasManager, CanvasType, Context2DType } from "@/lib/isometric/utils";

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

    private checkPixelAvailable(x: number, y: number): boolean {
        const index = (y * this.imageData.width + x) * 4;
        return this.imageData.data[index + 3] === 0;
    }

    setPixel(posX: number, posY: number, color: number): void {
        const index = (posY * this.imageData.width + posX) * 4;
        this.setPixelByIndex(index, color);
    }

    floodFill(posX: number, posY: number, color: number): void {
        if (((color >>> 24) & 0xff) === 0x00) return;

        const w = this.imageData.width;
        const h = this.imageData.height;
        let x = posX;
        let y = posY;
        const stack: number[] = [];
        let nowCol: number[] = [];
        let prevCol: number[] = [];
        let newStart: number;
        let matchFlag: boolean;
        let i: number, j: number;

        if (x < 0 || y < 0 || x >= w || y >= h) return;
        if (!this.checkPixelAvailable(x, y))
            throw new Error("Start point for flood fill is already filled");

        // Left side flood fill
        for (let col = x; col >= 0; col -= 1) {
            // Top side
            for (let row = y; row >= 0; row -= 1) {
                if (this.checkPixelAvailable(col, row)) {
                    stack.push((row * w + col) * 4);
                    nowCol.push(row);
                } else {
                    if (row === y && this.checkPixelAvailable(col + 1, row - 1)) {
                        if (this.checkPixelAvailable(col, row - 1)) {
                            newStart = row - 1;
                        } else if (this.checkPixelAvailable(col + 1, row - 2)) {
                            newStart = row - 2;
                        } else {
                            newStart = -1;
                        }

                        for (let r = newStart; r >= 0; r -= 1) {
                            if (this.checkPixelAvailable(col, r)) {
                                stack.push((r * w + col) * 4);
                                nowCol.push(r);
                            } else {
                                break;
                            }
                        }
                    }
                    break;
                }
            }

            // Bottom side
            for (let row = y; row < h; row += 1) {
                if (this.checkPixelAvailable(col, row)) {
                    stack.push((row * w + col) * 4);
                    nowCol.push(row);
                } else {
                    if (row === y && this.checkPixelAvailable(col + 1, row + 1)) {
                        if (this.checkPixelAvailable(col, row + 1)) {
                            newStart = row + 1;
                        } else if (this.checkPixelAvailable(col + 1, row + 2)) {
                            newStart = row + 2;
                        } else {
                            newStart = h;
                        }

                        for (let r = newStart; r < h; r += 1) {
                            if (this.checkPixelAvailable(col, r)) {
                                stack.push((r * w + col) * 4);
                                nowCol.push(r);
                            } else {
                                break;
                            }
                        }
                    }
                    break;
                }
            }

            if (col === x) {
                prevCol = [...nowCol];
            }

            matchFlag = false;

            for (i = 0; i < prevCol.length; i += 1) {
                for (j = 0; j < nowCol.length; j += 1) {
                    if (nowCol[j] === prevCol[i]) {
                        matchFlag = true;
                        y = prevCol[i];
                        break;
                    }
                }
                if (matchFlag) break;
            }

            if (matchFlag) {
                prevCol = [...nowCol];
                nowCol = [];
            } else {
                break;
            }
        }

        // Reset for right side flood fill
        x = posX;
        y = posY;
        prevCol = [];
        nowCol = [];

        // Right side flood fill
        for (let col = x; col < w; col += 1) {
            // Top side
            for (let row = y; row >= 0; row -= 1) {
                if (this.checkPixelAvailable(col, row)) {
                    stack.push((row * w + col) * 4);
                    nowCol.push(row);
                } else {
                    if (row === y && this.checkPixelAvailable(col - 1, row - 1)) {
                        if (this.checkPixelAvailable(col, row - 1)) {
                            newStart = row - 1;
                        } else if (this.checkPixelAvailable(col - 1, row - 2)) {
                            newStart = row - 2;
                        } else {
                            newStart = -1;
                        }

                        for (let r = newStart; r >= 0; r -= 1) {
                            if (this.checkPixelAvailable(col, r)) {
                                stack.push((r * w + col) * 4);
                                nowCol.push(r);
                            } else {
                                break;
                            }
                        }
                    }
                    break;
                }
            }

            // Bottom side
            for (let row = y; row < h; row += 1) {
                if (this.checkPixelAvailable(col, row)) {
                    stack.push((row * w + col) * 4);
                    nowCol.push(row);
                } else {
                    if (row === y && this.checkPixelAvailable(col - 1, row + 1)) {
                        if (this.checkPixelAvailable(col, row + 1)) {
                            newStart = row + 1;
                        } else if (this.checkPixelAvailable(col - 1, row + 2)) {
                            newStart = row + 2;
                        } else {
                            newStart = h;
                        }

                        for (let r = newStart; r < h; r += 1) {
                            if (this.checkPixelAvailable(col, r)) {
                                stack.push((r * w + col) * 4);
                                nowCol.push(r);
                            } else {
                                break;
                            }
                        }
                    }
                    break;
                }
            }

            if (col === x) prevCol = [...nowCol];
            matchFlag = false;

            for (i = 0; i < prevCol.length; i += 1) {
                for (j = 0; j < nowCol.length; j += 1) {
                    if (nowCol[j] === prevCol[i]) {
                        matchFlag = true;
                        y = prevCol[i];
                        break;
                    }
                }
                if (matchFlag) break;
            }

            if (matchFlag) {
                prevCol = [...nowCol];
                nowCol = [];
            } else break;
        }

        for (i = 0; i < stack.length; i += 1) this.setPixelByIndex(stack[i], color);
    }

    render(ctx: Context2DType, x: number = 0, y: number = 0): void {
        this.context.putImageData(this.imageData, 0, 0);
        ctx.drawImage(this.canvas, x, y);
    }
}
