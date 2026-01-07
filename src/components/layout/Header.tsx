"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/lib/CartContext";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    {
        href: "/products",
        label: "Shop",
        children: [
            { href: "/products", label: "All Products" },
            { href: "/products?category=milk", label: "Milk" },
            { href: "/products?category=ghee", label: "Bilona Ghee" },
            { href: "/products?category=paneer", label: "Paneer" },
        ]
    },
    {
        href: "/about",
        label: "About",
        children: [
            { href: "/about", label: "Our Story" },
            { href: "/the-farm", label: "The Farm" },
            { href: "/genetic-library", label: "Genetic Library" },
            { href: "/sustainability", label: "Sustainability" },
        ]
    },
    {
        href: "/tools",
        label: "Tools",
        children: [
            { href: "/quiz", label: "Kitchen Quiz" },
            { href: "/calculator", label: "Savings Calculator" },
            { href: "/lab-reports", label: "Lab Reports" },
        ]
    },
    { href: "/faqs", label: "FAQs" },
    { href: "/subscription-hub", label: "Subscribe" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
    const { cartCount } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <>
            {/* Premium Header with rich terracotta/espresso for light mode - logo visibility */}
            <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] dark:from-midnight/95 dark:via-midnight/90 dark:to-midnight/95 backdrop-blur-lg border-b border-warmGold/30 dark:border-gold/10 h-24 transition-all duration-500 shadow-md">
                {/* Decorative top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-warmGold via-gold to-warmGold opacity-80"></div>

                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 rounded-xl bg-white/10 text-ivory hover:bg-white/20 transition-all"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Logo - Larger size with transparent logo */}
                    <Link href="/" className="flex flex-col items-center gap-0.5 group relative">
                        <Image
                            src="/assets/img/amrit-logo-transparent.png"
                            alt="Amrit Milk - Affordable milk rich in taste"
                            width={220}
                            height={88}
                            className="h-[76px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))' }}
                            priority
                        />
                         <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-ivory/80 group-hover:text-gold transition-colors">
                            Purity Assured.
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div
                                key={link.href}
                                className="relative group"
                                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium uppercase tracking-wider text-ivory/90 hover:text-gold transition-all duration-200 flex items-center gap-1 rounded-lg hover:bg-white/10"
                                >
                                    {link.label}
                                    {link.children && <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />}
                                </Link>
                                {
                                    link.children && openDropdown === link.label && (
                                        <div className="absolute top-full left-0 pt-2">
                                            <div className="rounded-2xl border border-warmGold/30 py-3 min-w-[200px] bg-[#8B4513]/95 dark:bg-midnight/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block px-5 py-2.5 text-sm text-ivory/80 hover:text-gold hover:bg-white/10 transition-all"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button className="p-2.5 rounded-xl text-ivory/80 hover:text-gold hover:bg-white/10 transition-all hidden md:block">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="/account" className="p-2.5 rounded-xl text-ivory/80 hover:text-gold hover:bg-white/10 transition-all">
                            <User className="w-5 h-5" />
                        </Link>
                        <Link href="/cart" className="p-2.5 rounded-xl text-ivory/80 hover:text-gold hover:bg-white/10 transition-all relative group">
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gold text-espresso text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform px-1 shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {
                mobileMenuOpen && (
                    <div className="fixed inset-0 z-40 bg-[#8B4513] dark:bg-midnight pt-24">
                        <nav className="p-6 space-y-2">
                            {navLinks.map((link) => (
                                <div key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="block text-xl font-medium text-ivory py-3 px-4 rounded-xl hover:bg-white/10 border-b border-white/10 transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                    {link.children && (
                                        <div className="pl-6 space-y-1 py-2">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block text-ivory/70 py-2 px-4 rounded-lg hover:bg-white/10 hover:text-gold transition-all"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                )
            }
        </>
    );
}
