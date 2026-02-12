"use client";

import { useEffect, useState, useRef } from "react";
import PixelPointHeader from "@/components/PixelPointHeader";

export default function PrivacyPage() {
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

    const tocItems = [
        { id: "intro", label: "1. Introduction" },
        { id: "data-collection", label: "2. Information We Collect" },
        { id: "data-usage", label: "3. How We Use Information" },
        { id: "security", label: "4. Security & Data Retention" },
        { id: "sharing", label: "5. Data Sharing" },
        { id: "rights", label: "6. Client Rights" },
        { id: "consultation", label: "7. Free Consultation" },
        { id: "ai-disclaimer", label: "8. AI Disclaimer" },
        { id: "workflow", label: "9. Project Workflow" },
        { id: "scope", label: "10. Features & Scope" },
        { id: "delivery", label: "11. Testing & Delivery" },
        { id: "ip", label: "12. Intellectual Property" },
        { id: "transfer", label: "13. Transfer & Liability" },
        { id: "maintenance", label: "14. Maintenance & Updates" },
        { id: "liability", label: "15. Limitation of Liability" },
        { id: "confidentiality", label: "16. Confidentiality" },
        { id: "governing", label: "17. Governing Law" },
        { id: "changes", label: "18. Changes" },
        { id: "contact", label: "19. Contact" },
    ];

    return (
        <div className="h-screen w-full overflow-hidden bg-[#f9f9f9] text-[#171717] font-sans flex flex-col">
            {/* Header - Fixed at top, no scroll animation */}
            <PixelPointHeader />

            {/* Title Section - Static, always visible */}
            <div className="shrink-0 pt-24 pb-8 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="font-chonburi text-3xl md:text-4xl lg:text-5xl mb-3 tracking-normal">
                    Privacy Policy & Terms
                </h1>
                <p className="font-poppins text-[#171717]/60 text-base font-medium">
                    Software & AI Solutions
                </p>
                <p className="font-poppins text-xs mt-1 opacity-50 font-medium">
                    Last Updated: February 2026
                </p>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 min-h-0 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Scrollable Text */}
                    <div
                        ref={scrollContainerRef}
                        className="lg:col-span-8 overflow-y-auto pr-4 pb-12 scrollbar-custom"
                    >
                        <div className="space-y-10">

                            <section id="intro">
                                <h3 className="font-poppins font-semibold text-lg mb-2">1. Introduction</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    Our company is a Portfolio Software & AI Specialist Company with a team of developers,
                                    account designers, system thinkers, and AI assistance. We are fully committed to protecting
                                    the privacy and data of our clients.
                                </p>
                            </section>

                            <section id="data-collection">
                                <h3 className="font-poppins font-semibold text-lg mb-2">2. Information We Collect</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    When a client requests a free consultation or contacts us, we collect:
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>Name</li>
                                    <li>Email</li>
                                    <li>Project idea or details</li>
                                    <li>Any information voluntarily submitted by the client</li>
                                </ul>
                                <p className="leading-relaxed mt-2 text-sm italic opacity-60 font-sans">
                                    This data is first processed by our AI assistance, then securely transmitted to company management.
                                </p>
                            </section>

                            <section id="data-usage">
                                <h3 className="font-poppins font-semibold text-lg mb-2">3. How We Use Information</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    Client data is used for:
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>Analyzing project ideas</li>
                                    <li>Providing free consultations</li>
                                    <li>Preparing blueprints / general overviews</li>
                                    <li>Contacting the client within 24 hours</li>
                                    <li>Project planning and scheduling</li>
                                </ul>
                            </section>

                            <section id="security">
                                <h3 className="font-poppins font-semibold text-lg mb-2">4. Security & Data Retention</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    We use secure methods to protect client data:
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>Access control measures</li>
                                    <li>Secure storage systems</li>
                                    <li>Data is not used for purposes outside the agreement</li>
                                    <li>Data is retained only as long as necessary</li>
                                </ul>
                            </section>

                            <section id="sharing">
                                <h3 className="font-poppins font-semibold text-lg mb-2">5. Data Sharing</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    We do not sell or share client data with third parties, except for:
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>Legal requirements</li>
                                    <li>Technical services necessary for company operations</li>
                                </ul>
                            </section>

                            <section id="rights">
                                <h3 className="font-poppins font-semibold text-lg mb-2">6. Client Rights</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    Clients have the right to:
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>Access their data</li>
                                    <li>Request data deletion</li>
                                    <li>Opt-out of future communications</li>
                                </ul>
                            </section>

                            {/* Divider between Privacy and Terms */}
                            <div className="border-t border-black/10 pt-8" />

                            <section id="consultation">
                                <h3 className="font-poppins font-semibold text-lg mb-2">7. Free Consultation</h3>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>The company provides free consultations.</li>
                                    <li>Advice and insights provided are conceptual and do not guarantee business results.</li>
                                </ul>
                            </section>

                            <section id="ai-disclaimer">
                                <h3 className="font-poppins font-semibold text-lg mb-2">8. AI Assistance Disclaimer</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    Our AI assistance helps with:
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>Data collection</li>
                                    <li>Idea analysis</li>
                                    <li>Final decisions are made by the company team.</li>
                                    <li>AI is not a substitute for human judgment.</li>
                                </ul>
                            </section>

                            <section id="workflow">
                                <h3 className="font-poppins font-semibold text-lg mb-2">9. Project Workflow</h3>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>Clients will be contacted within 24 hours.</li>
                                    <li>After agreement, a Blueprint or general overview is prepared.</li>
                                    <li>Project timelines are mutually decided by the Developer and Client.</li>
                                    <li>Consultations cannot exceed 1 hour.</li>
                                </ul>
                            </section>

                            <section id="scope">
                                <h3 className="font-poppins font-semibold text-lg mb-2">10. Features & Scope</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    During development:
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>New features cannot be added mid-development.</li>
                                    <li>The Client must clarify beforehand if the project is Version 1 (V1) or a final release with no further development.</li>
                                </ul>
                            </section>

                            <section id="delivery">
                                <h3 className="font-poppins font-semibold text-lg mb-2">11. Testing & Delivery</h3>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>Once features are completed, the project undergoes testing.</li>
                                    <li>Afterwards, it is released, and the system or product is transferred.</li>
                                </ul>
                            </section>

                            <section id="ip">
                                <h3 className="font-poppins font-semibold text-lg mb-2">12. Intellectual Property</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    Blueprints, concepts, and advice provided remain the intellectual property of the company until a formal agreement is signed or payment is made.
                                </p>
                            </section>

                            <section id="transfer">
                                <h3 className="font-poppins font-semibold text-lg mb-2">13. Transfer & Liability</h3>
                                <p className="leading-relaxed mb-2 opacity-90 font-sans text-[15px]">
                                    Upon transfer of the system or product:
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>Full responsibility shifts to the Client.</li>
                                    <li>The Company is not responsible for future usage or decisions made by the Client.</li>
                                </ul>
                            </section>

                            <section id="maintenance">
                                <h3 className="font-poppins font-semibold text-lg mb-2">14. Maintenance & Updates</h3>
                                <ul className="list-disc pl-5 space-y-1.5 opacity-90 font-sans text-[15px]">
                                    <li>If the Client pays a maintenance fee: Bugs will be fixed, and updates can be made.</li>
                                    <li>If no maintenance fee is paid: The Company is not responsible for future issues.</li>
                                </ul>
                            </section>

                            <section id="liability">
                                <h3 className="font-poppins font-semibold text-lg mb-2">15. Limitation of Liability</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    The Company is not liable for business losses, lost profits, or decisions the Client bases on our advice or blueprints.
                                </p>
                            </section>

                            <section id="confidentiality">
                                <h3 className="font-poppins font-semibold text-lg mb-2">16. Confidentiality</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    All client data and ideas are confidential and will not be used for purposes outside the project.
                                </p>
                            </section>

                            <section id="governing">
                                <h3 className="font-poppins font-semibold text-lg mb-2">17. Governing Law</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    This document is governed by the laws of the country.
                                </p>
                            </section>

                            <section id="changes">
                                <h3 className="font-poppins font-semibold text-lg mb-2">18. Changes</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    The Company reserves the right to modify the Privacy Policy & Terms at any time.
                                </p>
                            </section>

                            <section id="contact">
                                <h3 className="font-poppins font-semibold text-lg mb-2">19. Contact</h3>
                                <p className="leading-relaxed opacity-90 font-sans text-[15px]">
                                    Email: abukarabdirsak@tarzan.software<br />
                                    Website: tarzan.software
                                </p>
                            </section>

                        </div>
                    </div>

                    {/* Table of Contents - Clean sidebar */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="pt-2">
                            <h4 className="font-poppins font-bold text-base mb-4 tracking-tight">
                                Table of contents
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
                                                {item.label.replace(/^\d+\.\s*/, "")}
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                            <button
                                onClick={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                                className="mt-6 font-poppins font-semibold text-sm flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                            >
                                Back to top <span className="text-base">↑</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
