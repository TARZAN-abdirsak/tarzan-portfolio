"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { useCursor } from "@/context/CursorContext";
import LanyardBadge from "@/components/ui/lanyard-badge";
import profileImg from "@/assets/images/profile.jpg";


export default function AboutMeSection() {
    const { t } = useLanguage();
    const { showDrag, resetCursor } = useCursor();
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const noteRef = useRef<HTMLDivElement>(null);
    const badgeSlotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Simple fade-in animation
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                clearProps: "transform",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            gsap.from(noteRef.current, {
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                clearProps: "transform",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const [timeLeft, setTimeLeft] = useState("");

    // Fixed UTC Launch Date - 14 days from 2026-11-23
    const LAUNCH_DATE_UTC = "2026-12-07T17:30:00Z";

    useEffect(() => {
        const targetTime = new Date(LAUNCH_DATE_UTC).getTime();

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                return `${t("about.launch.status")} · ⏳ ${t("about.launch.in")} ${days}d ${hours}h ${minutes}m ${seconds}s`;
            } else {
                return t("about.launch.live");
            }
        };

        // Initial set
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [t]);

    return (
        <section id="about-me" ref={sectionRef} className="relative w-full flex-1 bg-[#f9f9f9] flex flex-col justify-start px-6 md:px-12 lg:px-24 pb-24 overflow-x-clip">

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start relative z-10">

                {/* Left Side: Big Typography */}
                <div ref={textRef} className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 z-10 justify-center lg:pt-4 order-2 lg:order-1 pb-8 lg:pb-0">
                    <div className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.1] font-black tracking-tight text-neutral-900 font-[family-name:var(--font-geist-sans)] text-center lg:text-left">
                        <span className="block">
                            {t("about.line1.pre")} <span className="relative inline-block px-1 lg:px-2">
                                <span className="absolute inset-0 bg-[#FFF9C4] -z-10 rounded-sm transform -rotate-1 skew-x-3 h-[90%] top-[5%]"></span>
                                {t("about.line1.hi")}
                            </span>
                        </span>
                        <span className="block mt-1 lg:mt-2">
                            {t("about.line2.pre")} <span className="relative inline-block px-1 lg:px-2">
                                <span className="absolute inset-0 bg-[#E0F7FA] -z-10 rounded-sm transform rotate-1 skew-x-[-3deg] h-[90%] top-[5%]"></span>
                                {t("about.line2.hi")}
                            </span>
                        </span>
                        <span className="block mt-1 lg:mt-2">
                            {t("about.line3.pre")}<span className="relative inline-block px-1 lg:px-2">
                                <span className="absolute inset-0 bg-[#FFEBEE] -z-10 rounded-sm transform -rotate-2 h-[90%] top-[5%]"></span>
                                {t("about.line3.hi")}
                            </span>
                        </span>
                    </div>

                    <div className="mt-4 lg:mt-6 text-center lg:text-left">
                        {/* Launch Countdown */}
                        <div className="mb-2 text-xs lg:text-sm font-mono font-bold text-neutral-500 uppercase tracking-widest">
                            {timeLeft || t("about.launch.loading")}
                        </div>

                        <h3 className="text-sm lg:text-base font-bold text-neutral-900 mb-2 lg:mb-4">{t("about.currentRole")}</h3>
                        <p className="text-base sm:text-lg md:text-xl text-neutral-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            {t("about.currentRole.desc")}
                        </p>
                    </div>
                </div>

                {/* Right Side: Anchor Slot for Floating Lanyard Badge & Handwritten Note */}
                <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-start gap-4 order-1 lg:order-2">

                    {/* Layout space reserved for the resting lanyard badge */}
                    <div
                        ref={badgeSlotRef}
                        className="relative w-full max-w-md h-[515px] pointer-events-none"
                    >
                        <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[11px] font-mono uppercase tracking-widest text-neutral-500/80">
                            {t("about.badge.hint")}
                        </div>
                    </div>

                    <div ref={noteRef} className="relative transform rotate-0 lg:rotate-2 transition-transform duration-300 hover:rotate-0 flex flex-col items-center lg:items-end">

                        {/* Greeting */}
                        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 mb-2 text-center lg:text-right">
                            <div
                                className="font-[family-name:var(--font-caveat)] text-xl lg:text-2xl font-black text-neutral-800"
                                style={{ textShadow: "0.5px 0 0 currentColor" }}
                            >
                                {t("about.greeting")}
                            </div>
                        </div>

                        {/* Handwritten Body */}
                        <div
                            className="font-[family-name:var(--font-caveat)] text-xl sm:text-2xl md:text-[1.65rem] text-neutral-800 leading-tight tracking-wide max-w-sm font-black text-center lg:text-right"
                            style={{ textShadow: "0.5px 0 0 currentColor" }}
                        >
                            {t("about.handwritten")}
                        </div>
                    </div>

                </div>

            </div>

            {/* Full-page floating Lanyard Badge overlay so the card & straps glide freely over every element */}
            <LanyardBadge
                overlay
                anchorRef={badgeSlotRef}
                onCardMouseEnter={showDrag}
                onCardMouseLeave={resetCursor}
                className="z-40 [--color-background:#ffffff] [--color-foreground:#171717] [--color-border:#e5e5e5] [--color-muted:#f0f0f0] [--color-primary:#171717]"
                title={t("about.badge.title")}
                subtitle={t("about.badge.subtitle")}
                name={t("about.badge.name")}
                role={t("about.badge.role")}
                strapText={t("about.badge.strapText")}
                strapLabel={t("about.badge.strapLabel")}
                flipButton={false}
                cardWidth={210}
                height="100%"
                front={
                    <div className="relative flex h-full w-full flex-col bg-[#e8dfcc] text-[#141312]">
                        {/* Top ID Header (clears punched lanyard slot) */}
                        <div className="flex items-center justify-between px-3.5 pt-[26px] pb-1.5">
                            <span className="flex items-center gap-1.5 text-[8px] font-mono font-bold tracking-[0.12em] text-[#141312]/75">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#b59a6c]" />
                                {t("about.badge.org")}
                            </span>
                            <span className="text-[7.5px] font-mono font-bold tracking-[0.14em] text-[#8f7447]">
                                ID · 2024
                            </span>
                        </div>

                        {/* Portrait Photo */}
                        <div className="relative mx-3.5 flex-1 min-h-0 overflow-hidden rounded-xl border border-[#141312]/15 bg-[#d9d2c5] shadow-inner">
                            <Image
                                src={profileImg}
                                alt={t("about.badge.name")}
                                fill
                                sizes="210px"
                                priority
                                draggable={false}
                                className="pointer-events-none select-none object-cover object-top"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10"
                            />
                        </div>

                        {/* Name & Role */}
                        <div className="px-3.5 pt-2.5 pb-2">
                            <div className="text-[14px] font-black uppercase leading-tight tracking-tight text-[#141312]">
                                {t("about.badge.name")}
                            </div>
                            <div className="mt-0.5 text-[7.5px] font-semibold uppercase tracking-[0.15em] text-[#7c643b]">
                                {t("about.badge.role")}
                            </div>
                        </div>

                        {/* Bottom ID Barcode Strip */}
                        <div className="flex items-center justify-between bg-[#141312] px-3.5 py-2 text-[#e8dfcc]">
                            <span className="text-[8px] font-mono font-bold uppercase tracking-[0.18em] text-[#b59a6c]">
                                {t("about.badge.title")}
                            </span>
                            <svg
                                viewBox="0 0 46 14"
                                width="44"
                                height="13"
                                aria-hidden="true"
                                className="text-[#e8dfcc]/80"
                                fill="currentColor"
                            >
                                <rect x="0" y="0" width="2" height="14" />
                                <rect x="4" y="0" width="1" height="14" />
                                <rect x="7" y="0" width="3" height="14" />
                                <rect x="12" y="0" width="1" height="14" />
                                <rect x="15" y="0" width="2" height="14" />
                                <rect x="19" y="0" width="3" height="14" />
                                <rect x="24" y="0" width="1" height="14" />
                                <rect x="27" y="0" width="2" height="14" />
                                <rect x="31" y="0" width="1" height="14" />
                                <rect x="34" y="0" width="3" height="14" />
                                <rect x="39" y="0" width="1" height="14" />
                                <rect x="42" y="0" width="2" height="14" />
                                <rect x="45" y="0" width="1" height="14" />
                            </svg>
                        </div>
                    </div>
                }
            />

        </section>
    );
}
