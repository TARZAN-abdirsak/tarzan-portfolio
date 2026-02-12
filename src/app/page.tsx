"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PixelPointHeader from "@/components/PixelPointHeader";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";

// Hero section - synchronous for LCP
import HeroSection from "@/sections/HeroSection";

// Lazy-load ALL below-fold sections for better FCP/LCP
const IntroOverlay = dynamic(() => import("@/components/IntroOverlay"), {
  ssr: false,
});
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
  const [showIntro, setShowIntro] = useState(false); // Start false to not block LCP
  const [isClient, setIsClient] = useState(false);

  // Check session storage on mount
  useEffect(() => {
    setIsClient(true);
    const hasShown = sessionStorage.getItem("intro_shown");
    if (!hasShown) {
      // Only show intro after hero has rendered (defer to not block LCP)
      const timer = setTimeout(() => {
        setShowIntro(true);
      }, 100); // Small delay to let hero paint first
      return () => clearTimeout(timer);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("intro_shown", "true");
  };

  return (
    <>
      {/* Intro deferred until after first paint */}
      {isClient && showIntro && (
        <IntroOverlay onComplete={handleIntroComplete} />
      )}

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
    </>
  );
}
