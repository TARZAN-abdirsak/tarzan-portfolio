"use client";

import React, { useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import seminarGroupImg from "@/assets/images/seminar_group.png";
import { useCursor } from "@/context/CursorContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Inline SVG icons (avoid lucide-react bundle)
const CheckCircleIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-green-500 shrink-0">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const GithubIcon = ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const InteractiveAvatar = dynamic(() => import("@/components/InteractiveAvatar"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#f0f0f0] animate-pulse rounded-full" />
});



const SemanticLetter = ({
    char,
    word,
    className = "",
    wordClassName = "",
    rotation = -25,
    top = "-20%",
    left = "50%",
    sizeClass = "text-lg md:text-2xl lg:text-3xl",
    onMouseEnter,
    onMouseLeave
}: {
    char: React.ReactNode,
    word: string,
    className?: string,
    wordClassName?: string,
    rotation?: number,
    top?: string,
    left?: string,
    sizeClass?: string,
    onMouseEnter?: () => void,
    onMouseLeave?: () => void
}) => {
    return (
        <span
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`relative inline-block group ${className}`}
        >
            <span className="relative z-10 text-4xl md:text-6xl lg:text-8xl font-chonburi text-black tracking-wide">{char}</span>
            <span
                className={`absolute -translate-x-1/2 -translate-y-1/2 font-sans font-thin italic text-black whitespace-nowrap pointer-events-none z-20 ${sizeClass} ${wordClassName}`}
                style={{
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    top: top,
                    left: left
                }}
            >
                {word.split('').map((c, i) => (
                    <span
                        key={i}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-0"
                        style={{ transitionDelay: `${i * 30}ms` }}
                    >
                        {c}
                    </span>
                ))}
            </span>
        </span>
    );
};

// Configuration for Green SVG Lines (Position & Rotation)
const heroLineConfig = {
    left: {
        rotation: 5,           // Initial rotation (degrees)
        animateTo: 1,          // Rotation animation target (degrees)
        duration: 5,           // Animation duration (seconds)
        bottom: "20%",         // Vertical position (Mobile) - Reverted to previous
        mdBottom: "2%",        // Vertical position (Desktop)
        left: "-5%",           // Horizontal position (Mobile)
        mdLeft: "-2%",         // Horizontal position (Desktop)
        width: "400px",        // Width (Mobile)
        mdWidth: "550px"       // Width (Desktop)
    },
    right: {
        rotation: -2,          // Initial rotation
        animateTo: 1,         // Animation target
        duration: 6,           // Duration
        bottom: "18%",         // Vertical position (Mobile) - Reverted to previous
        mdBottom: "1%",        // Vertical position (Desktop)
        right: "-30%",          // Horizontal position (Mobile)
        mdRight: "-3%",        // Horizontal position (Desktop)
        width: "400px",        // Width (Mobile)
        mdWidth: "550px"       // Width (Desktop)
    }
};

const REPEAT_COUNT = 20;

