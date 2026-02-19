/**
 * BlueDart Service
 * Handles interaction with BlueDart Shipping API
 */

interface BlueDartAuthResponse {
    JWTToken?: string;
    // Error fields based on observation
    status?: number;
    title?: string;
    "error-response"?: string | { msg: string }[];
}

class BlueDartService {
    private clientId: string;
    private clientSecret: string;
    private apiUrl: string;
    private token: string | null = null;
    private tokenExpiry: number | null = null;

    constructor() {
        this.clientId = process.env.BLUEDART_CLIENT_ID || "";
        this.clientSecret = process.env.BLUEDART_CLIENT_SECRET || "";
        this.apiUrl = process.env.BLUEDART_API_URL || "";

        if (!this.clientId || !this.clientSecret || !this.apiUrl) {
            console.warn("BlueDart credentials not fully configured.");
        }
    }

    /**
     * Authenticates with Blue Dart API to get a JWT token.
     * Caches the token for subsequent requests.
     */
    async authenticate(): Promise<string> {
        if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
            return this.token;
        }

        console.log("Authenticating with BlueDart...");

        try {
            const response = await fetch(this.apiUrl, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    ClientID: this.clientId,
                    clientSecret: this.clientSecret,
                },
            });

            const data: BlueDartAuthResponse = await response.json();

            if (!response.ok) {
                throw new Error(
                    `BlueDart Authentication Failed: ${response.status} ${response.statusText} - ${JSON.stringify(
                        data
                    )}`
                );
            }

            if (data.JWTToken) {
                this.token = data.JWTToken;
                // Token validity is not explicitly returned, assume 30 minutes for safety (usually 45-60 min)
                this.tokenExpiry = Date.now() + 30 * 60 * 1000;
                return this.token;
            } else {
                throw new Error("No JWT Token received in response");
            }
        } catch (error) {
            console.error("BlueDart Authentication Error:", error);
            throw error;
        }
    }

    /**
     * Returns a valid token, refreshing if necessary.
     */
    async getToken(): Promise<string> {
        return this.authenticate();
    }
}

export const blueDartService = new BlueDartService();
