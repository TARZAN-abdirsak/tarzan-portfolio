"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// Walk up the DOM to find the first ancestor with a non-transparent background
function getEffectiveBackgroundColor(el: Element | null): { r: number; g: number; b: number } {
    let current = el;
    while (current && current !== document.documentElement) {
        const bg = window.getComputedStyle(current).backgroundColor;
        const match = bg.match(/[\d.]+/g);
        if (match) {
            const values = match.map(Number);
            const r = values[0], g = values[1], b = values[2];
            const a = values.length >= 4 ? values[3] : 1;
            if (a > 0) {
                return { r, g, b };
            }
        }
        current = current.parentElement;
    }
    return { r: 255, g: 255, b: 255 };
}

// Simple flip digit — only animates when the character actually changes
function FlipChar({ char, color }: { char: string; color: string }) {
    const [displayChar, setDisplayChar] = useState(char);
    const [oldChar, setOldChar] = useState(char);
    const [isFlipping, setIsFlipping] = useState(false);
    const prevCharRef = useRef(char);

    useEffect(() => {
        if (char !== prevCharRef.current) {
            // Character actually changed — trigger flip
            setOldChar(prevCharRef.current);
            setIsFlipping(true);

            // After animation, show new char and stop flipping
            const timer = setTimeout(() => {
                setDisplayChar(char);
                setIsFlipping(false);
            }, 350);

            prevCharRef.current = char;
            return () => clearTimeout(timer);
        }
    }, [char]);

    const isColon = char === ":";
    const charWidth = isColon ? "0.4em" : "0.65em";

    return (
        <span
            className="relative inline-block overflow-hidden text-center"
            style={{ width: charWidth, height: "1.25em", lineHeight: "1.25em" }}
        >
            {isFlipping ? (
                <>
                    {/* Old char sliding up */}
                    <span
                        className={`absolute inset-0 flex items-center justify-center ${color}`}
                        style={{ animation: "flipOut 350ms ease-out forwards" }}
                    >
                        {oldChar}
                    </span>
                    {/* New char sliding in from below */}
                    <span
                        className={`absolute inset-0 flex items-center justify-center ${color}`}
                        style={{ animation: "flipIn 350ms ease-out forwards" }}
                    >
                        {char}
                    </span>
                </>
            ) : (
                /* Static display */
                <span className={`absolute inset-0 flex items-center justify-center ${color}`}>
                    {displayChar}
                </span>
            )}
        </span>
    );
}

export default function LiquidTimeWidget() {
    const [time, setTime] = useState<string>("");
    const [isDarkBg, setIsDarkBg] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Africa/Mogadishu",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            };
            const formatted = now.toLocaleTimeString("en-US", options).replace(" ", "");
            setTime(formatted);
        };

        updateTime();
        // Update every 10 seconds instead of every second (only showing hours:minutes)
        const timer = setInterval(updateTime, 10000);
        return () => clearInterval(timer);
    }, []);

    const checkBackground = useCallback(() => {
        if (!widgetRef.current) return;

        const rect = widgetRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const wrapper = widgetRef.current.parentElement;
        if (wrapper) wrapper.style.display = "none";

        const el = document.elementFromPoint(centerX, centerY);

        if (wrapper) wrapper.style.display = "";

        if (el) {
            const { r, g, b } = getEffectiveBackgroundColor(el);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            setIsDarkBg(luminance < 0.5);
        } else {
            setIsDarkBg(false);
        }
    }, []);

    useEffect(() => {
        const initialCheck = setTimeout(checkBackground, 100);

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    checkBackground();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            clearTimeout(initialCheck);
            window.removeEventListener("scroll", onScroll);
        };
    }, [checkBackground]);

    if (!time) return null;

    const locationColor = isDarkBg ? "text-white" : "text-black";

    return (
        <div ref={widgetRef} className="px-4 py-2 select-none transition-colors duration-300">
            <div className="flex items-baseline gap-2 font-serif text-lg md:text-xl tracking-tight">
                <span className={`leading-none font-bold transition-colors duration-300 ${locationColor}`}>
                    Mogadishu, Somalia
                </span>
                <span className="font-medium leading-none inline-flex">
                    {time.split("").map((char, i) => (
                        <FlipChar key={i} char={char} color="text-emerald-500" />
                    ))}
                </span>
            </div>
        </div>
    );
}
