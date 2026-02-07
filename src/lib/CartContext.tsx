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
import { type CartItem, parsePrice } from "./cart-utils";
import { trackAddToCart } from "./analytics";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
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
        // Track add to cart conversion
        trackAddToCart({
            id: item.id,
            name: item.title || "Product",
            price: parsePrice(item.price || "0"),
            category: item.category,
            quantity: 1,
        });

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
        async (code: string) => {
            try {
                const res = await fetch("/api/coupons/validate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code, cartTotal }),
                });

                const data = await res.json();

                if (data.valid) {
                    setCouponCode(code.toUpperCase());
                    setDiscountAmount(data.discount);
                    localStorage.setItem("amrit-coupon", code.toUpperCase()); // Persist
                    return { success: true, message: data.message };
                } else {
                    // Start fresh if invalid
                    setCouponCode(null);
                    setDiscountAmount(0);
                    localStorage.removeItem("amrit-coupon");
                    return { success: false, message: data.message };
                }
            } catch (err) {
                console.error("Coupon check failed", err);
                return { success: false, message: "Failed to validate coupon" };
            }
        },
        [cartTotal]
    );

    const removeCoupon = useCallback(() => {
        setCouponCode(null);
        setDiscountAmount(0);
        localStorage.removeItem("amrit-coupon");
    }, []);

    // Re-validate coupon when cart total changes (e.g. items added/removed)
    useEffect(() => {
        if (couponCode && mounted) {
            // We need to re-verify in case the new total invalidates the coupon (e.g. min order)
            // Debounce this slightly to avoid spamming API on rapid clicks?
            // For now, simple re-check
            const revalidate = async () => {
                try {
                    const res = await fetch("/api/coupons/validate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ code: couponCode, cartTotal }),
                    });
                    const data = await res.json();
                    if (data.valid) {
                        setDiscountAmount(data.discount);
                    } else {
                        // Silently remove if no longer valid (or create toast?)
                        // For user experience, maybe better to keep it but show 0 discount?
                        // But logic says: invalid.
                        setDiscountAmount(0);
                        // Optional: setCouponCode(null) if strict.
                    }
                } catch (e) {
                    console.error("Revalidation failed");
                }
            };
            revalidate();
        }
    }, [cartTotal, couponCode, mounted]);

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
