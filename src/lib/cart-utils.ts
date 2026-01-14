import { Product, products } from "./products";

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------
export type CartItem = Product & {
    quantity: number;
    category: string;
    regularPrice?: string;
    isSubscription?: boolean; // New feature: frequency toggle
};

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------
export const FREE_DELIVERY_THRESHOLD = 500; // ₹500 for free delivery
export const DELIVERY_FEE = 40; // ₹40 standard fee

// ----------------------------------------------------------------------
// LOGIC: Cross-Sell Engine (Association Rules)
// ----------------------------------------------------------------------
export function getCrossSellRecommendations(cartItems: CartItem[]): Product[] {
    // 1. Get IDs of items currently in cart to avoid recommending them
    const cartIds = new Set(cartItems.map((item) => item.id));

    // 2. Identify categories present in cart
    const hasDairy = cartItems.some((item) => item.category === "Dairy");
    const hasAtta = cartItems.some((item) => item.category === "Atta");
    const hasHoney = cartItems.some((item) => item.category === "Honey");

    const recommendations: Product[] = [];

    // 3. Rule Engine

    // Rule A: Milk -> Needs Cookies (Sweets) or Bread (Atta) or Honey
    if (hasDairy) {
        const sweets = products.find((p) => p.category === "Sweets" && !cartIds.has(p.id));
        if (sweets) recommendations.push(sweets);

        const honey = products.find((p) => p.category === "Honey" && !cartIds.has(p.id));
        if (honey) recommendations.push(honey);
    }

    // Rule B: Atta -> Needs Ghee or Healthy Oils
    if (hasAtta) {
        const ghee = products.find((p) => p.id.includes("ghee") && !cartIds.has(p.id));
        if (ghee) recommendations.push(ghee);
    }

    // Rule C: Low Value Cart (< ₹500) -> Suggest small add-ons
    const currentTotal = cartItems.reduce(
        (acc, item) => acc + parsePrice(item.price) * item.quantity,
        0
    );
    if (currentTotal < FREE_DELIVERY_THRESHOLD && currentTotal > 0) {
        // Suggest items roughly around ₹100-₹300 to help bridge the gap
        const fillers = products
            .filter((p) => {
                const price = parsePrice(p.price);
                return price > 50 && price < 300 && !cartIds.has(p.id);
            })
            .slice(0, 2);
        recommendations.push(...fillers);
    }

    // 4. Fallback: If no specific rules triggered or not enough recs, add "Featured" or "Bestsellers"
    if (recommendations.length < 2) {
        const featured = products.filter((p) => p.featured && !cartIds.has(p.id)).slice(0, 3);
        recommendations.push(...featured);
    }

    // 5. Deduplicate and return top 3-4
    const uniqueRecs = Array.from(new Set(recommendations.map((p) => p.id)))
        .map((id) => recommendations.find((p) => p.id === id)!)
        .slice(0, 4);

    return uniqueRecs;
}

// ----------------------------------------------------------------------
// UTILS
// ----------------------------------------------------------------------

export function parsePrice(priceStr: string): number {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
}

export function calculateCartTotals(cartItems: CartItem[], discountAmount: number = 0) {
    const subtotal = cartItems.reduce(
        (acc, item) => acc + parsePrice(item.price) * item.quantity,
        0
    );

    // Dynamic Free Delivery Logic
    const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
    const deliveryFee = isFreeDelivery ? 0 : DELIVERY_FEE;
    const missingForFreeDelivery = isFreeDelivery ? 0 : FREE_DELIVERY_THRESHOLD - subtotal;

    return {
        subtotal,
        deliveryFee,
        discount: discountAmount,
        total: Math.max(0, subtotal + deliveryFee - discountAmount),
        isFreeDelivery,
        missingForFreeDelivery,
        progressPercent: Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100),
    };
}
