export interface InstagramPost {
    id: string;
    url: string;
    imageUrl: string;
    caption: string;
    likes?: number;
    mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

// Using local assets as high-quality placeholders since we cannot scrape real Instagram URLs without an API.
// These images match the brand's aesthetic.
export const instagramPosts: InstagramPost[] = [
    {
        id: "post_1",
        url: "https://www.instagram.com/p/DF3A3HwS9z5/",
        imageUrl: "/assets/img/hero-luxe-bg.png",
        caption: "Early morning rituals at Amrit Farm. The mist, the silence, and the pure A2 milk. 🙏 #AmritMilk #OrganicFarming #Lucknow",
        likes: 1240,
        mediaType: "IMAGE"
    },
    {
        id: "post_2",
        url: "https://www.instagram.com/reel/DF1X3z3S9z5/",
        imageUrl: "/assets/img/products/a2desicowgheeglassjarbilonamethod.png",
        caption: "Our Gir cows grazing in open pastures. Happy cows = Healing milk. 🐄✨ #A2Milk #IndigenousBreeds #FarmLife",
        likes: 890,
        mediaType: "IMAGE"
    },
    {
        id: "post_3",
        url: "https://www.instagram.com/p/DFzL3z3S9z5/",
        imageUrl: "/assets/img/cow-ghee.png",
        caption: "The sacred Bilona method. Hand-churned with love to bring you the purest Vedic Ghee. 🍶 #BilonaGhee #VedicLiving #Purity",
        likes: 560,
        mediaType: "IMAGE"
    },
    {
        id: "post_4",
        url: "https://www.instagram.com/p/DFxJ3z3S9z5/",
        imageUrl: "/assets/img/farm-soul.png",
        caption: "From soil to soul. Our organic fields are thriving! 🌿 #OrganicLiving #Sustainability #FarmToFridge",
        likes: 2100,
        mediaType: "IMAGE"
    },
    {
        id: "post_5",
        url: "https://www.instagram.com/p/DFvI3z3S9z5/",
        imageUrl: "/assets/img/products/premium_mustard_oil.png",
        caption: "Fresh harvest of mustard seeds for our cold-pressed oil. Small batches, big nutrients. 🚜 #ColdPressed #MustardOil #AmritFarms",
        likes: 745,
        mediaType: "IMAGE"
    },
    {
        id: "post_6",
        url: "https://www.instagram.com/p/DFtH3z3S9z5/",
        imageUrl: "/assets/img/atta-sack.png",
        caption: "Traditional grains being cured in the sun. No polish, no chemicals, just nature. ☀️ #AncientGrains #NativeSeeds #Wholesome",
        likes: 320,
        mediaType: "IMAGE"
    },
    {
        id: "post_7",
        url: "https://www.instagram.com/reel/DFrG3z3S9z5/",
        imageUrl: "/assets/img/paneer.png",
        caption: "Kids loving our natural malai paneer! Healthy snacks for the Amrit Family. 🧀❤️ #HealthyKids #OrganicPaneer #AmritFamily",
        likes: 1560,
        mediaType: "IMAGE"
    },
    {
        id: "post_8",
        url: "https://www.instagram.com/p/DFpF3z3S9z5/",
        imageUrl: "/assets/img/honey-jar.png",
        caption: "The deep forests where our Raw Wild Honey is sourced. 🐝🍯 #WildHoney #NaturalHealing #ForestNectar",
        likes: 430,
        mediaType: "IMAGE"
    },
    {
        id: "post_9",
        url: "https://www.instagram.com/p/DFnE3z3S9z5/",
        imageUrl: "/assets/img/milk-bottle.png",
        caption: "Watering our fields with rainwater we harvested last monsoon. Every drop counts. 💧🌿 #WaterConservation #SustainableFarming",
        likes: 910,
        mediaType: "IMAGE"
    },
    {
        id: "post_10",
        url: "https://www.instagram.com/p/DFlD3z3S9z5/",
        imageUrl: "/assets/img/products/amrit_ghee_premium.png",
        caption: "Building a future where food is medicine. Join the movement. 🌍✊ #FoodAsMedicine #AmritMilk #ReclaimingHeritage",
        likes: 3400,
        mediaType: "IMAGE"
    },
    {
        id: "post_11",
        url: "https://www.instagram.com/p/DFjC3z3S9z5/",
        imageUrl: "/assets/img/milk-sahiwal.png",
        caption: "The golden sunset at Lonapur. Our farm is our sanctuary. 🌅🐄 #FarmSunset #DreamProject #TraditionalDairy",
        likes: 670,
        mediaType: "IMAGE"
    },
    {
        id: "post_12",
        url: "https://www.instagram.com/p/DFhB3z3S9z5/",
        imageUrl: "/assets/img/milk-gir.png",
        caption: "Our Sahiwal cows enjoying their organic lunch. 🥗🐮 #HappyAnimals #SahiwalCow #OrganicDairy",
        likes: 540,
        mediaType: "IMAGE"
    },
    {
        id: "post_13",
        url: "https://www.instagram.com/p/DFfA3z3S9z5/",
        imageUrl: "/assets/img/coconut-oil.png",
        caption: "Traditional wood pressing in action. Preserving heat-sensitive nutrients. 🪵🏺 #WoodPressedOil #TraditionalWisdom",
        likes: 280,
        mediaType: "IMAGE"
    },
    {
        id: "post_14",
        url: "https://www.instagram.com/p/DFdZ3z3S9z5/",
        imageUrl: "/assets/img/curd.png",
        caption: "A2 Curd as thick as cake! Traditional setting process. 🍧✨ #A2Curd #ProbioticFood #FarmToTable",
        likes: 1120,
        mediaType: "IMAGE"
    },
    {
        id: "post_15",
        url: "https://www.instagram.com/p/DFbY3z3S9z5/",
        imageUrl: "/assets/img/millet-mix.png",
        caption: "Collecting native seeds for the upcoming season. Safeguarding our diversity. 🌱📂 #SeedGuardians #NativeSeeds #AmritMilk",
        likes: 450,
        mediaType: "IMAGE"
    }
];
