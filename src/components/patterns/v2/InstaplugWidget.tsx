"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { Instagram, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const INSTAPLUG_CONTAINER_ID = "b7572c48-53c9-4ace-ae3c-32e92f1c8441";
const INSTAPLUG_SCRIPT_URL = "https://app.instaplug.app/platform/instaplug.js";

export function InstaplugWidget() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptInjectedRef = useRef(false);

    // Intersection Observer to detect when widget is in view (lazy loading per Instaplug guidelines)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.01, rootMargin: "400px" }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Following Instaplug's Next.js guidelines: Inject script dynamically when visible
    useEffect(() => {
        if (!isVisible || scriptInjectedRef.current) return;
        if (typeof window === "undefined") return;

        scriptInjectedRef.current = true;

        // Create and inject the script element with async attribute (per Instaplug guidelines)
        const script = document.createElement("script");
        script.src = INSTAPLUG_SCRIPT_URL;
        script.async = true;

        script.onload = () => {
            // Call renderApp exactly as specified in Instaplug's embed code
            if ((window as any).renderApp) {
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
                    console.error("Instaplug renderApp failed:", e);
                    setHasError(true);
                }
            } else {
                console.error("Instaplug: renderApp not found after script load");
                setHasError(true);
            }
        };

        script.onerror = () => {
            console.error("Instaplug: Failed to load script");
            setHasError(true);
        };

        // Append to body (bottom of body as per Instaplug guidelines)
        document.body.appendChild(script);

        // Cleanup on unmount
        return () => {
            // Don't remove the script as it may be needed if component re-mounts
        };
    }, [isVisible]);

    return (
        <Section className="bg-gradient-to-b from-white to-[#FDFBF7] dark:from-midnight-light to-midnight py-24 md:py-32 overflow-hidden">
            {/* Font Preconnects as specified by Instaplug */}
            {isVisible && (
                <>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                </>
            )}

            <div className="container mx-auto px-4" ref={containerRef}>
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

                {/* Instaplug Container - following the div trigger pattern from guidelines */}
                <div className="relative min-h-[400px]">
                    {/* Skeleton loader while waiting */}
                    {!isLoaded && !hasError && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 animate-pulse">
                            {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-3xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Error state */}
                    {hasError && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Instagram className="w-16 h-16 text-pink-500/30 mb-6" />
                            <p className="text-espresso/60 dark:text-ivory/60 mb-4">
                                Unable to load Instagram feed. Please visit our profile directly.
                            </p>
                            <a
                                href="https://www.instagram.com/amritmilkorganic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:text-pink-700 font-bold flex items-center gap-2"
                            >
                                View on Instagram <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    )}

                    {/* The container div that Instaplug will populate */}
                    <div
                        id={INSTAPLUG_CONTAINER_ID}
                        className={cn(
                            "w-full transition-opacity duration-1000",
                            isLoaded ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
                        )}
                    />
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
