/**
 * Instagram Feed Component
 * Displays Instagram posts in a responsive grid layout.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInstagram } from '@/hooks/useInstagram';
import { InstagramPost, InstagramMediaType } from '@/lib/instagram/types';

function formatEngagement(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function truncateCaption(caption: string, maxLength: number = 100): string {
  if (caption.length <= maxLength) return caption;
  return `${caption.substring(0, maxLength)}...`;
}

interface InstagramPostCardProps {
  post: InstagramPost;
  showMetrics: boolean;
  showCaption: boolean;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

function InstagramPostCard({ post, showMetrics, showCaption, aspectRatio }: InstagramPostCardProps) {
  const imageUrl = post.media_type === InstagramMediaType.VIDEO 
    ? post.thumbnail_url || post.media_url 
    : post.media_url;
  
  const aspectRatioClass = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  }[aspectRatio];

  return (
    <Link
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className={`relative ${aspectRatioClass} overflow-hidden`}>
        <Image
          src={imageUrl}
          alt={post.caption ? truncateCaption(post.caption, 50) : `Instagram post by AmritMilk`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {post.media_type === InstagramMediaType.VIDEO && (
          <div className="absolute top-3 right-3 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
            <svg className="inline-block h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Video
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {showMetrics && (post.like_count || post.comments_count) && (
          <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 backdrop-blur-sm">
              <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {formatEngagement(post.like_count || 0)}
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 backdrop-blur-sm">
              <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 6h-2V3a1 1 0 00-1-1H6a3 3 0 00-3 3v16a3 3 0 003 3h12a3 3 0 003-3v-4l2-2v-3H9a1 1 0 000 2h10a1 1 0 001-1V7a1 1 0 00-1-1h-2V3a1 1 0 00-1-1H6a1 1 0 00-1 1v16a1 1 0 001 1h15a1 1 0 001-1V7z" />
              </svg>
              {formatEngagement(post.comments_count || 0)}
            </div>
          </div>
        )}
      </div>

      {showCaption && post.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-12">
          <p className="line-clamp-2 text-xs text-white">{truncateCaption(post.caption, 80)}</p>
        </div>
      )}

      <div className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {formatDate(post.timestamp)}
      </div>
    </Link>
  );
}

function InstagramFeedSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse"><div className="aspect-square rounded-xl bg-gray-200" /></div>
      ))}
    </div>
  );
}

interface InstagramFeedErrorProps { error: string; onRetry: () => void; }

function InstagramFeedError({ error, onRetry }: InstagramFeedErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-amber-200 bg-amber-50 p-8 text-center">
      <h3 className="mb-2 text-lg font-semibold text-amber-800">Unable to Load Instagram Feed</h3>
      <p className="mb-4 text-sm text-amber-700">{error}</p>
      <button onClick={onRetry} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600">Try Again</button>
    </div>
  );
}

function InstagramFeedEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
      <h3 className="mb-2 text-lg font-semibold text-gray-700">No Posts Yet</h3>
      <p className="text-sm text-gray-500">Check back soon for fresh updates from AmritMilk!</p>
    </div>
  );
}

export interface InstagramFeedProps {
  limit?: number;
  columns?: number;
  showMetrics?: boolean;
  showCaption?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  gap?: number;
  className?: string;
  title?: string;
  showInstagramLink?: boolean;
}

export function InstagramFeed({
  limit = 8, columns = 4, showMetrics = true, showCaption = false, aspectRatio = 'square',
  gap = 4, className = '', title = 'Follow Our Journey', showInstagramLink = true,
}: InstagramFeedProps) {
  const { posts, loading, error, refresh, refreshing } = useInstagram({ limit, autoRefresh: null });

  const gridCols = {
    2: 'grid-cols-2', 3: 'grid-cols-2 md:grid-cols-3', 4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5', 6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  }[columns] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <section className={`instagram-feed py-8 ${className}`}>
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {showInstagramLink && (
          <a href="https://instagram.com/amritmilk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 transition-colors hover:text-amber-700">
            @amritmilk
          </a>
        )}
      </div>

      {loading ? (
        <InstagramFeedSkeleton count={limit} />
      ) : error ? (
        <InstagramFeedError error={error} onRetry={refresh} />
      ) : posts.length === 0 ? (
        <InstagramFeedEmpty />
      ) : (
        <>
          <div className={`grid ${gridCols} gap-${gap}`}>
            {posts.map((post) => (
              <InstagramPostCard key={post.id} post={post} showMetrics={showMetrics} showCaption={showCaption} aspectRatio={aspectRatio} />
            ))}
          </div>
          {refreshing && <div className="mt-4 flex justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />}</div>}
        </>
      )}
    </section>
  );
}

export function InstagramFeedCompact({ limit = 4, className = '' }: { limit?: number; className?: string }) {
  return <InstagramFeed limit={limit} columns={limit <= 4 ? 2 : 4} showMetrics={false} showCaption={false} aspectRatio="square" gap={2} className={className} title="" showInstagramLink={false} />;
}

export default InstagramFeed;
