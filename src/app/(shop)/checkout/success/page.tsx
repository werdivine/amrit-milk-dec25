"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { useCart } from "@/lib/CartContext";
import { Check } from "lucide-react";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

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
                            <p>Your order has been successfully received and is being carefully prepared.</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-xl p-6 text-left space-y-4 shadow-soft dark:shadow-card-dark">
                        <p className="text-sm md:text-base text-espresso-muted dark:text-ivory/60">
                            If you have any questions or need assistance, feel free to reach out to us on WhatsApp — a real person from our team will be happy to help.
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
