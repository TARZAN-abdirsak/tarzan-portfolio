"use client";

import { useRef, useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '@/context/CursorContext';
import { useLanguage } from '@/context/LanguageContext';
import type { PhysicsItem } from '@/components/InfluenceCanvas';

const InfluenceCanvas = dynamic(() => import('@/components/InfluenceCanvas'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-100/50 animate-pulse rounded-[40px]" />
});

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Data for the Influence section - Project Stats
const INFLUENCE_ITEMS: PhysicsItem[] = [
    { id: '1', type: 'pill', text: '10+ Projects', color: '#FF7F00', textColor: '#FFFFFF', width: 280, height: 110, fontSize: 32 },
    { id: '2', type: 'pill', text: '8+ Clients', color: '#1A1A1A', textColor: '#FFFFFF', width: 260, height: 90, fontSize: 24 },
    { id: '3', type: 'pill', text: '5 Countries', color: '#1A1A1A', textColor: '#FFFFFF', width: 260, height: 90, fontSize: 24 },
    { id: '4', type: 'hexagon', text: '', color: '#32CD32', radius: 140 },
    { id: '5', type: 'pill', text: '5+ Years', color: '#1A1A1A', textColor: '#FFFFFF', width: 240, height: 90, fontSize: 24 },
    { id: '6', type: 'pill', text: '100K+ Users', color: '#1A1A1A', textColor: '#FFFFFF', width: 280, height: 90, fontSize: 24 },
    { id: '7', type: 'pill', text: '3+ Industries', color: '#1A1A1A', textColor: '#FFFFFF', width: 300, height: 90, fontSize: 24 },
    { id: '8', type: 'rectangle', text: '99%', color: '#1A1A1A', textColor: '#FFFFFF', width: 160, height: 200, fontSize: 24 },
    { id: '10', type: 'rectangle', text: '', color: '#F7DF1E', width: 150, height: 150 },
];

// Import project images
// Import project images


import koodbyImg from '@/assets/our-production/koodby.jpg';
import tirsoImg from '@/assets/our-production/tirso.jpg';
import zonetechImg from '@/assets/our-production/zonetech-landing.png';
import marlabiImg from '@/assets/our-production/murlabi.png';
import soundexperienceImg from '@/assets/our-production/Sound-Experience.png';

type ProjectRoleKey =
    | 'projects.marlupi.role'
    | 'projects.soundExperience.role'
    | 'projects.zonetech.role'
    | 'projects.koodby.role'
    | 'projects.tirso.role';

const PROJECTS: Array<{
    id: number;
    name: string;
    roleKey: ProjectRoleKey;
    image: typeof marlabiImg;
    video?: string;
    width: string;
    height: string;
    link: string;
}> = [
    { id: 1, name: 'Marlupi', roleKey: 'projects.marlupi.role', image: marlabiImg, width: '400px', height: '200px', link: 'https://marlupi.id/' },
    { id: 2, name: 'Sound Experience', roleKey: 'projects.soundExperience.role', image: soundexperienceImg, width: '400px', height: '200px', link: 'https://soundexperience.ircamamplify.com/' },
    { id: 3, name: 'ZoneTech', roleKey: 'projects.zonetech.role', image: zonetechImg, width: '400px', height: '200px', link: 'https://zon-tech.com/' },
    { id: 4, name: 'Koodby', roleKey: 'projects.koodby.role', image: koodbyImg, width: '400px', height: '200px', link: 'https://koodby.com/' },
    { id: 5, name: 'Tirso', roleKey: 'projects.tirso.role', image: tirsoImg, width: '400px', height: '200px', link: 'https://www.tirsopos.com/en' },
];

export default function HorizontalScrollSection() {
    // === REFS ===
    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const physicsContainerRef = useRef<HTMLDivElement>(null);
    const { setCursor, resetCursor } = useCursor();
    const { t } = useLanguage();

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [dropped, setDropped] = useState(false);
    const [hoveredTeamIndex, setHoveredTeamIndex] = useState<number | null>(null);

    // === Physics Canvas Size ===
    useEffect(() => {
        const updateSize = () => {
            if (physicsContainerRef.current) {
                const rect = physicsContainerRef.current.getBoundingClientRect();
                setDimensions({
                    width: Math.floor(rect.width),
                    height: Math.floor(rect.height)
                });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // === FALLBACK: IntersectionObserver to ensure drop triggers on first view ===
    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setDropped(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    // === RESPONSIVE ITEMS LOGIC ===
    // Scale down items on mobile to fit the container
    const responsiveItems = useMemo(() => {
        const isMobile = dimensions.width > 0 && dimensions.width < 768;
        if (!isMobile) return INFLUENCE_ITEMS;

        // Scale factor for mobile
        const SCALE = 0.7;

        return INFLUENCE_ITEMS.map(item => ({
            ...item,
            width: item.width ? Math.round(item.width * SCALE) : undefined,
            height: item.height ? Math.round(item.height * SCALE) : undefined,
            radius: item.radius ? Math.round(item.radius * SCALE) : undefined,
            fontSize: item.fontSize ? Math.round(item.fontSize * SCALE) : undefined,
        }));
    }, [dimensions.width]);

    // === MAIN ANIMATION LOGIC ===
    useEffect(() => {
        const section = sectionRef.current;
        const wrapper = wrapperRef.current;

        if (!section || !wrapper) return;

        const ctx = gsap.context(() => {
            const getScrollAmount = () => wrapper.scrollWidth - window.innerWidth;

            // Drop trigger - items drop when panel is 100px inside viewport
            const dropTrigger = ScrollTrigger.create({
                trigger: section,
                start: "top 90%",
                end: "bottom top",
                onEnter: () => setDropped(true),
                onEnterBack: () => setDropped(true),
                onLeaveBack: () => setDropped(false),
                onRefresh: (self) => {
                    // Handle page refresh: if already scrolled past trigger, drop immediately
                    if (self.progress > 0) {
                        setDropped(true);
                    }
                },
            });

            // Force check on page load for refresh scenarios
            setTimeout(() => {
                if (dropTrigger.progress > 0) {
                    setDropped(true);
                }
            }, 100);

            // Master Timeline - Horizontal Scroll with Pauses (Buffers)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${getScrollAmount() * 1.5 + 1000}`, // Multiplied by 1.5 to slow down the speed
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            // 1. Initial Stay (Pause at Panel 1)
            tl.to({}, { duration: 0.5 });

            // 2. Main Horizontal Scroll
            tl.to(wrapper, {
                x: () => -getScrollAmount(),
                ease: "none",
                duration: 1.0,
            });

            // 3. Final Stay (Pause at Panel 2)
            tl.to({}, { duration: 0.5 });

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[100dvh] overflow-hidden"
            style={{ contain: 'layout paint' }}
        >
            {/* === HORIZONTAL WRAPPER (200vw = 2 Panels) === */}
            <div
                ref={wrapperRef}
                className="flex h-full will-change-transform"
                style={{ width: '200vw' }}
            >
                {/* ========== PANEL 1: Influence Section ========== */}
                <div className="relative w-screen h-[100dvh] flex-shrink-0 bg-[#f9f9f9] overflow-hidden">
                    <div className="absolute top-20 left-8 md:left-20 z-10 pointer-events-none">
                        <h2 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] text-black">
                            {t("projects.title.line1")} <br />
                            {t("projects.title.line2")}
                        </h2>
                        <p className="mt-40 md:mt-8 max-w-lg text-lg text-gray-700 font-medium leading-relaxed" style={{ fontFamily: 'var(--font-space-mono)' }}>
                            {t("projects.subtitle")}
                        </p>
                    </div>

                    <div ref={physicsContainerRef} className="absolute inset-0 z-0">
                        {dimensions.width > 0 && (
                            <InfluenceCanvas
                                width={dimensions.width}
                                height={dimensions.height}
                                items={responsiveItems}
                                shouldDrop={dropped}
                            />
                        )}
                    </div>
                </div>

                {/* ========== PANEL 2: Production Section ========== */}
                <div className="relative w-screen h-[100dvh] flex-shrink-0 bg-[#f9f9f9] overflow-hidden">
                    {/* Production Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-end p-4 pt-4 pb-4 md:p-8 md:pb-22">
                        {/* Header */}
                        <div className="text-center mb-3 md:mb-8 flex-shrink-0">
                            <h3 className="text-2xl md:text-6xl font-normal leading-[0.9] tracking-tight text-neutral-900">
                                <span className="block font-medium mb-1">{t("production.sayHi")}</span>
                                <span className="block font-medium">{t("production.toMyProduction")}</span>
                            </h3>
                        </div>

                        {/* Main Content Grid */}
                        <div className="w-full max-w-9xl mx-auto px-2 md:px-9 relative">
                            {/* Project List */}
                            <div
                                onMouseLeave={() => setHoveredTeamIndex(null)}
                                className="w-full flex flex-col relative z-20"
                            >
                                {PROJECTS.map((member, index) => {
                                    const isActive = hoveredTeamIndex === index;
                                    return (
                                        <a
                                            key={member.id}
                                            href={member.link}
                                            target={member.link !== '#' ? "_blank" : undefined}
                                            rel={member.link !== '#' ? "noopener noreferrer" : undefined}
                                            onMouseEnter={() => {
                                                setHoveredTeamIndex(index);
                                                setCursor("View");
                                            }}
                                            onMouseLeave={() => {
                                                resetCursor();
                                            }}
                                            className={`group flex items-center border-b border-neutral-200 py-2.5 md:py-5 cursor-pointer transition-all duration-300 gap-3 md:gap-0 md:justify-between ${isActive ? 'bg-transparent' : 'bg-transparent'}`}
                                        >
                                            {/* Mobile: Thumbnail + Info side by side */}
                                            <div className="block md:hidden flex-shrink-0 w-[70px] h-[50px] overflow-hidden rounded-lg">
                                                {member.video ? (
                                                    <video
                                                        src={member.video}
                                                        autoPlay
                                                        muted
                                                        loop
                                                        playsInline
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <img
                                                        src={member.image.src}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>

                                            {/* Mobile: Name + Role */}
                                            <div className="flex md:hidden flex-col flex-1 min-w-0">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-xs font-mono text-neutral-400">
                                                        0{index + 1}
                                                    </span>
                                                    <span className="text-base font-medium tracking-tight text-neutral-800 truncate">
                                                        {member.name}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-neutral-400 font-mono mt-0.5">
                                                    {t(member.roleKey)}
                                                </span>
                                            </div>

                                            {/* Mobile: Arrow indicator */}
                                            <div className="block md:hidden flex-shrink-0">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
                                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                                </svg>
                                            </div>

                                            {/* Desktop: Number + Name */}
                                            <div className="hidden md:flex md:items-baseline gap-14 w-full">
                                                <span className={`text-base font-mono transition-colors ${isActive ? 'text-black font-semibold' : 'text-neutral-500'}`}>
                                                    ( 0{index + 1} )
                                                </span>
                                                <span className={`text-5xl tracking-tighter transition-all duration-300 ${isActive ? 'text-black font-medium translate-x-2' : 'text-neutral-600 font-normal'}`}>
                                                    {member.name}
                                                </span>
                                            </div>

                                            {/* Desktop: Role */}
                                            <div className="hidden md:flex items-center gap-1">
                                                <span className="text-sm font-mono text-neutral-400 font-light">(</span>
                                                <span className={`text-base font-medium transition-all ${isActive ? 'border-b border-black text-black' : 'text-neutral-400'}`}>
                                                    {t(member.roleKey)}
                                                </span>
                                                <span className="text-sm font-mono text-neutral-400 font-light">)</span>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>

                            {/* Floating Image Reveal - Desktop Only */}
                            <div
                                className="hidden md:block absolute z-30 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                style={{
                                    top: `${Math.max(1, Math.min(PROJECTS.length - 2, hoveredTeamIndex ?? 0)) * 88 + 50}px`,
                                    left: '65%',
                                    transform: 'translate(-50%, -50%)',
                                    width: hoveredTeamIndex !== null ? PROJECTS[hoveredTeamIndex].width : '220px',
                                    height: hoveredTeamIndex !== null ? PROJECTS[hoveredTeamIndex].height : '280px',
                                }}
                            >
                                {PROJECTS.map((member, index) => (
                                    <div
                                        key={member.id}
                                        className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${hoveredTeamIndex === index
                                            ? 'opacity-100 scale-100 rotate-0 z-20'
                                            : 'opacity-0 scale-50 rotate-[-5deg] z-0'
                                            }`}
                                    >
                                        {member.video ? (
                                            <video
                                                src={member.video}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={member.image.src}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section >
    );
}
