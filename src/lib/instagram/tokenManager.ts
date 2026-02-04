/**
 * Instagram Token Manager
 * 
 * Handles token validation, long-lived token exchange, and automated token refresh.
 * Provides secure token storage and refresh scheduling.
 * 
 * Note: In production, use server-side storage (database, env vars, or secrets manager)
 * for storing tokens. This module provides the logic for token management.
 */

import { InstagramConfig, CachedToken, LongLivedTokenResponse } from './types';

// Base URL for Instagram Graph API
const BASE_URL = 'https://graph.instagram.com/v24.0';

// Token buffer time before expiry (refresh 7 days before expiration)
const REFRESH_BUFFER_SECONDS = 7 * 24 * 60 * 60;

// Default configuration from environment variables
let config: InstagramConfig | null = null;

/**
 * Initialize the token manager with configuration
 * @param instagramConfig - Instagram configuration object
 */
export function initializeTokenManager(instagramConfig: InstagramConfig): void {
  config = instagramConfig;
}

/**
 * Get current configuration or load from environment variables
 */
function getConfig(): InstagramConfig {
  if (config) {
    return config;
  }

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  const redirectUri = process.env.META_REDIRECT_URI || '';

  if (!appId || !appSecret || !accessToken || !userId) {
    throw new Error(
      'Instagram configuration is incomplete. Please set META_APP_ID, META_APP_SECRET, ' +
      'INSTAGRAM_ACCESS_TOKEN, and INSTAGRAM_USER_ID environment variables.'
    );
  }

  config = {
    appId,
    appSecret,
    accessToken,
    userId,
    redirectUri,
  };

  return config;
}

/**
 * In-memory token cache (use database or secure storage in production)
 */
let tokenCache: CachedToken | null = null;

/**
 * Check if current token is valid and not expired
 */
export function isTokenValid(token: string): boolean {
  if (!token || token.trim() === '') {
    return false;
  }
  // Token format validation (basic check)
  return token.split('.').length === 3 || token.length > 20;
}

/**
 * Check if cached token needs refresh
 */
export function isTokenExpiringSoon(cachedToken: CachedToken): boolean {
  const now = Date.now();
  const bufferMs = REFRESH_BUFFER_SECONDS * 1000;
  return cachedToken.expiresAt - now < bufferMs;
}

/**
 * Store token in cache (use secure storage in production)
 */
export function cacheToken(accessToken: string, expiresIn: number): void {
  const expiresAt = Date.now() + expiresIn * 1000;
  tokenCache = {
    accessToken,
    expiresAt,
  };
}

/**
 * Get cached token if valid
 */
export function getCachedToken(): string | null {
  if (!tokenCache) {
    return null;
  }

  // Check if token is expired
  if (Date.now() >= tokenCache.expiresAt) {
    tokenCache = null;
    return null;
  }

  return tokenCache.accessToken;
}

/**
 * Exchange short-lived token for long-lived token
 * @param shortLivedToken - Short-lived access token from OAuth flow
 * @returns Promise<{ accessToken: string; expiresIn: number }>
 */
export async function exchangeForLongLivedToken(
  shortLivedToken: string
): Promise<{ accessToken: string; expiresIn: number }> {
  const cfg = getConfig();

  if (!cfg.appSecret) {
    throw new Error('App secret is required for token exchange');
  }

  const url = `${BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${cfg.appSecret}&access_token=${shortLivedToken}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Token exchange failed: ${errorData.error?.message || response.statusText}`
    );
  }

  const data: LongLivedTokenResponse = await response.json();

  // Cache the long-lived token
  cacheToken(data.access_token, data.expires_in);

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  };
}

/**
 * Refresh a long-lived token before it expires
 * @param currentToken - Current long-lived access token
 * @returns Promise<{ accessToken: string; expiresIn: number }>
 */
export async function refreshLongLivedToken(
  currentToken: string
): Promise<{ accessToken: string; expiresIn: number }> {
  const cfg = getConfig();

  if (!cfg.appSecret) {
    throw new Error('App secret is required for token refresh');
  }

  const url = `${BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Token refresh failed: ${errorData.error?.message || response.statusText}`
    );
  }

  const data: LongLivedTokenResponse = await response.json();

  // Cache the new token
  cacheToken(data.access_token, data.expires_in);

  console.log(`Instagram token refreshed successfully. New expiry: ${data.expires_in}s`);

  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  };
}

/**
 * Get a valid access token, refreshing if necessary
 * @returns Promise<string> - Valid access token
 */
export async function getValidAccessToken(): Promise<string> {
  // Check for cached token first
  const cachedToken = getCachedToken();
  if (cachedToken) {
    return cachedToken;
  }

  // Get config and check if we have a stored long-lived token
  const cfg = getConfig();

  // If we have a long-lived token in env, try to refresh it
  if (cfg.accessToken) {
    try {
      const { accessToken } = await refreshLongLivedToken(cfg.accessToken);
      return accessToken;
    } catch (error) {
      console.warn('Failed to refresh token, using existing token:', error);
      return cfg.accessToken;
    }
  }

  throw new Error(
    'No valid access token available. Please complete the OAuth flow or set INSTAGRAM_ACCESS_TOKEN.'
  );
}

/**
 * Validate access token by making a test API call
 * @param accessToken - Access token to validate
 * @returns Promise<boolean>
 */
export async function validateAccessToken(accessToken: string): Promise<boolean> {
  try {
    const url = `${BASE_URL}/me?fields=id&access_token=${accessToken}`;
    const response = await fetch(url, { method: 'GET' });
    return response.ok;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

/**
 * Get token metadata (expiry time, etc.)
 * @param accessToken - Access token to check
 * @returns Promise<{ expiresIn: number; valid: boolean }>
 */
export async function getTokenMetadata(
  accessToken: string
): Promise<{ expiresIn: number; valid: boolean }> {
  const url = `${BASE_URL}/access_token?input_token=${accessToken}&access_token=${accessToken}`;

  try {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      return { expiresIn: 0, valid: false };
    }

    const data = await response.json();
    return {
      expiresIn: data.expires_in || 0,
      valid: true,
    };
  } catch (error) {
    return { expiresIn: 0, valid: false };
  }
}

/**
 * Calculate token refresh schedule
 * Returns when the token should be refreshed
 */
export function getTokenRefreshSchedule(cachedToken: CachedToken): {
  shouldRefresh: boolean;
  refreshAt: Date;
  expiresAt: Date;
  hoursRemaining: number;
} {
  const now = Date.now();
  const expiresAt = new Date(cachedToken.expiresAt);
  const refreshAt = new Date(cachedToken.expiresAt - REFRESH_BUFFER_SECONDS * 1000);
  const hoursRemaining = (cachedToken.expiresAt - now) / (1000 * 60 * 60);

  return {
    shouldRefresh: isTokenExpiringSoon(cachedToken),
    refreshAt,
    expiresAt,
    hoursRemaining: Math.max(0, hoursRemaining),
  };
}

/**
 * Build OAuth authorization URL for Instagram Basic Display API
 * @returns Authorization URL to redirect users to
 */
export function getAuthorizationUrl(): string {
  const cfg = getConfig();

  const params = new URLSearchParams({
    client_id: cfg.appId,
    redirect_uri: cfg.redirectUri,
    scope: 'instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement',
    response_type: 'code',
  });

  return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
}

/**
 * Clear token cache (for logout or error scenarios)
 */
export function clearTokenCache(): void {
  tokenCache = null;
}

/**
 * Check if token management is properly configured
 */
export function isConfigured(): boolean {
  try {
    getConfig();
    return true;
  } catch {
    return false;
  }
}
