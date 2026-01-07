export const productContent: Record<string, any> = {
    default: {
        whatItIs: "Pure, natural product from Amrit Milk Organic.",
        whySafe: [
            "100% Natural",
            "No Preservatives",
            "Chemical Free"
        ],
        difference: [
            "Own Farm Sourced",
            "Traditional Methods",
            "Direct to Home"
        ],
        whoShouldChoose: [
            "Health Conscious Families",
            "Growing Children",
            "Elders"
        ],
        ordering: [
            "Fresh daily delivery (local areas)",
            "WhatsApp support available",
            "Simple, transparent pricing"
        ]
    },
    dairy: {
        whatItIs: "Our A2 cow milk comes from Indian desi cows, raised on our own farm and delivered fresh every day without any industrial processing.",
        whySafe: [
            "Naturally A2 (easier to digest)",
            "No preservatives, no mixing",
            "Gentle on growing children and elders",
            "Served daily to hundreds of families for years"
        ],
        difference: [
            "Own farm & cows (not sourced from outside)",
            "Controlled feeding & humane care",
            "No factory-style handling",
            "Long-term relationship with customers"
        ],
        whoShouldChoose: [
            "Families with young children",
            "People sensitive to packaged milk",
            "Anyone seeking clean, daily nutrition"
        ],
        ordering: [
            "Fresh daily delivery (local areas)",
            "WhatsApp support available",
            "Simple, transparent pricing"
        ]
    },
    ghee: {
        whatItIs: "Ancient Vedic Bilona Ghee made from A2 milk curd, hand-churned to perfection.",
        whySafe: [
            "Packed with nutrition",
            "Great for digestion",
            "No additives or chemicals"
        ],
        difference: [
            "Traditional Bilona Method",
            "Made from Curd (not cream)",
            "Small Batch Production"
        ],
        whoShouldChoose: [
            "Ayurvedic practitioners",
            "Health enthusiasts",
            "Families seeking immunity boost"
        ],
        ordering: [
            "Dispatched globally",
            "Secure glass packaging",
            "Tracked delivery"
        ]
    },
    oils: {
        whatItIs: "Wood-pressed oils extracted without heat to preserve natural nutrients and flavor.",
        whySafe: [
            "Zero heat processing",
            "No chemical refining",
            "Purest form of oil"
        ],
        difference: [
            "Traditional Ghani extraction",
            "Premium raw seeds",
            "Unfiltered goodness"
        ],
        whoShouldChoose: [
            "Health conscious cooks",
            "Heart patients",
            "Traditional food lovers"
        ],
        ordering: [
            "Available in ltr/500ml",
            "Leak-proof packaging",
            "Freshly pressed"
        ]
    },
    sweets: { // Jaggery/Sweets
        whatItIs: "Pure, chemical-free sweetness from natural sugarcane.",
        whySafe: [
            "No sulfur or bleaching",
            "Rich in minerals",
            "Natural digestive aid"
        ],
        difference: [
            "Traditionally made",
            "Sourced from organic farms",
            "Handcrafted care"
        ],
        whoShouldChoose: [
            "Sugar-free dieters",
            "Children with sweet tooth",
            "Health conscious families"
        ],
        ordering: [
            "Available in bulk",
            "Eco-friendly packs"
        ]
    }
};

export function getContentForProduct(category: string) {
    const key = category.toLowerCase();
    if (key === 'dairy') return productContent.dairy;
    if (key.includes('ghee') || key === 'dairy' && false) return productContent.ghee; // Ghee is usually under dairy, need specific check
    if (key === 'oils') return productContent.oils;
    if (key === 'sweets' || key === 'jaggery') return productContent.sweets;
    if (key === 'honey') return { ...productContent.default, whatItIs: "Raw wild forest honey." };
    
    return productContent.default;
}
