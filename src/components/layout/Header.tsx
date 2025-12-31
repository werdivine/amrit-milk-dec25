"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
            <header className="fixed top-0 left-0 w-full z-50 bg-creme/90 dark:bg-midnight/80 backdrop-blur-xl border-b border-espresso/5 dark:border-white/5 h-20 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-espresso dark:text-ivory"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        {/* Icon */}
                        <div className="relative">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 2C16 2 12 6 12 12C12 18 20 28 20 38C20 28 28 18 28 12C28 6 24 2 20 2Z" fill="#D4AF37" opacity="0.2" />
                                <path d="M20 2C16 2 12 6 12 12C12 18 20 28 20 28C20 28 28 18 28 12C28 6 24 2 20 2Z" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
                                <circle cx="20" cy="13" r="3" fill="#D4AF37" />
                            </svg>
                        </div>
                        {/* Text */}
                        <div className="flex flex-col">
                            <span className="text-2xl font-serif font-bold text-espresso dark:text-ivory tracking-tight leading-none">
                                AMRIT
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-terracotta dark:text-gold/80 font-medium -mt-0.5">
                                Affordable milk, rich in taste
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <div
                                key={link.href}
                                className="relative group"
                                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium uppercase tracking-widest text-espresso/80 dark:text-ivory/80 hover:text-terracotta dark:hover:text-gold transition-colors flex items-center gap-1 py-2"
                                >
                                    {link.label}
                                    {link.children && <ChevronDown className="w-3 h-3" />}
                                </Link>
                                {
                                    link.children && openDropdown === link.label && (
                                        <div className="absolute top-full left-0 pt-2">
                                            <div className="glass rounded-xl border border-espresso/10 dark:border-glass-border py-2 min-w-[180px] bg-white/80 dark:bg-black/50 backdrop-blur-xl">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block px-4 py-2 text-sm text-espresso/70 dark:text-ivory/70 hover:text-terracotta dark:hover:text-gold hover:bg-espresso/5 dark:hover:bg-gold/5 transition-all"
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
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button className="text-espresso/70 dark:text-ivory/70 hover:text-terracotta dark:hover:text-gold transition-colors hidden md:block">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="/account" className="text-espresso/70 dark:text-ivory/70 hover:text-terracotta dark:hover:text-gold transition-colors">
                            <User className="w-5 h-5" />
                        </Link>
                        <Link href="/cart" className="text-espresso/70 dark:text-ivory/70 hover:text-terracotta dark:hover:text-gold transition-colors relative group">
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-terracotta dark:bg-gold text-white dark:text-midnight text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform px-1">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div >
            </header >

            {/* Mobile Menu */}
            {
                mobileMenuOpen && (
                    <div className="fixed inset-0 z-40 bg-midnight pt-20">
                        <nav className="p-6 space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="block text-xl font-medium text-ivory py-3 border-b border-glass-border"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                    {link.children && (
                                        <div className="pl-4 space-y-2 py-2">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block text-ivory/60 py-2"
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
