"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
    Baby,
    Clock,
    Cookie,
    Database,
    FileText,
    Globe,
    Lock,
    Mail,
    Scale,
    Shield,
    Users,
} from "lucide-react";

export default function PrivacyPolicyPage() {
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
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-espresso-light dark:text-ivory/80 max-w-2xl mx-auto">
                        Your privacy matters to us. Learn how we collect, use, and protect your
                        personal information.
                    </p>
                    <p className="text-sm text-espresso-muted dark:text-ivory/60 mt-4">
                        Last Updated: {lastUpdated}
                    </p>
                </div>
            </section>

            {/* Company Information */}
            <Section>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                About This Privacy Policy
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 leading-relaxed mb-4">
                            This Privacy Policy explains how{" "}
                            <strong>Pay Amrit Organic Farmer Producer Organisation</strong>{" "}
                            (&quot;Amrit Milk,&quot; &quot;we,&quot; &quot;us,&quot; or
                            &quot;our&quot;) collects, uses, discloses, and protects your personal
                            information when you visit our website{" "}
                            <strong>amritmilkorganic.com</strong> or use our services.
                        </p>
                        <p className="text-espresso-light dark:text-ivory/80 leading-relaxed">
                            This policy is drafted in compliance with the{" "}
                            <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>,
                            the <strong>Information Technology Act, 2000</strong>, and the{" "}
                            <strong>
                                Information Technology (Intermediary Guidelines and Digital Media
                                Ethics Code) Rules, 2021
                            </strong>
                            .
                        </p>
                    </div>

                    {/* Data We Collect */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Information We Collect
                            </h2>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Personal Information You Provide
                                </h3>
                                <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                                    <li>
                                        <strong>Identity Data:</strong> Full name, date of birth,
                                        gender
                                    </li>
                                    <li>
                                        <strong>Contact Data:</strong> Email address, phone number,
                                        delivery address
                                    </li>
                                    <li>
                                        <strong>Account Data:</strong> Username, password, account
                                        preferences
                                    </li>
                                    <li>
                                        <strong>Transaction Data:</strong> Order history, payment
                                        details, subscription information
                                    </li>
                                    <li>
                                        <strong>Communication Data:</strong> Messages, feedback,
                                        support requests
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Automatically Collected Information
                                </h3>
                                <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                                    <li>
                                        <strong>Device Data:</strong> IP address, browser type,
                                        device identifiers
                                    </li>
                                    <li>
                                        <strong>Usage Data:</strong> Pages visited, time spent,
                                        click patterns
                                    </li>
                                    <li>
                                        <strong>Location Data:</strong> Approximate location based
                                        on IP address
                                    </li>
                                    <li>
                                        <strong>Cookie Data:</strong> Preferences, session
                                        information (see Cookie Policy below)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Purpose of Collection */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                How We Use Your Information
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            We process your personal data only for specific, lawful purposes:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                <strong>Order Fulfillment:</strong> Processing orders, managing
                                subscriptions, arranging deliveries
                            </li>
                            <li>
                                <strong>Payment Processing:</strong> Completing transactions through
                                Razorpay, CCAvenue, UPI, or COD
                            </li>
                            <li>
                                <strong>Customer Service:</strong> Responding to inquiries,
                                resolving complaints, providing support
                            </li>
                            <li>
                                <strong>Communication:</strong> Sending order updates, delivery
                                notifications, subscription reminders
                            </li>
                            <li>
                                <strong>Marketing:</strong> Promotional offers, newsletters, product
                                recommendations (with consent)
                            </li>
                            <li>
                                <strong>Service Improvement:</strong> Analyzing usage patterns,
                                improving website functionality
                            </li>
                            <li>
                                <strong>Legal Compliance:</strong> Tax records, fraud prevention,
                                regulatory requirements
                            </li>
                        </ul>
                    </div>

                    {/* Legal Basis */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Legal Basis for Processing
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            Under the DPDP Act 2023, we process your data on the following legal
                            grounds:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                <strong>Consent:</strong> For marketing communications and
                                non-essential cookies
                            </li>
                            <li>
                                <strong>Contractual Necessity:</strong> To fulfill orders and
                                subscription agreements
                            </li>
                            <li>
                                <strong>Legal Obligation:</strong> For tax records, fraud
                                prevention, regulatory compliance
                            </li>
                            <li>
                                <strong>Legitimate Interests:</strong> For service improvement and
                                security measures
                            </li>
                        </ul>
                    </div>

                    {/* Third-Party Sharing */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Globe className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Information Sharing & Disclosure
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            We share your personal information only with trusted service providers
                            and as required by law:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                <strong>Payment Processors:</strong> Razorpay, CCAvenue for secure
                                payment processing
                            </li>
                            <li>
                                <strong>Delivery Partners:</strong> Our logistics team and
                                third-party couriers for product delivery
                            </li>
                            <li>
                                <strong>Analytics Providers:</strong> Google Analytics, Vercel
                                Analytics for website performance
                            </li>
                            <li>
                                <strong>Communication Services:</strong> WhatsApp, email service
                                providers for notifications
                            </li>
                            <li>
                                <strong>Legal Authorities:</strong> When required by law, court
                                order, or government request
                            </li>
                        </ul>
                        <p className="text-espresso-muted dark:text-ivory/60 mt-4 text-sm">
                            We do NOT sell, rent, or trade your personal information to third
                            parties for marketing purposes.
                        </p>
                    </div>

                    {/* Data Retention */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Data Retention
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            We retain your personal data only as long as necessary for the purposes
                            outlined in this policy:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                <strong>Account Data:</strong> Until account deletion or 3 years of
                                inactivity
                            </li>
                            <li>
                                <strong>Transaction Records:</strong> 7 years for tax and legal
                                compliance
                            </li>
                            <li>
                                <strong>Marketing Preferences:</strong> Until consent is withdrawn
                            </li>
                            <li>
                                <strong>Analytics Data:</strong> 26 months from collection
                            </li>
                            <li>
                                <strong>Support Communications:</strong> 2 years from last
                                interaction
                            </li>
                        </ul>
                    </div>

                    {/* Your Rights */}
                    <div className="bg-gold/10 dark:bg-gold/5 border border-gold/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Your Rights Under DPDP Act 2023
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            As a data principal, you have the following rights under Indian law:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                <strong>Right to Access:</strong> Request a summary of your personal
                                data and processing activities
                            </li>
                            <li>
                                <strong>Right to Correction:</strong> Request correction of
                                inaccurate or incomplete data
                            </li>
                            <li>
                                <strong>Right to Erasure:</strong> Request deletion of your personal
                                data (subject to legal retention requirements)
                            </li>
                            <li>
                                <strong>Right to Data Portability:</strong> Receive your data in a
                                machine-readable format
                            </li>
                            <li>
                                <strong>Right to Withdraw Consent:</strong> Withdraw previously
                                given consent at any time
                            </li>
                            <li>
                                <strong>Right to Grievance Redressal:</strong> Lodge complaints with
                                our Grievance Officer
                            </li>
                            <li>
                                <strong>Right to Nominate:</strong> Nominate another person to
                                exercise your rights
                            </li>
                        </ul>
                        <p className="text-espresso-light dark:text-ivory/80 mt-4">
                            To exercise any of these rights, please contact our Grievance Officer
                            (details below).
                        </p>
                    </div>

                    {/* Cookie Policy */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Cookie className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Cookie Policy
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            We use cookies and similar technologies to enhance your browsing
                            experience:
                        </p>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Essential Cookies
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    Required for website functionality, shopping cart, user
                                    authentication. Cannot be disabled.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Analytics Cookies
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    Help us understand how visitors interact with our website
                                    (Google Analytics, Vercel Analytics).
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-espresso dark:text-ivory mb-2">
                                    Marketing Cookies
                                </h3>
                                <p className="text-espresso-light dark:text-ivory/80">
                                    Used for targeted advertising and measuring ad campaign
                                    effectiveness (Facebook Pixel, Google Ads).
                                </p>
                            </div>
                        </div>
                        <p className="text-espresso-muted dark:text-ivory/60 mt-4 text-sm">
                            You can manage your cookie preferences through your browser settings.
                            Note that disabling certain cookies may affect website functionality.
                        </p>
                    </div>

                    {/* Children's Privacy */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Baby className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Children&apos;s Privacy
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80">
                            Our services are not intended for individuals under 18 years of age. We
                            do not knowingly collect personal information from children. If you are
                            a parent or guardian and believe your child has provided us with
                            personal information, please contact us immediately. If we become aware
                            that we have collected personal data from a child without parental
                            consent, we will take steps to delete that information.
                        </p>
                    </div>

                    {/* Security Measures */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Data Security
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            We implement robust security measures to protect your personal
                            information:
                        </p>
                        <ul className="list-disc list-inside text-espresso-light dark:text-ivory/80 space-y-2">
                            <li>
                                <strong>Encryption:</strong> SSL/TLS encryption for all data
                                transmission
                            </li>
                            <li>
                                <strong>Secure Payment:</strong> PCI-DSS compliant payment
                                processing through trusted gateways
                            </li>
                            <li>
                                <strong>Access Controls:</strong> Role-based access to personal data
                            </li>
                            <li>
                                <strong>Regular Audits:</strong> Periodic security assessments and
                                updates
                            </li>
                            <li>
                                <strong>Employee Training:</strong> Data protection training for all
                                team members
                            </li>
                        </ul>
                        <p className="text-espresso-muted dark:text-ivory/60 mt-4 text-sm">
                            While we strive to protect your data, no method of electronic
                            transmission or storage is 100% secure. We encourage you to use strong
                            passwords and protect your account credentials.
                        </p>
                    </div>

                    {/* Grievance Officer */}
                    <div className="bg-gold/10 dark:bg-gold/5 border border-gold/30 rounded-2xl p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                                Grievance Officer
                            </h2>
                        </div>
                        <p className="text-espresso-light dark:text-ivory/80 mb-4">
                            In accordance with the Information Technology Act 2000 and DPDP Act
                            2023, we have appointed a Grievance Officer to address your concerns:
                        </p>
                        <div className="bg-white dark:bg-midnight rounded-xl p-6 space-y-3">
                            <p className="text-espresso dark:text-ivory">
                                <strong>Name:</strong> Grievance Officer, Pay Amrit Organic FPO
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
                            <p className="text-espresso dark:text-ivory">
                                <strong>Address:</strong> Pay Amrit Organic FPO, Lucknow, Uttar
                                Pradesh, India
                            </p>
                            <p className="text-espresso-muted dark:text-ivory/60 text-sm mt-2">
                                Response Time: Within 48 hours of receiving your complaint.
                                Resolution within 30 days.
                            </p>
                        </div>
                    </div>

                    {/* Updates to Policy */}
                    <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-8 shadow-soft dark:shadow-card-dark mb-8">
                        <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory mb-4">
                            Changes to This Policy
                        </h2>
                        <p className="text-espresso-light dark:text-ivory/80">
                            We may update this Privacy Policy from time to time to reflect changes
                            in our practices or legal requirements. We will notify you of any
                            material changes by posting the updated policy on our website with a new
                            &quot;Last Updated&quot; date. We encourage you to review this policy
                            periodically. Your continued use of our services after any changes
                            constitutes acceptance of the updated policy.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="text-center space-y-6">
                        <h2 className="text-2xl font-serif font-bold text-espresso dark:text-ivory">
                            Questions About Privacy?
                        </h2>
                        <p className="text-espresso-muted dark:text-ivory/60 max-w-xl mx-auto">
                            If you have any questions about this Privacy Policy or our data
                            practices, please reach out to us.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="mailto:support@amritmilkorganic.com" size="lg">
                                Email Us
                            </Button>
                            <Button href="https://wa.me/918130693767" variant="glass" size="lg">
                                WhatsApp Support
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
