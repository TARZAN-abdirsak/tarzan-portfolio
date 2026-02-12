"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamic import for the avatar to avoid SSR issues
const InteractiveAvatar = dynamic(() => import("@/components/InteractiveAvatar"), {
    ssr: false,
    loading: () => <div className="w-96 h-96 bg-gray-200 animate-pulse rounded-full flex items-center justify-center">Loading 3D...</div>
});

export default function AvatarTestPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-8">3D Avatar Playground</h1>
            <p className="mb-12 text-gray-400">Isolated environment for testing and refining the 3D face.</p>

            <div className="relative w-96 h-96 border-4 border-white/10 rounded-full overflow-hidden bg-gray-800 shadow-2xl">
                <InteractiveAvatar className="w-full h-full" />
            </div>

            <div className="mt-12 p-6 bg-gray-800 rounded-xl max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Debug Controls</h2>
                <div className="space-y-4 text-sm text-gray-400">
                    <p>Move your mouse to rotate the head.</p>
                    <p>We can add sliders here later to tweak parameters.</p>
                </div>
            </div>
        </div>
    );
}
