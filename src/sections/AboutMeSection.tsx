"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProfileImage from "@/assets/images/profile.jpg";


export default function AboutMeSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const noteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Simple fade-in animation
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
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
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const [timeLeft, setTimeLeft] = useState("");

    // Fixed UTC Launch Date - Set this to your actual launch date
    const LAUNCH_DATE_UTC = "2026-05-01T12:00:00Z";

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

                return `⏳ Launch in ${days}d ${hours}h ${minutes}m ${seconds}s`;
            } else {
                return "🚀 Project is live";
            }
        };

        // Initial set
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section id="about-me" ref={sectionRef} className="relative w-full h-full bg-[#f9f9f9] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 relative h-full pt-20 lg:pt-0">

                {/* Left Side: Big Typography */}
                <div ref={textRef} className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 z-10 justify-center h-full order-2 lg:order-1 pb-12 lg:pb-0">
                    <div className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.1] font-black tracking-tight text-neutral-900 font-[family-name:var(--font-geist-sans)] text-center lg:text-left">
                        <span className="block">
                            Think For <span className="relative inline-block px-1 lg:px-2">
                                <span className="absolute inset-0 bg-[#FFF9C4] -z-10 rounded-sm transform -rotate-1 skew-x-3 h-[90%] top-[5%]"></span>
                                Users.
                            </span>
                        </span>
                        <span className="block mt-1 lg:mt-2">
                            Work With <span className="relative inline-block px-1 lg:px-2">
                                <span className="absolute inset-0 bg-[#E0F7FA] -z-10 rounded-sm transform rotate-1 skew-x-[-3deg] h-[90%] top-[5%]"></span>
                                Passion.
                            </span>
                        </span>
                        <span className="block mt-1 lg:mt-2">
                            Value What<span className="relative inline-block px-1 lg:px-2">
                                <span className="absolute inset-0 bg-[#FFEBEE] -z-10 rounded-sm transform -rotate-2 h-[90%] top-[5%]"></span>
                                Matter .
                            </span>
                        </span>
                    </div>

                    <div className="mt-4 lg:mt-1 xl:mt-16 text-center lg:text-left">
                        {/* Launch Countdown */}
                        <div className="mb-2 text-xs lg:text-sm font-mono font-bold text-neutral-500 uppercase tracking-widest">
                            {timeLeft || "Loading..."}
                        </div>

                        <h3 className="text-sm lg:text-base font-bold text-neutral-900 mb-2 lg:mb-4">Current role</h3>
                        <p className="text-base sm:text-lg md:text-xl text-neutral-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Currently focused on building and scaling Fiiri, a super app that brings chat, payments, and digital services into one platform.
                        </p>
                    </div>
                </div>

                {/* Right Side: Handwritten Note & Avatar */}
                <div ref={noteRef} className="lg:col-span-5 relative flex flex-col items-center lg:items-end lg:justify-start lg:pt-20 group lg:pl-16 order-1 lg:order-2">

                    {/* Arrow pointing to text - absolute relative to this container */}
                    <div className="hidden lg:block absolute left-0 top-[24rem] pointer-events-none transform -rotate-12 translate-x-4">
                        <svg width="150" height="150" viewBox="0 0 4123 4094" fill="none" className="text-black">
                            <path d="M32.252 3033.85L625.09 2694.35L569.228 3456.2L32.252 3033.85Z" fill="currentColor" />
                            <path d="M4093 1073.7C2845.15 1604.44 2294.72 1757.35 2229.43 1855.13C2164.15 1952.9 2981.95 1997.04 2952.4 2303.09C2922.85 2609.13 554.951 3291.71 498.091 3005.18" stroke="currentColor" strokeWidth="150" />
                        </svg>
                    </div>

                    <div className="relative transform rotate-0 lg:rotate-6 transition-transform duration-300 hover:rotate-0 flex flex-col items-center lg:items-end">

                        {/* Avatar with name */}
                        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 mb-4 text-center lg:text-right">
                            <div className="w-20 h-20 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 border-white shadow-md relative order-1">
                                <Image
                                    src={ProfileImage}
                                    alt="Abukar Abdirsak Gutale"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <div
                                className="font-[family-name:var(--font-caveat)] text-xl lg:text-2xl font-black text-neutral-800 order-2"
                                style={{ textShadow: "0.5px 0 0 currentColor" }}
                            >
                                Hi my name is Abukar Abdirsak Gutale
                            </div>
                        </div>

                        {/* Handwritten Body */}
                        <div
                            className="font-[family-name:var(--font-caveat)] text-2xl sm:text-3xl md:text-4xl text-neutral-800 leading-tight tracking-wide max-w-xs sm:max-w-sm font-black text-center lg:text-right"
                            style={{ textShadow: "0.5px 0 0 currentColor" }}
                        >
                            I enjoy solving problems and turning complex ideas into clear, reliable systems. I care about quality, clarity, and making things work the right way.
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
}
