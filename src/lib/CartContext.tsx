"use client";

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { type CartItem } from "./cart-utils";
import { validateCoupon } from "./coupons";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    applyCoupon: (code: string) => { success: boolean; message: string };
    removeCoupon: () => void;
    couponCode: string | null;
    discountAmount: number;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [couponCode, setCouponCode] = useState<string | null>(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const savedCart = localStorage.getItem("amrit-cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Error loading cart:", e);
            }
        }

        // Load coupon
        const savedCoupon = localStorage.getItem("amrit-coupon");
        if (savedCoupon) {
            setCouponCode(savedCoupon);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (mounted) {
            localStorage.setItem("amrit-cart", JSON.stringify(cart));
        }
    }, [cart, mounted]);

    const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
        setCart((prevCart) => {
            const existing = prevCart.find((i) => i.id === item.id);
            if (existing) {
                return prevCart.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback(
        (id: string, quantity: number) => {
            if (quantity <= 0) {
                removeFromCart(id);
                return;
            }
            setCart((prevCart) =>
                prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
            );
        },
        [removeFromCart]
    );

    const clearCart = useCallback(() => {
        console.log("CartContext: clearing cart");
        setCart([]);
    }, []);

    const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

    const cartTotal = useMemo(
        () =>
            cart.reduce((sum, item) => {
                const priceStr = String(item.price || "0");
                const price = parseFloat(priceStr.replace(/[₹,]/g, ""));
                return sum + price * item.quantity;
            }, 0),
        [cart]
    );

    // Coupon Logic
    const applyCoupon = useCallback(
        (code: string) => {
            const result = validateCoupon(code, cartTotal);
            if (result.valid) {
                setCouponCode(code.toUpperCase());
                localStorage.setItem("amrit-coupon", code.toUpperCase());
                return { success: true, message: result.message };
            }
            return { success: false, message: result.message };
        },
        [cartTotal]
    );

    const removeCoupon = useCallback(() => {
        setCouponCode(null);
        setDiscountAmount(0);
        localStorage.removeItem("amrit-coupon");
    }, []);

    // Recalculate discount whenever cart or coupon changes
    useEffect(() => {
        if (!couponCode) {
            setDiscountAmount(0);
            return;
        }

        const result = validateCoupon(couponCode, cartTotal);
        if (result.valid) {
            setDiscountAmount(result.discount);
        } else {
            // If coupon becomes invalid (e.g. cart total dropped below min), remove it?
            // For now, let's just zero it out but keep code? Or remove it.
            // Let's keep it simple: if invalid, 0 discount.
            setDiscountAmount(0);
        }
    }, [cartTotal, couponCode]);

    const value = useMemo(
        () => ({
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            applyCoupon,
            removeCoupon,
            couponCode,
            discountAmount,
            cartCount,
            cartTotal,
        }),
        [
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            applyCoupon,
            removeCoupon,
            couponCode,
            discountAmount,
            cartCount,
            cartTotal,
        ]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
