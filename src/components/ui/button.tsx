import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    variant?: "primary" | "outline" | "glass";
    size?: "sm" | "md" | "lg";
    icon?: boolean;
}

export function Button({
    className,
    children,
    href,
    variant = "primary",
    size = "md",
    icon = false,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 rounded-full";

    const variants = {
        primary: "bg-terracotta text-white hover:bg-espresso dark:bg-gold dark:text-midnight dark:hover:bg-white hover:scale-105",
        outline: "bg-transparent border-2 border-terracotta text-terracotta hover:bg-terracotta/10 dark:border-gold dark:text-gold dark:hover:bg-gold/10",
        glass: "bg-white/50 dark:bg-glass-bg border border-espresso/10 dark:border-glass-border backdrop-blur-md text-espresso dark:text-ivory hover:bg-espresso/5 dark:hover:bg-glass-border",
    };

    const sizes = {
        sm: "px-6 py-2 text-xs",
        md: "px-8 py-4 text-sm",
        lg: "px-10 py-5 text-base",
    };

    const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

    const content = (
        <>
            {children}
            {icon && <ArrowRight className="ml-2 w-5 h-5" />}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {content}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {content}
        </button>
    );
}
