export interface InstagramPost {
    id: string;
    url: string;
    imageUrl: string;
    caption: string;
    likes?: number;
    mediaType?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

export const instagramPosts: InstagramPost[] = [
    {
        id: "post_1",
        url: "https://www.instagram.com/p/DF3A3HwS9z5/",
        imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1000&auto=format&fit=crop",
        caption: "Early morning rituals at Amrit Farm. The mist, the silence, and the pure A2 milk. 🙏 #AmritMilk #OrganicFarming #Lucknow",
        likes: 1240,
        mediaType: "IMAGE"
    },
    {
        id: "post_2",
        url: "https://www.instagram.com/reel/DF1X3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1544476073-32e67ec48bc6?q=80&w=1000&auto=format&fit=crop",
        caption: "Our Gir cows grazing in open pastures. Happy cows = Healing milk. 🐄✨ #A2Milk #IndigenousBreeds #FarmLife",
        likes: 890,
        mediaType: "VIDEO"
    },
    {
        id: "post_3",
        url: "https://www.instagram.com/p/DFzL3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=1000&auto=format&fit=crop",
        caption: "The sacred Bilona method. Hand-churned with love to bring you the purest Vedic Ghee. 🍶 #BilonaGhee #VedicLiving #Purity",
        likes: 560,
        mediaType: "IMAGE"
    },
    {
        id: "post_4",
        url: "https://www.instagram.com/p/DFxJ3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
        caption: "From soil to soul. Our organic fields are thriving! 🌿 #OrganicLiving #Sustainability #FarmToFridge",
        likes: 2100,
        mediaType: "IMAGE"
    },
    {
        id: "post_5",
        url: "https://www.instagram.com/p/DFvI3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000&auto=format&fit=crop",
        caption: "Fresh harvest of mustard seeds for our cold-pressed oil. Small batches, big nutrients. 🚜 #ColdPressed #MustardOil #AmritFarms",
        likes: 745,
        mediaType: "IMAGE"
    },
    {
        id: "post_6",
        url: "https://www.instagram.com/p/DFtH3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=1000&auto=format&fit=crop",
        caption: "Traditional grains being cured in the sun. No polish, no chemicals, just nature. ☀️ #AncientGrains #NativeSeeds #Wholesome",
        likes: 320,
        mediaType: "IMAGE"
    },
    {
        id: "post_7",
        url: "https://www.instagram.com/reel/DFrG3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?q=80&w=1000&auto=format&fit=crop",
        caption: "Kids loving our natural malai paneer! Healthy snacks for the Amrit Family. 🧀❤️ #HealthyKids #OrganicPaneer #AmritFamily",
        likes: 1560,
        mediaType: "VIDEO"
    },
    {
        id: "post_8",
        url: "https://www.instagram.com/p/DFpF3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1621460249332-9cb77395066a?q=80&w=1000&auto=format&fit=crop",
        caption: "The deep forests where our Raw Wild Honey is sourced. 🐝🍯 #WildHoney #NaturalHealing #ForestNectar",
        likes: 430,
        mediaType: "IMAGE"
    },
    {
        id: "post_9",
        url: "https://www.instagram.com/p/DFnE3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=1000&auto=format&fit=crop",
        caption: "Watering our fields with rainwater we harvested last monsoon. Every drop counts. 💧🌿 #WaterConservation #SustainableFarming",
        likes: 910,
        mediaType: "IMAGE"
    },
    {
        id: "post_10",
        url: "https://www.instagram.com/p/DFlD3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1414115880398-afebc3d95efc?q=80&w=1000&auto=format&fit=crop",
        caption: "Building a future where food is medicine. Join the movement. 🌍✊ #FoodAsMedicine #AmritMilk #ReclaimingHeritage",
        likes: 3400,
        mediaType: "IMAGE"
    },
    {
        id: "post_11",
        url: "https://www.instagram.com/p/DFjC3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000&auto=format&fit=crop",
        caption: "The golden sunset at Lonapur. Our farm is our sanctuary. 🌅🐄 #FarmSunset #DreamProject #TraditionalDairy",
        likes: 670,
        mediaType: "IMAGE"
    },
    {
        id: "post_12",
        url: "https://www.instagram.com/p/DFhB3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1495570689269-d883b1224443?q=80&w=1000&auto=format&fit=crop",
        caption: "Our Sahiwal cows enjoying their organic lunch. 🥗🐮 #HappyAnimals #SahiwalCow #OrganicDairy",
        likes: 540,
        mediaType: "IMAGE"
    },
    {
        id: "post_13",
        url: "https://www.instagram.com/p/DFfA3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1511497584788-fb366360f781?q=80&w=1000&auto=format&fit=crop",
        caption: "Traditional wood pressing in action. Preserving heat-sensitive nutrients. 🪵🏺 #WoodPressedOil #TraditionalWisdom",
        likes: 280,
        mediaType: "IMAGE"
    },
    {
        id: "post_14",
        url: "https://www.instagram.com/p/DFdZ3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1589481169991-40ee02888551?q=80&w=1000&auto=format&fit=crop",
        caption: "A2 Curd as thick as cake! Traditional setting process. 🍧✨ #A2Curd #ProbioticFood #FarmToTable",
        likes: 1120,
        mediaType: "IMAGE"
    },
    {
        id: "post_15",
        url: "https://www.instagram.com/p/DFbY3z3S9z5/",
        imageUrl: "https://images.unsplash.com/photo-1469122312224-c5846569ebd1?q=80&w=1000&auto=format&fit=crop",
        caption: "Collecting native seeds for the upcoming season. Safeguarding our diversity. 🌱📂 #SeedGuardians #NativeSeeds #AmritMilk",
        likes: 450,
        mediaType: "IMAGE"
    }
];
