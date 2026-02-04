/**
 * Instagram API Types
 * TypeScript interfaces for Instagram Graph API responses
 */

/**
 * Media type enum for Instagram posts
 */
export enum InstagramMediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  CAROUSEL_ALBUM = 'CAROUSEL_ALBUM',
}

/**
 * Interface for a single Instagram post
 */
export interface InstagramPost {
  /** Unique identifier for the media */
  id: string;
  /** Caption text for the media (may be empty) */
  caption: string;
  /** Type of media: IMAGE, VIDEO, or CAROUSEL_ALBUM */
  media_type: InstagramMediaType | string;
  /** URL to the media content (image or video) */
  media_url: string;
  /** Permanent URL to the media on Instagram */
  permalink: string;
  /** ISO 8601 timestamp when the media was created */
  timestamp: string;
  /** URL to the thumbnail (for videos) */
  thumbnail_url?: string;
  /** Number of likes */
  like_count?: number;
  /** Number of comments */
  comments_count?: number;
}

/**
 * Interface for paginated API response
 */
export interface InstagramApiResponse {
  /** Array of Instagram posts */
  data: InstagramPost[];
  /** Pagination information */
  paging?: {
    /** Cursors for pagination */
    cursors?: {
      before?: string;
      after?: string;
    };
    /** URL for next page */
    next?: string;
    /** URL for previous page */
    previous?: string;
  };
}

/**
 * Interface for API error response
 */
export interface ApiError {
  /** Error message */
  message: string;
  /** HTTP status code */
  status: number;
  /** Error code from API */
  code: string;
}

/**
 * Interface for user profile data
 */
export interface InstagramUserProfile {
  /** Instagram user ID */
  id: string;
  /** Account type (USER, BUSINESS) */
  account_type: string;
  /** Instagram username */
  username: string;
  /** Display name */
  name?: string;
  /** Profile picture URL */
  profile_picture_url?: string;
}

/**
 * Interface for long-lived token response
 */
export interface LongLivedTokenResponse {
  /** Long-lived access token */
  access_token: string;
  /** Token type (always "bearer") */
  token_type: string;
  /** Time in seconds until token expires */
  expires_in: number;
}

/**
 * Interface for token refresh response
 */
export interface TokenRefreshResponse {
  /** New long-lived access token */
  access_token: string;
  /** Token type (always "bearer") */
  token_type: string;
  /** Time in seconds until token expires */
  expires_in: number;
}

/**
 * Cache entry interface for token caching
 */
export interface CachedToken {
  /** Access token */
  accessToken: string;
  /** Expiry timestamp (Unix epoch in milliseconds) */
  expiresAt: number;
}

/**
 * Configuration interface for Instagram settings
 */
export interface InstagramConfig {
  /** Meta App ID from Facebook Developer Portal */
  appId: string;
  /** Meta App Secret for token exchange */
  appSecret: string;
  /** Instagram Access Token */
  accessToken: string;
  /** Instagram Business/User ID */
  userId: string;
  /** Redirect URI for OAuth flow */
  redirectUri: string;
}
