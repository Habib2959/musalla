import { supabaseClient } from "../supabase-client";
import { ApiResponse } from "../types";

/**
 * Community Information Service
 *
 * Service for managing community information using Supabase
 * Based on the API structure: {{SUPABASE_PROJECT_URL}}/rest/v1/{{TABLE_NAME}}?select=*&key=in.(community-info)
 */

// Define types for community data
export interface CommunityInfo {
	id: string;
	key: string;
	title: string;
	description?: string;
	content?: any;
	category?: string;
	metadata?: Record<string, any>;
	created_at: string;
	updated_at: string;
	is_active: boolean;
}

export interface PrayerTimeInfo extends CommunityInfo {
	content: {
		fajr: string;
		dhuhr: string;
		asr: string;
		maghrib: string;
		isha: string;
		date: string;
		location: {
			latitude: number;
			longitude: number;
			city: string;
		};
	};
}

export interface EventInfo extends CommunityInfo {
	content: {
		title: string;
		description: string;
		date: string;
		time: string;
		location: string;
		capacity?: number;
		registrationRequired: boolean;
		category: string;
		featured: boolean;
	};
}

export interface MosqueInfo extends CommunityInfo {
	content: {
		name: string;
		address: string;
		phone: string;
		email: string;
		website?: string;
		services: string[];
		facilities: string[];
		imamName?: string;
		establishedYear?: number;
	};
}

export class CommunityService {
	private static readonly TABLE_NAME = "community_data"; // Update with your actual table name

	/**
	 * Get community information by key(s)
	 * Matches your API structure: ?select=*&key=in.(community-info)
	 */
	static async getCommunityInfoByKeys(
		keys: string | string[],
		select: string = "*"
	): Promise<ApiResponse<CommunityInfo[]>> {
		const keyArray = Array.isArray(keys) ? keys : [keys];

		return supabaseClient.select<CommunityInfo>(this.TABLE_NAME, {
			select,
			filter: {
				key: { in: `(${keyArray.join(",")})` },
			},
		});
	}

	/**
	 * Get all community information
	 */
	static async getAllCommunityInfo(
		select: string = "*"
	): Promise<ApiResponse<CommunityInfo[]>> {
		return supabaseClient.select<CommunityInfo>(this.TABLE_NAME, {
			select,
		});
	}

	/**
	 * Get community information by category
	 */
	static async getCommunityInfoByCategory(
		category: string,
		select: string = "*"
	): Promise<ApiResponse<CommunityInfo[]>> {
		return supabaseClient.select<CommunityInfo>(this.TABLE_NAME, {
			select,
			filter: {
				category: { eq: category },
				is_active: true,
			},
			order: "updated_at.desc",
		});
	}

	/**
	 * Get single community information by key
	 */
	static async getCommunityInfoByKey(
		key: string,
		select: string = "*"
	): Promise<ApiResponse<CommunityInfo[]>> {
		return supabaseClient.select<CommunityInfo>(this.TABLE_NAME, {
			select,
			filter: {
				key: { eq: key },
				is_active: true,
			},
			limit: 1,
		});
	}

	/**
	 * Search community information
	 */
	static async searchCommunityInfo(
		searchTerm: string,
		select: string = "*"
	): Promise<ApiResponse<CommunityInfo[]>> {
		return supabaseClient.select<CommunityInfo>(this.TABLE_NAME, {
			select,
			filter: {
				title: { ilike: `%${searchTerm}%` },
				is_active: true,
			},
			order: "updated_at.desc",
		});
	}

	/**
	 * Create new community information (admin only)
	 */
	static async createCommunityInfo(
		data: Omit<CommunityInfo, "id" | "created_at" | "updated_at">
	): Promise<ApiResponse<CommunityInfo[]>> {
		return supabaseClient.insert<CommunityInfo>(this.TABLE_NAME, {
			...data,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		});
	}

	/**
	 * Update community information (admin only)
	 */
	static async updateCommunityInfo(
		key: string,
		data: Partial<CommunityInfo>
	): Promise<ApiResponse<CommunityInfo[]>> {
		return supabaseClient.update<CommunityInfo>(
			this.TABLE_NAME,
			{
				...data,
				updated_at: new Date().toISOString(),
			},
			{
				key: { eq: key },
			}
		);
	}

