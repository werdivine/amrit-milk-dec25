"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/section";
import { ArrowUpRight, TrendingDown } from "lucide-react";

export function VitalityMatrix() {
    const [liters, setLiters] = useState(30);
    const [quality, setQuality] = useState(2.5); // 1 = Industrial, 1.5 = Organic, 2.5 = Sovereign

    const results = useMemo(() => {
        const baseScore = liters * quality * 10;
        const toxins = quality === 2.5 ? -78 : quality === 1.5 ? -40 : 100;
        const antioxidants = quality === 2.5 ? 240 : quality === 1.5 ? 50 : 0;

        return { score: Math.round(baseScore), toxins, antioxidants };
    }, [liters, quality]);

    return (
        <Section className="bg-gradient-to-br from-midnight to-midnight-mid" id="vitality-matrix">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="bg-gold text-midnight px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">ROI Engine</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Your Vitality <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivory to-gold">Matrix.</span></h2>
                    <p className="text-ivory/60 max-w-xl mx-auto">Calculate the compound interest of real nutrition vs. industrial processed dairy.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="bg-glass-bg border border-glass-border rounded-3xl p-8 backdrop-blur-sm">
                        <h3 className="text-2xl font-serif font-bold mb-8">Monthly Consumption</h3>

                        <div className="mb-8">
                            <label className="block text-sm text-ivory/60 mb-4">Liters of Dairy / Month</label>
                            <input
                                type="range"
                                min="5"
                                max="60"
                                value={liters}
                                onChange={(e) => setLiters(parseInt(e.target.value))}
                                className="w-full h-2 bg-glass-border rounded-lg appearance-none cursor-pointer accent-gold"
                            />
                            <div className="flex justify-between text-xs font-bold mt-2">
                                <span>5L</span>
                                <span className="text-gold text-lg">{liters}L</span>
                                <span>60L</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-ivory/60 mb-4">Quality of Source</label>
                            <select
                                value={quality}
                                onChange={(e) => setQuality(parseFloat(e.target.value))}
                                className="w-full bg-midnight/50 border border-glass-border rounded-xl p-4 text-ivory focus:border-gold outline-none transition-colors appearance-none"
                            >
                                <option value="1">Standard Pouch (Industrial)</option>
                                <option value="1.5">Organic Certified</option>
                                <option value="2.5">Sovereign A2 (Raw Vedic)</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-gold/5 border-l-4 border-gold rounded-r-3xl p-12">
                        <div className="text-center mb-12">
                            <span className="block text-xs uppercase tracking-[0.2em] mb-4 text-ivory/50">Projected Vitality Score</span>
                            <div className="text-8xl font-black text-gold tabular-nums leading-none mb-2">{results.score}</div>
                            <p className="font-serif text-xl tracking-widest text-ivory opacity-80">
                                {results.score > 700 ? "SOVEREIGN STATUS" : "SUB-OPTIMAL"}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                            <div>
                                <span className="block text-sm text-ivory/50 mb-1">Toxin Reduction</span>
                                <div className="flex items-center gap-2 text-2xl font-bold text-green-400">
                                    <TrendingDown className="w-5 h-5" />
                                    {results.toxins > 0 ? `+${results.toxins}%` : `${results.toxins}%`}
                                </div>
                            </div>
                            <div>
                                <span className="block text-sm text-ivory/50 mb-1">Antioxidant Intake</span>
                                <div className="flex items-center gap-2 text-2xl font-bold text-gold">
                                    <ArrowUpRight className="w-5 h-5" />
                                    {results.antioxidants > 0 ? `+${results.antioxidants}%` : `${results.antioxidants}%`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
