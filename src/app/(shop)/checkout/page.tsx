"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { useCart } from "@/lib/CartContext";
import { products } from "@/lib/products";
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Lock,
    MapPin,
    ShieldCheck,
    Wallet,
} from "lucide-react";
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
    const { cart, cartTotal, clearCart } = useCart();
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
    }, [searchParams]);

    useEffect(() => {
        // Load saved address
        const saved = localStorage.getItem("amrit-address");
        if (saved) {
            try {
                setFormData(JSON.parse(saved));
            } catch (e) {}
        }
    }, []);

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
            // Scroll to top to show error
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
                subtotal: cartTotal,
                deliveryFee: 0,
                total: cartTotal,
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
                // COD - order is already created, redirect to success
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
                    amount: cartTotal,
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
                // If CCAvenue fails, suggest COD
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

            // Clear cart before redirecting (order is saved)
            clearCart();

            // Set CCAvenue data to trigger form submission
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

    // If we have CCAvenue data, render the hidden form with a nice loading screen
    if (ccavenueData) {
        return (
            <main className="bg-creme dark:bg-midnight min-h-screen flex items-center justify-center">
                <div className="text-center space-y-6 animate-fade-in-up">
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
                            Connecting to Payment Gateway
                        </p>
                    </div>
                    <CCavenueForm {...ccavenueData} />
                </div>
            </main>
        );
    }

    if (cart.length === 0 && !loading) {
        return (
            <main className="bg-creme dark:bg-midnight min-h-screen flex items-center justify-center">
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
        <main className="bg-creme/30 dark:bg-midnight min-h-screen pb-20 transition-colors duration-500">
            <Section className="pt-8">
                <div className="max-w-7xl mx-auto">
                    {/* Simplified Header for Trust */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-creme-dark dark:border-white/10">
                        <div className="flex items-center gap-2 text-espresso dark:text-ivory font-bold text-xl uppercase tracking-widest font-serif">
                            <span className="text-gold">Amrit</span> Milk
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                            <Lock className="w-3 h-3" />
                            100% SECURE CHECKOUT
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* LEFT: FORM */}
                        <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
                            {/* Error Alert */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl flex items-start gap-3 animate-shake">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-sm">Action Required</p>
                                        <p className="text-sm">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Step 1: Contact & Shipping */}
                            <div className="bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border shadow-sm dark:shadow-none p-6 md:p-8 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3 text-espresso dark:text-ivory">
                                    <MapPin className="w-6 h-6 text-gold" />
                                    Shipping Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-espresso-light dark:text-ivory/60">
                                            Full Name
                                        </label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-espresso-light dark:text-ivory/60">
                                            Phone Number
                                        </label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                            placeholder="10-digit mobile number"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-espresso-light dark:text-ivory/60">
                                            Email Address
                                        </label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                            placeholder="For order updates"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-espresso-light dark:text-ivory/60">
                                            Street Address
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                            placeholder="House No., Building, Street Area"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-espresso-light dark:text-ivory/60">
                                            City
                                        </label>
                                        <input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-espresso-light dark:text-ivory/60">
                                            Pincode
                                        </label>
                                        <input
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-espresso-light dark:text-ivory/60">
                                            State
                                        </label>
                                        <input
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                            placeholder="e.g., Uttar Pradesh"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Payment Method */}
                            <div className="bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border shadow-sm dark:shadow-none p-6 md:p-8 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3 text-espresso dark:text-ivory">
                                    <Wallet className="w-6 h-6 text-gold" />
                                    Payment Method
                                </h2>

                                <div className="space-y-4">
                                    {/* ONLINE PAYMENT - PREFERRED */}
                                    <label
                                        className={`relative flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                                            paymentMethod === "ccavenue"
                                                ? "border-gold bg-gold/5 shadow-md scale-[1.01]"
                                                : "border-creme-dark dark:border-white/10 hover:bg-creme-light/50 dark:hover:bg-white/5"
                                        }`}
                                    >
                                        <div className="absolute -top-3 right-4 bg-gradient-to-r from-gold to-yellow-400 text-espresso text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                                            RECOMMENDED
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
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                                                    No Fees
                                                </span>
                                            </div>
                                            <p className="text-sm text-espresso-muted dark:text-ivory/60 mb-3">
                                                Use UPI (GPay, PhonePe, Paytm), Cards, or
                                                Netbanking. Instant verification.
                                            </p>

                                            {/* Payment Icons */}
                                            <div className="flex gap-2 opacity-80">
                                                {/* Simple CSS Logos/Placeholders for UPI Apps to avoid external images if not available */}
                                                <div className="h-6 px-2 bg-white border border-gray-200 rounded flex items-center text-[10px] font-bold text-indigo-600">
                                                    PhonePe
                                                </div>
                                                <div className="h-6 px-2 bg-white border border-gray-200 rounded flex items-center text-[10px] font-bold text-blue-500">
                                                    GPay
                                                </div>
                                                <div className="h-6 px-2 bg-white border border-gray-200 rounded flex items-center text-[10px] font-bold text-blue-800">
                                                    Paytm
                                                </div>
                                                <div className="h-6 px-2 bg-white border border-gray-200 rounded flex items-center text-[10px] font-bold text-gray-600">
                                                    UPI
                                                </div>
                                                <div className="h-6 px-2 bg-white border border-gray-200 rounded flex items-center text-[10px] font-bold text-orange-500">
                                                    Cards
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* COD */}
                                    <label
                                        className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${
                                            paymentMethod === "cod"
                                                ? "border-gold bg-gold/5"
                                                : "border-creme-dark dark:border-white/10 hover:bg-creme-light/50 dark:hover:bg-white/5"
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
                                            <p className="text-sm text-espresso-muted dark:text-ivory/60">
                                                Pay comfortably with cash when you receive your
                                                order.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: SUMMARY */}
                        <div className="lg:col-span-5 animate-fade-in-up delay-200">
                            <div className="bg-white dark:bg-glass-bg border border-creme-dark dark:border-glass-border shadow-lg dark:shadow-card-dark rounded-2xl p-8 sticky top-24 transition-all duration-300">
                                <h3 className="text-2xl font-serif font-bold mb-6 text-espresso dark:text-ivory border-b border-creme-dark pb-4">
                                    In Your Bag
                                </h3>

                                <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map((item) => {
                                        // Find fresh product data to get the latest image
                                        const product =
                                            products.find((p) => p.id === item.id) ||
                                            products.find((p) => p.title === item.title);
                                        const displayImage = product?.image || item.image;

                                        return (
                                            <div
                                                key={item.id}
                                                className="flex gap-4 items-center group"
                                            >
                                                <div
                                                    className="w-16 h-16 rounded-lg bg-cover bg-center bg-creme-light dark:bg-midnight-mid border border-transparent group-hover:border-gold/30 transition-all"
                                                    style={{
                                                        backgroundImage: `url(${displayImage})`,
                                                    }}
                                                ></div>

                                                <div className="flex-1">
                                                    <h4 className="font-bold text-sm text-espresso dark:text-ivory line-clamp-1">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-xs text-espresso-muted dark:text-ivory/60">
                                                        Qty: {item.quantity} x {item.price}
                                                    </p>
                                                </div>
                                                <div className="font-bold text-gold">
                                                    ₹
                                                    {(
                                                        parseFloat(
                                                            item.price.replace(/[₹,]/g, "")
                                                        ) * item.quantity
                                                    ).toFixed(0)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="space-y-3 py-6 border-t border-creme-dark dark:border-white/10 bg-creme/20 -mx-8 px-8">
                                    <div className="flex justify-between text-espresso-light dark:text-ivory/80 text-sm">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-espresso-light dark:text-ivory/80 text-sm">
                                        <span>Delivery</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-espresso dark:text-ivory pt-2">
                                        <span>To Pay</span>
                                        <span className="text-gold">₹{cartTotal.toFixed(0)}</span>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full shadow-gold hover:shadow-gold-hover transition-all duration-300 mt-4 h-12 text-lg"
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
                                            <ArrowLeft className="w-4 h-4 rotate-180" />
                                        </span>
                                    ) : (
                                        "Place COD Order"
                                    )}
                                </Button>

                                <p className="text-center text-xs text-espresso-muted dark:text-ivory/50 mt-4 leading-relaxed">
                                    By placing this order, you agree to our Terms of Service and
                                    Privacy Policy.
                                </p>

                                {/* Security Footer */}
                                <div className="mt-6 pt-6 border-t border-creme-dark dark:border-white/10 flex items-center justify-center gap-4 opacity-70">
                                    <div className="flex items-center gap-1 text-[10px] text-espresso uppercase font-bold">
                                        <ShieldCheck className="w-4 h-4 text-green-600" />
                                        SSL Encrypted
                                    </div>
                                    <div className="w-px h-4 bg-gray-300"></div>
                                    <div className="flex items-center gap-1 text-[10px] text-espresso uppercase font-bold">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                        Buyer Protection
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense
            fallback={
                <main className="bg-creme dark:bg-midnight min-h-screen flex items-center justify-center">
                    <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full"></div>
                </main>
            }
        >
            <CheckoutContent />
        </Suspense>
    );
}
