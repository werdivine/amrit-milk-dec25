"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { Instagram, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const FOUITA_WIDGET_ID = "ft6pvb87w";
const FOUITA_SCRIPT_URL = "https://wdg.fouita.com/widgets/0x3cc1c6.js";

export function FouitaInstagramWidget() {
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptInjectedRef = useRef(false);

    // Load Fouita widget script immediately
    useEffect(() => {
        if (scriptInjectedRef.current) return;
        if (typeof window === "undefined") return;

        scriptInjectedRef.current = true;

        // Inject script
        const script = document.createElement("script");
        script.src = FOUITA_SCRIPT_URL;
        script.async = true;
        script.onload = () => {
            setIsLoaded(true);
        };
        script.onerror = () => {
            console.error("Fouita widget script load failed");
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <Section className="bg-gradient-to-b from-white to-[#FDFBF7] dark:from-midnight-light to-midnight py-24 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4" ref={containerRef}>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold uppercase tracking-widest border border-pink-500/20 mb-6">
                            <Instagram className="w-3.5 h-3.5" />
                            @amritmilkorganic
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                            Life at{" "}
                            <span className="text-pink-600 dark:text-pink-400">Amrit Farm</span>
                        </h2>
                        <p className="text-lg text-espresso/70 dark:text-ivory/70 leading-relaxed">
                            Experience the purity of farm-to-table living. Follow our journey of
                            organic farming, happy cows, and traditional rituals in the heart of
                            Lucknow.
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

                <div className="relative min-h-[600px] w-full">
                    {/* Skeleton while loading */}
                    {!isLoaded && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 animate-pulse">
                            {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-3xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Fouita Widget Container */}
                    <div
                        data-key="Amritmilk on Instagram"
                        className={cn(
                            "ft w-full transition-opacity duration-700",
                            isLoaded
                                ? "opacity-100"
                                : "opacity-0 absolute inset-0 pointer-events-none"
                        )}
                        id={FOUITA_WIDGET_ID}
                        style={{ minHeight: "600px" }}
                    />
                </div>

                <div className="flex flex-col items-center mt-20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px w-12 bg-espresso/10 dark:bg-ivory/10" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-espresso/40 dark:text-ivory/40">
                            Powered by Fouita
                        </span>
                        <div className="h-px w-12 bg-espresso/10 dark:bg-ivory/10" />
                    </div>
                </div>
            </div>
        </Section>
    );
}
