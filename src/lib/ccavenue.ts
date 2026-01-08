/**
 * CCAvenue Payment Gateway Encryption/Decryption Utilities
 * Uses AES-128-CBC encryption as required by CCAvenue
 */

import crypto from "crypto";

const ALGORITHM = "aes-128-cbc";

/**
 * Generate MD5 hash of the working key (used as encryption key)
 */
function getMd5(data: string): Buffer {
    return crypto.createHash("md5").update(data).digest();
}

/**
 * Encrypt data for CCAvenue request
 * @param plainText - The data to encrypt (query string format)
 * @param workingKey - CCAvenue working key
 * @returns Encrypted hex string
 */
export function encrypt(plainText: string, workingKey: string): string {
    const key = getMd5(workingKey);

    // CCAvenue uses a fixed IV of 16 null bytes for AES-128-CBC
    const iv = Buffer.alloc(16, 0);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(plainText, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
}

/**
 * Decrypt CCAvenue response
 * @param encryptedText - The encrypted hex string from CCAvenue
 * @param workingKey - CCAvenue working key
 * @returns Decrypted plain text
 */
export function decrypt(encryptedText: string, workingKey: string): string {
    const key = getMd5(workingKey);

    // CCAvenue uses a fixed IV of 16 null bytes for AES-128-CBC
    const iv = Buffer.alloc(16, 0);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

/**
 * Parse CCAvenue response string to object
 * Response comes as key=value&key2=value2 format
 */
export function parseResponse(responseString: string): Record<string, string> {
    const params: Record<string, string> = {};
    const pairs = responseString.split("&");

    for (const pair of pairs) {
        const [key, value] = pair.split("=");
        if (key) {
            params[decodeURIComponent(key)] = decodeURIComponent(value || "");
        }
    }

    return params;
}

/**
 * Build CCAvenue request data string from order details
 */
export function buildRequestData(orderData: {
    orderId: string;
    amount: number;
    currency?: string;
    merchantId: string;
    redirectUrl: string;
    cancelUrl: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    billingAddress: string;
    billingCity: string;
    billingState?: string;
    billingZip: string;
    billingCountry?: string;
}): string {
    const params: Record<string, string> = {
        merchant_id: orderData.merchantId,
        order_id: orderData.orderId,
        currency: orderData.currency || "INR",
        amount: orderData.amount.toFixed(2),
        redirect_url: orderData.redirectUrl,
        cancel_url: orderData.cancelUrl,
        language: "EN",
        billing_name: orderData.customerName,
        billing_address: orderData.billingAddress,
        billing_city: orderData.billingCity,
        billing_state: orderData.billingState || "",
        billing_zip: orderData.billingZip,
        billing_country: orderData.billingCountry || "India",
        billing_tel: orderData.customerPhone,
        billing_email: orderData.customerEmail,
        delivery_name: orderData.customerName,
        delivery_address: orderData.billingAddress,
        delivery_city: orderData.billingCity,
        delivery_state: orderData.billingState || "",
        delivery_zip: orderData.billingZip,
        delivery_country: orderData.billingCountry || "India",
        delivery_tel: orderData.customerPhone,
    };

    // Build query string
    return Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
}

// CCAvenue URLs
export const CCAVENUE_URLS = {
    // Production URL
    production:
        "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
    // Test/Sandbox URL
    test: "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
};
