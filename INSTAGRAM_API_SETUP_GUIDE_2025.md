# Instagram Graph API Setup Guide 2025
## AmritMilk Website Integration

> **Last Updated**: February 2025  
> **API Version**: v24.0+  
> **Migration Deadline**: April 21, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Meta App Creation](#meta-app-creation)
4. [Authentication Flow](#authentication-flow)
5. [Instagram API Integration](#instagram-api-integration)
6. [Token Management](#token-management)
7. [Next.js Integration](#nextjs-integration)
8. [Troubleshooting](#troubleshooting)
9. [Migration from Deprecated APIs](#migration-from-deprecated-apis)

---

## Overview

This guide provides comprehensive instructions for integrating Instagram posts into the AmritMilk website using the updated Instagram Graph API (2024-2025). The Instagram Basic Display API has been deprecated and must be migrated to the new Instagram API before April 21, 2025.

### Key Changes in 2024-2025

| Feature | Old API | New API (2024-2025) |
|---------|---------|---------------------|
| Authentication | Legacy OAuth | Facebook Login for Business |
| Token Expiration | 60 days | 30-45 days |
| API Version | v18.0+ | v24.0+ required |
| App Review | Basic review | Stringent review process |
| Permissions | `instagram_basic` | `instagram_basic` + `pages_show_list` |

---

## Prerequisites

### 1. Meta Developer Account Setup

1. **Create/Access Meta Developer Account**
   - Visit: https://developers.facebook.com/
   - Log in with your Facebook account
   - Complete developer verification if prompted

2. **Enable Two-Factor Authentication**
   - Go to Settings > Security and Login
   - Enable 2FA for your account
   - This is mandatory for app creation

3. **Verify Business Verification (if required)**
   - Some apps require business verification
   - Prepare: business documents, phone verification

### 2. Facebook Business Page Requirements

1. **Create a Business Page** (if not exists)
   - Go to: https://www.facebook.com/pages/create
   - Select "Business or Brand"
   - Complete page setup

2. **Page Roles Configuration**
   - Go to Page Settings > Page Roles
   - Assign "Admin" role to the app's business account
   - Note the Page ID (found in About section)

3. **Enable Page API Access**
   - Ensure the page is published
   - Verify no age/country restrictions

### 3. Instagram Business/Creator Account Requirements

1. **Convert Personal Account to Business/Creator**
   - Go to Instagram Settings > Account
   - Select "Switch to Professional Account"
   - Choose "Business" or "Creator"

2. **Connect to Facebook Page**
   - In Instagram Settings > Account
   - Select "Connect or create a Facebook Page"
   - Link to your business page

3. **Enable API Access**
   - Professional Dashboard > Settings
   - Enable "Show Instagram posts on other apps"

---

## Meta App Creation

### Step 1: Create New App

1. **Access Meta Developer Dashboard**
   - Visit: https://developers.facebook.com/apps
   - Click "Create App"

2. **Select App Type**
   ```
   App Type: Business (required for Instagram API)
   App Name: AmritMilk Instagram Integration
   App Purpose: Connect to existing systems
   ```

3. **Add Products**
   - Search for "Instagram API"
   - Click "Configure" on Instagram API Basic/Graph

### Step 2: App Configuration Settings

1. **Basic Settings**
   ```
   App Domain: amritmilk.com
   Privacy Policy URL: https://amritmilk.com/privacy-policy
   Data Deletion URL: https://amritmilk.com/data-deletion
   ```

2. **Required Fields**
   - App Icon (1024x1024px)
   - App Description
   - Business Website

3. **Privacy Policy Requirements**
   - Must be publicly accessible
   - Include data usage disclosure
   - Specify retention period
   - Include contact information

### Step 3: App Review Submission

1. **Permissions to Request**
   ```
   - instagram_basic
   - pages_show_list
   - instagram_manage_insights (optional)
   ```

2. **Submit for Review**
   - Provide use case description
   - Add demo credentials
   - Upload video walkthrough
   - Submit with 2-week review timeline

---

## Authentication Flow

### Facebook Login for Business Setup

#### 1. Configure OAuth Settings

1. **Add Facebook Login Product**
   - Go to App Dashboard > Products
   - Add "Facebook Login"

2. **OAuth Configuration**
   ```
   Valid OAuth Redirect URIs:
   - https://amritmilk.com/api/auth/instagram/callback
   - http://localhost:3000/api/auth/instagram/callback
   
   Deauthorize Callback URL:
   - https://amritmilk.com/api/auth/instagram/deauth
   
   Data Deletion Callback URL:
   - https://amritmilk.com/api/auth/instagram/delete-data
   ```

#### 2. Permission Requests

```javascript
// Required Permissions
const scopes = [
  'instagram_basic',
  'pages_show_list',
  'instagram_manage_comments', // optional
  'instagram_content_publish'  // optional
].join(',');
```

### OAuth 2.0 Implementation

#### 1. Authorization URL Generation

```javascript
// /lib/instagram/auth.js
const generateAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_APP_ID,
    redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/instagram/callback`,
    scope: 'instagram_basic,pages_show_list',
    response_type: 'code',
    state: generateSecureState(),
  });
  
  return `https://www.facebook.com/v24.0/dialog/oauth?${params}`;
};
```

#### 2. Token Exchange

```javascript
// /pages/api/auth/instagram/token.js
export default async function handler(req, res) {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'Authorization code missing' });
  }
  
  try {
    // Exchange code for short-lived token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v24.0/oauth/access_token?` +
      `client_id=${process.env.INSTAGRAM_APP_ID}&` +
      `redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&` +
      `client_secret=${process.env.INSTAGRAM_APP_SECRET}&` +
      `code=${code}`
    );
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      throw new Error(tokenData.error.message);
    }
    
    // Exchange for long-lived token
    const longLivedToken = await exchangeForLongLived(tokenData.access_token);
    
    res.json({ success: true, token: longLivedToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function exchangeForLongLived(shortLivedToken) {
  const response = await fetch(
    `https://graph.facebook.com/v24.0/oauth/access_token?` +
    `grant_type=fb_exchange_token&` +
    `client_id=${process.env.INSTAGRAM_APP_ID}&` +
    `client_secret=${process.env.INSTAGRAM_APP_SECRET}&` +
    `fb_exchange_token=${shortLivedToken}`
  );
  
  return response.json();
}
```

---

## Instagram API Integration

### API Endpoint Structure

#### 1. Get Instagram Business Account

```javascript
// /lib/instagram/api.js
const BASE_URL = 'https://graph.facebook.com/v24.0';

async function getInstagramAccount(pageAccessToken) {
  const response = await fetch(
    `${BASE_URL}/me/accounts?fields=instagram_business_account`,
    {
      headers: {
        Authorization: `Bearer ${pageAccessToken}`,
      },
    }
  );
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message);
  }
  
  return data.data[0]?.instagram_business_account;
}
```

#### 2. Fetch Media Posts

```javascript
async function getInstagramMedia(igUserId, accessToken) {
  const fields = [
    'id',
    'caption',
    'media_type',
    'media_url',
    'permalink',
    'thumbnail_url',
    'timestamp',
    'like_count',
    'comments_count'
  ].join(',');
  
  const response = await fetch(
    `${BASE_URL}/${igUserId}/media?fields=${fields}&limit=12`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message);
  }
  
  return data.data;
}
```

#### 3. Get Media Details

```javascript
async function getMediaDetails(mediaId, accessToken) {
  const fields = [
    'id',
    'caption',
    'media_type',
    'media_url',
    'permalink',
    'thumbnail_url',
    'timestamp',
    'like_count',
    'comments_count',
    'insights.metric(impressions,reach,engagement)'
  ].join(',');
  
  const response = await fetch(
    `${BASE_URL}/${mediaId}?fields=${fields}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  
  return response.json();
}
```

### Rate Limit Handling

```javascript
// Rate limit response headers
const getRateLimitInfo = (response) => ({
  callsMade: response.headers.get('x-app-usage'),
  callsAvailable: response.headers.get('x-app-usage'),
  resetTime: response.headers.get('retry-after')
});

// Implement exponential backoff
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 80002) { // Rate limit error
        const waitTime = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}
```

---

## Token Management

### Token Types and Expiration

| Token Type | Expiration | Use Case |
|------------|------------|----------|
| Short-lived | 1-2 hours | Initial token exchange |
| Long-lived | 30-45 days | API access (needs refresh) |

### Long-Lived Token Exchange

```javascript
async function getLongLivedToken(shortLivedToken) {
  const response = await fetch(
    `https://graph.facebook.com/v24.0/oauth/access_token?` +
    `grant_type=fb_exchange_token&` +
    `client_id=${process.env.INSTAGRAM_APP_ID}&` +
    `client_secret=${process.env.INSTAGRAM_APP_SECRET}&` +
    `fb_exchange_token=${shortLivedToken}`
  );
  
  const data = await response.json();
  
  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in, // seconds
    tokenType: data.token_type
  };
}
```

### Token Refresh Implementation

```javascript
// /lib/instagram/token-manager.js
class InstagramTokenManager {
  constructor() {
    this.refreshThreshold = 7 * 24 * 60 * 60; // 7 days before expiry
  }
  
