"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import fiiriImg from "@/assets/our-production/suitle-concert.png";
import customInteractionsImg from '@/assets/our-production/norde.png';
import performanceFirstImg from '@/assets/our-production/zonetech-landing.png';
import accessibleDesignImg from '@/assets/our-production/cricks_lap.png';
import scalableCodeImg from '@/assets/our-production/suitle-concert.png';
import AIagent from '@/assets/Feature-images/AI agent.jpg';
import product from '@/assets/Feature-images/product deisgn.png';
import system from '@/assets/Feature-images/system.jpg';
import mopileiamges from '@/assets/Feature-images/mopileiamges.jpg';
import automation from '@/assets/Feature-images/automation.png';



if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function FeatureSection() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const curtainRef = useRef<HTMLDivElement>(null);
    const transitionCurtainRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [visibleImageIndex, setVisibleImageIndex] = useState(0);

    // Feature Text Data (uses i18n keys)
    const features = [
        {
            title: t("feature.1.title"),
            desc: t("feature.1.desc"),
            list: [t("feature.1.item1"), t("feature.1.item2"), t("feature.1.item3")],
            image: AIagent
        },
        {
            title: t("feature.2.title"),
            desc: t("feature.2.desc"),
            list: [t("feature.2.item1"), t("feature.2.item2"), t("feature.2.item3")],
            image: system
        },
        {
            title: t("feature.3.title"),
            desc: t("feature.3.desc"),
            list: [t("feature.3.item1"), t("feature.3.item2"), t("feature.3.item3")],
            image: automation
        },
        {
            title: t("feature.4.title"),
            desc: t("feature.4.desc"),
            list: [t("feature.4.item1"), t("feature.4.item2"), t("feature.4.item3")],
            image: product
        },
        {
            title: t("feature.5.title"),
            desc: t("feature.5.desc"),
            list: [t("feature.5.item1"), t("feature.5.item2"), t("feature.5.item3")],
            image: mopileiamges
        }
    ];


    // Handle Active Index Change (Wipe Animation)
    useEffect(() => {
        if (activeIndex === visibleImageIndex) return;

        const ctx = gsap.context(() => {
            // SAFETY: Kill any running animations on the masks to prevent conflicts
            gsap.killTweensOf(transitionCurtainRef.current);
            gsap.killTweensOf(curtainRef.current);

            // Ensure the initial "Reveal Curtain" is strictly gone
            if (curtainRef.current) {
                gsap.set(curtainRef.current, { height: 0, autoAlpha: 0 });
            }

            // Force reset: transitionCurtain hidden at start
            gsap.set(transitionCurtainRef.current, { xPercent: -100, autoAlpha: 0 });

            const tl = gsap.timeline({
                defaults: { ease: "power4.inOut", duration: 0.25 },
                onComplete: () => {
                    gsap.set(transitionCurtainRef.current, { autoAlpha: 0, xPercent: -100 });
                }
            });

            // Small delay ensures the curtain is fully gone before wipe begins
            tl.set({}, {}, "+=0.05")
                // 1. Wipe In (Slide Left -> Center)
                .fromTo(transitionCurtainRef.current,
                    { xPercent: -100, autoAlpha: 1 },
                    { xPercent: 0, autoAlpha: 1 }
                )
                // 2. Swap Image
                .call(() => setVisibleImageIndex(activeIndex))
                // 3. Wipe Out (Slide Center -> Right)
                .to(transitionCurtainRef.current, { xPercent: 100 });

        }, sectionRef);

        return () => ctx.revert();
    }, [activeIndex]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!curtainRef.current || !imageContainerRef.current) return;

            // 1. Initial Reveal Animation
            gsap.set(imageContainerRef.current, {
                backgroundColor: "black",
                borderColor: "transparent",
                boxShadow: "none"
            });
            gsap.set(curtainRef.current, { height: "100%" }); // Start with curtain covering

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", // Start revealing as soon as the section is clearly entering
                    end: "bottom top",
                    toggleActions: "play reverse play reverse" // Open on enter, Close on leave back (scroll up)
                }
            });

            tl.to(curtainRef.current, {
                height: 0,
                duration: 1.2,
                ease: "power4.inOut"
            })
                .to(imageContainerRef.current, {
                    backgroundColor: "#111",
                    borderColor: "transparent",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    duration: 1.2,
                    ease: "power2.out"
                }, "<");

            // 2. Scroll Spy Logic for switching images
            const textBlocks = document.querySelectorAll(".feature-text-block");
            textBlocks.forEach((block, index) => {
                ScrollTrigger.create({
                    trigger: block,
                    start: "top 60%", // Earlier trigger for smoother flow
                    end: "bottom 60%",
                    onEnter: () => setActiveIndex(index),
                    onEnterBack: () => setActiveIndex(index),
                    onRefresh: (self) => {
                        // Handle page refresh: if already in view, set as active
                        if (self.progress > 0 && self.progress < 1) {
                            setActiveIndex(index);
                        }
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="feature-section"
            className="w-full bg-black relative"
        // We use a large min-height to allow scrolling space for the text blocks
        >
            <div className="w-full max-w-[95%] xl:max-w-[1400px] mx-auto px-4 md:px-0">
                <div className="flex flex-col lg:flex-row items-start justify-between">

                    {/* Left: Scrollable Text Blocks */}
                    <div className="flex flex-col w-full lg:w-5/12 order-2 lg:order-1 py-20 lg:py-0">
                        {features.map((feature: any, i) => (
                            <div key={i} className="feature-text-block flex flex-col justify-center min-h-[80vh] lg:min-h-[100dvh]">
                                <h3 className={`text-4xl md:text-5xl font-bold tracking-tight mb-6 transition-colors duration-500 ${i === activeIndex ? "text-white" : "text-white/20"}`}>
                                    {feature.title}
                                </h3>
                                <p className={`text-lg md:text-lg leading-relaxed mb-8 max-w-lg transition-colors duration-500 ${i === activeIndex ? "text-white/60" : "text-white/10"}`}>
                                    {feature.desc}
                                </p>

                                {feature.list && (
                                    <ul className={`space-y-3 transition-opacity duration-500 ${i === activeIndex ? "opacity-100" : "opacity-20"}`}>
                                        {feature.list.map((item: string, j: number) => (
                                            <li key={j} className="flex items-center text-lg text-white/80">
                                                <svg className="w-5 h-5 mr-3 text-white/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right: Sticky Image Visualization */}
                    <div className="w-full lg:w-6/12 order-1 lg:order-2 lg:sticky lg:top-0 h-[80vh] lg:h-[100dvh] flex items-center justify-center">
                        <div
                            ref={imageContainerRef}
                            className="relative w-full aspect-[4/3] bg-[#111] overflow-hidden shadow-2xl group border border-transparent"
                        >
                            {/* THE CURTAIN (Black Overlay for Initial Reveal) */}
                            <div
                                ref={curtainRef}
                                className="absolute top-0 left-0 right-0 h-full bg-black z-30"
                            />

                            {/* THE TRANSITION WIPE (Black Overlay for Swapping) */}
                            <div
                                ref={transitionCurtainRef}
                                className="absolute top-0 left-0 right-0 h-full bg-black z-40"
                                style={{ transform: "translateX(-100%)" }} // Start hidden LEFT
                            />

                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-0 ${index === visibleImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                                >
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover opacity-80"
                                    />
                                </div>
                            ))}

                            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent pointer-events-none z-20" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
