import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

interface ProductStripProps {
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    reverse?: boolean;
}

function ProductStrip({ title, subtitle, desc, image, reverse = false }: ProductStripProps) {
    return (
        <Section className="border-t border-white/5">
            <div className={`flex flex-col md:flex-row items-center gap-16 ${reverse ? "md:flex-row-reverse" : ""}`}>
                <div className={`flex-1 ${reverse ? "md:text-right" : ""}`}>
                    <span className="text-gold text-xs font-bold uppercase tracking-widest">{subtitle}</span>
                    <h2 className="text-4xl font-serif font-bold text-ivory mb-6 mt-2">{title}</h2>
                    <p className="text-ivory/70 text-lg leading-relaxed mb-8">{desc}</p>
                    <Button variant="outline" href="/products">View Details</Button>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="relative w-80 h-80 md:w-96 md:h-96">
                        <div className="absolute inset-0 bg-gold/10 rounded-full blur-[60px]"></div>
                        <img src={image} alt={title} className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>
            </div>
        </Section>
    );
}

export function ProductStrips() {
    return (
        <div className="bg-midnight">
            <ProductStrip
                subtitle="Signature Collection"
                title="A2 Gir Cow Milk"
                desc="The nectar of life. Sweet, light, and full of A2 beta-casein protein. Milked with love, chilled instantly, and delivered in sterilized glass."
                image="/assets/img/milk-bottle.png"
            />
            <ProductStrip
                subtitle="Golden Elixir"
                title="Vedic Bilona Ghee"
                desc="Made from cultured curd (dahi), churned by hand in both directions (bilona). 30 liters of milk goes into 1kg of this gold."
                image="/assets/img/ghee-jar.png"
                reverse
            />
            <ProductStrip
                subtitle="Raw & Pure"
                title="Wildforest Honey"
                desc="Collected by tribals from deep forests. Unheated, unprocessed, and full of pollen and enzymes. A natural immunity booster."
                image="/assets/img/honey-jar.png"
            />
        </div>
    );
}
