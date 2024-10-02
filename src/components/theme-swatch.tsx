import { Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface ThemeSwatchProps {
    theme: Theme;
    className?: string;
}

export const ThemeSwatch = ({ theme, className }: ThemeSwatchProps) => {
    return (
        <div className={cn("flex flex-col items-center space-y-2", className)}>
            <div className="h-16 w-full rounded" style={{ backgroundColor: `#${theme.bgColor}` }}>
                <div className="flex h-full justify-center space-x-1 p-2">
                    {theme.levelColors.map((color, index) => (
                        <div
                            key={index}
                            className="h-full w-4 rounded"
                            style={{ backgroundColor: `#${color}` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
