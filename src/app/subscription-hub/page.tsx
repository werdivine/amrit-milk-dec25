import { VitalityMatrix } from "@/components/patterns/VitalityMatrix";
import { SubscriptionPlans } from "@/components/patterns/SubscriptionPlans";
import { Section } from "@/components/ui/section";

export default function SubscriptionHub() {
    return (
        <main className="min-h-screen bg-theme-primary pt-20 transition-colors duration-500">
            <Section className="text-center relative overflow-hidden">

                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] -z-10"></div>

                <span className="inline-block border border-gold/30 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Limited Seats Available</span>
                <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8 text-theme-primary">The Circle of Health.</h1>
                <p className="text-xl text-theme-secondary max-w-2xl mx-auto mb-12">
                    Join the exclusive group of families receiving daily deliveries of raw, living A2 milk.
                    We are currently at 85% capacity.
                </p>
            </Section>

            <VitalityMatrix />
            <SubscriptionPlans />
        </main>
    );
}
