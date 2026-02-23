"use client";

import { useEffect, useRef } from "react";

export function BotpressWidget() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Force sequential loading: Inject core FIRST, then configuration SECOND.
        // This is THE core reason why the bot was showing up as "plain" and losing customizations:
        // Next.js <Script> tags handle files asynchronously and their order isn't guaranteed natively,
        // causing the config to apply before the core bot engine was ready!
        if (!document.getElementById("botpress-inject")) {
            const s1 = document.createElement("script");
            s1.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
            s1.id = "botpress-inject";
            s1.onload = () => {
                const s2 = document.createElement("script");
                s2.src = "https://files.bpcontent.cloud/2026/02/22/09/20260222093937-NW811GDC.js";
                document.body.appendChild(s2);
            };
            document.body.appendChild(s1);
        }

        // We use a cheap interval instead of brittle Event Listeners or Mutation Observers
        // because Botpress destroys and recreates DOM nodes when opening/closing the chat window.
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
        }, 300);

        return () => {
            clearInterval(checkInterval);
        };
    }, []);

    return null;
}