export default function HeroSection() {
    const { showRead, showClick, resetCursor } = useCursor();
    const sectionRef = useRef<HTMLElement>(null);
    const leftSvgRef = useRef<HTMLDivElement>(null);
    const rightSvgRef = useRef<HTMLDivElement>(null);

    // Single Ref per Path to avoid overlap
    const leftTextRef = useRef<SVGTextPathElement>(null);
    const rightTextRef = useRef<SVGTextPathElement>(null);

    useGSAP(() => {
        // Initial Rotation State
        if (leftSvgRef.current) gsap.set(leftSvgRef.current, { rotation: heroLineConfig.left.rotation });
        if (rightSvgRef.current) gsap.set(rightSvgRef.current, { rotation: heroLineConfig.right.rotation });

        // Synchronized Seamless Loop
        const duration = 20; // seconds
        const ease = "none";

        const animateLoop = (ref: React.RefObject<SVGTextPathElement | null>, offsetPx: number = 0) => {
            if (!ref.current) return;

            // Measure the full text length
            const totalTextLength = ref.current.getComputedTextLength();
            // Calculate length of ONE pattern iteration
            const patternLength = totalTextLength / REPEAT_COUNT;

            // We want to move "FORWARD" (Left -> Right).
            // To do this seamlessly, we start shifted LEFT by one pattern length (-patternLength)
            // and animate to 0. 
            // When we hit 0, we are visually identical to -patternLength state.

            // Apply extra offset (phase shift) to simulate continuity
            // A negative offsetPx means we are looking "further down" the text string
            // This makes the text appear to be physically shifted
            const start = -patternLength + offsetPx;
            const end = 0 + offsetPx;

            gsap.fromTo(ref.current,
                { attr: { startOffset: start } },
                {
                    attr: { startOffset: end },
                    duration: duration,
                    ease: ease,
                    repeat: -1
                }
            );
        };

        // --- OFFSET CONFIGURATION ---
        // Change these numbers to adjust the text timing/position
        const LEFT_TEXT_OFFSET = 0;
        const RIGHT_TEXT_OFFSET = -900; // Increase this (e.g., -1000) to delay/push back the right text

        // Delay slightly if needed, but usually fine
        animateLoop(leftTextRef, LEFT_TEXT_OFFSET);
        // Offset Right by -800 to create difference
        animateLoop(rightTextRef, RIGHT_TEXT_OFFSET);

    });

    // Memoize hover handlers to prevent recreation
    const handleLetterHover = useCallback(() => showRead(), [showRead]);
    const handleGithubHover = useCallback(() => showClick(), [showClick]);
    const handleDefaultHover = useCallback(() => resetCursor(), [resetCursor]);

    // Memoize the heavy marquee text string
    const marqueeText = useMemo(() => "INNOVATIVE • CREATIVE • SCALABLE • ".repeat(REPEAT_COUNT), []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[100dvh] w-full bg-transparent overflow-hidden flex flex-col items-center justify-start md:justify-center pt-32 md:pt-24 pb-12"
            style={{
                contain: 'layout paint',
                // Map Configuration to CSS Variables for Responsive Usage
                '--hl-l-bot-mob': heroLineConfig.left.bottom,
                '--hl-l-bot-desk': heroLineConfig.left.mdBottom,
                '--hl-l-mob': heroLineConfig.left.left,
                '--hl-l-desk': heroLineConfig.left.mdLeft,
                '--hl-l-w-mob': heroLineConfig.left.width,
                '--hl-l-w-desk': heroLineConfig.left.mdWidth,

                '--hl-r-bot-mob': heroLineConfig.right.bottom,
                '--hl-r-bot-desk': heroLineConfig.right.mdBottom,
                '--hl-r-mob': heroLineConfig.right.right,
                '--hl-r-desk': heroLineConfig.right.mdRight,
                '--hl-r-w-mob': heroLineConfig.right.width,
                '--hl-r-w-desk': heroLineConfig.right.mdWidth,
            } as React.CSSProperties}
        >
            {/* Background Grain/Noise (Optional, keeping it clean for now) */}

            {/* Floating Decorative Elements */}
            {/* Top Left Outline Squiggle */}
            <div className="absolute top-[10%] md:top-[15%] left-[10%] w-16 h-16 opacity-60 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2">
                    <path d="M30,30 Q50,5 70,30 T90,50" transform="rotate(-20 50 50)" />
                    <path d="M20,60 Q40,40 60,60" transform="rotate(-10 50 50)" />
                </svg>
            </div>

            {/* Middle Left Outline Bean */}
            <div className="absolute top-[50%] left-[12%] w-12 h-12 opacity-40 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2">
                    <path d="M10,50 Q10,10 50,10 T90,50 T50,90 T10,50" />
                </svg>
            </div>


            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">

                {/* UNIFIED HEADLINE CONTAINER */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-8 md:gap-y-8 mb-12 md:mb-8 pt-0 md:pt-0">

                    {/* Group 1: "I" */}
                    <div className="relative inline-flex flex-col items-center justify-center group">
                        <span className="text-4xl md:text-6xl lg:text-8xl font-chonburi text-black tracking-wide relative z-10">
                            I
                        </span>
                        <span className="absolute left-[230%] top-[-50%] -translate-x-1/2 -translate-y-1/2 text-1xl md:text-3xl lg:text-5xl font-sans font-thin italic text-black opacity-0 group-hover:opacity-100 rotate-[-30deg] transition-all duration-300 ease-out whitespace-nowrap pointer-events-none z-20">
                            nnovator
                        </span>
                    </div>

                    {/* Group 2: Avatar Pointer */}
                    <div
                        id="hero-avatar-target"
                        className="relative w-16 h-16 md:w-28 md:h-28 rounded-full overflow-hidden z-10 bg-transparent"
                        onMouseEnter={showClick}
                        onMouseLeave={handleDefaultHover}
                    >
                    </div>

                    {/* Group 3: "design" */}
                    <div className="flex items-center justify-center">
                        <SemanticLetter char="d" word="data" rotation={-60} top="-7%" left="150%" sizeClass="text-xl md:text-3xl lg:text-5xl" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="e" word="expert" rotation={-60} top="-5%" left="190%" sizeClass="text-xl md:text-3xl lg:text-5xl" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="s" word="style" rotation={-60} top="-1%" left="160%" sizeClass="text-xl md:text-3xl lg:text-5xl" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="i" word="interface" rotation={-60} top="-25%" left="350%" sizeClass="text-xl md:text-3xl lg:text-5xl" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="g" word="graphic" rotation={-20} top="-20%" left="220%" sizeClass="text-xl md:text-3xl lg:text-5xl" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="n" word="native" rotation={-60} top="-15%" left="170%" sizeClass="text-xl md:text-3xl lg:text-5xl" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                    </div>

                    {/* Group 4: "&" */}
                    <div className="w-12 h-12 md:w-24 md:h-24 bg-[#fffeb5] rounded-full flex items-center justify-center border-4 border-[#f4f4f4] z-0 shrink-0">
                        <span className="text-xl md:text-5xl font-bold text-black font-chonburi">&</span>
                    </div>

                    {/* BREAK: Mobile Only - Forces "build" to new line on mobile */}
                    <div className="w-full md:hidden"></div>

                    {/* Group 5: "build" */}
                    <div className="flex items-baseline justify-center">
                        <SemanticLetter char="b" word="backend" rotation={-20} top="-15%" left="50%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="u" word="utility" rotation={30} top="-15%" left="60%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <a
                            href="https://github.com/TARZAN-abdirsak"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex flex-col items-center justify-end mx-[0.02em] group"
                            onMouseEnter={handleGithubHover}
                            onMouseLeave={handleDefaultHover}
                        >
                            {/* Dotless i */}
                            <span className="text-4xl md:text-6xl lg:text-8xl font-chonburi text-black tracking-wide">ı</span>
                            {/* GitHub Icon as Dot */}
                            <GithubIcon
                                className="absolute -top-[0.05em] w-[0.8em] h-[0.8em] text-black transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                                strokeWidth={2.5}
                            />
                        </a>
                        <SemanticLetter char="l" word="library" rotation={-25} top="-25%" left="160%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="d" word="database" rotation={15} top="-20%" left="180%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                    </div>

                    {/* BREAK: Desktop Only - Forces "Scalable" to new line on desktop, but keeps it on same line as Build for mobile */}
                    <div className="hidden md:block w-full"></div>

                    {/* Group 6: "scalable" */}
                    <div className="flex items-center justify-center">
                        <SemanticLetter char="s" word="stable" rotation={-20} top="10%" left="150%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="c" word="cloud" rotation={20} top="10%" left="150%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="a" word="api" rotation={-30} top="20%" left="100%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="l" word="load" rotation={20} top="10%" left="150%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="a" word="auto" rotation={-25} top="15%" left="110%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="b" word="big" rotation={10} top="10%" left="80%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="l" word="level" rotation={-20} top="10%" left="150%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="e" word="elastic" rotation={20} top="15%" left="150%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                    </div>

                    {/* BREAK: Mobile Only - Forces "Software" to new line on mobile */}
                    <div className="w-full md:hidden"></div>

                    {/* Group 7: "software" */}
                    <div className="flex items-center justify-center">
                        <SemanticLetter char="s" word="server" rotation={-25} top="10%" left="120%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="o" word="object" rotation={15} top="5%" left="120%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="f" word="function" rotation={-10} top="10%" left="200%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="t" word="type" rotation={-10} top="-8%" left="220%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="w" word="web" rotation={20} top="-10%" left="120%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="a" word="array" rotation={15} top="5%" left="120%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="r" word="react" rotation={-25} top="-5%" left="100%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="e" word="edge" rotation={15} top="-5%" left="150%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                    </div>

                    {/* Group 8: Image */}
                    <div className="relative h-12 md:h-24 w-32 md:w-64 rounded-full overflow-hidden border-2 border-transparent">
                        <Image
                            src={seminarGroupImg}
                            alt="Seminars"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Group 9: "systems" */}
                    <div className="flex items-center justify-center">
                        <SemanticLetter char="s" word="stack" rotation={-20} top="20%" left="150%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="y" word="yield" rotation={-10} top="-10%" left="150%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="s" word="sync" rotation={-30} top="-30%" left="100%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="t" word="tool" rotation={-15} top="-15%" left="50%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="e" word="error" rotation={-25} top="-25%" left="60%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="m" word="memory" rotation={-10} top="-10%" left="40%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                        <SemanticLetter char="s" word="shell" rotation={-20} top="-20%" left="50%" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover} />
                    </div>
                </div>

                {/* Subtitle */}
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium" onMouseEnter={handleLetterHover} onMouseLeave={handleDefaultHover}>
                    Helping businesses turn complex ideas into scalable and high performance software solutions using modern technologies
                </p>

            </div>

            {/* Bottom Floating Elements */}

            {/* Green ZigZag (Bottom Right - connected flow with text) - USING CONFIG */}
            <div
                ref={rightSvgRef}
                className="absolute z-0 pointer-events-none opacity-90 bottom-[var(--hl-r-bot-mob)] md:bottom-[var(--hl-r-bot-desk)] right-[var(--hl-r-mob)] w-[var(--hl-r-w-mob)] md:right-[var(--hl-r-desk)] md:w-[var(--hl-r-w-desk)]"
            >
                <svg viewBox="0 0 2317 722" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                        <path id="greenLinePathRight" d="M9.390 402.937C9.390 402.937 458.390 457.500 676.580 402.937C894.770 348.375 869.540 118.245 959.220 118.245C1048.890 118.245 1178.070 351.187 1358.890 352.000C1557.165 352.892 1593.891 75.000 1784.391 75.000 1974.891 75.000 2246.454 634.500 2241.954 717.000" />
                    </defs>
                    <use href="#greenLinePathRight" stroke="#2BA858" strokeWidth="150" strokeLinecap="round" />

                    {/* Single Text with Seamless GSAP Loop */}
                    <text fill="white" fontSize="90" fontWeight="bold" fontFamily="sans-serif" dy="30" style={{ letterSpacing: '0.1em' }}>
                        <textPath ref={rightTextRef} href="#greenLinePathRight" startOffset="0%" textAnchor="start">
                            {marqueeText}
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* Green Line (Bottom Left - behind Code Quality) - USING CONFIG */}
            <div
                ref={leftSvgRef}
                className="absolute z-0 pointer-events-none opacity-90 bottom-[var(--hl-l-bot-mob)] md:bottom-[var(--hl-l-bot-desk)] left-[var(--hl-l-mob)] w-[var(--hl-l-w-mob)] md:left-[var(--hl-l-desk)] md:w-[var(--hl-l-w-desk)]"
            >
                <svg viewBox="0 0 2317 722" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                        <path id="greenLinePath" d="M75.0462 717C70.5463 634.5 342.109 75 532.609 75C723.109 75 759.835 352.892 958.11 352C1138.93 351.187 1268.11 118.245 1357.78 118.245C1447.46 118.245 1422.23 348.375 1640.42 402.937C1858.61 457.5 2307.61 402.937 2307.61 402.937" />
                    </defs>
                    <use href="#greenLinePath" stroke="#2BA858" strokeWidth="150" strokeLinecap="round" />

                    {/* Single Text with Seamless GSAP Loop */}
                    <text fill="white" fontSize="90" fontWeight="bold" fontFamily="sans-serif" dy="30" style={{ letterSpacing: '0.1em' }}>
                        <textPath ref={leftTextRef} href="#greenLinePath" startOffset="0%" textAnchor="start">
                            {marqueeText}
                        </textPath>
                    </text>
                </svg>
            </div>


            {/* Black Card (Bottom Left) */}
            <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 bg-black text-white p-5 rounded-2xl w-56 shadow-2xl z-20 hidden md:block rotate-[-5deg]">
                <h4 className="font-bold text-base mb-3">Code Quality</h4>
                <div className="flex items-center gap-3 mb-2 text-xs text-gray-300">
                    <CheckCircleIcon />
                    <span>Implementation guarantee</span>
                </div>
                <div className="flex items-center gap-3 mb-2 text-xs text-gray-300">
                    <CheckCircleIcon />
                    <span>Clean & Scalable Code</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                    <CheckCircleIcon />
                    <span>High Performance & ...</span>
                </div>
            </div>

            {/* Stamp / Circle Badge (Bottom Right) */}
            <div className="absolute bottom-10 right-10 md:bottom-24 md:right-35 w-24 h-24 hidden md:flex items-center justify-center z-20 bg-[#f4f4f4] rounded-full border border-black animate-spin-slow">
                {/* Rotating Text workaround: Simple SVG text */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
                        <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                        <text className="text-[10px] uppercase font-bold tracking-widest fill-black">
                            <textPath href="#curve">
                                • Explorer Nos Productions • Explorer Nos Productions
                            </textPath>
                        </text>
                    </svg>
                    <ArrowRightIcon className="absolute w-6 h-6 text-black rotate-45" />
                </div>
            </div>

        </section>
    );
}
