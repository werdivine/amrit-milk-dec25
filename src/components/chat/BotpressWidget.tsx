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
            <Script
                id="botpress-whatsapp-injector"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.botpressWebChat.onEvent(function (event) {
                            if (event.type === 'LIFECYCLE.LOADED') {
                                window.botpressWebChat.sendEvent({ type: 'show' });
                            }
                            // When the the botpress UI is loaded/opened, inject a clear WhatsApp link
                            if (event.type === 'UI.OPENED') {
                                setTimeout(() => {
                                    // Try to find the chat header
                                    const bpContainer = document.getElementById('bp-web-widget');
                                    if(bpContainer && bpContainer.shadowRoot) {
                                        const header = bpContainer.shadowRoot.querySelector('.bpContainer .bpHeader');
                                        
                                        // If our custom button isn't already there, add it
                                        if (header && !bpContainer.shadowRoot.getElementById('custom-wa-btn')) {
                                            const waBtn = document.createElement('a');
                                            waBtn.id = 'custom-wa-btn';
                                            waBtn.href = 'https://wa.me/918130693767';
                                            waBtn.target = '_blank';
                                            waBtn.innerHTML = 'Or talk on WhatsApp 💬';
                                            waBtn.style.cssText = 'display: block; width: 100%; text-align: center; background: #25D366; color: white; padding: 8px; font-weight: bold; text-decoration: none; border-bottom: 1px solid #eee; z-index: 1000; font-family: sans-serif; font-size: 14px; cursor: pointer; border-radius: 4px; margin-top: 5px; margin-bottom: 5px;';
                                            header.insertAdjacentElement('afterend', waBtn);
                                        }
                                    }
                                }, 500); 
                            }
                        }, ['LIFECYCLE.LOADED', 'UI.OPENED']);
                    `,
                }}
            />
        </>
    );
}
