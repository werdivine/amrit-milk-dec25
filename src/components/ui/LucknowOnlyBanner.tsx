"use client";

import { MapPin, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LucknowOnlyBannerProps {
    dismissible?: boolean;
    persistent?: boolean;
}

export function LucknowOnlyBanner({ dismissible = true, persistent = false }: LucknowOnlyBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible && dismissible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative w-full bg-gradient-to-r from-terracotta to-terracotta-dark dark:from-gold dark:to-yellow-600 text-white py-3 px-4 md:px-6 overflow-hidden"
                >
                    {/* Decorative background pattern */}
                    <div className=" absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMCAxMmMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bS0xMiAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMmMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />

                    <div className="container mx-auto relative z-10">
                        <div className="flex items-center justify-center gap-3 text-center">
                            <MapPin className="w-5 h-5 flex-shrink-0 animate-pulse" />
                            <p className="text-sm md:text-base font-bold">
                                <span className="font-black">Premium A2 Milk</span> — Currently available in Lucknow only.{" "}
                                <span className="hidden md:inline">
                                    Join 700+ families enjoying fresh, pure milk delivered daily.
                                </span>
                            </p>
                            {dismissible && !persistent && (
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="ml-auto flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
                                    aria-label="Dismiss"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
