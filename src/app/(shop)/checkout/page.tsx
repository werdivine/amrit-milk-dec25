"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import { calculateCartTotals, type CartItem } from "@/lib/cart-utils"; // Use the new consistent util
import { products } from "@/lib/products";
import {
    AlertCircle,
    ArrowLeft,
    Banknote,
    CheckCircle2,
    Clock,
    CreditCard,
    Lock,
    MapPin,
    ShieldCheck,
    Smartphone,
    Wallet,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// CCAvenue form component - handles redirect to CCAvenue
function CCavenueForm({
    encryptedData,
    accessCode,
    ccavenueUrl,
}: {
    encryptedData: string;
    accessCode: string;
    ccavenueUrl: string;
}) {
    useEffect(() => {
        // Auto-submit the form to CCAvenue
        const form = document.getElementById("ccavenue-form") as HTMLFormElement;
        if (form) {
            form.submit();
        }
    }, []);

    return (
        <form id="ccavenue-form" method="POST" action={ccavenueUrl} style={{ display: "none" }}>
            <input type="hidden" name="encRequest" value={encryptedData} />
            <input type="hidden" name="access_code" value={accessCode} />
        </form>
    );
}

function CheckoutContent() {
    const { cart, clearCart, discountAmount, couponCode } = useCart();

    // Enrich cart for type compatibility with cart-utils
    const enrichedCart = cart.map((item) => {
        const product = products.find((p) => p.id === item.id);
        return product ? { ...product, ...item } : item;
    }) as CartItem[];

    // Derived State
    const totals = calculateCartTotals(enrichedCart, discountAmount); // Use consistent totals logic
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // CCAvenue redirect state
    const [ccavenueData, setCcavenueData] = useState<{
        encryptedData: string;
        accessCode: string;
        ccavenueUrl: string;
    } | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
    });

    const [paymentMethod, setPaymentMethod] = useState<"ccavenue" | "cod">("ccavenue");

    // Check for payment status from URL (returned from CCAvenue)
    useEffect(() => {
        const status = searchParams.get("status");
        const message = searchParams.get("message");

        if (status === "cancelled") {
            setError("Payment was cancelled. Please try again or choose Pay on Delivery.");
        } else if (status === "failed") {
            setError(`Payment failed: ${message || "Please try again or choose Pay on Delivery."}`);
        } else if (status === "error") {
            setError("An error occurred during payment. Please try again.");
        }

        // Load saved address
        const saved = localStorage.getItem("amrit-address");
        if (saved) {
            try {
                setFormData(JSON.parse(saved));
            } catch (e) {}
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateForm = () => {
        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.address ||
            !formData.pincode
        ) {
            setError("Please fill in all required fields.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return false;
        }
        if (formData.phone.length < 10) {
            setError("Please enter a valid 10-digit phone number.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return false;
        }
        return true;
    };

    const handlePayment = async () => {
        setError(null);
        if (!validateForm()) return;

        setLoading(true);

        // Save address
        localStorage.setItem("amrit-address", JSON.stringify(formData));

        try {
            // Prepare order data
            const orderData = {
                customerName: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                items: cart,
                subtotal: totals.subtotal,
                deliveryFee: totals.deliveryFee, // Use correct delivery fee
                discount: totals.discount,
                couponCode: couponCode || undefined,
                total: totals.total,
                paymentMethod: paymentMethod,
            };

            // Step 1: Create order in database
            const orderRes = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const orderResult = await orderRes.json();

            if (!orderRes.ok) {
                console.error("Order creation failed:", orderResult);
                throw new Error(orderResult.error || "Failed to create order");
            }

            const orderId = orderResult.order.orderNumber;

            // Step 2: Process payment based on method
            if (paymentMethod === "cod") {
                clearCart();
                router.push(`/checkout/success?order_id=${orderId}`);
                return;
            }

            // Step 3: For online payment, initiate CCAvenue
            const ccavenueRes = await fetch(`/api/ccavenue/initiate?t=${Date.now()}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId,
                    amount: totals.total,
                    customerName: formData.name,
                    customerEmail: formData.email,
                    customerPhone: formData.phone,
                    billingAddress: formData.address,
                    billingCity: formData.city,
                    billingState: formData.state,
                    billingZip: formData.pincode,
                }),
            });

            const ccavenueResult = await ccavenueRes.json();

            if (!ccavenueRes.ok) {
                if (ccavenueResult.error?.includes("not configured")) {
                    setError(
                        "Online payments are currently unavailable. Please use Pay on Delivery."
                    );
                    setPaymentMethod("cod");
                } else {
                    throw new Error(ccavenueResult.error || "Failed to initiate payment");
                }
                setLoading(false);
                return;
            }

            clearCart();

            setCcavenueData({
                encryptedData: ccavenueResult.encryptedData,
                accessCode: ccavenueResult.accessCode,
                ccavenueUrl: ccavenueResult.ccavenueUrl,
            });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
            setLoading(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (ccavenueData) {
        return (
            <main className="bg-creme dark:bg-espresso-dark min-h-screen flex items-center justify-center">
                <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto relative">
                        <div className="absolute inset-0 border-4 border-gold/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                        <Lock className="absolute inset-0 m-auto w-8 h-8 text-gold" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                            Securely Redirecting...
                        </h2>
                        <p className="text-espresso-muted dark:text-ivory/60">
                            Connecting to Bank Gateway
                        </p>
                    </div>
                    <CCavenueForm {...ccavenueData} />
                </div>
            </main>
        );
    }

    if (cart.length === 0 && !loading) {
        return (
            <main className="bg-creme dark:bg-espresso-dark min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-serif font-bold text-espresso dark:text-ivory">
                        Your cart is empty
                    </h1>
                    <Button href="/products" className="mt-4">
                        Back to Shop
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-20 bg-creme dark:bg-espresso-dark transition-colors duration-500">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Simplified Header */}
                <header className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200 dark:border-white/10">
                    <Link
                        href="/cart"
                        className="flex items-center gap-2 text-stone-500 hover:text-espresso dark:text-ivory/60 dark:hover:text-ivory transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Cart
                    </Link>
                    <div className="flex items-center gap-2 text-xs font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-900/30">
                        <Lock className="w-3 h-3" />
                        100% SECURE CHECKOUT
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* LEFT: FORM */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Error Alert */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 animate-shake">
                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm">Action Required</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Step 1: Shipping Details */}
                        <div className="bg-white dark:bg-espresso border border-stone-200 dark:border-white/10 shadow-sm p-6 md:p-8 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3 text-espresso dark:text-ivory">
                                <MapPin className="w-6 h-6 text-gold" />
                                Delivery Address
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-ivory/60 ml-1">
                                        Full Name
                                    </label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-stone-400"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-ivory/60 ml-1">
                                        Phone Number
                                    </label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-stone-400"
                                        placeholder="10-digit mobile number"
                                    />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-ivory/60 ml-1">
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows={2}
                                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-stone-400"
                                        placeholder="House No., Building, Street Area"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-ivory/60 ml-1">
                                        Pincode
                                    </label>
                                    <input
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-stone-400"
                                        placeholder="e.g. 201301"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-ivory/60 ml-1">
                                        City
                                    </label>
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-stone-400"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-ivory/60 ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-stone-400"
                                        placeholder="For order tracking updates"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Payment Method */}
                        <div className="bg-white dark:bg-espresso border border-stone-200 dark:border-white/10 shadow-sm p-6 md:p-8 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3 text-espresso dark:text-ivory">
                                <Wallet className="w-6 h-6 text-gold" />
                                Payment Method
                            </h2>

                            <div className="space-y-4">
                                {/* ONLINE PAYMENT - PREFERRED */}
                                <label
                                    className={`relative flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                                        paymentMethod === "ccavenue"
                                            ? "border-gold bg-gold/5 shadow-sm ring-1 ring-gold/20"
                                            : "border-stone-200 dark:border-white/10 hover:bg-stone-50 dark:hover:bg-white/5"
                                    }`}
                                >
                                    <div className="absolute -top-3 right-4 bg-gradient-to-r from-gold to-orange-400 text-espresso text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                                        FASTEST
                                    </div>

                                    <div className="mt-1">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === "ccavenue"}
                                            onChange={() => setPaymentMethod("ccavenue")}
                                            className="w-5 h-5 accent-gold"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-lg text-espresso dark:text-ivory">
                                                Pay Online / UPI
                                            </span>
                                            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase tracking-wide">
                                                Zero Fees
                                            </span>
                                        </div>
                                        <p className="text-sm text-stone-500 dark:text-ivory/60 mb-3">
                                            Instant confirmation. Safe & Secure.
                                        </p>

                                        {/* Payment Icons */}
                                        <div className="flex gap-3 text-stone-400">
                                            <div className="flex flex-col items-center gap-1">
                                                <Smartphone className="w-6 h-6 text-espresso dark:text-ivory" />
                                                <span className="text-[9px] font-bold">UPI</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <CreditCard className="w-6 h-6 text-espresso dark:text-ivory" />
                                                <span className="text-[9px] font-bold">Cards</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <Banknote className="w-6 h-6 text-espresso dark:text-ivory" />
                                                <span className="text-[9px] font-bold">
                                                    NetBank
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </label>

                                {/* COD */}
                                <label
                                    className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${
                                        paymentMethod === "cod"
                                            ? "border-gold bg-gold/5 ring-1 ring-gold/20"
                                            : "border-stone-200 dark:border-white/10 hover:bg-stone-50 dark:hover:bg-white/5"
                                    }`}
                                >
                                    <div className="mt-1">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === "cod"}
                                            onChange={() => setPaymentMethod("cod")}
                                            className="w-5 h-5 accent-gold"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg text-espresso dark:text-ivory mb-1">
                                            Cash on Delivery
                                        </div>
                                        <p className="text-sm text-stone-500 dark:text-ivory/60">
                                            Pay with cash upon receipt.
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: SUMMARY */}
                    <div className="lg:col-span-5">
                        <div className="bg-white dark:bg-espresso border border-stone-200 dark:border-white/10 shadow-lg rounded-2xl p-6 lg:p-8 sticky top-24">
                            {/* Urgency Banner */}
                            <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 flex items-start gap-3">
                                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-bold text-blue-800 dark:text-blue-200">
                                        Order in next 4 hrs
                                    </p>
                                    <p className="text-xs text-blue-600 dark:text-blue-300">
                                        {cart.some((i) => i.category === "Dairy")
                                            ? "For guaranteed delivery by tomorrow morning."
                                            : "Standard shipping (3-5 business days)."}
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-xl font-serif font-bold mb-6 text-espresso dark:text-ivory border-b border-stone-100 dark:border-white/10 pb-4">
                                In Your Bag
                            </h3>

                            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 items-center group py-2"
                                        >
                                            <div className="relative w-14 h-14 rounded-lg bg-stone-50 overflow-hidden border border-stone-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm text-espresso dark:text-ivory line-clamp-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs text-stone-500 dark:text-ivory/60">
                                                    Qty: {item.quantity} x {item.price}
                                                </p>
                                            </div>
                                            <div className="font-bold text-espresso dark:text-ivory">
                                                {item.price}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="space-y-3 py-6 border-t border-stone-100 dark:border-white/10 bg-stone-50 dark:bg-white/5 -mx-6 px-6 lg:-mx-8 lg:px-8 mb-6">
                                <div className="flex justify-between text-stone-500 dark:text-ivory/70 text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{totals.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-stone-500 dark:text-ivory/70 text-sm">
                                    <span>Delivery</span>
                                    {totals.isFreeDelivery ? (
                                        <span className="text-green-600 font-bold bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded text-xs">
                                            FREE
                                        </span>
                                    ) : (
                                        <span>₹{totals.deliveryFee}</span>
                                    )}
                                </div>
                                {totals.discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                                        <span>Discount ({couponCode})</span>
                                        <span className="font-bold">-₹{totals.discount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xl font-bold text-espresso dark:text-ivory pt-2">
                                    <span>To Pay</span>
                                    <span className="text-gold">₹{totals.total}</span>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full shadow-gold hover:shadow-gold-hover transition-all duration-300 h-14 text-lg font-bold"
                                onClick={handlePayment}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </span>
                                ) : paymentMethod === "ccavenue" ? (
                                    <span className="flex items-center gap-2">
                                        Pay Securely
                                        <ArrowLeft className="w-5 h-5 rotate-180" />
                                    </span>
                                ) : (
                                    "Place COD Order"
                                )}
                            </Button>

                            <div className="mt-6 flex items-center justify-center gap-4 opacity-70 border-t border-stone-100 dark:border-white/10 pt-4">
                                <div className="flex items-center gap-1.5 text-[10px] text-stone-500 uppercase font-bold">
                                    <ShieldCheck className="w-4 h-4 text-green-600" />
                                    SSL Secured
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-stone-500 uppercase font-bold">
                                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                    Buyer Protection
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense
            fallback={
                <main className="bg-creme dark:bg-espresso-dark min-h-screen flex items-center justify-center">
                    <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full"></div>
                </main>
            }
        >
            <CheckoutContent />
        </Suspense>
    );
}