  async refreshTokenIfNeeded(tokenData) {
    const expiresAt = new Date(tokenData.expiresAt);
    const now = new Date();
    const timeUntilExpiry = (expiresAt - now) / 1000;
    
    if (timeUntilExpiry < this.refreshThreshold) {
      return await this.refreshToken(tokenData.accessToken);
    }
    
    return tokenData;
  }
  
  async refreshToken(currentToken) {
    const response = await fetch(
      `https://graph.facebook.com/v24.0/oauth/access_token?` +
      `grant_type=fb_exchange_token&` +
      `client_id=${process.env.INSTAGRAM_APP_ID}&` +
      `client_secret=${process.env.INSTAGRAM_APP_SECRET}&` +
      `fb_exchange_token=${currentToken}`
    );
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    // Update token in database
    await this.updateToken({
      accessToken: data.access_token,
      expiresAt: new Date(Date.now() + data.expires_in * 1000)
    });
    
    return data.access_token;
  }
}
```

### Automated Refresh Scheduling

```javascript
// /lib/instagram/cron.js
// Using node-cron or similar
const cron = require('node-cron');

cron.schedule('0 0 * * *', async () => {
  // Run daily at midnight
  const tokenManager = new InstagramTokenManager();
  
  // Get all stored tokens from database
  const tokens = await getStoredTokens();
  
  for (const token of tokens) {
    try {
      await tokenManager.refreshTokenIfNeeded(token);
      console.log(`Token refreshed for user ${token.userId}`);
    } catch (error) {
      console.error(`Failed to refresh token for user ${token.userId}:`, error);
    }
  }
});
```

---

## Next.js Integration

### Environment Variables

```bash
# .env.example
# Instagram App Configuration
INSTAGRAM_APP_ID=your_app_id_here
INSTAGRAM_APP_SECRET=your_app_secret_here
INSTAGRAM_REDIRECT_URI=https://amritmilk.com/api/auth/instagram/callback

