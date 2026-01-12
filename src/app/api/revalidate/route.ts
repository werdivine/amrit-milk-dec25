import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Revalidation API Route
 *
 * This endpoint receives revalidation requests from WordPress
 * when content is updated. It purges Next.js cache for specific paths.
 *
 * @endpoint POST /api/revalidate
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Verify secret
        const secret = body.secret || request.headers.get("X-Revalidate-Secret");

        if (secret !== process.env.REVALIDATION_SECRET) {
            console.error("[Revalidate] Invalid secret provided");
            return NextResponse.json({ error: "Invalid revalidation secret" }, { status: 401 });
        }

        // Log revalidation request
        console.log("[Revalidate] Request received:", {
            paths: body.paths,
            revalidateAll: body.revalidateAll,
            post: body.post,
        });

        // Revalidate all pages
        if (body.revalidateAll) {
            revalidatePath("/", "layout");
            console.log("[Revalidate] All pages revalidated");
            return NextResponse.json({
                revalidated: true,
                message: "All pages revalidated",
                timestamp: new Date().toISOString(),
            });
        }

        // Revalidate specific paths
        if (body.paths && Array.isArray(body.paths)) {
            const revalidatedPaths: string[] = [];

            for (const path of body.paths) {
                try {
                    revalidatePath(path);
                    revalidatedPaths.push(path);
                    console.log(`[Revalidate] Path revalidated: ${path}`);
                } catch (err) {
                    console.error(`[Revalidate] Error revalidating ${path}:`, err);
                }
            }

            return NextResponse.json({
                revalidated: true,
                paths: revalidatedPaths,
                timestamp: new Date().toISOString(),
            });
        }

        // Revalidate by tag
        if (body.tag) {
            revalidateTag(body.tag);
            console.log(`[Revalidate] Tag revalidated: ${body.tag}`);
            return NextResponse.json({
                revalidated: true,
                tag: body.tag,
                timestamp: new Date().toISOString(),
            });
        }

        return NextResponse.json(
            { error: "No paths, tags, or revalidateAll flag provided" },
            { status: 400 }
        );
    } catch (error) {
        console.error("[Revalidate] Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

/**
 * Health check for revalidation endpoint
 */
export async function GET() {
    return NextResponse.json({
        status: "healthy",
        endpoint: "/api/revalidate",
        method: "POST",
        timestamp: new Date().toISOString(),
    });
}
