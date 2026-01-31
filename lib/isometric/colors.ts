export const getRGB = (color: number) => ({
    r: (color >> 16) & 0xff,
    g: (color >> 8) & 0xff,
    b: color & 0xff
});
export const get32 = (color: number) => (color < 0xff000000 ? color + 0xff000000 : color);
export const applyBrightness = (color: number, brightness: number, highlight: boolean = false) => {
    let a, r, g, b, y, v, u;

    a = (color >>> 24) & 0x000000ff;
    r = (color >>> 16) & 0x000000ff;
    g = (color >>> 8) & 0x000000ff;
    b = color & 0x000000ff;

    y = ((r * 313524) >> 20) + ((g * 615514) >> 20) + ((b * 119538) >> 20);
    u = -((155189 * r) >> 20) - ((303038 * g) >> 20) + ((458227 * b) >> 20);
    v = ((644874 * r) >> 20) - ((540016 * g) >> 20) - ((104857 * b) >> 20);

    if (!highlight) y += brightness;
    else y = 60 + Math.pow(y, 1.2);

    r = y + ((1195376 * v) >> 20);
    g = y - ((408944 * u) >> 20) - ((608174 * v) >> 20);
    b = y + ((2128609 * u) >> 20);

    r = Math.max(0, Math.min(r, 255));
    g = Math.max(0, Math.min(g, 255));
    b = Math.max(0, Math.min(b, 255));

    return (a << 24) | (r << 16) | (g << 8) | b;
};

export class Color {
    inner?: number;
    border?: number;
    borderHighlight?: number;
    left?: number;
    right?: number;
    horizontal?: number;
    leftSlope?: number;
    rightSlope?: number;

    constructor() {}
}

export class CubeColor extends Color {
    BRIGHTNESS_GAIN = -20;

    constructor(
        border?: number,
        borderHighlight?: number,
        left?: number,
        right?: number,
        horizontal?: number
    ) {
        super();
        this.border = get32(border ?? 0x878787);
        this.borderHighlight = get32(borderHighlight ?? 0xffffff);
        this.left = get32(left ?? 0xc9cfd0);
        this.right = get32(right ?? 0xe3e3e3);
        this.horizontal = get32(horizontal ?? 0xeeeff0);
    }

    getByHorizontalColor(horizontal: number) {
        return new CubeColor(
            applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 4),
            applyBrightness(horizontal, 0, true),
            applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 2),
            applyBrightness(horizontal, this.BRIGHTNESS_GAIN),
            horizontal
        );
    }
}

export class LineColor extends Color {
    constructor(border?: number) {
        super();
        this.border = get32(border ?? 0x878787);
    }
}

export class PyramidColor extends Color {
    BRIGHTNESS_GAIN = -20;

    constructor(border?: number, borderHighlight?: number, left?: number, right?: number) {
        super();
        this.border = get32(border ?? 0x949698);
        this.borderHighlight = get32(borderHighlight ?? 0xffffff);
        this.left = get32(left ?? 0xe6e8e9);
        this.right = get32(right ?? 0xeeeff0);
    }

    getByRightColor(right: number) {
        return new PyramidColor(
            applyBrightness(right, this.BRIGHTNESS_GAIN * 4),
            applyBrightness(right, 0, true),
            applyBrightness(right, this.BRIGHTNESS_GAIN),
            right
        );
    }
}

export class SideColor extends Color {
    BRIGHTNESS_GAIN = -20;

    constructor(border?: number, inner?: number) {
        super();
        this.border = get32(border ?? 0x878787);
        this.inner = get32(inner ?? 0xeeeeee);
    }

    getByInnerColor(inner: number) {
        return new SideColor(applyBrightness(inner, this.BRIGHTNESS_GAIN * 4), inner);
    }
}

export class SlopeColor extends Color {
    BRIGHTNESS_GAIN = -20;

    constructor(
        border?: number,
        borderHighlight?: number,
        left?: number,
        right?: number,
        leftSlope?: number,
        rightSlope?: number
    ) {
        super();
        this.border = get32(border ?? 0x949698);
        this.borderHighlight = get32(borderHighlight ?? 0xffffff);
        this.left = get32(left ?? 0xc9cfd0);
        this.right = get32(right ?? 0xe6e8e9);
        this.leftSlope = get32(leftSlope ?? 0xdbdbdb);
        this.rightSlope = get32(rightSlope ?? 0xdbdbdb);
    }

    getByHorizontalColor(horizontal: number) {
        return new SlopeColor(
            applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 4),
            applyBrightness(horizontal, 0, true),
            applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 2),
            applyBrightness(horizontal, this.BRIGHTNESS_GAIN),
            applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 1.5),
            applyBrightness(horizontal, this.BRIGHTNESS_GAIN * 0.5)
        );
    }
}