# Database for token storage
DATABASE_URL=your_database_url

# Site URL
NEXT_PUBLIC_SITE_URL=https://amritmilk.com
```

### API Route for Instagram Data

```javascript
// /pages/api/instagram/feed.js
import { getInstagramMedia } from '@/lib/instagram/api';
import { InstagramTokenManager } from '@/lib/instagram/token-manager';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get token from database/session
    const tokenData = await getStoredToken();
    
    if (!tokenData) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    // Refresh token if needed
    const tokenManager = new InstagramTokenManager();
    const validToken = await tokenManager.refreshTokenIfNeeded(tokenData);
    
    // Get IG account ID
    const igUserId = await getInstagramUserId(validToken);
    
    // Fetch media
    const media = await getInstagramMedia(igUserId, validToken);
    
    // Transform data for frontend
    const feed = media.map(post => ({
      id: post.id,
      caption: post.caption,
      image: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      type: post.media_type,
      url: post.permalink,
      timestamp: post.timestamp,
      likes: post.like_count,
      comments: post.comments_count,
      isCarousel: post.media_type === 'CAROUSEL_ALBUM'
    }));
    
    // Cache for 1 hour
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
    
    res.json({ success: true, feed });
  } catch (error) {
    console.error('Instagram API error:', error);
    res.status(500).json({ error: 'Failed to fetch Instagram feed' });
  }
}
```

### Frontend Component

```tsx
// /components/instagram/InstagramFeed.tsx
import { useState, useEffect } from 'react';

