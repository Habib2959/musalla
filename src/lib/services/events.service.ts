import { httpClient } from "../http-client";
import { ApiResponse, Event } from "../types";

/**
 * Events API Service
 *
 * Example service for managing mosque events and programs
 */
export class EventsService {
	private static readonly BASE_PATH = "/events";

	/**
	 * Get all events with optional filtering
	 */
	static async getEvents(filters?: {
		category?: string;
		featured?: boolean;
		upcoming?: boolean;
		limit?: number;
		page?: number;
	}): Promise<
		ApiResponse<{
			items: Event[];
			totalCount: number;
			currentPage: number;
			totalPages: number;
		}>
	> {
		return httpClient.get(`${this.BASE_PATH}`, {
			params: filters,
		});
	}

	/**
	 * Get a specific event by ID
	 */
	static async getEventById(id: string): Promise<ApiResponse<Event>> {
		return httpClient.get<Event>(`${this.BASE_PATH}/${id}`);
	}

	/**
	 * Get featured events
	 */
	static async getFeaturedEvents(limit = 5): Promise<ApiResponse<Event[]>> {
		return httpClient.get<Event[]>(`${this.BASE_PATH}/featured`, {
			params: { limit },
		});
	}

	/**
	 * Get upcoming events
	 */
	static async getUpcomingEvents(limit = 10): Promise<ApiResponse<Event[]>> {
		return httpClient.get<Event[]>(`${this.BASE_PATH}/upcoming`, {
			params: { limit },
		});
	}

	/**
	 * Get events by category
	 */
	static async getEventsByCategory(
		category: string
	): Promise<ApiResponse<Event[]>> {
		return httpClient.get<Event[]>(`${this.BASE_PATH}/category/${category}`);
	}

	/**
	 * Create a new event (admin only)
	 */
	static async createEvent(
		eventData: Omit<Event, "id">
	): Promise<ApiResponse<Event>> {
		return httpClient.post<Event>(`${this.BASE_PATH}`, eventData);
	}

	/**
	 * Update an existing event (admin only)
	 */
	static async updateEvent(
		id: string,
		eventData: Partial<Event>
	): Promise<ApiResponse<Event>> {
		return httpClient.put<Event>(`${this.BASE_PATH}/${id}`, eventData);
	}

	/**
	 * Delete an event (admin only)
	 */
	static async deleteEvent(
		id: string
	): Promise<ApiResponse<{ success: boolean }>> {
		return httpClient.delete(`${this.BASE_PATH}/${id}`);
	}

	/**
	 * Register for an event
	 */
	static async registerForEvent(
		eventId: string,
		registrationData: {
			name: string;
			email: string;
			phone?: string;
			numberOfAttendees: number;
			specialRequests?: string;
		}
	): Promise<ApiResponse<{ registrationId: string }>> {
		return httpClient.post(
			`${this.BASE_PATH}/${eventId}/register`,
			registrationData
		);
	}

	/**
	 * Cancel event registration
	 */
	static async cancelRegistration(
		eventId: string,
		registrationId: string
	): Promise<ApiResponse<{ success: boolean }>> {
		return httpClient.delete(
			`${this.BASE_PATH}/${eventId}/register/${registrationId}`
		);
	}
}

// Example usage:
/*
// Get upcoming events
try {
  const response = await EventsService.getUpcomingEvents(5);
  console.log('Upcoming events:', response.data);
} catch (error) {
  console.error('Failed to fetch events:', error.message);
}

// Register for an event
try {
  const response = await EventsService.registerForEvent('event-123', {
    name: 'John Doe',
    email: 'john@example.com',
    numberOfAttendees: 2
  });
  console.log('Registration successful:', response.data.registrationId);
} catch (error) {
  console.error('Registration failed:', error.message);
}
*/
