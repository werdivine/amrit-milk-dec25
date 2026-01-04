"use client";

import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
    id: string;
    title: string;
    price: string;
    image: string;
    slug: string;
}

export function AddToCartButton({ id, title, price, image, slug }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart({ id, title, price, image, slug });
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
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                </>
            )}
        </Button>
    );
}
