import { cloneDeep } from "lodash-es";

export interface Theme {
    name: string;
    title: string;
    description: string;
    bgColor: string;
    levelColors: string[];
    titleColor: string;
    textColor: string;
    metricsColor: string;
}

// https://github.com/orgs/community/discussions/7078
export const themes = [
    {
        name: "light",
        title: "Light",
        description: "Default light theme",
        bgColor: "fffefe",
        levelColors: ["ebedf0", "9be9a8", "30c463", "30a14e", "216e39"],
        titleColor: "24292f",
        textColor: "24292f",
        metricsColor: "1a7f37"
    },
    {
        name: "dark",
        title: "Dark",
        description: "Dark mode theme",
        bgColor: "151515",
        levelColors: ["161b22 ", "0e4429", "006d32", "26a641", "39d353"],
        titleColor: "c9d1d9",
        textColor: "c9d1d9",
        metricsColor: "1a7f37"
    },
    {
        name: "halloween",
        title: "Halloween",
        description: "Halloween theme",
        bgColor: "fffefe",
        levelColors: ["ebedf0", "ffee4a", "ffc501", "fe9600", "03001c"],
        titleColor: "24292f",
        textColor: "24292f",
        metricsColor: "fe9600"
    },
    {
        name: "halloween-dark",
        title: "Halloween Dark",
        description: "Halloween theme dark mode",
        bgColor: "151515",
        levelColors: ["161b22", "631c03", "bd561d", "fa7a18", "fddf68"],
        titleColor: "c9d1d9",
        textColor: "c9d1d9",
        metricsColor: "fe9600"
    },
    {
        name: "winter",
        title: "Winter",
        description: "Winter theme",
        bgColor: "fffefe",
        levelColors: ["ebedf0", "b6e3ff", "54aeff", "0969da", "0a3069"],
        titleColor: "24292f",
        textColor: "24292f",
        metricsColor: "0969da"
    },
    {
        name: "winter-dark",
        title: "Winter Dark",
        description: "Winter theme dark mode",
        bgColor: "151515",
        levelColors: ["161b22", "0a3069", "0969da", "54aeff", "b6e3ff"],
        titleColor: "c9d1d9",
        textColor: "c9d1d9",
        metricsColor: "0969da"
    },
    {
        name: "valentine",
        title: "Valentine",
        description: "Valentine's Day theme",
        bgColor: "fffefe",
        levelColors: ["ebedf0", "ffcfe9", "ff9bce", "ff69b4", "ff1493"],
        titleColor: "24292f",
        textColor: "24292f",
        metricsColor: "ff69b4"
    },
    {
        name: "valentine-dark",
        title: "Valentine Dark",
        description: "Valentine's Day theme dark mode",
        bgColor: "151515",
        levelColors: ["161b22", "4a0e29", "6d0032", "a62641", "d35373"],
        titleColor: "c9d1d9",
        textColor: "c9d1d9",
        metricsColor: "ff69b4"
    }
] as const satisfies Theme[];
export const defaultTheme: Theme = themes[0];

export const getTheme = (name?: string): Theme => {
    const theme = themes.find(theme => theme.name === name) ?? defaultTheme;
    return cloneDeep(theme);
};
