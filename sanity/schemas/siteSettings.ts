import { defineField, defineType } from "sanity";

export default defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Site Title",
            type: "string",
            description: "Internal title for settings (e.g. 'Main Settings')",
        }),
        defineField({
            name: "instagramAccessToken",
            title: "Instagram Access Token",
            type: "string",
            hidden: true,
        }),
        defineField({
            name: "instagramTokenExpiry",
            title: "Instagram Token Expiry",
            type: "datetime",
            hidden: true,
        }),
        defineField({
            name: "instagramUserId",
            title: "Instagram User ID",
            type: "string",
            hidden: true,
        }),
        defineField({
            name: "googleAccessToken",
            title: "Google Access Token",
            type: "string",
            hidden: true,
        }),
        defineField({
            name: "googleRefreshToken",
            title: "Google Refresh Token",
            type: "string",
            hidden: true,
            description: "Used to refresh the access token when it expires.",
        }),
        defineField({
            name: "googleTokenExpiry",
            title: "Google Token Expiry",
            type: "datetime",
            hidden: true,
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
    },
});
