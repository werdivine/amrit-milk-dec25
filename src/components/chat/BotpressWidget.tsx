"use client";

import Script from "next/script";
import { useEffect } from "react";

export function BotpressWidget() {
    useEffect(() => {
        // We use a cheap interval because Botpress destroys and recreates DOM nodes when opening/closing the chat window.
        // This ensures the WhatsApp button and label are always present when the widget is open.
        const checkInterval = setInterval(() => {
            const bpContainer = document.getElementById("bp-web-widget");
            if (bpContainer && bpContainer.shadowRoot) {
                const shadow = bpContainer.shadowRoot;

                // 1. Inject "Talk to Us" text if not present under the trigger button
                const triggerBtn =
                    shadow.querySelector(".bpTrigger") ||
                    shadow.querySelector('button[aria-label="Open chat"]') ||
                    shadow.querySelector(".bp-widget-trigger") ||
                    shadow.querySelector("button");

                if (triggerBtn && !shadow.getElementById("bp-custom-label")) {
                    const triggerHtmlBtn = triggerBtn as HTMLElement;
                    const label = document.createElement("div");
                    label.id = "bp-custom-label";
                    label.innerText = "Talk to Us";
                    label.style.cssText =
                        "position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%); white-space: nowrap; background: rgba(0, 0, 0, 0.7); color: white; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; font-family: sans-serif; pointer-events: none; box-shadow: 0 2px 4px rgba(0,0,0,0.3); z-index: 9999;";

                    triggerHtmlBtn.style.position = "relative";
                    triggerHtmlBtn.style.overflow = "visible";
                    triggerHtmlBtn.appendChild(label);
                }

                // 2. Inject WhatsApp button into header if chat window is open
                const header =
                    shadow.querySelector(".bpContainer .bpHeader") ||
                    shadow.querySelector("header");

                if (header && !shadow.getElementById("custom-wa-btn")) {
                    const waBtn = document.createElement("a");
                    waBtn.id = "custom-wa-btn";
                    waBtn.href = "https://wa.me/918130693767";
                    waBtn.target = "_blank";
                    waBtn.innerHTML = "Talk on WhatsApp 💬";
                    waBtn.style.cssText =
                        "display: block; width: calc(100% - 32px); text-align: center; background: #25D366; color: white; padding: 10px; font-weight: bold; text-decoration: none; z-index: 1000; font-family: sans-serif; font-size: 14px; cursor: pointer; border-radius: 6px; margin: 10px 16px 5px 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);";

                    header.insertAdjacentElement("afterend", waBtn);
                }
            }
        }, 500);

        return () => {
            clearInterval(checkInterval);
        };
    }, []);

    return (
        <>
            <Script
                src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://files.bpcontent.cloud/2026/02/22/09/20260222093937-NW811GDC.js"
                strategy="lazyOnload"
            />
        </>
    );
}
