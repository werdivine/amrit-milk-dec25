"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
    id: string;
    title: string;
    price: string;
    image: string;
    slug: string;
    category: string;
    description?: string;
    sku?: string;
}

export function AddToCartButton({
    id,
    title,
    price,
    image,
    slug,
    category,
    description,
    sku,
}: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart({
            id,
            title,
            price,
            image,
            slug,
            category,
            description: description || "",
            sku: sku || "N/A",
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Button
            size="lg"
            className="flex-1 min-w-[200px] h-16 text-lg"
            onClick={handleAddToCart}
            icon
        >
            {added ? (
                <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart!
                </>
            ) : (
                <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                </>
            )}
        </Button>
    );
}
