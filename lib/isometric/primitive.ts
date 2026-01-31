import { getContext } from "@/lib/canvas";
import { Color, CubeColor, SideColor } from "@/lib/isometric/colors";
import {
    BrickDimension,
    CubeDimension,
    Dimension,
    SideXDimension,
    SideYDimension
} from "@/lib/isometric/dimensions";
import { BitmapData, PixelObject } from "@/lib/isometric/display";
import { Matrix } from "@/lib/isometric/geom";
import { CanvasManager, CanvasType, Context2DType } from "@/lib/isometric/utils";

export class Primitive {
    canvas: CanvasType;
    context: Context2DType;
    w: number = 0;
    h: number = 0;
    dimension?: Dimension;
    color?: Color;
    border: boolean = true;
    bitmapData?: BitmapData;
    matrix: Matrix = new Matrix();

    constructor(canvas?: CanvasType, context?: Context2DType) {
        if (canvas && context) {
            this.canvas = canvas;
            this.context = context;
        } else {
            this.canvas = CanvasManager.createCanvas();
            this.context = getContext(this.canvas);
            this.context.imageSmoothingEnabled = false;
        }
    }
}

export class Brick extends Primitive {
    constructor(
        dimension: Dimension = new BrickDimension(),
        color: Color = new SideColor(),
        border: boolean = true
    ) {
        if (!dimension) throw new Error("Dimension is not defined.");

        let w = dimension.xAxis + dimension.yAxis;
        let h = (dimension.xAxis + dimension.yAxis) / 2;
        // Adjust for 22.6 degrees implementation
        w = w - 2;
        h = h - 1;

        const bmp = new BitmapData(w, h);

        super(bmp.canvas, bmp.context);

        this.dimension = dimension;
        this.color = color;
        this.border = border;

        this.w = w;
        this.h = h;

        // Initialize matrix with offsets
        this.matrix.tx = -this.dimension.yAxis + 2;
        this.matrix.ty = 0;

        this.bitmapData = bmp;

        if (!this.dimension || !this.bitmapData || !this.color)
            throw new Error("Missing properties for build.");

        const xOffsetInner = this.dimension.yAxis - 2;
        const yOffsetInner = 0;
        const xOffsetOut = this.dimension.xAxis - 1;
        const yOffsetOut = (this.h ?? 0) - 1;
        const borderColor = this.border ? this.color.border! : this.color.inner!;

        // Draw x-axis lines
        for (let i = 0; i < this.dimension.xAxis; i++) {
            this.bitmapData.setPixel(
                xOffsetInner + i,
                yOffsetInner + Math.floor(i / 2),
                borderColor
            );
            this.bitmapData.setPixel(xOffsetOut - i, yOffsetOut - Math.floor(i / 2), borderColor);
        }

        // Draw y-axis lines
        for (let j = 0; j < this.dimension.yAxis; j++) {
            this.bitmapData.setPixel(
                xOffsetInner + 1 - j,
                yOffsetInner + Math.floor(j / 2),
                borderColor
            );
            this.bitmapData.setPixel(
                xOffsetOut - 1 + j,
                yOffsetOut - Math.floor(j / 2),
                borderColor
            );
        }

        // Fill the enclosed area with the inner color
        this.bitmapData.floodFill(
            Math.floor((this.w ?? 0) / 2),
            Math.floor((this.h ?? 0) / 2),
            this.color.inner!
        );

        this.bitmapData?.render(this.context);
    }
}

export class Cube extends Primitive {
    constructor(
        dimension: Dimension = new CubeDimension(),
        color: Color = new CubeColor(),
        border: boolean = true
    ) {
        let w = dimension.xAxis + dimension.yAxis;
        let h = dimension.zAxis + (dimension.xAxis + dimension.yAxis) / 2;
        // Adjust for 22.6 degrees implementation
        w = w - 2;
        h = h - 1;

        const bmp = new BitmapData(w, h);

        super(bmp.canvas, bmp.context);

        this.dimension = dimension;
        this.color = color;
        this.border = border;

        this.w = w;
        this.h = h;

        // Initialize matrix with offsets
        this.matrix.tx = -this.dimension.yAxis + 2;
        this.matrix.ty = -this.dimension.zAxis;

        this.bitmapData = bmp;

        if (!this.dimension || !this.color) throw new Error("Missing properties for build.");

        // Create Brick (front face)
        const brick = new Brick(
            new BrickDimension(this.dimension.xAxis, this.dimension.yAxis),
            new SideColor(this.color.border, this.color.horizontal),
            this.border
        );
        // Create SideX (left face)
        const sideX = new SideX(
            new SideXDimension(this.dimension.xAxis, this.dimension.zAxis),
            new SideColor(this.color.border, this.color.left),
            this.border
        );
        // Create SideY (right face)
        const sideY = new SideY(
            new SideYDimension(this.dimension.yAxis, this.dimension.zAxis),
            new SideColor(this.color.border, this.color.right),
            this.border
        );

        // Wrap the primitives in PixelObjects
        const poBrick = new PixelObject(brick);
        const poX = new PixelObject(sideX);
        const poY = new PixelObject(sideY);

        // Draw the Brick and Sides onto the bitmapData context
        this.context.drawImage(poBrick.canvas, poBrick.x + this.dimension.yAxis - 2, poBrick.y);
        this.context.drawImage(
            poX.canvas,
            poX.x,
            poX.y + this.dimension.zAxis + this.dimension.yAxis / 2 - 1
        );
        this.context.drawImage(
            poY.canvas,
            poY.x + this.w - 2,
            poX.y + this.dimension.zAxis + this.dimension.xAxis / 2 - 1
        );

        // Create a new BitmapData for highlights
        const bmd = new BitmapData(this.w, this.h);
        if (this.border) {
            const offsetX = this.dimension.xAxis - 2;
            const offsetY = (this.dimension.xAxis + this.dimension.yAxis) / 2 - 2;

            // Add border highlights on the x-axis
            for (let i = 0; i < this.dimension.xAxis - 2; i++) {
                bmd.setPixel(
                    offsetX + 1 - i,
                    offsetY - Math.floor(i / 2),
                    this.color.borderHighlight!
                );
            }

            // Add border highlights on the y-axis
            for (let j = 0; j < this.dimension.yAxis - 2; j++) {
                bmd.setPixel(offsetX + j, offsetY - Math.floor(j / 2), this.color.borderHighlight!);
            }

            // Add border highlights on the z-axis
            for (let k = 0; k < this.dimension.zAxis; k++) {
                bmd.setPixel(offsetX, offsetY + k, this.color.borderHighlight!);
            }
        } else {
            // If no border, add left side highlights
            for (let i = 0; i < this.dimension.zAxis; i++) {
                bmd.setPixel(
                    this.dimension.xAxis - 2,
                    Math.floor((this.dimension.xAxis + this.dimension.yAxis) / 2) - 1 + i,
                    this.color.left!
                );
            }
        }

        // Render the highlights onto the bitmapData context
        bmd.render(this.context);
    }
}

