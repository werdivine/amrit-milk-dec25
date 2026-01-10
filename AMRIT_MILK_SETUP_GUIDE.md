# 🚀 Amrit Milk: Automation Setup Guide

Since the interactive browser session is having trouble with clicks and permissions in your environment, I have prepared this **Zero-Friction Guide** to help you finish the setup manually.

> [!NOTE]
> The browser window you saw was my **Agentic Subagent**. It asks for permission to help you browse, but since it's failing to accept your inputs, the manual route below is faster and safer for these authenticated dashboards.

---

## 🏗️ Step 1: Vercel Environment Variables

You need to add these keys to your Vercel Dashboard to activate the new notification channels.

1.  **Open Vercel Settings**: [Vercel Project Settings](https://vercel.com/dashboard) (Navigate to your project → **Settings** → **Environment Variables**).
2.  **Add the following keys**:

| Key                      | Suggested Value                    | Purpose                                |
| :----------------------- | :--------------------------------- | :------------------------------------- |
| `RESEND_API_KEY`         | _(Get from Resend.com)_            | High-reliability Email (Replaces SMTP) |
| `AUTOMATION_WEBHOOK_URL` | _(Get from Gumloop)_               | Triggers your AI automation flows      |
| `NTFY_TOPIC`             | `amrit-orders-` + _your-unique-id_ | Mobile Push Notifications (Free)       |
| `MERCHANT_EMAIL`         | `hello@amritmilk.com`              | Where you want to receive orders       |

---

## 🤖 Step 2: Gumloop Setup (Webhooks)

To connect your website to **Gumloop**:

1.  **Create a New Flow** in Gumloop.
2.  **Add a "Webhook Input" node**.
3.  Click the **"Webhooks"** button or icon in the Gumloop editor.
4.  Copy the **Webhook URL** provided by Gumloop.
5.  Paste that URL into your Vercel `AUTOMATION_WEBHOOK_URL` variable.

**Data Snapshot**: When an order is placed, Gumloop will receive:

```json
{
  "orderNumber": "AM-1234",
  "customerName": "John Doe",
  "phone": "9876543210",
  "total": "1250",
  "items": [...]
}
```

---

## 📱 Step 3: Mobile Notifications (ntfy.sh)

This is the easiest way to get mobile alerts:

1.  **Download ntfy** (Android/iOS).
2.  **Subscribe** to a unique topic name (e.g., `amrit-milk-vip-alerts`).
3.  Set your Vercel variable `NTFY_TOPIC` to that exact name.
4.  **Done!** Every new order will now pop up on your phone instantly.

---

## 🧪 Step 4: Verification

Once you've added the variables in Vercel:

1.  **Re-deploy** your project in Vercel (or just wait for the next push).
2.  Run my optimized verification script in your terminal to check the status:
    ```bash
    npx tsx src/scripts/verify-site.ts
    ```

---

**Status**: ACTIVE | **Ready for Configuration**
