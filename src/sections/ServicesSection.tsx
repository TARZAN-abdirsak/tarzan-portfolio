"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

// Import new generated assets
import interfaceImg from "@/assets/services/interface.png";
import hospitalImg from "@/assets/services_images/hospital managemnt.png";
import commerceImg from "@/assets/services_images/e commerce.png";
import mobileImg from "@/assets/services_images/mobil applictions.png";
import aiAgentImg from "@/assets/services_images/AI Agnet.png";

const services = [
    {
        id: "01",
        title: "DIGITAL SYSTEMS",
        desc: "Building robust digital infrastructures that combine performance, scalability, and modern engineering standards. We create secure and efficient systems tailored to business growth.",
        features: ["/Enterprise System Architecture", " / Scalable Backend Systems",],
        image: interfaceImg
    },
    {
        id: "02",
        title: "ENTERPRISE SYSTEMS",
        desc: "Large-scale systems engineered for operational efficiency.",
        features: ["/HOSPITAL MANAGEMENT", "/CONSTRUCTION SYSTEMS", "/ERP SOLUTIONS", "/BUSINESS PLATFORMS", "/CUSTOM SOFTWARE"],
        image: hospitalImg
    },
    {
        id: "03",
        title: "E-COMMERCE & PLATFORMS",
        desc: "Developing secure and scalable digital commerce ecosystems designed for growth",
        features: ["ONLINE STORES", "/PAYMENT INTEGRATION", "/PRODUCT SYSTEMS", "/CUSTOM DASHBOARDS", "/SCALABLE ARCHITECTURE"],
        image: commerceImg
    },
    {
        id: "04",
        title: "APPLICATION DEVELOPMENT",
        desc: "Building scalable applications designed for performance, usability, and long-term growth.",
        features: ["/MOBILE APPLICATIONS", "/WEB APPLICATIONS", "/DESKTOP APPLICATIONS", "/PLATFORM INTEGRATION", "/PRODUCT ENGINEERING "],
        image: mobileImg
    },
    {
        id: "05",
        title: "AI & INTEGRATION",
        desc: "Engineered intelligence for modern systems.",
        features: ["/BUSINESS AI INTEGRATION", "/AUTOMATION ENGINEERING", "/DATA ARCHITECTURE", "/PREDICTIVE SYSTEMS",],
        image: aiAgentImg
    },
];

export default function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        if (hoveredIndex !== null) {
            const ctx = gsap.context(() => {
                // Text Stagger Animation
                gsap.fromTo(`.gsap-text-${hoveredIndex}`,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out",
                        delay: 0.1
                    }
                );

                // Image Animation (Scale + Fade + Pop)
                gsap.fromTo(`.gsap-image-${hoveredIndex}`,
                    { scale: 0.9, opacity: 0, y: 20 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        delay: 0.2
                    }
                );
            }, containerRef);
            return () => ctx.revert();
        }
    }, [hoveredIndex]);

    return (
        <section id="services" ref={containerRef} className="w-full h-full bg-[#f9f9f9] text-black relative z-50 flex flex-col justify-center py-4 md:py-8">
            <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 flex flex-col h-full justify-center">

                {/* Top Section Header */}
                <div className="flex justify-between items-end mb-6 px-2">
                    <h1 className="text-[5vw] leading-[0.8] font-bold tracking-tighter">
                        CAPABILITIES
                    </h1>

                </div>

                {/* Harmonious Horizontal Accordion */}
                <div
                    className="w-full h-[50vh] min-h-[450px] flex flex-col md:flex-row border-t-2 border-b-2 border-black overflow-hidden"
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {services.map((service, index) => {
                        const isActive = hoveredIndex === index;
                        // Calculate flex-grow values: Expanded gets big space, others shrink but stay visible
                        const flexClass = isActive ? 'flex-[3.5]' : 'flex-[1]';

                        return (
                            <div
                                key={index}
                                className={`
                                    relative border-b md:border-b-0 md:border-l border-black first:border-l-0 
                                    flex flex-col overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                                    ${flexClass} bg-[#f9f9f9] group
                                `}
                                onMouseEnter={() => setHoveredIndex(index)}
                            >
                                {/* ---- COLLAPSED STATE CONTENT (Visible when NOT hovered) ---- */}
                                <div className={`
                                    absolute inset-0 p-4 flex flex-col transition-opacity duration-300
                                    ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                                `}>
                                    <span className="text-[10px] font-bold font-mono mb-4">0{index + 1}</span>
                                    <h3 className="text-xl lg:text-2xl font-bold uppercase leading-none tracking-tighter break-words">
                                        {service.title}
                                    </h3>
                                </div>

                                {/* ---- EXPANDED STATE CONTENT (Visible ONLY when hovered) ---- */}
                                <div className={`
                                    w-full h-full p-6 flex flex-col justify-between
                                    ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none hidden'}
                                    transition-opacity duration-300
                                `}>

                                    {/* Row 1: Header */}
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-sm font-bold gsap-text-${index}`}>0{index + 1}</span>
                                        <h2 className={`text-3xl md:text-4xl font-bold uppercase tracking-tighter text-right gsap-text-${index}`}>
                                            // {service.title}
                                        </h2>
                                    </div>

                                    {/* Row 2: Content Grid (Features + Image) */}
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">

                                        {/* Features List */}
                                        <div className="flex flex-col justify-center space-y-1">
                                            {service.features.map((feature, i) => (
                                                <h4 key={i} className={`text-xl md:text-2xl font-bold uppercase tracking-tight opacity-0 gsap-text-${index}`}>
                                                    {feature}
                                                </h4>
                                            ))}
                                        </div>

                                        {/* Image Container - Reduced Height (80%) and Centered */}
                                        <div className={`
                                            relative h-[80%] top-[10%] w-[65%] ml-auto bg-gray-200 overflow-hidden hidden md:block rounded-lg
                                            opacity-0 gsap-image-${index}
                                        `}>
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Description (Bottom) */}
                                    <div className="mt-2 pt-3 border-t border-black/10">
                                        <p className={`text-xs md:text-sm font-mono uppercase tracking-wide leading-relaxed text-black max-w-2xl gsap-text-${index}`}>
                                            {service.desc}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
