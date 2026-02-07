import { createClient } from 'next-sanity'

export const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'fqzgs92z').trim()
export const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production').trim()
export const apiVersion = (process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01').trim()

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false to allow Next.js revalidation tags to work reliably
})

// Write-enabled client for mutations
export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
})
