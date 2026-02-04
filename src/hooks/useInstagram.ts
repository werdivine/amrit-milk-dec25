/**
 * useInstagram Hook
 * Custom hook for fetching and managing Instagram posts.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { InstagramPost } from '@/lib/instagram/types';

const API_BASE = '/api/instagram';
const CACHE_DURATION = 60 * 60 * 1000;

export interface UseInstagramReturn {
  posts: InstagramPost[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  refreshing: boolean;
  refreshToken: () => Promise<void>;
}

export interface UseInstagramOptions {
  limit?: number;
  mediaId?: string;
  forceRefresh?: boolean;
  autoRefresh?: number | null;
  onSuccess?: (posts: InstagramPost[]) => void;
  onError?: (error: string) => void;
}

export function useInstagram(options: UseInstagramOptions = {}): UseInstagramReturn {
  const { limit = 12, mediaId, forceRefresh = false, autoRefresh = null, onSuccess, onError } = options;
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPosts = useCallback(async (isRefresh = false): Promise<void> => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (limit) params.set('limit', limit.toString());
      if (mediaId) params.set('mediaId', mediaId);
      if (forceRefresh) params.set('refresh', 'true');

      const url = `${API_BASE}?${params.toString()}`;
      const response = await fetch(url, { method: 'GET', signal: abortControllerRef.current.signal });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch Instagram posts');

      const fetchedPosts: InstagramPost[] = data.data;
      setPosts(fetchedPosts);

      if (!mediaId) {
        const cacheData = { posts: fetchedPosts, timestamp: Date.now() };
        try {
          localStorage.setItem('instagram_posts_cache', JSON.stringify(cacheData));
        } catch (e) {
          console.warn('Failed to cache Instagram posts:', e);
        }
      }

      if (onSuccess) onSuccess(fetchedPosts);
      setError(null);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
      abortControllerRef.current = null;
    }
  }, [limit, mediaId, forceRefresh, onSuccess, onError]);

  const refresh = useCallback(async (): Promise<void> => { await fetchPosts(true); }, [fetchPosts]);

  const refreshToken = useCallback(async (): Promise<void> => {
    const params = new URLSearchParams({ refresh: 'true' });
    const url = `${API_BASE}?${params.toString()}`;
    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) throw new Error('Token refresh failed');
      await fetchPosts(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Token refresh failed';
      setError(message);
      if (onError) onError(message);
    }
  }, [fetchPosts, onError]);

  useEffect(() => {
    if (!mediaId) {
      try {
        const cached = localStorage.getItem('instagram_posts_cache');
        if (cached) {
          const cacheData = JSON.parse(cached);
          if (Date.now() - cacheData.timestamp < CACHE_DURATION) {
            setPosts(cacheData.posts);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Failed to load cached Instagram posts:', e);
      }
    }
    fetchPosts(false);
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    };
  }, [fetchPosts, mediaId]);

  useEffect(() => {
    if (autoRefresh && autoRefresh > 0) {
      refreshTimeoutRef.current = setInterval(() => { fetchPosts(true); }, autoRefresh);
      return () => {
        if (refreshTimeoutRef.current) clearInterval(refreshTimeoutRef.current);
      };
    }
  }, [autoRefresh, fetchPosts]);

  return { posts, loading, error, refresh, refreshing, refreshToken };
}

export function useInstagramPost(mediaId: string | null) {
  const [post, setPost] = useState<InstagramPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!mediaId) { setPost(null); return; }
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ mediaId });
      const url = `${API_BASE}?${params.toString()}`;
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch post');
      setPost(data.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [mediaId]);

  useEffect(() => { fetchPost(); }, [fetchPost]);
  return { post, loading, error, refresh: fetchPost };
}

export function useInstagramConfig() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkConfig = async () => {
      try {
        const response = await fetch(`${API_BASE}?check_config=true`, { method: 'GET' });
        const data = await response.json();
        setIsConfigured(data.configured);
      } catch {
        setIsConfigured(false);
      } finally {
        setChecking(false);
      }
    };
    checkConfig();
  }, []);

  return { isConfigured, checking };
}
