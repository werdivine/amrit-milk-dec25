"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
    AlertTriangle,
    Clock,
    CreditCard,
    FileText,
    Gavel,
    Mail,
    Scale,
    Shield,
    ShoppingCart,
    Truck,
    Users,
} from "lucide-react";

export default function TermsOfServicePage() {
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
                        Terms of Service
                    </h1>
                    <p className="text-xl text-espresso-light dark:text-ivory/80 max-w-2xl mx-auto">
                        Please read these terms carefully before using our website and services.
                    </p>
                    <p className="text-sm text-espresso-muted dark:text-ivory/60 mt-4">
                        Last Updated: {lastUpdated}
                    </p>
                </div>
            </section>

            <Section>
                <div className="max-w-4xl mx-auto">
                    {/* Acceptance of Terms */}
                    <div className="bg-gold/10 dark:bg-gold/5 border border-gold/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Acceptance of Terms
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 leading-relaxed mb-4">
                            By accessing and using <strong>amritmilkorganic.com</strong> (the
                            &quot;Website&quot;) and the services offered by{" "}
                            <strong>Pay Amrit Organic Farmer Producer Organisation</strong>{" "}
                            (&quot;Amrit Milk,&quot; &quot;we,&quot; &quot;us,&quot; or
                            &quot;our&quot;), you agree to be bound by these Terms of Service
                            (&quot;Terms&quot;).
                        </p>
                        <p className="text-espresso-light dark:text-ivory/80 leading-relaxed">
                            If you do not agree to these Terms, please do not use our Website or
                            services. Your continued use of the Website constitutes acceptance of
                            any changes to these Terms.
                        </p>
                    </div>

                    {/* Company Information */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                About Us
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 leading-relaxed mb-4">
                            <strong>Pay Amrit Organic Farmer Producer Organisation</strong> is a
                            registered Farmer Producer Organisation (FPO) under the Companies Act,
                            2013, engaged in the production and distribution of pure A2 Gir Cow Milk
                            and organic dairy products.
                        </p>
                        <div className="bg-creme-light dark:bg-midnight rounded-xl p-4 space-y-2 text-espresso-light dark:text-ivory/80">
                            <p>
                                <strong>Registered Address:</strong> Lucknow, Uttar Pradesh, India
                            </p>
                            <p>
                                <strong>Email:</strong> info@amritmilkorganic.com
                            </p>
                            <p>
                                <strong>Phone:</strong> +91 81306 93767
                            </p>
                        </div>
                    </div>

                    {/* Eligibility */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                            Eligibility
                        </h2>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                You must be at least <strong>18 years old</strong> or have
                                parental/guardian consent to use our services.
                            </li>
                            <li>
                                You must have the legal capacity to enter into binding contracts
                                under Indian law.
                            </li>
                            <li>
                                You must provide accurate and complete information during
                                registration and ordering.
                            </li>
                            <li>
                                Our services are currently available only within{" "}
                                <strong>Lucknow and surrounding areas</strong> (within 30km of our
                                farm).
                            </li>
                        </ul>
                    </div>

                    {/* Account Terms */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Account Terms
                            </h2>
                        </div>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                You are responsible for maintaining the confidentiality of your
                                account credentials.
                            </li>
                            <li>
                                You are responsible for all activities that occur under your
                                account.
                            </li>
                            <li>
                                You must immediately notify us of any unauthorized use of your
                                account.
                            </li>
                            <li>
                                We reserve the right to suspend or terminate accounts that violate
                                these Terms.
                            </li>
                            <li>
                                You may not create multiple accounts or share your account with
                                others.
                            </li>
                        </ul>
                    </div>

                    {/* Products & Services */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <ShoppingCart className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Products & Services
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Product Offerings
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    We offer pure A2 Gir Cow Milk, Vedic Bilona Ghee, Fresh Paneer,
                                    Dahi, Cold-Pressed Mustard Oil, and other organic farm products.
                                    All products are sourced from our farm with indigenous Gir cows.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Product Quality
                                </h3>
                                <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-1">
                                    <li>
                                        All milk is from 100% purebred Gir cows (A2 genetics
                                        verified)
                                    </li>
                                    <li>
                                        Milk is pasteurized using LTLT (Low Temperature Long Time)
                                        method
                                    </li>
                                    <li>
                                        Products are delivered fresh in glass bottles (no plastic
                                        contact)
                                    </li>
                                    <li>
                                        Regular lab testing for quality and safety (reports
                                        available on request)
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Product Images & Descriptions
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    While we strive to display products accurately, actual products
                                    may vary slightly from images shown. Natural variations in
                                    color, texture, and appearance are expected for organic
                                    products.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Ordering & Payment */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Ordering & Payment
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Pricing
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    All prices are in Indian Rupees (INR) and include applicable
                                    GST. Prices are subject to change without notice. The price
                                    applicable is the one displayed at the time of order placement.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Payment Methods
                                </h3>
                                <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-1">
                                    <li>
                                        <strong>Online Payment:</strong> UPI (Google Pay, PhonePe,
                                        Paytm), Debit/Credit Cards via Razorpay
                                    </li>
                                    <li>
                                        <strong>Net Banking:</strong> All major banks supported
                                    </li>
                                    <li>
                                        <strong>Cash on Delivery (COD):</strong> Available for
                                        orders within service area
                                    </li>
                                    <li>
                                        <strong>Bank Transfer:</strong> NEFT/IMPS for advance
                                        payments
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Order Confirmation
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    Orders are confirmed only after successful payment or payment
                                    method selection. You will receive an order confirmation via
                                    WhatsApp/SMS/Email. We reserve the right to cancel orders due to
                                    product unavailability or pricing errors.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Terms */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Subscription Terms
                            </h2>
                        </div>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                Subscriptions are available on weekly, fortnightly, and monthly
                                basis.
                            </li>
                            <li>
                                Subscription payments are collected in advance for the selected
                                period.
                            </li>
                            <li>
                                You may pause your subscription with 24 hours&apos; notice before
                                your next delivery.
                            </li>
                            <li>
                                You may modify quantities or products with 24 hours&apos; notice.
                            </li>
                            <li>
                                Subscription cancellation: Unused prepaid amount will be refunded
                                pro-rata (see Refund Policy).
                            </li>
                            <li>
                                We reserve the right to modify subscription terms with 7 days&apos;
                                notice.
                            </li>
                            <li>
                                Discounts: 10% off quarterly, 15% off half-yearly, 20% off annual
                                subscriptions.
                            </li>
                        </ul>
                    </div>

                    {/* Delivery Terms */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Truck className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Delivery Terms
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Service Area
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    We currently deliver to Lucknow and surrounding areas within a
                                    30km radius of our farm in Sitapur. Contact us on WhatsApp to
                                    verify delivery to your pin code.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Delivery Timing
                                </h3>
                                <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-1">
                                    <li>Morning delivery: Before 7:00 AM (fresh milk, same day)</li>
                                    <li>
                                        Other products: As per schedule communicated at ordering
                                    </li>
                                    <li>
                                        Delivery timing may vary due to weather or operational
                                        constraints
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Glass Bottle Returns
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    Milk is delivered in reusable glass bottles. A refundable
                                    deposit is charged per bottle. Keep empty bottles ready for
                                    collection during your next delivery. Damaged bottles will
                                    result in forfeiture of deposit.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Delivery Failure
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    If delivery fails due to incorrect address, unavailability at
                                    delivery location, or access issues, the order may be cancelled.
                                    Perishable items cannot be rescheduled once dispatched.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Intellectual Property */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Intellectual Property
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            All content on this Website, including but not limited to:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-1 mb-4">
                            <li>The &quot;Amrit Milk&quot; name, logo, and brand identity</li>
                            <li>Website design, layout, and user interface</li>
                            <li>Text, images, graphics, and multimedia content</li>
                            <li>Product descriptions and marketing materials</li>
                        </ul>
                        <p className="text-espresso-light dark:text-ivory/80">
                            is the exclusive property of Pay Amrit Organic FPO and is protected by
                            Indian copyright, trademark, and intellectual property laws.
                            Unauthorized use, reproduction, or distribution is strictly prohibited.
                        </p>
                    </div>

                    {/* User Conduct */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Prohibited Activities
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            You agree NOT to:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>Use the Website for any unlawful purpose</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Submit false or misleading information</li>
                            <li>Resell our products commercially without authorization</li>
                            <li>Interfere with the Website&apos;s functionality or security</li>
                            <li>Scrape, copy, or harvest content from the Website</li>
                            <li>Defame, harass, or abuse our staff or other customers</li>
                            <li>Place fraudulent orders or use stolen payment credentials</li>
                        </ul>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Limitation of Liability
                            </h2>
                        </div>
                        <div className="space-y-4 text-espresso-light dark:text-ivory/80">
                            <p>
                                <strong>Disclaimer:</strong> Our products are sold &quot;as-is&quot;
                                and we make no warranties beyond those expressly stated. While we
                                strive for the highest quality, we do not guarantee specific health
                                outcomes from consuming our products.
                            </p>
                            <p>
                                <strong>Liability Cap:</strong> Our total liability to you for any
                                claim arising from your use of our Website or services shall not
                                exceed the amount paid by you for the specific product or service
                                giving rise to the claim.
                            </p>
                            <p>
                                <strong>Exclusions:</strong> We are not liable for:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Indirect, incidental, or consequential damages</li>
                                <li>Loss of profit, data, or business opportunity</li>
                                <li>Damages from force majeure events</li>
                                <li>Third-party actions or payment gateway issues</li>
                                <li>
                                    Allergic reactions or health conditions (consult your doctor)
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Dispute Resolution */}
                    <div className="bg-gold/10 dark:bg-gold/5 border border-gold/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Gavel className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Dispute Resolution & Governing Law
                            </h2>
                        </div>
                        <div className="space-y-4 text-espresso-light dark:text-ivory/80">
                            <p>
                                <strong>Governing Law:</strong> These Terms shall be governed by and
                                construed in accordance with the laws of India.
                            </p>
                            <p>
                                <strong>Dispute Resolution:</strong> Any dispute arising out of
                                these Terms shall first be attempted to be resolved through
                                good-faith negotiation. If unresolved within 30 days, the dispute
                                shall be referred to arbitration in accordance with the Arbitration
                                and Conciliation Act, 1996.
                            </p>
                            <p>
                                <strong>Jurisdiction:</strong> The courts of Lucknow, Uttar Pradesh,
                                India shall have exclusive jurisdiction over any legal proceedings
                                arising from these Terms.
                            </p>
                            <p>
                                <strong>Consumer Rights:</strong> Nothing in these Terms limits your
                                rights under the Consumer Protection Act, 2019 or other applicable
                                consumer protection laws.
                            </p>
                        </div>
                    </div>

                    {/* Modifications */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                            Changes to These Terms
                        </h2>
                        <p className="text-espresso-light dark:text-ivory/80">
                            We reserve the right to modify these Terms at any time. Changes will be
                            effective immediately upon posting on the Website. We will notify you of
                            material changes via email or Website notification. Your continued use
                            of our services after changes constitutes acceptance of the updated
                            Terms.
                        </p>
                    </div>

                    {/* Severability */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                            Severability
                        </h2>
                        <p className="text-espresso-light dark:text-ivory/80">
                            If any provision of these Terms is found to be unenforceable or invalid,
                            that provision shall be modified to the minimum extent necessary to make
                            it enforceable, and the remaining provisions shall continue in full
                            force and effect.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-gold/10 dark:bg-gold/5 border border-gold/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Contact Us
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            For questions about these Terms of Service, please contact us:
                        </p>
                        <div className="bg-white dark:bg-midnight rounded-xl p-6 space-y-3">
                            <p className="text-espresso dark:text-ivory">
                                <strong>Pay Amrit Organic Farmer Producer Organisation</strong>
                            </p>
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
                                <strong>Phone/WhatsApp:</strong>{" "}
                                <a href="tel:+918130693767" className="text-gold hover:underline">
                                    +91 81306 93767
                                </a>
                            </p>
                            <p className="text-espresso dark:text-ivory">
                                <strong>Address:</strong> Lucknow, Uttar Pradesh, India
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center space-y-6">
                        <p className="text-espresso-muted dark:text-ivory/60 max-w-xl mx-auto">
                            Have questions about our terms? Reach out to us anytime.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" size="lg">
                                Contact Us
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
