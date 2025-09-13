import { ApiResponse, ApiRequestOptions, HttpMethod } from "./types";
import {
	handleApiError,
	ApiException,
	withRetry,
	logError,
} from "./error-handling";

/**
 * API Configuration
 */
export const API_CONFIG = {
	// Base URL for the API - Update this with your actual API endpoint
	BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",

	// Supabase configuration
	SUPABASE_URL: import.meta.env.VITE_SUPABASE_PROJECT_URL || "",
	SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_API_KEY || "",

	// Default timeout in milliseconds
	DEFAULT_TIMEOUT: 10000,

	// Default number of retries
	DEFAULT_RETRIES: 2,

	// Default headers
	DEFAULT_HEADERS: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},

	// Supabase headers
	SUPABASE_HEADERS: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Prefer: "return=representation",
	},
};

/**
 * HTTP Client class for making API requests
 */
class HttpClient {
	private baseURL: string;
	private defaultHeaders: Record<string, string>;
	private defaultTimeout: number;
	private defaultRetries: number;

	constructor() {
		this.baseURL = API_CONFIG.BASE_URL;
		this.defaultHeaders = { ...API_CONFIG.DEFAULT_HEADERS };
		this.defaultTimeout = API_CONFIG.DEFAULT_TIMEOUT;
		this.defaultRetries = API_CONFIG.DEFAULT_RETRIES;
	}

	/**
	 * Set authentication token
	 */
	setAuthToken(token: string): void {
		this.defaultHeaders["Authorization"] = `Bearer ${token}`;
	}

	/**
	 * Remove authentication token
	 */
	removeAuthToken(): void {
		delete this.defaultHeaders["Authorization"];
	}

	/**
	 * Update base URL
	 */
	setBaseURL(url: string): void {
		this.baseURL = url;
	}

	/**
	 * Set default headers
	 */
	setDefaultHeaders(headers: Record<string, string>): void {
		this.defaultHeaders = { ...this.defaultHeaders, ...headers };
	}

	/**
	 * Build full URL
	 */
	private buildURL(endpoint: string, baseURL?: string): string {
		const base = baseURL || this.baseURL;
		const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
		const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
		return `${cleanBase}${cleanEndpoint}`;
	}

	/**
	 * Build query string from parameters
	 */
	private buildQueryString(params: Record<string, any>): string {
		const searchParams = new URLSearchParams();

		Object.entries(params).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				if (Array.isArray(value)) {
					value.forEach((item) => searchParams.append(key, String(item)));
				} else {
					searchParams.append(key, String(value));
				}
			}
		});

		const queryString = searchParams.toString();
		return queryString ? `?${queryString}` : "";
	}

	/**
	 * Make HTTP request
	 */
	private async makeRequest<T>(
		method: HttpMethod,
		endpoint: string,
		options: ApiRequestOptions = {}
	): Promise<ApiResponse<T>> {
		const {
			headers = {},
			timeout = this.defaultTimeout,
			retries = this.defaultRetries,
			baseURL,
			params,
			body,
			signal,
		} = options;

		const url = this.buildURL(endpoint, baseURL);
		const queryString = params ? this.buildQueryString(params) : "";
		const fullURL = `${url}${queryString}`;

		const requestHeaders = {
			...this.defaultHeaders,
			...headers,
		};

		// Create abort controller for timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), timeout);

		// Use provided signal or our timeout signal
		const requestSignal = signal || controller.signal;

		const requestInit: RequestInit = {
			method,
			headers: requestHeaders,
			signal: requestSignal,
		};

		// Add body for methods that support it
		if (body && ["POST", "PUT", "PATCH"].includes(method)) {
			if (body instanceof FormData) {
				// Don't set Content-Type for FormData, let browser set it
				delete requestHeaders["Content-Type"];
				requestInit.body = body;
			} else {
				requestInit.body = JSON.stringify(body);
			}
		}

		try {
			const operation = async () => {
				const response = await fetch(fullURL, requestInit);

				clearTimeout(timeoutId);

				// Handle non-2xx responses
				if (!response.ok) {
					let errorData;
					try {
						errorData = await response.json();
					} catch {
						errorData = { message: response.statusText };
					}

					throw {
						response: {
							status: response.status,
							data: errorData,
						},
					};
				}

				// Parse response
				let data;
				const contentType = response.headers.get("content-type");

				// Handle 204 No Content responses
				if (response.status === 204) {
					data = null;
				} else if (contentType?.includes("application/json")) {
					data = await response.json();
				} else {
					data = await response.text();
				}

				// Return standardized response
				return {
					data,
					success: true,
					status: response.status,
					message: "Request successful",
				} as ApiResponse<T>;
			};

			return await withRetry(operation, retries);
		} catch (error) {
			clearTimeout(timeoutId);
			const apiError = handleApiError(error);
			logError(apiError, `${method} ${fullURL}`);
			throw new ApiException(apiError);
		}
	}

	/**
	 * GET request
	 */
	async get<T = any>(
		endpoint: string,
		options: Omit<ApiRequestOptions, "body"> = {}
	): Promise<ApiResponse<T>> {
		return this.makeRequest<T>("GET", endpoint, options);
	}

	/**
	 * POST request
	 */
	async post<T = any>(
		endpoint: string,
		data?: any,
		options: Omit<ApiRequestOptions, "body"> = {}
	): Promise<ApiResponse<T>> {
		return this.makeRequest<T>("POST", endpoint, { ...options, body: data });
	}

	/**
	 * PUT request
	 */
	async put<T = any>(
		endpoint: string,
		data?: any,
		options: Omit<ApiRequestOptions, "body"> = {}
	): Promise<ApiResponse<T>> {
		return this.makeRequest<T>("PUT", endpoint, { ...options, body: data });
	}

	/**
	 * PATCH request
	 */
	async patch<T = any>(
		endpoint: string,
		data?: any,
		options: Omit<ApiRequestOptions, "body"> = {}
	): Promise<ApiResponse<T>> {
		return this.makeRequest<T>("PATCH", endpoint, { ...options, body: data });
	}

	/**
	 * DELETE request
	 */
	async delete<T = any>(
		endpoint: string,
		options: Omit<ApiRequestOptions, "body"> = {}
	): Promise<ApiResponse<T>> {
		return this.makeRequest<T>("DELETE", endpoint, options);
	}
}

// Create and export a singleton instance
export const httpClient = new HttpClient();

// Export the class for creating additional instances if needed
export { HttpClient };
