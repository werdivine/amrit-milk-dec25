import { RootLayout, RootPage } from '@payloadcms/next/layouts'
import { importMap } from './importMap'
import config from '../../payload.config'

type Args = {
    params: {
        slug: string[]
    }
}

export const generateMetadata = ({ params }: Args) =>
    RootPage.generateMetadata({ config, importMap, params })

const Page = ({ params }: Args) => RootPage.index({ config, importMap, params })

export default Page
