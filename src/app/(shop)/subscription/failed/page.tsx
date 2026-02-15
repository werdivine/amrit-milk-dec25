"use client";

import { Button } from "@/components/ui/button";
import { XCircle, AlertTriangle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SubscriptionFailedContent() {
    const searchParams = useSearchParams();
    const reason = searchParams.get("reason");

    return (
        <div className="min-h-screen bg-creme dark:bg-midnight pt-32 pb-16 px-4">
            <div className="max-w-md mx-auto bg-white dark:bg-midnight-mid rounded-3xl p-8 border border-red-200 dark:border-red-900/30 text-center shadow-xl">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                </div>

                <h1 className="text-3xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                    Subscription Failed
                </h1>
                <p className="text-espresso/70 dark:text-ivory/70 mb-8">
                    We couldn&apos;t set up your subscription. No payment was deducted.
                </p>

                <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-4 mb-8 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <p className="text-sm text-red-800 dark:text-red-200 text-left">
                        {decodeURIComponent(
                            reason || "Unknown error occurred during payment processing."
                        )}
                    </p>
                </div>

                <div className="space-y-3">
                    <Button
                        href="/products"
                        className="w-full bg-terracotta dark:bg-gold text-white dark:text-midnight"
                    >
                        Try Again
                    </Button>
                    <Button variant="outline" href="/contact" className="w-full">
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function SubscriptionFailedPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-creme dark:bg-midnight pt-32 text-center">
                    Loading...
                </div>
            }
        >
            <SubscriptionFailedContent />
        </Suspense>
    );
}
