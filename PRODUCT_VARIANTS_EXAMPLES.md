# Product Variant Examples

## Ghee Variants

```typescript
{
    id: "a2-ghee",
    title: "A2 Desi Cow Ghee (Bilona Method)",
    category: "Ghee",
    description: "Pure A2 Bilona Ghee made using traditional Vedic method",
    slug: "a2-cow-ghee",
    image: "/assets/img/products/a2desicowgheeglassjarbilonamethod.png",
    featured: true,
    badge: "Bestseller",
    price: "₹1,200", // Default 1kg price
    variants: [
        {
            id: "500gm",
            size: "500gm",
            weight: "500 grams",
            price: 650,
            originalPrice: 700,
            inStock: true,
            inventory: 25
        },
        {
            id: "1kg",
            size: "1kg",
            weight: "1 kilogram",
            price: 1200,
            originalPrice: 1300,
            inStock: true,
            inventory: 15
        }
    ]
}
```

## Honey Variants

```typescript
{
    id: "wild-forest-honey",
    title: "Wild Forest Honey",
    category: "Honey",
    description: "Raw and unfiltered honey sourced from deep forests",
    slug: "wild-forest-honey",
    image: "/assets/img/products/amrit_honey_premium_v7.png",
    featured: true,
    price: "₹800", // Default 1kg price
    variants: [
        {
            id: "300gm",
            size: "300gm",
            weight: "300 grams",
            price: 400,
            inStock: true,
            inventory: 30
        },
        {
            id: "1kg",
            size: "1kg",
            weight: "1 kilogram",
            price: 800,
            originalPrice: 900,
            inStock: true,
            inventory: 20
        }
    ]
}
```

## Implementation Notes

1. **Grid View**: Uses compact "dots" display style
2. **Product Detail Page**: Will use "cards" display style for better visibility
3. **Price Strategy**: 
   - 500gm Ghee: ₹650 (was ₹700)
   - 1kg Ghee: ₹1,200 (was ₹1,300)
   - 300gm Honey: ₹400
   - 1kg Honey: ₹800 (was ₹900)
4. **Inventory**: Each variant tracks its own stock level
