"use client";

import PageWrapper from "@/components/PageWrapper";
import PixelPointHeader from "@/components/PixelPointHeader";
import ServicesSection from "@/sections/ServicesSection";

export default function ServicesPage() {
    return (
        <PageWrapper>
            <PixelPointHeader />
            <main className="w-full h-[100dvh] overflow-hidden bg-[#f9f9f9] flex flex-col pt-24">
                <ServicesSection />
            </main>
            {/* Footer removed to ensure 100vh no-scroll layout */}
        </PageWrapper>
    );
}
