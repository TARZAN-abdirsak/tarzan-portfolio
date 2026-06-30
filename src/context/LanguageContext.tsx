"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { translations, type Locale, type TranslationKey } from "@/i18n/translations";

interface LanguageContextValue {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "tarzan_locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Default is English ("en") - user requested
    const [locale, setLocaleState] = useState<Locale>("en");

    // Read persisted locale on client mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === "so" || stored === "en") {
                setLocaleState(stored);
            }
        } catch {
            // ignore (SSR / private mode)
        }
    }, []);

    const setLocale = useCallback((l: Locale) => {
        setLocaleState(l);
        try {
            localStorage.setItem(STORAGE_KEY, l);
            document.documentElement.lang = l;
        } catch {
            // ignore
        }
    }, []);

    // Keep <html lang> attribute in sync
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const t = useCallback(
        (key: TranslationKey): string => {
            return translations[locale]?.[key] ?? translations.en[key] ?? key;
        },
        [locale]
    );

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error("useLanguage must be used inside <LanguageProvider>");
    }
    return ctx;
}
