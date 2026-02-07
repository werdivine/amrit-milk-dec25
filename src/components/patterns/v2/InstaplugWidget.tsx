"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { Instagram, ExternalLink } from "lucide-react";
import Script from "next/script";

const INSTAPLUG_CONTAINER_ID = "b7572c48-53c9-4ace-ae3c-32e92f1c8441";

export function InstaplugWidget() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer to detect when widget is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "200px" }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Load Instaplug script when visible - now handled by Script component
    useEffect(() => {
        if (!isVisible || isLoaded) return;

        // Check if script already exists (e.g. from previous navigation)
        if (typeof window !== "undefined" && (window as any).renderApp && document.getElementById("instaplug-script")) {
            try {
                (window as any).renderApp({
                    containerId: INSTAPLUG_CONTAINER_ID,
                    domain: "https://app.instaplug.app/",
                    widgetClass: "",
                    fontFamily: "",
                    color: "",
                    colorLink: "",
                    colorLinkActive: "",
                    colorLinkHover: "",
                });
                setIsLoaded(true);
            } catch (e) {
                console.error("Instaplug manual render failed:", e);
            }
        }
    }, [isVisible, isLoaded]);

    return (
        <Section className="bg-gradient-to-b from-white to-[#FDFBF7] dark:from-midnight-light to-midnight py-32 overflow-hidden">
            {/* Google Fonts - Loaded safely */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Comfortaa:wght@300..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Lexend:wght@100..900&family=Lobster&family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Oswald:wght@200..700&family=Pacifico&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" />

            <Script
                src="https://app.instaplug.app/platform/instaplug.js"
                strategy="lazyOnload"
                onLoad={() => {
                    try {
                        if (typeof window !== "undefined" && (window as any).renderApp) {
                            (window as any).renderApp({
                                containerId: INSTAPLUG_CONTAINER_ID,
                                domain: "https://app.instaplug.app/",
                                widgetClass: "",
                                fontFamily: "",
                                color: "",
                                colorLink: "",
                                colorLinkActive: "",
                                colorLinkHover: "",
                            });
                            setIsLoaded(true);
                        }
                    } catch (e) {
                        console.error("Instaplug render failed:", e);
                    }
                }}
            />

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold uppercase tracking-widest border border-pink-500/20 mb-6">
                            <Instagram className="w-3.5 h-3.5" />
                            @amritmilkorganic
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                            Life at <span className="text-pink-600 dark:text-pink-400">Amrit Farm</span>
                        </h2>
                        <p className="text-lg text-espresso/70 dark:text-ivory/70 leading-relaxed">
                            Experience the purity of farm-to-table living. Follow our journey of organic farming,
                            happy cows, and traditional rituals in the heart of Lucknow.
                        </p>
                    </div>
                    <div>
                        <a
                            href="https://www.instagram.com/amritmilkorganic"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-2xl hover:scale-105 transition-all shadow-xl hover:shadow-pink-500/25 font-bold whitespace-nowrap"
                        >
                            <Instagram className="w-5 h-5" />
                            Join 50k+ Followers
                            <ExternalLink className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Instaplug Container */}
                <div
                    ref={containerRef}
                    id={INSTAPLUG_CONTAINER_ID}
                    className="min-h-[400px] w-full"
                >
                    {!isLoaded && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                            {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-3xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center mt-20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-12 bg-espresso/10 dark:bg-ivory/10" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-espresso/40 dark:text-ivory/40">
                            Powered by Instaplug
                        </span>
                        <div className="h-px w-12 bg-espresso/10 dark:bg-ivory/10" />
                    </div>
                </div>
            </div>
        </Section>
    );
}
