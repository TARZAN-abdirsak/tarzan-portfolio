"use client";

import PageWrapper from "@/components/PageWrapper";
import PixelPointHeader from "@/components/PixelPointHeader";
import AboutMeSection from "@/sections/AboutMeSection";

export default function AboutPage() {
    return (
        <PageWrapper>
            <PixelPointHeader />
            <main className="w-full min-h-screen overflow-x-clip bg-[#f9f9f9] flex flex-col pt-20 md:pt-24">
                <AboutMeSection />
            </main>
        </PageWrapper>
    );
}
