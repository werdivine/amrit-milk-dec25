/**
 * Analytics and Conversion Tracking Utilities
 * 
 * This file provides helper functions to track conversion events
 * for Google Analytics, Google Ads, and Facebook Pixel.
 */

// GA Measurement ID (already in layout.tsx)
const GA_MEASUREMENT_ID = 'G-1C4LN7YY4D';

// Declare gtag for TypeScript
declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        fbq: (...args: any[]) => void;
        dataLayer: any[];
    }
}

/**
 * Track a custom event in Google Analytics
 */
export function trackEvent(
    eventName: string,
    params?: Record<string, any>
) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params);
        console.log(`[Analytics] Event tracked: ${eventName}`, params);
    }
}

/**
 * Track Add to Cart conversion
 */
export function trackAddToCart(product: {
    id: string;
    name: string;
    price: number;
    category?: string;
    quantity?: number;
}) {
    // Google Analytics 4 - Add to Cart
    trackEvent('add_to_cart', {
        currency: 'INR',
        value: product.price * (product.quantity || 1),
        items: [{
            item_id: product.id,
            item_name: product.name,
            item_category: product.category || 'General',
            price: product.price,
            quantity: product.quantity || 1,
        }],
    });

    // Facebook Pixel - AddToCart (if installed)
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'AddToCart', {
            content_ids: [product.id],
            content_name: product.name,
            content_type: 'product',
            value: product.price * (product.quantity || 1),
            currency: 'INR',
        });
    }
}

/**
 * Track Begin Checkout conversion
 */
export function trackBeginCheckout(cart: {
    items: Array<{ id: string; name: string; price: number; quantity: number }>;
    total: number;
}) {
    trackEvent('begin_checkout', {
        currency: 'INR',
        value: cart.total,
        items: cart.items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity,
        })),
    });

    // Facebook Pixel - InitiateCheckout
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
            content_ids: cart.items.map(i => i.id),
            value: cart.total,
            currency: 'INR',
            num_items: cart.items.length,
        });
    }
}

/**
 * Track Purchase/Order completion
 */
export function trackPurchase(order: {
    orderId: string;
    total: number;
    items: Array<{ id: string; name: string; price: number; quantity: number }>;
}) {
    trackEvent('purchase', {
        transaction_id: order.orderId,
        currency: 'INR',
        value: order.total,
        items: order.items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity,
        })),
    });

    // Facebook Pixel - Purchase
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Purchase', {
            content_ids: order.items.map(i => i.id),
            value: order.total,
            currency: 'INR',
            content_type: 'product',
        });
    }
}

/**
 * Track WhatsApp Order Click
 */
export function trackWhatsAppOrder(productName?: string) {
    trackEvent('whatsapp_order_click', {
        method: 'WhatsApp',
        product_name: productName || 'General Inquiry',
    });

    // Facebook Pixel - Contact
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Contact', {
            content_name: productName || 'WhatsApp Order',
        });
    }
}

/**
 * Track Newsletter Signup
 */
export function trackNewsletterSignup(email?: string) {
    trackEvent('newsletter_signup', {
        method: 'Email Form',
    });

    // Facebook Pixel - Lead
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
            content_name: 'Newsletter Signup',
        });
    }
}

/**
 * Track Product View
 */
export function trackProductView(product: {
    id: string;
    name: string;
    price: number;
    category?: string;
}) {
    trackEvent('view_item', {
        currency: 'INR',
        value: product.price,
        items: [{
            item_id: product.id,
            item_name: product.name,
            item_category: product.category || 'General',
            price: product.price,
        }],
    });

    // Facebook Pixel - ViewContent
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent', {
            content_ids: [product.id],
            content_name: product.name,
            content_type: 'product',
            value: product.price,
            currency: 'INR',
        });
    }
}
