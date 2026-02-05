"use client";

/**
 * Amrit AI - Chat Widget (Simplified)
 * Works without ai/react dependency
 */

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, User, X, ArrowRight } from "lucide-react";
import { SupportIcon } from "../ui/SupportIcon";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const WELCOME_MESSAGE = `🙏 नमस्ते! मैं हूँ Amrit AI, आपका ब्रांड गाइड।
मैं शुद्ध और ताज़ा Amrit Milk Organic के बारे में आपके सभी सवालों के जवाब दे सकता हूँ।

आप मुझसे पूछ सकते हैं:
• "Ghee ka price kya hai?"
• "A2 milk ke kya fayde hain?"
• "Farm visit kaise karein?"

Main aapki kaise madad kar sakta hoon?`;

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
                let hasReceivedContent = false;
                let buffer = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    
                    // Process lines from the buffer
                    const lines = buffer.split("\n");
                    // Keep the last partial line in the buffer
                    buffer = lines.pop() || "";

                    for (const line of lines) {
                        const trimmedLine = line.trim();
                        if (!trimmedLine) continue;

                        // Handle both 0: (text) and other parts of the data stream protocol
                        // If it starts with 0:, it's a text chunk in the Vercel AI SDK protocol
                        if (trimmedLine.startsWith('0:')) {
                            try {
                                const jsonStr = trimmedLine.slice(2);
                                const text = JSON.parse(jsonStr);
                                if (typeof text === 'string') {
                                    assistantContent += text;
                                    hasReceivedContent = true;
                                    updateAssistantMessage(assistantMessage.id, assistantContent);
                                }
                            } catch (e) {
                                // Fallback: if it's not valid JSON but looks like text, try to extract it
                                const match = trimmedLine.match(/^0:"(.*)"$/);
                                if (match && match[1]) {
                                    assistantContent += match[1];
                                    hasReceivedContent = true;
                                    updateAssistantMessage(assistantMessage.id, assistantContent);
                                }
                            }
                        } 
                        // If it doesn't start with a protocol prefix, it might be raw text (unlikely with toDataStreamResponse)
                        else if (!trimmedLine.match(/^[a-z]:/)) {
                            // Only append if it doesn't look like other protocol parts (e:, d:, etc.)
                            assistantContent += trimmedLine;
                            hasReceivedContent = true;
                            updateAssistantMessage(assistantMessage.id, assistantContent);
                        }
                    }
                }

                // Process remaining buffer
                if (buffer.startsWith('0:')) {
                    try {
                        const text = JSON.parse(buffer.slice(2));
                        if (typeof text === 'string') {
                            assistantContent += text;
                            hasReceivedContent = true;
                            updateAssistantMessage(assistantMessage.id, assistantContent);
                        }
                    } catch (e) {}
                }

                // If no content was received after the stream ends, show a fallback
                if (!hasReceivedContent) {
                    updateAssistantMessage(assistantMessage.id, "Maaf kijiyega, main abhi samajh nahi pa raha hoon. Kripya WhatsApp par contact karein। 🙏");
                }
            }
        } catch (error: any) {
            console.error("Chat error:", error);
            
            let errorMessage = "Kshama karein, kuch technical issue hai. Kripya thodi der baad try karein. 🙏";
            
            // If it's a specific configuration error, let the user know (helpful for dev/testing)
            if (error.message?.includes("configuration missing") || error.message?.includes("API key")) {
                errorMessage = "Amrit AI is currently in maintenance (Missing API Key). Please contact us via WhatsApp! 🙏";
            }

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: errorMessage,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const updateAssistantMessage = (id: string, content: string) => {
        setMessages((prev) =>
            prev.map((m) =>
                m.id === id ? { ...m, content } : m
            )
        );
    };

    const handleQuickReply = (value: string) => {
        setInput(value);
    };

    return (
        <>
            {/* Unified Chat FAB with Greeting */}
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.8 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="bg-black text-white px-6 py-3.5 rounded-[2rem] shadow-2xl flex items-center gap-2 whitespace-nowrap relative group border border-white/10"
                        >
                            <span className="font-bold text-base tracking-tight">Hi 👋 How can I help you today?</span>
                            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-4 h-4 bg-black rotate-45 border-r border-t border-white/10" />
                            
                            {/* Close button for greeting */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Local state to hide bubble
                                    const bubble = e.currentTarget.parentElement;
                                    if (bubble) bubble.style.display = 'none';
                                }}
                                className="absolute -top-2 -right-2 bg-white text-black rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity border border-black/10 hover:bg-neutral-100"
                            >
                                <X className="w-2.5 h-2.5" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    className="w-16 h-16 rounded-full shadow-2xl
                       bg-gradient-to-br from-amber-500 to-amber-700
                       border-2 border-white/30 flex items-center justify-center text-white relative"
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Support"
                >
                    {isOpen ? (
                        <X className="w-8 h-8" />
                    ) : (
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
                            <SupportIcon className="w-10 h-10" />
                            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                    )}
                </motion.button>
            </div>

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
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg border-2 border-white/20">
                                    <SupportIcon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-neutral-800 dark:text-white flex items-center gap-2">
                                        Amrit Support
                                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                                    </h3>
                                    <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Online & Ready to Help</p>
                                </div>
                            </div>
                            
                            <a
                                href="https://wa.me/918130693767"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1 group bg-[#25D366] hover:bg-[#20bd5a] px-3 py-2 rounded-2xl transition-all shadow-md hover:shadow-lg"
                            >
                                <MessageCircle className="w-5 h-5 text-white fill-current" />
                                <span className="text-[9px] font-black text-white uppercase tracking-tighter">WhatsApp</span>
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
                        <div className="px-4 pb-2 flex flex-col gap-3">
                            {messages.length <= 2 && (
                                <div className="flex flex-wrap gap-2">
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

                            <a
                                href="https://wa.me/918130693767"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl p-3 flex items-center justify-between group transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#25D366] p-2 rounded-lg text-white">
                                        <MessageCircle className="w-4 h-4 fill-current" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-neutral-800 dark:text-white">Talk to a Human</p>
                                        <p className="text-[10px] text-neutral-500">Fast response on WhatsApp</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#25D366] group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

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
