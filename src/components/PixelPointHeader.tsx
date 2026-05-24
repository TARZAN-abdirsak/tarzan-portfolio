"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
import profileImg from "@/assets/images/profile.jpg";
import logoImg from "@/assets/logo/logo.png";
import { useCursor } from "@/context/CursorContext";
import { useChatContext } from "@/context/ChatContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export default function PixelPointHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const brandNameRef = useRef<HTMLAnchorElement>(null);
    const linksContainerRef = useRef<HTMLDivElement>(null);
    const ctaButtonRef = useRef<HTMLAnchorElement>(null);
    const { showClick, resetCursor } = useCursor();
    const { openChat } = useChatContext();
    const { t } = useLanguage();

    const navItems = [
        { key: "services", labelKey: "header.nav.services" as const, href: "/services" },
        { key: "privacy", labelKey: "header.nav.privacy" as const, href: "/privacy" },
        { key: "about", labelKey: "header.nav.about" as const, href: "/about" },
        { key: "feedback", labelKey: "header.nav.feedback" as const, href: "/feedback" },
    ];

    // Track scroll direction (for entry animation)
    const lastScrollY = useRef(0);
    const exitDelayRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Disable scroll effects on Services page
        if (pathname === "/services") return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY.current;

            lastScrollY.current = currentScrollY;

            // === ENTRY LOGIC (Direction + Position Based) ===
            // Turn BLACK when: Scrolling DOWN AND scrollY > 100px
            if (scrollingDown && currentScrollY > 100 && !isScrolled) {
                // Cancel any pending exit delay
                if (exitDelayRef.current) {
                    clearTimeout(exitDelayRef.current);
                    exitDelayRef.current = null;
                }
                setIsScrolled(true);
            }

            // === EXIT LOGIC (Position Based + DELAYED) ===
            // Turn WHITE when: scrollY <= 100px, but WAIT 300ms for avatar to exit first
            else if (currentScrollY <= 100 && isScrolled) {
                // Only set timeout if not already pending
                if (!exitDelayRef.current) {
                    exitDelayRef.current = setTimeout(() => {
                        setIsScrolled(false);
                        exitDelayRef.current = null;
                    }, 300); // 300ms delay = gives avatar time to visually exit
                }
            }
            // Cancel exit if user scrolls back down past threshold
            else if (currentScrollY > 100 && exitDelayRef.current) {
                clearTimeout(exitDelayRef.current);
                exitDelayRef.current = null;
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (exitDelayRef.current) {
                clearTimeout(exitDelayRef.current);
            }
        };
    }, [isScrolled]);

    useEffect(() => {
        let mm = gsap.matchMedia();

        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)",
        }, (context) => {
            let { isDesktop, isMobile } = context.conditions as { isDesktop: boolean; isMobile: boolean };

            if (isScrolled) {
                // Animate to Scrolled State (Black Pill)
                gsap.to(headerRef.current, {
                    width: "fit-content",
                    top: "1.5rem",
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "9999px",
                    // Responsive Padding for Scrolled State
                    paddingLeft: isDesktop ? "2rem" : "1.25rem", // px-8 (desk) vs px-5 (mob)
                    paddingRight: isDesktop ? "2rem" : "1.25rem",
                    paddingTop: "0.75rem",
                    paddingBottom: "0.75rem",
                    duration: 0.5,
                    ease: "power3.inOut"
                });

                // Text Colors
                gsap.to(brandNameRef.current, { color: "#ffffff", duration: 0.3 });
                gsap.to(".nav-link", { color: "#d1d5db", duration: 0.3 });

                // CTA Button
                gsap.to(ctaButtonRef.current, {
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    duration: 0.3
                });

            } else {
                // Animate back to Default State (Transparent Full Width)
                gsap.to(headerRef.current, {
                    width: "100%",
                    top: "0",
                    backgroundColor: "transparent",
                    borderWidth: "0px",
                    borderColor: "transparent",
                    borderRadius: "0px",
                    // Responsive Padding for Default State
                    paddingLeft: isDesktop ? "3rem" : "1.25rem", // px-12 (desk) vs px-5 (mob)
                    paddingRight: isDesktop ? "3rem" : "1.25rem",
                    paddingTop: "1.25rem",
                    paddingBottom: "1.25rem",
                    duration: 0.5,
                    ease: "power3.inOut"
                });

                // Text Colors
                gsap.to(brandNameRef.current, { color: "#000000", duration: 0.3 });
                gsap.to(".nav-link", { color: "#1f2937", duration: 0.3 });

                // CTA Button
                gsap.to(ctaButtonRef.current, {
                    backgroundColor: "transparent",
                    color: "#F22F5D",
                    duration: 0.3
                });
            }
        });

        return () => mm.revert();
    }, [isScrolled]);

    return (
        <header
            ref={headerRef}
            id="global-main-header"
            className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between shadow-none mx-auto backdrop-blur-md px-5 py-5 md:px-12"
            style={{
                width: "100%",
                backgroundColor: "transparent"
            }}
        >
            <div className="flex items-center gap-3 mr-8">
                {/* Header Avatar Target (Visible Slot when active) */}
                <div
                    id="header-avatar-target"
                    className={`
                        shrink-0 relative z-10 rounded-full transition-all duration-500 ease-in-out overflow-hidden
                        ${isScrolled ? "w-11 h-11 opacity-100" : "w-0 opacity-0"}
                        ${isScrolled ? "bg-white/10 shadow-inner" : "bg-transparent"}
                    `}
                >
                    {/* Floating Avatar lands here */}
                </div>

                <Link
                    href="/"
                    ref={brandNameRef}
                    className="text-xl font-medium tracking-tight text-black cursor-none font-poppins"
                    onMouseEnter={showClick}
                    onMouseLeave={resetCursor}
                >
                    I am Tarzan
                </Link>
            </div>

            <div className="flex items-center gap-6 text-sm font-normal">
                {/* Menu Items */}
                <div ref={linksContainerRef} className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => {
                        const label = t(item.labelKey);
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                className="nav-link group relative overflow-hidden font-poppins"
                                style={{ height: '1.4em', lineHeight: '1.4em' }}
                                onMouseEnter={showClick}
                                onMouseLeave={resetCursor}
                            >
                                <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full">
                                    {label}
                                </span>
                                <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full">
                                    {label}
                                </span>
                            </Link>
                        );
                    })}
                    {/* Elegant language dropdown — adapts to scroll state */}
                    <LanguageToggle variant="navbar" onDark={isScrolled} />
                </div>

                {/* CTA Button */}
                {/* We keep the button in DOM but animate its look. 
                    Note: The original had different text ("Inquiry Now" vs email). 
                    For smooth shape transition, kept it simple or needed a crossfade. 
                    To match user request 'start white change to black', I'll preserve the structural morph 
                    but maybe simplifiy the content swap to just 'Inquiry' or keep the swap if essential.
                    Let's strictly follow the 'isScrolled' content swap for text but animate container.
                */}
                {isScrolled ? (
                    <Link
                        ref={ctaButtonRef}
                        href="#"
                        className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-colors shadow-lg hover:shadow-xl hidden md:block"
                        onMouseEnter={showClick}
                        onMouseLeave={resetCursor}
                        onClick={(e) => {
                            e.preventDefault();
                            openChat("large");
                        }}
                    >
                        {t("header.cta.askAi")}
                    </Link>
                ) : (
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="mailto:a.abdirsak1999@gmail.com" className="text-[#F22F5D] hover:underline font-semibold" onMouseEnter={showClick} onMouseLeave={resetCursor}>
                            a.abdirsak1999@gmail.com
                        </Link>
                    </div>
                )}

                {/* Mobile Menu Toggle (Hamburger) */}
                <button
                    className="md:hidden relative z-[110] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span
                        className={`w-6 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2 bg-white' : 'bg-black'}`}
                        style={{ backgroundColor: isScrolled || mobileMenuOpen ? 'white' : 'black' }}
                    />
                    <span
                        className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                        style={{ backgroundColor: isScrolled || mobileMenuOpen ? 'white' : 'black' }}
                    />
                    <span
                        className={`w-6 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-white' : 'bg-black'}`}
                        style={{ backgroundColor: isScrolled || mobileMenuOpen ? 'white' : 'black' }}
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay - Portaled to body to escape Header constraints */}
            {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center animate-in fade-in duration-300"
                >
                    {/* Close Button (Duplicate for easier access/visual consistancy inside portal) */}
                    <button
                        className="absolute top-8 right-8 z-[10000] w-12 h-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="w-8 h-0.5 bg-white rotate-45 translate-y-2" />
                        <span className="w-8 h-0.5 bg-white opacity-0" />
                        <span className="w-8 h-0.5 bg-white -rotate-45 -translate-y-2" />
                    </button>

                    <div className="flex flex-col items-center gap-8 text-3xl font-medium text-white">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className="hover:text-gray-400 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t(item.labelKey)}
                            </Link>
                        ))}

                        {/* Language switcher (mobile) */}
                        <div className="mt-4">
                            <LanguageToggle variant="mobile" />
                        </div>

                        <button
                            onClick={() => {
                                setMobileMenuOpen(false);
                                openChat("large");
                            }}
                            className="mt-4 px-10 py-4 bg-white text-black rounded-full font-bold uppercase text-base tracking-wider"
                        >
                            {t("header.cta.askAi")}
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </header >
    );
}
