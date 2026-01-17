import { defineField, defineType } from "sanity";

export default defineType({
    name: "coupon",
    title: "Coupons",
    type: "document",
    fields: [
        defineField({
            name: "code",
            title: "Coupon Code",
            type: "string",
            description: "The code customers will enter (e.g., SAVE20)",
            validation: (Rule) => Rule.required().uppercase(),
        }),
        defineField({
            name: "type",
            title: "Discount Type",
            type: "string",
            options: {
                list: [
                    { title: "Percentage (%)", value: "percentage" },
                    { title: "Fixed Amount (₹)", value: "fixed" },
                ],
                layout: "radio",
            },
            initialValue: "percentage",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "value",
            title: "Discount Value",
            type: "number",
            description: "E.g., 20 for 20% off or ₹200 off",
            validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
            name: "minOrderValue",
            title: "Minimum Order Value",
            type: "number",
            description: "Minimum cart value required to use this coupon",
            initialValue: 0,
        }),
        defineField({
            name: "isActive",
            title: "Active",
            type: "boolean",
            description: "Turn off to disable this coupon",
            initialValue: true,
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "string",
            description: "Internal note about this coupon",
        }),
        defineField({
            name: "usageCount",
            title: "Usage Count",
            type: "number",
            description: "How many times this coupon has been used",
            initialValue: 0,
            readOnly: true,
        }),
    ],
    orderings: [
        {
            title: "Code A-Z",
            name: "codeAsc",
            by: [{ field: "code", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            code: "code",
            type: "type",
            value: "value",
            isActive: "isActive",
        },
        prepare({ code, type, value, isActive }) {
            const discountText = type === "percentage" ? `${value}% OFF` : `₹${value} OFF`;
            return {
                title: code,
                subtitle: `${isActive ? "✅" : "❌"} ${discountText}`,
            };
        },
    },
});
