import { supabaseClient } from "../supabase-client";
import {
	ApiResponse,
	Event,
	MediaItem,
	MediaCategory,
	AddSubscriberRequest,
	AddContactMessageRequest,
} from "../types";

/**
 * Content Keys for Supabase Table
 */
export const CONTENT_KEYS = {
	COMMUNITY_INFO: "community-info",
	DONATION_METHODS: "donation-methods",
	EVENTS: "events",
	MEDIA_CATEGORIES: "media-categories",
	MEDIA_ITEMS: "media-items",
	PROJECT_PROGRESS: "project-progress",
	SOCIAL_LINKS: "social-links",
} as const;

export type ContentKey = (typeof CONTENT_KEYS)[keyof typeof CONTENT_KEYS];

/**
 * Type definitions for different content types
 */
export interface CommunityInfo {
	key: "community-info";
	value: {
		about: string;
		vision: string;
		mission: string;
		memberCount: number;
		offers: Array<{
			id: string;
			title: string;
			description: string;
		}>;
		values: Array<{
			id: string;
			icon: string;
			title: string;
			description: string;
		}>;
		contact: {
			emails: string[];
			phones: string[];
			address: {
				city: string;
				street: string;
				country: string;
				address1: string;
				address2: string;
				province: string;
				postalCode: string;
			};
			location: string;
		};
		weeklyPrograms: Array<{
			id: string;
			day: string;
			name: string;
			time: string;
			description: string;
		}>;
	};
}

export interface DonationMethod {
	id: string;
	key: "donation-methods";
	method_name: string;
	method_type: "etransfer" | "paypal" | "card" | "cash" | "bank" | "crypto";
	details: {
		email?: string;
		account_number?: string;
		routing_number?: string;
		paypal_link?: string;
		instructions?: string;
	};
	display_order: number;
	created_at: string;
	updated_at: string;
}

export interface ProjectProgress {
	id: string;
	key: "project-progress";
	project_name: string;
	current_amount: number;
	goal_amount: number;
	currency: string;
	progress_percentage: number;
	start_date: string;
	target_date?: string;
	description: string;
	milestones: Array<{
		title: string;
		amount: number;
		completed: boolean;
		completion_date?: string;
	}>;
	created_at: string;
	updated_at: string;
}

export interface SocialLink {
	id: string;
	key: "social-links";
	platform_name: string;
	platform_type:
		| "facebook"
		| "instagram"
		| "twitter"
		| "youtube"
		| "linkedin"
		| "telegram"
		| "whatsapp"
		| "website";
	url: string;
	display_name?: string;
	icon_name?: string;
	display_order: number;
	created_at: string;
	updated_at: string;
}

/**
 * Generic content item type
 */
export type ContentItem =
	| CommunityInfo
	| DonationMethod
	| Event
	| MediaCategory
	| MediaItem
	| ProjectProgress
	| SocialLink;

/**
 * Supabase Content Service
 *
 * Service for fetching all types of content from the Supabase table
 */
export class SupabaseContentService {
	private static readonly TABLE_NAME =
		import.meta.env.VITE_SUPABASE_TABLE_NAME || "content";

	/**
	 * Get multiple content types at once
	 */
	static async getContentByKeys(
		keys: ContentKey[]
	): Promise<ApiResponse<any[]>> {
		return supabaseClient.select(this.TABLE_NAME, {
			filter: { key: { in: keys } },
		});
	}

	/**
	 * Get community info and donation methods together (common use case)
	 */
	static async getCommunityInfoAndDonations(): Promise<ApiResponse<any[]>> {
		return this.getContentByKeys([
			CONTENT_KEYS.COMMUNITY_INFO,
			CONTENT_KEYS.DONATION_METHODS,
		]);
	}

	/**
	 * Get community information
	 */
	static async getCommunityInfo(): Promise<ApiResponse<CommunityInfo[]>> {
		return supabaseClient.select<CommunityInfo>(this.TABLE_NAME, {
			filter: { key: { in: [CONTENT_KEYS.COMMUNITY_INFO] } },
		});
	}

	/**
	 * Get donation methods
	 */
	static async getDonationMethods(): Promise<ApiResponse<DonationMethod[]>> {
		const filter: Record<string, any> = {
			key: { in: [CONTENT_KEYS.DONATION_METHODS] },
		};

		return supabaseClient.select<DonationMethod>(this.TABLE_NAME, {
			filter,
		});
	}

	/**
	 * Get events
	 */
	static async getEvents(
		options: {
			featured?: boolean;
			upcoming?: boolean;
			category?: string;
			limit?: number;
		} = {}
	): Promise<ApiResponse<Event[]>> {
		const filter: Record<string, any> = { key: { in: [CONTENT_KEYS.EVENTS] } };

		if (options.featured !== undefined) {
			filter.is_featured = options.featured;
		}

		if (options.category) {
			filter.category = options.category;
		}

		// Remove date ordering since the column structure may vary
		// Events will be sorted client-side if needed
		return supabaseClient.select<Event>(this.TABLE_NAME, {
			filter,
			limit: options.limit,
		});
	}