	/**
	 * Delete community information (admin only)
	 */
	static async deleteCommunityInfo(
		key: string
	): Promise<ApiResponse<CommunityInfo[]>> {
		return supabaseClient.update<CommunityInfo>(
			this.TABLE_NAME,
			{
				is_active: false,
				updated_at: new Date().toISOString(),
			},
			{
				key: { eq: key },
			}
		);
	}

	// Specific methods for different types of community data

	/**
	 * Get prayer times information
	 */
	static async getPrayerTimesInfo(): Promise<ApiResponse<PrayerTimeInfo[]>> {
		return this.getCommunityInfoByKeys("prayer-times") as Promise<
			ApiResponse<PrayerTimeInfo[]>
		>;
	}

	/**
	 * Get mosque information
	 */
	static async getMosqueInfo(): Promise<ApiResponse<MosqueInfo[]>> {
		return this.getCommunityInfoByKeys("mosque-info") as Promise<
			ApiResponse<MosqueInfo[]>
		>;
	}

	/**
	 * Get events information
	 */
	static async getEventsInfo(): Promise<ApiResponse<EventInfo[]>> {
		return this.getCommunityInfoByCategory("events") as Promise<
			ApiResponse<EventInfo[]>
		>;
	}

	/**
	 * Get featured events
	 */
	static async getFeaturedEvents(): Promise<ApiResponse<EventInfo[]>> {
		return supabaseClient.select<EventInfo>(this.TABLE_NAME, {
			select: "*",
			filter: {
				category: { eq: "events" },
				"content->featured": { eq: true },
				is_active: true,
			},
			order: "content->date.asc",
			limit: 5,
		});
	}

	/**
	 * Get upcoming events
	 */
	static async getUpcomingEvents(
		limit: number = 10
	): Promise<ApiResponse<EventInfo[]>> {
		const today = new Date().toISOString().split("T")[0];

		return supabaseClient.select<EventInfo>(this.TABLE_NAME, {
			select: "*",
			filter: {
				category: { eq: "events" },
				"content->date": { gte: today },
				is_active: true,
			},
			order: "content->date.asc",
			limit,
		});
	}

	/**
	 * Get contact information
	 */
	static async getContactInfo(): Promise<ApiResponse<CommunityInfo[]>> {
		return this.getCommunityInfoByKeys(["contact-info", "emergency-contact"]);
	}

	/**
	 * Get donation information
	 */
	static async getDonationInfo(): Promise<ApiResponse<CommunityInfo[]>> {
		return this.getCommunityInfoByKeys([
			"donation-methods",
			"donation-goals",
			"donation-stats",
		]);
	}

	/**
	 * Get programs information
	 */
	static async getProgramsInfo(): Promise<ApiResponse<CommunityInfo[]>> {
		return this.getCommunityInfoByCategory("programs");
	}

	/**
	 * Get facility information
	 */
	static async getFacilityInfo(): Promise<ApiResponse<CommunityInfo[]>> {
		return this.getCommunityInfoByKeys(["facility-info", "booking-info"]);
	}
}

// Example usage following your API structure:
/*
// Get community info (matches your exact API pattern)
try {
  const response = await CommunityService.getCommunityInfoByKeys('community-info');
  console.log('Community info:', response.data);
} catch (error) {
  console.error('Failed to fetch community info:', error.message);
}

// Get multiple keys
try {
  const response = await CommunityService.getCommunityInfoByKeys([
    'community-info', 
    'mosque-info', 
    'contact-info'
  ]);
  console.log('Community data:', response.data);
} catch (error) {
  console.error('Failed to fetch community data:', error.message);
}

// Get prayer times
try {
  const response = await CommunityService.getPrayerTimesInfo();
  console.log('Prayer times:', response.data[0]?.content);
} catch (error) {
  console.error('Failed to fetch prayer times:', error.message);
}

// Get upcoming events
try {
  const response = await CommunityService.getUpcomingEvents(5);
  console.log('Upcoming events:', response.data);
} catch (error) {
  console.error('Failed to fetch events:', error.message);
}
*/
