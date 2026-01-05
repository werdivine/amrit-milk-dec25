"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/CartContext";

export default function CheckoutSuccessPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <main className="bg-theme-primary min-h-screen flex items-center justify-center transition-colors duration-500">
            <Section>
                <div className="max-w-xl mx-auto text-center space-y-8">
                    <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                        <Check className="w-12 h-12 text-green-500" />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold">
                            Order Confirmed!
                        </h1>
                        <p className="text-xl text-theme-secondary">
                            Thank you for your purchase. Your pure, sovereign products will be on their way shortly.
                        </p>
                    </div>

                    <div className="card-theme rounded-xl p-6 text-left space-y-4">
                        <p className="text-sm text-theme-muted">
                            We have sent a confirmation email with your order details.
                            For any queries, please verify via our WhatsApp support.
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
