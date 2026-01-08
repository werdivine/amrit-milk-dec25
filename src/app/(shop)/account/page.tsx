"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronRight,
    CircleCheck,
    Clock,
    CreditCard,
    Home,
    LogOut,
    Mail,
    MapPin,
    Package,
    Phone,
    Settings,
    Star,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: string;
    total: number;
    items?: any;
}

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
    city?: string;
    state?: string;
    tier: string;
    totalSpent: number;
    activeSubscriptions: number;
    impactPoints: number;
}

export default function AccountPage() {
    const [greeting, setGreeting] = useState("Good Day");
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [phoneInput, setPhoneInput] = useState("");

    // User Data State
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [userOrders, setUserOrders] = useState<Order[]>([]);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 17) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");

        // Check for local auth
        const storedPhone = localStorage.getItem("amrit_user_phone");
        if (storedPhone) {
            handleLogin(storedPhone);
        }
    }, []);

    const handleLogin = async (phone: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user/profile?phone=${phone}`);
            const data = await res.json();

            if (res.ok) {
                setUserProfile(data.profile);
                setUserOrders(data.orders || []);
                setIsAuthenticated(true);
                localStorage.setItem("amrit_user_phone", phone);
            } else {
                // Fallback for demo if API fails or no user found yet
                setUserProfile({
                    name: "Guest Member",
                    phone: phone,
                    tier: "Bronze Start",
                    totalSpent: 0,
                    impactPoints: 0,
                });
                setIsAuthenticated(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("amrit_user_phone");
        setUserProfile(null);
        setUserOrders([]);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1 },
        },
    };

    if (!isAuthenticated) {
        return (
            <main className="bg-theme-primary min-h-screen pt-32 pb-20 relative overflow-hidden flex items-center justify-center">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/5 dark:bg-gold/5 rounded-full blur-[100px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 dark:bg-gold/5 rounded-full blur-[100px] -ml-64 -mb-64" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-theme p-10 rounded-[3rem] border-theme-light shadow-2xl max-w-md w-full relative z-10"
                >
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-tr from-gold to-warmGold rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg">
                            <User className="w-10 h-10 text-espresso" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-theme-primary mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-theme-secondary italic">
                            Enter your phone number to access your premium dashboard.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-theme-muted pl-4">
                                Phone Number
                            </label>
                            <div className="relative group">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-accent group-focus-within:scale-110 transition-transform" />
                                <input
                                    type="tel"
                                    placeholder="Enter your registered number"
                                    value={phoneInput}
                                    onChange={(e) => setPhoneInput(e.target.value)}
                                    className="w-full bg-theme-secondary/50 text-theme-primary border border-theme-light rounded-2xl p-5 pl-14 focus:border-terracotta dark:focus:border-gold outline-none transition-all font-bold shadow-soft text-lg"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={() => handleLogin(phoneInput)}
                            disabled={loading || phoneInput.length < 10}
                            className="w-full bg-gradient-to-tr from-terracotta to-[#8B4513] dark:from-gold dark:to-warmGold text-white dark:text-espresso rounded-[1.5rem] py-7 text-lg font-black shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Secure Login"
                            )}
                        </Button>
                    </div>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="bg-theme-primary min-h-screen pt-32 pb-20 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/5 dark:bg-gold/5 rounded-full blur-[100px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 dark:bg-gold/5 rounded-full blur-[100px] -ml-64 -mb-64" />

            <Section className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h2 className="text-theme-accent font-bold uppercase tracking-[0.3em] mb-2 text-sm">
                            {greeting}
                        </h2>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-theme-primary text-balance">
                            Welcome,{" "}
                            <span className="text-terracotta dark:text-gold italic">
                                {userProfile?.name?.split(" ")[0] || "Friend"}
                            </span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 bg-theme-secondary/50 p-4 rounded-3xl border border-theme-light">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 rounded-full border-2 border-theme-primary bg-theme-secondary flex items-center justify-center overflow-hidden"
                                >
                                    <User className="w-5 h-5 text-theme-muted" />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm font-medium text-theme-secondary">
                            <span className="text-terracotta dark:text-gold font-bold">
                                Member Tier
                            </span>
                            <br />
                            {userProfile?.tier || "Silver Member"}
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Navigation Sidebar */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-3 space-y-4"
                    >
                        <nav className="glass-theme p-4 rounded-[2.5rem] border-theme-light shadow-2xl">
                            <div className="space-y-1">
                                {[
                                    { id: "dashboard", icon: Home, label: "Dashboard" },
                                    { id: "orders", icon: Package, label: "My Orders" },
                                    { id: "addresses", icon: MapPin, label: "Addresses" },
                                    { id: "payment", icon: CreditCard, label: "Payments" },
                                    { id: "settings", icon: Settings, label: "Settings" },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                                            activeTab === item.id
                                                ? "bg-terracotta dark:bg-gold text-white dark:text-espresso shadow-lg scale-[1.02]"
                                                : "hover:bg-theme-secondary text-theme-secondary"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon
                                                className={`w-5 h-5 ${activeTab === item.id ? "text-white dark:text-espresso" : "text-theme-accent"}`}
                                            />
                                            <span className="font-semibold tracking-wide">
                                                {item.label}
                                            </span>
                                        </div>
                                        {activeTab === item.id && (
                                            <motion.div layoutId="active-indicator">
                                                <ChevronRight className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <Separator className="my-6 bg-theme-light" />

                            <div className="px-4 py-2">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-4 text-espresso-muted hover:text-red-500 transition-colors py-2 font-medium w-full"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Disconnect</span>
                                </button>
                            </div>
                        </nav>

                        {/* Support Card */}
                        <div className="glass-theme p-8 rounded-[2.5rem] bg-gradient-to-br from-terracotta/10 to-transparent border-terracotta/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-terracotta/5 rounded-full -mr-12 -mt-12 blur-xl" />
                            <h3 className="text-lg font-serif font-bold text-theme-primary mb-2 whitespace-nowrap">
                                Need Assistance?
                            </h3>
                            <p className="text-sm text-theme-secondary mb-6 leading-relaxed">
                                Our priority support team is available 24/7 for you.
                            </p>
                            <Button className="w-full bg-theme-primary border-2 border-terracotta dark:border-gold text-theme-primary hover:bg-terracotta dark:hover:bg-gold hover:text-white dark:hover:text-espresso transition-all rounded-2xl py-6 font-bold shadow-soft">
                                Support Concierge
                            </Button>
                        </div>
                    </motion.div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                {activeTab === "dashboard" && (
                                    <div className="space-y-8">
                                        {/* Statistics Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {[
                                                {
                                                    label: "Total Investment",
                                                    value: `₹${userProfile?.totalSpent?.toLocaleString() || "0"}`,
                                                    sub: "Lifetime Value",
                                                    icon: CircleCheck,
                                                    color: "text-green-500",
                                                },
                                                {
                                                    label: "Active Subscriptions",
                                                    value: `${userProfile?.activeSubscriptions || 0} Plans`,
                                                    sub: "Manage in Orders",
                                                    icon: Clock,
                                                    color: "text-amber-500",
                                                },
                                                {
                                                    label: "Impact Points",
                                                    value: `${userProfile?.impactPoints || 0} px`,
                                                    sub: "Loyalty Rewards",
                                                    icon: Star,
                                                    color: "text-terracotta dark:text-gold",
                                                },
                                            ].map((stat, i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ y: -5 }}
                                                    className="glass-theme p-8 rounded-[2.5rem] border-theme-light shadow-xl group border-b-4 border-b-transparent hover:border-b-theme-accent transition-all"
                                                >
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div
                                                            className={`p-4 rounded-2xl bg-theme-secondary group-hover:scale-110 transition-transform ${stat.color}`}
                                                        >
                                                            <stat.icon className="w-6 h-6" />
                                                        </div>
                                                        <div className="text-[10px] font-bold uppercase tracking-widest text-theme-muted bg-theme-secondary px-3 py-1.5 rounded-full">
                                                            Secure
                                                        </div>
                                                    </div>
                                                    <h4 className="text-theme-secondary text-sm font-medium mb-1">
                                                        {stat.label}
                                                    </h4>
                                                    <div className="text-3xl font-bold text-theme-primary mb-1 tracking-tight">
                                                        {stat.value}
                                                    </div>
                                                    <p className="text-xs text-theme-muted font-medium italic">
                                                        {stat.sub}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Main Dashboard Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Recent Activity */}
                                            <div className="glass-theme p-8 rounded-[2.5rem] border-theme-light shadow-2xl">
                                                <div className="flex items-center justify-between mb-8">
                                                    <h3 className="text-2xl font-serif font-bold text-theme-primary">
                                                        Recent Orders
                                                    </h3>
                                                    <button
                                                        onClick={() => setActiveTab("orders")}
                                                        className="text-xs font-bold text-terracotta dark:text-gold hover:underline tracking-widest uppercase"
                                                    >
                                                        View All
                                                    </button>
                                                </div>
                                                <div className="space-y-6">
                                                    {userOrders.length > 0 ? (
                                                        userOrders.slice(0, 2).map((order, i) => (
                                                            <div
                                                                key={order.id}
                                                                className="flex items-center gap-6 group"
                                                            >
                                                                <div className="w-16 h-16 rounded-2xl bg-theme-secondary flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden relative">
                                                                    <div className="absolute inset-0 bg-terracotta/5 animate-pulse" />
                                                                    <Package className="w-8 h-8 text-theme-accent relative z-10" />
                                                                </div>
                                                                <div className="flex-1 border-b border-theme-light pb-4">
                                                                    <div className="flex justify-between items-start mb-1">
                                                                        <h4 className="font-bold text-theme-primary text-lg">
                                                                            Order #
                                                                            {order.orderNumber}
                                                                        </h4>
                                                                        <span className="text-sm font-bold text-theme-accent">
                                                                            ₹{order.total}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between text-xs text-theme-muted font-bold tracking-wider">
                                                                        <span>
                                                                            {new Date(
                                                                                order.date
                                                                            ).toLocaleDateString()}
                                                                        </span>
                                                                        <span className="flex items-center gap-1.5 uppercase">
                                                                            <div
                                                                                className={`w-1.5 h-1.5 rounded-full ${order.status === "delivered" ? "bg-green-500" : "bg-amber-500"}`}
                                                                            />
                                                                            {order.status}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-center py-8 text-theme-muted italic">
                                                            No recent orders found.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Subscription Status */}
                                            <div className="glass-theme p-8 rounded-[2.5rem] bg-[#1a1a1a] dark:bg-white/5 text-ivory border-0 relative overflow-hidden group shadow-2xl">
                                                {/* Decorative Background */}
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-gold/20 transition-colors duration-700" />
                                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-terracotta/10 rounded-full -ml-16 -mb-16 blur-2xl" />

                                                <h3 className="text-2xl font-serif font-bold mb-8 relative z-10">
                                                    Subscription Status
                                                </h3>
                                                <div className="space-y-8 relative z-10">
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-1">
                                                            <span className="text-xs font-bold tracking-[0.2em] text-ivory/50 uppercase">
                                                                Active Experience
                                                            </span>
                                                            <div className="text-2xl font-bold text-gold italic">
                                                                Premium Elite Plan
                                                            </div>
                                                        </div>
                                                        <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5">
                                                            <Star className="w-8 h-8 text-gold animate-pulse" />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex justify-between text-xs font-bold tracking-widest text-ivory/40">
                                                            <span>DELIVERY CYCLE</span>
                                                            <span>--</span>
                                                        </div>
                                                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: "5%" }}
                                                                transition={{
                                                                    duration: 2,
                                                                    ease: "circOut",
                                                                }}
                                                                className="h-full bg-gradient-to-r from-gold via-warmGold to-gold rounded-full relative"
                                                            >
                                                                <div className="absolute inset-0 bg-white/20 animate-shine" />
                                                            </motion.div>
                                                        </div>
                                                        <div className="text-[10px] font-medium text-ivory/40 text-center tracking-[0.1em]">
                                                            Subscriptions coming soon
                                                        </div>
                                                    </div>

                                                    <Button
                                                        disabled
                                                        className="w-full bg-gradient-to-tr from-gold to-warmGold text-espresso hover:brightness-110 transition-all rounded-[1.5rem] py-8 text-lg font-black shadow-[0_10px_30px_rgba(212,175,55,0.3)] opacity-80 cursor-not-allowed"
                                                    >
                                                        Coming Soon
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "orders" && (
                                    <div className="glass-theme p-10 rounded-[3rem] border-theme-light shadow-2xl">
                                        <div className="flex items-center justify-between mb-10">
                                            <h2 className="text-4xl font-serif font-bold text-theme-primary">
                                                Order History
                                            </h2>
                                            <div className="flex gap-2">
                                                <div className="px-5 py-2 rounded-full bg-theme-secondary text-theme-accent text-xs font-bold tracking-widest cursor-pointer border border-theme-light hover:border-theme-accent transition-colors">
                                                    ALL
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {userOrders.length > 0 ? (
                                                userOrders.map((order, i) => (
                                                    <motion.div
                                                        key={order.id}
                                                        whileHover={{ scale: 1.01, x: 5 }}
                                                        className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-[2.5rem] bg-theme-secondary/30 hover:bg-theme-secondary transition-all group border border-transparent hover:border-theme-light shadow-soft"
                                                    >
                                                        <div className="flex items-center gap-8 mb-4 md:mb-0">
                                                            <div className="w-16 h-16 rounded-[1.5rem] bg-theme-primary border border-theme-light flex items-center justify-center text-theme-accent group-hover:bg-theme-accent group-hover:text-white transition-all duration-500">
                                                                <Package className="w-7 h-7" />
                                                            </div>
                                                            <div>
                                                                <div className="text-xl font-bold text-theme-primary italic mb-1">
                                                                    Order #{order.orderNumber}
                                                                </div>
                                                                <div className="text-xs text-theme-muted font-bold tracking-[0.1em] uppercase">
                                                                    {new Date(
                                                                        order.date
                                                                    ).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-10 justify-between md:justify-end">
                                                            <div className="text-right">
                                                                <div className="text-lg font-bold text-theme-primary">
                                                                    ₹{order.total}
                                                                </div>
                                                                <div className="text-xs text-theme-muted font-medium italic">
                                                                    Ordered Items
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`flex items-center gap-2.5 px-4 py-2 rounded-full ${order.status === "delivered" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}`}
                                                            >
                                                                <div
                                                                    className={`w-2 h-2 rounded-full animate-pulse ${order.status === "delivered" ? "bg-green-500" : "bg-amber-500"}`}
                                                                />
                                                                <span className="text-[10px] font-black tracking-widest uppercase">
                                                                    {order.status}
                                                                </span>
                                                            </div>
                                                            <ChevronRight className="w-6 h-6 text-theme-muted group-hover:text-theme-accent transition-all" />
                                                        </div>
                                                    </motion.div>
                                                ))
                                            ) : (
                                                <div className="text-center py-12 text-theme-muted italic">
                                                    No orders found. Start shopping to see your
                                                    history here!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "settings" && (
                                    <div className="glass-theme p-12 rounded-[3rem] border-theme-light shadow-2xl">
                                        <div className="mb-10">
                                            <h2 className="text-4xl font-serif font-bold text-theme-primary mb-2">
                                                Account Matrix
                                            </h2>
                                            <p className="text-theme-secondary font-medium italic">
                                                Synchronize your personal preferences and profile
                                                settings.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-8">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-theme-muted pl-1">
                                                        Full Legal Name
                                                    </label>
                                                    <div className="relative group">
                                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-accent group-focus-within:scale-110 transition-transform" />
                                                        <input
                                                            type="text"
                                                            defaultValue={userProfile?.name}
                                                            className="w-full bg-theme-secondary/50 text-theme-primary border border-theme-light rounded-2xl p-5 pl-14 focus:border-terracotta dark:focus:border-gold outline-none transition-all font-bold shadow-soft"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-theme-muted pl-1">
                                                        Digital Identity (Email)
                                                    </label>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-accent group-focus-within:scale-110 transition-transform" />
                                                        <input
                                                            type="email"
                                                            defaultValue={userProfile?.email}
                                                            className="w-full bg-theme-secondary/50 text-theme-primary border border-theme-light rounded-2xl p-5 pl-14 focus:border-terracotta dark:focus:border-gold outline-none transition-all font-bold shadow-soft"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-theme-muted pl-1">
                                                        Secured Phone Signature
                                                    </label>
                                                    <div className="relative group">
                                                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-accent group-focus-within:scale-110 transition-transform" />
                                                        <input
                                                            type="tel"
                                                            defaultValue={userProfile?.phone}
                                                            className="w-full bg-theme-secondary/50 text-theme-primary border border-theme-light rounded-2xl p-5 pl-14 focus:border-terracotta dark:focus:border-gold outline-none transition-all font-bold shadow-soft"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-theme-muted pl-1">
                                                        Primary Residence
                                                    </label>
                                                    <div className="relative group">
                                                        <Home className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-accent group-focus-within:scale-110 transition-transform" />
                                                        <input
                                                            type="text"
                                                            defaultValue={userProfile?.address}
                                                            className="w-full bg-theme-secondary/50 text-theme-primary border border-theme-light rounded-2xl p-5 pl-14 focus:border-terracotta dark:focus:border-gold outline-none transition-all font-bold shadow-soft"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-16 flex justify-end">
                                            <Button className="bg-gradient-to-tr from-terracotta to-[#8B4513] dark:from-gold dark:to-warmGold text-white dark:text-espresso rounded-[2rem] px-16 py-8 font-black text-xl shadow-2xl hover:scale-105 hover:shadow-terracotta/20 dark:hover:shadow-gold/20 transition-all active:scale-95">
                                                Synchronize Profile
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Section>
        </main>
    );
}
