/**
 * CCAvenue Recurring Payment Integration
 * Extends base CCAvenue to support subscriptions
 */

import { buildRequestData } from "./ccavenue";

export interface RecurringPaymentData {
    orderId: string;
    amount: number;
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
    // Recurring-specific fields
    recurringFrequency: "daily" | "weekly" | "bi_weekly" | "monthly" | "every_2_days";
    recurringAmount: number;
    recurringStartDate: string; // YYYY-MM-DD
    recurringEndDate?: string; // Optional, YYYY-MM-DD
}

/**
 * Build CCAvenue request data for RECURRING payments
 */
export function buildRecurringRequestData(data: RecurringPaymentData): string {
    // First build base request
    const baseParams = buildRequestData(data);

    // Add recurring-specific parameters
    const recurringParams = new URLSearchParams(baseParams);

    // CCAvenue recurring payment fields
    recurringParams.set("recurring_payment", "Y");
    recurringParams.set("recurring_amount", data.recurringAmount.toFixed(2));

    // Map our frequency to CCAvenue frequency codes
    const frequencyMap: Record<string, string> = {
        daily: "DAILY",
        every_2_days: "DAILY", // We'll handle this with interval
        weekly: "WEEKLY",
        bi_weekly: "BIWEEKLY",
        monthly: "MONTHLY",
    };

    recurringParams.set("recurring_frequency", frequencyMap[data.recurringFrequency]);

    // For every_2_days, set interval to 2
    if (data.recurringFrequency === "every_2_days") {
        recurringParams.set("recurring_interval", "2");
    }

    // Start and end dates
    recurringParams.set("recurring_start_date", data.recurringStartDate);
    if (data.recurringEndDate) {
        recurringParams.set("recurring_end_date", data.recurringEndDate);
    }

    // Mandate/subscription parameters
    recurringParams.set("sub_reference_no", `SUB-${data.orderId}`);

    return recurringParams.toString();
}

/**
 * Calculate next delivery date based on frequency
 */
export function calculateNextDelivery(
    currentDate: Date,
    frequency: RecurringPaymentData["recurringFrequency"]
): Date {
    const next = new Date(currentDate);

    switch (frequency) {
        case "daily":
            next.setDate(next.getDate() + 1);
            break;
        case "every_2_days":
            next.setDate(next.getDate() + 2);
            break;
        case "weekly":
            next.setDate(next.getDate() + 7);
            break;
        case "bi_weekly":
            next.setDate(next.getDate() + 14);
            break;
        case "monthly":
            next.setMonth(next.getMonth() + 1);
            break;
    }

    return next;
}
