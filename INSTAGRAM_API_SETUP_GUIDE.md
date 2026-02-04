# 📸 Instagram Feed Integration Setup Guide for Amrit Milk Website

This comprehensive guide will walk you through the process of setting up Instagram feed integration for your Amrit Milk website using the latest Facebook Developer tools (2026).

## 🎯 Prerequisites

Before you begin, ensure you have:
- **Facebook Business Account** (required for Instagram API access)
- **Instagram Business Account** (must be connected to your Facebook Page)
- **Admin access** to both accounts
- **Amrit Milk website** with backend access

## 🔧 Step 1: Create a Facebook Developer App

1. **Go to Facebook Developer Portal**: [https://developers.facebook.com/](https://developers.facebook.com/)
2. **Click "Create App"** in the top right corner
3. **Select "Business" app type**
4. **Enter App Details**:
   - Display Name: `Amrit Milk Instagram Feed`
   - Contact Email: `hello@amritmilk.com`
   - Click "Create App"

## 📱 Step 2: Set Up Instagram Basic Display API

1. **In your Facebook App Dashboard**, go to **Products** → **Add Product**
2. **Find and add "Instagram Basic Display"**
3. **Click "Set Up"**

## 🔗 Step 3: Connect Instagram Business Account

1. **Go to Instagram Basic Display settings**
2. **Scroll to "User Token Generator" section**
3. **Click "Add or Remove Instagram Testers"**
4. **Add your Instagram Business Account** as a tester
5. **Log in to your Instagram account** and accept the invitation

## 🔐 Step 4: Generate Access Token

1. **Back in User Token Generator**, click "Generate Token"
2. **Select your Instagram Business Account**
3. **Choose required permissions**:
   - `instagram_basic` (required)
   - `instagram_content_publish` (if you want to publish content)
   - `pages_show_list` (required for business accounts)
4. **Click "Generate Token"**
5. **Copy the generated access token** - this is your **short-lived token** (expires in 1 hour)

## 🔄 Step 5: Exchange Short-Lived Token for Long-Lived Token

1. **Use this API call to exchange tokens**:
```bash
curl -i -X GET "https://graph.facebook.com/v20.0/oauth/access_token?
    grant_type=fb_exchange_token&
    client_id={app-id}&
    client_secret={app-secret}&
    fb_exchange_token={short-lived-token}"
```

2. **Replace placeholders**:
   - `{app-id}`: Your Facebook App ID (found in App Dashboard)
   - `{app-secret}`: Your Facebook App Secret (found in App Settings)
   - `{short-lived-token}`: The token you generated in Step 4

3. **The response will contain your long-lived token** (expires in 60 days)

## 🔧 Step 6: Add Token to Amrit Milk Website

1. **Add to Vercel Environment Variables**:
   - Key: `INSTAGRAM_ACCESS_TOKEN`
   - Value: Your long-lived token from Step 5

2. **Add Instagram User ID**:
   - Key: `INSTAGRAM_USER_ID`
   - Value: Your Instagram Business Account ID (get it from [https://www.instagram.com/{username}/?__a=1](https://www.instagram.com/{username}/?__a=1))

## 📊 Step 7: Implement Instagram Feed API Calls

Here's a sample API call to fetch Instagram posts:

```javascript
// Example: Fetch recent Instagram posts
async function fetchInstagramPosts() {
  const response = await fetch(
    `https://graph.facebook.com/v20.0/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`
  );
  const data = await response.json();
  return data.data;
}
```

## 🔄 Step 8: Set Up Token Refresh (Optional but Recommended)

Create a cron job to refresh your token before it expires:

```javascript
// Token refresh function
async function refreshInstagramToken() {
  const response = await fetch(
    `https://graph.facebook.com/v20.0/oauth/access_token?
      grant_type=fb_exchange_token&
      client_id=${FACEBOOK_APP_ID}&
      client_secret=${FACEBOOK_APP_SECRET}&
      fb_exchange_token=${CURRENT_TOKEN}`
  );
  const data = await response.json();
  return data.access_token; // New long-lived token
}
```

## 🎨 Step 9: Display Instagram Feed on Website

Add this component to your Next.js frontend:

```jsx
// components/InstagramFeed.jsx
import { useState, useEffect } from 'react';

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/instagram-feed');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error loading Instagram feed:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) return <div>Loading Instagram feed...</div>;

  return (
    <div className="instagram-feed">
      <h2>Follow Us on Instagram</h2>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-post"
          >
            <img
              src={post.media_url || post.thumbnail_url}
              alt={post.caption || 'Instagram post'}
              className="w-full h-64 object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
```

## 🔒 Step 10: Create API Endpoint

Create this file: `src/pages/api/instagram-feed.js`

```javascript
export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${process.env.INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&limit=9`
    );

    const data = await response.json();
    res.status(200).json(data.data);
  } catch (error) {
    console.error('Instagram API error:', error);
    res.status(500).json({ error: 'Failed to fetch Instagram feed' });
  }
}
```

## 📋 Required Environment Variables

Add these to your `.env.local` and Vercel environment:

```
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token_here
INSTAGRAM_USER_ID=your_instagram_user_id
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

## 🚀 Step 11: Deploy and Test

1. **Deploy your changes** to Vercel
2. **Visit your website** and check if the Instagram feed appears
3. **Test on mobile** to ensure responsive design works

## 🔧 Troubleshooting

**Common Issues and Solutions**:

1. **Token expired**: Generate a new long-lived token
2. **Permission errors**: Ensure your Instagram account is a Business account
3. **API limit reached**: Check your rate limits in Facebook Developer Dashboard
4. **Empty feed**: Verify your Instagram account has public posts

## 📅 Maintenance

- **Token refresh**: Set a reminder to refresh your token every 50-55 days
- **API changes**: Monitor Facebook Developer blog for API updates
- **Rate limits**: Keep an eye on your API usage in the Developer Dashboard

## 🎉 Success!

Your Amrit Milk website now has a beautiful Instagram feed integration that will:
- ✅ Show your latest Instagram posts
- ✅ Drive engagement to your Instagram profile
- ✅ Keep content fresh automatically
- ✅ Work seamlessly on all devices

**Status**: READY FOR IMPLEMENTATION | **Version**: 2026.Q1