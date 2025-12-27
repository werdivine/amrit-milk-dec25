"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileCheck } from "lucide-react";

export function LabReports() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    className="glass p-12 md:p-16 rounded-[3rem] border border-glass-border text-center relative overflow-hidden"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />

                    <div className="relative z-10">
                        <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                            Scientific Audit
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-ivory mb-6">
                            We Hide{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-300">
                                Nothing.
                            </span>
                        </h2>
                        <p className="text-xl text-ivory/70 leading-relaxed max-w-2xl mx-auto mb-10">
                            Every batch of Amrit Milk undergoes a 21-parameter scientific test.
                            No adulterants. No palm oil. No urea. Download our latest certified NABL report below.
                        </p>

                        {/* Report Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mb-10">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-gold">21</p>
                                <p className="text-ivory/60 text-sm">Parameters Tested</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-gold">100%</p>
                                <p className="text-ivory/60 text-sm">Pure Results</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-gold">NABL</p>
                                <p className="text-ivory/60 text-sm">Accredited Lab</p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                href="/lab-reports"
                                size="lg"
                                icon
                                className="bg-gold text-midnight hover:bg-white"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download Dec 2024 Report
                            </Button>
                            <Button
                                href="/genetic-library"
                                variant="glass"
                                size="lg"
                            >
                                <FileCheck className="w-5 h-5 mr-2" />
                                View Certifications
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
