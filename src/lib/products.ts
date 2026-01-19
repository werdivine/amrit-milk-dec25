export interface Product {
    id: string;
    title: string;
    price: string;
    regularPrice?: string;
    image: string;
    category: string;
    description: string;
    slug: string;
    sku: string;
    subscription?: boolean;
    featured?: boolean;
    badge?: string;
}

export const products: Product[] = [
    // ═══════════════════════════════════════════════════════════
    // GHEE (Moved to Top)
    // ═══════════════════════════════════════════════════════════
    {
        id: "ghee-cow-1kg",
        title: "Amrit Milk Organic A2 Cow Ghee - 1 kg",
        price: "₹2500",
        image: "/assets/img/products/amrit_ghee_premium.png",
        category: "Ghee",
        description: "Traditional Bilona method A2 Cow Ghee. Pure gold for health.",
        slug: "a2-cow-ghee-1kg",
        sku: "AMRIT-DAIRY-005",
        featured: true,
        badge: "Pure Vedic",
    },
    {
        id: "ghee-cow-500ml",
        title: "Amrit Milk Organic A2 Cow Ghee - 500ml",
        price: "₹1350",
        image: "/assets/img/products/amrit_ghee_premium.png",
        category: "Ghee",
        description: "Traditional Bilona method A2 Cow Ghee. Pure gold for health.",
        slug: "a2-cow-ghee-500ml",
        sku: "AMRIT-DAIRY-005-SM",
    },

    // ═══════════════════════════════════════════════════════════
    // ESSENTIAL OILS (Tulsi, Lemongrass, Menthol) - Requested Order
    // ═══════════════════════════════════════════════════════════
    {
        id: "oil-tulsi-10ml",
        title: "Amrit Organic Tulsi Oil - 10 ml",
        price: "₹300",
        image: "/assets/img/products/amrit_oil_tulsi_10ml_v2.png",
        category: "Essential Oils",
        description: "Sacred Tulsi essential oil. Cold-pressed & distilled.",
        slug: "tulsi-oil-10ml",
        sku: "AMRIT-OIL-006",
        featured: true,
    },
    {
        id: "oil-lemongrass-10ml",
        title: "Amrit Organic Lemongrass Oil - 10 ml",
        price: "₹400",
        image: "/assets/img/products/amrit_oil_lemongrass_10ml_v2.png",
        category: "Essential Oils",
        description: "Refreshing Lemongrass essential oil. Cold-pressed & distilled.",
        slug: "lemongrass-oil-10ml",
        sku: "AMRIT-OIL-007",
        featured: true,
    },
    {
        id: "oil-menthol-10ml",
        title: "Amrit Organic Mint Oil - 10 ml",
        price: "₹250",
        image: "/assets/img/products/amrit_oil_menthol_10ml_v2.png",
        category: "Essential Oils",
        description: "Cooling Mint essential oil. Cold-pressed & distilled.",
        slug: "menthol-oil-10ml",
        sku: "AMRIT-OIL-008",
        featured: true,
    },

    // ═══════════════════════════════════════════════════════════
    // HONEY (Moved up, between Essential and Cooking Oils)
    // ═══════════════════════════════════════════════════════════
    {
        id: "honey-multiflora-1kg",
        title: "Amrit Organic Multiflora Honey - 1 kg",
        price: "₹1200",
        image: "/assets/img/products/premium_multiflora_honey.png",
        category: "Honey",
        description: "Pure Multiflora honey collected from diverse forest flowers.",
        slug: "multiflora-honey-1kg",
        sku: "AMRIT-HONEY-001",
        featured: true,
        badge: "Raw & Pure",
    },
    {
        id: "honey-jamun-1kg",
        title: "Amrit Organic Jamun Honey - 1 kg",
        price: "₹1200",
        image: "/assets/img/products/premium_jamun_honey.png",
        category: "Honey",
        description: "Medicinal honey from Jamun flower nectar. Good for diabetics.",
        slug: "jamun-honey-1kg",
        sku: "AMRIT-HONEY-002",
        featured: true,
    },

    // ═══════════════════════════════════════════════════════════
    // COOKING OILS (Standard Wood Pressed)
    // ═══════════════════════════════════════════════════════════
    {
        id: "oil-yellow-mustard-1l",
        title: "Amrit Organic Yellow Mustard Oil - 1 L",
        price: "₹380",
        image: "/assets/img/products/premium_mustard_oil.png",
        category: "Cold-Pressed Oils",
        description: "Cold-pressed Yellow Mustard oil (Kacchi Ghani).",
        slug: "yellow-mustard-oil-1l",
        sku: "AMRIT-OIL-001",
        featured: true,
    },
    {
        id: "oil-black-mustard-1l",
        title: "Amrit Organic Black Mustard Oil - 1 L",
        price: "₹350",
        image: "/assets/img/products/premium_mustard_oil.png",
        category: "Cold-Pressed Oils",
        description: "Cold-pressed Black Mustard oil, pungent and pure.",
        slug: "black-mustard-oil-1l",
        sku: "AMRIT-OIL-002",
        featured: true,
    },
    {
        id: "oil-groundnut-1l",
        title: "Amrit Organic Groundnut Oil - 1 L",
        price: "₹600",
        image: "/assets/img/products/amrit_oil_groundnut_1l_v2.png",
        category: "Cold-Pressed Oils",
        description: "Cold-pressed Groundnut oil, rich in flavor.",
        slug: "groundnut-oil-1l-premium",
        sku: "AMRIT-OIL-003",
        featured: true,
    },
    {
        id: "oil-coconut-1l",
        title: "Amrit Organic Coconut Oil - 1 L",
        price: "₹1000",
        image: "/assets/img/products/premium_coconut_oil_v2.png",
        category: "Cold-Pressed Oils",
        description: "Pure cold-pressed Coconut oil for cooking and care.",
        slug: "coconut-oil-1l-premium",
        sku: "AMRIT-OIL-004",
        featured: true,
    },
    {
        id: "oil-sesame-1l",
        title: "Amrit Organic Sesame (Til) Oil - 1 L",
        price: "₹800",
        image: "/assets/img/products/amrit_oil_sesame_1l_v2.png",
        category: "Cold-Pressed Oils",
        description: "Cold-pressed Sesame (Til) oil.",
        slug: "sesame-til-oil-1l",
        sku: "AMRIT-OIL-005",
        featured: true,
    },

    // ═══════════════════════════════════════════════════════════
    // OTHER PRODUCTS
    // ═══════════════════════════════════════════════════════════
    {
        id: "turmeric-1kg",
        title: "Amrit Organic Turmeric - 1 kg",
        price: "₹900",
        image: "/assets/img/products/premium_turmeric_powder.png",
        category: "Other",
        description: "High-curcumin Organic Turmeric powder.",
        slug: "organic-turmeric-1kg",
        sku: "AMRIT-MISC-001",
    },

    // ═══════════════════════════════════════════════════════════
    // A2 DAIRY
    // ═══════════════════════════════════════════════════════════
    {
        id: "milk-gir-1l",
        title: "Amrit Milk Organic A2 Gir Cow Milk - 1 L",
        price: "₹125",
        regularPrice: "₹140",
        image: "/assets/img/products/amrit_milk_gir_1l_v2.png",
        category: "Dairy",
        description:
            "Pure A2 beta-casein milk from indigenous Desi Gir cows. High nutritional value.",
        slug: "a2-gir-cow-milk-1l",
        sku: "AMRIT-DAIRY-001",
        subscription: true,
    },
    {
        id: "milk-sahiwal-1l",
        title: "Amrit Milk Organic A2 Sahiwal Cow Milk - 1 L",
        price: "₹95",
        image: "/assets/img/products/amrit_milk_sahiwal_1l_v2.png",
        category: "Dairy",
        description: "Fresh A2 milk from Sahiwal breed cows.",
        slug: "a2-sahiwal-cow-milk-1l",
        sku: "AMRIT-DAIRY-002",
        subscription: true,
    },
    {
        id: "milk-buffalo-1l",
        title: "Amrit Milk Organic A2 Buffalo Milk - 1 L",
        price: "₹110",
        image: "/assets/img/products/amrit_milk_buffalo_1l_v2.png",
        category: "Dairy",
        description: "Rich and creamy A2 Buffalo milk.",
        slug: "a2-buffalo-milk-1l",
        sku: "AMRIT-DAIRY-003",
        subscription: true,
    },
    {
        id: "milk-colostrum-1l",
        title: "Amrit Milk Organic A2 Colostrum Milk - 1 L",
        price: "₹150",
        image: "/assets/img/products/amrit_milk_colostrum_1l_v2.png",
        category: "Dairy",
        description: "Immunity-boosting first milk (Colostrum) from A2 cows.",
        slug: "a2-colostrum-milk-1l",
        sku: "AMRIT-DAIRY-004",
    },
    {
        id: "paneer-1kg",
        title: "Amrit Milk Organic Paneer - 1 kg",
        price: "₹500",
        image: "/assets/img/products/a2desicowmilkpaneer.png",
        category: "Dairy",
        description: "Freshly made Malai Paneer from A2 milk.",
        slug: "a2-paneer-1kg",
        sku: "AMRIT-DAIRY-006",
    },
    {
        id: "curd-1kg",
        title: "Amrit Milk Organic Curd - 1 kg",
        price: "₹200",
        image: "/assets/img/products/amrit_curd_premium.png",
        category: "Dairy",
        description: "Thick, probiotic-rich Curd made from A2 milk.",
        slug: "a2-curd-1kg",
        sku: "AMRIT-DAIRY-007",
        subscription: true,
    },
    {
        id: "khoya-1kg",
        title: "Amrit Milk Organic Khoya - 1 kg",
        price: "₹600",
        image: "/assets/img/products/amrit_khoya_1kg.png",
        category: "Dairy",
        description: "Pure milk solids (Khoya) for traditional sweets.",
        slug: "a2-khoya-1kg",
        sku: "AMRIT-DAIRY-008",
    },

    // ═══════════════════════════════════════════════════════════
    // FLOUR (ATTA)
    // ═══════════════════════════════════════════════════════════
    {
        id: "atta-wheat-1kg",
        title: "Amrit Organic Whole Wheat Atta - 1 kg",
        price: "₹60",
        image: "/assets/img/products/amrit_atta_wheat_1kg.png",
        category: "Atta",
        description: "Stone-ground whole wheat flour.",
        slug: "whole-wheat-atta-1kg",
        sku: "AMRIT-ATTA-001",
        subscription: true,
    },
    {
        id: "atta-multigrain-1kg",
        title: "Amrit Organic Multigrain Atta - 1 kg",
        price: "₹120",
        image: "/assets/img/products/amrit_atta_multigrain_1kg.png",
        category: "Atta",
        description: "Nutritious blend of multiple grains.",
        slug: "multigrain-atta-1kg",
        sku: "AMRIT-ATTA-002",
    },
    {
        id: "atta-corn-1kg",
        title: "Amrit Organic Corn Flour - 1 kg",
        price: "₹120",
        image: "/assets/img/products/amrit_atta_corn_1kg.png",
        category: "Atta",
        description: "Pure yellow corn flour.",
        slug: "corn-flour-1kg",
        sku: "AMRIT-ATTA-003",
    },
    {
        id: "atta-bajra-1kg",
        title: "Amrit Organic Bajra Flour - 1 kg",
        price: "₹120",
        image: "/assets/img/products/amrit_atta_bajra_1kg.png",
        category: "Atta",
        description: "Traditional pearl millet (Bajra) flour.",
        slug: "bajra-flour-1kg",
        sku: "AMRIT-ATTA-004",
    },
    {
        id: "atta-besan-1kg",
        title: "Amrit Organic Besan & Sattu - 1 kg",
        price: "₹200",
        image: "/assets/img/products/amrit_atta_besan_1kg.png",
        category: "Atta",
        description: "Pure Gram flour (Besan) and roasted gram flour (Sattu).",
        slug: "besan-sattu-1kg",
        sku: "AMRIT-ATTA-005",
    },
    {
        id: "grains-millet-1kg",
        title: "Amrit Organic Millet Grains - 1 kg",
        price: "₹250",
        image: "/assets/img/products/amrit_grains_millet_1kg.png",
        category: "Atta",
        description: "Assorted ancient millet grains.",
        slug: "millet-grains-1kg",
        sku: "AMRIT-ATTA-006",
    },

    // ═══════════════════════════════════════════════════════════
    // RICE
    // ═══════════════════════════════════════════════════════════
    {
        id: "rice-kala-jeera-1kg",
        title: "Amrit Organic Kala Jeera Rice - 1 kg",
        price: "₹100",
        image: "/assets/img/products/amrit_rice_kala_jeera_1kg.png",
        category: "Rice",
        description: "Aromatic small-grain Kala Jeera rice.",
        slug: "kala-jeera-rice-1kg",
        sku: "AMRIT-RICE-001",
    },
    {
        id: "rice-low-sugar-1kg",
        title: "Amrit Organic Kala Jeera Low-Sugar Rice - 1 kg",
        price: "₹120",
        image: "/assets/img/products/amrit_rice_kala_jeera_1kg.png",
        category: "Rice",
        description: "Diabetes-friendly low-sugar Kala Jeera rice.",
        slug: "kala-jeera-low-sugar-1kg",
        sku: "AMRIT-RICE-002",
    },
    {
        id: "rice-basmati-1kg",
        title: "Amrit Organic Premium Basmati Rice - 1 kg",
        price: "₹185",
        image: "/assets/img/products/amrit_rice_basmati_1kg.png",
        category: "Rice",
        description: "Long-grain aged premium Basmati rice.",
        slug: "premium-basmati-rice-1kg",
        sku: "AMRIT-RICE-003",
    },
    {
        id: "rice-kala-namak-1kg",
        title: "Amrit Organic Kala Namak Rice - 1 kg",
        price: "₹350",
        image: "/assets/img/products/amrit_rice_kala_namak_1kg.png",
        category: "Rice",
        description: "Buddha's gift - highly aromatic and nutritious Kala Namak rice.",
        slug: "kala-namak-rice-1kg",
        sku: "AMRIT-RICE-004",
    },

    // ═══════════════════════════════════════════════════════════
    // SWEETS & JAGGERY
    // ═══════════════════════════════════════════════════════════
    {
        id: "sweets-rasgulla",
        title: "Amrit Organic Rasgulla - 1 Jar",
        price: "₹450",
        image: "/assets/img/products/premium_rasgulla.png",
        category: "Sweets",
        description: "Soft and spongy Rasgullas made from A2 milk paneer.",
        slug: "rasgulla-jar",
        sku: "AMRIT-SWEET-001",
    },
    {
        id: "jaggery-bites-500g",
        title: "Amrit Organic Jaggery Bites (Desi Chocolate Style) - 500g",
        price: "₹110",
        image: "/assets/img/products/premium_jaggery_bites.png",
        category: "Sweets",
        description: "Healthy jaggery bites, a natural substitute for chocolates.",
        slug: "jaggery-bites-500g",
        sku: "AMRIT-SWEET-002",
    },
    {
        id: "jaggery-1kg",
        title: "Amrit Organic Jaggery - 1 kg",
        price: "₹150",
        image: "/assets/img/products/premium_jaggery_bites.png",
        category: "Sweets",
        description: "Pure chemical-free Organic Jaggery.",
        slug: "jaggery-1kg-pure",
        sku: "AMRIT-SWEET-003",
    },

    // ═══════════════════════════════════════════════════════════
    // WELLNESS / PERSONAL CARE
    // ═══════════════════════════════════════════════════════════
    {
        id: "lip-balm",
        title: "Amrit Organic Lip Balm (Moisturizer)",
        price: "₹300",
        image: "/assets/img/products/amrit_lip_balm.png",
        category: "Wellness",
        description: "Natural moisturizing Lip Balm.",
        slug: "lip-balm-moisturizer",
        sku: "AMRIT-WELL-001",
    },
    {
        id: "bees-wax",
        title: "Amrit Organic Bees Wax (Moisturizer)",
        price: "₹500",
        image: "/assets/img/products/amrit_bees_wax.png",
        category: "Wellness",
        description: "Pure Bees Wax for skin hydration.",
        slug: "bees-wax-moisturizer",
        sku: "AMRIT-WELL-002",
    },
    {
        id: "bull-balm-rollon",
        title: "Amrit Organic Bull Balm Roll-On (10ml)",
        price: "₹225",
        image: "/assets/img/products/premium_bull_balm.png",
        category: "Wellness",
        description: "Ancient formula for pain relief in a handy roll-on.",
        slug: "bull-balm-rollon",
        sku: "AMRIT-WELL-003",
    },
    {
        id: "bull-balm-spray",
        title: "Amrit Organic Bull Balm Spray (10ml)",
        price: "₹250",
        image: "/assets/img/products/premium_bull_balm.png",
        category: "Wellness",
        description: "Targeted pain relief spray.",
        slug: "bull-balm-spray",
        sku: "AMRIT-WELL-004",
    },
    {
        id: "bull-balm-dropper",
        title: "Amrit Organic Bull Balm Dropper (10ml)",
        price: "₹290",
        image: "/assets/img/products/premium_bull_balm.png",
        category: "Wellness",
        description: "Concentrated formula for deep tissue relief.",
        slug: "bull-balm-dropper",
        sku: "AMRIT-WELL-005",
    },

    // ═══════════════════════════════════════════════════════════
    // COW-BASED (GAU SEVA)
    // ═══════════════════════════════════════════════════════════
    {
        id: "cow-manure-1kg",
        title: "Amrit Organic Cow Manure - 1 kg",
        price: "₹30",
        image: "/assets/img/products/premium_cow_based_products.png",
        category: "Gau Seva",
        description: "Organic manure from Desi Gir cows for your garden.",
        slug: "cow-manure-1kg",
        sku: "AMRIT-GAU-001",
    },
    {
        id: "cow-dung-cakes-2pcs",
        title: "Amrit Organic Upla (Cow Dung Cakes) - 2 pcs",
        price: "₹100",
        image: "/assets/img/products/amrit_cow_dung_upla.png",
        category: "Gau Seva",
        description: "Traditionally dried Cow Dung cakes for rituals and fuel.",
        slug: "cow-dung-cakes-2pcs",
        sku: "AMRIT-GAU-002",
    },
    {
        id: "gaumutra-1l",
        title: "Amrit Organic Gaumutra - 1 L",
        price: "₹100",
        image: "/assets/img/products/premium_cow_based_products.png",
        category: "Gau Seva",
        description: "Distilled Gaumutra for spiritual and medicinal use.",
        slug: "gaumutra-1l",
        sku: "AMRIT-GAU-003",
    },
];

export const categories = [
    { id: "all", label: "All Products", icon: "LayoutGrid" },
    { id: "vedic-essentials", label: "Ghee & Vedic Essentials", icon: "Utensils" }, // Ghee + Honey
    { id: "cold-pressed-oils", label: "Cold-Pressed Oils", icon: "Droplet" },
    { id: "essential-oils", label: "Essential Oils", icon: "Sparkles" },
    { id: "honey", label: "Raw Honey", icon: "Hexagon" },
    { id: "dairy", label: "A2 Dairy", icon: "Milk" },
    { id: "atta", label: "Wheats & Flours", icon: "Wheat" },
    { id: "rice", label: "Rice & Grains", icon: "Leaf" },
    { id: "wellness", label: "Wellness", icon: "Package" },
] as const;
