import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Secure Checkout | Amrit Sovereign",
    description: "Complete your order for premium A2 Gir Cow Milk and organic wellness products. Secure payment and fast delivery.",
};

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
