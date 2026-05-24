"use client";

import PageWrapper from "@/components/PageWrapper";
import PixelPointHeader from "@/components/PixelPointHeader";
import FeedbackGrid from "@/components/FeedbackGrid";
import FeedbackForm from "@/components/FeedbackForm";
import { useCursor } from "@/context/CursorContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function FeedbackPage() {
    const { showClick, resetCursor } = useCursor();
    const { t } = useLanguage();
    const [showForm, setShowForm] = useState(false);

    return (
        <PageWrapper>
            <PixelPointHeader />
            <main className="w-full min-h-screen bg-[#f9f9f9] pt-32 pb-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1400px] mx-auto">

                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-4">
                            {t("feedback.title")}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            {t("feedback.subtitle")}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center mb-12">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            onMouseEnter={showClick}
                            onMouseLeave={resetCursor}
                            className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-lg"
                        >
                            {showForm ? t("feedback.viewBtn") : t("feedback.leaveBtn")}
                        </button>
                    </div>

                    {/* Content */}
                    {showForm ? (
                        <div className="max-w-xl mx-auto">
                            <FeedbackForm />
                        </div>
                    ) : (
                        <FeedbackGrid />
                    )}

                </div>
            </main>
        </PageWrapper>
    );
}
