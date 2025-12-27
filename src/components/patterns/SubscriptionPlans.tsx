import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function SubscriptionPlans() {
    const plans = [
        {
            name: "Trial",
            price: "₹960",
            period: "/ week",
            desc: "Experience the difference for 7 days.",
            features: ["1 Liter Daily", "Morning Delivery (6-8 AM)", "Glass Bottle Exchange", "Cancel Anytime"],
            highlight: false
        },
        {
            name: "Sovereign Family",
            price: "₹3,600",
            period: "/ month",
            desc: "The gold standard for family health.",
            features: ["1.5 Liters Daily", "Priority Delivery (5-7 AM)", "Quarterly Farm Visit", "Dedicated Account Manager", "Lab Report Access"],
            highlight: true
        },
        {
            name: "Estate",
            price: "₹7,200",
            period: "/ month",
            desc: "Complete nutrition for large estates.",
            features: ["3 Liters Daily", "Before 6 AM Delivery", "Private Concierge", "Custom Ghee Batches", "Unlimited Farm Access"],
            highlight: false
        }
    ];

    return (
        <Section className="bg-midnight relative" id="plans">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl font-serif font-bold mb-6">Secure Your Supply.</h2>
                <p className="text-ivory/60 text-lg">Our herd is limited. We cap subscriptions to ensure every drop meets the Sovereign Standard. Join the waitlist if sold out.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`
                        relative rounded-3xl p-8 border transition-all duration-300
                        ${plan.highlight
                                ? "bg-midnight-mid border-gold scale-105 shadow-2xl shadow-gold/10 z-10"
                                : "bg-glass-bg border-glass-border hover:border-ivory/20"
                            }
                    `}
                    >
                        {plan.highlight && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-midnight text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="font-serif text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-sm text-ivory/50 h-10">{plan.desc}</p>
                        </div>

                        <div className="mb-8 flex items-baseline gap-1">
                            <span className="text-4xl font-black text-ivory">{plan.price}</span>
                            <span className="text-sm text-ivory/40">{plan.period}</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feat) => (
                                <li key={feat} className="flex items-center gap-3 text-sm text-ivory/80">
                                    <Check className={`w-4 h-4 ${plan.highlight ? "text-gold" : "text-ivory/30"}`} />
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant={plan.highlight ? "primary" : "outline"}
                            className="w-full"
                            href="/contact"
                        >
                            {plan.highlight ? "Start Subscription" : "Select Plan"}
                        </Button>
                    </div>
                ))}
            </div>
        </Section>
    );
}
