"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import { Check, MapPin, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubscriptionPlanSelector } from "@/components/shop/SubscriptionPlanSelector";

export default function MilkProductPage({ params }: { params: { slug: string } }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [showSubscription, setShowSubscription] = useState(false);

    // This would come from your getProductBySlug function
    const product = {
        id: "milk-gir-1l",
        title: "Amrit Milk Organic A2 Gir Cow Milk - 1 L",
        price: 125,
        regularPrice: 140,
        image: "/assets/img/products/amrit_milk_gir_1l_v2.png",
        description: "Pure A2 beta-casein milk from indigenous Desi Gir cows",
        subscription: true,
    };

    const handleSubscribe = async (frequency: string) => {
        // Get customer details (from checkout or user profile)
        const customerDetails = {
            name: "Customer Name", // Get from auth/form
            email: "customer@example.com",
            phone: "9876543210",
            address: "123 Street Name",
            city: "Lucknow",
            state: "Uttar Pradesh",
            zip: "226001",
        };

        const response = await fetch("/api/subscriptions/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: product.id,
                productName: product.title,
                quantity: 1,
                price: product.price,
                frequency,
                customerName: customerDetails.name,
                customerEmail: customerDetails.email,
                customerPhone: customerDetails.phone,
                billingAddress: customerDetails.address,
                billingCity: customerDetails.city,
                billingState: customerDetails.state,
                billingZip: customerDetails.zip,
                startDate: new Date().toISOString().split("T")[0],
            }),
        });

        const data = await response.json();

        if (data.success) {
            // Submit encrypted data to CCAvenue
            const form = document.createElement("form");
            form.method = "POST";
            form.action = data.ccavenueUrl;

            const encDataInput = document.createElement("input");
            encDataInput.name = "encRequest";
            encDataInput.value = data.encryptedData;
            form.appendChild(encDataInput);

            const accessCodeInput = document.createElement("input");
            accessCodeInput.name = "access_code";
            accessCodeInput.value = data.accessCode;
            form.appendChild(accessCodeInput);

            document.body.appendChild(form);
            form.submit();
        }
    };

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: String(product.price),
            image: product.image,
            slug: params.slug,
            category: "Dairy",
            description: product.description,
            sku: "AMRIT-DAIRY-001",
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <main className="min-h-screen bg-creme dark:bg-midnight pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Lucknow Only Banner */}
                <div className="mb-8 p-4 bg-gradient-to-r from-terracotta/20 to-gold/20 dark:from-terracotta/10 dark:to-gold/10 rounded-xl border border-terracotta/30 dark:border-gold/30">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-terracotta dark:text-gold" />
                        <p className="text-sm font-semibold text-espresso dark:text-ivory">
                            Fresh Daily Delivery in Lucknow Only | Join 700+ Families
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-white dark:bg-midnight-mid rounded-2xl p-8 border border-creme-dark dark:border-glass-border">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Product Details */}
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                            {product.title}
                        </h1>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-bold text-terracotta dark:text-gold">
                                ₹{product.price}
                            </span>
                            {product.regularPrice && (
                                <span className="text-lg text-espresso/40 dark:text-ivory/40 line-through">
                                    ₹{product.regularPrice}
                                </span>
                            )}
                        </div>

                        <p className="text-espresso/80 dark:text-ivory/80 mb-8">
                            {product.description}
                        </p>

                        {/* Tab Selector */}
                        <div className="flex gap-2 mb-6 border-b border-creme-dark dark:border-glass-border">
                            <button
                                onClick={() => setShowSubscription(false)}
                                className={`px-4 py-2 font-semibold transition-colors border-b-2 ${!showSubscription
                                        ? "border-terracotta dark:border-gold text-terracotta dark:text-gold"
                                        : "border-transparent text-espresso/60 dark:text-ivory/60"
                                    }`}
                            >
                                One-Time Purchase
                            </button>
                            <button
                                onClick={() => setShowSubscription(true)}
                                className={`px-4 py-2 font-semibold transition-colors border-b-2 ${showSubscription
                                        ? "border-terracotta dark:border-gold text-terracotta dark:text-gold"
                                        : "border-transparent text-espresso/60 dark:text-ivory/60"
                                    }`}
                            >
                                Subscribe & Save
                            </button>
                        </div>

                        {/* Conditional Content */}
                        {showSubscription ? (
                            <SubscriptionPlanSelector
                                productId={product.id}
                                productName={product.title}
                                price={product.price}
                                onSubscribe={handleSubscribe}
                            />
                        ) : (
                            <Button
                                onClick={handleAddToCart}
                                className="w-full bg-terracotta dark:bg-gold text-white dark:text-midnight hover:bg-terracotta-dark dark:hover:bg-gold/90"
                            >
                                {added ? (
                                    <>
                                        <Check className="w-5 h-5 mr-2" />
                                        Added to Cart!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        Add to Cart
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
