import { cn } from "@/lib/utils";
import Image from "next/image";

interface PreviewImageProps {
    src: string;
    className?: string;
}

export const PreviewImage = ({ src, className }: PreviewImageProps) => {
    return (
        <div className={cn("overflow-hidden rounded-lg border bg-background", className)}>
            <Image
                src={src}
                alt="GitHub Contributions"
                width={1000}
                height={600}
                className="w-full"
                unoptimized
            />
        </div>
    );
};
