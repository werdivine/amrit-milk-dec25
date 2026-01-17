export interface Coupon {
    id?: string;
    code: string;
    type: "percentage" | "fixed";
    value: number;
    minOrderValue?: number;
    description?: string;
    isActive: boolean;
}

// Deprecated: Moving to Database
export const COUPONS: Coupon[] = [];

// Helper for type safety if needed on frontend, though we mostly use API return types now
export type CouponResponse = {
    valid: boolean;
    discount: number;
    message: string;
    type?: "percentage" | "fixed";
    value?: number;
};
