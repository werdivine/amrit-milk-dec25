import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQs | Amrit Sovereign",
    description: "Frequently asked questions about our A2 milk, farm practices, delivery process, and subscription plans.",
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
