"use client";

import { Button } from "@/components/ui/button";
import { Check, Calendar, Truck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SubscriptionSuccessContent() {
    const searchParams = useSearchParams();
    const subscriptionId = searchParams.get("id");

    return (
        <div className="min-h-screen bg-creme dark:bg-midnight pt-32 pb-16 px-4">
            <div className="max-w-md mx-auto bg-white dark:bg-midnight-mid rounded-3xl p-8 border border-creme-dark dark:border-glass-border text-center shadow-xl">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>

                <h1 className="text-3xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                    Subscription Active!
                </h1>
                <p className="text-espresso/70 dark:text-ivory/70 mb-8">
                    Your subscription has been successfully set up. We&apos;ve received your payment
                    for the first delivery.
                </p>

                <div className="bg-terracotta/5 dark:bg-gold/5 rounded-2xl p-6 mb-8 text-left space-y-4">
                    <div className="flex items-start gap-3">
                        <Truck className="w-5 h-5 text-terracotta dark:text-gold mt-1" />
                        <div>
                            <p className="font-semibold text-espresso dark:text-ivory">
                                First Delivery
                            </p>
                            <p className="text-sm text-espresso/60 dark:text-ivory/60">
                                Tomorrow Morning (sample)
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-terracotta dark:text-gold mt-1" />
                        <div>
                            <p className="font-semibold text-espresso dark:text-ivory">
                                Subscription ID
                            </p>
                            <p className="text-sm text-espresso/60 dark:text-ivory/60 font-mono">
                                {subscriptionId}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Button
                        href="/account"
                        className="w-full bg-terracotta dark:bg-gold text-white dark:text-midnight"
                    >
                        Manage Subscription
                    </Button>
                    <Button variant="outline" href="/" className="w-full">
                        Return Home
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function SubscriptionSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-creme dark:bg-midnight pt-32 text-center">
                    Loading...
                </div>
            }
        >
            <SubscriptionSuccessContent />
        </Suspense>
    );
}
