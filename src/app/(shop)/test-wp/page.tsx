import { wordpress } from '@/lib/wordpress';
import { Section } from "@/components/ui/section";

export default async function WordPressTestPage() {
    const status = wordpress.isConfigured
        ? `✅ Connected to ${wordpress.url}`
        : '⚠️ Not configured - using static data';

    let testResult = null;

    if (wordpress.isConfigured) {
        try {
            const { getWooCommerceProducts } = await import('@/lib/wordpress');
            const products = await getWooCommerceProducts();
            testResult = products;
        } catch (error: any) {
            testResult = { error: error.message };
        }
    }

    return (
        <main className="bg-midnight min-h-screen pt-32">
            <Section>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-serif font-bold mb-6">WordPress Integration Test</h1>

                    <div className="bg-glass-bg border border-glass-border rounded-2xl p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Connection Status</h2>
                        <p className="text-xl mb-4">{status}</p>

                        {!wordpress.isConfigured && (
                            <div className="bg-gold/10 border border-gold/30 rounded-xl p-6 mt-4">
                                <h3 className="font-bold mb-2">To Configure WordPress:</h3>
                                <ol className="list-decimal list-inside space-y-2 text-sm text-ivory/70">
                                    <li>Get WooCommerce API keys from WordPress Admin</li>
                                    <li>Add them to <code className="bg-midnight px-2 py-1 rounded">.env.local</code></li>
                                    <li>Restart the dev server</li>
                                    <li>Refresh this page</li>
                                </ol>
                            </div>
                        )}
                    </div>

                    {testResult && (
                        <div className="bg-glass-bg border border-glass-border rounded-2xl p-8">
                            <h2 className="text-2xl font-bold mb-4">API Response</h2>
                            <pre className="bg-midnight p-4 rounded overflow-auto text-xs">
                                {JSON.stringify(testResult, null, 2)}
                            </pre>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <a href="/" className="text-gold hover:underline">← Back to Home</a>
                    </div>
                </div>
            </Section>
        </main>
    );
}
