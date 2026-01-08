"use client";

import { Section } from "@/components/ui/section";
import { useEffect, useState } from "react";

interface OrderItem {
    id: string;
    title: string;
    price: string;
    quantity: number;
}

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    items: OrderItem[];
    total: number;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();

            if (data.success) {
                setOrders(data.orders);
            } else {
                setError(data.error || "Failed to fetch orders");
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "success":
                return "bg-green-500/20 text-green-500 border-green-500/30";
            case "pending":
                return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
            case "failed":
                return "bg-red-500/20 text-red-500 border-red-500/30";
            default:
                return "bg-gray-500/20 text-gray-500 border-gray-500/30";
        }
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
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">
                            Orders Dashboard
                        </h1>
                        <button
                            onClick={fetchOrders}
                            className="px-4 py-2 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg transition-colors"
                        >
                            Refresh
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {orders.length === 0 ? (
                        <div className="text-center py-20 text-espresso-muted dark:text-ivory/60">
                            <p className="text-xl">No orders yet.</p>
                            <p className="text-sm mt-2">
                                Orders will appear here once customers place them.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white dark:bg-midnight-mid border border-creme-dark dark:border-white/5 rounded-2xl p-6 shadow-soft dark:shadow-card-dark"
                                >
                                    {/* Header */}
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-4 border-b border-creme-dark dark:border-white/10">
                                        <div>
                                            <h2 className="text-xl font-bold text-espresso dark:text-ivory">
                                                {order.orderNumber}
                                            </h2>
                                            <p className="text-sm text-espresso-muted dark:text-ivory/60">
                                                {formatDate(order.createdAt)}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <span
                                                className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(order.paymentStatus)}`}
                                            >
                                                {order.paymentMethod.toUpperCase()} -{" "}
                                                {order.paymentStatus}
                                            </span>
                                            <span
                                                className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(order.orderStatus)}`}
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Customer & Items Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Customer Info */}
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-bold text-gold uppercase tracking-wider">
                                                Customer
                                            </h3>
                                            <p className="font-bold text-espresso dark:text-ivory">
                                                {order.customerName}
                                            </p>
                                            <p className="text-sm text-espresso-muted dark:text-ivory/60">
                                                {order.email}
                                            </p>
                                            <p className="text-sm text-espresso-muted dark:text-ivory/60">
                                                {order.phone}
                                            </p>
                                            <p className="text-sm text-espresso-muted dark:text-ivory/60 mt-2">
                                                {order.address}, {order.city} - {order.pincode}
                                            </p>
                                        </div>

                                        {/* Order Items */}
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-bold text-gold uppercase tracking-wider">
                                                Items
                                            </h3>
                                            <div className="space-y-1">
                                                {order.items.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex justify-between text-sm"
                                                    >
                                                        <span className="text-espresso dark:text-ivory">
                                                            {item.title} × {item.quantity}
                                                        </span>
                                                        <span className="text-espresso-muted dark:text-ivory/60">
                                                            {item.price}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-2 border-t border-creme-dark dark:border-white/10 mt-2">
                                                <div className="flex justify-between font-bold">
                                                    <span className="text-espresso dark:text-ivory">
                                                        Total
                                                    </span>
                                                    <span className="text-gold">
                                                        ₹{order.total}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Section>
        </main>
    );
}
