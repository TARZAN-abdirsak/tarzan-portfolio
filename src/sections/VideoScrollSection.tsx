"use client";

import React, { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoScrollSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !videoRef.current || !contentRef.current || !videoContainerRef.current) return;

        // Timeline for the shrinking animation (scrubbed)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=150%",
                scrub: true,
                pin: true,
                pinSpacing: true,
                onEnter: () => {
                    if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        const playPromise = videoRef.current.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => { });
                        }
                    }
                },
                onLeave: () => { },
                onEnterBack: () => {
                    const playPromise = videoRef.current?.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => { });
                    }
                },
                onLeaveBack: () => {
                    if (videoRef.current) {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                },
                onRefresh: (self) => {
                    // Handle page refresh: restore visual states based on scroll progress
                    if (self.isActive && videoRef.current) {
                        const playPromise = videoRef.current.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => { });
                        }
                    }
                    // If progress is 0, reset to initial state
                    if (self.progress === 0 && videoContainerRef.current && contentRef.current) {
                        gsap.set(videoContainerRef.current, {
                            width: "90vw",
                            height: "85vh",
                            borderRadius: "40px",
                            borderWidth: "0px",
                            borderColor: "rgba(255,255,255,0)",
                        });
                        gsap.set(contentRef.current, { opacity: 0, scale: 0.85, y: 30 });
                    }
                }
            },
        });

        // 1. Shrink Video Container (Keeps it centered via Flexbox)
        tl.fromTo(videoContainerRef.current,
            {
                width: "90vw",
                height: "85vh",
                borderRadius: "40px",
                borderWidth: "0px",
                borderColor: "rgba(255,255,255,0)",
            },
            {
                width: "210px",
                height: "150px",
                borderRadius: "16px",
                borderWidth: "1px",
                borderColor: "rgba(255,255,255,0.1)",
                ease: "power2.inOut",
                duration: 1,
            },
            ">"
        );

        // 2. Reveal Content (The Text)
        tl.fromTo(
            contentRef.current,
            { opacity: 0, scale: 0.85, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4 },
            ">-=0.3"
        );

    }, { scope: sectionRef });

    return (
        <div
            id="video-section"
            ref={sectionRef}
            className="relative w-full h-[100dvh] bg-transparent flex flex-col items-center justify-center p-4 overflow-hidden z-30"
            style={{ cursor: 'none', contain: 'layout paint' }}
        >
            {/* Text Content Layer */}
            <div
                ref={contentRef}
                className="absolute inset-0 flex flex-col items-center justify-center z-10 opacity-0"
            >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-center tracking-tight leading-[1] text-inherit">
                    Production-Driven <br />
                    <span className="font-light italic text-[#F22F5D] mx-2">Software </span>Systems <br />
                    For
                </h2>

                {/* Spacer for where the video resides */}
                <div className="h-[240px] w-full" />

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-center tracking-tight leading-[1] text-inherit mt-4">
                    Real-World <br />
                    Scale
                </h2>
            </div>

            {/* Video Container with reserved aspect ratio for CLS prevention */}
            <div
                ref={videoContainerRef}
                className="relative z-20 overflow-hidden"
                style={{
                    width: '90vw',
                    height: '85vh',
                    aspectRatio: '16 / 9',
                    contain: 'layout',
                    borderRadius: '40px', // Matches initial state
                }}
            >
                <video
                    ref={videoRef}
                    src="/videos/Showreel-2026.webm"
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover bg-neutral-900"
                    style={{ cursor: 'none' }}
                />
            </div>

            {/* Blue Dot removed */}
        </div>
    );
}
