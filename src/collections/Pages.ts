import { CollectionConfig } from 'payload'

export const HeroBlock = {
    slug: 'hero',
    imageURL: '/assets/img/hero-preview.png',
    fields: [
        {
            name: 'headline',
            type: 'text',
            required: true,
            label: 'Main Headline',
        },
        {
            name: 'subheadline',
            type: 'textarea',
            label: 'Sub Headline',
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Background Image',
        },
        {
            name: 'ctaText',
            type: 'text',
            label: 'Button Text',
        },
        {
            name: 'ctaLink',
            type: 'text',
            label: 'Button Link',
        },
    ],
}

export const ContentBlock = {
    slug: 'content',
    fields: [
        {
            name: 'content',
            type: 'richText',
            label: 'Content',
        },
        {
            name: 'alignment',
            type: 'select',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
            ],
            defaultValue: 'left',
        },
    ],
}

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview: {
            url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/${data.slug}{searchParams}`,
        },
    },
    access: {
        read: () => true,
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
            index: true,
        },
        {
            name: 'layout',
            type: 'blocks',
            minRows: 1,
            maxRows: 20,
            blocks: [
                HeroBlock,
                ContentBlock,
            ],
        },
    ],
}
