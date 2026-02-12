"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";

type ChatMode = "small" | "large";

interface ChatContextType {
    isOpen: boolean;
    mode: ChatMode;
    openChat: (mode?: ChatMode) => void;
    closeChat: () => void;
    toggleChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<ChatMode>("small");

    // Memoize all callbacks to prevent re-renders
    const openChat = useCallback((newMode: ChatMode = "small") => {
        setMode(newMode);
        setIsOpen(true);
    }, []);

    const closeChat = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => {
            if (prev) return false;
            setMode("small");
            return true;
        });
    }, []);

    // Memoize the context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        isOpen,
        mode,
        openChat,
        closeChat,
        toggleChat
    }), [isOpen, mode, openChat, closeChat, toggleChat]);

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChatContext must be used within a ChatProvider");
    }
    return context;
}