interface InstagramPost {
  id: string;
  caption: string;
  image: string;
  type: string;
  url: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInstagramFeed();
  }, []);

  const fetchInstagramFeed = async () => {
    try {
      const response = await fetch('/api/instagram/feed');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error);
      }
      
      setPosts(data.feed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load feed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        <p>Failed to load Instagram feed</p>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="instagram-feed py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Follow Us on Instagram
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group block aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={post.image}
                alt={post.caption?.slice(0, 50) || 'Instagram post'}
                className="object-cover w-full h-full transition-transform group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center">
                  <span className="mx-2">♥ {post.likes}</span>
                  <span className="mx-2">💬 {post.comments}</span>
                </div>
              </div>
              
              {/* Badge for carousel/video */}
              {post.type !== 'IMAGE' && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {post.type === 'VIDEO' ? '▶' : '◫'}
                </div>
              )}
            </a>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a
            href="https://instagram.com/amritmilk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            @amritmilk
          </a>
        </div>
      </div>
    </section>
  );
}
```

### Error Handling

```typescript
// /lib/instagram/errors.ts
export class InstagramAPIError extends Error {
  constructor(
    message: string,
    public code: string,
    public httpStatus: number,
    public shouldRetry: boolean = false
  ) {
    super(message);
    this.name = 'InstagramAPIError';
  }
}

export const ERROR_CODES: Record<string, { message: string; retry: boolean }> = {
  '80001': { message: 'Internal error', retry: true },
  '80002': { message: 'Rate limit exceeded', retry: true },
  '100': { message: 'Invalid OAuth 2.0 access token', retry: false },
  '190': { message: 'Token expired', retry: false },
  '200': { message: 'Permission denied', retry: false },
  '4': { message: 'API rate limit', retry: true },
};

export function handleInstagramError(error: any): InstagramAPIError {
  const code = error.code?.toString() || error.error_code?.toString();
  const config = ERROR_CODES[code] || { message: 'Unknown error', retry: false };
  
  return new InstagramAPIError(
    config.message,
    code,
    error.http_status || 500,
    config.retry
  );
}
```

---

## Troubleshooting

### Common Errors and Solutions

| Error Code | Error Message | Solution |
|------------|---------------|----------|
| 100 | Invalid parameter | Check API version and endpoint |
| 190 | Token expired | Refresh or re-authenticate |
| 200 | Permission denied | Request missing permissions |
| 80001 | Internal error | Retry with backoff |
| 80002 | Rate limit | Wait and retry |
| 4 | API calls exhausted | Reduce request frequency |

### Token Refresh Issues

```javascript
// Debug token
async function debugToken(token) {
  const response = await fetch(
    `https://graph.facebook.com/debug_token?` +
    `input_token=${token}&` +
    `access_token=${process.env.INSTAGRAM_APP_ID}|${process.env.INSTAGRAM_APP_SECRET}`
  );
  
  const data = await response.json();
  console.log('Token debug:', data);
  
  return data;
}
```

### API Version Compatibility

```javascript
// Check API version in use
const getAPIVersion = () => {
  return process.env.INSTAGRAM_API_VERSION || 'v24.0';
};

