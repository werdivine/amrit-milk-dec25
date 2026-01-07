import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="flex-grow pt-24 text-espresso dark:text-ivory">
                {children}
            </main>
            <StickyWhatsApp />
            <Footer />
        </>
    );
}
