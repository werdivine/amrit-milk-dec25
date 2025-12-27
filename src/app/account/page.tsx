import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
    return (
        <main className="bg-midnight min-h-screen pt-20">
            <Section className="min-h-[60vh] flex items-center justify-center">
                <div className="w-full max-w-md bg-glass-bg border border-glass-border p-10 rounded-3xl backdrop-blur-xl">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center text-gold font-serif font-bold text-2xl mx-auto mb-4">A</div>
                        <h1 className="text-3xl font-serif font-bold">Welcome Back</h1>
                        <p className="text-ivory/60 mt-2">Access your subscription and order history.</p>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-ivory/70">Email Address</label>
                            <input type="email" className="w-full bg-midnight border border-white/10 rounded-lg p-4 focus:border-gold outline-none transition-colors" placeholder="name@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-ivory/70">Password</label>
                            <input type="password" className="w-full bg-midnight border border-white/10 rounded-lg p-4 focus:border-gold outline-none transition-colors" placeholder="••••••••" />
                        </div>

                        <Button className="w-full" size="lg">Sign In</Button>
                    </form>

                    <div className="text-center mt-8 text-sm text-ivory/40">
                        <a href="#" className="hover:text-gold transition-colors">Forgot Password?</a>
                        <span className="mx-2">•</span>
                        <a href="#" className="hover:text-gold transition-colors">Create Account</a>
                    </div>
                </div>
            </Section>
        </main>
    );
}
