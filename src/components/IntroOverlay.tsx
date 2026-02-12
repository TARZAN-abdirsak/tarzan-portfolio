"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function IntroOverlay({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useGSAP(() => {
        if (!containerRef.current || !videoRef.current) return;

        // Lock scroll
        document.body.style.overflow = "hidden";

        // Sequence:
        // 1. Video auto-plays immediately (handled by HTML attributes + default play)
        // 2. Wait for 4 seconds (or video end)
        // 3. Animate Reveal

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = ""; // Unlock scroll
                setIsPlaying(false);
                onComplete(); // Notify parent to unmount/enable scrolling
            }
        });

        // Start reveal after few seconds
        tl.to(videoRef.current, {
            scale: 1.5,
            opacity: 0,
            duration: 1.5,
            ease: "power4.inOut",
            delay: 7, // Play video for 6s before revealing (increased)
        });

        tl.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.in",
        }, "<0.5"); // Start fading container slightly after video starts scaling

        // Cleanup function to ensure scroll is unlocked if component unmounts
        return () => {
            document.body.style.overflow = "";
        };

    }, { scope: containerRef });

    if (!isPlaying) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
            <video
                ref={videoRef}
                src="/videos/showecase-website.webm"
                muted
                autoPlay
                playsInline
                className="w-full h-full object-cover"
            />

            {/* Optional Skip Button (fades out with container) */}
            <button
                onClick={() => {
                    // Skip Logic:
                    // 1. Stop current timeline (prevent auto-reveal from firing twice)
                    // 2. Animate out immediately
                    if (containerRef.current && videoRef.current) {
                        gsap.globalTimeline.clear(); // Safety: clear any pending global GSAP calls if needed, or specific TL

                        // Create a new fast exit timeline
                        const exitTl = gsap.timeline({
                            onComplete: () => {
                                setIsPlaying(false);
                                onComplete();
                            }
                        });

                        exitTl.to(videoRef.current, { scale: 1.5, opacity: 0, duration: 0.8, ease: "power4.out" });
                        exitTl.to(containerRef.current, { opacity: 0, duration: 0.5 }, "<0.1");
                    }
                }}
                className="absolute bottom-10 right-10 text-white/50 text-sm uppercase tracking-widest hover:text-white transition-colors z-20"
            >
                Skip Intro
            </button>
        </div>
    );
}
