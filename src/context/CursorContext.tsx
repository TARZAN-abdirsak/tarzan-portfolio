"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, ReactNode, useRef } from "react";

interface CursorContextType {
    mousePos: { x: number; y: number };
    isVisible: boolean;
    cursorText: string;
    cursorColor: string;
    showAI: () => void;      // AI chat hover
    showDrag: () => void;    // Physics/draggable items
    showRead: () => void;    // Text content
    showClick: () => void;   // Buttons
    showWrite: () => void;   // Input fields
    resetCursor: () => void; // Default state
    setCursor: (text: string, color?: string) => void; // Generic custom cursor
    setForceHide: (hide: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);
    const [cursorText, setCursorText] = useState("");
    const [cursorColor, setCursorColor] = useState("#3B82F6"); // Blue default
    const [forceHide, setForceHideState] = useState(false);

    const forceHideRef = useRef(forceHide);
    forceHideRef.current = forceHide;

    useEffect(() => {
        let lastUpdate = 0;
        const throttleMs = 16;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastUpdate < throttleMs) return;
            lastUpdate = now;

            setMousePos({ x: e.clientX, y: e.clientY });
            if (!forceHideRef.current) {
                setIsVisible(true);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => {
            if (!forceHideRef.current) setIsVisible(true);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    // AI Chat hover
    const showAI = useCallback(() => {
        setCursorText("TARZAN AI");
        setCursorColor("#8B5CF6"); // Purple
    }, []);

    // Draggable items
    const showDrag = useCallback(() => {
        setCursorText("Drag");
        setCursorColor("#F59E0B"); // Amber
    }, []);

    // Text content
    const showRead = useCallback(() => {
        setCursorText("Read");
        setCursorColor("#10B981"); // Green
    }, []);

    // Buttons
    const showClick = useCallback(() => {
        setCursorText("Click");
        setCursorColor("#3B82F6"); // Blue
    }, []);

    // Input fields
    const showWrite = useCallback(() => {
        setCursorText("Write");
        setCursorColor("#EC4899"); // Pink
    }, []);

    // Reset to default (no label)
    const resetCursor = useCallback(() => {
        setCursorText("");
        setCursorColor("#3B82F6"); // Blue
    }, []);

    // Generic custom cursor setter
    const setCursor = useCallback((text: string, color: string = "#3B82F6") => {
        setCursorText(text);
        setCursorColor(color);
    }, []);

    const setForceHide = useCallback((hide: boolean) => {
        setForceHideState(hide);
        if (hide) setIsVisible(false);
    }, []);

    const value = useMemo(() => ({
        mousePos,
        isVisible: isVisible && !forceHide,
        cursorText,
        cursorColor,
        showAI,
        showDrag,
        showRead,
        showClick,
        showWrite,
        resetCursor,
        setCursor,
        setForceHide,
    }), [mousePos, isVisible, forceHide, cursorText, cursorColor, showAI, showDrag, showRead, showClick, showWrite, resetCursor, setCursor, setForceHide]);

    return (
        <CursorContext.Provider value={value}>
            {children}
        </CursorContext.Provider>
    );
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (context === undefined) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
}
