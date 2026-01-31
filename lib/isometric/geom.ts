export class Matrix {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;

    constructor(
        a: number = 1,
        b: number = 0,
        c: number = 0,
        d: number = 1,
        tx: number = 0,
        ty: number = 0
    ) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
}

export class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

export class Point3D {
    x: number;
    y: number;
    z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toGlobalCoordinates(offset?: Point): Point {
        const p2D = new Point(this.x - this.y, Math.floor(this.x / 2 + this.y / 2) - this.z);
        if (offset) {
            p2D.x += offset.x;
            p2D.y += offset.y;
        }
        return p2D;
    }
}
