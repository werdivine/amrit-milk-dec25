/** @type {import('next').NextConfig} */
const nextConfig = {
    // Image optimization for Core Web Vitals
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            },
        ],
        // Optimize image formats
        formats: ['image/webp', 'image/avif'],
        // Set device sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        // Set image sizes for different layouts
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Minimum cache TTL (1 day)
        minimumCacheTTL: 86400,
    },

    // Compression for better performance
    compress: true,

    // Production source maps (disable for production builds)
    productionBrowserSourceMaps: false,

    // Powered by header removal for security
    poweredByHeader: false,

    // Trailing slash for consistent URLs
    trailingSlash: false,

    // Experimental features for performance
    experimental: {
        // Optimize package imports for faster builds
        optimizePackageImports: ['lucide-react', 'framer-motion'],
        // Enable scroll restoration
        scrollRestoration: true,
    },

    // ESLint configuration
    eslint: {
        ignoreDuringBuilds: true,
    },

    // TypeScript configuration
    typescript: {
        ignoreBuildErrors: true,
    },

    // Security Headers (HTTPS, CSP, HSTS, etc.)
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    // HTTPS and Transport Security
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                    // XSS Protection
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    // Clickjacking Protection
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    // XSS Protection (legacy browsers)
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    // Referrer Policy
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    // Content Security Policy
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
                            "style-src 'self' 'unsafe-inline'",
                            "img-src 'self' data: blob: https: http:",
                            "font-src 'self'",
                            "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
                            "media-src 'self'",
                            "frame-src 'self' https://wa.me",
                            "object-src 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                            "frame-ancestors 'self'",
                            "upgrade-insecure-requests",
                        ].join('; '),
                    },
                    // Permissions Policy
                    {
                        key: 'Permissions-Policy',
                        value: [
                            'camera=()',
                            'microphone=()',
                            'geolocation=(self)',
                            'payment=(self)',
                            'usb=()',
                            'magnetometer=()',
                            'gyroscope=()',
                            'speaker=()',
                            'fullscreen=(self)',
                            'accelerometer=()',
                        ].join(', '),
                    },
                    // DNS Prefetch Control
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                ],
            },
            {
                // Cache static assets
                source: '/assets/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // Cache images
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                ],
            },
            {
                // Cache sitemap and robots
                source: '/(sitemap.xml|robots.txt)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, stale-while-revalidate=86400',
                    },
                ],
            },
        ];
    },

    // Redirects for SEO (canonical URLs, old URL migration)
    async redirects() {
        return [
            // Common typo and old URL redirects
            {
                source: '/ghee',
                destination: '/products/a2-bilona-ghee',
                permanent: true,
            },
            {
                source: '/milk',
                destination: '/products/a2-gir-cow-milk',
                permanent: true,
            },
            {
                source: '/subscription',
                destination: '/subscription-hub',
                permanent: true,
            },
            {
                source: '/about',
                destination: '/the-farm',
                permanent: true,
            },
            {
                source: '/about-us',
                destination: '/the-farm',
                permanent: true,
            },
            {
                source: '/contact-us',
                destination: '/contact',
                permanent: true,
            },
            {
                source: '/faq',
                destination: '/faqs',
                permanent: true,
            },
            // Redirect trailing slashes to non-trailing slash
            {
                source: '/:path+/',
                destination: '/:path+',
                permanent: true,
            },
        ];
    },

    // Rewrites for clean URLs
    async rewrites() {
        return [
            // Add any URL rewriting rules here
        ];
    },
};

export default nextConfig;

