import { httpClient } from "../http-client";
import {
	ApiResponse,
	ContactFormData,
	NewsletterSubscription,
	DonationData,
} from "../types";

/**
 * Contact API Service
 *
 * Service for handling contact forms, newsletter subscriptions, and communication
 */
export class ContactService {
	private static readonly BASE_PATH = "/contact";

	/**
	 * Submit contact form
	 */
	static async submitContactForm(formData: ContactFormData): Promise<
		ApiResponse<{
			submissionId: string;
			message: string;
		}>
	> {
		return httpClient.post(`${this.BASE_PATH}/submit`, formData);
	}

	/**
	 * Subscribe to newsletter
	 */
	static async subscribeToNewsletter(
		subscriptionData: NewsletterSubscription
	): Promise<
		ApiResponse<{
			subscriptionId: string;
			message: string;
		}>
	> {
		return httpClient.post(`${this.BASE_PATH}/newsletter`, subscriptionData);
	}

	/**
	 * Unsubscribe from newsletter
	 */
	static async unsubscribeFromNewsletter(
		email: string,
		token?: string
	): Promise<ApiResponse<{ success: boolean }>> {
		return httpClient.post(`${this.BASE_PATH}/newsletter/unsubscribe`, {
			email,
			token,
		});
	}

	/**
	 * Update newsletter preferences
	 */
	static async updateNewsletterPreferences(
		email: string,
		preferences: Partial<NewsletterSubscription>
	): Promise<ApiResponse<NewsletterSubscription>> {
		return httpClient.put(`${this.BASE_PATH}/newsletter/preferences`, {
			email,
			...preferences,
		});
	}

	/**
	 * Send donation inquiry
	 */
	static async sendDonationInquiry(inquiryData: {
		name: string;
		email: string;
		phone?: string;
		amount?: number;
		purpose: string;
		paymentMethod: string;
		message?: string;
	}): Promise<ApiResponse<{ inquiryId: string }>> {
		return httpClient.post(`${this.BASE_PATH}/donation-inquiry`, inquiryData);
	}

	/**
	 * Request prayer time notification signup
	 */
	static async signupForPrayerNotifications(data: {
		email: string;
		phoneNumber?: string;
		notificationTypes: ("email" | "sms")[];
		prayerTimes: ("fajr" | "dhuhr" | "asr" | "maghrib" | "isha")[];
	}): Promise<ApiResponse<{ success: boolean }>> {
		return httpClient.post(`${this.BASE_PATH}/prayer-notifications`, data);
	}

	/**
	 * Submit volunteer application
	 */
	static async submitVolunteerApplication(applicationData: {
		name: string;
		email: string;
		phone: string;
		skills: string[];
		availability: string;
		experience?: string;
		interests: string[];
		backgroundCheck: boolean;
	}): Promise<ApiResponse<{ applicationId: string }>> {
		return httpClient.post(`${this.BASE_PATH}/volunteer`, applicationData);
	}

	/**
	 * Request facility booking
	 */
	static async requestFacilityBooking(bookingData: {
		name: string;
		email: string;
		phone: string;
		eventType: string;
		preferredDate: string;
		alternateDate?: string;
		duration: number;
		expectedAttendees: number;
		facilities: string[];
		additionalRequirements?: string;
	}): Promise<ApiResponse<{ bookingRequestId: string }>> {
		return httpClient.post(`${this.BASE_PATH}/facility-booking`, bookingData);
	}
}

/**
 * Donations API Service
 *
 * Service for handling donations and payment processing
 */
export class DonationsService {
	private static readonly BASE_PATH = "/donations";

	/**
	 * Process donation
	 */
	static async processDonation(donationData: DonationData): Promise<
		ApiResponse<{
			transactionId: string;
			paymentUrl?: string;
			status: "pending" | "completed" | "failed";
		}>
	> {
		return httpClient.post(`${this.BASE_PATH}/process`, donationData);
	}

	/**
	 * Get donation status
	 */
	static async getDonationStatus(transactionId: string): Promise<
		ApiResponse<{
			status: "pending" | "completed" | "failed";
			amount: number;
			currency: string;
			timestamp: string;
		}>
	> {
		return httpClient.get(`${this.BASE_PATH}/status/${transactionId}`);
	}

	/**
	 * Get donation statistics (public)
	 */
	static async getDonationStats(): Promise<
		ApiResponse<{
			totalRaised: number;
			goalAmount: number;
			recentDonations: Array<{
				amount: number;
				donorName?: string;
				timestamp: string;
				purpose: string;
			}>;
			topDonors: Array<{
				name?: string;
				totalAmount: number;
			}>;
		}>
	> {
		return httpClient.get(`${this.BASE_PATH}/stats`);
	}

	/**
	 * Generate donation receipt
	 */
	static async generateReceipt(transactionId: string): Promise<
		ApiResponse<{
			receiptUrl: string;
			receiptNumber: string;
		}>
	> {
		return httpClient.get(`${this.BASE_PATH}/receipt/${transactionId}`);
	}

	/**
	 * Set up recurring donation
	 */
	static async setupRecurringDonation(recurringData: {
		amount: number;
		currency: string;
		frequency: "weekly" | "monthly" | "quarterly" | "yearly";
		donorEmail: string;
		donorName?: string;
		paymentMethod: string;
		startDate: string;
		endDate?: string;
		purpose: string;
	}): Promise<ApiResponse<{ subscriptionId: string }>> {
		return httpClient.post(`${this.BASE_PATH}/recurring`, recurringData);
	}

	/**
	 * Cancel recurring donation
	 */
	static async cancelRecurringDonation(
		subscriptionId: string
	): Promise<ApiResponse<{ success: boolean }>> {
		return httpClient.delete(`${this.BASE_PATH}/recurring/${subscriptionId}`);
	}
}

// Example usage:
/*
// Submit contact form
try {
  const response = await ContactService.submitContactForm({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Prayer Time Inquiry',
    message: 'I would like to know about Friday prayer times.'
  });
  console.log('Form submitted:', response.data.submissionId);
} catch (error) {
  console.error('Form submission failed:', error.message);
}

// Process a donation
try {
  const response = await DonationsService.processDonation({
    amount: 100,
    currency: 'CAD',
    donorEmail: 'donor@example.com',
    isAnonymous: false,
    purpose: 'Mosque Building Fund',
    paymentMethod: 'etransfer'
  });
  console.log('Donation processed:', response.data.transactionId);
} catch (error) {
  console.error('Donation failed:', error.message);
}
*/
