import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    container?: boolean;
    glass?: boolean;
}

export function Section({ className, children, container = true, glass = false, ...props }: SectionProps) {
    return (
        <section
            className={cn(
                "py-16 md:py-24 relative overflow-hidden",
                glass && "bg-glass-bg border-y border-glass-border backdrop-blur-sm",
                className
            )}
            {...props}
        >
            {container ? (
                <div className="max-w-7xl mx-auto px-6">
                    {children}
                </div>
            ) : (
                children
            )}
        </section>
    );
}