export class SideX extends Primitive {
    constructor(
        dimension: SideXDimension = new SideXDimension(),
        color: SideColor = new SideColor(),
        border: boolean = true
    ) {
        const w = dimension.xAxis;
        const h = dimension.zAxis + dimension.xAxis / 2;

        const bmp = new BitmapData(w, h);

        super(bmp.canvas, bmp.context);

        this.dimension = dimension;
        this.color = color;
        this.border = border;

        this.w = w;
        this.h = h;

        // Initialize matrix with offsets
        this.matrix = new Matrix();
        this.matrix.tx = 0;
        this.matrix.ty = -this.dimension.zAxis;

        this.bitmapData = bmp;

        if (!this.dimension || !this.bitmapData || !this.color)
            throw new Error("Missing properties for build.");

        const xOffsetInner = 0;
        const yOffsetInner = this.dimension.zAxis;
        const xOffsetOut = this.dimension.xAxis - 1;
        const yOffsetOut = this.h - this.dimension.zAxis - 1;
        const borderColor = this.border ? this.color.border! : this.color.inner!;

        // x axis
        for (let i = 0; i < this.dimension.xAxis; i++) {
            this.bitmapData.setPixel(
                xOffsetInner + i,
                yOffsetInner + Math.floor(i / 2),
                borderColor
            );
            this.bitmapData.setPixel(xOffsetOut - i, yOffsetOut - Math.floor(i / 2), borderColor);
        }

        // z axis
        for (let j = 0; j < this.dimension.zAxis; j++) {
            this.bitmapData.setPixel(xOffsetInner, yOffsetInner - j, borderColor);
            this.bitmapData.setPixel(xOffsetOut, yOffsetOut + j, borderColor);
        }

        // Fill the enclosed area with the inner color
        this.bitmapData.floodFill(
            Math.floor(this.w / 2),
            Math.floor(this.h / 2),
            this.color.inner!
        );

        this.bitmapData?.render(this.context);
    }
}

export class SideY extends Primitive {
    constructor(
        dimension: SideYDimension = new SideYDimension(),
        color: SideColor = new SideColor(),
        border: boolean = true
    ) {
        const w = dimension.yAxis;
        const h = dimension.zAxis + dimension.yAxis / 2;

        const bmp = new BitmapData(w, h);

        super(bmp.canvas, bmp.context);

        this.dimension = dimension;
        this.color = color;
        this.border = border;

        this.w = w;
        this.h = h;

        // Initialize matrix with offsets
        this.matrix = new Matrix();
        this.matrix.tx = -this.dimension.yAxis + 2;
        this.matrix.ty = -this.dimension.zAxis;

        this.bitmapData = bmp;

        if (!this.dimension || !this.bitmapData || !this.color)
            throw new Error("Missing properties for build.");

        const xOffsetInner = 0;
        const yOffsetInner = this.h - this.dimension.zAxis - 1;
        const xOffsetOut = this.dimension.yAxis - 1;
        const yOffsetOut = this.dimension.zAxis;
        const borderColor = this.border ? this.color.border! : this.color.inner!;

        // y axis
        for (let i = 0; i < this.dimension.yAxis; i++) {
            this.bitmapData.setPixel(
                xOffsetInner + i,
                yOffsetInner - Math.floor(i / 2),
                borderColor
            );
            this.bitmapData.setPixel(xOffsetOut - i, yOffsetOut + Math.floor(i / 2), borderColor);
        }

        // z axis
        for (let j = 0; j < this.dimension.zAxis; j++) {
            this.bitmapData.setPixel(xOffsetInner, yOffsetInner + j, borderColor);
            this.bitmapData.setPixel(xOffsetOut, yOffsetOut - j, borderColor);
        }

        // Fill the enclosed area with the inner color
        this.bitmapData.floodFill(
            Math.floor(this.w / 2),
            Math.floor(this.h / 2),
            this.color.inner!
        );

        this.bitmapData?.render(this.context);
    }
}
