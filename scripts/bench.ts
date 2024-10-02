import { fetchContributions } from "@/lib/contributions";
import { renderContributions } from "@/lib/render";
import { getTheme } from "@/lib/theme";
import { createCanvas } from "canvas";

/**
 * Benchmarks rendering of contributions.
 *
 * Run with:
 * tsx --inspect-brk --env-file .env.local scripts/bench.ts
 * Then open Chrome and go to chrome://inspect
 */

const username = "evanwrm";
const theme = getTheme("dark");

const main = async () => {
    const contributions = await fetchContributions(username);

    const canvas = createCanvas(1000, 600);
    renderContributions(canvas, contributions, { username, theme });
};

main();
