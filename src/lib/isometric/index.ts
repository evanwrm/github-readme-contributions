import { CubeColor, LineColor, PyramidColor, SideColor, SlopeColor } from "@/lib/isometric/colors";
import {
    BrickDimension,
    CubeDimension,
    LineXDimension,
    LineYDimension,
    LineZDimension,
    PyramidDimension,
    SideXDimension,
    SideYDimension,
    SlopeDimension
} from "@/lib/isometric/dimensions";
import { BitmapData, PixelObject, PixelView } from "@/lib/isometric/display";
import { Matrix, Point, Point3D } from "@/lib/isometric/geom";
import { Brick, Cube, SideX, SideY } from "@/lib/isometric/primitive";
import { CanvasFactory, CanvasManager } from "@/lib/isometric/utils";

export const isometrics = (canvasFactory?: CanvasFactory) => {
    CanvasManager.setFactory(canvasFactory);

    return {
        // primitive
        Cube,
        Brick,
        SideX,
        SideY,
        // geom
        Matrix,
        Point,
        Point3D,
        // display
        PixelObject,
        PixelView,
        BitmapData,
        // dimensions
        BrickDimension,
        CubeDimension,
        LineXDimension,
        LineYDimension,
        LineZDimension,
        PyramidDimension,
        SideXDimension,
        SideYDimension,
        SlopeDimension,
        // colors
        CubeColor,
        LineColor,
        PyramidColor,
        SideColor,
        SlopeColor
    };
};