// Ensure minimum version
const MIN_API_VERSION = 'v24.0';
const currentVersion = getAPIVersion();

if (currentVersion < MIN_API_VERSION) {
  throw new Error(`API version ${currentVersion} is deprecated. Please upgrade to ${MIN_API_VERSION}`);
}
```

### Debugging Checklist

1. **Verify App Configuration**
   - [ ] App ID and Secret correct
   - [ ] Redirect URIs match exactly
   - [ ] Required permissions granted

2. **Check Token Validity**
   - [ ] Token not expired
   - [ ] Token has correct permissions
   - [ ] Token belongs to correct app

3. **Test API Endpoints**
   - [ ] Use Graph API Explorer
   - [ ] Check rate limits
   - [ ] Verify account ID

---

## Migration from Deprecated APIs

### Migration Checklist (Before April 21, 2025)

1. **Identify Deprecated Endpoints**
   ```
   REMOVED:
   - /v18.0/me/media (Basic Display API)
   - /v18.0/{user-id}/media (Basic Display API)
   
   USE INSTEAD:
   - /v24.0/{ig-user-id}/media (Graph API)
   ```

2. **Update Token Type**
   ```javascript
   // Old: User access token from Basic Display API
   // New: Page access token + IG business account
   
   // Get IG user ID using page access token
   const igUserId = await getInstagramAccount(pageAccessToken);
   ```

3. **Update Permission Requests**
   ```javascript
   // Old scope
   const oldScopes = 'instagram_basic,user_profile';
   
   // New scope
   const newScopes = 'instagram_basic,pages_show_list';
   ```

### Code Migration Example

```javascript
// BEFORE (Deprecated - Basic Display API)
async function getOldFeed(userAccessToken) {
  const response = await fetch(
    'https://graph.instagram.com/me/media?' +
    'fields=id,caption,media_type,media_url,thumbnail_url&' +
    `access_token=${userAccessToken}`
  );
  return response.json();
}

// AFTER (New - Graph API)
async function getNewFeed(igUserId, pageAccessToken) {
  const response = await fetch(
    `https://graph.facebook.com/v24.0/${igUserId}/media?` +
    'fields=id,caption,media_type,media_url,thumbnail_url,permalink&' +
    `access_token=${pageAccessToken}`
  );
  return response.json();
}
```

### Breaking Changes to Handle

| Change | Old Behavior | New Behavior |
|--------|--------------|--------------|
| Token type | User access token | Page access token required |
| Endpoint | `/me/media` | `/{ig-user-id}/media` |
| Permissions | `user_profile` | `pages_show_list` |
| Token expiration | 60 days | 30-45 days |
| Auth flow | Legacy OAuth | Facebook Login for Business |

---

## Security Best Practices

1. **Never expose tokens in frontend code**
   - Store in environment variables
   - Use server-side API routes
   - Encrypt tokens at rest

2. **Implement proper CORS headers**
   ```javascript
   const allowedOrigins = [
     'https://amritmilk.com',
     'http://localhost:3000'
   ];
   
   if (!allowedOrigins.includes(req.headers.origin)) {
     return res.status(403).json({ error: 'Origin not allowed' });
   }
   ```

3. **Use HTTPS only**
   - Enforce SSL for all API communications
   - Redirect HTTP to HTTPS

4. **Implement rate limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const instagramLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // 100 requests per window
     message: { error: 'Too many requests' }
   });
   ```

---

## Additional Resources

- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)
- [Meta Developer Dashboard](https://developers.facebook.com/apps)
- [API Versioning](https://developers.facebook.com/docs/graph-api/versioning)
- [Token Best Practices](https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow#checklogin)

---

## Support

For issues with this integration:
1. Check Meta Developer Dashboard for app status
2. Review API error logs
3. Consult Meta Developer Documentation
4. Contact Meta Developer Support through the dashboard

---

*This guide will be updated as Meta releases new API changes. Last verified: February 2025.*
