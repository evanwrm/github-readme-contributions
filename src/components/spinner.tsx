import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface Props {
    className?: string;
}

export const Spinner = ({ className }: Props) => {
    return <LoaderCircle className={cn("h-9 w-9 animate-spin", className)} />;
};
