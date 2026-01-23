"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
    AlertTriangle,
    Camera,
    CheckCircle,
    Clock,
    CreditCard,
    HelpCircle,
    Mail,
    Package,
    RefreshCcw,
    Scale,
    Truck,
    XCircle,
} from "lucide-react";

export default function RefundPolicyPage() {
    const lastUpdated = "January 23, 2026";

    return (
        <main className="bg-creme dark:bg-midnight min-h-screen transition-colors duration-500">
            {/* Hero Section */}
            <section className="relative py-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] mb-4 block">
                        Legal
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-espresso dark:text-ivory mb-6">
                        Refund & Cancellation Policy
                    </h1>
                    <p className="text-xl text-espresso-light dark:text-ivory/80 max-w-2xl mx-auto">
                        Our commitment to your satisfaction with transparent refund and cancellation
                        terms.
                    </p>
                    <p className="text-sm text-espresso-muted dark:text-ivory/60 mt-4">
                        Last Updated: {lastUpdated}
                    </p>
                </div>
            </section>

            <Section>
                <div className="max-w-4xl mx-auto">
                    {/* Important Notice */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Important: Perishable Goods Policy
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 leading-relaxed">
                            Our products are <strong>perishable dairy and food items</strong> that
                            require immediate refrigeration and have limited shelf life. Due to the
                            nature of these products, special refund and cancellation terms apply as
                            outlined below. This policy is in accordance with the{" "}
                            <strong>Consumer Protection Act, 2019</strong> and{" "}
                            <strong>Consumer Protection (E-Commerce) Rules, 2020</strong>.
                        </p>
                    </div>

                    {/* Order Cancellation */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Order Cancellation
                            </h2>
                        </div>
                        <div className="space-y-6">
                            <div className="border-l-4 border-green-500 pl-4">
                                <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-2">
                                    Before Dispatch — Full Refund
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    You may cancel your order <strong>before dispatch</strong> for a
                                    full refund. Contact us immediately via WhatsApp or email. For
                                    milk orders, cancellation must be done{" "}
                                    <strong>before 2:00 AM</strong> on the day of delivery.
                                </p>
                            </div>
                            <div className="border-l-4 border-red-500 pl-4">
                                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">
                                    After Dispatch — No Refund
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    Once the order has been dispatched,{" "}
                                    <strong>cancellation is not possible</strong> due to the
                                    perishable nature of our products. The milk is bottled fresh
                                    within hours of milking and cannot be resold or returned to
                                    stock.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Refund Eligibility */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                When You Are Eligible for Refund
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700/30 rounded-xl p-4">
                                <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Quality Issues
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    If milk is spoiled, has off-odor, unusual taste, or shows signs
                                    of contamination at the time of delivery, you are entitled to a{" "}
                                    <strong>full refund or replacement</strong>. Report within 2
                                    hours of delivery with photo evidence.
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700/30 rounded-xl p-4">
                                <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Wrong Product Delivered
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    If you receive a product different from what you ordered (e.g.,
                                    wrong quantity, different product), you are entitled to a{" "}
                                    <strong>full refund or replacement</strong>. Report immediately
                                    upon discovery.
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700/30 rounded-xl p-4">
                                <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Delivery Failure by Us
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    If we fail to deliver your order due to our operational issues
                                    (not customer-side issues like incorrect address or
                                    unavailability), you are entitled to a{" "}
                                    <strong>full refund</strong>.
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700/30 rounded-xl p-4">
                                <h3 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Damaged Packaging
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    If glass bottles are cracked, broken, or packaging is visibly
                                    tampered with at the time of delivery, you are entitled to a{" "}
                                    <strong>full refund or replacement</strong>. Do not accept
                                    damaged deliveries.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Non-Refundable */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-6 h-6 text-red-500" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Non-Refundable Situations
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            Refunds are <strong>NOT available</strong> in the following situations:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>Change of mind after order dispatch</li>
                            <li>
                                Milk spoiled due to improper storage by customer (not refrigerated
                                immediately)
                            </li>
                            <li>
                                Delivery failure due to incorrect address or customer unavailability
                            </li>
                            <li>Claims made more than 24 hours after delivery</li>
                            <li>Products already consumed (partial or full)</li>
                            <li>
                                Natural variations in taste, color, or consistency (organic products
                                vary naturally)
                            </li>
                            <li>Gifts or promotional items</li>
                        </ul>
                    </div>

                    {/* Subscription Cancellation */}
                    <div className="bg-gold/10 dark:bg-gold/5 border border-gold/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <RefreshCcw className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Subscription Cancellation & Refunds
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Pausing Your Subscription
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    You can pause your subscription at any time with{" "}
                                    <strong>24 hours&apos; notice</strong>. Paused days will be
                                    credited for future deliveries. No refund is issued for pause
                                    requests.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Cancelling Your Subscription
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    To cancel your subscription, contact us via WhatsApp or email
                                    with at least <strong>48 hours&apos; notice</strong>. Unused
                                    prepaid balance will be refunded on a{" "}
                                    <strong>pro-rata basis</strong>, minus any subscription
                                    discounts already availed.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Example Calculation
                                </h3>
                                <p className="text-espresso-muted dark:text-ivory/60 text-sm">
                                    If you paid ₹3,000 for a monthly subscription (30 days), used 15
                                    days, and received 10% discount: Refund = (₹3,000 ÷ 30 × 15) -
                                    (10% discount adjustment) = Approximately ₹1,350 (exact
                                    calculation provided upon request).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Refund Process */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Refund Process & Timeline
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-gold text-espresso rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-bold text-espresso dark:text-ivory">
                                        Submit Request
                                    </h3>
                                    <p className="text-espresso-light dark:text-ivory/80">
                                        Contact us via WhatsApp (+91 81306 93767) or email
                                        (support@amritmilkorganic.com) with your order details and
                                        reason for refund.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-gold text-espresso rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-bold text-espresso dark:text-ivory">
                                        Verification (24-48 hours)
                                    </h3>
                                    <p className="text-espresso-light dark:text-ivory/80">
                                        Our team will verify your claim. For quality issues, photo
                                        evidence is required. We may request additional information.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-gold text-espresso rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-bold text-espresso dark:text-ivory">
                                        Approval & Processing
                                    </h3>
                                    <p className="text-espresso-light dark:text-ivory/80">
                                        Once approved, refund is initiated within{" "}
                                        <strong>2 business days</strong>. You will receive
                                        confirmation via WhatsApp/email.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-gold text-espresso rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-bold text-espresso dark:text-ivory">
                                        Refund Credit (5-7 business days)
                                    </h3>
                                    <p className="text-espresso-light dark:text-ivory/80">
                                        Refunds are credited to the{" "}
                                        <strong>original payment method</strong>. Bank processing
                                        may take 5-7 business days. UPI refunds are typically faster
                                        (1-3 days).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Refund Methods */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Refund Methods
                            </h2>
                        </div>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                <strong>UPI Payments:</strong> Refunded to the same UPI ID (1-3
                                business days)
                            </li>
                            <li>
                                <strong>Credit/Debit Cards:</strong> Refunded to the same card (5-7
                                business days)
                            </li>
                            <li>
                                <strong>Net Banking:</strong> Refunded to the same bank account (5-7
                                business days)
                            </li>
                            <li>
                                <strong>Cash on Delivery:</strong> Refunded via UPI/Bank transfer
                                (requires bank details)
                            </li>
                            <li>
                                <strong>Wallet Credit:</strong> Added to your Amrit Milk account for
                                future orders (instant)
                            </li>
                        </ul>
                        <p className="text-espresso-muted dark:text-ivory/60 mt-4 text-sm">
                            For COD orders or if you prefer wallet credit for faster resolution,
                            please let us know during the refund request.
                        </p>
                    </div>

                    {/* Replacement Option */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Package className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Replacement Option
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            For quality issues or wrong products, you may choose a{" "}
                            <strong>replacement</strong> instead of a refund:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                Replacements are delivered on the{" "}
                                <strong>next available delivery slot</strong>
                            </li>
                            <li>
                                For daily subscriptions, replacement is added to your next
                                day&apos;s delivery
                            </li>
                            <li>Replacement is subject to product availability</li>
                            <li>If we cannot replace, a full refund will be processed instead</li>
                        </ul>
                    </div>

                    {/* Glass Bottle Deposits */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Truck className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Glass Bottle Deposit Returns
                            </h2>
                        </div>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                Refundable deposit is charged per glass bottle at the time of
                                purchase.
                            </li>
                            <li>
                                Return empty, clean bottles during your next delivery for deposit
                                credit.
                            </li>
                            <li>
                                Bottles can also be returned at our collection points (contact us
                                for locations).
                            </li>
                            <li>
                                Deposit is refunded as <strong>wallet credit</strong> by default, or
                                bank transfer upon request.
                            </li>
                            <li>Damaged, cracked, or chipped bottles: Deposit is forfeited.</li>
                            <li>Missing bottles: Deposit is forfeited.</li>
                        </ul>
                    </div>

                    {/* Reporting Issues */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Camera className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                How to Report Issues
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            To ensure fast resolution, please include the following when reporting
                            an issue:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                <strong>Order ID</strong> or date of delivery
                            </li>
                            <li>
                                <strong>Product name</strong> and quantity affected
                            </li>
                            <li>
                                <strong>Description</strong> of the issue
                            </li>
                            <li>
                                <strong>Photos/Video</strong> showing the problem (for quality
                                issues)
                            </li>
                            <li>
                                Photo of the <strong>batch code</strong> on the bottle (if visible)
                            </li>
                            <li>
                                Your <strong>preferred resolution</strong> (refund or replacement)
                            </li>
                        </ul>
                        <div className="bg-creme-light dark:bg-midnight rounded-xl p-4 mt-4">
                            <p className="text-espresso dark:text-ivory font-medium">
                                📱 Send photos and details to:{" "}
                                <a
                                    href="https://wa.me/918130693767"
                                    className="text-gold hover:underline"
                                >
                                    WhatsApp +91 81306 93767
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Consumer Rights */}
                    <div className="bg-gold/10 dark:bg-gold/5 border border-gold/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Your Consumer Rights
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            Under the <strong>Consumer Protection Act, 2019</strong> and{" "}
                            <strong>Consumer Protection (E-Commerce) Rules, 2020</strong>, you have
                            the right to:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                Receive products that match their description and are of acceptable
                                quality
                            </li>
                            <li>
                                Clear information about cancellation and refund policies before
                                purchase
                            </li>
                            <li>A full refund for defective or substandard products</li>
                            <li>
                                File a complaint with the Consumer Disputes Redressal Forum if
                                unsatisfied with our resolution
                            </li>
                        </ul>
                        <p className="text-espresso-muted dark:text-ivory/60 text-sm mt-4">
                            Nothing in this policy limits or excludes any rights you have under
                            applicable consumer protection laws.
                        </p>
                    </div>

                    {/* Grievance Redressal */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <HelpCircle className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Grievance Redressal
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            If you are not satisfied with the resolution of your refund request, you
                            may escalate to our Grievance Officer:
                        </p>
                        <div className="bg-creme-light dark:bg-midnight rounded-xl p-6 space-y-3">
                            <p className="text-espresso dark:text-ivory">
                                <strong>Grievance Officer, Pay Amrit Organic FPO</strong>
                            </p>
                            <p className="text-espresso dark:text-ivory">
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:grievance@amritmilkorganic.com"
                                    className="text-gold hover:underline"
                                >
                                    grievance@amritmilkorganic.com
                                </a>
                            </p>
                            <p className="text-espresso dark:text-ivory">
                                <strong>Phone:</strong>{" "}
                                <a href="tel:+918130693767" className="text-gold hover:underline">
                                    +91 81306 93767
                                </a>
                            </p>
                            <p className="text-espresso-muted dark:text-ivory/60 text-sm">
                                Response within 48 hours. Resolution within 30 days of escalation.
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-gold/10 dark:bg-gold/5 border border-gold/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Contact for Refunds
                            </h2>
                        </div>
                        <div className="bg-white dark:bg-midnight rounded-xl p-6 space-y-3">
                            <p className="text-espresso dark:text-ivory">
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:support@amritmilkorganic.com"
                                    className="text-gold hover:underline"
                                >
                                    support@amritmilkorganic.com
                                </a>
                            </p>
                            <p className="text-espresso dark:text-ivory">
                                <strong>WhatsApp:</strong>{" "}
                                <a
                                    href="https://wa.me/918130693767"
                                    className="text-gold hover:underline"
                                >
                                    +91 81306 93767
                                </a>
                            </p>
                            <p className="text-espresso dark:text-ivory">
                                <strong>Phone:</strong>{" "}
                                <a href="tel:+918130693767" className="text-gold hover:underline">
                                    +91 81306 93767
                                </a>
                            </p>
                            <p className="text-espresso-muted dark:text-ivory/60 text-sm mt-2">
                                Customer Support Hours: 7:00 AM - 9:00 PM IST, Monday - Sunday
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center space-y-6">
                        <p className="text-espresso-muted dark:text-ivory/60 max-w-xl mx-auto">
                            Have questions about our refund policy? We&apos;re here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                href="https://wa.me/918130693767"
                                size="lg"
                                className="bg-green-500 text-white hover:bg-green-400"
                            >
                                WhatsApp Support
                            </Button>
                            <Button href="/faqs" variant="glass" size="lg">
                                View FAQs
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
