import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Subscription Plans | Amrit Sovereign",
    description: "Join the exclusive circle of health. Subscribe for daily delivery of raw, organic A2 Gir Cow milk.",
};

export default function SubscriptionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
