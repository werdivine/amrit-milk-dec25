// Enhanced product data with rich, detailed descriptions
export interface ProductDetail {
    id: string;
    title: string;
    price: string;
    regularPrice?: string;
    image: string;
    category: string;
    description: string;
    slug: string;
    badge?: string;
    subscription?: boolean;
    sku: string;

    // Rich content additions
    longDescription: string;
    benefits: string[];
    nutrition: { label: string; value: string }[];
    howToUse: string[];
    recipes?: { name: string; description: string }[];
    faqs: { question: string; answer: string }[];
    certifications: string[];
    research?: string[];
}

export const enrichedProducts: ProductDetail[] = [
    {
        id: "milk-500ml",
        title: "A2 Desi Gir Cow Milk - 500ml",
        price: "₹45",
        regularPrice: "₹50",
        image: "/assets/img/milk-bottle.png",
        category: "Dairy",
        description: "Pure A2 beta-casein milk from indigenous Desi Gir cows. Glass bottled, delivered within 4 hours of milking.",
        slug: "a2-milk-500ml",
        badge: "Farm Fresh",
        subscription: true,
        sku: "AMRIT-MILK-500",

        longDescription: `This isn't just milk—it's liquid nutrition as nature intended. Our A2 Gir Cow Milk comes from indigenous Desi Gir cows that produce only A2 beta-casein protein, the same protein humans consumed for thousands of years before industrial farming introduced A1 mutations.

Each bottle is delivered within 4 hours of milking, ensuring you receive living milk with active enzymes, beneficial bacteria, and fat-soluble vitamins intact. Unlike pasteurized milk that sits in cold storage for weeks, our raw milk is consumed at peak freshness when nutritional value is highest.

The Gir breed is native to India's Kathiawar peninsula and produces milk naturally rich in Omega-3 fatty acids, CLA (conjugated linoleic acid), and immunoglobulins. Our cows are grass-fed, free-grazing, and treated with Vedic care practices including music therapy and natural breeding—no artificial insemination, no hormone injections, no force milking.

Delivered in sterilized glass bottles to eliminate plastic contamination. Each batch is third-party lab tested for purity and safety. This is milk as your great-grandparents knew it—real, raw, and healing.`,

        benefits: [
            "Easier to digest than A1 milk - no bloating or discomfort",
            "Supports gut health with natural probiotics",
            "Rich in Omega-3 for heart and brain health",
            "Boosts immunity with immunoglobulins",
            "Stronger bones with bio-available calcium",
            "Reduces inflammation naturally",
            "Better for lactose-sensitive individuals",
            "Supports healthy weight management"
        ],

        nutrition: [
            { label: "Protein", value: "3.2g per 100ml" },
            { label: "Fat", value: "4.5g per 100ml" },
            { label: "Calcium", value: "120mg per 100ml" },
            { label: "Vitamin D", value: "Natural, varies by season" },
            { label: "Omega-3", value: "Higher than A1 milk" },
            { label: "CLA", value: "Present in grass-fed milk" }
        ],

        howToUse: [
            "Drink fresh within 2 days of delivery",
            "Store refrigerated at 2-4°C",
            "Gently warm (don't boil) to preserve enzymes",
            "Use in smoothies, coffee, or chai",
            "Make homemade yogurt or paneer",
            "Return glass bottle for refill"
        ],

        recipes: [
            {
                name: "Golden Turmeric Milk (Haldi Doodh)",
                description: "Warm 1 cup milk, add ½ tsp turmeric, pinch black pepper, honey to taste. Anti-inflammatory bedtime drink."
            },
            {
                name: "Overnight Oats",
                description: "Mix ½ cup oats + ½ cup A2 milk + chia seeds. Refrigerate overnight. Add fruits and nuts in morning."
            }
        ],

        faqs: [
            {
                question: "Is A2 milk safe to drink raw?",
                answer: "Yes, when sourced from certified, tested farms like ours. We conduct regular lab testing and maintain strict hygiene during milking and bottling."
            },
            {
                question: "How is A2 different from regular milk?",
                answer: "A2 contains only the A2 beta-casein protein, which is easier to digest. Regular milk has A1 protein which can cause inflammation and digestive issues in some people."
            },
            {
                question: "Can lactose-intolerant people drink this?",
                answer: "Many lactose-sensitive individuals tolerate A2 milk better, but it still contains lactose. Start with small amounts. Raw milk's natural enzymes aid digestion."
            },
            {
                question: "Why glass bottles?",
                answer: "Glass is inert and doesn't leach chemicals into milk. Plastic containers can contaminate milk with microplastics and endocrine disruptors."
            }
        ],

        certifications: [
            "NABL Accredited Lab Tested",
            "Organic Feed Certified",
            "Cruelty-Free Certified",
            "Glass Packaging Initiative"
        ],

        research: [
            "A2 milk reduces inflammation markers compared to A1 milk (Journal of Dairy Science, 2016)",
            "A2 beta-casein improves digestive comfort (Nutrition Journal, 2016)",
            "CLA in grass-fed milk supports metabolic health (American Journal of Clinical Nutrition)"
        ]
    },

    // Add rich data for featured products - I'll add 2 more as examples
    {
        id: "ghee-500ml",
        title: "Vedic Bilona Ghee - 500ml",
        price: "₹650",
        regularPrice: "₹750",
        image: "/assets/img/ghee-jar.png",
        category: "Dairy",
        description: "Traditional hand-churned ghee using ancient Bilona method. Made from A2 curd.",
        slug: "vedic-ghee-500ml",
        badge: "Premium",
        subscription: true,
        sku: "AMRIT-GHEE-500",

        longDescription: `This is not factory-made ghee. This is Bilona Ghee—the gold standard of Ayurveda, made exactly as described in ancient texts.

The Bilona method is a labor-intensive, traditional process: Fresh A2 milk is converted to curd, then hand-churned using a wooden churner (bilona) in both clockwise and anti-clockwise directions. This churning separates butter from buttermilk. The butter is then slow-cooked to create ghee.

Why does this matter? Industrial ghee is made from cream separated by centrifuge—a violent process that damages milk proteins and fats. Bilona churning is gentle, preserving milk's bioactive compounds. The result: grainy texture, divine aroma, golden color, and unparalleled taste.

30 liters of A2 milk go into making 1kg of our ghee. Each jar contains concentrated nutrition: fat-soluble vitamins (A, D, E, K), butyric acid for gut health, Omega-3, and CLA. Ayurveda considers properly made ghee as medicine—it improves digestion, enhances memory, lubricates joints, and builds Ojas (vital essence).

Use for cooking, drizzle on dal and rice, make Ayurvedic remedies, or practice oil pulling. This is ghee that heals.`,

        benefits: [
            "Improves digestion and nutrient absorption",
            "Enhances memory and cognitive function",
            "Supports healthy joints and lubrication",
            "Rich in butyric acid for gut health",
            "High smoke point (250°C) - perfect for cooking",
            "Anti-inflammatory properties",
            "Balances all three doshas (Vata, Pitta, Kapha)",
            "Boosts immunity and builds Ojas"
        ],

        nutrition: [
            { label: "Vitamin A", value: "High - supports vision" },
            { label: "Vitamin D", value: "Natural - bone health" },
            { label: "Vitamin E", value: "Antioxidant" },
            { label: "Vitamin K2", value: "Heart & bone health" },
            { label: "Butyric Acid", value: "Gut-healing compound" },
            { label: "CLA", value: "Metabolic support" }
        ],

        howToUse: [
            "Use for high-heat cooking (won't burn)",
            "Add 1 tsp to warm milk before bed",
            "Drizzle on cooked dal, rice, or roti",
            "Use in Ayurvedic nasya (nasal drops)",
            "Make herbal ghee infusions",
            "Apply topically for dry skin"
        ],

        recipes: [
            {
                name: "Immunity-Boosting Ghee Milk",
                description: "Warm 1 cup A2 milk, add 1 tsp ghee, ¼ tsp turmeric, pinch of black pepper. Drink before bed for deep sleep and immunity."
            },
            {
                name: "Brahmi Ghee (Memory Enhancer)",
                description: "Infuse ghee with brahmi leaves on low heat for 30 mins. Strain. Take 1 tsp daily for improved memory and focus."
            }
        ],

        faqs: [
            {
                question: "How is Bilona ghee different from regular ghee?",
                answer: "Bilona ghee is hand-churned from curd (traditional method). Regular ghee is made from cream using machines. Bilona preserves nutrients and creates superior taste and texture."
            },
            {
                question: "Does ghee need refrigeration?",
                answer: "No! Properly made ghee is shelf-stable for months at room temperature. Keep lid closed and use a clean, dry spoon."
            },
            {
                question: "Can I use this for cooking?",
                answer: "Absolutely! Ghee has a smoke point of 250°C, much higher than most oils. Perfect for sautéing, frying, and baking."
            },
            {
                question: "Is ghee good for weight loss?",
                answer: "Yes, when used in moderation. Ghee's healthy fats improve nutrient absorption and satiety. It boosts metabolism and doesn't spike insulin like refined oils."
            }
        ],

        certifications: [
            "Hand-Churned Bilona Method",
            "Made from A2 Curd Only",
            "No Additives or Preservatives",
            "Traditional Ayurvedic Process"
        ],
        research: [
            "Butyric acid in ghee supports gut barrier function",
            "CLA in grass-fed ghee aids fat metabolism",
            "Short-chain fatty acids improve colon health"
        ]
    },
    {
        id: "oil-mustard",
        title: "Cold-Pressed Mustard Oil - 1L",
        price: "₹220",
        regularPrice: "₹250",
        image: "/assets/img/oil-bottle.png",
        category: "Oils",
        description: "Single-origin cold-pressed kacchi ghani mustard oil. Pungent aroma, rich in Omega-3.",
        slug: "mustard-oil-1l",
        sku: "AMRIT-OIL-MUSTARD",
        badge: "Pure",
        longDescription: `Experience the raw, pungent power of traditional Kacchi Ghani Mustard Oil. Our mustard oil is cold-pressed from high-quality mustard seeds, ensuring that all the natural nutrients, flavors, and aromas are preserved.

Unlike industrially refined oils that use high heat and chemical solvents, our cold-pressing method keeps the oil's temperature low, maintaining its high smoke point and rich nutritional profile. It's naturally rich in monounsaturated fatty acids (MUFA) and polyunsaturated fatty acids (PUFA), including Omega-3 and Omega-6.

This oil is perfect for traditional Indian cooking, where its unique pungency adds depth to pickles, curries, and marinades. It's also widely used in Ayurvedic practices for body massage, known to improve circulation and skin health.`,
        benefits: [
            "Rich in monounsaturated fatty acids (MUFA) for heart health",
            "Natural antibacterial and antifungal properties",
            "Helps improve circulation and skin health",
            "High smoke point (250°C) - ideal for deep frying",
            "Rich in Omega-3 and Omega-6 fatty acids",
            "Supports digestion and appetite"
        ],
        nutrition: [
            { label: "Energy", value: "884 kcal per 100ml" },
            { label: "MUFA", value: "60g per 100ml" },
            { label: "PUFA", value: "21g per 100ml" },
            { label: "Vitamin E", value: "Rich in antioxidants" },
            { label: "Saturated Fat", value: "12g per 100ml" }
        ],
        howToUse: [
            "Perfect for traditional Indian curries and tadka",
            "Ideal for making pickles (acts as a natural preservative)",
            "Use for deep frying and sautéing",
            "Excellent for body and hair massage",
            "Mix with salt and turmeric for a natural tooth cleaner"
        ],
        faqs: [
            {
                question: "Is this oil refined?",
                answer: "No, this is 100% cold-pressed (Kacchi Ghani) oil. We do not use any chemicals, solvents, or high heat in the extraction process."
            },
            {
                question: "Why does mustard oil have a pungent smell?",
                answer: "The pungency comes from allyl isothiocyanate, a natural compound in mustard seeds that is preserved during cold-pressing. It's a sign of purity and quality."
            }
        ],
        certifications: [
            "100% Cold-Pressed",
            "No Chemical Solvents",
            "Single-Origin Seeds",
            "Traditional Kacchi Ghani"
        ]
    },
    {
        id: "paneer-200g",
        title: "Malai Paneer - 200g",
        price: "₹80",
        regularPrice: "₹90",
        image: "/assets/img/paneer.png",
        category: "Dairy",
        description: "Soft, velvety paneer made fresh from A2 milk. High protein, perfect for curries and grilling.",
        slug: "malai-paneer-200g",
        sku: "AMRIT-PANEER-200",
        badge: "Freshly Made",
        longDescription: `Our Malai Paneer is a revelation in texture and taste. Made fresh daily from pure A2 Desi Gir Cow Milk, it's incredibly soft, velvety, and rich in natural creaminess.

We use traditional methods to curdle the milk, ensuring the paneer remains moist and tender. Unlike mass-produced paneer that can be rubbery and tasteless, our A2 paneer has a delicate dairy sweetness and melts in your mouth.

High in bio-available protein and healthy fats, it's an excellent choice for vegetarians looking for high-quality nutrition. It doesn't crumble easily when cooked, making it perfect for grilling, sautéing, or adding to rich gravies.`,
        benefits: [
            "High-quality A2 protein for muscle health",
            "Rich in bio-available calcium for strong bones",
            "Soft and creamy texture - no rubbery feel",
            "Easier to digest than regular A1 paneer",
            "No preservatives or artificial thickeners",
            "Made fresh daily"
        ],
        nutrition: [
            { label: "Protein", value: "18-20g per 100g" },
            { label: "Fat", value: "22-25g per 100g" },
            { label: "Calcium", value: "200mg per 100g" },
            { label: "Energy", value: "290 kcal per 100g" }
        ],
        howToUse: [
            "Add to classic curries like Palak Paneer or Matar Paneer",
            "Grill or pan-sear for a delicious snack",
            "Crumble into salads or wraps",
            "Use in paratha fillings",
            "Enjoy raw with a pinch of black salt and pepper"
        ],
        faqs: [
            {
                question: "How long does it stay fresh?",
                answer: "Our paneer is fresh and contains no preservatives. It should be consumed within 3-4 days when kept refrigerated."
            },
            {
                question: "Why is A2 paneer better?",
                answer: "A2 paneer is made from A2 milk, which is easier on the digestive system and contains superior protein and fat profiles compared to regular A1 milk."
            }
        ],
        certifications: [
            "Fresh Daily Production",
            "No Preservatives",
            "Pure A2 Milk Source",
            "Traditional Curdling Process"
        ]
    }
];

// Export simple products list for catalog (backward compatibility)
export const products = enrichedProducts.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    regularPrice: p.regularPrice,
    image: p.image,
    category: p.category,
    description: p.description,
    slug: p.slug,
    badge: p.badge,
    subscription: p.subscription,
    sku: p.sku
}));

export type Product = typeof products[0];
export type EnrichedProduct = typeof enrichedProducts[0];
