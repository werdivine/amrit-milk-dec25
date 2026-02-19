"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ChatWidget() {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <motion.a
                href="https://wa.me/918130693767"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Chat on WhatsApp"
            >
                {/* 
           Using a standard img tag or Next.js Image. 
           Assuming the user puts the image at public/assets/img/whatsapp-button.png 
        */}
                <div className="relative w-[200px] h-auto drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300">
                    <img
                        src="/assets/img/whatsapp-button.png"
                        alt="Talk to Us Before You Order"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </motion.a>
        </div>
    );
}

export default ChatWidget;
