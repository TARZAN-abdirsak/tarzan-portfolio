"use client";

import React, { useRef, useEffect, useState } from "react";


/**
 * EYE SHAPE DATA (From your eye.svg)
 * This path defines the EXACT shape you measured.
 */
const EYE_PATH_D = "M11.0156 46.0029L1.51562 38.5029L0.515625 31.5029L3.51562 25.0029L8.51562 18.5029L14.0156 11.0029L21.0156 6.50293L30.5156 1.50293L41.0156 0.50293L48.5156 1.50293L53.0156 4.00293L58.5156 8.00293L64.5156 14.5029L68.0156 20.5029L68.5156 28.0029L68.0156 33.0029L64.5156 38.5029L58.5156 44.0029L50.0156 48.5029L38.5156 50.0029H27.5156L18.5156 48.5029L11.0156 46.0029Z";
const EYE_VIEWBOX = "0 0 70 51";

// Configuration for placement (tweaked for this specific path size)
const eyeSettings = {
    leftEye: {
        width: '6.7%',
        top: '30.6%',
        left: '40.2%',
    },
    rightEye: {
        width: '6.7%',
        top: '30.6%',
        left: '53.1%',
    },
    pupil: {
        color: '#1a0f0a',
        radius: 16, // Radius of pupil circle in SVG units
    },
    sclera: {
        color: '#fdfbf7', // Warm off-white base
    }
};

/**
 * InteractiveAvatar (2D Hybrid + Inline SVG Path)
 */
export default function InteractiveAvatar({ className }: { className?: string }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) - rect.width / 2;
            const y = (e.clientY - rect.top) - rect.height / 2;
            setMousePos({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Movement limits (in SVG pixels approx)
    const limitX = 15;
    const limitY = 10;

    // Calculate movement
    const lookX = Math.min(Math.max(mousePos.x / 20, -limitX), limitX);
    const lookY = Math.min(Math.max(mousePos.y / 20, -limitY), limitY);

    return (
        <div
            ref={containerRef}
            className={`relative flex justify-center items-center ${className}`}
            style={{ width: '100%', height: '100%' }}
        >
            <img
                src="/avatar.ex.svg"
                alt="Interactive Avatar"
                className="w-full h-full object-contain pointer-events-none select-none relative z-10"
            />

            {/* Interactive Eyes Layer */}
            <div className="absolute w-full h-full top-0 left-0 z-20 pointer-events-none">

                {/* Left Eye SVG */}
                <div
                    className="absolute"
                    style={{
                        width: eyeSettings.leftEye.width,
                        // Aspect ratio of 70/51 ~ 1.37
                        aspectRatio: '70 / 51',
                        top: eyeSettings.leftEye.top,
                        left: eyeSettings.leftEye.left,
                    }}
                >
                    <svg viewBox={EYE_VIEWBOX} className="w-full h-full overflow-visible">
                        <defs>
                            <clipPath id="left-eye-clip">
                                <path d={EYE_PATH_D} />
                            </clipPath>
                            {/* Realistic Eye Gradient */}
                            <radialGradient id="eye-gradient-left" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#fffcf5" /> {/* Center: Bright warm white */}
                                <stop offset="80%" stopColor="#f0eadd" /> {/* Edge: Slightly darker/flesh tone */}
                                <stop offset="100%" stopColor="#e8e0d5" /> {/* Far Edge: Shadowy */}
                            </radialGradient>
                        </defs>

                        {/* Sclera (White Part) with Gradient */}
                        <path d={EYE_PATH_D} fill="url(#eye-gradient-left)" />

                        {/* Inner Shadow (Eyelid effect) */}
                        <path d={EYE_PATH_D} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />

                        {/* Moving Group (Clipped) */}
                        <g clipPath="url(#left-eye-clip)">
                            <circle
                                cx={35 + lookX}
                                cy={25 + lookY}
                                r={eyeSettings.pupil.radius}
                                fill={eyeSettings.pupil.color}
                                style={{ transition: 'cx 0.1s, cy 0.1s' }}
                            />
                            {/* Reflections */}
                            <circle cx={35 + lookX + 5} cy={25 + lookY - 5} r="4" fill="white" opacity="0.9" style={{ transition: 'cx 0.1s, cy 0.1s' }} />
                            <circle cx={35 + lookX - 4} cy={25 + lookY + 4} r="2" fill="white" opacity="0.5" style={{ transition: 'cx 0.1s, cy 0.1s' }} />
                        </g>
                    </svg>
                </div>

                {/* Right Eye SVG (Mirrored) */}
                <div
                    className="absolute"
                    style={{
                        width: eyeSettings.rightEye.width,
                        aspectRatio: '70 / 51',
                        top: eyeSettings.rightEye.top,
                        left: eyeSettings.rightEye.left,
                    }}
                >
                    {/* transform scaleX(-1) mirrors the SVG */}
                    <svg viewBox={EYE_VIEWBOX} className="w-full h-full overflow-visible" style={{ transform: 'scaleX(-1)' }}>
                        <defs>
                            <clipPath id="right-eye-clip">
                                <path d={EYE_PATH_D} />
                            </clipPath>
                            <radialGradient id="eye-gradient-right" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#fffcf5" />
                                <stop offset="80%" stopColor="#f0eadd" />
                                <stop offset="100%" stopColor="#e8e0d5" />
                            </radialGradient>
                        </defs>

                        {/* Sclera with Gradient */}
                        <path d={EYE_PATH_D} fill="url(#eye-gradient-right)" />
                        <path d={EYE_PATH_D} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />

                        {/* Moving Group */}
                        <g clipPath="url(#right-eye-clip)">
                            {/* Note: since SVG is flipped scaleX(-1), moving pupil +X moves it LEFT visually.
                   We must invert lookX to move it correctly relative to mouse. */}
                            <circle
                                cx={35 - lookX}
                                cy={25 + lookY}
                                r={eyeSettings.pupil.radius}
                                fill={eyeSettings.pupil.color}
                                style={{ transition: 'cx 0.1s, cy 0.1s' }}
                            />
                            {/* Reflections */}
                            <circle cx={35 - lookX + 5} cy={25 + lookY - 5} r="4" fill="white" opacity="0.9" style={{ transition: 'cx 0.1s, cy 0.1s' }} />
                            <circle cx={35 - lookX - 4} cy={25 + lookY + 4} r="2" fill="white" opacity="0.5" style={{ transition: 'cx 0.1s, cy 0.1s' }} />
                        </g>
                    </svg>
                </div>

            </div>
        </div>
    );
}
