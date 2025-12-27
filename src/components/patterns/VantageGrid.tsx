import { Section } from "@/components/ui/section";
import { CheckCircle2 } from "lucide-react";

export function VantageGrid() {
    const benefits = [
        {
            title: "Traceability",
            desc: "Scan the QR code on your bottle to see exactly when your milk was collected and cooled."
        },
        {
            title: "Cold Chain",
            desc: "Chilled to 4°C within 15 mins of milking. Transported in active temperature-controlled vans."
        },
        {
            title: "Glass Packaging",
            desc: "No leaching. No microplastics. Sterilized daily in our ISO-certified facility."
        },
        {
            title: "Ethical Farming",
            desc: "Ahinsa milking. Calves are fed first. Cows are never sold for slaughter. Retired cows live in dignity."
        },
        {
            title: "Native DNA",
            desc: "100% Purebred Gir Cows. We maintain pedigree charts going back 4 generations."
        },
        {
            title: "Lab Tested",
            desc: "Daily checks for aflatoxins, antibiotics, and adulteration. You get the report."
        }
    ];

    return (
        <Section className="bg-midnight">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold mb-4">The Sovereign Vantage</h2>
                <p className="text-ivory/60">Why 500+ families in Lucknow refuse to drink anything else.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((b, i) => (
                    <div key={i} className="bg-glass-bg border border-glass-border p-8 rounded-2xl hover:bg-glass-border transition-colors group">
                        <CheckCircle2 className="w-8 h-8 text-gold mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-3 font-serif">{b.title}</h3>
                        <p className="text-sm text-ivory/60 leading-relaxed">{b.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
