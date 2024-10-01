import { ThemeToggle } from "@/components/theme-toggle";

export const Footer = () => {
    return (
        <footer className="border-t p-4">
            <div className="mx-auto flex max-w-screen-2xl items-end gap-4">
                <div className="flex flex-col items-start justify-end">
                    <div className="flex flex-col items-start text-xs text-muted-foreground md:flex-row md:items-end">
                        <span className="my-2">Copyright © {new Date().getFullYear()}</span>
                    </div>
                </div>
                <div className="flex flex-1 flex-col items-end justify-end">
                    <div className="pb-1">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </footer>
    );
};
