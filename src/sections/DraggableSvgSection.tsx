"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PhysicsCanvas = dynamic(() => import("@/components/PhysicsCanvas"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-100/50 animate-pulse rounded-[40px]" />
});

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SKILL_ICONS = [
    { id: '1', type: 'rectangle', text: 'JavaScript', icon: 'javascript.svg', color: '#F7DF1E' },
    { id: '2', type: 'rectangle', text: 'Python', icon: 'python.svg', color: '#3776AB' },
    { id: '3', type: 'rectangle', text: 'Go', icon: 'go-svgrepo-com.svg', color: '#00ADD8' },
    { id: '4', type: 'rectangle', text: 'React', icon: 'react.svg', color: '#61DAFB' },
    { id: '5', type: 'rectangle', text: 'HTML5', icon: 'html5.svg', color: '#E34F26' },
    { id: '6', type: 'rectangle', text: 'CSS', icon: 'css.svg', color: '#1572B6' },
    { id: '7', type: 'rectangle', text: 'Docker', icon: 'docker.svg', color: '#2496ED' },
    { id: '8', type: 'rectangle', text: 'Kubernetes', icon: 'kubernetes.svg', color: '#326CE5' },
    { id: '9', type: 'rectangle', text: 'AWS', icon: 'aws-svgrepo-com.svg', color: '#FF9900' },
    { id: '10', type: 'rectangle', text: 'PostgreSQL', icon: 'postgresql.svg', color: '#4169E1' },
    { id: '11', type: 'rectangle', text: 'MongoDB', icon: 'mongodb.svg', color: '#47A248' },
    { id: '12', type: 'rectangle', text: 'GitHub', icon: 'github.svg', color: '#181717' },
    { id: '13', type: 'rectangle', text: 'GitLab', icon: 'gitlab.svg', color: '#FC6D26' },
    { id: '14', type: 'rectangle', text: 'GitHub Actions', icon: 'githubactions.svg', color: '#2088FF' },
    { id: '15', type: 'rectangle', text: 'TailwindCSS', icon: 'tailwindcss.svg', color: '#06B6D4' },
] as const;

