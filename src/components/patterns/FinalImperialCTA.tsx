import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function FinalImperialCTA() {
    return (
        <Section className="bg-terracotta dark:bg-gold text-white dark:text-midnight relative overflow-hidden transition-colors duration-300" glass={false}>
            <div className="absolute inset-0 bg-[url('/assets/img/farm-soul.png')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight">
                    Not everyone can handle <br /> this level of purity.
                </h2>
                <p className="text-white/80 dark:text-midnight/80 text-lg font-medium transition-colors duration-300">
                    Amrit Sovereign is reserved for those who understand that health is the only true wealth.
                    Are you ready to ascend?
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Button className="bg-white text-terracotta hover:bg-espresso hover:text-white dark:bg-midnight dark:text-gold dark:hover:bg-white dark:hover:text-midnight border-none transition-all duration-300">
                        Join the Subscription
                    </Button>
                </div>
            </div>
        </Section>
    );
}
