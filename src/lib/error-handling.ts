import { ApiError } from "./types";

/**
 * Custom error class for API-related errors
 */
export class ApiException extends Error {
	public readonly status: number;
	public readonly code?: string;
	public readonly details?: any;

	constructor(error: ApiError) {
		super(error.message);
		this.name = "ApiException";
		this.status = error.status;
		this.code = error.code;
		this.details = error.details;
	}
}

/**
 * Handle different types of errors and convert them to ApiError format
 */
export function handleApiError(error: any): ApiError {
	// Network errors
	if (error instanceof TypeError && error.message.includes("fetch")) {
		return {
			message: "Network error. Please check your internet connection.",
			status: 0,
			code: "NETWORK_ERROR",
		};
	}

	// Timeout errors
	if (error.name === "AbortError") {
		return {
			message: "Request timeout. Please try again.",
			status: 408,
			code: "TIMEOUT_ERROR",
		};
	}

	// HTTP errors with response
	if (error.response) {
		return {
			message: error.response.data?.message || "An error occurred",
			status: error.response.status,
			code: error.response.data?.code,
			details: error.response.data?.details,
		};
	}

	// Generic errors
	return {
		message: error.message || "An unexpected error occurred",
		status: 500,
		code: "UNKNOWN_ERROR",
		details: error,
	};
}

/**
 * Log errors for debugging (can be extended to send to logging service)
 */
export function logError(error: ApiError, context?: string): void {
	const logData = {
		message: error.message,
		status: error.status,
		code: error.code,
		context,
		timestamp: new Date().toISOString(),
		details: error.details,
	};

	// In development, log to console
	if (import.meta.env.DEV) {
		console.error("API Error:", logData);
	}

	// In production, you might want to send to a logging service
	// Example: sendToLoggingService(logData);
}

/**
 * Retry logic for failed requests
 */
export async function withRetry<T>(
	operation: () => Promise<T>,
	maxRetries: number = 3,
	delay: number = 1000
): Promise<T> {
	let lastError: any;

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await operation();
		} catch (error) {
			lastError = error;

			// Don't retry on client errors (4xx)
			const apiError = handleApiError(error);
			if (apiError.status >= 400 && apiError.status < 500) {
				throw new ApiException(apiError);
			}

			// Don't retry on the last attempt
			if (attempt === maxRetries) {
				break;
			}

			// Wait before retrying
			await new Promise((resolve) => setTimeout(resolve, delay * attempt));
		}
	}

	throw new ApiException(handleApiError(lastError));
}
