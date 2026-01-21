"use client";

import { Leaf } from "lucide-react";

interface IngredientsSectionProps {
    ingredients: string[];
}

export function IngredientsSection({ ingredients }: IngredientsSectionProps) {
    if (!ingredients || ingredients.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                    <h3 className="text-xl font-bold text-theme-primary">Ingredients</h3>
                    <p className="text-sm text-theme-muted">(Key Naturals)</p>
                </div>
            </div>
            <ul className="space-y-3 ml-9">
                {ingredients.map((ingredient, index) => (
                    <li
                        key={index}
                        className="text-theme-secondary leading-relaxed flex items-start gap-2"
                    >
                        <span className="text-green-600 dark:text-green-400 mt-1.5 flex-shrink-0">
                            •
                        </span>
                        <span>{ingredient}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
