"use client";

import { useEffect, useState, useRef } from "react";
import PixelPointHeader from "@/components/PixelPointHeader";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

export default function PrivacyPage() {
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        const container = scrollContainerRef.current;
        if (element && container) {
            const offset = 32;
            const elementTop = element.offsetTop - container.offsetTop;
            container.scrollTo({
                top: elementTop - offset,
                behavior: "smooth",
            });
            setTimeout(() => setActiveSection(id), 100);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const sections = container.querySelectorAll("section[id]");
            const scrollPosition = container.scrollTop + 100;

            sections.forEach((section) => {
                const el = section as HTMLElement;
                const top = el.offsetTop - container.offsetTop;
                const height = el.offsetHeight;
                const id = section.getAttribute("id") || "";

                if (scrollPosition >= top && scrollPosition < top + height) {
                    setActiveSection(id);
                }
            });
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const tocItems: { id: string; labelKey: TranslationKey; num: number }[] = [
        { id: "intro", labelKey: "privacy.toc.1", num: 1 },
        { id: "data-collection", labelKey: "privacy.toc.2", num: 2 },
        { id: "data-usage", labelKey: "privacy.toc.3", num: 3 },
        { id: "security", labelKey: "privacy.toc.4", num: 4 },
        { id: "sharing", labelKey: "privacy.toc.5", num: 5 },
        { id: "rights", labelKey: "privacy.toc.6", num: 6 },
        { id: "consultation", labelKey: "privacy.toc.7", num: 7 },
        { id: "ai-disclaimer", labelKey: "privacy.toc.8", num: 8 },
        { id: "workflow", labelKey: "privacy.toc.9", num: 9 },
        { id: "scope", labelKey: "privacy.toc.10", num: 10 },
        { id: "delivery", labelKey: "privacy.toc.11", num: 11 },
        { id: "ip", labelKey: "privacy.toc.12", num: 12 },
        { id: "transfer", labelKey: "privacy.toc.13", num: 13 },
        { id: "maintenance", labelKey: "privacy.toc.14", num: 14 },
        { id: "liability", labelKey: "privacy.toc.15", num: 15 },
        { id: "confidentiality", labelKey: "privacy.toc.16", num: 16 },
        { id: "governing", labelKey: "privacy.toc.17", num: 17 },
        { id: "changes", labelKey: "privacy.toc.18", num: 18 },
        { id: "contact", labelKey: "privacy.toc.19", num: 19 },
    ];

    return (
        <div className="h-screen w-full overflow-hidden bg-[#f9f9f9] text-[#171717] font-sans flex flex-col">
            <PixelPointHeader />

            <div className="shrink-0 pt-24 pb-8 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="font-chonburi text-3xl md:text-4xl lg:text-5xl mb-3 tracking-normal">
                    {t("privacy.pageTitle")}
                </h1>
                <p className="font-poppins text-[#171717]/60 text-base font-medium">
                    {t("privacy.pageSubtitle")}
                </p>
                <p className="font-poppins text-xs mt-1 opacity-50 font-medium">
                    {t("privacy.lastUpdated")}
                </p>
            </div>

            <div className="flex-1 min-h-0 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <div
                        ref={scrollContainerRef}
                        className="lg:col-span-8 overflow-y-auto pr-4 pb-12 scrollbar-custom"
                    >
                        <div className="space-y-10">

                            <section id="intro">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s1.title")}</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    {t("privacy.s1.body")}
                                </p>
                            </section>

                            <section id="data-collection">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s2.title")}</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    {t("privacy.s2.intro")}
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s2.i1")}</li>
                                    <li>{t("privacy.s2.i2")}</li>
                                    <li>{t("privacy.s2.i3")}</li>
                                    <li>{t("privacy.s2.i4")}</li>
                                </ul>
                                <p className="leading-relaxed mt-2 text-sm italic opacity-60 font-sans">
                                    {t("privacy.s2.note")}
                                </p>
                            </section>

                            <section id="data-usage">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s3.title")}</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    {t("privacy.s3.intro")}
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s3.i1")}</li>
                                    <li>{t("privacy.s3.i2")}</li>
                                    <li>{t("privacy.s3.i3")}</li>
                                    <li>{t("privacy.s3.i4")}</li>
                                    <li>{t("privacy.s3.i5")}</li>
                                </ul>
                            </section>

                            <section id="security">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s4.title")}</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    {t("privacy.s4.intro")}
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s4.i1")}</li>
                                    <li>{t("privacy.s4.i2")}</li>
                                    <li>{t("privacy.s4.i3")}</li>
                                    <li>{t("privacy.s4.i4")}</li>
                                </ul>
                            </section>

                            <section id="sharing">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s5.title")}</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    {t("privacy.s5.intro")}
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s5.i1")}</li>
                                    <li>{t("privacy.s5.i2")}</li>
                                </ul>
                            </section>

                            <section id="rights">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s6.title")}</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    {t("privacy.s6.intro")}
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s6.i1")}</li>
                                    <li>{t("privacy.s6.i2")}</li>
                                    <li>{t("privacy.s6.i3")}</li>
                                </ul>
                            </section>

                            <div className="border-t border-black/10 pt-8" />

                            <section id="consultation">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s7.title")}</h3>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s7.i1")}</li>
                                    <li>{t("privacy.s7.i2")}</li>
                                </ul>
                            </section>

                            <section id="ai-disclaimer">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s8.title")}</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    {t("privacy.s8.intro")}
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s8.i1")}</li>
                                    <li>{t("privacy.s8.i2")}</li>
                                    <li>{t("privacy.s8.i3")}</li>
                                    <li>{t("privacy.s8.i4")}</li>
                                </ul>
                            </section>

                            <section id="workflow">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s9.title")}</h3>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s9.i1")}</li>
                                    <li>{t("privacy.s9.i2")}</li>
                                    <li>{t("privacy.s9.i3")}</li>
                                    <li>{t("privacy.s9.i4")}</li>
                                </ul>
                            </section>

                            <section id="scope">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s10.title")}</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    {t("privacy.s10.intro")}
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s10.i1")}</li>
                                    <li>{t("privacy.s10.i2")}</li>
                                </ul>
                            </section>

                            <section id="delivery">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s11.title")}</h3>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s11.i1")}</li>
                                    <li>{t("privacy.s11.i2")}</li>
                                </ul>
                            </section>

                            <section id="ip">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s12.title")}</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    {t("privacy.s12.body")}
                                </p>
                            </section>

                            <section id="transfer">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s13.title")}</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    {t("privacy.s13.intro")}
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s13.i1")}</li>
                                    <li>{t("privacy.s13.i2")}</li>
                                </ul>
                            </section>

                            <section id="maintenance">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s14.title")}</h3>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>{t("privacy.s14.i1")}</li>
                                    <li>{t("privacy.s14.i2")}</li>
                                </ul>
                            </section>

                            <section id="liability">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s15.title")}</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    {t("privacy.s15.body")}
                                </p>
                            </section>

                            <section id="confidentiality">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s16.title")}</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    {t("privacy.s16.body")}
                                </p>
                            </section>

                            <section id="governing">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s17.title")}</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    {t("privacy.s17.body")}
                                </p>
                            </section>

                            <section id="changes">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s18.title")}</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    {t("privacy.s18.body")}
                                </p>
                            </section>

                            <section id="contact">
                                <h3 className="font-poppins font-semibold text-lg mb-2">{t("privacy.s19.title")}</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    {t("privacy.s19.email")} abukarabdirsak@tarzan.software<br />
                                    {t("privacy.s19.web")} tarzan.software
                                </p>
                            </section>

                        </div>
                    </div>

                    {/* Table of Contents */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="pt-2">
                            <h4 className="font-poppins font-bold text-base mb-4 tracking-tight">
                                {t("privacy.toc")}
                            </h4>
                            <nav className="max-h-[65vh] overflow-y-auto scrollbar-custom pr-2">
                                <ol className="list-decimal list-inside space-y-2 text-[13.5px] font-poppins">
                                    {tocItems.map((item) => (
                                        <li key={item.id} className="leading-snug">
                                            <button
                                                onClick={() => scrollToSection(item.id)}
                                                className={`inline underline underline-offset-2 decoration-black/40 hover:decoration-black transition-all duration-150 text-left ${activeSection === item.id
                                                    ? "font-semibold decoration-black"
                                                    : "font-normal"
                                                    }`}
                                            >
                                                {t(item.labelKey)}
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                            <button
                                onClick={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                                className="mt-6 font-poppins font-semibold text-sm flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                            >
                                {t("privacy.backToTop")} <span className="text-base">↑</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
