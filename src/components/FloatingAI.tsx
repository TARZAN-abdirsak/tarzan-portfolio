"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useCursor } from "@/context/CursorContext";
import { useChatContext } from "@/context/ChatContext";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

// Tags for the input area
// Tags removed
const INPUT_TAGS: { icon: string; text: string }[] = [];

// Memoize transport outside component to prevent recreation
const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

export default function FloatingAI() {
    const { isOpen, mode, closeChat, toggleChat, openChat } = useChatContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const { setForceHide, showAI, showWrite, resetCursor } = useCursor();

    const [inputVal, setInputVal] = useState("");
    const [isInHeroSection, setIsInHeroSection] = useState(true); // Track if we're in hero section
    const { messages, sendMessage, status } = useChat({
        transport: chatTransport, // Use memoized transport
    });

    // Detect if user is in Hero Section
    useEffect(() => {
        const handleScroll = () => {
            // Get the viewport height
            const viewportHeight = window.innerHeight;
            // Consider user in hero section if scroll position is less than 80% of viewport height
            const inHero = window.scrollY < viewportHeight * 0.8;
            setIsInHeroSection(inHero);
        };

        // Initial check
        handleScroll();

        // Listen to scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lead form state
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [leadFormData, setLeadFormData] = useState({ name: "", email: "" });
    const [leadFormStatus, setLeadFormStatus] = useState<"idle" | "submitting" | "submitted">("idle");

    // Detect [SHOW_FORM] token in messages
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === "assistant") {
            const text = lastMessage.parts
                ?.filter(part => part.type === 'text')
                .map(part => (part as { type: 'text'; text: string }).text)
                .join('') || '';
            if (text.includes("[SHOW_FORM]") && leadFormStatus !== "submitted") {
                setShowLeadForm(true);
            }
        }
    }, [messages, leadFormStatus]);

    // Handle lead form submission
    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!leadFormData.name.trim() || !leadFormData.email.trim()) return;

        setLeadFormStatus("submitting");
        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: leadFormData.name,
                    email: leadFormData.email,
                    conversation: messages.map(m => ({
                        role: m.role,
                        content: m.parts?.filter(p => p.type === 'text').map(p => (p as { type: 'text'; text: string }).text).join('') || ''
                    }))
                })
            });
            if (response.ok) {
                setLeadFormStatus("submitted");
                setShowLeadForm(false);
                // Send confirmation message
                sendMessage({ text: "Form submitted ✅" });
            }
        } catch (error) {
            console.error("Lead submission error:", error);
            setLeadFormStatus("idle");
        }
    };

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, mode]);

    // Close on outside click handler removed

    // Memoized suggestion click handler
    const handleSuggestionClick = useCallback((text: string) => {
        sendMessage({ text });
    }, [sendMessage]);

    // Memoized form submit handler
    const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputVal.trim()) return;
        sendMessage({ text: inputVal });
        setInputVal("");
    }, [inputVal, sendMessage]);

    // Memoized message text extractor
    const getMessageText = useCallback((message: typeof messages[number]) => {
        return message.parts
            ?.filter(part => part.type === 'text')
            .map(part => (part as { type: 'text'; text: string }).text)
            .join('') || '';
    }, []);

    // Memoized check for user messages
    const hasUserMessages = useMemo(() =>
        messages.some(m => m.role === 'user'),
        [messages]);



    // Suggestion chips for empty state
    const SUGGESTIONS = [
        { text: 'What services do you offer?' },
        { text: 'Tell me about your projects' },
        { text: 'How can AI help my business?' },
        { text: 'I want a free consultation' },
    ];

    // === LARGE DASHBOARD — LIGHT CLEAN ===
    const renderLargeChat = () => (
        <div className={`
            fixed inset-0 z-[9999] flex items-center justify-center
            bg-black/40 backdrop-blur-md p-4 md:p-8
            transition-all duration-500 ease-out
            ${isOpen && mode === 'large' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
            onClick={(e) => {
                if (e.target === e.currentTarget) closeChat();
            }}
        >
            {/* Modal Container — Light */}
            <div className={`
                w-full max-w-[1400px] h-full max-h-[85vh]
                backdrop-blur-3xl
                flex rounded-3xl overflow-hidden relative
                border border-black/[0.06]
                transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                font-poppins
                ${isOpen && mode === 'large'
                    ? 'scale-100 translate-y-0 opacity-100'
                    : 'scale-90 translate-y-24 opacity-0 pointer-events-none'
                }
            `}
                style={{
                    background: '#FFF8E7',
                    boxShadow: '0 40px 120px -20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.04)'
                }}
            >
                {/* === MAIN CONTENT AREA === */}
                <div className="flex-1 flex flex-col relative overflow-hidden">

                    {/* ── Top Bar ── */}
                    <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-black/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 p-[2px] shadow-lg shadow-emerald-500/20">
                                <img src="/avatar.ex.svg" className="w-full h-full rounded-[10px] object-cover" alt="Tarzan AI" />
                                {/* Online dot */}
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#FFF8E7]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base font-semibold text-gray-900 tracking-tight font-poppins">Tarzan AI</span>
                                <span className="text-[11px] text-emerald-500 font-medium">Online now</span>
                            </div>
                        </div>

                        <button
                            onClick={closeChat}
                            className="w-9 h-9 rounded-full bg-black/[0.04] hover:bg-black/[0.08] flex items-center justify-center transition-all duration-200 text-gray-400 hover:text-gray-700 hover:rotate-90"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* ── Center Content ── */}
                    <div className={`flex-1 flex flex-col items-center px-6 md:px-8 scrollbar-custom ${!hasUserMessages ? 'justify-center' : 'h-full overflow-y-auto'}`}>
                        {!hasUserMessages ? (
                            <>
                                {/* Empty State */}
                                <div className="flex flex-col items-center max-w-2xl w-full -mt-8">
                                    {/* Shimmer Heading */}
                                    <h1
                                        className="text-4xl md:text-5xl font-bold text-center tracking-tight font-poppins mb-4 animate-shimmer"
                                        style={{
                                            background: 'linear-gradient(90deg, #1a1a1a, #059669, #1a1a1a)',
                                            backgroundSize: '200% auto',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}
                                    >
                                        How can I help you today?
                                    </h1>
                                    <p className="text-sm text-gray-500 mb-10 text-center font-poppins">Ask me anything about services, projects, or get a free consultation.</p>

                                    {/* Input Field */}
                                    <form onSubmit={handleFormSubmit} className="relative w-full mb-8">
                                        <div className="flex items-center bg-white rounded-2xl border border-gray-200 pl-5 pr-2 py-1 hover:border-emerald-300/50 focus-within:border-emerald-400 focus-within:shadow-[0_0_20px_-6px_rgba(52,211,153,0.15)] transition-all duration-300">
                                            <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                                            </svg>
                                            <input
                                                type="text"
                                                value={inputVal}
                                                onChange={(e) => setInputVal(e.target.value)}
                                                onFocus={showWrite}
                                                onBlur={resetCursor}
                                                placeholder="Ask me anything..."
                                                className="flex-1 min-w-0 bg-transparent text-base text-gray-800 placeholder-gray-400 px-2 py-3.5 focus:outline-none truncate font-poppins"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!inputVal.trim() || status !== 'ready'}
                                                className={`
                                                    w-10 h-10 rounded-xl flex items-center justify-center
                                                    transition-all duration-300 transform flex-shrink-0
                                                    ${inputVal.trim()
                                                        ? 'bg-black text-white shadow-lg shadow-black/30 hover:shadow-black/50 hover:scale-105 active:scale-95'
                                                        : 'bg-gray-100 text-gray-300'
                                                    }
                                                `}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <line x1="12" y1="19" x2="12" y2="5" />
                                                    <polyline points="5 12 12 5 19 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>

                                    {/* Suggestion Chips */}
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {SUGGESTIONS.map((s, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSuggestionClick(s.text)}
                                                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-emerald-300/50 hover:shadow-[0_0_16px_-4px_rgba(52,211,153,0.1)] transition-all duration-300 font-poppins"
                                            >
                                                <span className="font-medium">{s.text}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* ── Chat Messages ── */
                            <div className="w-full max-w-3xl py-8 space-y-5">
                                {messages.map((m, idx) => {
                                    const text = getMessageText(m);
                                    const displayText = text.replace("[SHOW_FORM]", "").trim();
                                    return (
                                        <div
                                            key={m.id}
                                            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                                            style={{ animationDelay: `${idx * 50}ms` }}
                                        >
                                            {m.role !== 'user' && (
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 p-[2px] mr-3 flex-shrink-0 shadow-sm shadow-emerald-500/20 mt-1">
                                                    <img src="/avatar.ex.svg" alt="AI" className="w-full h-full rounded-[6px] object-cover" />
                                                </div>
                                            )}
                                            <div className={`
                                                max-w-[75%] px-5 py-3.5 text-[14px] leading-relaxed
                                                ${m.role === 'user'
                                                    ? 'font-poppins bg-transparent text-emerald-600 rounded-2xl rounded-br-md border-b-2 border-emerald-500/10'
                                                    : 'font-outfit bg-transparent text-gray-700 rounded-2xl rounded-bl-md'
                                                }
                                            `}>
                                                <div className="whitespace-pre-wrap">{displayText}</div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Typing Indicator */}
                                {status !== 'ready' && (
                                    <div className="flex justify-start animate-fade-in-up">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 p-[2px] mr-3 flex-shrink-0 shadow-sm shadow-emerald-500/20 mt-1">
                                            <img src="/avatar.ex.svg" alt="AI" className="w-full h-full rounded-[6px] object-cover" />
                                        </div>
                                        <div className="bg-transparent rounded-2xl rounded-bl-md px-5 py-4 flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce-dot-1" />
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce-dot-2" />
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce-dot-3" />
                                        </div>
                                    </div>
                                )}

                                {/* Lead Capture Form */}
                                {showLeadForm && leadFormStatus !== "submitted" && (
                                    <div className="max-w-md mx-auto rounded-2xl p-6 animate-fade-in-up font-poppins"
                                        style={{
                                            background: 'transparent',
                                            boxShadow: 'none'
                                        }}
                                    >
                                        <p className="text-[15px] font-semibold text-gray-800 mb-5 text-center tracking-tight">Complete Your Request</p>
                                        <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                value={leadFormData.name}
                                                onChange={(e) => setLeadFormData(p => ({ ...p, name: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-200 focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_16px_-4px_rgba(52,211,153,0.15)] transition-all duration-300 font-poppins"
                                                required
                                            />
                                            <input
                                                type="email"
                                                placeholder="Your Email"
                                                value={leadFormData.email}
                                                onChange={(e) => setLeadFormData(p => ({ ...p, email: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-200 focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_16px_-4px_rgba(52,211,153,0.15)] transition-all duration-300 font-poppins"
                                                required
                                            />
                                            <button
                                                type="submit"
                                                disabled={leadFormStatus === "submitting"}
                                                className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-black hover:bg-gray-900 disabled:opacity-50 transition-all duration-300 font-poppins tracking-wide shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30"
                                            >
                                                {leadFormStatus === "submitting" ? "Sending..." : "Submit Request"}
                                            </button>
                                        </form>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* ── Bottom Input (When messages exist) ── */}
                    {hasUserMessages && (
                        <div className="p-4 md:p-6 pt-0">
                            <div className="max-w-3xl mx-auto">
                                <form onSubmit={handleFormSubmit} className="relative">
                                    <div className="flex items-center bg-white rounded-2xl border border-gray-200 pl-5 pr-2 py-1 hover:border-emerald-300/50 focus-within:border-emerald-400 focus-within:shadow-[0_0_20px_-6px_rgba(52,211,153,0.15)] transition-all duration-300">
                                        <input
                                            type="text"
                                            value={inputVal}
                                            onChange={(e) => setInputVal(e.target.value)}
                                            onFocus={showWrite}
                                            onBlur={resetCursor}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-transparent text-base text-gray-800 placeholder-gray-400 px-2 py-3 focus:outline-none font-poppins"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!inputVal.trim() || status !== 'ready'}
                                            className={`
                                                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 transform flex-shrink-0
                                                ${inputVal.trim()
                                                    ? 'bg-black text-white shadow-lg shadow-black/30 hover:scale-105 active:scale-95'
                                                    : 'bg-gray-100 text-gray-300'
                                                }
                                            `}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <line x1="12" y1="19" x2="12" y2="5" />
                                                <polyline points="5 12 12 5 19 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* ── Floating AI Button — Premium Dark with Emerald Glow ── */}
            <div className={`fixed bottom-6 right-6 z-[9990] transition-all duration-500 ${isOpen || !isInHeroSection ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'}`}>
                <button
                    id="floating-ai-button"
                    onClick={() => isOpen ? closeChat() : openChat('large')}
                    onMouseEnter={showAI}
                    onMouseLeave={resetCursor}
                    className="group relative w-14 h-14 rounded-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-glow"
                >
                    {/* Glow ring */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-500/40 to-green-600/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />

                    {/* Button body */}
                    <div className="relative w-full h-full rounded-2xl bg-neutral-950 border border-white/10 overflow-hidden shadow-2xl">
                        <img
                            src="/avatar.ex.svg"
                            alt="AI Assistant"
                            className="w-full h-full object-cover"
                        />
                        {/* Online dot */}
                        <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-[1.5px] border-neutral-950" />
                    </div>
                </button>
            </div>

            {renderLargeChat()}
        </>
    );
}
