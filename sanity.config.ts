import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fqzgs92z'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
    basePath: '/admin',
    name: 'default',
    title: 'Amrit Milk Admin',

    projectId,
    dataset,

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
})
