"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/i18n/translations";

interface LanguageToggleProps {
    /**
     * - "navbar"  → polished dropdown for desktop header (adapts to dark/light)
     * - "mobile"  → bigger, full-width pill for the mobile menu
     * - "pill"    → segmented control (legacy, kept for compatibility)
     * - "minimal" → tiny SO/EN swap
     */
    variant?: "navbar" | "mobile" | "pill" | "minimal";
    className?: string;
    /** When in "navbar" variant, hint whether the header is on a dark background */
    onDark?: boolean;
}

const LOCALES: { code: Locale; label: string; native: string; flag: string }[] = [
    { code: "so", label: "Somali", native: "Soomaali", flag: "🇸🇴" },
    { code: "en", label: "English", native: "English", flag: "🇬🇧" },
];

const GlobeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const ChevronDownIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const CheckIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default function LanguageToggle({ variant = "navbar", className = "", onDark = false }: LanguageToggleProps) {
    const { locale, setLocale, t } = useLanguage();
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

    // Close on outside click + Escape
    useEffect(() => {
        if (!open) return;

        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [open]);

    // ── MINIMAL ─────────────────────────────────────────────
    if (variant === "minimal") {
        return (
            <button
                type="button"
                onClick={() => setLocale(locale === "so" ? "en" : "so")}
                aria-label={t("lang.label")}
                className={`text-xs font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity ${className}`}
            >
                {locale === "so" ? "EN" : "SO"}
            </button>
        );
    }

    // ── PILL (legacy segmented) ─────────────────────────────
    if (variant === "pill") {
        return (
            <div
                role="group"
                aria-label={t("lang.label")}
                className={`inline-flex items-center gap-1 rounded-full border border-black/15 bg-white/70 backdrop-blur-sm p-1 shadow-sm ${className}`}
            >
                {LOCALES.map((l) => (
                    <button
                        key={l.code}
                        type="button"
                        onClick={() => setLocale(l.code)}
                        aria-pressed={locale === l.code}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                            locale === l.code ? "bg-black text-white" : "text-black/70 hover:text-black"
                        }`}
                    >
                        {l.native}
                    </button>
                ))}
            </div>
        );
    }

    // ── MOBILE ──────────────────────────────────────────────
    if (variant === "mobile") {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {LOCALES.map((l) => {
                    const active = locale === l.code;
                    return (
                        <button
                            key={l.code}
                            type="button"
                            onClick={() => setLocale(l.code)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-semibold transition-all border ${
                                active
                                    ? "bg-white text-black border-white shadow-lg shadow-white/20"
                                    : "bg-transparent text-white/70 border-white/25 hover:border-white/60 hover:text-white"
                            }`}
                        >
                            <span className="text-lg leading-none">{l.flag}</span>
                            <span>{l.native}</span>
                        </button>
                    );
                })}
            </div>
        );
    }

    // ── NAVBAR (default — elegant dropdown) ─────────────────
    const triggerBase =
        "group flex items-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 px-3.5 py-2 text-xs cursor-pointer";
    const triggerLight =
        "bg-white/60 hover:bg-white/90 text-black border border-black/10 backdrop-blur-sm shadow-sm hover:shadow";
    const triggerDark =
        "bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-sm";

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={t("lang.label")}
                className={`${triggerBase} ${onDark ? triggerDark : triggerLight}`}
            >
                <GlobeIcon className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-[0.18em]">
                    {current.code}
                </span>
                <span className="sm:hidden text-base leading-none">{current.flag}</span>
                <ChevronDownIcon
                    className={`w-3 h-3 opacity-60 transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                    }`}
                />
            </button>

            {/* Dropdown */}
            <div
                role="listbox"
                aria-label={t("lang.label")}
                className={`
                    absolute right-0 top-[calc(100%+8px)] min-w-[180px]
                    rounded-2xl border bg-white/95 backdrop-blur-xl shadow-2xl
                    border-black/10 overflow-hidden
                    origin-top-right transition-all duration-200
                    ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
                `}
            >
                <div className="px-3 pt-3 pb-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                        {t("lang.label")}
                    </p>
                </div>
                <ul className="pb-2">
                    {LOCALES.map((l) => {
                        const active = locale === l.code;
                        return (
                            <li key={l.code}>
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => {
                                        setLocale(l.code);
                                        setOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                                        active
                                            ? "bg-black/5 text-black"
                                            : "text-black/70 hover:bg-black/[0.03] hover:text-black"
                                    }`}
                                >
                                    <span className="text-xl leading-none">{l.flag}</span>
                                    <span className="flex-1 flex flex-col">
                                        <span className="text-sm font-semibold leading-tight">{l.native}</span>
                                        <span className="text-[10px] uppercase tracking-[0.15em] text-black/40 mt-0.5">
                                            {l.code}
                                        </span>
                                    </span>
                                    {active && (
                                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black text-white shrink-0">
                                            <CheckIcon className="w-3 h-3" />
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
