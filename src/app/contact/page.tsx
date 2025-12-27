"use client";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";

const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919876543210" },
    { icon: Mail, label: "Email", value: "hello@amritmilk.com", href: "mailto:hello@amritmilk.com" },
    { icon: Clock, label: "Support Hours", value: "6 AM - 10 PM Daily", href: null },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        alert("Thank you! We will get back to you within 24 hours.");
    };

    return (
        <main className="bg-midnight min-h-screen">
            {/* Hero */}
            <section className="relative py-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
                <div className="relative z-10 text-center max-w-4xl px-6">
                    <span className="text-gold font-bold uppercase tracking-[0.3em] mb-4 block">Connect</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-ivory mb-6">Get in Touch</h1>
                    <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
                        Questions about subscriptions? Want to schedule a farm visit?
                        We're here to help.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-12 border-y border-glass-border bg-midnight-mid">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {contactInfo.map((item) => {
                            const Icon = item.icon;
                            const Wrapper = item.href ? 'a' : 'div';
                            return (
                                <Wrapper
                                    key={item.label}
                                    href={item.href || undefined}
                                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                                    className="glass p-6 rounded-2xl border border-glass-border hover:border-gold/30 transition-all text-center group cursor-pointer"
                                >
                                    <Icon className="w-8 h-8 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                    <p className="text-ivory/50 text-sm mb-1">{item.label}</p>
                                    <p className="text-ivory font-medium">{item.value}</p>
                                </Wrapper>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Form & Map */}
            <Section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div className="glass p-8 md:p-10 rounded-3xl border border-glass-border">
                        <h2 className="text-2xl font-bold text-ivory mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-ivory/70 text-sm mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-midnight/50 border border-glass-border rounded-xl text-ivory focus:border-gold focus:outline-none transition-colors"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-ivory/70 text-sm mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3 bg-midnight/50 border border-glass-border rounded-xl text-ivory focus:border-gold focus:outline-none transition-colors"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-ivory/70 text-sm mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 bg-midnight/50 border border-glass-border rounded-xl text-ivory focus:border-gold focus:outline-none transition-colors"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-ivory/70 text-sm mb-2">Subject</label>
                                <select
                                    className="w-full px-4 py-3 bg-midnight/50 border border-glass-border rounded-xl text-ivory focus:border-gold focus:outline-none transition-colors"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                >
                                    <option value="">Select a topic</option>
                                    <option value="subscription">Subscription Inquiry</option>
                                    <option value="delivery">Delivery Issue</option>
                                    <option value="farm-visit">Farm Visit Booking</option>
                                    <option value="wholesale">Wholesale / B2B</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-ivory/70 text-sm mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 bg-midnight/50 border border-glass-border rounded-xl text-ivory focus:border-gold focus:outline-none transition-colors resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <Button type="submit" size="lg" className="w-full bg-gold text-midnight hover:bg-white">
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Map & Location */}
                    <div className="space-y-6">
                        <div className="glass p-8 rounded-3xl border border-glass-border">
                            <div className="flex items-start gap-4 mb-6">
                                <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold text-ivory mb-2">Farm Location</h3>
                                    <p className="text-ivory/70">
                                        Amrit Gir Cow Farm<br />
                                        Village Naimisharanya, Sitapur Road<br />
                                        Lucknow, Uttar Pradesh 226401
                                    </p>
                                </div>
                            </div>
                            <p className="text-ivory/50 text-sm">
                                Farm visits available every Sunday for subscribers.
                                Book via WhatsApp at least 48 hours in advance.
                            </p>
                        </div>

                        {/* Map Placeholder */}
                        <div className="aspect-square bg-midnight-mid rounded-3xl border border-glass-border flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-12 h-12 text-gold/50 mx-auto mb-4" />
                                <p className="text-ivory/50">Interactive Map</p>
                                <p className="text-ivory/30 text-sm">Coming Soon</p>
                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            className="block glass p-6 rounded-3xl border border-green-500/30 hover:border-green-500/50 transition-all text-center group"
                        >
                            <MessageCircle className="w-10 h-10 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <p className="text-ivory font-bold text-lg">Prefer WhatsApp?</p>
                            <p className="text-ivory/60 text-sm">Get instant responses on WhatsApp</p>
                        </a>
                    </div>
                </div>
            </Section>
        </main>
    );
}
