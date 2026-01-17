"use client";

import { Section } from "@/components/ui/section";
import { CheckCircle, Plus, Tag, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Coupon {
    id: string;
    code: string;
    type: "percentage" | "fixed";
    value: number;
    minOrderValue: number;
    isActive: boolean;
    usageCount: number;
    description?: string;
}

export default function AdminCouponsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [newCoupon, setNewCoupon] = useState({
        code: "",
        type: "percentage",
        value: "",
        minOrderValue: "",
        description: "",
        isActive: true,
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const res = await fetch("/api/admin/coupons");
            const data = await res.json();
            if (data.success) {
                setCoupons(data.coupons);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newCoupon.code || !newCoupon.value) return;

        try {
            const res = await fetch("/api/admin/coupons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCoupon),
            });
            const data = await res.json();

            if (data.success) {
                setCoupons([data.coupon, ...coupons]);
                setIsCreating(false);
                setNewCoupon({
                    code: "",
                    type: "percentage",
                    value: "",
                    minOrderValue: "",
                    description: "",
                    isActive: true,
                });
            } else {
                alert(data.error || "Failed");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this coupon?")) return;

        try {
            const res = await fetch(`/api/admin/coupons?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setCoupons(coupons.filter((c) => c.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <main className="bg-creme dark:bg-midnight min-h-screen py-12 transition-colors duration-500">
            <Section>
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-serif font-bold text-gradient-gold">
                            Coupon Manager
                        </h1>
                        <button
                            onClick={() => setIsCreating(!isCreating)}
                            className="flex items-center gap-2 px-4 py-2 bg-gold text-espresso font-bold rounded-lg hover:bg-gold-light transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            {isCreating ? "Cancel" : "Add Coupon"}
                        </button>
                    </div>

                    {/* Create Form */}
                    {isCreating && (
                        <div className="bg-white dark:bg-midnight-mid p-6 rounded-xl shadow-soft mb-8 border border-creme-dark dark:border-white/10 animate-fade-in-up">
                            <h2 className="text-xl font-bold mb-4 text-espresso dark:text-ivory">
                                New Coupon
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    placeholder="Coupon Code (e.g. SAVE10)"
                                    className="p-3 bg-stone-50 dark:bg-white/5 border rounded-lg"
                                    value={newCoupon.code}
                                    onChange={(e) =>
                                        setNewCoupon({
                                            ...newCoupon,
                                            code: e.target.value.toUpperCase(),
                                        })
                                    }
                                />
                                <div className="flex gap-2">
                                    <select
                                        className="p-3 bg-stone-50 dark:bg-white/5 border rounded-lg"
                                        value={newCoupon.type}
                                        onChange={(e) =>
                                            setNewCoupon({
                                                ...newCoupon,
                                                type: e.target.value as any,
                                            })
                                        }
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (₹)</option>
                                    </select>
                                    <input
                                        placeholder="Value"
                                        type="number"
                                        className="p-3 bg-stone-50 dark:bg-white/5 border rounded-lg flex-1"
                                        value={newCoupon.value}
                                        onChange={(e) =>
                                            setNewCoupon({ ...newCoupon, value: e.target.value })
                                        }
                                    />
                                </div>
                                <input
                                    placeholder="Min Order Value (Optional)"
                                    type="number"
                                    className="p-3 bg-stone-50 dark:bg-white/5 border rounded-lg"
                                    value={newCoupon.minOrderValue}
                                    onChange={(e) =>
                                        setNewCoupon({
                                            ...newCoupon,
                                            minOrderValue: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    placeholder="Description"
                                    className="p-3 bg-stone-50 dark:bg-white/5 border rounded-lg"
                                    value={newCoupon.description}
                                    onChange={(e) =>
                                        setNewCoupon({ ...newCoupon, description: e.target.value })
                                    }
                                />
                            </div>
                            <button
                                onClick={handleCreate}
                                className="w-full py-3 bg-gold text-espresso font-bold rounded-lg hover:bg-gold-light"
                            >
                                Create Coupon
                            </button>
                        </div>
                    )}

                    {/* Coupon List */}
                    <div className="space-y-4">
                        {coupons.length === 0 ? (
                            <div className="text-center py-20 opacity-50">No coupons found.</div>
                        ) : (
                            coupons.map((coupon) => (
                                <div
                                    key={coupon.id}
                                    className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                                            <Tag className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-espresso dark:text-ivory flex items-center gap-2">
                                                {coupon.code}
                                                <span className="text-xs px-2 py-0.5 rounded bg-stone-100 dark:bg-white/10 font-normal">
                                                    {coupon.type === "percentage"
                                                        ? `${coupon.value}% OFF`
                                                        : `₹${coupon.value} OFF`}
                                                </span>
                                            </h3>
                                            <p className="text-sm text-espresso-muted dark:text-ivory/60">
                                                {coupon.description || "No description"} • Min
                                                Order: ₹{coupon.minOrderValue || 0}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${coupon.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                        >
                                            {coupon.isActive ? (
                                                <CheckCircle className="w-3 h-3" />
                                            ) : (
                                                <XCircle className="w-3 h-3" />
                                            )}
                                            {coupon.isActive ? "Active" : "Inactive"}
                                        </div>
                                        <button
                                            onClick={() => handleDelete(coupon.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </Section>
        </main>
    );
}
