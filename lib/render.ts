import { type Canvas, createCanvas } from "@napi-rs/canvas";
import nanomemoize from "nano-memoize";
import { roundRect } from "@/lib/canvas";
import { ISO_DAY_SIZE, ISO_MAX_HEIGHT, STAT_FONT } from "@/lib/constants";
import { calculateStats } from "@/lib/contributions";
import {
    type ContributionCalendar,
    type ContributionDay,
    contributionLevelToNumber,
    type GithubContributions,
} from "@/lib/github";
import { isometrics } from "@/lib/isometric";
import { defaultTheme, type Theme } from "@/lib/theme";

const iso = isometrics(() => createCanvas(1000, 600) as any);

export interface RenderOptions {
    username?: string;
    theme: Theme;
}
export function renderContributions(
    canvas: Canvas,
    contributions: GithubContributions,
    { theme }: RenderOptions,
) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = `#${theme.bgColor}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const calendar = contributions.user.contributionsCollection.contributionCalendar;
    const stats = calculateStats(contributions);

    // Render calendar
    const heightMultiplier = stats.best > 0 ? ISO_MAX_HEIGHT / stats.best : 1;
    renderCalendar(canvas, calendar, d => d.contributionCount, theme, heightMultiplier);

    ctx.font = `600 14px ${STAT_FONT}`;
    ctx.fillStyle = `#${theme.titleColor}`;

    // Rectangle Left
    ctx.fillText("Contributions", 635, 40);
    roundRect(ctx, 635, 50, 340, 80, 5);

    // Rectangle Right
    ctx.fillText("Streaks", 55, 450);
    roundRect(ctx, 50, 460, 250, 80, 5);

    ctx.font = `600 12px ${STAT_FONT}`;
    ctx.fillStyle = `#${theme.textColor}`;

    ctx.fillText("Total", 650, 100);
    ctx.fillText("This week", 770, 100);
    ctx.fillText("Best day", 900, 100);

    ctx.fillText("Longest", 65, 510);
    ctx.fillText("Current", 185, 510);

    ctx.font = `600 24px ${STAT_FONT}`;
    ctx.fillStyle = `#${theme.metricsColor}`;

    ctx.fillText(stats.total.toString(), 650, 80);
    ctx.fillText(stats.contributionsThisWeek.toString(), 770, 80);
    ctx.fillText(stats.best.toString(), 900, 80);

    ctx.fillText(`${stats.bestStreak} days`, 65, 490);
    ctx.fillText(`${stats.streak} days`, 185, 490);

    ctx.font = `12px ${STAT_FONT}`;
    ctx.fillStyle = `#${theme.textColor}`;

    ctx.fillText(`${stats.firstDate} → ${stats.lastDate}`, 650, 120);
    ctx.fillText(`${stats.thisWeekFirst} → ${stats.thisWeekLast}`, 770, 120);
    ctx.fillText(`${stats.bestDay}`, 900, 120);

    ctx.fillText(
        stats.bestStreak
            ? `${stats.bestStreakStart} → ${stats.bestStreakEnd}`
            : stats.bestStreakStart,
        65,
        530,
    );
    ctx.fillText(
        stats.streak ? `${stats.streakStart} → ${stats.streakEnd}` : stats.streakStart,
        185,
        530,
    );

    ctx.font = `12px ${STAT_FONT}`;
    ctx.fillStyle = `#${theme.textColor}`;

    ctx.fillText("Average: ", 860, 150);

    ctx.font = `600 12px ${STAT_FONT}`;
    ctx.fillStyle = `#${theme.metricsColor}`;
    ctx.fillText(stats.average.toFixed(2), 915, 150);
    const avgerageTextMetrics = ctx.measureText(stats.average.toFixed(2));

    ctx.font = `12px ${STAT_FONT}`;
    ctx.fillStyle = `#${theme.textColor}`;
    ctx.fillText(" / day", 915 + avgerageTextMetrics.width, 150);

    return canvas;
}

export function renderCalendar(
    canvas: Canvas,
    calendar: ContributionCalendar,
    iteratee: (value: ContributionDay) => number,
    theme: Theme = defaultTheme,
    heightMultiplier: number = 1,
    minHeight: number = 3,
) {
    const pixelView = new iso.PixelView(canvas as any, new iso.Point(130, 90));
    const parsedColors = getParsedColors(theme);
    for (const [idx, week] of calendar.weeks.entries()) {
        for (const day of week.contributionDays) {
            const value = iteratee(day);
            const level = contributionLevelToNumber(day.contributionLevel);
            const cubeHeight = Math.floor(minHeight + heightMultiplier * value);

            const cube = getCube(ISO_DAY_SIZE, cubeHeight, parsedColors[level]);
            const point3d = new iso.Point3D(ISO_DAY_SIZE * idx, ISO_DAY_SIZE * day.weekday);

            pixelView.renderObject(cube, point3d);
        }
    }
}

const getParsedColors = nanomemoize((theme: Theme) => {
    return theme.levelColors.map(c => parseInt(c.trim(), 16));
});

const getCube = nanomemoize(
    (size: number, height: number, color: number) => {
        const dimension = new iso.CubeDimension(size, size, height);
        const cubeColor = new iso.CubeColor().getByHorizontalColor(color);
        return new iso.Cube(dimension, cubeColor, false);
    },
    { maxAge: 86400000 },
);
