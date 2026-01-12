"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { useCart } from "@/lib/CartContext";
import { products } from "@/lib/products";
import { AlertCircle, CreditCard, Lock, Truck } from "lucide-react";
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
            return false;
        }
        if (formData.phone.length < 10) {
            setError("Please enter a valid 10-digit phone number.");
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

            console.log("Creating order with data:", orderData);

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
        }
    };

    // If we have CCAvenue data, render the hidden form
    if (ccavenueData) {
        return (
            <main className="bg-creme dark:bg-midnight min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-espresso dark:text-ivory">Redirecting to CCAvenue...</p>
                    <CCavenueForm {...ccavenueData} />
                </div>
            </main>
        );
    }

    if (cart.length === 0) {
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
        <main className="bg-creme dark:bg-midnight min-h-screen pb-20 transition-colors duration-500">
            <Section>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-gradient-gold">
                        Checkout
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* LEFT: FORM */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* Contact Info */}
                            <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 shadow-soft dark:shadow-card-dark p-8 rounded-2xl transition-all duration-300">
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2 text-espresso dark:text-ivory">
                                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">
                                        1
                                    </div>
                                    Contact Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-espresso-light dark:text-ivory/80">
                                            Full Name
                                        </label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-espresso-light dark:text-ivory/80">
                                            Phone Number
                                        </label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                            placeholder="9876543210"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-espresso-light dark:text-ivory/80">
                                            Email Address
                                        </label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 shadow-soft dark:shadow-card-dark p-8 rounded-2xl transition-all duration-300">
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2 text-espresso dark:text-ivory">
                                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">
                                        2
                                    </div>
                                    Shipping Address
                                </h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-espresso-light dark:text-ivory/80">
                                            Street Address
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                            placeholder="Flat / House No / Building, Street"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-espresso-light dark:text-ivory/80">
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
                                            <label className="text-sm font-bold text-espresso-light dark:text-ivory/80">
                                                Pincode
                                            </label>
                                            <input
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                className="w-full bg-creme-light dark:bg-midnight-mid border border-creme-dark dark:border-white/10 rounded-lg px-4 py-3 text-espresso dark:text-ivory focus:border-gold outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-espresso-light dark:text-ivory/80">
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

                            {/* Payment Method */}
                            <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 shadow-soft dark:shadow-card-dark p-8 rounded-2xl transition-all duration-300">
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2 text-espresso dark:text-ivory">
                                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">
                                        3
                                    </div>
                                    Payment Method
                                </h2>
                                <div className="space-y-4">
                                    <label
                                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === "ccavenue" ? "border-gold bg-gold/10" : "border-creme-dark dark:border-white/10 hover:bg-creme-light/50 dark:hover:bg-white/5"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === "ccavenue"}
                                            onChange={() => setPaymentMethod("ccavenue")}
                                            className="w-5 h-5 accent-gold"
                                        />
                                        <CreditCard className="w-6 h-6 text-gold" />
                                        <div className="text-espresso dark:text-ivory">
                                            <div className="font-bold">Pay Online</div>
                                            <div className="text-sm text-espresso-muted dark:text-ivory/60">
                                                CCAvenue Secure (UPI, Cards, Netbanking)
                                            </div>
                                        </div>
                                    </label>

                                    <label
                                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === "cod" ? "border-gold bg-gold/10" : "border-creme-dark dark:border-white/10 hover:bg-creme-light/50 dark:hover:bg-white/5"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === "cod"}
                                            onChange={() => setPaymentMethod("cod")}
                                            className="w-5 h-5 accent-gold"
                                        />
                                        <Truck className="w-6 h-6 text-gold" />
                                        <div className="text-espresso dark:text-ivory">
                                            <div className="font-bold">Pay on Delivery</div>
                                            <div className="text-sm text-espresso-muted dark:text-ivory/60">
                                                Pay when you receive your order
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: SUMMARY */}
                        <div className="lg:col-span-5">
                            <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 shadow-soft dark:shadow-card-dark p-8 rounded-2xl sticky top-24 transition-all duration-300">
                                <h3 className="text-2xl font-serif font-bold mb-6 text-espresso dark:text-ivory">
                                    Order Summary
                                </h3>

                                <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map((item) => {
                                        // Find fresh product data to get the latest image
                                        const product =
                                            products.find((p) => p.id === item.id) ||
                                            products.find((p) => p.title === item.title);
                                        // Fallback to item.image if not found (though it should be)
                                        const displayImage = product?.image || item.image;

                                        return (
                                            <div key={item.id} className="flex gap-4 items-center">
                                                <div
                                                    className="w-16 h-16 rounded-lg bg-cover bg-center bg-creme-light dark:bg-midnight-mid"
                                                    style={{
                                                        backgroundImage: `url(${displayImage})`,
                                                    }}
                                                ></div>
                                                {/* DEBUG: Remove after verification */}
                                                {/* <span className="text-[8px] text-red-500 absolute">{item.id} -&gt; {product ? "Found" : "Missing"}</span> */}

                                                <div className="flex-1">
                                                    <h4 className="font-bold text-sm text-espresso dark:text-ivory">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-xs text-espresso-muted dark:text-ivory/60">
                                                        Qty: {item.quantity}
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

                                <div className="space-y-4 py-6 border-t border-creme-dark dark:border-white/10">
                                    <div className="flex justify-between text-espresso-light dark:text-ivory/80">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-espresso-light dark:text-ivory/80">
                                        <span>Delivery</span>
                                        <span className="text-green-500">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-espresso dark:text-ivory">
                                        <span>Total</span>
                                        <span className="text-gold">₹{cartTotal.toFixed(0)}</span>
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg mb-6 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm">{error}</p>
                                    </div>
                                )}

                                <Button
                                    size="lg"
                                    className="w-full"
                                    onClick={handlePayment}
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Processing..."
                                        : paymentMethod === "ccavenue"
                                          ? "Pay Now"
                                          : "Place Order"}
                                </Button>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-espresso-muted dark:text-ivory/60">
                                    <Lock className="w-3 h-3" />
                                    Secure Checkout powered by CCAvenue
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
