"use client";

import { Section } from "@/components/ui/section";
import Script from "next/script";

export function ElfsightInstagram() {
    return (
        <Section className="bg-[#FDFBF7] dark:bg-midnight py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold uppercase tracking-widest border border-pink-500/20 mb-6">
                        @amritmilkorganic
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                        Life at Amrit Farm
                    </h2>
                </div>

                {/* Elfsight Widget */}
                <div className="elfsight-app-edd5e5f9-b6eb-426b-a2a2-86fc29afb142" data-elfsight-app-lazy></div>

                <Script
                    src="https://elfsightcdn.com/platform.js"
                    strategy="lazyOnload"
                />
            </div>
        </Section>
    );
}
