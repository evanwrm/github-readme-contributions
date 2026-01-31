import { performance } from "node:perf_hooks";
import { createCanvas } from "@napi-rs/canvas";
import { fetchContributions } from "@/lib/contributions";
import { renderContributions } from "@/lib/render";
import { getTheme } from "@/lib/theme";

/**
 * Benchmarks rendering of contributions.
 *
 * Run with:
 * tsx --inspect-brk --env-file .env.local scripts/bench.ts
 * Then open Chrome and go to chrome://inspect
 */

const username = "levelsio"; // evanwrm
const theme = getTheme("dark");

async function main() {
    const niterations = process.argv[2] ? parseInt(process.argv[2], 10) : 1;
    const contributions = await fetchContributions(username);

    const start = performance.now();
    for (let i = 0; i < niterations; i++) {
        const canvas = createCanvas(1000, 600);
        renderContributions(canvas, contributions, { username, theme });
    }
    const end = performance.now();

    console.log(`Rendered ${niterations} contributions in ${end - start}ms`);
}

main();
