"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function AiIntegrationSection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const doorContainerRef = useRef<HTMLDivElement>(null);
    const doorRef = useRef<HTMLDivElement>(null);
    const whiteOverlayRef = useRef<HTMLDivElement>(null);

    // Refs for animated parts
    const leftLabelRef = useRef<HTMLDivElement>(null);
    const rightLabelRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    // SVG Refs for Cinematic Draw
    const svgPart1Ref = useRef<SVGTextElement>(null); // INTELL
    const svgPart3Ref = useRef<SVGTextElement>(null); // GENCE
    const portalRef = useRef<HTMLDivElement>(null);   // Portal behind door

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(() => {
            // CALCULATE EXACT ZOOM TARGET
            // We calculate where the portal is relative to the content container
            const updateZoomOrigin = () => {
                if (contentRef.current && portalRef.current) {
                    const contentRect = contentRef.current.getBoundingClientRect();
                    const portalRect = portalRef.current.getBoundingClientRect();

                    const relativeX = (portalRect.left + portalRect.width / 2) - contentRect.left;
                    const relativeY = (portalRect.top + portalRect.height / 2) - contentRect.top;

                    gsap.set(contentRef.current, {
                        transformOrigin: `${relativeX}px ${relativeY}px`
                    });
                }
            };

            if (sectionRef.current && doorRef.current && contentRef.current) {

                // --- 0. Initial Setup ---
                const stops = sectionRef.current.querySelectorAll(".liquid-stop");
                const allTextSvgs = [svgPart1Ref.current, svgPart3Ref.current].filter(Boolean);

                // Set initial state for Cinematic Draw
                allTextSvgs.forEach((el) => {
                    if (el) {
                        gsap.set(el, {
                            strokeDasharray: 2000,
                            strokeDashoffset: 2000,
                            fill: "url(#sharp-liquid)",
                            stroke: "black",
                            strokeWidth: "1px",
                            opacity: 1
                        });
                    }
                });
                if (stops.length > 0) gsap.set(stops, { attr: { offset: "0%" } });

                // Initial state for overlay
                if (whiteOverlayRef.current) gsap.set(whiteOverlayRef.current, { opacity: 0 });

                // Run immediately to set the correct origin
                updateZoomOrigin();
                window.addEventListener("resize", updateZoomOrigin);

                // --- 1. Master Timeline (Pinning) ---
                const masterTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=150%",
                        pin: true,
                        scrub: 2, // Increased for smoother scroll-back
                        anticipatePin: 1,
                    }
                });


                // --- 2. Sequence Layout ---

                // Entrance Animation (Draw + Fill + Text Reveal) - Triggered when section reaches top 50%
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top 60%", // Start a bit earlier
                    end: "top top",   // End when pinned
                    toggleActions: "play none none reverse", // Play forward, reverse when scrolling back up
                    onEnter: () => {
                        const entryTl = gsap.timeline();

                        // Draw INTELLIGENCE
                        entryTl.to(allTextSvgs, {
                            strokeDashoffset: 0,
                            duration: 2.5,
                            ease: "power2.inOut"
                        });

                        // Fill INTELLIGENCE
                        if (stops.length > 0) {
                            entryTl.to(stops, {
                                attr: { offset: "100%" },
                                duration: 2,
                                ease: "power2.inOut"
                            }, "<1.0");
                        }

                        // Animate Description Text IN (Fade + Slide Up)
                        if (descRef.current) {
                            entryTl.fromTo(descRef.current,
                                { autoAlpha: 0, y: 20 },
                                { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
                                "<0.5"
                            );
                        }
                    },
                    onLeaveBack: () => {
                        // Reset when scrolling back up past trigger
                        gsap.to(allTextSvgs, { strokeDashoffset: 2000, duration: 0.5 });
                        if (stops.length > 0) gsap.to(stops, { attr: { offset: "0%" }, duration: 0.5 });
                        if (descRef.current) gsap.to(descRef.current, { autoAlpha: 0, y: 20, duration: 0.5 });
                    }
                });


                // Portal Animation Sequence
                // ... (rest of masterTl)

                masterTl.to(doorRef.current, {
                    rotateY: -130,
                    duration: 1, // Faster door
                    ease: "power2.out"
                }, "start");

                // B. Fade out text elements - Delayed slightly more to let user read
                const textTargets = sectionRef.current.querySelectorAll(".zoom-text-target");
                const elementsToFade = [
                    leftLabelRef.current,
                    rightLabelRef.current,
                    descRef.current,
                    ...Array.from(textTargets) // The big INTELL GENCE text
                ].filter(Boolean);

                masterTl.to(elementsToFade, {
                    autoAlpha: 0,
                    duration: 0.5
                }, "start+=0.8"); // Delay fade out until door starts opening significantly


                masterTl.to(contentRef.current, {
                    scale: 50, // Safe scale that won't crash the browser
                    duration: 2,
                    ease: "power2.in",
                    transformOrigin: "48% 49%"
                }, "start+=0.3");


                if (whiteOverlayRef.current) {
                    masterTl.to(whiteOverlayRef.current, {
                        opacity: 1,
                        duration: 0.8, // Faster flash to cover transition
                        ease: "power2.inOut"
                    }, "start+=0.6"); // Start earlier
                }

                // Failsafe: Ensure everything fades
                masterTl.to(contentRef.current, { autoAlpha: 0, duration: 0.2 }, ">");

                // CRITICAL: Instantly hide white overlay to reveal black CTA section
                if (whiteOverlayRef.current) {
                    masterTl.set(whiteOverlayRef.current, { opacity: 0 }, ">"); // Fixed: Added position parameter
                }

                // Hide the entire section to reveal CTA beneath
                if (sectionRef.current) {
                    masterTl.set(sectionRef.current, { autoAlpha: 0 }, ">");
                }
            }

            // Cleanup function for listener
            const cleanupListener = () => {
                window.removeEventListener("resize", updateZoomOrigin);
            };

            return cleanupListener;
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[100vh] bg-[#f9f9f9] text-black overflow-hidden perspective-container z-20"
            style={{ perspective: "2000px" }}
        >
            {/* White Flash Overlay - High Z-index to cover everything */}
            <div
                ref={whiteOverlayRef}
                className="absolute inset-0 bg-white z-[100] pointer-events-none"
            />

            {/* Wrapper for scalable content */}
            <div
                ref={contentRef}
                className="w-full h-full flex flex-col justify-between py-12 md:py-20 relative z-10 will-change-transform"
            >
                {/* Labels */}
                <div className="container px-6 max-w-[95%] mx-auto flex justify-between items-start">
                    <div ref={leftLabelRef} className="text-left">
                        <span className="block text-xs md:text-sm font-bold tracking-widest uppercase mb-1">
                            {t("ai.label.left.line1")}
                        </span>
                        <span className="block text-xs md:text-sm tracking-widest uppercase text-neutral-500">
                            {t("ai.label.left.line2")}
                        </span>
                    </div>
                    <div ref={rightLabelRef} className="text-right">
                        <div className="flex flex-col items-end">
                            <span className="block text-xs md:text-sm font-bold tracking-widest uppercase mb-1">
                                {t("ai.label.right.line1")}
                            </span>
                            <span className="block text-xs md:text-sm tracking-widest uppercase text-neutral-500">
                                {t("ai.label.right.line2")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* MASSIVE TEXT CONTAINER - Flex approach for seamless sizing */}
                <div className="flex-1 flex items-center justify-center w-full px-0 my-0 overflow-visible ml-[2vw] pr-[2.5vw]">
                    <div className="relative flex items-center justify-center w-full max-w-[98%] xl:max-w-none mx-auto select-none">

                        <svg className="absolute w-0 h-0">
                            <defs>
                                <linearGradient id="sharp-liquid" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop className="liquid-stop" offset="0%" stopColor="black" />
                                    <stop className="liquid-stop" offset="0%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* PART 1: INTELL */}
                        <svg className="h-[20vw] md:h-[18vw] w-auto overflow-visible mr-[0.5vw]" viewBox="0 0 530 200" preserveAspectRatio="xMaxYMid meet">
                            <text ref={svgPart1Ref} x="100%" y="160" textAnchor="end" className="font-bold tracking-tighter zoom-text-target"
                                style={{ fontSize: "160px", fontFamily: "var(--font-geist-sans), sans-serif", fontWeight: "900" }}>
                                INTELL
                            </text>
                        </svg>

                        {/* PART 2: THE DOOR (I) */}
                        <div
                            ref={doorContainerRef}
                            className="h-[20vw] md:h-[18vw] w-[2.4vw] relative mx-[0.5vw] mr-[0.5vw] perspective-door z-50 flex-shrink-0"
                            style={{ perspective: "1000px" }}
                        >
                            <div
                                ref={doorRef}
                                className="w-full h-[58%] absolute bottom-[20%] left-0"
                                style={{ transformStyle: "preserve-3d", transformOrigin: "left center" }}
                            >
                                {/* Front Face */}
                                <div className="absolute inset-0 backface-hidden bg-black"></div>
                                {/* Back Face */}
                                <div className="absolute inset-0 bg-neutral-900 backface-hidden" style={{ transform: "rotateY(180deg)" }}></div>
                            </div>

                            {/* PORTAL IMAGE */}
                            <div
                                ref={portalRef}
                                className="absolute bottom-[20%] left-0 w-full h-[58%] -z-10 bg-black flex items-center justify-center overflow-hidden"
                            >
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop')] bg-cover bg-center scale-150"></div>
                            </div>
                        </div>

                        {/* PART 3: GENCE */}
                        <svg className="h-[20vw] md:h-[18vw] w-auto overflow-visible ml-[1vw]" viewBox="0 0 580 200" preserveAspectRatio="xMinYMid meet">
                            <text ref={svgPart3Ref} x="0" y="160" textAnchor="start" className="font-bold tracking-tighter zoom-text-target"
                                style={{ fontSize: "160px", fontFamily: "var(--font-geist-sans), sans-serif", fontWeight: "900" }}>
                                GENCE
                            </text>
                        </svg>

                    </div>
                </div>

                {/* Description */}
                <div className="container px-6 max-w-7xl mx-auto text-center perspective-1000">
                    <p ref={descRef} className="max-w-lg mx-auto text-xs md:text-lg text-neutral-600 font-medium tracking-wide leading-relaxed">
                        {t("ai.desc.line1")}<br />
                        {t("ai.desc.line2")}
                    </p>
                </div>
            </div>
        </section>
    );
}
