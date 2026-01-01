export default {
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
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
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'A short summary shown on blog listing pages',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        },
        {
            name: 'author',
            title: 'Author Name',
            type: 'string',
        },
        {
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'featuredImage',
            author: 'author',
        },
        prepare({ title, media, author }: any) {
            return {
                title,
                media,
                subtitle: author ? `by ${author}` : '',
            }
        },
    },
}
