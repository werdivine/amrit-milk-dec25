import { defineField, defineType } from "sanity";

export default defineType({
    name: "instagramPost",
    title: "Instagram Post",
    type: "document",
    fields: [
        defineField({
            name: "instagramId",
            title: "Instagram ID",
            type: "string",
            readOnly: true,
            hidden: true,
        }),
        defineField({
            name: "isVisible",
            title: "Visible on Website",
            type: "boolean",
            initialValue: false,
            description: "Toggle this ON to show the post on the website.",
        }),
        defineField({
            name: "caption",
            title: "Caption",
            type: "string",
        }),
        defineField({
            name: "url",
            title: "Instagram Link",
            type: "url",
        }),
        defineField({
            name: "mediaType",
            title: "Media Type",
            type: "string",
            options: {
                list: [
                    { title: "Image", value: "IMAGE" },
                    { title: "Video", value: "VIDEO" },
                    { title: "Carousel", value: "CAROUSEL_ALBUM" },
                ],
            },
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: "caption",
            media: "image",
        },
    },
});
