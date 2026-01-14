export interface Coupon {
    code: string;
    type: "percentage" | "fixed";
    value: number;
    minOrder?: number;
    description: string;
    isActive: boolean;
}

export const COUPONS: Coupon[] = [
    {
        code: "WELCOME10",
        type: "percentage",
        value: 10,
        description: "10% off on your first order",
        isActive: true,
    },
    {
        code: "AMRIT10",
        type: "percentage",
        value: 10,
        description: "Special 10% discount",
        isActive: true,
    },
    // Add new coupons here
    // {
    //     code: "FESTIVE20",
    //     type: "percentage",
    //     value: 20,
    //     minOrder: 1000,
    //     description: "Festive season offer",
    //     isActive: true,
    // }
];

export const validateCoupon = (
    code: string,
    subtotal: number
): { valid: boolean; discount: number; message: string } => {
    const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive);

    if (!coupon) {
        return { valid: false, discount: 0, message: "Invalid coupon code" };
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
        return {
            valid: false,
            discount: 0,
            message: `Minimum order of ₹${coupon.minOrder} required`,
        };
    }

    let discountAmount = 0;
    if (coupon.type === "percentage") {
        discountAmount = Math.round((subtotal * coupon.value) / 100);
    } else {
        discountAmount = coupon.value;
    }

    return { valid: true, discount: discountAmount, message: "Coupon applied successfully!" };
};
