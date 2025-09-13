import { useState, useEffect, useCallback } from "react";
import { ApiResponse, ApiException } from "../index";

/**
 * Custom hook for API calls with loading states
 */
export function useApi<T = any>() {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const execute = useCallback(
		async (apiCall: () => Promise<ApiResponse<T>>) => {
			try {
				setLoading(true);
				setError(null);

				const response = await apiCall();
				setData(response.data);

				return response;
			} catch (err) {
				const errorMessage =
					err instanceof ApiException
						? err.message
						: "An unexpected error occurred";

				setError(errorMessage);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const reset = useCallback(() => {
		setData(null);
		setError(null);
		setLoading(false);
	}, []);

	return {
		data,
		loading,
		error,
		execute,
		reset,
	};
}

/**
 * Custom hook for API calls that run on component mount
 */
export function useApiOnMount<T = any>(
	apiCall: () => Promise<ApiResponse<T>>,
	dependencies: any[] = []
) {
	const { data, loading, error, execute } = useApi<T>();

	useEffect(() => {
		execute(apiCall);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);

	return {
		data,
		loading,
		error,
		refetch: () => execute(apiCall),
	};
}

/**
 * Custom hook for form submissions
 */
export function useApiForm<TRequest = any, TResponse = any>() {
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submit = useCallback(
		async (
			apiCall: (data: TRequest) => Promise<ApiResponse<TResponse>>,
			data: TRequest
		) => {
			try {
				setSubmitting(true);
				setError(null);
				setSuccess(false);

				const response = await apiCall(data);
				setSuccess(true);

				return response;
			} catch (err) {
				const errorMessage =
					err instanceof ApiException
						? err.message
						: "Submission failed. Please try again.";

				setError(errorMessage);
				throw err;
			} finally {
				setSubmitting(false);
			}
		},
		[]
	);

	const reset = useCallback(() => {
		setSubmitting(false);
		setSuccess(false);
		setError(null);
	}, []);

	return {
		submitting,
		success,
		error,
		submit,
		reset,
	};
}

/**
 * Custom hook for pagination
 */
export function useApiPagination<T = any>(
	apiCall: (
		page: number,
		limit: number
	) => Promise<
		ApiResponse<{
			items: T[];
			totalCount: number;
			currentPage: number;
			totalPages: number;
		}>
	>,
	initialLimit = 10
) {
	const [data, setData] = useState<T[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [limit] = useState(initialLimit);

	const fetchPage = useCallback(
		async (page: number) => {
			try {
				setLoading(true);
				setError(null);

				const response = await apiCall(page, limit);

				setData(response.data.items);
				setCurrentPage(response.data.currentPage);
				setTotalPages(response.data.totalPages);
				setTotalCount(response.data.totalCount);

				return response;
			} catch (err) {
				const errorMessage =
					err instanceof ApiException ? err.message : "Failed to fetch data";

				setError(errorMessage);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[apiCall, limit]
	);

	const nextPage = useCallback(() => {
		if (currentPage < totalPages) {
			return fetchPage(currentPage + 1);
		}
	}, [currentPage, totalPages, fetchPage]);

	const prevPage = useCallback(() => {
		if (currentPage > 1) {
			return fetchPage(currentPage - 1);
		}
	}, [currentPage, fetchPage]);

	const goToPage = useCallback(
		(page: number) => {
			if (page >= 1 && page <= totalPages) {
				return fetchPage(page);
			}
		},
		[totalPages, fetchPage]
	);

	useEffect(() => {
		fetchPage(1);
	}, [fetchPage]);

	return {
		data,
		loading,
		error,
		currentPage,
		totalPages,
		totalCount,
		nextPage,
		prevPage,
		goToPage,
		refetch: () => fetchPage(currentPage),
	};
}

/**
 * Custom hook for real-time data (polling)
 */
export function useApiPolling<T = any>(
	apiCall: () => Promise<ApiResponse<T>>,
	interval = 30000, // 30 seconds
	enabled = true
) {
	const { data, loading, error, execute } = useApi<T>();

	useEffect(() => {
		if (!enabled) return;

		// Initial fetch
		execute(apiCall);

		// Set up polling
		const intervalId = setInterval(() => {
			execute(apiCall);
		}, interval);

		return () => clearInterval(intervalId);
	}, [apiCall, interval, enabled, execute]);

	return {
		data,
		loading,
		error,
		refetch: () => execute(apiCall),
	};
}

// Example usage in components:
/*
// Basic API call
function PrayerTimesComponent() {
  const { data, loading, error } = useApiOnMount(() => 
    PrayerTimesService.getCurrentPrayerTimes()
  );

  if (loading) return 'Loading...';
  if (error) return `Error: ${error}`;
  
  // Render prayer times data
  return data;
}

// Form submission
function ContactFormComponent() {
  const { submitting, success, error, submit } = useApiForm();

  const handleSubmit = async (formData) => {
    await submit(ContactService.submitContactForm, formData);
  };

  // Use submitting, success, error states in your form
  return { handleSubmit, submitting, success, error };
}

// Paginated data
function EventsListComponent() {
  const {
    data: events,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage
  } = useApiPagination(EventsService.getEvents);

  // Use the pagination data in your component
  return { events, loading, error, currentPage, totalPages, nextPage, prevPage };
}
*/
