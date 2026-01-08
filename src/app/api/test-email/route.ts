import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const resendApiKey = process.env.RESEND_API_KEY;
    const merchantEmail = process.env.MERCHANT_EMAIL || "hello@amritmilk.com";

    if (!resendApiKey) {
        return NextResponse.json({ error: "Missing RESEND_API_KEY" }, { status: 500 });
    }

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Amrit Milk Test <orders@amritmilkorganic.com>",
                to: merchantEmail.split(",").map((e) => e.trim()),
                subject: `Test Email Connection ${new Date().toISOString()}`,
                html: `<h1> It Works!</h1><p>Email system is operational.</p>`,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ 
                success: false, 
                status: response.status, 
                error: data 
            }, { status: response.status });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
