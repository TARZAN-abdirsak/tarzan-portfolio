"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PageWrapperProps {
    children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
    const mainRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!mainRef.current) return;

        // Global Background Color Transition
        // SYNCED with VideoScrollSection's ScrollTrigger
        // start: "top top" = when video section top reaches viewport top
        // end: "+=150%" = same as video section's scroll distance
        ScrollTrigger.create({
            trigger: "#bg-trigger-video",
            start: "top 30%",  // Start turning black earlier (before video pins)
            end: "+=180%",     // Extend duration to match original end point (150% + 30% offset)
            // markers: true,        // Keep for debugging if needed
            onEnter: () => {
                // Entering Video Section (pinned) -> Turn Black, Text White
                gsap.to(mainRef.current, {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            },
            onLeave: () => {
                // Leaving Video Section (after pin release) -> Return to Light, Text Black
                gsap.to(mainRef.current, {
                    backgroundColor: "#f9f9f9",
                    color: "#000000",
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            },
            onEnterBack: () => {
                // Re-entering Video Section from below -> Turn Black, Text White
                gsap.to(mainRef.current, {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            },
            onLeaveBack: () => {
                // Leaving Video Section (scrolling back up to Hero) -> Return to Light, Text Black
                gsap.to(mainRef.current, {
                    backgroundColor: "#f9f9f9",
                    color: "#000000",
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            },
            onRefresh: (self) => {
                // Ensure correct state on page load/refresh
                if (self.isActive) {
                    gsap.set(mainRef.current, {
                        backgroundColor: "#000000",
                        color: "#ffffff"
                    });
                }
            }
        });

    }, { scope: mainRef });

    return (
        <main
            ref={mainRef}
            className="flex min-h-[100dvh] flex-col bg-[#f9f9f9]"
        >
            {children}
        </main>
    );
}
