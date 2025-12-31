import { RootLayout } from '@payloadcms/next/layouts'
import config from '../../payload.config'
import { importMap } from './importMap'
import './custom.css'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <RootLayout config={config} importMap={importMap}>
        {children}
    </RootLayout>
)

export default Layout
