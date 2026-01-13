import { syncInstagramToSanity } from "@/lib/services/instagram";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        // In a real app, add authentication check here
        // const authHeader = request.headers.get('authorization');
        // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const results = await syncInstagramToSanity();

        return NextResponse.json({
            success: true,
            message: "Sync completed successfully",
            stats: results,
        });
    } catch (error: any) {
        console.error("Sync failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
