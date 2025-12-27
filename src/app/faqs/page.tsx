"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const faqCategories = [
    {
        name: "Products & Quality",
        faqs: [
            {
                question: "What makes A2 milk different from regular milk?",
                answer: "A2 milk comes from cows that only produce the A2 type of beta-casein protein. Regular milk from hybrid cows (like HF and Jersey) contains both A1 and A2 proteins. When A1 protein is digested, it releases BCM-7, a peptide linked to digestive discomfort. Indigenous Indian cows like Gir naturally produce only A2 protein — the same type found in human mother's milk, making it easier to digest."
            },
            {
                question: "Why is Gir cow milk considered superior?",
                answer: "Gir cows are an indigenous Indian breed that naturally produce only A2 milk. They have a distinctive hump (Suryaketu Nadi) believed to absorb beneficial solar energy. Their milk is richer in beta-carotene (giving it a natural golden color), contains higher levels of omega fatty acids, and has better fat globule structure that makes it easier to digest."
            },
            {
                question: "Is the milk pasteurized or raw?",
                answer: "Our milk is gently pasteurized using the LTLT (Low Temperature Long Time) method at 63°C for 30 minutes. This ensures complete safety while preserving maximum nutrients, enzymes, and beneficial bacteria. This is different from UHT or high-heat pasteurization that destroys most nutrients."
            },
            {
                question: "Why glass bottles instead of plastic pouches?",
                answer: "Glass is inert and doesn't leach chemicals into the milk. Plastic pouches, especially when exposed to heat during transport, can release BPA and microplastics. Glass also preserves taste and freshness better. Plus, our bottles are returned, sterilized, and reused — zero single-use plastic."
            },
            {
                question: "What other products do you offer besides milk?",
                answer: "We offer a complete range of pure dairy and farm products: Bilona Ghee (hand-churned), Fresh Paneer, Dahi (curd), A2 Chhach (buttermilk), Cold-Pressed Mustard Oil, Raw Honey, Stone-Ground Atta, and seasonal traditional sweets. All products maintain the same purity standards."
            }
        ]
    },
    {
        name: "Delivery & Subscription",
        faqs: [
            {
                question: "How is the milk delivered so quickly?",
                answer: "We milk our cows between 3:30-4:00 AM, immediately chill the milk to 4°C using solar-powered chillers, bottle it in sterilized glass by 5:30 AM, and dispatch using our electric delivery fleet. Your milk reaches you before 7:00 AM — within 4 hours of milking."
            },
            {
                question: "What areas do you deliver to?",
                answer: "We currently deliver to all major areas in Lucknow and surrounding regions within a 30km radius of our farm in Sitapur. We're expanding to more areas soon. Contact us on WhatsApp to check if we deliver to your pin code."
            },
            {
                question: "Can I pause or modify my subscription?",
                answer: "Absolutely! You can pause your subscription for vacation, change quantities, or switch products anytime through WhatsApp. Just give us 24 hours notice before your next delivery. No penalties for pausing."
            },
            {
                question: "What if I'm not home during delivery?",
                answer: "We deliver in insulated cold boxes that keep milk fresh for hours. You can designate a safe spot (like outside your door) for delivery. We'll send you a WhatsApp notification with photo proof upon delivery."
            },
            {
                question: "How do I return the glass bottles?",
                answer: "Keep your empty bottles ready during your next delivery. Our delivery partner will collect them and leave fresh ones. Alternatively, you can return bottles anytime. We offer a small deposit refund for each bottle returned."
            }
        ]
    },
    {
        name: "Farm & Animals",
        faqs: [
            {
                question: "Can I visit the farm?",
                answer: "Yes! We welcome visitors. Farm visits are available every Sunday for our subscribers. You can meet the cows, see the milking process, and experience farm life firsthand. Book via WhatsApp at least 48 hours in advance."
            },
            {
                question: "How are the cows treated?",
                answer: "Our cows live in open fields with shelter, not in cramped dairy sheds. They eat organic fodder, listen to Vedic chants, and receive regular veterinary care. We follow a strict 'Calf First' policy — calves drink from two udders first, we only milk the remaining two. No artificial hormones or antibiotics."
            },
            {
                question: "What do the cows eat?",
                answer: "Our cows eat a balanced diet of hydroponic green fodder (barley, maize), organic hay, jaggery, and Ayurvedic supplements like Shatavari and Ashwagandha. The diet is designed with veterinary nutritionists to maximize health and milk quality."
            },
            {
                question: "How many cows do you have?",
                answer: "We have over 400 indigenous cows, primarily purebred Gir. Each cow is named and tracked individually. We maintain complete genealogy records to ensure pure A2 genetics."
            }
        ]
    },
    {
        name: "Payments & Pricing",
        faqs: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept UPI (Google Pay, PhonePe, Paytm), bank transfers (NEFT/IMPS), and cash on delivery. For subscriptions, you can pay weekly, fortnightly, or monthly in advance."
            },
            {
                question: "Why is A2 milk more expensive than regular milk?",
                answer: "Indigenous Gir cows produce less milk than hybrid breeds (8-12L vs 20-30L daily), require more care, and are fed organic fodder. The glass packaging, cold-chain logistics, and same-day delivery add to costs. You're paying for genuine quality, not marketing."
            },
            {
                question: "Do you offer any discounts?",
                answer: "Yes! We offer: 10% off on quarterly subscriptions, 15% off on half-yearly, and 20% off on annual subscriptions. Referral bonuses are also available — get one free delivery for every friend who subscribes."
            }
        ]
    }
];