	/**
	 * Get media categories
	 */
	static async getMediaCategories(): Promise<ApiResponse<MediaCategory[]>> {
		const filter: Record<string, any> = {
			key: { in: [CONTENT_KEYS.MEDIA_CATEGORIES] },
		};

		return supabaseClient.select<MediaCategory>(this.TABLE_NAME, {
			filter,
		});
	}

	/**
	 * Get media items
	 */
	static async getMediaItems(
		options: {
			category?: string;
			mediaType?: "video" | "audio" | "image" | "document";
			featured?: boolean;
			limit?: number;
		} = {}
	): Promise<ApiResponse<MediaItem[]>> {
		const filter: Record<string, any> = {
			key: { in: [CONTENT_KEYS.MEDIA_ITEMS] },
		};

		if (options.category) {
			filter.category_id = options.category;
		}

		if (options.mediaType) {
			filter.media_type = options.mediaType;
		}

		if (options.featured !== undefined) {
			filter.is_featured = options.featured;
		}

		return supabaseClient.select<MediaItem>(this.TABLE_NAME, {
			filter,
			limit: options.limit,
		});
	}

	/**
	 * Get project progress
	 */
	static async getProjectProgress(): Promise<ApiResponse<ProjectProgress[]>> {
		const filter: Record<string, any> = {
			key: { in: [CONTENT_KEYS.PROJECT_PROGRESS] },
		};

		return supabaseClient.select<ProjectProgress>(this.TABLE_NAME, {
			filter,
		});
	}

	/**
	 * Get social links
	 */
	static async getSocialLinks(): Promise<ApiResponse<SocialLink[]>> {
		const filter: Record<string, any> = {
			key: { in: [CONTENT_KEYS.SOCIAL_LINKS] },
		};

		return supabaseClient.select<SocialLink>(this.TABLE_NAME, {
			filter,
		});
	}

	/**
	 * Get content by specific key
	 */
	static async getContentByKey<T extends ContentItem>(
		key: ContentKey,
		additionalFilters?: Record<string, any>
	): Promise<ApiResponse<T[]>> {
		const filter = { key, ...additionalFilters };

		return supabaseClient.select<T>(this.TABLE_NAME, {
			filter,
		});
	}

	/**
	 * Get multiple content types in one request
	 */
	static async getMultipleContentTypes(
		keys: ContentKey[]
	): Promise<ApiResponse<ContentItem[]>> {
		return supabaseClient.select<ContentItem>(this.TABLE_NAME, {
			filter: {
				key: { in: `(${keys.join(",")})` },
			},
		});
	}

	/**
	 * Get all content (useful for initial app load)
	 */
	static async getAllContent(): Promise<ApiResponse<ContentItem[]>> {
		return supabaseClient.select<ContentItem>(this.TABLE_NAME, {
			order: "key.asc,display_order.asc",
		});
	}

	/**
	 * Search content by title or description
	 */
	static async searchContent(
		searchTerm: string,
		contentTypes?: ContentKey[]
	): Promise<ApiResponse<ContentItem[]>> {
		const filter: Record<string, any> = {};

		if (contentTypes && contentTypes.length > 0) {
			filter.key = { in: `(${contentTypes.join(",")})` };
		}

		// Note: This is a simple text search. For more advanced search,
		// you might want to use Supabase's full-text search capabilities
		// or implement a search RPC function
		return supabaseClient.select<ContentItem>(this.TABLE_NAME, {
			filter: {
				...filter,
				or: `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`,
			},
		});
	}

	/**
	 * Add a new subscriber using RPC function
	 */
	static async addSubscriber(
		subscriberData: AddSubscriberRequest
	): Promise<ApiResponse<any>> {
		return supabaseClient.rpc("add_subscriber", subscriberData);
	}

	/**
	 * Add a new contact message using RPC function
	 */
	static async addContactMessage(
		contactData: AddContactMessageRequest
	): Promise<ApiResponse<any>> {
		return supabaseClient.rpc("add_contact_message", contactData);
	}
}

// Example usage:
/*
// Get community info
try {
  const response = await SupabaseContentService.getCommunityInfo();
  console.log('Community info:', response.data);
} catch (error) {
  console.error('Failed to fetch community info:', error.message);
}

// Get active donation methods
try {
  const response = await SupabaseContentService.getDonationMethods(true);
  console.log('Donation methods:', response.data);
} catch (error) {
  console.error('Failed to fetch donation methods:', error.message);
}

// Get upcoming events
try {
  const response = await SupabaseContentService.getEvents({ 
    upcoming: true, 
    limit: 5 
  });
  console.log('Upcoming events:', response.data);
} catch (error) {
  console.error('Failed to fetch events:', error.message);
}

// Get all content at once
try {
  const response = await SupabaseContentService.getAllContent();
  const groupedContent = response.data.reduce((acc, item) => {
    if (!acc[item.key]) acc[item.key] = [];
    acc[item.key].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);
  console.log('All content grouped:', groupedContent);
} catch (error) {
  console.error('Failed to fetch all content:', error.message);
}
*/
