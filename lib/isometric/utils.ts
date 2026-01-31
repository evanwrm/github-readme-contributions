export type CanvasType = HTMLCanvasElement | OffscreenCanvas;
export type Context2DType = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
export type CanvasFactory = () => CanvasType;
export class CanvasManager {
    static _factory: CanvasFactory;

    static setFactory(factory?: CanvasFactory) {
        if (factory) CanvasManager._factory = factory;
        else {
            if (typeof document !== "undefined" && typeof document.createElement === "function")
                CanvasManager._factory = () => document.createElement("canvas") as any;
            else if (typeof OffscreenCanvas !== "undefined")
                CanvasManager._factory = () => new OffscreenCanvas(50, 50) as any;
            else throw new Error("CanvasFactory not provided and no canvas support");
        }
    }

    static createCanvas() {
        const canvas = CanvasManager._factory();
        return canvas;
    }
}
