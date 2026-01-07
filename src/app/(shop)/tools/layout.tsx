import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Health & Savings Calculators | Amrit Sovereign",
    description: "Calculate your health ROI and subscription savings when switching to pure A2 Desi Cow Milk.",
};

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
