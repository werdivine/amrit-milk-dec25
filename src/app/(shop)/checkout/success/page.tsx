"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { useCart } from "@/lib/CartContext";
import { Check, Package } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function SuccessContent() {
    const { clearCart } = useCart();
    const searchParams = useSearchParams();

    const orderId = searchParams.get("order_id");
    const trackingId = searchParams.get("tracking_id");

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <main className="bg-creme dark:bg-midnight min-h-screen flex items-center justify-center transition-colors duration-500">
            <Section>
                <div className="max-w-xl mx-auto text-center space-y-8">
                    <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                        <Check className="w-12 h-12 text-green-500" />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold">
                            Order Confirmed!
                        </h1>
                        <div className="text-lg md:text-xl text-espresso-light dark:text-ivory/80 space-y-4">
                            <p>Thank you for choosing Amrit Milk Organic.</p>
                            <p>
                                Your order has been successfully received and is being carefully
                                prepared.
                            </p>
                        </div>
                    </div>

                    {orderId && (
                        <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-xl p-6 text-left space-y-4 shadow-soft dark:shadow-card-dark">
                            <div className="flex items-center gap-3">
                                <Package className="w-6 h-6 text-gold" />
                                <span className="text-sm text-espresso-muted dark:text-ivory/60">
                                    Order Details
                                </span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-espresso-muted dark:text-ivory/60">
                                        Order Number
                                    </span>
                                    <span className="font-bold text-espresso dark:text-ivory">
                                        {orderId}
                                    </span>
                                </div>
                                {trackingId && (
                                    <div className="flex justify-between">
                                        <span className="text-espresso-muted dark:text-ivory/60">
                                            Transaction ID
                                        </span>
                                        <span className="font-mono text-sm text-espresso dark:text-ivory">
                                            {trackingId}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-xl p-6 text-left space-y-4 shadow-soft dark:shadow-card-dark">
                        <p className="text-sm md:text-base text-espresso-muted dark:text-ivory/60">
                            If you have any questions or need assistance, feel free to reach out to
                            us on WhatsApp — a real person from our team will be happy to help.
                        </p>
                        <p className="text-xl font-serif font-bold text-terracotta dark:text-gold text-center pt-2">
                            Welcome to the Amrit family.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/products" icon size="lg">
                            Continue Shopping
                        </Button>
                        <Button href="/" variant="outline" size="lg">
                            Return Home
                        </Button>
                    </div>
                </div>
            </Section>
        </main>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense
            fallback={
                <main className="bg-creme dark:bg-midnight min-h-screen flex items-center justify-center">
                    <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full"></div>
                </main>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
