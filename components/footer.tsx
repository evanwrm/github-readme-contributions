import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
    return (
        <footer className="border-border/40 border-t px-4 py-6">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
                <span className="text-muted-foreground text-xs">© {new Date().getFullYear()}</span>
                <ThemeToggle />
            </div>
        </footer>
    );
}
