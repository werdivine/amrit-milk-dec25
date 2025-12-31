import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
    slug: 'blogs',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'publishedDate',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
