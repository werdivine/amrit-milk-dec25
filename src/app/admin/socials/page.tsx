"use client";

import { Section } from "@/components/ui/section";
import { CheckCircle, ExternalLink, Instagram, MapPin, RefreshCw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface SocialStatus {
    instagram: boolean;
    google: boolean;
    instagramExpiry: string | null;
    googleExpiry: string | null;
}

export default function AdminSocialsPage() {
    const [status, setStatus] = useState<SocialStatus>({
        instagram: false,
        google: false,
        instagramExpiry: null,
        googleExpiry: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            if (data.success) {
                setStatus(data.status);
            }
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = (platform: "instagram" | "google") => {
        // Redirect to auth endpoint
        window.location.href = `/api/auth/${platform}/login`;
    };

    if (loading) {
        return (
            <main className="bg-creme dark:bg-midnight min-h-screen flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full"></div>
            </main>
        );
    }

    return (
        <main className="bg-creme dark:bg-midnight min-h-screen py-12 transition-colors duration-500">
            <Section>
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">
                                Social Integrations
                            </h1>
                            <p className="text-espresso-muted dark:text-ivory/60 mt-2">
                                Manage your connections to Instagram and Google
                            </p>
                        </div>
                        <button
                            onClick={fetchStatus}
                            className="p-2 bg-gold/10 hover:bg-gold/20 text-gold rounded-full transition-colors"
                        >
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Instagram Card */}
                        <div className="relative overflow-hidden bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-3xl p-8 shadow-premium">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Instagram className="w-32 h-32" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-4 bg-pink-500/10 rounded-2xl">
                                        <Instagram className="w-8 h-8 text-pink-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-espresso dark:text-ivory">
                                        Instagram Feed
                                    </h2>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-semibold uppercase tracking-wider text-espresso-muted dark:text-ivory/40">
                                            Status
                                        </span>
                                        {status.instagram ? (
                                            <span className="flex items-center gap-1 text-green-500 text-sm font-bold bg-green-500/10 px-2 py-1 rounded-full">
                                                <CheckCircle className="w-3 h-3" /> Connected
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-500 text-sm font-bold bg-red-500/10 px-2 py-1 rounded-full">
                                                <XCircle className="w-3 h-3" /> Disconnected
                                            </span>
                                        )}
                                    </div>
                                    {status.instagramExpiry && (
                                        <p className="text-xs text-espresso-muted dark:text-ivory/40">
                                            Token expires on:{" "}
                                            {new Date(status.instagramExpiry).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                <p className="text-espresso-muted dark:text-ivory/60 mb-8 h-12">
                                    Connect your Instagram account to automatically sync your latest
                                    posts to the website homepage.
                                </p>

                                <button
                                    onClick={() => handleConnect("instagram")}
                                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                >
                                    {status.instagram ? "Reconnect Instagram" : "Connect Instagram"}
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Google Card */}
                        <div className="relative overflow-hidden bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-3xl p-8 shadow-premium">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <MapPin className="w-32 h-32" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-4 bg-blue-500/10 rounded-2xl">
                                        <MapPin className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-espresso dark:text-ivory">
                                        Google Reviews
                                    </h2>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-semibold uppercase tracking-wider text-espresso-muted dark:text-ivory/40">
                                            Status
                                        </span>
                                        {status.google ? (
                                            <span className="flex items-center gap-1 text-green-500 text-sm font-bold bg-green-500/10 px-2 py-1 rounded-full">
                                                <CheckCircle className="w-3 h-3" /> Connected
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-500 text-sm font-bold bg-red-500/10 px-2 py-1 rounded-full">
                                                <XCircle className="w-3 h-3" /> Disconnected
                                            </span>
                                        )}
                                    </div>
                                    {status.googleExpiry && (
                                        <p className="text-xs text-espresso-muted dark:text-ivory/40">
                                            Token expires on:{" "}
                                            {new Date(status.googleExpiry).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                <p className="text-espresso-muted dark:text-ivory/60 mb-8 h-12">
                                    Connect your Google Business Profile to display your latest
                                    5-star reviews and build trust.
                                </p>

                                <button
                                    onClick={() => handleConnect("google")}
                                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                >
                                    {status.google ? "Reconnect Google" : "Connect Google"}
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Import Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-espresso dark:text-ivory mb-6">
                            Import Single Post
                        </h2>
                        <div className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-3xl p-8 shadow-premium max-w-2xl">
                            <p className="text-espresso-muted dark:text-ivory/60 mb-4">
                                Paste an Instagram post URL to import it directly into Sanity.
                            </p>
                            <ImportPostForm />
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}

function ImportPostForm() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
        null
    );

    const handleImport = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/admin/import-instagram", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });
            const data = await res.json();

            if (data.success) {
                setMessage({ type: "success", text: "Post imported successfully!" });
                setUrl("");
            } else {
                setMessage({ type: "error", text: data.error || "Failed to import post" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Network error occurred" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleImport} className="space-y-4">
            <div className="flex gap-4">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.instagram.com/p/..."
                    className="flex-1 px-4 py-3 bg-creme dark:bg-midnight border border-creme-dark dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gold hover:bg-gold/80 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                    {loading ? "Importing..." : "Import"}
                </button>
            </div>
            {message && (
                <div
                    className={`p-3 rounded-lg text-sm font-bold ${
                        message.type === "success"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                    }`}
                >
                    {message.text}
                </div>
            )}
        </form>
    );
}
