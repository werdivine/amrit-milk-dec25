import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
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
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'category',
            type: 'select',
            options: [
                { label: 'Milk', value: 'milk' },
                { label: 'Curd', value: 'curd' },
                { label: 'Ghee', value: 'ghee' },
            ],
        },
    ],
}
