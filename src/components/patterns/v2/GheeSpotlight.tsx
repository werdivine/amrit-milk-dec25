import { Section } from "@/components/ui/section";
import { ArrowRight, PlayCircle, ScrollText, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GheeSpotlightProps {
    variant?: "home" | "page";
}

export const GheeSpotlight = ({ variant = "home" }: GheeSpotlightProps) => {
    return (
        <Section className="relative py-32 md:py-48 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/img/generated/amrit_ghee_cinematic_hero.png"
                    alt="Amrit Bilona Ghee Cinematic"
                    fill
                    className="object-cover object-center"
                    quality={90}
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 backdrop-blur-md border border-gold/30 rounded-full text-gold text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
                        <Sparkles className="w-3 h-3" /> The Golden Standard
                    </div>

                    <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">
                        A Legacy <br />
                        <span className="text-gold italic">Bottled.</span>
                    </h2>

                    <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl drop-shadow-md">
                        Experience the divine aroma and healing properties of authentic Bilona Ghee.
                        Wood-fired, hand-churned, and rooted in Vedic tradition.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/products/a2-cow-ghee-1kg"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-dark text-espresso font-bold rounded-full shadow-lg hover:shadow-gold/20 transition-all transform hover:-translate-y-1"
                        >
                            Shop the Legacy <ArrowRight className="w-5 h-5" />
                        </Link>

                        {variant === "home" ? (
                            <Link
                                href="/ghee"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold rounded-full transition-all group"
                            >
                                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />{" "}
                                Watch the Process
                            </Link>
                        ) : (
                            <a
                                href="#reviews"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold rounded-full transition-all"
                            >
                                <ScrollText className="w-5 h-5" /> Read Reviews
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
};
