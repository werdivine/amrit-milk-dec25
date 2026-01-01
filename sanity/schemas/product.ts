export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Product Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'price',
            title: 'Price (₹)',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'regularPrice',
            title: 'Regular Price (₹) - for showing discounts',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
        },
        {
            name: 'longDescription',
            title: 'Full Description',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Milk', value: 'milk' },
                    { title: 'Desi Ghee', value: 'ghee' },
                    { title: 'Dairy', value: 'dairy' },
                    { title: 'Farm Produce', value: 'farm' },
                ],
            },
        },
        {
            name: 'badge',
            title: 'Badge (e.g., "Best Seller", "New")',
            type: 'string',
        },
        {
            name: 'benefits',
            title: 'Benefits',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'featured',
            title: 'Featured Product',
            type: 'boolean',
            initialValue: false,
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
            price: 'price',
        },
        prepare({ title, media, price }: any) {
            return {
                title,
                media,
                subtitle: price,
            }
        },
    },
}
