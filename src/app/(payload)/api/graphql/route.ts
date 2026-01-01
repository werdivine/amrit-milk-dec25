import { GRAPHQL_POST, GRAPHQL_GET } from '@payloadcms/next/routes'
import config from '@/payload.config'

export const GET = GRAPHQL_GET(config)
export const POST = GRAPHQL_POST(config)
