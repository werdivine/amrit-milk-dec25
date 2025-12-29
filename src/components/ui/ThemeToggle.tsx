'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-glass-bg border border-glass-border" />
        );
    }

    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {/* Background - theme aware */}
            <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${isDark
                    ? 'bg-glass-bg border border-glass-border shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-white border border-[#e7d4c0] shadow-[0_2px_8px_rgba(62,39,35,0.12)]'
                    }`}
            />

            {/* Icon container with rotation animation */}
            <motion.div
                className="relative z-10"
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
            >
                {isDark ? (
                    <Sun className="w-5 h-5 text-gold" />
                ) : (
                    <Moon className="w-5 h-5 text-[#c75b39]" />
                )}
            </motion.div>

            {/* Glow effect for dark mode */}
            {isDark && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-gold/20 blur-md"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
        </motion.button>
    );
}
