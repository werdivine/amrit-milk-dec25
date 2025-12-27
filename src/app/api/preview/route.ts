import { NextRequest, NextResponse } from 'next/server';

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'http://localhost:8080';

/**
 * Preview API Route
 * 
 * Handles preview mode for WordPress drafts.
 * Redirects to the appropriate page with preview data.
 * 
 * @endpoint GET /api/preview
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const preview = searchParams.get('preview');
    const previewToken = searchParams.get('preview_token');
    const postId = searchParams.get('post_id');

    if (!preview || !previewToken) {
        return NextResponse.json(
            { error: 'Missing preview parameters' },
            { status: 400 }
        );
    }

    try {
        // Verify token with WordPress
        const response = await fetch(
            `${WP_URL}/wp-json/headless-bridge/v1/preview?token=${encodeURIComponent(previewToken)}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(
                { error: error.message || 'Invalid preview token' },
                { status: 401 }
            );
        }

        const previewData = await response.json();

        // Determine redirect URL based on post type
        let redirectPath = '/';

        switch (previewData.type) {
            case 'post':
                redirectPath = `/blog/${previewData.slug}`;
                break;
            case 'page':
                redirectPath = `/${previewData.slug}`;
                break;
            case 'product':
                redirectPath = `/products/${previewData.slug}`;
                break;
            default:
                redirectPath = `/${previewData.type}/${previewData.slug}`;
        }

        // Set preview cookie and redirect
        const redirectUrl = new URL(redirectPath, request.url);
        redirectUrl.searchParams.set('preview', 'true');
        redirectUrl.searchParams.set('post_id', postId || previewData.id);

        const redirectResponse = NextResponse.redirect(redirectUrl);

        // Set a preview mode cookie
        redirectResponse.cookies.set('wp_preview_mode', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60, // 1 hour
        });

        redirectResponse.cookies.set('wp_preview_post_id', String(postId || previewData.id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60,
        });

        return redirectResponse;
    } catch (error) {
        console.error('[Preview] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch preview data' },
            { status: 500 }
        );
    }
}

/**
 * Exit preview mode
 */
export async function DELETE(request: NextRequest) {
    const response = NextResponse.json({ success: true });

    response.cookies.delete('wp_preview_mode');
    response.cookies.delete('wp_preview_post_id');

    return response;
}
