// Core API utilities
export { httpClient, HttpClient, API_CONFIG } from "./http-client";
export { supabaseClient, SupabaseClient } from "./supabase-client";
export {
	ApiException,
	handleApiError,
	logError,
	withRetry,
} from "./error-handling";

// Types
export type {
	ApiResponse,
	ApiError,
	HttpMethod,
	RequestConfig,
	ApiRequestOptions,
	PrayerTimesResponse,
	Event,
	ContactFormData,
	DonationData,
	NewsletterSubscription,
} from "./types";

// Services
export { PrayerTimesService } from "./services/prayer-times.service";
export { EventsService } from "./services/events.service";
export { ContactService, DonationsService } from "./services/contact.service";
export { CommunityService } from "./services/community.service";
export {
	SupabaseContentService,
	CONTENT_KEYS,
} from "./services/supabase-content.service";

// Service Types
export type {
	CommunityInfo,
	PrayerTimeInfo,
	EventInfo,
	MosqueInfo,
} from "./services/community.service";
export type {
	ContentKey,
	ContentItem,
	CommunityInfo as SupabaseCommunityInfo,
	DonationMethod,
	MediaCategory,
	MediaItem,
	ProjectProgress,
	SocialLink,
} from "./services/supabase-content.service";

// React Hooks
export {
	useApi,
	useApiOnMount,
	useApiForm,
	useApiPagination,
	useApiPolling,
} from "./hooks/api-hooks";
