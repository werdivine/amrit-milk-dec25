import { defineField, defineType } from "sanity";

export default defineType({
    name: "contactQuery",
    title: "Contact Queries",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),
        defineField({
            name: "phone",
            title: "Phone",
            type: "string",
        }),
        defineField({
            name: "subject",
            title: "Subject",
            type: "string",
        }),
        defineField({
            name: "message",
            title: "Message",
            type: "text",
            rows: 5,
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "🆕 New", value: "new" },
                    { title: "👀 Viewed", value: "viewed" },
                    { title: "💬 Responded", value: "responded" },
                    { title: "✅ Closed", value: "closed" },
                ],
            },
            initialValue: "new",
        }),
        defineField({
            name: "notes",
            title: "Internal Notes",
            type: "text",
            rows: 2,
            description: "Notes about this query (not visible to customer)",
        }),
    ],
    orderings: [
        {
            title: "Newest First",
            name: "createdAtDesc",
            by: [{ field: "_createdAt", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            name: "name",
            subject: "subject",
            status: "status",
        },
        prepare({ name, subject, status }) {
            const statusEmoji =
                {
                    new: "🆕",
                    viewed: "👀",
                    responded: "💬",
                    closed: "✅",
                }[status] || "❓";

            return {
                title: `${statusEmoji} ${name}`,
                subtitle: subject || "No subject",
            };
        },
    },
});
