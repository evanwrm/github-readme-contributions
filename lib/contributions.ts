import { GITHUB_API_TOKEN, GITHUB_API_URL } from "@/lib/constants";
import { GithubContributions } from "@/lib/github";
import { addDays, addMinutes, format } from "date-fns";
import { sumBy } from "lodash-es";

export const fetchContributions = async (
    username: string,
    token: string = GITHUB_API_TOKEN
): Promise<GithubContributions> => {
    const body = {
        query: `query {
    user(login: "${username}") {
        name
        login
        contributionsCollection {
            totalCommitContributions
            restrictedContributionsCount
            contributionCalendar {
                colors
                totalContributions
                weeks {
                    contributionDays {
                        color
                        contributionCount
                        contributionLevel
                        date
                        weekday
                    }
                    firstDay
                }
            }
        }
    }
}`
    };
    const response = await fetch(GITHUB_API_URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { Authorization: `bearer ${token}` }
    });
    const data = await response.json();
    return data.data;
};

const statDate = (date: Date, length: number = 0) =>
    format(addDays(addMinutes(date, date.getTimezoneOffset()), length), "LLL dd");
export const calculateStats = (contributions: GithubContributions) => {
    const calendar = contributions.user.contributionsCollection.contributionCalendar;
    const total = calendar.totalContributions;
    const firstDate = new Date(calendar.weeks[0].contributionDays[0].date);
    const lastDate = new Date(
        calendar.weeks[calendar.weeks.length - 1].contributionDays[
            calendar.weeks[calendar.weeks.length - 1].contributionDays.length - 1
        ].date
    );
    const thisWeek = calendar.weeks[calendar.weeks.length - 1];
    const thisWeekFirst = new Date(thisWeek.contributionDays[0].date);
    const thisWeekLast = new Date(
        thisWeek.contributionDays[thisWeek.contributionDays.length - 1].date
    );
    const contributionsThisWeek = sumBy(thisWeek.contributionDays, "contributionCount");

    let bestDay: Date | string = "No activity found";
    let best = 0;
    let bestStreakStart: any;
    let bestStreak = 0;
    let streakStart: any;
    let streak = 0;
    let average = 0;
    let days = 0;
    for (const week of calendar.weeks) {
        for (const day of week.contributionDays) {
            // Best Day
            if (day.contributionCount > best) {
                best = day.contributionCount;
                bestDay = statDate(new Date(day.date));
            }

            // Streak
            if (day.contributionCount > 0) {
                if (!streak) streakStart = new Date(day.date);
                streak++;

                if (streak > bestStreak) {
                    bestStreak = streak;
                    bestStreakStart = new Date(streakStart);
                }
            } else streak = 0;

            // Average
            average += day.contributionCount;
            days++;
        }
    }
    const streakEnd = streak && statDate(streakStart, streak);
    const bestStreakEnd = bestStreak && statDate(bestStreakStart, bestStreak);
    streakStart = (streak && statDate(streakStart)) || "No current streak";
    bestStreakStart = (bestStreak && statDate(bestStreakStart)) || "No best streak";
    average /= days;

    return {
        total,
        contributionsThisWeek,
        best,
        firstDate: statDate(firstDate),
        lastDate: statDate(lastDate),
        thisWeekFirst: statDate(thisWeekFirst),
        thisWeekLast: statDate(thisWeekLast),
        bestDay,
        bestStreakStart,
        bestStreakEnd,
        bestStreak,
        streakStart,
        streakEnd,
        streak,
        average
    };
};