export default function FAQsPage() {
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({ "0-0": true });
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState(0);

    const toggleItem = (key: string) => {
        setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const filteredFaqs = searchQuery
        ? faqCategories.flatMap((cat, catIndex) =>
            cat.faqs.filter(faq =>
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((faq, faqIndex) => ({ ...faq, catIndex, key: `${catIndex}-${faqIndex}` }))
        )
        : [];

    return (
        <main className="bg-midnight min-h-screen">
            {/* Hero */}
            <section className="relative py-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] mb-4 block">Support</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-ivory mb-6">FAQs</h1>
                    <p className="text-xl text-ivory/70 max-w-2xl mx-auto mb-8">
                        Everything you need to know about Amrit Milk, our farm, and your subscription.
                    </p>

                    {/* Search */}
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ivory/40" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full pl-12 pr-4 py-4 bg-midnight-mid border border-glass-border rounded-2xl text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Search Results */}
            {searchQuery && (
                <Section className="pt-0">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-ivory/60 mb-6">
                            Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for "{searchQuery}"
                        </p>
                        {filteredFaqs.length > 0 ? (
                            <div className="space-y-4">
                                {filteredFaqs.map((faq) => (
                                    <div key={faq.key} className="glass p-6 rounded-2xl border border-glass-border">
                                        <h3 className="text-lg font-bold text-ivory mb-3">{faq.question}</h3>
                                        <p className="text-ivory/70">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-ivory/50 text-center py-12">No results found. Try a different search term.</p>
                        )}
                    </div>
                </Section>
            )}

            {/* Category Navigation */}
            {!searchQuery && (
                <>
                    <section className="border-y border-glass-border bg-midnight-mid sticky top-20 z-30">
                        <div className="max-w-4xl mx-auto px-6">
                            <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
                                {faqCategories.map((cat, index) => (
                                    <button
                                        key={cat.name}
                                        onClick={() => setActiveCategory(index)}
                                        className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeCategory === index
                                            ? 'bg-gold text-midnight font-bold'
                                            : 'bg-midnight text-ivory/70 hover:text-ivory border border-glass-border'
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ Accordion */}
                    <Section>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-ivory mb-8">{faqCategories[activeCategory].name}</h2>
                            <div className="space-y-4">
                                {faqCategories[activeCategory].faqs.map((faq, index) => {
                                    const key = `${activeCategory}-${index}`;
                                    const isOpen = openItems[key];
                                    return (
                                        <div key={key} className="glass rounded-2xl border border-glass-border overflow-hidden">
                                            <button
                                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                                                onClick={() => toggleItem(key)}
                                            >
                                                <span className="text-lg font-medium text-ivory pr-4">{faq.question}</span>
                                                <ChevronDown className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <p className="px-6 pb-5 text-ivory/70 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Section>
                </>
            )}

            {/* Still Have Questions */}
            <Section className="bg-midnight-mid text-center">
                <h2 className="text-3xl font-serif font-bold text-ivory mb-6">Still Have Questions?</h2>
                <p className="text-ivory/60 max-w-xl mx-auto mb-8">
                    Can't find what you're looking for? Reach out to us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button href="https://wa.me/919876543210" size="lg" className="bg-green-500 text-white hover:bg-green-400">
                        Chat on WhatsApp
                    </Button>
                    <Button href="/contact" variant="glass" size="lg">
                        Contact Form
                    </Button>
                </div>
            </Section>
        </main>
    );
}
