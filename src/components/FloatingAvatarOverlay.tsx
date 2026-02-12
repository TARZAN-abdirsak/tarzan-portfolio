"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useCursor } from "@/context/CursorContext";

// Dynamic import for the avatar
const InteractiveAvatar = dynamic(() => import("@/components/InteractiveAvatar"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#f0f0f0] animate-pulse rounded-full" />
});

import { usePathname } from "next/navigation";

export default function FloatingAvatarOverlay() {
    const avatarRef = useRef<HTMLDivElement>(null);
    const { showClick, resetCursor } = useCursor();
    const pathname = usePathname();


    // State tracking refs (using refs to avoid re-renders)
    const transitionState = useRef({ progress: 0 });
    const scrollState = useRef({
        lastScrollY: 0,
        isAvatarInHeader: false, // true = docked in header, false = in hero
        isAnimating: false
    });

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const { lastScrollY, isAvatarInHeader } = scrollState.current;

            // Determine scroll direction
            const isScrollingDown = currentScrollY > lastScrollY;
            const isScrollingUp = currentScrollY < lastScrollY;

            // Update last scroll position
            scrollState.current.lastScrollY = currentScrollY;

            // ===== ENTRY TRIGGER: Scroll DOWN + scrollY > 100px =====
            if (isScrollingDown && currentScrollY > 100 && !isAvatarInHeader) {
                // Activate: Move avatar to header
                scrollState.current.isAvatarInHeader = true;

                gsap.to(transitionState.current, {
                    progress: 1,
                    duration: 0.5,
                    ease: "power3.inOut",
                    overwrite: true,
                    onStart: () => { scrollState.current.isAnimating = true; },
                    onComplete: () => { scrollState.current.isAnimating = false; }
                });
            }

            // ===== RETURN TRIGGER: Position-based (scrollY <= 140px) =====
            // Avatar returns when user reaches near the top, regardless of scroll direction
            else if (currentScrollY <= 140 && isAvatarInHeader) {
                // Deactivate: Return avatar to hero
                scrollState.current.isAvatarInHeader = false;

                gsap.to(transitionState.current, {
                    progress: 0,
                    duration: 0.5,
                    ease: "power3.inOut",
                    overwrite: true,
                    onStart: () => { scrollState.current.isAnimating = true; },
                    onComplete: () => { scrollState.current.isAnimating = false; }
                });
            }

            // Note: If scrollY > 110px and scrolling UP: Avatar STAYS in header (like navbar)
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // ANIMATION LOOP: Only run when document is visible
        let animationId: number;
        let isRunning = true;

        const tick = () => {
            if (!isRunning) return;

            const heroEl = document.getElementById("hero-avatar-target");
            const headerEl = document.getElementById("header-avatar-target");
            const avatar = avatarRef.current;

            if (headerEl && avatar) {
                const rHeader = headerEl.getBoundingClientRect();

                if (heroEl) {
                    const rHero = heroEl.getBoundingClientRect();
                    const p = transitionState.current.progress;

                    // Interpolate position and size (Hero -> Header)
                    const top = rHero.top + (rHeader.top - rHero.top) * p;
                    const left = rHero.left + (rHeader.left - rHero.left) * p;
                    const width = rHero.width + (rHeader.width - rHero.width) * p;
                    const height = rHero.height + (rHeader.height - rHero.height) * p;

                    // Interpolate border (Hero: 2px white -> Header: 0px transparent)
                    const borderWidth = 2 * (1 - p);
                    const borderOpacity = 1 - p;

                    avatar.style.top = `${top}px`;
                    avatar.style.left = `${left}px`;
                    avatar.style.width = `${width}px`;
                    avatar.style.height = `${height}px`;
                    avatar.style.borderWidth = `${borderWidth}px`;
                    avatar.style.borderColor = `rgba(255, 255, 255, ${borderOpacity})`;
                } else {
                    // No Hero Target (e.g. Privacy/Blog pages) -> Sync directly with Header Target
                    // This allows the avatar to "appear" in the header when the header slot opens
                    avatar.style.top = `${rHeader.top}px`;
                    avatar.style.left = `${rHeader.left}px`;
                    avatar.style.width = `${rHeader.width}px`;
                    avatar.style.height = `${rHeader.height}px`;
                    avatar.style.borderWidth = "0px";
                    avatar.style.borderColor = "transparent";
                }
            }

            animationId = requestAnimationFrame(tick);
        };

        // Pause animation when tab is not visible
        const handleVisibilityChange = () => {
            if (document.hidden) {
                isRunning = false;
                cancelAnimationFrame(animationId);
            } else {
                isRunning = true;
                animationId = requestAnimationFrame(tick);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Initial state check (if page loads already scrolled)
        handleScroll();
        animationId = requestAnimationFrame(tick);

        return () => {
            isRunning = false;
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Memoized cursor handlers for the floating avatar
    const handleAvatarMouseEnter = useCallback(() => {
        showClick();
    }, [showClick]);

    const handleAvatarMouseLeave = useCallback(() => {
        resetCursor();
    }, [resetCursor]);

    // Do not render avatar on Services or About page
    if (pathname === "/services" || pathname === "/about" || pathname === "/privacy") return null;

    return (
        <div
            ref={avatarRef}
            id="floating-avatar-overlay"
            className="fixed z-[101] rounded-full overflow-hidden shadow-lg cursor-none"
            style={{
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                willChange: "top, left, width, height, border-width, border-color",
                backgroundColor: "#f0f0f0"
            }}
            onMouseEnter={handleAvatarMouseEnter}
            onMouseLeave={handleAvatarMouseLeave}
        >
            <InteractiveAvatar className="w-full h-full pointer-events-none" />
        </div>
    );
}
