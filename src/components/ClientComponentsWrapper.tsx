"use client";

import dynamic from "next/dynamic";

// Lazy-load non-critical components for better LCP
import CustomCursor from "@/components/CustomCursor";

// Lazy-load non-critical components for better LCP
const FloatingAvatarOverlay = dynamic(() => import("@/components/FloatingAvatarOverlay"), {
    ssr: false,
});
// CustomCursor loaded statically to prevent Suspense/hydration issues during rapid updates
const FloatingAI = dynamic(() => import("@/components/FloatingAI"), {
    ssr: false,
});

const LiquidTimeWidget = dynamic(() => import("@/components/LiquidTimeWidget"), {
    ssr: false,
});

// Client wrapper for lazy-loaded global components
export default function ClientComponentsWrapper() {
    return (
        <>
            <CustomCursor />
            <FloatingAvatarOverlay />
            <FloatingAI />

            {/* Liquid Time Widget - Fixed Bottom Left */}
            <div className="fixed bottom-4 left-3 md:bottom-6 md:left-6 z-[9999] transform hover:scale-105 transition-transform duration-300">
                <LiquidTimeWidget />
            </div>
        </>
    );
}
