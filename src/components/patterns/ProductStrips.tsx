import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/ProductImage";

interface ProductStripProps {
    id: string;
    title: string;
    subtitle: string;
    desc: string;
    image: string;
    reverse?: boolean;
}

function ProductStrip({ id, title, subtitle, desc, image, reverse = false }: ProductStripProps) {
    return (
        <Section className="border-t border-espresso/5 dark:border-white/5 transition-colors duration-300">
            <div className={`flex flex-col md:flex-row items-center gap-16 ${reverse ? "md:flex-row-reverse" : ""}`}>
                <div className={`flex-1 ${reverse ? "md:text-right" : ""}`}>
                    <span className="text-terracotta dark:text-gold text-xs font-bold uppercase tracking-widest transition-colors duration-300">{subtitle}</span>
                    <h2 className="text-4xl font-serif font-bold text-espresso dark:text-ivory mb-6 mt-2 transition-colors duration-300">{title}</h2>
                    <p className="text-espresso/70 dark:text-ivory/70 text-lg leading-relaxed mb-8 transition-colors duration-300">{desc}</p>
                    <Button variant="outline" href="/products" className="border-espresso/20 text-espresso hover:bg-espresso/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10">View Details</Button>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="relative w-80 h-80 md:w-96 md:h-96">
                        <div className="absolute inset-0 bg-terracotta/10 dark:bg-gold/10 rounded-full blur-[60px] transition-colors duration-300"></div>
                        <ProductImage src={image} alt={title} category="Dairy" id={id} className="relative z-10 w-full h-full object-contain" />
                    </div>
                </div>
            </div>
        </Section>
    );
}

export function ProductStrips() {
    return (
        <div className="bg-creme dark:bg-midnight transition-colors duration-300">
            <ProductStrip
                id="milk-fresh"
                subtitle="Signature Collection"
                title="A2 Gir Cow Milk"
                desc="The nectar of life. Sweet, light, and full of A2 beta-casein protein. Milked with love, chilled instantly, and delivered in sterilized glass."
                image="/assets/img/milk-bottle.png"
            />
            <ProductStrip
                id="ghee-bilona"
                subtitle="Golden Elixir"
                title="Vedic Bilona Ghee"
                desc="Made from cultured curd (dahi), churned by hand in both directions (bilona). 30 liters of milk goes into 1kg of this gold."
                image="/assets/img/ghee-jar.png"
                reverse
            />
            <ProductStrip
                id="honey-forest"
                subtitle="Raw & Pure"
                title="Wildforest Honey"
                desc="Collected by tribals from deep forests. Unheated, unprocessed, and full of pollen and enzymes. A natural immunity booster with medicinal properties."
                image="/assets/img/honey-jar.png"
            />
            <ProductStrip
                id="curd-fresh"
                subtitle="Small Batch Artisan"
                title="A2 Gir Cow Curd"
                desc="Freshly set Every morning. Thick, creamy, and probiotic-rich. The perfect digestive companion for every royal meal."
                image="/assets/img/paneer.png"
                reverse
            />
            <ProductStrip
                id="paneer-fresh"
                subtitle="Small Batch Artisan"
                title="A2 Gir Cow Paneer"
                desc="Freshly made every morning. Soft, creamy, and melts in your mouth. High in calcium and protein, perfect for your luxury meals."
                image="/assets/img/paneer.png"
                reverse
            />
            <ProductStrip
                id="sweets-bilona"
                subtitle="Ancestral Delights"
                title="A2 Bilona Sweets"
                desc="Ghee-rich Mithai made with our signature Gir milk and Desi Khand. No refined sugar, no adulterants. Taste the nostalgia of pure festive joy."
                image="/assets/img/sweets.png"
            />
            <ProductStrip
                id="oil-mustard"
                subtitle="Cold Pressed Purity"
                title="Ancient Wood-Pressed Oil"
                desc="Extracted using traditional wooden Ghani at low temperatures. Retains all natural nutrients, aroma, and essential fatty acids for heart health."
                image="/assets/img/oil-bottle.png"
                reverse
            />
            <ProductStrip
                id="atta-sharbati"
                subtitle="Farm Fresh Milling"
                title="Stone-Ground Sharbati Atta"
                desc="Freshly ground on traditional stone chakkis. Non-GMO, high fiber, and rich in natural wheat germ oil for the perfect soft rotis."
                image="/assets/img/atta-sack.png"
            />
        </div>


    );
}
