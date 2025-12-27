import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Download, FileCheck, Calendar, Shield } from "lucide-react";

const labReports = [
    {
        month: "December 2024",
        date: "Dec 15, 2024",
        lab: "NABL Accredited Lab, Lucknow",
        parameters: 21,
        result: "PASSED",
        highlights: ["Zero Adulterants", "Zero Antibiotics", "A2 Confirmed"],
        downloadUrl: "#"
    },
    {
        month: "November 2024",
        date: "Nov 15, 2024",
        lab: "NABL Accredited Lab, Lucknow",
        parameters: 21,
        result: "PASSED",
        highlights: ["Zero Urea", "Zero Palm Oil", "Premium Fat Content"],
        downloadUrl: "#"
    },
    {
        month: "October 2024",
        date: "Oct 15, 2024",
        lab: "NABL Accredited Lab, Lucknow",
        parameters: 21,
        result: "PASSED",
        highlights: ["Zero Preservatives", "Natural Cream", "High Protein"],
        downloadUrl: "#"
    },
    {
        month: "September 2024",
        date: "Sep 15, 2024",
        lab: "NABL Accredited Lab, Lucknow",
        parameters: 21,
        result: "PASSED",
        highlights: ["Pure A2 Genetics", "Organic Certified", "Cold Chain Verified"],
        downloadUrl: "#"
    }
];

const certifications = [
    { name: "FSSAI License", number: "12345678901234", validUntil: "2027" },
    { name: "NABL Accreditation", number: "MC-12345", validUntil: "2026" },
    { name: "Organic Certification", number: "ORG/IN/2024/001234", validUntil: "2025" },
    { name: "ISO 22000:2018", number: "ISO-2024-5678", validUntil: "2027" }
];

const testParameters = [
    "Fat Content", "SNF (Solids-Not-Fat)", "Protein", "Lactose", "Acidity",
    "Methylene Blue Reduction", "Phosphatase Test", "Coliform Count", "Total Plate Count",
    "Antibiotic Residue", "Aflatoxin M1", "Pesticide Residue", "Heavy Metals",
    "Urea Test", "Neutralizers", "Starch", "Glucose", "Maltodextrin",
    "Formalin", "Hydrogen Peroxide", "Detergent"
];

export default function LabReportsPage() {
    return (
        <main className="bg-midnight min-h-screen">
            {/* Hero */}
            <section className="relative py-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] mb-4 block">Transparency</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-ivory mb-6">Lab Reports</h1>
                    <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
                        Every batch tested. Every result published. We have nothing to hide.
                    </p>
                </div>
            </section>

            {/* Stats Banner */}
            <section className="py-12 bg-midnight-mid border-y border-glass-border">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold text-gold">21</p>
                            <p className="text-ivory/60 text-sm">Parameters Tested</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-green-400">100%</p>
                            <p className="text-ivory/60 text-sm">Pass Rate</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-gold">Monthly</p>
                            <p className="text-ivory/60 text-sm">Testing Frequency</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-gold">NABL</p>
                            <p className="text-ivory/60 text-sm">Accredited Lab</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Reports */}
            <Section>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif font-bold text-ivory">Monthly Test Reports</h2>
                    <p className="text-ivory/60 mt-2">Download and verify our purity claims</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {labReports.map((report, index) => (
                        <div key={report.month} className="glass p-6 rounded-3xl border border-glass-border hover:border-gold/30 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-ivory">{report.month}</h3>
                                    <p className="text-ivory/50 text-sm flex items-center gap-2 mt-1">
                                        <Calendar className="w-4 h-4" />
                                        {report.date}
                                    </p>
                                </div>
                                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full">
                                    {report.result}
                                </span>
                            </div>

                            <p className="text-ivory/60 text-sm mb-4">{report.lab}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {report.highlights.map((highlight) => (
                                    <span key={highlight} className="px-3 py-1 bg-gold/10 text-gold text-xs rounded-full">
                                        {highlight}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                                <p className="text-ivory/50 text-sm">{report.parameters} parameters tested</p>
                                <Button href={report.downloadUrl} size="sm" variant="glass">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* What We Test */}
            <Section className="bg-midnight-mid">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-ivory">21-Parameter Test</h2>
                        <p className="text-ivory/60 mt-2">Every batch undergoes comprehensive testing</p>
                    </div>

                    <div className="glass p-8 rounded-3xl border border-glass-border">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {testParameters.map((param, index) => (
                                <div key={param} className="flex items-center gap-2">
                                    <FileCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                                    <span className="text-ivory/80 text-sm">{param}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Certifications */}
            <Section>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-ivory">Our Certifications</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certifications.map((cert) => (
                            <div key={cert.name} className="glass p-6 rounded-2xl border border-glass-border flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-7 h-7 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-ivory">{cert.name}</h3>
                                    <p className="text-ivory/50 text-sm">{cert.number}</p>
                                    <p className="text-green-400 text-xs mt-1">Valid until {cert.validUntil}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA */}
            <Section className="bg-midnight-mid text-center">
                <h2 className="text-3xl font-serif font-bold text-ivory mb-6">Verified Purity, Delivered Daily</h2>
                <p className="text-ivory/60 max-w-xl mx-auto mb-8">
                    Join families who trust test results over marketing claims.
                </p>
                <Button href="/subscription-hub" size="lg" className="bg-gold text-midnight hover:bg-white">
                    Start Your Subscription
                </Button>
            </Section>
        </main>
    );
}
