import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const checks = {
        sanityProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        sanityDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
        sanityWriteToken: !!process.env.SANITY_WRITE_TOKEN,
        ccavenueMerchantId: !!process.env.CCAVENUE_MERCHANT_ID,
        ccavenueAccessCode: !!process.env.CCAVENUE_ACCESS_CODE,
        ccavenueWorkingKey: !!process.env.CCAVENUE_WORKING_KEY,
    };

    const isHealthy = Object.values(checks).every(Boolean);

    return NextResponse.json(
        {
            status: isHealthy ? "ok" : "misconfigured",
            checks,
            env: process.env.NODE_ENV,
            timestamp: new Date().toISOString(),
        },
        { status: isHealthy ? 200 : 500 }
    );
}
