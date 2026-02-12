"use client";

import PageWrapper from "@/components/PageWrapper";
import PixelPointHeader from "@/components/PixelPointHeader";
import AboutMeSection from "@/sections/AboutMeSection";

export default function AboutPage() {
    return (
        <PageWrapper>
            <PixelPointHeader />
            <main className="w-full h-screen overflow-hidden bg-[#f9f9f9] flex flex-col pt-24">
                <AboutMeSection />
            </main>
        </PageWrapper>
    );
}
