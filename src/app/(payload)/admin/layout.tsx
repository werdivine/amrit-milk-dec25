/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { ServerFunctionClient } from 'payload'

import config from '@/payload.config'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './importMap'
import React from 'react'
import './custom.css'

type Args = {
    children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
    'use server'
    const { default: serverFunctionHandler } = await import('@payloadcms/next/utilities')
    return serverFunctionHandler({
        ...args,
        config,
        importMap,
    })
}

const Layout = ({ children }: Args) => (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
        {children}
    </RootLayout>
)

export default Layout
