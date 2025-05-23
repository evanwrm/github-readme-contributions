"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Spinner } from "./spinner";

interface PreviewImageProps {
    src: string;
    className?: string;
}

export const PreviewImage = ({ src, className }: PreviewImageProps) => {
    const [loading, setLoading] = useState(true);
    return (
        <div
            className={cn(
                "flex items-center justify-center overflow-hidden rounded-lg border bg-background",
                className
            )}
        >
            {loading && <Spinner className="absolute" />}
            <Image
                src={src}
                alt="GitHub Contributions"
                width={1000}
                height={600}
                className="w-full"
                unoptimized
                onLoad={() => setLoading(false)}
            />
        </div>
    );
};
