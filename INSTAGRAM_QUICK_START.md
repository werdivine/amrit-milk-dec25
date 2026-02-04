# 🚀 Instagram API Quick Start Guide

## 📋 Step-by-Step Summary

### 1️⃣ Create Facebook App
📍 **URL**: [https://developers.facebook.com/](https://developers.facebook.com/)
✅ Click "Create App" → Select "Business" → Name: "Amrit Milk Instagram Feed"

### 2️⃣ Add Instagram Basic Display
📍 **Location**: App Dashboard → Products → Add Product
✅ Find "Instagram Basic Display" → Click "Set Up"

### 3️⃣ Connect Instagram Account
📍 **Location**: Instagram Basic Display Settings
✅ Add Instagram Testers → Add your business account
✅ Accept invitation in Instagram app

### 4️⃣ Generate Token
📍 **Location**: User Token Generator
✅ Select permissions: `instagram_basic`, `pages_show_list`
✅ Click "Generate Token" → Copy short-lived token

### 5️⃣ Exchange for Long-Lived Token
```bash
curl -i -X GET "https://graph.facebook.com/v20.0/oauth/access_token?
    grant_type=fb_exchange_token&
    client_id={app-id}&
    client_secret={app-secret}&
    fb_exchange_token={short-lived-token}"
```

### 6️⃣ Add to Website
📍 **Vercel Environment Variables**:
```
INSTAGRAM_ACCESS_TOKEN=your_long_lived_token
INSTAGRAM_USER_ID=your_user_id
```

## 🔑 Required Permissions
- `instagram_basic` ✅ (Required)
- `pages_show_list` ✅ (Required for business accounts)
- `instagram_content_publish` ⚠️ (Optional, for posting)

## 📅 Token Lifecycle
- **Short-lived token**: 1 hour
- **Long-lived token**: 60 days
- **Refresh before**: 50-55 days

## 🎯 API Endpoints
```javascript
// Get user media
GET /{ig-user-id}/media

// Get user info
GET /{ig-user-id}?fields=id,username,account_type

// Refresh token
GET /oauth/access_token?grant_type=fb_exchange_token
```

## 🚨 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Token expired | Generate new long-lived token |
| Permission error | Ensure Instagram is Business account |
| Empty response | Check account has public posts |
| Rate limit | Check API usage in Developer Dashboard |

## 📱 Instagram Feed Component
```jsx
// Quick implementation
<InstagramFeed userId="YOUR_USER_ID" accessToken="YOUR_TOKEN" limit={9} />
```

**Status**: READY | **Last Updated**: 2026.Q1