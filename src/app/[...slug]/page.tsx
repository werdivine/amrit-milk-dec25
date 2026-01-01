import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { RenderBlocks } from '@/components/payload/RenderBlocks'

// Force dynamic rendering for live preview
export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        slug: string[]
    }>
    searchParams: Promise<{
        [key: string]: string | string[] | undefined
    }>
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params
    const slugPath = slug?.join('/') || 'home'
    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: slugPath,
            },
        },
    })

    if (!docs[0]) {
        return notFound()
    }

    const page = docs[0]

    return (
        <main>
            <RenderBlocks layout={page.layout} />
        </main>
    )
}
