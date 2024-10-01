export interface Theme {
    name: string;
    bgColor: string;
    titleColor: string;
    textColor: string;
    metricsColor: string;
    borderColor: string;
}

export const themes: Theme[] = [
    {
        name: "light",
        bgColor: "fffefe",
        titleColor: "24292f",
        textColor: "24292f",
        metricsColor: "1a7f37",
        borderColor: "ebedf0"
    },
    {
        name: "transparent",
        bgColor: "00000000",
        titleColor: "24292f",
        textColor: "24292f",
        metricsColor: "1a7f37",
        borderColor: "ebedf0"
    },
    {
        name: "dark",
        bgColor: "151515",
        titleColor: "c9d1d9",
        textColor: "c9d1d9",
        metricsColor: "1a7f37",
        borderColor: "292929"
    }
];
export const defaultTheme: Theme = themes[0];

export const getTheme = (name?: string): Theme => {
    return themes.find(theme => theme.name === name) ?? defaultTheme;
};
