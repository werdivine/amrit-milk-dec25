"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { ShoppingBag, Lock, CreditCard, Truck, AlertCircle } from "lucide-react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        state: ""
    });

    const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");

    useEffect(() => {
        // Load saved address
        const saved = localStorage.getItem("amrit-address");
        if (saved) {
            try {
                setFormData(JSON.parse(saved));
            } catch (e) { }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
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

        if (paymentMethod === "cod") {
            // Simulate API call for COD
            setTimeout(() => {
                router.push("/checkout/success");
            }, 1000);
            return;
        }

        try {
            // Create Order on Server
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: cartTotal, currency: "INR" })
            });

            const data = await res.json();

            if (!res.ok) {
                // Should fall back to COD if keys missing
                if (res.status === 400 && data.message?.includes("keys missing")) {
                    setError("Online payments currently unavailable. Switching to Cash on Delivery.");
                    setPaymentMethod("cod");
                    setLoading(false);
                    return;
                }
                throw new Error(data.error || "Something went wrong");
            }

            // Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "Amrit Sovereign",
                description: "Premium Dairy & Wellness",
                order_id: data.id,
                handler: function (response: any) {
                    // Payment Success
                    router.push("/checkout/success");
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: "#D4AF37" // Gold
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response: any) {
                setError("Payment Failed: " + response.error.description);
                setLoading(false);
            });
            rzp.open();
            setLoading(false);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Payment initialization failed. Try COD.");
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <main className="bg-theme-primary min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-serif font-bold text-theme-primary">Your cart is empty</h1>
                    <Button href="/products" className="mt-4">Back to Shop</Button>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-theme-primary min-h-screen pb-20 transition-colors duration-500">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <Section>
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-gradient-gold">
                        Checkout
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* LEFT: FORM */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* Contact Info */}
                            <div className="card-theme p-8 rounded-2xl transition-all duration-300">
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2 text-theme-primary">
                                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">1</div>
                                    Contact Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-theme-secondary">Full Name</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-theme-secondary border border-theme-light rounded-lg px-4 py-3 text-theme-primary focus:border-gold outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-theme-secondary">Phone Number</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-theme-secondary border border-theme-light rounded-lg px-4 py-3 text-theme-primary focus:border-gold outline-none transition-colors"
                                            placeholder="9876543210"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-theme-secondary">Email Address</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-theme-secondary border border-theme-light rounded-lg px-4 py-3 text-theme-primary focus:border-gold outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="card-theme p-8 rounded-2xl transition-all duration-300">
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2 text-theme-primary">
                                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">2</div>
                                    Shipping Address
                                </h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-theme-secondary">Street Address</label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full bg-theme-secondary border border-theme-light rounded-lg px-4 py-3 text-theme-primary focus:border-gold outline-none transition-colors"
                                            placeholder="Flat / House No / Building, Street"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-theme-secondary">City</label>
                                            <input
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="w-full bg-theme-secondary border border-theme-light rounded-lg px-4 py-3 text-theme-primary focus:border-gold outline-none transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-theme-secondary">Pincode</label>
                                            <input
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                className="w-full bg-theme-secondary border border-theme-light rounded-lg px-4 py-3 text-theme-primary focus:border-gold outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="card-theme p-8 rounded-2xl transition-all duration-300">
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2 text-theme-primary">
                                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm">3</div>
                                    Payment Method
                                </h2>
                                <div className="space-y-4">
                                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-gold bg-gold/10' : 'border-theme-light hover:bg-theme-secondary/50'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'online'}
                                            onChange={() => setPaymentMethod('online')}
                                            className="w-5 h-5 accent-gold"
                                        />
                                        <CreditCard className="w-6 h-6 text-gold" />
                                        <div className="text-theme-primary">
                                            <div className="font-bold">Pay Online</div>
                                            <div className="text-sm text-theme-muted">Razorpay Secure (UPI, Cards, Netbanking)</div>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-gold bg-gold/10' : 'border-theme-light hover:bg-theme-secondary/50'}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'cod'}
                                            onChange={() => setPaymentMethod('cod')}
                                            className="w-5 h-5 accent-gold"
                                        />
                                        <Truck className="w-6 h-6 text-gold" />
                                        <div className="text-theme-primary">
                                            <div className="font-bold">Cash on Delivery</div>
                                            <div className="text-sm text-theme-muted">Pay when you receive your order</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: SUMMARY */}
                        <div className="lg:col-span-5">
                            <div className="card-theme p-8 rounded-2xl sticky top-24 transition-all duration-300">
                                <h3 className="text-2xl font-serif font-bold mb-6 text-theme-primary">Order Summary</h3>

                                <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-center">
                                            <div
                                                className="w-16 h-16 rounded-lg bg-cover bg-center bg-theme-secondary"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm text-theme-primary">{item.title}</h4>
                                                <p className="text-xs text-theme-muted">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="font-bold text-gold">
                                                ₹{(parseFloat(item.price.replace(/[₹,]/g, '')) * item.quantity).toFixed(0)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 py-6 border-t border-theme-light">
                                    <div className="flex justify-between text-theme-secondary">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal.toFixed(0)}</span>
                                    </div>
                                    <div className="flex justify-between text-theme-secondary">
                                        <span>Delivery</span>
                                        <span className="text-green-500">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-theme-primary">
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
                                    {loading ? "Processing..." : paymentMethod === 'online' ? "Pay Now" : "Place Order"}
                                </Button>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-theme-muted">
                                    <Lock className="w-3 h-3" />
                                    Secure Checkout powered by Razorpay
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
