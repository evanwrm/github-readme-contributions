import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function BlurInput({
    value,
    onValueChange,
    ...props
}: {
    value: string | number;
    onValueChange?: (value: string) => void;
} & React.ComponentProps<typeof Input>) {
    const [internalValue, setInternalValue] = useState<string>(value.toString());

    useEffect(() => {
        setInternalValue(value.toString());
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
    };

    return (
        <Input
            value={internalValue}
            onChange={handleChange}
            onBlur={() => onValueChange?.(internalValue)}
            onKeyUp={e => e.key === "Enter" && onValueChange?.(internalValue)}
            {...props}
        />
    );
}
