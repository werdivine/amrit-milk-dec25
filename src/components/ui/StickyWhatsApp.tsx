"use client";

import { MessageCircle } from "lucide-react";

export function StickyWhatsApp() {
    return (
        <a
            href="https://wa.me/918130693767" // Updated WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 group animate-fade-in-up"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-6 h-6" />
            <span className="font-medium hidden group-hover:block transition-all duration-300">
                Have a question? A real person from our team will reply.
            </span>
        </a>
    );
}
