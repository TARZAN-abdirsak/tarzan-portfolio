"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full bg-black text-white pt-20 pb-10 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto flex flex-col h-full">

                {/* Top Row: Large Text */}
                <div className="flex justify-between items-end mb-24 border-b border-white/20 pb-20">
                    <div className="relative">
                        <h2 className="text-[12vw] leading-[0.8] tracking-tighter font-bold">
                            {t("footer.next")}
                        </h2>
                    </div>
                    <h2 className="text-[12vw] leading-[0.8] tracking-tighter font-bold text-right">
                        {t("footer.work")}
                    </h2>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-32">

                    {/* Column 1: Menu & Policies */}
                    <div className="md:col-span-3 flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl mb-8 border-b border-white block w-full pb-2">{t("footer.menu")}</h3>
                            <ul className="space-y-2 text-lg text-gray-400">
                                <li>
                                    <Link href="/services" className="group relative overflow-hidden block" style={{ height: '1.5em', lineHeight: '1.5em' }}>
                                        <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full group-hover:text-white">{t("footer.menu.services")}</span>
                                        <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full text-white">{t("footer.menu.services")}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="group relative overflow-hidden block" style={{ height: '1.5em', lineHeight: '1.5em' }}>
                                        <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full group-hover:text-white">{t("footer.menu.about")}</span>
                                        <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full text-white">{t("footer.menu.about")}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/feedback" className="group relative overflow-hidden block" style={{ height: '1.5em', lineHeight: '1.5em' }}>
                                        <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full group-hover:text-white">{t("footer.menu.feedback")}</span>
                                        <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full text-white">{t("footer.menu.feedback")}</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12 md:mt-0">
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>
                                    <Link href="/privacy" className="group relative overflow-hidden block" style={{ height: '1.4em', lineHeight: '1.4em' }}>
                                        <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full group-hover:text-white">{t("footer.privacy")}</span>
                                        <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full text-white">{t("footer.privacy")}</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Social */}
                    <div className="md:col-span-3">
                        <h3 className="text-xl mb-8 border-b border-white block w-full pb-2">{t("footer.social")}</h3>
                        <ul className="space-y-2 text-lg text-gray-400">
                            <li>
                                <Link href="#" className="group relative overflow-hidden block" style={{ height: '1.5em', lineHeight: '1.5em' }}>
                                    <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full group-hover:text-white">Instagram</span>
                                    <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full text-white">Instagram</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="group relative overflow-hidden block" style={{ height: '1.5em', lineHeight: '1.5em' }}>
                                    <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full group-hover:text-white">(X) Twitter</span>
                                    <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full text-white">(X) Twitter</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.linkedin.com/in/abubakar-abdirsak-993010372" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden block" style={{ height: '1.5em', lineHeight: '1.5em' }}>
                                    <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full group-hover:text-white">LinkedIn</span>
                                    <span className="block transition-transform duration-[250ms] ease-out group-hover:-translate-y-full text-white">LinkedIn</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Newsletter (Spans 6) */}
                    <div className="md:col-span-6">
                        <h3 className="text-xl mb-8 border-b border-white block w-full pb-2">{t("footer.newsletter")}</h3>
                        <p className="mb-8 text-gray-400">{t("footer.newsletter.desc")}</p>

                        <form className="flex flex-col md:flex-row gap-4">
                            <input
                                type="email"
                                placeholder={t("footer.email.placeholder")}
                                suppressHydrationWarning
                                className="w-full bg-transparent border-b border-white/30 py-4 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
                            />
                            <button type="submit" suppressHydrationWarning className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
                                {t("footer.subscribe")}
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-end text-sm text-gray-500 pt-8 border-t border-white/10">
                    <button onClick={scrollToTop} suppressHydrationWarning className="font-bold text-white uppercase tracking-wider hover:opacity-70 transition-opacity mb-4 md:mb-0">
                        {t("footer.toTop")}
                    </button>

                    <div className="flex gap-8">
                        <span>{t("footer.location")}</span>
                        <span>{t("footer.copyright")}</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
