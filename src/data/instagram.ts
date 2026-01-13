export interface InstagramPost {
    id: string;
    url: string;
    imageUrl: string;
    caption: string;
    likes?: number;
}

export const instagramPosts: InstagramPost[] = [
    {
        id: "1",
        url: "https://www.instagram.com/amritmilk/",
        imageUrl: "/assets/img/products/amrit_ghee_1l.png", // Fallback/Placeholder
        caption: "Pure A2 Gir Cow Ghee - The essence of tradition.",
        likes: 124,
    },
    {
        id: "2",
        url: "https://www.instagram.com/amritmilk/",
        imageUrl: "/assets/img/products/amrit_rice_basmati_1kg.png", // Fallback/Placeholder
        caption: "Harvest season at Amrit Farms. From soil to soul.",
        likes: 89,
    },
    {
        id: "3",
        url: "https://www.instagram.com/amritmilk/",
        imageUrl: "/assets/img/products/amrit_oil_mustard_1l.png", // Fallback/Placeholder
        caption: "Cold pressed mustard oil - purity you can smell.",
        likes: 56,
    },
    {
        id: "4",
        url: "https://www.instagram.com/amritmilk/",
        imageUrl: "/assets/img/products/amrit_honey_wild_500g.png", // Fallback/Placeholder
        caption: "Sweetness straight from the wild forests.",
        likes: 210,
    },
];
