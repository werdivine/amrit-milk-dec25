export default {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Product Name",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "price",
            title: "Price (₹)",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "regularPrice",
            title: "Regular Price (₹) - for showing discounts",
            type: "string",
        },
        {
            name: "image",
            title: "Product Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "description",
            title: "Short Description",
            type: "text",
            rows: 3,
        },
        {
            name: "longDescription",
            title: "Full Description",
            type: "array",
            of: [{ type: "block" }],
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Ghee", value: "Ghee" },
                    { title: "Dairy", value: "Dairy" },
                    { title: "Honey", value: "Honey" },
                    { title: "Essential Oils", value: "Essential Oils" },
                    { title: "Cold-Pressed Oils", value: "Cold-Pressed Oils" },
                    { title: "Atta", value: "Atta" },
                    { title: "Rice", value: "Rice" },
                    { title: "Sweets", value: "Sweets" },
                    { title: "Wellness", value: "Wellness" },
                    { title: "Gau Seva", value: "Gau Seva" },
                    { title: "Combos", value: "Combos" },
                ],
            },
        },
        {
            name: "badge",
            title: 'Badge (e.g., "Best Seller", "New")',
            type: "string",
        },
        {
            name: "highlights",
            title: "Product Highlights",
            type: "array",
            of: [{ type: "string" }],
            description: "Key selling points shown at the top of product page",
        },
        {
            name: "ingredients",
            title: "Ingredients",
            type: "array",
            of: [{ type: "string" }],
        },
        {
            name: "benefits",
            title: "Benefits",
            type: "array",
            of: [{ type: "string" }],
        },
        {
            name: "howToUse",
            title: "How to Use",
            type: "array",
            of: [{ type: "string" }],
        },
        {
            name: "sku",
            title: "SKU (Stock Keeping Unit)",
            type: "string",
        },
        {
            name: "subscription",
            title: "Available for Subscription?",
            type: "boolean",
            initialValue: false,
        },
        {
            name: "featured",
            title: "Featured Product",
            type: "boolean",
            initialValue: false,
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "image",
            price: "price",
            category: "category",
        },
        prepare({ title, media, price, category }: any) {
            return {
                title,
                media,
                subtitle: `${category || "Uncategorized"} - ${price}`,
            };
        },
    },
};
