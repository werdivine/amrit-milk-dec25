import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const dynamic = "force-dynamic";

/**
 * Sanity Revalidation Webhook
 * This endpoint is called by Sanity when content changes.
 */
export async function POST(req: NextRequest) {
    try {
        const secret = process.env.SANITY_REVALIDATE_SECRET || process.env.REVALIDATION_SECRET;
        
        if (!secret) {
            console.error("[Sanity Revalidate] No secret configured");
            return new Response("No secret configured", { status: 500 });
        }

        const { body, isValidSignature } = await parseBody(req, secret);

        if (!isValidSignature) {
            console.error("[Sanity Revalidate] Invalid signature");
            return new Response("Invalid signature", { status: 401 });
        }

        if (!body?._type) {
            return new Response("Bad Request", { status: 400 });
        }

        const bodyAny = body as any;
        const type = bodyAny._type;
        const slug = bodyAny.slug?.current;
        console.log(`[Sanity Revalidate] Revalidating type: ${type}${slug ? ` (slug: ${slug})` : ""}`);

        // Revalidate by tag
        revalidateTag(type);
        if (slug) {
            revalidateTag(`${type}:${slug}`);
        }
        revalidateTag("all");

        // Map types to paths
        if (type === "product") {
            revalidatePath("/products");
            revalidatePath("/products/[slug]", "page");
            revalidatePath("/", "page");
        } else if (type === "instagramPost") {
            revalidatePath("/", "page");
        } else if (type === "googleReview") {
            revalidatePath("/", "page");
        } else if (type === "post" || type === "blog") {
            revalidatePath("/blog");
            revalidatePath("/blog/[slug]", "page");
            revalidatePath("/", "page");
        } else if (type === "siteSettings") {
            revalidatePath("/", "page");
            revalidatePath("/", "layout");
        }

        // Always revalidate home page for safety
        revalidatePath("/");

        return NextResponse.json({
            revalidated: true,
            type,
            timestamp: new Date().toISOString(),
        });
    } catch (err: any) {
        console.error("[Sanity Revalidate] Error:", err.message);
        return new Response(err.message, { status: 500 });
    }
}
