"use client";

import { useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

interface ScrambleHoverTextProps {
    text: string;
    className?: string;
    revealSpeed?: number;   // ms per frame
    scrambleSpeed?: number; // How much progress per frame (higher = faster)
}

export default function ScrambleHoverText({
    text,
    className = "",
    revealSpeed = 30, // ms per interval tick
    scrambleSpeed = 0.5, // 0.5 char revealed per tick (2 ticks per char ~ 60ms)
}: ScrambleHoverTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startScramble = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current as NodeJS.Timeout);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current as NodeJS.Timeout);
                setDisplayText(text); // Ensure final state is clean
            }

            iteration += scrambleSpeed;
        }, revealSpeed);
    };

    const stopScramble = () => {
        if (intervalRef.current) clearInterval(intervalRef.current as NodeJS.Timeout);
        setDisplayText(text); // Reset immediately on leave
    };

    return (
        <span
            className={`inline-block cursor-default select-none ${className}`}
            onMouseEnter={startScramble}
            onMouseLeave={stopScramble}
        >
            {displayText}
        </span>
    );
}
