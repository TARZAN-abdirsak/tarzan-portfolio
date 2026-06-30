"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

// Ship date — Day 5 of the Near 5-day sprint (APK build / shipping day)
const SHIP_DATE_UTC = "2026-05-14T12:00:00Z";

const screens = [
    { src: "/near/01.png", labelKey: "near.screen.1.label" as const },
    { src: "/near/02.png", labelKey: "near.screen.2.label" as const },
    { src: "/near/03.png", labelKey: "near.screen.3.label" as const },
    { src: "/near/04.png", labelKey: "near.screen.4.label" as const },
];

const stack = ["Flutter", "Supabase", "Go", "OpenAI"];

const featureKeys = [
    "near.feature.tasks",
    "near.feature.mood",
    "near.feature.sleep",
    "near.feature.nia",
    "near.feature.streaks",
] as const;

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
}

function getTimeLeft(): TimeLeft {
    const now = new Date().getTime();
    const target = new Date(SHIP_DATE_UTC).getTime();
    const diff = target - now;

    if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, isLive: true };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { hours, minutes, seconds, isLive: false };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function NearAppSection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<TimeLeft | null>(null);

    // Countdown tick
    useEffect(() => {
        setTime(getTimeLeft());
        const id = setInterval(() => setTime(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    // GSAP entrance animations
    useEffect(() => {
        if (typeof window === "undefined") return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Headline words fade up
            const words = headlineRef.current?.querySelectorAll(".near-word");
            if (words && words.length) {
                gsap.from(words, {
                    y: 60,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                });
            }

            // Reel fades/rises in as a whole
            if (galleryRef.current) {
                gsap.from(galleryRef.current, {
                    y: 80,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const splitWords = (text: string) =>
        text.split(" ").map((w, i) => (
            <span key={i} className="near-word inline-block mr-[0.25em]">
                {w}
            </span>
        ));

    return (
        <section
            ref={sectionRef}
            id="near-app"
            className="relative w-full bg-[#0a0a0a] text-white overflow-hidden py-24 md:py-32"
        >
            {/* Background grid + glow */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />
            <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-[#FF6B35] opacity-20 blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#4A90E2] opacity-20 blur-[180px] rounded-full pointer-events-none" />

            <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Eyebrow + Live badge */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                        <span className="w-8 h-px bg-white/40" />
                        {t("near.eyebrow")}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF4B4B]/15 border border-[#FF4B4B]/40 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF8A8A]">
                        <span className="relative flex w-2 h-2">
                            <span className="absolute inset-0 rounded-full bg-[#FF4B4B] animate-ping opacity-75" />
                            <span className="relative rounded-full w-2 h-2 bg-[#FF4B4B]" />
                        </span>
                        {t("near.shipBadge")}
                    </span>
                </div>

                {/* Headline */}
                <div ref={headlineRef} className="mb-10 max-w-5xl">
                    <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95]">
                        {splitWords(t("near.headline.line1"))}
                        <br />
                        <span className="inline-block bg-gradient-to-r from-[#FF6B35] via-[#FFC800] to-[#58CC02] bg-clip-text text-transparent">
                            {splitWords(t("near.headline.line2"))}
                        </span>
                    </h2>
                </div>

                {/* Top row: Brand block + Countdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 md:mb-24">

                    {/* Brand + description */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            {/* App icon */}
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#1E5AA8] flex items-center justify-center shadow-2xl shadow-[#4A90E2]/30 ring-1 ring-white/10">
                                <span className="text-3xl md:text-4xl font-black tracking-tighter">N</span>
                            </div>
                            <div>
                                <h3 className="text-3xl md:text-5xl font-black tracking-tighter">{t("near.appName")}</h3>
                                <p className="text-sm md:text-base text-white/60 mt-1">{t("near.tagline")}</p>
                            </div>
                        </div>

                        <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
                            {t("near.description")}
                        </p>

                        {/* Feature chips */}
                        <div className="flex flex-wrap gap-2">
                            {featureKeys.map((k) => (
                                <span
                                    key={k}
                                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80 hover:bg-white/10 hover:border-white/20 transition-colors"
                                >
                                    {t(k)}
                                </span>
                            ))}
                        </div>

                        {/* Tech stack */}
                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                {t("near.stack.label")}
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                                {stack.map((s, i) => (
                                    <React.Fragment key={s}>
                                        {i > 0 && <span className="text-white/20 text-xs">·</span>}
                                        <span className="text-xs font-mono font-bold text-white/70">{s}</span>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Countdown card */}
                    <div className="lg:col-span-5">
                        <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm p-6 md:p-8 overflow-hidden">
                            {/* Glow accent */}
                            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#FF6B35] opacity-30 blur-[80px] rounded-full pointer-events-none" />

                            <div className="relative">
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-4">
                                    {time?.isLive ? t("near.countdown.live") : t("near.countdown.label")}
                                </p>

                                {!time ? (
                                    // SSR / initial render placeholder — same shape, hidden numbers
                                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                                        {[0, 1, 2].map((i) => (
                                            <div key={i} className="rounded-2xl bg-black/40 border border-white/10 p-4">
                                                <div className="text-3xl md:text-5xl font-black tabular-nums tracking-tighter text-white/30">
                                                    --
                                                </div>
                                                <div className="h-3 mt-2" />
                                            </div>
                                        ))}
                                    </div>
                                ) : time.isLive ? (
                                    <div className="py-6 text-center">
                                        <div className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-[#58CC02] to-[#4A90E2] bg-clip-text text-transparent">
                                            LIVE
                                        </div>
                                        <p className="text-white/60 mt-2 text-sm">The app is now shipping.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                                        <div className="rounded-2xl bg-black/40 border border-white/10 p-3 md:p-4">
                                            <div className="text-3xl md:text-5xl font-black tabular-nums tracking-tighter">
                                                {pad(time.hours)}
                                            </div>
                                            <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-white/40 mt-1 font-semibold">
                                                {t("near.countdown.hours")}
                                            </div>
                                        </div>
                                        <div className="rounded-2xl bg-black/40 border border-white/10 p-3 md:p-4">
                                            <div className="text-3xl md:text-5xl font-black tabular-nums tracking-tighter">
                                                {pad(time.minutes)}
                                            </div>
                                            <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-white/40 mt-1 font-semibold">
                                                {t("near.countdown.minutes")}
                                            </div>
                                        </div>
                                        <div className="rounded-2xl bg-black/40 border border-white/10 p-3 md:p-4">
                                            <div className="text-3xl md:text-5xl font-black tabular-nums tracking-tighter text-[#FF6B35]">
                                                {pad(time.seconds)}
                                            </div>
                                            <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-white/40 mt-1 font-semibold">
                                                {t("near.countdown.seconds")}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                                    <span className="text-xs text-white/50 font-mono">
                                        {t("near.shipDate")}
                                    </span>
                                    <a
                                        href="https://github.com/TARZAN-abdirsak"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white inline-flex items-center gap-1 group"
                                    >
                                        {t("near.cta")}
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Phone screens — horizontal auto-scrolling reel (full-bleed) */}
            <div ref={galleryRef} className="near-reel-wrap relative mt-4">
                {/* Edge fades */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

                {/* Marquee track — duplicated for a seamless loop */}
                <div className="near-reel-track flex gap-5 md:gap-7 w-max py-4">
                    {[...screens, ...screens, ...screens].map((s, i) => (
                        <div key={i} className="near-reel-card group/card relative shrink-0">
                            <div className="relative w-[150px] md:w-[200px] aspect-[9/19] rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden bg-[#111] border-[3px] border-white/10 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover/card:scale-[1.05] group-hover/card:border-white/25 group-hover/card:shadow-[0_40px_100px_-15px_rgba(74,144,226,0.45)]">
                                {/* Notch */}
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-black rounded-full z-10" />
                                <Image
                                    src={s.src}
                                    alt={t(s.labelKey)}
                                    fill
                                    sizes="200px"
                                    className="object-cover"
                                />
                                {/* Label overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                                        {t(s.labelKey)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reel animation */}
            <style jsx>{`
                .near-reel-track {
                    animation: near-reel-scroll 36s linear infinite;
                }
                .near-reel-wrap:hover .near-reel-track {
                    animation-play-state: paused;
                }
                @keyframes near-reel-scroll {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        /* Move by exactly one set of the 4 screens (1/3 of the tripled track) */
                        transform: translateX(-33.3333%);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .near-reel-track {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    );
}
