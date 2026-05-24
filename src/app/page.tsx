"use client";

import dynamic from "next/dynamic";
import PixelPointHeader from "@/components/PixelPointHeader";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";

// Hero section - synchronous for LCP
import HeroSection from "@/sections/HeroSection";

// Lazy-load ALL below-fold sections for better FCP/LCP
const VideoScrollSection = dynamic(() => import("@/sections/VideoScrollSection"), {
  ssr: false,
  loading: () => <div className="h-[100dvh]" />,
});
const DraggableSvgSection = dynamic(() => import("@/sections/DraggableSvgSection"), {
  ssr: false,
  loading: () => <div className="h-[100dvh]" />,
});
const HorizontalScrollSection = dynamic(() => import("@/sections/HorizontalScrollSection"), {
  ssr: false,
  loading: () => <div className="h-[100dvh]" />,
});
const BusinessSystemsAndAiSection = dynamic(() => import("@/sections/BusinessSystemsAndAiSection"), {
  ssr: false,
  loading: () => <div className="h-[100vh]" />,
});
const AiIntegrationSection = dynamic(() => import("@/sections/AiIntegrationSection"), {
  ssr: false,
  loading: () => <div className="h-[100dvh]" />,
});
const CtaSection = dynamic(() => import("@/sections/CtaSection"), {
  ssr: false,
});
const FeatureSection = dynamic(() => import("@/sections/FeatureSection"), {
  ssr: false,
});

export default function Home() {
  return (
    <PageWrapper>
      <PixelPointHeader />

      {/* Hero renders immediately for LCP */}
      <HeroSection />

      {/* Stable trigger for PageWrapper background animation */}
      <div id="bg-trigger-video" className="w-full relative">
        <VideoScrollSection />
      </div>

      {/* Below-fold sections lazy-loaded */}
      <DraggableSvgSection />
      <HorizontalScrollSection />
      <BusinessSystemsAndAiSection />
      <AiIntegrationSection />
      <CtaSection />
      <FeatureSection />

      <Footer />
    </PageWrapper>
  );
}
