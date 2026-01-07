"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export function MissionBridge() {
    return (
        <Section className="bg-terracotta dark:bg-gold py-16 text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h3 className="text-2xl md:text-3xl font-serif text-white dark:text-espresso font-bold mb-6 italic leading-relaxed">
                    "We don't just say it. We live it.<br/>
                    Every single day, before the sun rises."
                </h3>
                <Button 
                    variant="outline" 
                    href="/the-farm"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-terracotta dark:border-espresso dark:text-espresso dark:hover:bg-espresso dark:hover:text-gold transition-all duration-300 px-8 py-6 text-lg"
                >
                    Witness Our Discipline
                </Button>
            </div>
        </Section>
    );
}