export default function DraggableSvgSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const text3Ref = useRef<HTMLDivElement>(null);
    const text4Ref = useRef<HTMLDivElement>(null);
    const text5Ref = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [dimensionsReady, setDimensionsReady] = useState(false); // Wait for actual dimensions
    const [dropped, setDropped] = useState(false);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({
                    width: Math.floor(rect.width),
                    height: Math.floor(rect.height)
                });
                setDimensionsReady(true); // Mark dimensions as measured
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // === FALLBACK: IntersectionObserver to ensure drop triggers on first view ===
    useEffect(() => {
        if (!triggerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setDropped(true);
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of section is visible
        );

        observer.observe(triggerRef.current);

        return () => observer.disconnect();
    }, []);

    // === RESPONSIVE ITEMS LOGIC ===
    // Track whether we're on mobile for stable memoization
    const isMobile = dimensions.width > 0 && dimensions.width < 768;

    const responsiveItems = React.useMemo(() => {
        if (!isMobile) return SKILL_ICONS as any; // Return original reference for desktop (stable)

        // Scale factor for mobile tools
        const SCALE = 0.4;
        const BASE_SIZE = 100; // Base size for icons (was relying on defaults likely similar)

        return SKILL_ICONS.map(item => ({
            ...item,
            width: BASE_SIZE * SCALE,
            height: BASE_SIZE * SCALE
        }));
    }, [isMobile]); // Only recalculate when crossing mobile/desktop threshold

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Initial state for all text groups
            gsap.set(text1Ref.current, { y: 0, opacity: 1, rotateX: 0 });
            gsap.set([text2Ref.current, text3Ref.current, text4Ref.current, text5Ref.current], {
                y: 100, opacity: 0, rotateX: -45,
            });

            // 1. PIN TRIGGER - Section stays pinned during scroll
            ScrollTrigger.create({
                trigger: triggerRef.current,
                start: "center center",
                end: "+=200%",  // Longer pin for 5 texts
                pin: true,
                pinSpacing: true,
            });

            // 2. ICONS DROP TRIGGER
            const dropTrigger = ScrollTrigger.create({
                trigger: triggerRef.current,
                start: "top center",
                onEnter: () => setDropped(true),
                onEnterBack: () => setDropped(true),  // Also trigger when scrolling back up into view
                onLeaveBack: () => setDropped(false),
                onRefresh: (self) => {
                    // Handle page refresh: if already scrolled past trigger, drop immediately
                    if (self.progress > 0) {
                        setDropped(true);
                    }
                },
            });

            // Force refresh to check initial scroll position on page load
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                if (dropTrigger.progress > 0) {
                    setDropped(true);
                }
            }, 100);

            // 3. TEXT ANIMATION TIMELINE - Cycles through all 5 texts
            const textTimeline = gsap.timeline();

            // Helper function for text transition
            const exitText = (ref: React.RefObject<HTMLDivElement | null>) => {
                if (!ref.current) return;
                textTimeline.to(ref.current, { rotateX: 45, opacity: 0.5, duration: 0.2, ease: "power2.in" })
                    .to(ref.current, { y: -80, opacity: 0, rotateX: 90, duration: 0.3, ease: "power2.inOut" });
            };

            const enterText = (ref: React.RefObject<HTMLDivElement | null>) => {
                if (!ref.current) return;
                textTimeline.to(ref.current, { y: 0, opacity: 1, rotateX: -15, duration: 0.4, ease: "power2.out" }, "-=0.15")
                    .to(ref.current, { rotateX: 0, duration: 0.2, ease: "elastic.out(1, 0.5)" });
            };

            // Text transitions: 1→2→3→4→5
            exitText(text1Ref); enterText(text2Ref);
            exitText(text2Ref); enterText(text3Ref);
            exitText(text3Ref); enterText(text4Ref);
            exitText(text4Ref); enterText(text5Ref);

            ScrollTrigger.create({
                trigger: triggerRef.current,
                start: "center center",
                end: "+=180%",
                scrub: 1,
                animation: textTimeline,
                onRefresh: (self) => {
                    // On page refresh, ensure text states match scroll progress
                    if (self.progress === 0) {
                        // Reset to initial state
                        gsap.set(text1Ref.current, { y: 0, opacity: 1, rotateX: 0 });
                        gsap.set([text2Ref.current, text3Ref.current, text4Ref.current, text5Ref.current], {
                            y: 100, opacity: 0, rotateX: -45,
                        });
                    }
                },
            });

        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="relative w-full min-h-[100dvh] bg-transparent text-black flex items-center justify-center p-8 md:p-16 overflow-hidden" style={{ contain: 'layout paint' }}>
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Side: Text Content with Animation */}
                <div className="lg:col-span-4 h-[400px] relative flex flex-col justify-center" style={{ perspective: '1000px' }}>
                    {/* First Text Group */}
                    <div ref={text1Ref} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col gap-6 origin-center">
                        <h2 className="text-5xl md:text-6xl font-serif tracking-tight leading-[1.1]">
                            My <br />
                            Tech <br />
                            Stack
                        </h2>
                        <p className="text-lg text-black/60 max-w-xs" style={{ fontFamily: 'var(--font-space-mono)' }}>
                            Tools I use daily to build scalable solutions.
                        </p>
                    </div>

                    {/* Second Text Group (Revealed on Scroll) */}
                    <div ref={text2Ref} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col gap-6 origin-center opacity-0">
                        <h2 className="text-5xl md:text-6xl font-serif tracking-tight leading-[1.1]">
                            Go Ahead, <br />
                            Play
                        </h2>
                        <p className="text-lg text-black/60 max-w-xs" style={{ fontFamily: 'var(--font-space-mono)' }}>
                            Drag the icons around. It&apos;s fun.
                        </p>
                    </div>

                    {/* Text 3 */}
                    <div ref={text3Ref} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col gap-6 origin-center opacity-0">
                        <h2 className="text-5xl md:text-6xl font-serif tracking-tight leading-[1.1]">
                            Built for <br />
                            Scale
                        </h2>
                        <p className="text-lg text-black/60 max-w-xs" style={{ fontFamily: 'var(--font-space-mono)' }}>
                            Cloud-native from day one.
                        </p>
                    </div>

                    {/* Text 4 */}
                    <div ref={text4Ref} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col gap-6 origin-center opacity-0">
                        <h2 className="text-5xl md:text-6xl font-serif tracking-tight leading-[1.1]">
                            End to <br />
                            End
                        </h2>
                        <p className="text-lg text-black/60 max-w-xs" style={{ fontFamily: 'var(--font-space-mono)' }}>
                            Frontend to backend, I do it all.
                        </p>
                    </div>

                    {/* Text 5 */}
                    <div ref={text5Ref} className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex flex-col gap-6 origin-center opacity-0">
                        <h2 className="text-5xl md:text-6xl font-serif tracking-tight leading-[1.1]">
                            Ready When <br />
                            You Are
                        </h2>
                        <p className="text-lg text-black/60 max-w-xs" style={{ fontFamily: 'var(--font-space-mono)' }}>
                            Let&apos;s build something amazing.
                        </p>
                    </div>
                </div>

                {/* Right Side: Physics Canvas Container */}
                <div className="lg:col-span-8 flex justify-center lg:justify-end">
                    <div
                        ref={containerRef}
                        className="relative w-full max-w-3xl aspect-[4/3] border-[1.5px] border-black/80 rounded-[40px] bg-[#f4f4f4] overflow-hidden shadow-sm"
                    >
                        <PhysicsCanvas
                            width={dimensions.width}
                            height={dimensions.height}
                            items={responsiveItems}
                            shouldDrop={dropped && dimensionsReady}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
