"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
    title: string;
    text: string;
    url: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy:", err);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className="w-16 h-16 flex items-center justify-center bg-theme-elevated border border-theme-light rounded-full hover:bg-terracotta/10 dark:hover:bg-gold/10 hover:border-terracotta/30 dark:hover:border-gold/30 transition-all group"
            title="Share Product"
        >
            {copied ? (
                <Check className="w-6 h-6 text-green-500" />
            ) : (
                <Share2 className="w-6 h-6 text-theme-primary group-hover:text-theme-accent transition-colors" />
            )}
        </button>
    );
}
