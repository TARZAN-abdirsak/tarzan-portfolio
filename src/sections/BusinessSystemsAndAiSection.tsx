"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import profileImg from '@/assets/images/profile.jpg';
import womanImg from '@/assets/images/trainer_woman.png';
import yaxyeImg from '@/assets/images/yaxye .jpeg';

export default function BusinessSystemsAndAiSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const visualsRef = useRef<HTMLDivElement>(null);

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleConsultation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || isSubmitting) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Free Consultation Request',
                    email: email.trim(),
                    conversation: [{ role: 'user', content: 'Requested free consultation from Business section.' }],
                }),
            });

            if (res.ok) {
                setSubmitStatus('success');
                setEmail('');
                setTimeout(() => setSubmitStatus('idle'), 4000);
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus('idle'), 3000);
            }
        } catch {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const splitText = (text: string) => {
        return text.split(" ").map((word, i) => (
            <span key={i} className="text-word inline-block mr-[0.25em]">
                {word}
            </span>
        ));
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // 1. Text Content: Typewriter Effect (Word by Word)
            const words = contentRef.current?.querySelectorAll('.text-word');
            const otherElements = contentRef.current?.querySelectorAll('.consultation-form, .social-proof-container');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                }
            });

            if (words && words.length > 0) {
                tl.from(words, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    stagger: 0.02,
                    ease: "power2.out",
                });
            }

            if (otherElements && otherElements.length > 0) {
                tl.from(otherElements,
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                    },
                    "-=0.2"
                );
            }

            // 2. Visual Cards: Back to Front
            const cards = visualsRef.current?.querySelectorAll('.visual-card:not(.visual-card-brief)');
            if (cards) {
                gsap.fromTo(cards,
                    { scale: 0.5, opacity: 0, y: 50 },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        rotate: (i: number) => i === 0 ? -6 : 6,
                        duration: 1.4,
                        stagger: 0.2,
                        ease: "back.out(1.4)",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 50%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            }

            // 3. Project Brief Card: Smooth 3D Fabric Unroll
            const briefCard = visualsRef.current?.querySelector('.project-brief-container');
            if (briefCard) {
                gsap.set(briefCard, {
                    transformOrigin: "top center",
                    transformPerspective: 800,
                });
                gsap.fromTo(briefCard,
                    { scaleY: 0, rotateX: -50, opacity: 0 },
                    {
                        scaleY: 1,
                        rotateX: 0,
                        opacity: 1,
                        duration: 1.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 45%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen bg-[#f9f9f9] text-black pt-12 md:pt-24 pb-24 md:pb-32 overflow-hidden relative flex flex-col"
        >
            <div className="container mx-auto px-6 md:px-12 max-w-[95%] xl:max-w-[90rem] flex-grow flex flex-col md:flex-row items-stretch gap-16 md:gap-24">

                {/* LEFT: Text Content */}
                <div ref={contentRef} className="w-full md:w-1/2 flex flex-col items-start z-10 h-full justify-between py-8 md:py-0">

                    {/* Top Group: Heading, Text, CTA */}
                    <div className="flex flex-col items-start w-full">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-8 flex flex-wrap">
                            {splitText("you are not")}
                            <span className="relative inline-block px-3 py-1 bg-[#32CD32] text-black transform rounded ml-2 text-word">Alone</span>
                        </h2>

                        <div className="space-y-6 max-w-lg text-lg text-neutral-600 font-medium leading-relaxed">
                            <p>
                                {splitText("Not sure what to build yet? That's okay. We analyze your idea, your market, and your goals, then recommend the right system structure scalable, practical, and designed for growth. No pressure. No upfront cost. Just clarity.")}
                            </p>
                            <p>
                                {splitText("Beyond code, we integrate AI to automate your workflows, analyze data, and create smarter customer experiences.")}
                            </p>
                        </div>

                        {/* Email Consultation Form */}
                        <form onSubmit={handleConsultation} className="consultation-form mt-10 w-full max-w-md">
                            <div className="flex items-center gap-2 bg-white rounded-full shadow-lg border border-neutral-200 p-1.5 pl-5 transition-all duration-300 focus-within:shadow-xl focus-within:border-neutral-300">
                                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                    className="flex-1 bg-transparent text-sm md:text-base text-neutral-800 placeholder:text-neutral-400 border-none outline-none focus:ring-0 py-2 disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !email.trim()}
                                    className="group flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full transition-all duration-300 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                                >
                                    {isSubmitting ? (
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                    ) : (
                                        <>
                                            <span className="text-sm font-bold tracking-tight hidden sm:inline">Free Consultation</span>
                                            <span className="text-sm font-bold tracking-tight sm:hidden">Send</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>

                            {submitStatus === 'success' && (
                                <p className="mt-3 text-sm text-green-600 font-medium flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    We&apos;ll be in touch soon!
                                </p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="mt-3 text-sm text-red-500 font-medium flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                    </svg>
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Bottom Group: Social Proof */}
                    <div className="social-proof-container w-full flex items-center gap-4 mt-8 md:mt-auto pt-4 md:pt-32 pb-8 md:pb-0">
                        <div className="flex -space-x-3">
                            <div className="flex -space-x-3">
                                {[profileImg, womanImg, yaxyeImg].map((img, i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden relative">
                                        <Image
                                            src={img}
                                            alt={`User ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-sm font-medium text-neutral-500">
                            <span className="font-bold text-black text-base">You team is here?</span> <br />
                            Real people. Real guidance. Real solutions.
                        </div>
                    </div>
                </div>


                {/* RIGHT: Visuals (Floating Cards) */}
                <div ref={visualsRef} className="w-full md:w-1/2 relative h-[400px] md:h-[600px] flex items-center justify-center -mt-16 md:mt-0">

                    {/* Card 1 (Left / Back) */}
                    <div className="visual-card absolute -top-12 md:-top-8 left-4 md:left-12 w-[160px] md:w-[200px] aspect-[3/4] rounded-2xl shadow-2xl overflow-visible border border-white/50 z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-500 hover:z-30 origin-bottom-right">
                        <div className="w-full h-full overflow-hidden rounded-2xl relative bg-neutral-900">
                            <Image
                                src="/images/teamwork.jpg"
                                alt="System Dashboard"
                                fill
                                sizes="(max-width: 768px) 160px, 200px"
                                className="object-cover opacity-90"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <p className="text-white text-xs font-medium">System Architecture</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 (Right / Front) */}
                    <div className="visual-card absolute -top-2 md:top-4 left-28 md:left-44 w-[160px] md:w-[200px] aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden z-20 transform rotate-6 hover:rotate-0 transition-transform duration-500 hover:z-30 origin-bottom-left">
                        <Image
                            src="/images/idea.jpg"
                            alt="App Interface"
                            fill
                            sizes="(max-width: 768px) 160px, 200px"
                            className="object-cover"
                        />
                    </div>


                    {/* Visual 2: AI Interaction Card (Bottom) */}
                    <div className="project-brief-container absolute -bottom-24 right-4 md:-right-4 w-full max-w-[320px] z-20 transition-transform hover:-translate-y-2 duration-300">
                        {/* Floating Avatar */}
                        <div className="absolute top-1 -left-13 z-30 w-12 h-12 rounded-full border-[3px] border-[#f9f9f9] overflow-hidden shadow-lg bg-black">
                            <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-black flex items-center justify-center text-white text-xs">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                        </div>

                        {/* Main Card */}
                        <div className="visual-card visual-card-brief bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-5 border border-neutral-100/50">
                            <div className="mb-3">
                                <h4 className="font-bold text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Project Brief</h4>
                                <div className="space-y-2 text-xs leading-relaxed text-neutral-800 font-medium font-sans">
                                    <p>
                                        I&apos;m working on a business idea and I want to build a proper system around it.Right now,<br /> I&apos;m looking for help designing and developing a solution that fits my needs...
                                    </p>
                                    <p className="text-neutral-500 text-[10px]">
                                        The goal is to create a system that supports my business operations and helps me grow. I&apos;m open to guidance on the best structure...
                                    </p>
                                    <p className="text-[10px] text-neutral-300 mt-2 pt-2 border-t border-neutral-100">
                                        This is an example project brief.Your submission will be reviewed by our team of designers, developers, and AI specialists.
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-2">
                                <input
                                    type="text"
                                    placeholder="Write your idea here"
                                    className="w-full bg-transparent text-sm border-none p-0 focus:ring-0 placeholder:text-neutral-300 text-neutral-800 font-medium cursor-not-allowed opacity-50"
                                    disabled
                                />
                                <button className="absolute right-0 bottom-0 top-0 my-auto h-8 w-8 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
