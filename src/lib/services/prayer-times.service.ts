import { httpClient } from "../http-client";
import { ApiResponse, PrayerTimesResponse } from "../types";

/**
 * Prayer Times API Service
 *
 * Example service showing how to use the generic HTTP client
 * for Islamic prayer times functionality
 */
export class PrayerTimesService {
	private static readonly BASE_PATH = "/prayer-times";

	/**
	 * Get prayer times for current location
	 */
	static async getCurrentPrayerTimes(
		latitude?: number,
		longitude?: number
	): Promise<ApiResponse<PrayerTimesResponse>> {
		const params: Record<string, any> = {};

		if (latitude && longitude) {
			params.lat = latitude;
			params.lng = longitude;
		}

		return httpClient.get<PrayerTimesResponse>(`${this.BASE_PATH}/current`, {
			params,
		});
	}

	/**
	 * Get prayer times for a specific date
	 */
	static async getPrayerTimesByDate(
		date: string,
		latitude?: number,
		longitude?: number
	): Promise<ApiResponse<PrayerTimesResponse>> {
		const params: Record<string, any> = { date };

		if (latitude && longitude) {
			params.lat = latitude;
			params.lng = longitude;
		}

		return httpClient.get<PrayerTimesResponse>(`${this.BASE_PATH}/date`, {
			params,
		});
	}

	/**
	 * Get prayer times for current month
	 */
	static async getMonthlyPrayerTimes(
		year: number,
		month: number,
		latitude?: number,
		longitude?: number
	): Promise<ApiResponse<PrayerTimesResponse[]>> {
		const params: Record<string, any> = { year, month };

		if (latitude && longitude) {
			params.lat = latitude;
			params.lng = longitude;
		}

		return httpClient.get<PrayerTimesResponse[]>(`${this.BASE_PATH}/monthly`, {
			params,
		});
	}

	/**
	 * Update prayer time calculation method
	 */
	static async updateCalculationMethod(
		method: string
	): Promise<ApiResponse<{ success: boolean }>> {
		return httpClient.post(`${this.BASE_PATH}/calculation-method`, {
			method,
		});
	}
}

// Example usage:
/*
// Get current prayer times
try {
  const response = await PrayerTimesService.getCurrentPrayerTimes(49.2827, -123.1207);
  console.log('Prayer times:', response.data);
} catch (error) {
  console.error('Failed to fetch prayer times:', error.message);
}

// Get prayer times for specific date
try {
  const response = await PrayerTimesService.getPrayerTimesByDate('2024-01-15');
  console.log('Prayer times for date:', response.data);
} catch (error) {
  console.error('Failed to fetch prayer times:', error.message);
}
*/
