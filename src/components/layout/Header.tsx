"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/CartContext";
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
            <header className="fixed top-0 left-0 w-full z-50 bg-midnight/80 backdrop-blur-xl border-b border-white/5 h-20">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-ivory"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src="/assets/img/amrit-logo.png"
                            alt="Amrit Milk"
                            width={140}
                            height={50}
                            className="h-12 w-auto object-contain"
                            priority
                        />
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
                                    className="text-sm font-medium uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-1 py-2"
                                >
                                    {link.label}
                                    {link.children && <ChevronDown className="w-3 h-3" />}
                                </Link>
                                {link.children && openDropdown === link.label && (
                                    <div className="absolute top-full left-0 pt-2">
                                        <div className="glass rounded-xl border border-glass-border py-2 min-w-[180px]">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-ivory/70 hover:text-gold hover:bg-gold/5 transition-all"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        <button className="text-ivory/70 hover:text-gold transition-colors hidden md:block">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="/account" className="text-ivory/70 hover:text-gold transition-colors">
                            <User className="w-5 h-5" />
                        </Link>
                        <Link href="/cart" className="text-ivory/70 hover:text-gold transition-colors relative group">
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold text-midnight text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform px-1">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
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
            )}
        </>
    );
}
