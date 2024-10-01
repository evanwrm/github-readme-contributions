export interface GithubContributions {
    user: User;
}

export interface User {
    name: string;
    login: string;
    contributionsCollection: ContributionsCollection;
}

export interface ContributionsCollection {
    totalCommitContributions: number;
    restrictedContributionsCount: number;
    contributionCalendar: ContributionCalendar;
}

export type Color = string;

export interface ContributionCalendar {
    colors: Color[];
    totalContributions: number;
    weeks: Week[];
}

export interface Week {
    contributionDays: ContributionDay[];
    firstDay: string;
}

export interface ContributionDay {
    color: Color;
    contributionCount: number;
    contributionLevel: string;
    date: string;
    weekday: number;
}

export const contributionLevelToNumber = (level: string) => {
    if (level === "NONE") return 0;
    if (level === "FIRST_QUARTILE") return 1;
    if (level === "SECOND_QUARTILE") return 2;
    if (level === "THIRD_QUARTILE") return 3;
    if (level === "FOURTH_QUARTILE") return 4;
    return 0;
};
