"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export function OurMission() {
    return (
        <Section className="bg-creme dark:bg-midnight py-24 relative overflow-hidden text-center">
            <div className="container mx-auto px-6 max-w-4xl">
                <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.2em] text-sm mb-6 block">
                    NOT A BRAND, A MOVEMENT
                </span>
                
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory mb-8 leading-tight">
                    Food You Can Trust, Every Day
                </h2>

                <div className="space-y-8 text-lg md:text-xl text-espresso-light dark:text-ivory/80 leading-relaxed font-light">
                    <p>
                        At Amrit Milk Organic, our mission is simple: 
                        to make clean, honest food available to families on a daily basis, without noise, exaggeration, or shortcuts.
                    </p>
                    <p>
                        We believe good food should nourish, not confuse. 
                        It should come from practices that respect the land, the animals, and the people involved — not just efficiency or scale.
                    </p>
                    <p>
                        Our work begins locally, with our own farms, cows, and communities. 
                        From there, we apply discipline, learning, and responsibility so that what we build can stand anywhere — without losing its roots.
                    </p>
                    <p>
                        We don’t chase trends. 
                        We focus on consistency, transparency, and food that families can consume with confidence, every single day.
                    </p>
                    <p className="font-medium text-espresso dark:text-ivory pt-4">
                        Amrit Milk Organic is not about being the biggest. 
                        It is about being reliable, responsible, and real.
                    </p>
                </div>

                <div className="mt-12 flex justify-center gap-4">
                    <Button size="lg" href="/products" className="px-8 py-6 text-lg">
                        Explore Our Products
                    </Button>
                    <Button size="lg" href="/the-farm" variant="outline" className="px-8 py-6 text-lg">
                        Know Our Process
                    </Button>
                </div>
            </div>
        </Section>
    );
}
