"use client";

import Script from "next/script";

export function BotpressWidget() {
    return (
        <>
            <Script src="https://cdn.botpress.cloud/webchat/v3.6/inject.js" strategy="lazyOnload" />
            <Script
                src="https://files.bpcontent.cloud/2026/02/22/09/20260222093937-NW811GDC.js"
                strategy="lazyOnload"
            />
        </>
    );
}
