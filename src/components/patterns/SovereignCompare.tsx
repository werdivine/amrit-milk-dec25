import { Section } from "@/components/ui/section";
import { X, Check } from "lucide-react";

export function SovereignCompare() {
    return (
        <Section className="bg-creme-light/50 dark:bg-midnight-mid/50 transition-colors duration-300">
            <div className="text-center mb-12">
                <span className="text-terracotta dark:text-gold font-bold uppercase tracking-widest text-xs transition-colors duration-300">The Reality Check</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 text-espresso dark:text-ivory transition-colors duration-300">Know What You Drink</h2>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[800px] bg-white/50 dark:bg-glass-bg border border-espresso/5 dark:border-glass-border rounded-3xl p-8 backdrop-blur-xl transition-colors duration-300">
                    <div className="grid grid-cols-4 gap-4 mb-4 border-b border-espresso/10 dark:border-white/10 pb-4 text-center font-bold text-sm uppercase tracking-wider transition-colors duration-300">
                        <div className="text-left pl-4 text-espresso dark:text-ivory transition-colors duration-300">Parameter</div>
                        <div className="text-espresso/40 dark:text-ivory/40 transition-colors duration-300">Packet Milk</div>
                        <div className="text-espresso/60 dark:text-ivory/60 transition-colors duration-300">Organic Brand</div>
                        <div className="text-terracotta dark:text-gold transition-colors duration-300">Amrit Sovereign</div>
                    </div>

                    {[
                        { param: "Cow Breed", p1: "Mixed/Buffalo", p2: "Sahiwal/Gir Mix", p3: "100% Pure Gir" },
                        { param: "Processing", p1: "Pasteurized/UHT", p2: "Pasteurized", p3: "Raw, Chilled" },
                        { param: "Packaging", p1: "Plastic Pouch", p2: "Plastic Bottle", p3: "Sterilized Glass" },
                        { param: "Shelf Life", p1: "2-90 Days", p2: "3-5 Days", p3: "2 Days (Living)" },
                        { param: "Cream", p1: "Extracted", p2: "Standardized", p3: "Full Cream (Vedic)" },
                    ].map((row, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 py-6 border-b border-espresso/5 dark:border-white/5 text-center items-center hover:bg-espresso/5 dark:hover:bg-white/5 rounded-lg transition-colors duration-300">
                            <div className="text-left pl-4 font-bold text-espresso dark:text-ivory transition-colors duration-300">{row.param}</div>
                            <div className="text-espresso/30 dark:text-ivory/30 transition-colors duration-300">{row.p1}</div>
                            <div className="text-espresso/60 dark:text-ivory/60 transition-colors duration-300">{row.p2}</div>
                            <div className="text-terracotta dark:text-gold font-bold flex items-center justify-center gap-2 transition-colors duration-300">
                                <Check className="w-4 h-4" /> {row.p3}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
