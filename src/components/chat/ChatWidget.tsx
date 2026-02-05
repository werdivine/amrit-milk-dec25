"use client";

/**
 * Amrit AI - Chat Widget (Simplified)
 * Works without ai/react dependency
 */

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, User, X } from "lucide-react";
import { SupportIcon } from "../ui/FarmerIcon";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const WELCOME_MESSAGE = `🙏 नमस्ते! मैं हूँ Amrit AI।
Amrit Milk Organic के बारे में कोई भी सवाल पूछिए।

"Ghee ka price?" | "A2 milk kya hai?" | "Farm visit kaise karein?"`;

const QUICK_REPLIES = [
    { id: "ghee-price", label: "Ghee ka price?", value: "Ghee ka price kya hai?" },
    { id: "a2-milk", label: "A2 milk kya hai?", value: "A2 milk kya hota hai?" },
    { id: "farm-visit", label: "Farm visit", value: "Farm visit kaise karein?" },
];

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!response.ok) throw new Error("Failed to get response");

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantContent = "";

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "",
            };
            setMessages((prev) => [...prev, assistantMessage]);

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    // Parse SSE data
                    const lines = chunk.split("\n");
                    for (const line of lines) {
                        if (line.startsWith("0:")) {
                            try {
                                const text = JSON.parse(line.slice(2));
                                assistantContent += text;
                                setMessages((prev) =>
                                    prev.map((m) =>
                                        m.id === assistantMessage.id
                                            ? { ...m, content: assistantContent }
                                            : m
                                    )
                                );
                            } catch {
                                // Skip malformed chunks
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "assistant",
                    content:
                        "Kshama karein, kuch technical issue hai. Kripya thodi der baad try karein. 🙏",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickReply = (value: string) => {
        setInput(value);
    };

    return (
        <>
            {/* Unified Chat FAB */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl
                   bg-gradient-to-br from-amber-500 to-amber-700
                   border-2 border-white/30 flex items-center justify-center text-white"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Support"
            >
                {isOpen ? (
                    <X className="w-8 h-8" />
                ) : (
                    <div className="relative">
                        <SupportIcon className="w-8 h-8" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                )}
            </motion.button>

            {/* Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[600px]
                       rounded-3xl overflow-hidden bg-white/95 dark:bg-neutral-900/95
                       backdrop-blur-xl border border-white/30 shadow-2xl flex flex-col"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    >
                        {/* Header with WhatsApp Integration */}
                        <div className="px-5 py-4 border-b border-white/20 bg-gradient-to-r from-amber-500/10 to-amber-600/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-inner">
                                    <SupportIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-800 dark:text-white flex items-center gap-2">
                                        Amrit Support
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    </h3>
                                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">AI + Human Support</p>
                                </div>
                            </div>
                            
                            <a
                                href="https://wa.me/918130693767"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-0.5 group"
                            >
                                <div className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-2 rounded-full transition-all hover:rotate-12 shadow-sm">
                                    <MessageCircle className="w-4 h-4 fill-current" />
                                </div>
                                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-tighter group-hover:text-[#25D366]">WhatsApp</span>
                            </a>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px]">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                    ${msg.role === "user" ? "bg-blue-500" : "bg-gradient-to-br from-amber-500 to-amber-700"}`}
                                    >
                                        {msg.role === "user" ? (
                                            <User className="w-4 h-4 text-white" />
                                        ) : (
                                            <Bot className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                    <div
                                        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                                            msg.role === "user"
                                                ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-tr-md"
                                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-tl-md"
                                        }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-tl-md px-4 py-3">
                                        <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length <= 2 && (
                            <div className="px-4 pb-2 flex flex-wrap gap-2">
                                {QUICK_REPLIES.map((r) => (
                                    <button
                                        key={r.id}
                                        onClick={() => handleQuickReply(r.value)}
                                        className="px-3 py-1.5 text-xs rounded-full bg-amber-100 dark:bg-amber-900/30
                             text-amber-700 dark:text-amber-300 hover:bg-amber-200"
                                    >
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-4 border-t border-white/20 bg-white/50 dark:bg-neutral-900/50"
                        >
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Apna sawaal puchiye..."
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800
                           border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-white
                           placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600
                           text-white font-medium disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default ChatWidget;
