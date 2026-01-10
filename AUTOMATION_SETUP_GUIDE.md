# 🚀 Amrit Milk: Pipedream Automation Setup Guide

I have switched the primary automation partner to **Pipedream**. It is more powerful, has a permanent free tier, and integrates perfectly with our system.

---

## 🏗️ Step 1: Vercel Environment Variables

Add these keys to your [Vercel Project Settings](https://vercel.com/praveen-pathaks-projects/amrit-milk-dec25/settings/environment-variables):

| Key                      | Suggested Value                    | Purpose                    |
| :----------------------- | :--------------------------------- | :------------------------- |
| `RESEND_API_KEY`         | _(Get from Resend.com)_            | High-reliability Email     |
| `AUTOMATION_WEBHOOK_URL` | _(Get from Pipedream)_             | Triggers your AI workflows |
| `NTFY_TOPIC`             | `amrit-orders-` + _your-unique-id_ | Mobile Push Notifications  |
| `MERCHANT_EMAIL`         | `hello@amritmilk.com`              | Notification recipient     |

---

## 🤖 Step 2: Pipedream Setup

1.  **Open the Visual Browser**: Run `npx tsx src/scripts/visual-sovereign.ts`.
2.  **Create an account** on Pipedream (Free).
3.  **New Project** -> **New Workflow** -> **HTTP / Webhook Trigger**.
4.  Copy the **URL** provided by Pipedream.
5.  Paste it into Vercel's `AUTOMATION_WEBHOOK_URL`.

---

## 🦾 Step 3: Sovereign Browser (Playwright)

The "Playwright Setup" is a permanent agentic tool.

- **How to open it**: Run `npx tsx src/scripts/visual-sovereign.ts` to see it visually.
- **Headless Mode**: By default, I use it in the background for "God Mode" speed.
- **Location**: The engine logic is in `src/lib/sovereign-operator.ts`.

---

## 🧪 Step 4: Verification

Run this command to test all channels:

```bash
npx tsx -e "import { sendOrderNotifications } from './src/lib/notifications.ts'; sendOrderNotifications({ orderNumber: 'PIPEDREAM-TEST', customerName: 'Apex User', email: 'test@example.com', phone: '918130693767', total: 100, paymentMethod: 'cod', items: [{ title: 'System Test Milk', quantity: 1, price: '100' }] })"
```
