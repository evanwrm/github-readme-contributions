export class Dimension {
    xAxis: number = 0;
    yAxis: number = 0;
    zAxis: number = 0;
    tall: boolean = false;

    constructor() {}
}

export class BrickDimension extends Dimension {
    constructor(xAxis?: number, yAxis?: number) {
        super();
        this.xAxis = xAxis ?? 30;
        this.yAxis = yAxis ?? 30;

        if (this.xAxis % 2 === 1 || this.yAxis % 2 === 1)
            throw new Error("x,y Axis must be even number");

        // xAxis || yAxis = 4 floodFill could not be applied
        if (this.xAxis <= 4 || this.yAxis <= 4) throw new Error("dimension is too small");
    }
}

export class CubeDimension extends Dimension {
    constructor(xAxis?: number, yAxis?: number, zAxis?: number) {
        super();
        this.xAxis = xAxis ?? 30;
        this.yAxis = yAxis ?? 30;
        this.zAxis = zAxis ?? 30;

        if (this.xAxis % 2 === 1 || this.yAxis % 2 === 1)
            throw new Error("x,y Axis must be even number");

        // xAxis || yAxis = 4 floodFill could not be applied
        if (this.xAxis <= 4 || this.yAxis <= 4 || this.zAxis <= 2)
            throw new Error("dimension is too small");
    }
}

export class LineXDimension extends Dimension {
    constructor(xAxis?: number) {
        super();
        this.xAxis = xAxis ?? 30;

        if (this.xAxis % 2 === 1) throw new Error("xAxis must be even number");
        if (this.xAxis < 2) throw new Error("dimension is too small");
    }
}

export class LineYDimension extends Dimension {
    constructor(yAxis?: number) {
        super();
        this.yAxis = yAxis ?? 30;

        if (this.yAxis % 2 === 1) throw new Error("yAxis must be even number");
        if (this.yAxis < 2) throw new Error("dimension is too small");
    }
}

export class LineZDimension extends Dimension {
    constructor(zAxis?: number) {
        super();
        this.zAxis = zAxis ?? 30;

        if (this.zAxis <= 0) throw new Error("dimension is too small");
    }
}

export class PyramidDimension extends Dimension {
    constructor(axis?: number, tall?: boolean) {
        super();
        this.xAxis = axis ?? 30;
        this.yAxis = axis ?? 30;
        this.tall = tall ?? false;

        if (this.xAxis % 2 === 1) throw new Error("axis must be even number");
        if (this.xAxis <= 4) throw new Error("dimension is too small");
    }
}

export class SideXDimension extends Dimension {
    constructor(xAxis?: number, zAxis?: number) {
        super();
        this.xAxis = xAxis ?? 30;
        this.zAxis = zAxis ?? 30;

        if (this.xAxis % 2 === 1) throw new Error("xAxis must be even number");
        if (this.xAxis <= 4 || this.zAxis <= 2) throw new Error("dimension is too small");
    }
}

export class SideYDimension extends Dimension {
    constructor(yAxis?: number, zAxis?: number) {
        super();
        this.yAxis = yAxis ?? 30;
        this.zAxis = zAxis ?? 30;

        if (this.yAxis % 2 === 1) throw new Error("yAxis must be even number");
        if (this.yAxis <= 4 || this.zAxis <= 2) throw new Error("dimension is too small");
    }
}

export class SlopeDimension extends Dimension {
    constructor(xAxis?: number, yAxis?: number) {
        super();
        this.xAxis = xAxis ?? 30;
        this.yAxis = yAxis ?? 30;

        if (this.xAxis % 2 === 1 || this.yAxis % 2 === 1)
            throw new Error("x,y Axis must be even number");

        // xAxis || yAxis = 4 floodFill could not be applied
        if (this.xAxis <= 4 || this.yAxis <= 4) throw new Error("dimension is too small");
    }
}
