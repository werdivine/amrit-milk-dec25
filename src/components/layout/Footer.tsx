import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-espresso dark:bg-midnight pt-24 pb-12 border-t border-ivory/5 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/">
                            <Image
                                src="/assets/img/amrit-logo.png"
                                alt="Amrit Milk"
                                width={160}
                                height={60}
                                className="h-14 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-ivory/60 text-sm leading-relaxed max-w-sm">
                            Affordable milk, rich in taste. Pure A2 Gir Cow Milk from indigenous breeds,
                            delivered fresh to your doorstep in glass bottles.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://instagram.com" target="_blank" className="p-2 border border-white/10 rounded-full hover:bg-gold hover:text-midnight transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://facebook.com" target="_blank" className="p-2 border border-white/10 rounded-full hover:bg-gold hover:text-midnight transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://twitter.com" target="_blank" className="p-2 border border-white/10 rounded-full hover:bg-gold hover:text-midnight transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="https://wa.me/919876543210" target="_blank" className="p-2 border border-white/10 rounded-full hover:bg-green-500 hover:border-green-500 transition-all">
                                <MessageCircle className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-ivory">Shop</h4>
                        <ul className="space-y-4 text-sm text-ivory/60">
                            <li><Link href="/products" className="hover:text-gold transition-colors">All Products</Link></li>
                            <li><Link href="/products?category=milk" className="hover:text-gold transition-colors">A2 Gir Cow Milk</Link></li>
                            <li><Link href="/products?category=ghee" className="hover:text-gold transition-colors">Vedic Bilona Ghee</Link></li>
                            <li><Link href="/products?category=paneer" className="hover:text-gold transition-colors">Malai Paneer</Link></li>
                            <li><Link href="/subscription-hub" className="hover:text-gold transition-colors">Subscriptions</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-ivory">Company</h4>
                        <ul className="space-y-4 text-sm text-ivory/60">
                            <li><Link href="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
                            <li><Link href="/the-farm" className="hover:text-gold transition-colors">The Farm</Link></li>
                            <li><Link href="/genetic-library" className="hover:text-gold transition-colors">Genetic Library</Link></li>
                            <li><Link href="/sustainability" className="hover:text-gold transition-colors">Sustainability</Link></li>
                            <li><Link href="/lab-reports" className="hover:text-gold transition-colors">Lab Reports</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-ivory">Support</h4>
                        <ul className="space-y-4 text-sm text-ivory/60">
                            <li><Link href="/faqs" className="hover:text-gold transition-colors">FAQs</Link></li>
                            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
                            <li><Link href="/calculator" className="hover:text-gold transition-colors">Savings Calculator</Link></li>
                            <li><Link href="/quiz" className="hover:text-gold transition-colors">Kitchen Toxicity Quiz</Link></li>
                            <li><Link href="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info Bar */}
                <div className="py-8 border-y border-white/5 mb-8">
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-ivory/60">
                        <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-gold transition-colors">
                            <Phone className="w-4 h-4" />
                            +91 98765 43210
                        </a>
                        <a href="mailto:hello@amritmilk.com" className="flex items-center gap-2 hover:text-gold transition-colors">
                            <Mail className="w-4 h-4" />
                            hello@amritmilk.com
                        </a>
                        <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gold" />
                            Lucknow, Uttar Pradesh
                        </span>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory/40 uppercase tracking-wider">
                    <p>&copy; 2025 Amrit Milk. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-ivory transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-ivory transition-colors">Terms of Service</Link>
                        <Link href="/refund" className="hover:text-ivory transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
