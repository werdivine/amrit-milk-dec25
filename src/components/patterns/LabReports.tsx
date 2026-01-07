"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { FileText, Search, ShieldCheck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
    { title: "Pesticide Residue Audit", date: "Dec 2025", result: "0.00% Found" },
    { title: "A2 Protein Certification", date: "Nov 2025", result: "100% Pure A2" },
    { title: "Bacterial Count TPC", date: "Last Batched", result: "Below Limit" }
];

export function LabReports() {
    return (
        <Section id="lab-reports" className="bg-creme dark:bg-midnight transition-colors duration-500 overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <span className="text-terracotta dark:text-gold font-bold uppercase tracking-[0.3em] text-xs">Uncompromising Truth</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso dark:text-ivory leading-tight">
                            Total <br />
                            <span className="text-terracotta">Transparency.</span>
                        </h2>
                        <p className="text-espresso/60 dark:text-ivory/60 text-lg md:text-xl leading-relaxed">
                            Trust is earned through evidence. We publish our random batch test results from NABL accredited labs, so you never have to take our word for it.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {reports.map((report, i) => (
                            <motion.div
                                key={report.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center text-terracotta">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-espresso dark:text-ivory font-bold">{report.title}</h4>
                                        <p className="text-xs text-espresso/40 dark:text-ivory/40 uppercase tracking-widest">{report.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-black text-gold block mb-1 uppercase">{report.result}</span>
                                    <button className="text-espresso/40 dark:text-ivory/40 hover:text-espresso dark:hover:text-white flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest transition-colors">
                                        <Download className="w-3 h-3" /> PDF
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <Button href="/lab-reports" size="lg" className="bg-terracotta text-white hover:bg-white hover:text-espresso transition-all">View All Audit History</Button>
                    </div>
                </div>

                <div className="relative flex justify-center">
                    <div className="relative z-10 w-full max-w-sm aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-2xl rotate-3 translate-x-10 group hover:rotate-0 transition-transform duration-700">
                        <div className="p-8 space-y-4">
                            <div className="flex justify-between items-center border-b pb-4">
                                <Search className="w-6 h-6 text-espresso" />
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Passed Audit</span>
                            </div>
                            <h5 className="text-espresso font-serif text-xl">NABL Laboratory Report</h5>
                            <div className="space-y-6 py-4">
                                {[1, 2, 3, 4].map(l => (
                                    <div key={l} className="space-y-2">
                                        <div className="h-2 w-full bg-slate-100 rounded"></div>
                                        <div className="h-2 w-3/4 bg-slate-50 rounded"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-10 flex flex-col items-center gap-4">
                                <ShieldCheck className="w-16 h-16 text-emerald-500 opacity-20" />
                                <div className="text-[10px] font-black uppercase text-espresso/30">Verified Sovereign Source</div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 w-full max-w-sm aspect-[3/4] bg-terracotta/20 rounded-3xl blur-[120px] -z-0"></div>
                </div>
            </div>
        </Section>
    );
}
