import { Section } from "@/components/ui/section";
import { X, Check } from "lucide-react";

export function SovereignCompare() {
    return (
        <Section className="bg-midnight-mid/50">
            <div className="text-center mb-12">
                <span className="text-gold font-bold uppercase tracking-widest text-xs">The Reality Check</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Know What You Drink</h2>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[800px] bg-glass-bg border border-glass-border rounded-3xl p-8 backdrop-blur-xl">
                    <div className="grid grid-cols-4 gap-4 mb-4 border-b border-white/10 pb-4 text-center font-bold text-sm uppercase tracking-wider">
                        <div className="text-left pl-4">Parameter</div>
                        <div className="text-ivory/40">Packet Milk</div>
                        <div className="text-ivory/60">Organic Brand</div>
                        <div className="text-gold">Amrit Sovereign</div>
                    </div>

                    {[
                        { param: "Cow Breed", p1: "Mixed/Buffalo", p2: "Sahiwal/Gir Mix", p3: "100% Pure Gir" },
                        { param: "Processing", p1: "Pasteurized/UHT", p2: "Pasteurized", p3: "Raw, Chilled" },
                        { param: "Packaging", p1: "Plastic Pouch", p2: "Plastic Bottle", p3: "Sterilized Glass" },
                        { param: "Shelf Life", p1: "2-90 Days", p2: "3-5 Days", p3: "2 Days (Living)" },
                        { param: "Cream", p1: "Extracted", p2: "Standardized", p3: "Full Cream (Vedic)" },
                    ].map((row, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 py-6 border-b border-white/5 text-center items-center hover:bg-white/5 rounded-lg transition-colors">
                            <div className="text-left pl-4 font-bold text-ivory">{row.param}</div>
                            <div className="text-ivory/30">{row.p1}</div>
                            <div className="text-ivory/60">{row.p2}</div>
                            <div className="text-gold font-bold flex items-center justify-center gap-2">
                                <Check className="w-4 h-4" /> {row.p3}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
