"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import PixelPointHeader from "@/components/PixelPointHeader";
import FeedbackForm from "@/components/FeedbackForm";
import { Testimonials, type Testimonial } from "@/components/ui/testimonials";
import { useCursor } from "@/context/CursorContext";
import { useLanguage } from "@/context/LanguageContext";
import { parseDaahqaadLink } from "@/lib/daahqaad";

interface ApiFeedbackItem {
    id: string;
    name: string;
    daahqaad?: string | null;
    message: string;
    context?: string;
    rating?: number;
    createdAt?: string;
}

export default function FeedbackPage() {
    const { showClick, resetCursor } = useCursor();
    const { t } = useLanguage();
    const [showForm, setShowForm] = useState(false);
    const [liveTestimonials, setLiveTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (showForm) return;
        let cancelled = false;
        setLoading(true);

        async function fetchFeedback() {
            try {
                const res = await fetch("/api/feedback");
                if (!res.ok) {
                    if (!cancelled) setLiveTestimonials([]);
                    return;
                }
                const data: ApiFeedbackItem[] = await res.json();
                if (!cancelled && Array.isArray(data)) {
                    const mapped: Testimonial[] = data.map((item) => {
                        const parsed = parseDaahqaadLink(item.daahqaad);
                        const subtitleParts = [parsed.handle, item.context?.trim()].filter(Boolean);
                        return {
                            id: item.id,
                            name: item.name,
                            username: subtitleParts.join(" · ") || undefined,
                            text: item.message,
                            social: parsed.url ?? undefined,
                        };
                    });
                    setLiveTestimonials(mapped);
                }
            } catch {
                if (!cancelled) setLiveTestimonials([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchFeedback();
        return () => {
            cancelled = true;
        };
    }, [showForm]);

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
                            <FeedbackForm onViewFeedback={() => setShowForm(false)} />
                        </div>
                    ) : (
                        <Testimonials
                            testimonials={liveTestimonials}
                            loading={loading}
                            title={t("feedback.title")}
                            description={t("feedback.subtitle")}
                            loadMoreLabel={t("feedback.loadMore")}
                            emptyTitle={t("feedback.emptyTitle")}
                            emptyDescription={t("feedback.emptySubtitle")}
                            emptyActionLabel={t("feedback.emptyCta")}
                            onEmptyAction={() => setShowForm(true)}
                            maxDisplayed={6}
                        />
                    )}

                </div>
            </main>
        </PageWrapper>
    );
}
