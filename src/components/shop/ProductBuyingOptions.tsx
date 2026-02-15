"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { SubscriptionPlanSelector } from "@/components/shop/SubscriptionPlanSelector";
import { ShareButton } from "@/components/shop/ShareButton";
import { Heart } from "lucide-react";

interface Variant {
    title: string;
    price: number | string;
    regularPrice?: number | string;
    sku?: string;
    subscription?: boolean;
}

interface ProductBuyingOptionsProps {
    product: {
        id: string;
        title: string;
        price: number | string;
        regularPrice?: number | string;
        image: string;
        slug: string;
        category: string;
        description: string;
        sku?: string;
        variants?: Variant[];
    };
}

export function ProductBuyingOptions({ product }: ProductBuyingOptionsProps) {
    const [showSubscription, setShowSubscription] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

    // Initialize variant on load
    useEffect(() => {
        if (product.variants && product.variants.length > 0) {
            setSelectedVariant(product.variants[0]);
        }
    }, [product]);

    // Helper to parse price string/number to number
    const getPriceValue = (price: string | number | undefined) => {
        if (!price) return 0;
        if (typeof price === "number") return price;
        return parseInt(String(price).replace(/[^0-9.]/g, "") || "0");
    };

    const currentPrice = selectedVariant
        ? getPriceValue(selectedVariant.price)
        : getPriceValue(product.price);
    const currentRegularPrice = selectedVariant
        ? getPriceValue(selectedVariant.regularPrice)
        : getPriceValue(product.regularPrice);
    const currentSku = selectedVariant ? selectedVariant.sku : product.sku;
    const currentTitle = selectedVariant
        ? `${product.title} - ${selectedVariant.title}`
        : product.title;

    const handleSubscribe = async (frequency: string) => {
        const customerDetails = {
            name: "Customer Name", // Ideally from auth/form
            email: "customer@example.com",
            phone: "9876543210",
        };

        try {
            const response = await fetch("/api/subscriptions/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: product.id,
                    productName: currentTitle,
                    quantity: 1,
                    price: currentPrice,
                    frequency,
                    customerName: customerDetails.name,
                    customerEmail: customerDetails.email,
                    customerPhone: customerDetails.phone,
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
            } else {
                alert("Failed to initiate subscription: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Subscription error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const isSubscriptionEligible =
        selectedVariant?.subscription === true || // Trust variant flag if present
        (selectedVariant?.subscription !== false && // Otherwise check category defaults
            (product.category === "Dairy" ||
                product.title.toLowerCase().includes("milk") ||
                product.title.toLowerCase().includes("bilona ghee") ||
                product.category === "Vedic Kitchen Treasures" ||
                product.title.toLowerCase().includes("oil") ||
                product.title.toLowerCase().includes("atta") ||
                product.title.toLowerCase().includes("rice") ||
                product.title.toLowerCase().includes("honey")));

    return (
        <div className="space-y-6">
            {/* Dynamic Price Display - Moved to Context */}
            <div className="flex items-baseline gap-4 pb-4 border-b border-theme-light/30">
                <p className="text-4xl md:text-5xl font-bold text-theme-accent">₹{currentPrice}</p>
                {!!currentRegularPrice && currentRegularPrice > currentPrice && (
                    <p className="text-xl text-theme-muted line-through font-light">
                        ₹{currentRegularPrice}
                    </p>
                )}
            </div>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
                <div className="space-y-3 pt-2">
                    <span className="text-sm font-bold text-theme-primary uppercase tracking-wider">
                        Select Size / Weight
                    </span>
                    {product.variants.length === 1 ? (
                        // Single Variant Display (Non-interactive look)
                        <div className="inline-flex items-center px-4 py-2 rounded-lg bg-theme-elevated border border-theme-accent/50 text-theme-primary font-medium">
                            <span className="text-theme-muted mr-2 font-normal">Pack Size:</span>
                            {product.variants[0].title}
                        </div>
                    ) : (
                        // Multiple Variants (Selector)
                        <div className="flex flex-wrap gap-3">
                            {product.variants.map((variant, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`px-6 py-3 rounded-lg border text-base font-semibold transition-all shadow-sm ${
                                        selectedVariant?.title === variant.title
                                            ? "bg-[#4a2c2a] text-white border-[#4a2c2a] shadow-md ring-2 ring-[#4a2c2a]/20"
                                            : "bg-white text-gray-900 border-gray-300 hover:border-[#4a2c2a] hover:text-[#4a2c2a]"
                                    }`}
                                >
                                    {variant.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
                {!showSubscription ? (
                    <>
                        <AddToCartButton
                            id={product.id}
                            title={currentTitle}
                            price={String(currentPrice)}
                            image={product.image}
                            slug={product.slug}
                            category={product.category}
                            description={product.description}
                            sku={currentSku}
                        />
                        {isSubscriptionEligible && (
                            <Button
                                variant="outline"
                                onClick={() => setShowSubscription(true)}
                                className="border-terracotta text-terracotta hover:bg-terracotta/10 px-6"
                            >
                                Subscribe & Save
                            </Button>
                        )}
                    </>
                ) : (
                    <div className="w-full space-y-4 p-4 border border-terracotta/30 rounded-xl bg-terracotta/5">
                        <div className="flex justify-between items-center">
                            <h3 className="font-serif font-bold text-terracotta">
                                Subscribe & Save
                            </h3>
                            <button
                                onClick={() => setShowSubscription(false)}
                                className="text-xs text-muted-foreground hover:text-foreground underline"
                            >
                                Back to One-Time Purchase
                            </button>
                        </div>
                        <SubscriptionPlanSelector
                            productId={product.id}
                            productName={currentTitle}
                            price={currentPrice}
                            onSubscribe={handleSubscribe}
                        />
                    </div>
                )}

                <ShareButton
                    title={currentTitle}
                    text={product.description}
                    url={`https://amritmilkorganic.com/products/${product.slug}`}
                />
            </div>
        </div>
    );
}
