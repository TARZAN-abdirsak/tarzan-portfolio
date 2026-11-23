"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import PixelPointHeader from "@/components/PixelPointHeader";
import FeedbackForm from "@/components/FeedbackForm";
import { Testimonials, type Testimonial } from "@/components/ui/testimonials";
import { useCursor } from "@/context/CursorContext";
import { useLanguage } from "@/context/LanguageContext";

interface ApiFeedbackItem {
    id: string;
    name: string;
    daahqaad?: string | null;
    message: string;
    context?: string;
    rating?: number;
    createdAt?: string;
}

const AVATAR_POOL = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&h=160&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&h=160&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80",
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
    {
        image: AVATAR_POOL[0],
        name: "Sarah M.",
        username: "@sarahm · Collaboration",
        text: "Working with Tarzan was an incredible experience. He brought fresh ideas and delivered beyond expectations. Highly recommend!",
        social: "https://daahqaad.com/@sarahm",
    },
    {
        image: AVATAR_POOL[1],
        name: "Ahmed K.",
        username: "@ahmedk · Project",
        text: "Professional, timely, and creative. The project was completed ahead of schedule with excellent quality and clean architecture.",
        social: "https://daahqaad.com/@ahmedk",
    },
    {
        image: AVATAR_POOL[2],
        name: "Lisa T.",
        username: "@lisat · Consultation",
        text: "Great consultation session. Helped clarify our technical roadmap and provided actionable insights for scaling our product.",
        social: "https://daahqaad.com/@lisat",
    },
    {
        image: AVATAR_POOL[3],
        name: "David Smith",
        username: "@davidsmith · AI Integration",
        text: "Integrating AI into our workflow seemed daunting until Abukar stepped in. The automation now saves our team hours every single day.",
        social: "https://daahqaad.com/@davidsmith",
    },
    {
        image: AVATAR_POOL[4],
        name: "Amina Hassan",
        username: "@aminahassan · E-Commerce",
        text: "From design to deployment, every interaction feels fast and intentional. Our customers immediately noticed the upgrade.",
        social: "https://daahqaad.com/@aminahassan",
    },
    {
        image: AVATAR_POOL[5],
        name: "James Wilson",
        username: "@jameswilson · Systems",
        text: "Rare mix of strong backend engineering and sharp visual taste. Reliable communication and rock-solid delivery throughout.",
        social: "https://daahqaad.com/@jameswilson",
    },
    {
        image: AVATAR_POOL[6],
        name: "Sophia Lee",
        username: "@sophialee · Product Design",
        text: "Turned a rough business idea into a polished, production-ready web platform. Thoughtful about every detail and edge case.",
        social: "https://daahqaad.com/@sophialee",
    },
    {
        image: AVATAR_POOL[7],
        name: "Omar Farah",
        username: "@omarfarah · POS & Operations",
        text: "Built tools tailored to how our business actually runs day to day. Fast, dependable, and effortless for staff to pick up.",
        social: "https://daahqaad.com/@omarfarah",
    },
    {
        image: AVATAR_POOL[8],
        name: "Rachel Patel",
        username: "@rachelpatel · Mobile App",
        text: "Responsive, clean, and built to scale. Partnering with Koodby elevated our product experience from day one.",
        social: "https://daahqaad.com/@rachelpatel",
    },
];

export default function FeedbackPage() {
    const { showClick, resetCursor } = useCursor();
    const { t } = useLanguage();
    const [showForm, setShowForm] = useState(false);
    const [liveTestimonials, setLiveTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        if (showForm) return;
        let cancelled = false;

        async function fetchFeedback() {
            try {
                const res = await fetch("/api/feedback");
                if (!res.ok) return;
                const data: ApiFeedbackItem[] = await res.json();
                if (!cancelled && Array.isArray(data) && data.length > 0) {
                    const mapped: Testimonial[] = data.map((item, idx) => {
                        const cleanDaahqaad = item.daahqaad?.trim().replace(/^@+/, "");
                        const handle = cleanDaahqaad
                            ? `@${cleanDaahqaad}`
                            : `@${item.name.toLowerCase().replace(/[^a-z0-9]/g, "") || "client"}`;
                        return {
                            image: AVATAR_POOL[idx % AVATAR_POOL.length],
                            name: item.name,
                            username: item.context ? `${handle} · ${item.context}` : handle,
                            text: item.message,
                            social: cleanDaahqaad ? `https://daahqaad.com/@${cleanDaahqaad}` : undefined,
                        };
                    });
                    setLiveTestimonials(mapped);
                }
            } catch {
                // Fall back cleanly to curated testimonials
            }
        }

        fetchFeedback();
        return () => {
            cancelled = true;
        };
    }, [showForm]);

    const allTestimonials = [...liveTestimonials, ...DEFAULT_TESTIMONIALS];

    return (
        <PageWrapper>
            <PixelPointHeader />
            <main className="w-full min-h-screen bg-[#f9f9f9] pt-24 md:pt-28 pb-24 px-6 md:px-12 lg:px-24 [--background:#f9f9f9] [--foreground:#171717] [--card:#ffffff] [--card-foreground:#171717] [--border:#e5e7eb] [--muted:#f3f4f6] [--muted-foreground:#6b7280] [--primary:#171717] [--primary-foreground:#ffffff] [--secondary:#ffffff] [--secondary-foreground:#171717] [--accent:#f3f4f6] [--accent-foreground:#171717]">
                <div className="max-w-[1400px] mx-auto">

                    {/* Compact Top-Right Feedback Toggle Button */}
                    <div className="flex justify-end mb-2">
                        <button
                            type="button"
                            onClick={() => setShowForm((prev) => !prev)}
                            onMouseEnter={showClick}
                            onMouseLeave={resetCursor}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
                        >
                            {showForm ? (
                                <>
                                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                    {t("feedback.viewBtn")}
                                </>
                            ) : (
                                <>
                                    <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
                                    {t("feedback.leaveBtn")}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Content */}
                    {showForm ? (
                        <div className="max-w-xl mx-auto pt-4">
                            <FeedbackForm />
                        </div>
                    ) : (
                        <Testimonials
                            testimonials={allTestimonials}
                            title={t("feedback.title")}
                            description={t("feedback.subtitle")}
                            loadMoreLabel={t("feedback.loadMore")}
                            maxDisplayed={6}
                        />
                    )}

                </div>
            </main>
        </PageWrapper>
    );
}
