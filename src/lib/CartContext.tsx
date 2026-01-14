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
    const applyCoupon = useCallback((code: string) => {
        const normalizedCode = code.toUpperCase().trim();

        // Simple static coupon logic for now
        if (normalizedCode === "WELCOME10") {
            // 10% discount logic could go here, for now let's say flat ₹100 or 10%
            // Let's implement 10% off for WELCOME10
            setCouponCode(normalizedCode);
            localStorage.setItem("amrit-coupon", normalizedCode);
            return { success: true, message: "Coupon applied successfully!" };
        }

        /* 
        // Example logic for calculating discount dynamically
        // ideally discount is recalculated whenever cart changes
        */

        return { success: false, message: "Invalid coupon code" };
    }, []);

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

        if (couponCode === "WELCOME10") {
            const discount = Math.round(cartTotal * 0.1); // 10% off
            setDiscountAmount(discount);
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
