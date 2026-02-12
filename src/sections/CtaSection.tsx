"use client";

import { useCursor } from "@/context/CursorContext";
// Image (Next.js Image) used for flags
import Image from "next/image";

// Country Data (Flags from flagcdn.com)
// Using 2-letter codes: us, gb, de, fr, es, it, jp, cn, br, ca, au, in, sa, ae, za
const COUNTRIES = [
    { name: "USA", code: "us" },
    { name: "UK", code: "gb" },
    { name: "Germany", code: "de" },
    { name: "France", code: "fr" },
    { name: "Spain", code: "es" },
    { name: "Italy", code: "it" },
    { name: "Japan", code: "jp" },
    { name: "China", code: "cn" },
    { name: "Brazil", code: "br" },
    { name: "Canada", code: "ca" },
    { name: "Australia", code: "au" },
    { name: "India", code: "in" },
    { name: "UAE", code: "ae" },
    { name: "Saudi", code: "sa" },
    { name: "South Africa", code: "za" },
    { name: "Sweden", code: "se" },
    { name: "Netherlands", code: "nl" },
    { name: "Norway", code: "no" },
    { name: "Denmark", code: "dk" },
    { name: "Finland", code: "fi" }
];

// Generate avatars (flags) for a specific ring
const generateRingAvatars = (radius: number, index: number) => {
    // Determine count based on ring index
    const count = index % 2 === 0 ? 2 : 1;

    return Array.from({ length: count }).map((_, i) => {
        // Pick a unique country based on ring index + avatar index
        // Using a prime number step (e.g., 3) ensures good distribution
        const countryIndex = (index * 3 + i) % COUNTRIES.length;
        const country = COUNTRIES[countryIndex];

        return {
            id: `ring-${index}-country-${i}`,
            name: country.name,
            img: `https://flagcdn.com/w160/${country.code}.png`, // Higher res flag
            angle: (360 / count) * i + (index * 45) // Offset angles
        };
    });
};

// 7 Flat Rings
const RINGS = [
    { radius: 160, duration: 25, avatars: generateRingAvatars(160, 0) },
    { radius: 240, duration: 35, avatars: generateRingAvatars(240, 1) },
    { radius: 320, duration: 40, avatars: generateRingAvatars(320, 2) },
    { radius: 400, duration: 50, avatars: generateRingAvatars(400, 3) },
    { radius: 480, duration: 60, avatars: generateRingAvatars(480, 4) },
    { radius: 560, duration: 70, avatars: generateRingAvatars(560, 5) },
    { radius: 640, duration: 80, avatars: generateRingAvatars(640, 6) }
];

export default function CtaSection() {
    const { showClick, resetCursor } = useCursor();

    return (
        <section
            id="cta-section"
            className="relative w-full min-h-[120vh] bg-black z-10 pt-24 pb-0 flex flex-col items-center justify-start overflow-hidden"
        >
            {/* Title - Top */}
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight z-20">Clients</h2>

            {/* Panel Container - ~90vh Mark (mt-[10vh]) */}
            <div className="relative w-full max-w-[95%] xl:max-w-[1400px] h-[85vh] mx-auto mt-[10vh] border border-white/10 rounded-[3rem] overflow-hidden bg-[#030303] shadow-2xl shrink-0 group">

                {/* 1. STRONG "NORMAL BLACK" VIGNETTE */}
                <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,#000000_100%)]" />

                {/* Scene Container - Pure 2D, No Perspective */}
                <div className="relative w-full h-full flex items-center justify-center translate-y-[40%] z-20">

                    {/* CENTRAL SUN - INFINITE FLOW AVATAR */}
                    <div className="absolute z-50 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">

                        {/* Rotating Border Container */}
                        <div className="relative w-36 h-36 flex items-center justify-center">

                            {/* Layer 1: Main Energy Stream (Clockwise) */}
                            <div className="absolute inset-[4px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#00C2FF_60deg,transparent_120deg,#FFAA00_240deg,transparent_360deg)] animate-spin-slow opacity-100" />

                            {/* Layer 2: Complementary Stream (Clockwise) */}
                            <div className="absolute inset-[4px] rounded-full bg-[conic-gradient(from_180deg,transparent_0deg,#ffffff_60deg,transparent_120deg)] animate-spin-slow opacity-60 mix-blend-overlay" />

                            {/* 3. Static Black Background for Avatar */}
                            <div className="absolute inset-[8px] rounded-full bg-black z-0 shadow-inner" />

                            {/* Avatar Image Container */}
                            <div className="relative w-28 h-28 rounded-full overflow-hidden z-10 ring-2 ring-black">
                                <img
                                    src="/avatar.ex.svg"
                                    alt="You"
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>

                        </div>

                        <div className="mt-4 px-4 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 relative z-20">
                            <span className="text-white font-bold tracking-widest text-sm">TARZAN</span>
                        </div>
                    </div>

                    {/* CONCENTRIC RINGS */}
                    {RINGS.map((ring, i) => (
                        <div
                            key={`ring-${i}`}
                            // Visible Rings: border-2, border-white/20
                            className="absolute rounded-full border-2 border-white/20 flex items-center justify-center pointer-events-none"
                            style={{
                                width: ring.radius * 2,
                                height: ring.radius * 2,
                                // Spin the entire ring container
                                animation: `spin ${ring.duration}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}` // Alternate direction
                            }}
                        >
                            {/* Avatars Orbiting */}
                            {ring.avatars.map((avatar) => (
                                <div
                                    key={avatar.id}
                                    className="absolute top-0 left-1/2 -ml-[36px] -mt-[36px]"
                                    style={{
                                        transformOrigin: `50% ${ring.radius + 36}px`,
                                        transform: `rotate(${avatar.angle}deg)`,
                                    }}
                                >
                                    {/* Wrapper to Counter Ring Spin */}
                                    <div
                                        className="relative flex flex-col items-center justify-center text-center"
                                        style={{
                                            animation: `spin ${ring.duration}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}`
                                        }}
                                    >
                                        {/* Wrapper to Counter Static Angle Rotation */}
                                        <div
                                            className="relative flex flex-col items-center"
                                            style={{ transform: `rotate(-${avatar.angle}deg)` }}
                                        >
                                            {/* Avatar Image */}
                                            <div className="w-[4.5rem] h-[4.5rem] rounded-full overflow-hidden shadow-2xl bg-black z-10 relative">
                                                <Image src={avatar.img} alt={avatar.name} fill className="object-cover" />
                                            </div>

                                            {/* Name Only */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 text-center">
                                                <p className="text-white text-base font-semibold leading-tight tracking-wide drop-shadow-md">{avatar.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>

                {/* Bottom Fade Mask */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-40" />
            </div>

            {/* SPACIOUS CONTENT GRID BELOW */}


            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
            `}</style>
        </section >
    );
}
