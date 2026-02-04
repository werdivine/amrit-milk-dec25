/**
 * Instagram API Route
 * 
 * GET endpoint to fetch Instagram media from Meta Graph API
 * Supports both authenticated and public modes
 * Includes rate limiting and caching headers
 */

import { NextRequest, NextResponse } from 'next/server';
import { InstagramPost, InstagramApiResponse, ApiError } from '@/lib/instagram/types';

// Base URL for Instagram Graph API
const BASE_URL = 'https://graph.instagram.com/v24.0';

// Environment variables
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;
const META_APP_ID = process.env.META_APP_ID;
const META_APP_SECRET = process.env.META_APP_SECRET;

// Cache duration in seconds (1 hour default)
const CACHE_DURATION = 3600;

/**
 * Fetches user media from Instagram Graph API
 * @param accessToken - Instagram access token
 * @param userId - Instagram user ID
 * @param limit - Number of posts to fetch (default: 12)
 * @returns Promise<InstagramApiResponse>
 */
async function fetchUserMedia(
  accessToken: string,
  userId: string,
  limit: number = 12
): Promise<InstagramApiResponse> {
  const fields = [
    'id',
    'caption',
    'media_type',
    'media_url',
    'permalink',
    'timestamp',
    'thumbnail_url',
    'like_count',
    'comments_count'
  ].join(',');

  const url = `${BASE_URL}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new InstagramApiError(
      errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      errorData.error?.code || 'UNKNOWN_ERROR'
    );
  }

  return response.json();
}

/**
 * Fetches a single media item with detailed engagement metrics
 * @param mediaId - Instagram media ID
 * @param accessToken - Instagram access token
 * @returns Promise<InstagramPost>
 */
async function fetchMediaDetails(
  mediaId: string,
  accessToken: string
): Promise<InstagramPost> {
  const fields = [
    'id',
    'caption',
    'media_type',
    'media_url',
    'permalink',
    'timestamp',
    'thumbnail_url',
    'like_count',
    'comments_count'
  ].join(',');

  const url = `${BASE_URL}/${mediaId}?fields=${fields}&access_token=${accessToken}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new InstagramApiError(
      errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      errorData.error?.code || 'UNKNOWN_ERROR'
    );
  }

  return response.json();
}

/**
 * Exchanges a short-lived token for a long-lived token
 * @param accessToken - Short-lived access token
 * @returns Promise<string> - Long-lived access token
 */
async function exchangeForLongLivedToken(accessToken: string): Promise<string> {
  if (!META_APP_SECRET) {
    throw new InstagramApiError('App secret not configured', 500, 'CONFIG_ERROR');
  }

  const url = `${BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${META_APP_SECRET}&access_token=${accessToken}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new InstagramApiError(
      errorData.error?.message || 'Failed to exchange token',
      response.status,
      errorData.error?.code || 'TOKEN_EXCHANGE_ERROR'
    );
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Custom API Error class for Instagram API errors
 */
class InstagramApiError extends Error implements ApiError {
  status: number;
  code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.name = 'InstagramApiError';
    this.status = status;
    this.code = code;
  }
}

/**
 * Validates the access token by making a test request
 * @param accessToken - Instagram access token
 * @returns Promise<boolean>
 */
async function validateAccessToken(accessToken: string): Promise<boolean> {
  try {
    const url = `${BASE_URL}/me?fields=id&access_token=${accessToken}`;
    const response = await fetch(url, { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * GET endpoint handler
 * 
 * Query parameters:
 * - limit: Number of posts to fetch (default: 12, max: 25)
 * - mediaId: Optional specific media ID to fetch details
 * - refresh: Force token refresh (boolean)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get('limit') || '12', 10), 25);
  const mediaId = searchParams.get('mediaId');
  const refresh = searchParams.get('refresh') === 'true';

  try {
    // Validate environment configuration
    if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
      throw new InstagramApiError(
        'Instagram API not configured. Please set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID environment variables.',
        500,
        'CONFIG_ERROR'
      );
    }

    // Handle specific media item request
    if (mediaId) {
      const post = await fetchMediaDetails(mediaId, INSTAGRAM_ACCESS_TOKEN);
      return NextResponse.json(
        { success: true, data: post },
        {
          headers: {
            'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
          },
        }
      );
    }

    // Validate token
    const isValid = await validateAccessToken(INSTAGRAM_ACCESS_TOKEN);
    if (!isValid) {
      throw new InstagramApiError(
        'Access token is invalid or expired',
        401,
        'INVALID_TOKEN'
      );
    }

    // Optionally refresh token for long-lived access
    let accessToken = INSTAGRAM_ACCESS_TOKEN;
    if (refresh) {
      try {
        accessToken = await exchangeForLongLivedToken(INSTAGRAM_ACCESS_TOKEN);
      } catch (error) {
        console.warn('Token refresh failed, using existing token:', error);
      }
    }

    // Fetch user media
    const response = await fetchUserMedia(accessToken, INSTAGRAM_USER_ID, limit);

    // Transform data to ensure consistent structure
    const posts: InstagramPost[] = response.data.map((item) => ({
      id: item.id,
      caption: item.caption || '',
      media_type: item.media_type,
      media_url: item.media_url || item.thumbnail_url || '',
      permalink: item.permalink || '',
      timestamp: item.timestamp,
      thumbnail_url: item.thumbnail_url,
      like_count: item.like_count || 0,
      comments_count: item.comments_count || 0,
    }));

    return NextResponse.json(
      { 
        success: true, 
        data: posts,
        paging: response.paging || null 
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
          'X-Instagram-Posts-Count': posts.length.toString(),
        },
      }
    );
  } catch (error) {
    if (error instanceof InstagramApiError) {
      console.error(`Instagram API Error [${error.code}]: ${error.message}`);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          code: error.code 
        },
        { status: error.status }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Unexpected Instagram API error:', error);

    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred while fetching Instagram data',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}
