"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/lib/CartContext";
import { AnimatePresence, motion } from "framer-motion";
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
            { href: "/products/a2-gir-cow-milk-1l", label: "A2 Gir Cow Milk" },
            { href: "/products/a2-cow-ghee-1kg", label: "Bilona Ghee" },
            { href: "/products/a2-paneer-1kg", label: "A2 Paneer" },
        ],
    },
    {
        href: "/about",
        label: "About",
        children: [
            { href: "/about", label: "Our Story" },
            { href: "/the-farm", label: "The Farm" },
            { href: "/genetic-library", label: "Genetic Library" },
            { href: "/sustainability", label: "Sustainability" },
        ],
    },
    {
        href: "/tools",
        label: "Tools",
        children: [
            { href: "/quiz", label: "Kitchen Quiz" },
            { href: "/calculator", label: "Savings Calculator" },
            { href: "/lab-reports", label: "Lab Reports" },
        ],
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
                            style={{ filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))" }}
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
                                    {link.children && (
                                        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                                    )}
                                </Link>
                                {link.children && openDropdown === link.label && (
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
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button className="p-2.5 rounded-xl text-ivory/80 hover:text-gold hover:bg-white/10 transition-all hidden md:block">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link
                            href="/account"
                            className="p-2.5 rounded-xl text-ivory/80 hover:text-gold hover:bg-white/10 transition-all"
                        >
                            <User className="w-5 h-5" />
                        </Link>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                        >
                            <Link
                                href="/cart"
                                className="relative p-3.5 rounded-xl group flex items-center justify-center overflow-hidden bg-gold/5 dark:bg-white/5"
                            >
                                {/* Permanent Ambient Glow & Border */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent rounded-xl border border-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] group-hover:border-gold/80 transition-all duration-500" />

                                {/* Animated Background Sheen */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                                <motion.div
                                    animate={{
                                        y: [0, -4, 0],
                                        scale: [1, 1.1, 1],
                                        filter: [
                                            "drop-shadow(0 0 0px rgba(212,175,55,0))",
                                            "drop-shadow(0 4px 12px rgba(212,175,55,0.5))",
                                            "drop-shadow(0 0 0px rgba(212,175,55,0))",
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="relative z-10"
                                >
                                    <ShoppingBag className="w-8 h-8 text-ivory group-hover:text-gold transition-colors duration-300 drop-shadow-md" />
                                </motion.div>
                                <AnimatePresence>
                                    {cartCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            className="absolute -top-1 -right-1 bg-gradient-to-tr from-[#FF4D4D] to-[#D32F2F] text-white text-[10px] font-black min-w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 border-[#8B4513] shadow-lg z-20"
                                        >
                                            <motion.span
                                                key={cartCount}
                                                initial={{ scale: 1.5 }}
                                                animate={{ scale: 1 }}
                                                className="flex items-center justify-center w-full h-full"
                                            >
                                                {cartCount}
                                            </motion.span>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-midnight/60 backdrop-blur-md"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm z-50 bg-[#8B4513] dark:bg-midnight shadow-2xl overflow-y-auto"
                        >
                            <div className="p-6 pt-24 space-y-2">
                                {navLinks.map((link) => (
                                    <div key={link.href} className="border-b border-white/5 py-2">
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={link.href}
                                                className="text-xl font-serif font-bold text-ivory py-2 px-2 hover:text-gold transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {link.label}
                                            </Link>
                                            {link.children && (
                                                <ChevronDown className="w-5 h-5 text-ivory/50" />
                                            )}
                                        </div>
                                        {link.children && (
                                            <div className="pl-4 space-y-1 mt-2 mb-4 bg-white/5 rounded-xl p-2">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block text-ivory/70 py-2.5 px-4 rounded-lg hover:bg-white/10 hover:text-gold transition-all text-sm uppercase tracking-wider"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="absolute top-6 left-6 flex items-center gap-4">
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-3 rounded-full bg-white/10 text-ivory"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <span className="font-serif italic text-gold">Amrit Purity</span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
