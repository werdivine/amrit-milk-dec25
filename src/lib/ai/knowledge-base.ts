/**
 * Amrit AI - Knowledge Base FAQs
 * Bilingual FAQ data for local RAG retrieval
 */

export interface FAQEntry {
    id: string;
    category: string;
    question_hi: string;
    question_en: string;
    answer_hi: string;
    answer_en: string;
    keywords: string[];
}

export const KNOWLEDGE_BASE: FAQEntry[] = [
    {
        id: "brand-origin",
        category: "Brand & Trust",
        question_hi: "Amrit Milk Organic ki shuruat kaise hui?",
        question_en: "How did Amrit Milk Organic start?",
        answer_hi:
            "Amrit Milk Organic ek movement hai, sirf brand nahi. Humari journey early 2000s mein chemical-free farming se shuru hui. 15 September 2016 se humne pure milk commercial operations start kiye.",
        answer_en:
            "Amrit Milk Organic is a movement, not just a brand. Our journey began in the early 2000s with chemical-free farming. On September 15, 2016, we launched commercial milk operations.",
        keywords: ["origin", "history", "shuruat", "journey", "2000", "2016", "start"],
    },
    {
        id: "farm-location",
        category: "Brand & Trust",
        question_hi: "Aapka farm kahan sthit hai?",
        question_en: "Where is your farm located?",
        answer_hi:
            "Humara farm Lucknow mein sthit hai. Address: Amrit Milk Farms, 1, Amrit Milk Marg, Lucknow, 226028, IN.",
        answer_en:
            "Our farm is located at Amrit Milk Farms, 1, Amrit Milk Marg, Lucknow, 226028, IN.",
        keywords: ["location", "farm", "address", "kahan", "lucknow", "amrit milk marg"],
    },
    {
        id: "a2-milk-definition",
        category: "Milk & Ghee",
        question_hi: "A2 milk kya hota hai?",
        question_en: "What is A2 milk?",
        answer_hi:
            "A2 milk wo doodh hai jo sirf Desi gayein deti hain jaise Gir aur Sahiwal. Isme A2 beta-casein protein hota hai jo pachane mein aasaan aur sehat ke liye faydemand hota hai.",
        answer_en:
            "A2 milk is produced by indigenous Desi cows like Gir and Sahiwal. It contains A2 beta-casein protein which is easier to digest and healthier.",
        keywords: ["a2", "milk", "doodh", "protein", "desi", "gir", "sahiwal", "digest"],
    },
    {
        id: "bilona-process",
        category: "Milk & Ghee",
        question_hi: "Bilona Ghee kya hota hai aur kaise banta hai?",
        question_en: "What is Bilona Ghee and how is it made?",
        answer_hi:
            "Bilona ek paramparik Vedic method hai. Pehle doodh ko dahi banate hain, phir us dahi ko lakdi ki mathani se mathte hain, makkhan nikalte hain, aur phir dheemi aanch par ghee banate hain.",
        answer_en:
            "Bilona is a traditional Vedic method. First milk is curdled, then churned with a wooden churner to extract butter, which is slow-cooked into ghee.",
        keywords: ["bilona", "ghee", "process", "traditional", "vedic", "making", "banata"],
    },
    {
        id: "gir-cow-benefits",
        category: "Milk & Ghee",
        question_hi: "Gir gaay ka doodh kyon special hai?",
        question_en: "Why is Gir cow milk special?",
        answer_hi:
            "Gir gaay ko 'Mother of all breeds' kaha jaata hai. Inka doodh Gold-hued aur immunity badhane wala hota hai.",
        answer_en:
            "Gir cow is called the 'Mother of all breeds'. Their milk is gold-hued and immunity-boosting.",
        keywords: ["gir", "cow", "gaay", "special", "breed", "immunity", "gold"],
    },
    {
        id: "cold-pressed-oils",
        category: "Oils & Atta",
        question_hi: "Cold-pressed oil kya hota hai?",
        question_en: "What is cold-pressed oil?",
        answer_hi:
            "Cold-pressed ya 'Kacchi Ghani' method mein tel ko bina garmi ke wooden presses se nikala jaata hai. Isse oils ke natural nutrients preserve rehte hain.",
        answer_en:
            "Cold-pressed or 'Kacchi Ghani' method extracts oil using wooden presses without heat, preserving natural nutrients.",
        keywords: ["cold pressed", "kacchi ghani", "oil", "tel", "natural", "wood"],
    },
    {
        id: "delivery-areas",
        category: "Ordering",
        question_hi: "Delivery kahan-kahan hoti hai?",
        question_en: "Where do you deliver?",
        answer_hi:
            "Fresh A2 Milk ki daily delivery SIRF LUCKNOW mein available hai. Ye bahut zaroori hai — milk delivery filhaal Lucknow ke baahar nahi hoti hai. Ghee, honey, oils aur non-perishable products pure India mein deliver hote hain.",
        answer_en:
            "Fresh A2 Milk daily delivery is available ONLY IN LUCKNOW. This is important — milk delivery is NOT available outside Lucknow. Ghee, honey, oils, and non-perishable products are delivered across India.",
        keywords: [
            "delivery",
            "location",
            "area",
            "lucknow",
            "india",
            "shipping",
            "kahan",
            "city",
            "available",
        ],
    },
    {
        id: "milk-pricing",
        category: "Ordering",
        question_hi: "Doodh ka price kya hai?",
        question_en: "What is the milk price?",
        answer_hi:
            "A2 Sahiwal Cow Milk: ₹100/L. A2 Gir Cow Milk: ₹125/L (MRP ₹140). Subscription plans: 5-Day Trial ₹500 (₹100/L × 5 days), 30-Day Plan ₹3000 (₹100/L × 30 days). One-time purchase: ₹149 + delivery charges. Daily milk delivery sirf Lucknow mein available hai.",
        answer_en:
            "A2 Sahiwal Cow Milk: ₹100/L. A2 Gir Cow Milk: ₹125/L (MRP ₹140). Subscription plans: 5-Day Trial ₹500 (₹100/L × 5 days), 30-Day Plan ₹3000 (₹100/L × 30 days). One-time purchase: ₹149 + delivery charges. Daily milk delivery is available only in Lucknow.",
        keywords: [
            "price",
            "rate",
            "cost",
            "kitna",
            "doodh",
            "milk",
            "subscription",
            "one time",
            "delivery",
        ],
    },
    {
        id: "order-process",
        category: "Ordering",
        question_hi: "Order kaise karu?",
        question_en: "How do I place an order?",
        answer_hi:
            "Website par 'Add to Cart' karein aur checkout karein. Ya WhatsApp par message karein: +91 81306 93767.",
        answer_en:
            "Select products on our website and checkout. Or message us on WhatsApp: +91 81306 93767.",
        keywords: ["order", "kaise", "how", "buy", "khareed", "cart", "whatsapp"],
    },
    {
        id: "farm-visit-booking",
        category: "Farm Visits",
        question_hi: "Kya hum farm visit kar sakte hain?",
        question_en: "Can we visit the farm?",
        answer_hi:
            "Bilkul! Hum transparency mein vishwas rakhte hain. Visit ke liye pehle appointment lena zaroori hai.",
        answer_en: "Absolutely! We believe in transparency. Prior appointment is required.",
        keywords: ["visit", "tour", "farm", "dekhna", "appointment", "booking"],
    },
    {
        id: "quality-assurance",
        category: "Safety & Ethics",
        question_hi: "Doodh ki purity ki kya guarantee hai?",
        question_en: "What is the guarantee of milk purity?",
        answer_hi:
            "Humara doodh 'Farm-to-Fork' model par aata hai. Hum har batch ki lab testing karte hain aur antibiotics ya hormones ka use nahi karte.",
        answer_en:
            "Our milk follows a 'Farm-to-Fork' model. We conduct lab testing and do not use antibiotics or hormones.",
        keywords: ["purity", "guarantee", "test", "lab", "quality", "pure"],
    },
    {
        id: "ghee-benefits",
        category: "Milk & Ghee",
        question_hi: "Desi ghee khane ke kya fayde hain?",
        question_en: "What are the benefits of eating Desi ghee?",
        answer_hi:
            "Bilona ghee digestion improve karta hai, immunity badhata hai, aur brain health ke liye beneficial hai. Ayurveda mein ise 'Rasayana' (rejuvenator) maana jaata hai.",
        answer_en:
            "Bilona ghee improves digestion, boosts immunity, and benefits brain health. In Ayurveda, it's considered 'Rasayana' (rejuvenator).",
        keywords: ["ghee", "benefits", "fayde", "health", "digestion", "immunity", "ayurveda"],
    },
    {
        id: "honey-raw-pure",
        category: "Honey",
        question_hi: "Aapka shahad pure hai ya processed?",
        question_en: "Is your honey pure or processed?",
        answer_hi:
            "Humara shahad 100% raw aur unprocessed hai. Ise chhattey se seedhe bottle mein dala jaata hai.",
        answer_en:
            "Our honey is 100% raw and unprocessed, going directly from the hive to the bottle.",
        keywords: ["honey", "shahad", "raw", "pure", "natural", "unprocessed"],
    },
    {
        id: "cow-diet",
        category: "Safety & Ethics",
        question_hi: "Aapki gaayein kya khaati hain?",
        question_en: "What do your cows eat?",
        answer_hi:
            "Humari gaayon ko sirf organic fodder diya jaata hai jo hum apne farm par hi ugate hain. Isme koi chemical pesticides ya fertilizers nahi hote. Hum unhe natural khali aur gur bhi dete hain.",
        answer_en:
            "Our cows eat only organic fodder grown on our own farm without chemical pesticides or fertilizers. We also give them natural oil cakes and jaggery.",
        keywords: ["diet", "fodder", "food", "organic", "khana", "pesticides", "fertilizer"],
    },
    {
        id: "cruelty-free-milking",
        category: "Safety & Ethics",
        question_hi: "Kya aap calves ko unka hissa dete hain?",
        question_en: "Do you give the calves their share of milk?",
        answer_hi:
            "Haan, Amrit Milk mein 'Calf First' policy hai. Pehle bachhde ko do than (udders) se pet bhar doodh pilaya jaata hai, uske baad hi bacha hua doodh hum nikaalte hain.",
        answer_en:
            "Yes, we follow a 'Calf First' policy. The calf drinks its fill from two udders first, and only then do we extract the remaining milk.",
        keywords: ["calf", "cruelty free", "milking", "bachhda", "policy", "ethical"],
    },
    {
        id: "glass-bottles",
        category: "Safety & Ethics",
        question_hi: "Aap plastic use kyun nahi karte?",
        question_en: "Why don't you use plastic bottles?",
        answer_hi:
            "Hum 100% plastic-free hain. Plastic se doodh mein toxins aa sakte hain. Isliye hum glass bottles use karte hain jo eco-friendly aur health ke liye safe hain.",
        answer_en:
            "We are 100% plastic-free. Plastic can leach toxins into milk. We use glass bottles which are eco-friendly and safe for health.",
        keywords: ["plastic", "glass", "bottle", "toxins", "eco friendly", "safety"],
    },
    {
        id: "shelf-life-milk",
        category: "Milk & Ghee",
        question_hi: "Fresh milk kitne din tak chalta hai?",
        question_en: "What is the shelf life of your fresh milk?",
        answer_hi:
            "Humara doodh bina kisi preservative ke aata hai. Fridge mein rakhne par ye 2-3 din tak fresh rehta hai. Isse ubaal kar (boil) hi use karein.",
        answer_en:
            "Our milk has no preservatives. It stays fresh for 2-3 days when refrigerated. Always boil before use.",
        keywords: ["shelf life", "fresh", "expiry", "milk", "fridge", "boil"],
    },
    {
        id: "subscription-benefits",
        category: "Ordering",
        question_hi: "Subscription ke kya fayde hain?",
        question_en: "What are the benefits of a subscription?",
        answer_hi:
            "Subscription mein milk sirf ₹100/L milta hai (one-time mein ₹149 + delivery charge lagta hai). Plans: 5-Day Trial ₹500 (prepaid), 30-Day Plan ₹3000 (prepaid, best value). Zero delivery charge, fresh milk roz subah. Subscription sirf Lucknow mein available hai.",
        answer_en:
            "Subscribe at ₹100/L vs ₹149 + delivery for one-time. Plans: 5-Day Trial ₹500 (prepaid), 30-Day Plan ₹3000 (prepaid, best value). Zero delivery charges, fresh milk every morning. Subscription is available only in Lucknow.",
        keywords: [
            "subscription",
            "benefits",
            "fayde",
            "delivery",
            "pause",
            "resume",
            "plan",
            "trial",
            "monthly",
        ],
    },
];
