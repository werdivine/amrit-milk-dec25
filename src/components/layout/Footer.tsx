import {
    Facebook,
    Heart,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
    MessageCircle,
} from "lucide-react";
import { SupportIcon } from "../ui/FarmerIcon";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#6B3410] dark:from-midnight dark:via-midnight-mid dark:to-[#0a1420] pt-20 pb-8 border-t-2 border-gold/30 transition-colors duration-500 overflow-hidden">
            {/* Premium decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Warm radial gradients */}
                <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[60px]"></div>
                <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-warmGold/5 rounded-full blur-[40px]"></div>
                {/* Subtle dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)",
                        backgroundSize: "24px 24px",
                    }}
                ></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="inline-block group">
                            <Image
                                src="/assets/img/amrit-logo-transparent.png"
                                alt="Amrit Milk"
                                width={240}
                                height={96}
                                className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                style={{ filter: "drop-shadow(0 2px 12px rgba(0, 0, 0, 0.3))" }}
                            />
                        </Link>
                        <p className="text-ivory/70 text-sm leading-relaxed max-w-sm">
                            Affordable milk, rich in taste. Pure A2 Gir Cow Milk from indigenous
                            breeds, delivered fresh to your doorstep in glass bottles.
                        </p>
                        <div className="pt-4 border-t border-white/10">
                            <p className="text-gold font-serif italic text-lg">
                                &quot;Not a brand, a movement.&quot;
                            </p>
                            <p className="text-xs text-ivory/50 mt-1 uppercase tracking-widest">
                                Reclaiming Real Food
                            </p>
                        </div>
                        {/* Social Icons with premium styling */}
                        <div className="flex gap-3">
                            <a
                                href="https://instagram.com/amritmilkorganic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-gold hover:border-gold hover:text-espresso transition-all duration-300 text-ivory shadow-sm hover:shadow-lg"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-gold hover:border-gold hover:text-espresso transition-all duration-300 text-ivory shadow-sm hover:shadow-lg"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-gold hover:border-gold hover:text-espresso transition-all duration-300 text-ivory shadow-sm hover:shadow-lg"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="https://wa.me/918130693767"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-gold hover:border-gold hover:text-espresso transition-all duration-300 text-ivory shadow-sm hover:shadow-lg"
                                aria-label="WhatsApp Support"
                            >
                                <MessageCircle className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-ivory flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-gold"></span>
                            Shop
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/products"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products?category=milk"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    A2 Gir Cow Milk
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products?category=ghee"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Vedic Bilona Ghee
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products?category=paneer"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Malai Paneer
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/subscription-hub"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Subscriptions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-ivory flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-gold"></span>
                            Company
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/the-farm"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    The Farm
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/genetic-library"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Genetic Library
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/sustainability"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Sustainability
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lab-reports"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Lab Reports
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-ivory flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-gold"></span>
                            Support
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/faqs"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/calculator"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Savings Calculator
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/quiz"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Kitchen Quiz
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-ivory/70 hover:text-gold transition-colors duration-200 flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[2px] bg-gold transition-all duration-200"></span>
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info Bar */}
                <div className="py-8 border-y border-white/10 mb-8">
                    <div className="flex flex-wrap justify-center gap-8 text-sm">
                        <a
                            href="tel:+918130693767"
                            className="flex items-center gap-3 text-ivory/80 hover:text-gold transition-colors duration-200 group"
                        >
                            <div className="p-2.5 bg-white/10 rounded-xl border border-white/10 group-hover:bg-gold group-hover:text-espresso group-hover:border-gold transition-all shadow-sm">
                                <Phone className="w-4 h-4" />
                            </div>
                            +91 81306 93767
                        </a>
                        <div className="flex flex-col gap-2">
                            <a
                                href="mailto:info@amritmilkorganic.com"
                                className="flex items-center gap-3 text-ivory/80 hover:text-gold transition-colors duration-200 group"
                            >
                                <div className="p-2.5 bg-white/10 rounded-xl border border-white/10 group-hover:bg-gold group-hover:text-espresso group-hover:border-gold transition-all shadow-sm">
                                    <Mail className="w-4 h-4" />
                                </div>
                                info@amritmilkorganic.com
                            </a>
                            <a
                                href="mailto:support@amritmilkorganic.com"
                                className="flex items-center gap-3 text-ivory/80 hover:text-gold transition-colors duration-200 group"
                            >
                                <div className="p-2.5 bg-white/10 rounded-xl border border-white/10 group-hover:bg-gold group-hover:text-espresso group-hover:border-gold transition-all shadow-sm">
                                    <Mail className="w-4 h-4" />
                                </div>
                                support@amritmilkorganic.com
                            </a>
                        </div>
                        <span className="flex items-center gap-3 text-ivory/80">
                            <div className="p-2.5 bg-gold/20 rounded-xl border border-gold/30">
                                <MapPin className="w-4 h-4 text-gold" />
                            </div>
                            Amrit Milk Farms, 1, Amrit Milk Marg, Lucknow, 226028, IN
                        </span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory/50 uppercase tracking-wider">
                    <p className="flex items-center gap-1.5">
                        &copy; 2025 Pay Amrit Organic FPO. Crafted with{" "}
                        <Heart className="w-3 h-3 text-gold fill-current" /> in India
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="/privacy"
                            className="hover:text-gold transition-colors duration-200"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-gold transition-colors duration-200"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/refund"
                            className="hover:text-gold transition-colors duration-200"
                        >
                            Refund Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
