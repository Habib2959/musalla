import { ApiResponse, ApiRequestOptions, HttpMethod } from "./types";
import {
	handleApiError,
	ApiException,
	withRetry,
	logError,
} from "./error-handling";
import { API_CONFIG } from "./http-client";

/**
 * Supabase-specific HTTP Client class
 */
class SupabaseClient {
	private baseURL: string;
	private apiKey: string;
	private defaultHeaders: Record<string, string>;
	private defaultTimeout: number;
	private defaultRetries: number;

	constructor() {
		this.baseURL = API_CONFIG.SUPABASE_URL;
		this.apiKey = API_CONFIG.SUPABASE_ANON_KEY;
		this.defaultHeaders = {
			...API_CONFIG.SUPABASE_HEADERS,
			apikey: this.apiKey,
			Authorization: `Bearer ${this.apiKey}`,
		};
		this.defaultTimeout = API_CONFIG.DEFAULT_TIMEOUT;
		this.defaultRetries = API_CONFIG.DEFAULT_RETRIES;
	}

	/**
	 * Set Supabase configuration
	 */
	setConfig(url: string, key: string): void {
		this.baseURL = url;
		this.apiKey = key;
		this.defaultHeaders = {
			...API_CONFIG.SUPABASE_HEADERS,
			apikey: this.apiKey,
			Authorization: `Bearer ${this.apiKey}`,
		};
	}

	/**
	 * Set authentication token (for authenticated users)
	 */
	setAuthToken(token: string): void {
		this.defaultHeaders["Authorization"] = `Bearer ${token}`;
	}

	/**
	 * Build Supabase REST API URL
	 */
	private buildSupabaseURL(
		table: string,
		operation: "select" | "insert" | "update" | "delete" = "select"
	): string {
		const cleanBase = this.baseURL.endsWith("/")
			? this.baseURL.slice(0, -1)
			: this.baseURL;
		return `${cleanBase}/rest/v1/${table}`;
	}

	/**
	 * Build Supabase query parameters
	 */
	private buildSupabaseQuery(options: {
		select?: string;
		filter?: Record<string, any>;
		order?: string;
		limit?: number;
		offset?: number;
		range?: [number, number];
	}): string {
		const params = new URLSearchParams();

		// Select columns
		if (options.select) {
			params.append("select", options.select);
		}

		// Apply filters
		if (options.filter) {
			Object.entries(options.filter).forEach(([key, value]) => {
				if (typeof value === "object" && value !== null) {
					// Handle operators like { column: { eq: 'value' } } or { column: { in: ['value1', 'value2'] } }
					Object.entries(value).forEach(([operator, operatorValue]) => {
						if (operator === "in" && Array.isArray(operatorValue)) {
							// Handle 'in' operator with array values: in.(value1,value2,value3)
							params.append(key, `${operator}.(${operatorValue.join(",")})`);
						} else {
							// Handle other operators: eq.value, gt.5, etc.
							params.append(key, `${operator}.${operatorValue}`);
						}
					});
				} else {
					// Simple equality filter
					params.append(key, `eq.${value}`);
				}
			});
		}

		// Order
		if (options.order) {
			params.append("order", options.order);
		}

		// Limit
		if (options.limit) {
			params.append("limit", options.limit.toString());
		}

		// Offset
		if (options.offset) {
			params.append("offset", options.offset.toString());
		}

		const queryString = params.toString();
		return queryString ? `?${queryString}` : "";
	}

	/**
	 * Make Supabase HTTP request
	 */
	private async makeSupabaseRequest<T>(
		method: HttpMethod,
		table: string,
		options: ApiRequestOptions & {
			select?: string;
			filter?: Record<string, any>;
			order?: string;
			limit?: number;
			offset?: number;
			range?: [number, number];
			upsert?: boolean;
		} = {}
	): Promise<ApiResponse<T>> {
		const {
			headers = {},
			timeout = this.defaultTimeout,
			retries = this.defaultRetries,
			body,
			signal,
			select,
			filter,
			order,
			limit,
			offset,
			range,
			upsert,
		} = options;

		const url = this.buildSupabaseURL(table);
		const queryString = this.buildSupabaseQuery({
			select,
			filter,
			order,
			limit,
			offset,
			range,
		});
		const fullURL = `${url}${queryString}`;

		const requestHeaders = {
			...this.defaultHeaders,
			...headers,
		};

		// Handle upsert
		if (upsert && method === "POST") {
			requestHeaders["Prefer"] = "resolution=merge-duplicates";
		}

		// Handle range for partial content
		if (range && method === "GET") {
			requestHeaders["Range"] = `${range[0]}-${range[1]}`;
		}

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
			requestInit.body = JSON.stringify(body);
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

				if (contentType?.includes("application/json")) {
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
	 * SELECT - Read data from table
	 */
	async select<T = any>(
		table: string,
		options: {
			select?: string;
			filter?: Record<string, any>;
			order?: string;
			limit?: number;
			offset?: number;
			range?: [number, number];
		} = {}
	): Promise<ApiResponse<T[]>> {
		return this.makeSupabaseRequest<T[]>("GET", table, {
			select: options.select || "*",
			...options,
		});
	}

	/**
	 * INSERT - Add new records
	 */
	async insert<T = any>(
		table: string,
		data: any | any[],
		options: {
			upsert?: boolean;
			onConflict?: string;
		} = {}
	): Promise<ApiResponse<T[]>> {
		const headers: Record<string, string> = {};

		if (options.onConflict) {
			headers[
				"Prefer"
			] = `resolution=merge-duplicates,on_conflict=${options.onConflict}`;
		}

		return this.makeSupabaseRequest<T[]>("POST", table, {
			body: data,
			upsert: options.upsert,
			headers,
		});
	}

	/**
	 * UPDATE - Modify existing records
	 */
	async update<T = any>(
		table: string,
		data: any,
		filter: Record<string, any>
	): Promise<ApiResponse<T[]>> {
		return this.makeSupabaseRequest<T[]>("PATCH", table, {
			body: data,
			filter,
		});
	}

	/**
	 * DELETE - Remove records
	 */
	async delete<T = any>(
		table: string,
		filter: Record<string, any>
	): Promise<ApiResponse<T[]>> {
		return this.makeSupabaseRequest<T[]>("DELETE", table, {
			filter,
		});
	}

	/**
	 * RPC - Call stored procedures
	 */
	async rpc<T = any>(
		functionName: string,
		params: any = {}
	): Promise<ApiResponse<T>> {
		const url = `${this.baseURL}/rest/v1/rpc/${functionName}`;

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: this.defaultHeaders,
				body: JSON.stringify(params),
			});

			if (!response.ok) {
				throw new Error(`RPC call failed: ${response.statusText}`);
			}

			// Handle response based on status and content type
			let data;
			const contentType = response.headers.get("content-type");

			// Handle 204 No Content responses
			if (response.status === 204) {
				data = null;
			} else if (contentType?.includes("application/json")) {
				data = await response.json();
			} else {
				// Try to parse as text for non-JSON responses
				const textData = await response.text();
				data = textData || null;
			}

			return {
				data,
				success: true,
				status: response.status,
				message: "RPC call successful",
			};
		} catch (error) {
			const apiError = handleApiError(error);
			logError(apiError, `RPC ${functionName}`);
			throw new ApiException(apiError);
		}
	}
}

// Create and export a singleton instance
export const supabaseClient = new SupabaseClient();

// Export the class for creating additional instances if needed
export { SupabaseClient };
