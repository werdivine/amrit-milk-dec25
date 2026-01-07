import { getProducts } from "@/lib/fetchProducts";
import { ProductCatalog } from "@/components/shop/ProductCatalog";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <main className="bg-theme-primary min-h-screen">
            {/* Catalog Hero */}
            <section className="pt-32 pb-16 text-center bg-theme-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-terracotta/5 dark:from-gold/5 via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    <span className="inline-block px-8 py-3 bg-theme-secondary backdrop-blur-md border border-theme-accent rounded-full text-theme-accent font-bold tracking-[0.25em] text-xs uppercase shadow-2xl mb-6">
                        The Collection
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl font-black mb-6 leading-tight text-theme-primary">
                        Pure by <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta via-warmGold to-terracotta dark:from-ivory dark:via-gold dark:to-ivory">Nature</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-theme-muted max-w-2xl mx-auto">
                        {products.length} carefully curated products. From farm to your table in 4 hours.
                    </p>
                </div>
            </section>

            <ProductCatalog initialProducts={products} />
        </main>
    );
}
