'use client';

import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import scrollDownAnimation from '@/public/scroll-down.json';
import { jetbrainsMono } from '@/app/font';
import Image from 'next/image';
import SixImg from "@/public/Six.jpg";
import SixImg2 from "@/public/Six2.jpg";
import { MapPin, Sparkles, Eye, Download } from 'lucide-react';
import Socials from '../Socials';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { useLanguage } from '@/lib/language';
import CVModal from '../CVModal';

function TypingHeadline({ phrases }: { phrases: string[] }) {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex % phrases.length] || phrases[0];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                const nextText = currentPhrase.slice(0, text.length + 1);
                setText(nextText);

                if (nextText === currentPhrase) {
                    setTimeout(() => setIsDeleting(true), 1400);
                }
            } else {
                const nextText = currentPhrase.slice(0, text.length - 1);
                setText(nextText);

                if (nextText === '') {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, phraseIndex, phrases]);

    return (
        <span className="tailwind-wrapper mt-3 text-lg sm:text-3xl font-medium block text-left text-zinc-800 dark:text-zinc-200">
            {text}
            <span className="inline-block w-[2px] h-[1em] align-middle bg-current animate-pulse ml-1" />
        </span>
    );
}

export function Home() {
    const [isHovered, setIsHovered] = useState(false);
    const [isCVModalOpen, setIsCVModalOpen] = useState(false);
    const { t } = useLanguage();

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'DangVanQuyen_Full-StackDeveloper.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div id='home' className="w-full max-w-4xl flex flex-col items-center justify-center px-6 pt-24 pb-32 sm:min-h-screen relative">
            <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-10 sm:gap-12 w-full max-w-5xl">
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                            {t.home.greeting} <span className='text-[#e8390d]'>Six</span>
                        </h1>
                        <span
                            className="text-4xl sm:text-5xl select-none"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{
                                transformOrigin: '70% 70%',
                                animation: isHovered ? 'wave 1.2s ease-in-out infinite' : 'none',
                                display: 'inline-block',
                            }}
                        >
                            👋
                        </span>
                    </div>

                    <p className={`${jetbrainsMono.className} flex items-center mt-3 text-[#dd431d] gap-2 text-sm sm:text-base`}>
                        <MapPin size={16} /> {t.home.location}
                    </p>

                    <TypingHeadline phrases={t.home.roles} />

                    {/* Action Buttons & Socials */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 mt-5">
                        <button
                            onClick={() => setIsCVModalOpen(true)}
                            className="group flex h-10 items-center justify-center gap-2 rounded-full border border-border/80 bg-background/80 px-5 py-2 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:border-[#e8390d]/60 hover:text-[#e8390d] hover:bg-[#e8390d]/5 hover:shadow-md active:scale-95 cursor-pointer shadow-sm"
                        >
                            <Eye size={16} className="text-[#e8390d] transition-transform duration-300 group-hover:scale-110" />
                            <span>{t.home.viewCV}</span>
                        </button>

                        <InteractiveHoverButton onClick={handleDownload} text={t.home.downloadCV} />

                        <div className="hidden sm:block h-6 w-px bg-border/60 mx-1" />

                        <Socials />
                    </div>
                </div>

                {/* Image Section */}
                <div
                    className="w-48 h-48 sm:w-64 sm:h-64 relative shrink-0 rounded-full overflow-hidden transition-all duration-500 ring-4 ring-border/50 hover:ring-[#e8390d]/40 shadow-2xl"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Base image */}
                    <Image
                        src={SixImg}
                        alt="Six Developer"
                        fill
                        priority
                        className={`object-cover rounded-full transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"
                            }`}
                    />

                    {/* Hover image */}
                    <Image
                        src={SixImg2}
                        alt="Six Developer portrait"
                        fill
                        className={`object-cover rounded-full absolute top-0 left-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                            }`}
                    />
                </div>

            </div>

            {/* Scroll Down Animation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 z-10 hidden md:block">
                <Lottie animationData={scrollDownAnimation} loop />
            </div>

            {/* CV Preview Modal */}
            <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
        </div>
    );
}
