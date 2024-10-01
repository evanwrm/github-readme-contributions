export interface Theme {
    name: string;
    bgColor: string;
    borderColor: string;
    levelColors: string[];
    titleColor: string;
    textColor: string;
    metricsColor: string;
}

// https://github.com/orgs/community/discussions/7078
export const themes: Theme[] = [
    {
        name: "light",
        bgColor: "fffefe",
        borderColor: "ebedf0",
        levelColors: ["9be9a8", "30c463", "30a14e", "216e39"],
        titleColor: "24292f",
        textColor: "24292f",
        metricsColor: "1a7f37"
    },
    {
        name: "dark",
        bgColor: "151515",
        borderColor: "292929",
        levelColors: ["0e4429", "006d32", "26a641", "39d353"],
        titleColor: "c9d1d9",
        textColor: "c9d1d9",
        metricsColor: "1a7f37"
    },
    {
        name: "transparent",
        bgColor: "00000000",
        borderColor: "ebedf0",
        levelColors: ["9be9a8", "30c463", "30a14e", "216e39"],
        titleColor: "24292f",
        textColor: "24292f",
        metricsColor: "1a7f37"
    },
    {
        name: "transparent-dark",
        bgColor: "00000000",
        borderColor: "292929",
        levelColors: ["0e4429", "006d32", "26a641", "39d353"],
        titleColor: "c9d1d9",
        textColor: "c9d1d9",
        metricsColor: "1a7f37"
    }
];
export const defaultTheme: Theme = themes[0];

export const getTheme = (name?: string): Theme => {
    return themes.find(theme => theme.name === name) ?? defaultTheme;
};
