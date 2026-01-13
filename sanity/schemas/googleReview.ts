import { defineField, defineType } from "sanity";

export default defineType({
    name: "googleReview",
    title: "Google Review",
    type: "document",
    fields: [
        defineField({
            name: "authorName",
            title: "Author Name",
            type: "string",
        }),
        defineField({
            name: "rating",
            title: "Rating",
            type: "number",
            validation: (Rule) => Rule.min(1).max(5),
            initialValue: 5,
        }),
        defineField({
            name: "text",
            title: "Review Text",
            type: "text",
        }),
        defineField({
            name: "date",
            title: "Date",
            type: "string",
            description: 'e.g. "2 weeks ago" or "2024-01-15"',
        }),
        defineField({
            name: "displayOrder",
            title: "Display Order",
            type: "number",
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: "authorName",
            subtitle: "rating",
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle: `${subtitle} Stars`,
            };
        },
    },
});
